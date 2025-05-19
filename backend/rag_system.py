import pdfplumber
import os  # Added this import
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.schema import Document
import re

class LegalRAGSystem:
    def __init__(self):
        # Initialize embeddings (only done once)
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-mpnet-base-v2",
            model_kwargs={'device': 'cpu'},  # Use 'cuda' if available
            encode_kwargs={'normalize_embeddings': True}
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        self.vector_store = None
        self.qa_chain = None

    def load_documents(self, pdf_paths):
        documents = []
        for path in pdf_paths:
            try:
                if "PIPEDA" in path:
                    with pdfplumber.open(path) as pdf:
                        for page_num, page in enumerate(pdf.pages):
                            left = page.within_bbox((0, 0, page.width/2, page.height))
                            text = left.extract_text()
                            if text:
                                documents.append(Document(
                                    page_content=text,
                                    metadata={"source": path, "page": page_num+1}
                                ))
                else:
                    loader = PyPDFLoader(path)
                    docs = loader.load_and_split()
                    for doc in docs:
                        doc.metadata["source"] = path
                    documents.extend(docs)
            except Exception as e:
                print(f"⚠️ Error loading {path}: {str(e)}")
                continue

        # Process documents
        chunks = self.text_splitter.split_documents(documents)
        self.vector_store = FAISS.from_documents(chunks, self.embeddings)

    def initialize_llm(self, endpoint="http://10.50.10.240:10023", model="llama3.2"):
        prompt = PromptTemplate(
            input_variables=["context", "question"],
        template="""You are a Legal RAG Assistant specialized EXCLUSIVELY in three specific regulations:
                    1. PIPEDA (Personal Information Protection and Electronic Documents Act)
                    2. GDPR (General Data Protection Regulation)
                    3. EU Artificial Intelligence Act

                    IMPORTANT RULE: You MUST ONLY answer questions directly related to these three regulations. If a question falls outside these specific domains, respond with:
                    "I can only answer questions about PIPEDA, GDPR, and the EU Artificial Intelligence Act. Please rephrase your question to relate to one of these specific regulations."

                    Answer the question based only on the following legal context:

                    Context: {context}
                    Question: {question}

                    For questions about the three permitted regulations:
                    1. Provide a concise answer that focuses on the legal requirements and implications
                    2. Only include information that is directly supported by the legal documents
                    3. Do not speculate or provide information beyond what's in the documents
                    4. Specify which regulation(s) you're referencing in your answer

                    IMPORTANT: Always conclude your response with a "Sources:" section that explicitly lists all document names and page numbers that contain information used in your answer, formatted as:

                    Sources:
                    - [Document Name] (Page X)
                    - [Document Name] (Page Y)

                    Do not include sources for identity questions about the system itself.
                    """
        )
        
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=Ollama(base_url=endpoint, model=model),
            chain_type="stuff",
            retriever=self.vector_store.as_retriever(search_kwargs={"k": 3}),
            return_source_documents=True,
            chain_type_kwargs={"prompt": prompt}
        )

    def query(self, question):
        result = self.qa_chain({"query": question})
        
        # Process sources
        sources = {}
        for doc in result["source_documents"]:
            source = doc.metadata.get("source", "Unknown")
            page = doc.metadata.get("page", "")
            key = f"{os.path.basename(source)}" + (f" (Page {page})" if page else "")
            sources[key] = doc.page_content[:200] + "..."  # Store snippet
            
        return {
            "answer": result["result"],
            "sources": list(sources.keys()),
            "source_details": sources
        }
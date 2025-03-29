import pdfplumber
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.llms import Ollama
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
import re
import json

class LegalRAGSystem:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-mpnet-base-v2"
        )
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        self.vector_store = None
        self.qa_chain = None
        
    def load_documents(self, pdf_paths):
        print("LOADING DOCUMENTS......")
        """Process both single and two-column PDFs"""
        combined_text = ""
        
        for path in pdf_paths:
            if "PIPEDA" in path:  # Two-column PDF
                with pdfplumber.open(path) as pdf:
                    for page in pdf.pages:
                        left_column = page.within_bbox((0, 0, page.width/2, page.height))
                        combined_text += left_column.extract_text() + "\n"
            else:  # Normal PDF
                loader = PyPDFLoader(path)
                docs = loader.load()
                combined_text += " ".join([d.page_content for d in docs])
        
        # Clean and chunk text
        cleaned = re.sub(r'\s+', ' ', combined_text).strip()
        chunks = self.text_splitter.split_text(cleaned)
        self.vector_store = FAISS.from_texts(chunks, self.embeddings)
        
    def initialize_llm(self, endpoint="http://10.50.10.240:10023", model="llama3.2"):
        print("LLM INITIALIZED..............")
        prompt = PromptTemplate(
            input_variables=["context", "question"],
            template="""Legal Assistant Context: {context}
                       Question: {question}
                       Answer:"""
        )
        print("Prompt", prompt)
        ollama = Ollama(base_url=endpoint, model=model)
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=ollama,
            chain_type="stuff",
            retriever=self.vector_store.as_retriever(),
            chain_type_kwargs={"prompt": prompt}
        )
    
    def query(self, question):
        print("QUERY RUNNING.............")
        print("Question", question)
        return self.qa_chain.run(question)
    
    def evaluate(self, test_file="test_questions.json"):
        with open(test_file) as f:
            tests = json.load(f)
        
        results = []
        for q, expected in tests.items():
            answer = self.query(q)
            results.append({
                "question": q,
                "answer": answer,
                "expected": expected,
                "match": expected.lower() in answer.lower()
            })
        return results
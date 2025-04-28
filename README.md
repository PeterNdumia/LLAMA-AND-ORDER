# LLAMA AND ORDER: A Legal Assistant Powered by Retrieval Augmented Generation

**Authors**: Peter Ndumia, Farhan Mahamud

---

## Project Overview

**LLAMA AND ORDER** is a legal assistant built using **Retrieval Augmented Generation (RAG)**, combining **LangChain**, **FAISS**, and a **locally hosted Llama 3.2 model** served through a **Flask** backend.  
The system retrieves and summarizes legal information from:

- **GDPR** (General Data Protection Regulation),
- **PIPEDA** (Personal Information Protection and Electronic Documents Act),
- **EU Artificial Intelligence Act**.

It offers a web-based chat interface for querying regulations quickly and accurately.

---

## Tech Stack

| Component             | Technology                                     |
| ---------------------- | ---------------------------------------------- |
| **LLM**                | Llama 3.2 via Ollama Server/API                |
| **Retrieval Pipeline** | LangChain (`RetrievalQA`, `PromptTemplate`, `LLMChain`) |
| **Embeddings**         | Hugging Face `all-mpnet-base-v2`               |
| **Vector Database**    | FAISS (Facebook AI Similarity Search)          |
| **Backend**            | Flask (Python)                                 |
| **Frontend**           | React.js (npm)                                 |
| **Document Parsing**   | LangChain loaders (`PdfPlumber`, `PyPDFLoader`) |

---

## Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/PeterNdumia/Legal-RAG-System
cd Legal-RAG-System
```

### 2. Backend Setup (Flask)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 3. Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```

### 4. Requirements
- Node.js installed
- Python 3.9+ installed
- Ollama server running Llama 3.2 locally
- GDPR, PIPEDA, and AI Act PDFs present in the working directory

---

## System Architecture

1. **Document Loading**
   - PDFs loaded with LangChain's `PdfPlumber` and `PyPDFLoader`.
   - Special extraction for English-only sections in PIPEDA.

2. **Text Preprocessing**
   - Split into chunks (~1000 characters with 200-character overlap) using `RecursiveCharacterTextSplitter`.

3. **Vectorization**
   - Sentence embeddings generated using `all-mpnet-base-v2` model.

4. **Vector Storage**
   - Embeddings stored and indexed with FAISS for efficient retrieval.

5. **Retrieval-Augmented Generation**
   - LangChain's `RetrievalQA` pipeline retrieves relevant chunks.
   - Custom `PromptTemplate` structures the Llama 3.2 inputs.
   - `LLMChain` generates user-friendly legal answers.

6. **Web Application**
   - Flask backend communicates with Llama model.
   - React frontend enables user queries and displays answers.

---

## Evaluation

- **Cosine Similarity Accuracy**: 70.02%
- **Manual Evaluation Accuracy**: 100% (all answers correct)
- **Comparison with GPT-3.5**: LLAMA AND ORDER provided more detailed, regulation-specific answers compared to general LLMs.

---

## Challenges and Solutions

- **Computational Resources**: Solved by accessing external GPU hardware.
- **PDF Multilingual Layouts**: Filtered PIPEDA to extract only English text.
- **Semantic Retrieval**: Optimized chunk sizes and vector search for better accuracy.

---

## Future Work

- Add more legal documents (e.g., CCPA, HIPAA, OECD AI Principles).
- Fine-tune the LLM on legal-specific QA datasets.
- Implement search filters by document and regulation.
- Improve frontend UX with document browsing and article lookup.

---

## References

- [GDPR Official Documentation](https://gdpr-info.eu/)
- [EU Artificial Intelligence Act](https://artificialintelligenceact.eu/)
- [Office of the Privacy Commissioner of Canada (PIPEDA)](https://www.priv.gc.ca/en/)
- [LangChain Documentation](https://python.langchain.com/docs/)
- [Sentence Transformers (Hugging Face)](https://huggingface.co/sentence-transformers/all-mpnet-base-v2)

---

> _"Compliance through intelligence: enabling responsible AI with accessible legal knowledge."_

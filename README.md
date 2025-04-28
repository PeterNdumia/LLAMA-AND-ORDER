# LLAMA AND ORDER: A Legal Assistant Using Retrieval Augmented Generation
---

## Overview

**LLAMA AND ORDER** is a legal assistant built with **Retrieval Augmented Generation (RAG)**, designed to help organizations and individuals quickly retrieve and understand regulations concerning artificial intelligence and data privacy.

It uses a combination of:
- **Llama 3.2** for language generation,
- **GDPR**, **PIPEDA**, and the **EU Artificial Intelligence Act** as legal sources,
- **FAISS** for efficient document retrieval,
- A web-based interface for interaction.

---

## Features

- **Multi-Document Search**: GDPR, PIPEDA, and AI Act integrated.
- **Semantic Retrieval**: Sentence embeddings (`all-mpnet-base-v2`) with FAISS indexing.
- **Locally Hosted LLM**: Llama 3.2 via Ollama Server/API.
- **Web Interface**: Frontend built with React.js, backend in FastAPI.

---

## System Design

1. **Data Extraction**
   - Extracted legal texts from PDFs (handling two-column English/French format for PIPEDA).
   - Chunked text (1000 characters, 200 overlap).

2. **Vectorization**
   - Used Hugging Face `all-mpnet-base-v2` model to embed text.

3. **Retrieval**
   - Stored embeddings in FAISS for fast similarity search.

4. **Answer Generation**
   - Retrieved relevant chunks and passed them to Llama 3.2 to generate final answers.

5. **Frontend/Backend**
   - React.js frontend communicates with a Flask backend.

---

## Installation

**Clone the repository**
```bash
git clone https://github.com/PeterNdumia/Legal-RAG-System
cd Legal-RAG-System


cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py


cd frontend
npm install
npm start

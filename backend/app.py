from flask import Flask, request, jsonify
from flask_cors import CORS
from rag_system import LegalRAGSystem
from langchain.vectorstores import FAISS
import os
import time

app = Flask(__name__)
CORS(app)

# Configuration
PDF_PATHS = [
    "documents/PIPEDA.pdf",
    "documents/GDPR.pdf",
    "documents/ARTIFICIALINTELLIGENCEACT.pdf"
]
VECTOR_STORE_PATH = "vector_store.faiss"

# Initialize RAG system
rag = LegalRAGSystem()

def initialize_system():
    start_time = time.time()
    
    if os.path.exists(VECTOR_STORE_PATH):
        print("Loading existing vector store...")
        rag.vector_store = FAISS.load_local(
            folder_path=VECTOR_STORE_PATH,
            embeddings=rag.embeddings,
            allow_dangerous_deserialization=True  # Added this parameter to fix deserialization error
        )
        print(f"Vector store loaded in {time.time() - start_time:.2f}s")
    else:
        print("Creating new vector store...")
        rag.load_documents(PDF_PATHS)
        rag.vector_store.save_local(VECTOR_STORE_PATH)
        print(f"Vector store created and saved in {time.time() - start_time:.2f}s")
    
    # Initialize the LLM after the vector store is ready
    print("Initializing LLM...")
    rag.initialize_llm()
    print("LLM initialized")

# Initialize during app startup
print("\n=== Starting Legal RAG System ===")
initialize_system()

@app.route('/')
def health_check():
    return jsonify({
        "status": "ready",
        "message": "Legal RAG API",
        "endpoints": {
            "query": "POST /api/query",
            "evaluate": "GET /api/evaluate",
            "reload": "POST /api/reload"
        }
    })

@app.route('/api/query', methods=['POST'])
def handle_query():
    try:
        data = request.get_json()
        question = data.get('question', '').strip()
        
        if not question:
            return jsonify({"error": "Question cannot be empty"}), 400

        print(f"Processing: {question[:50]}...")
        start_time = time.time()
        response = rag.query(question)
        
        return jsonify({
            "answer": response["answer"],
            "sources": response["sources"],
            "source_details": response["source_details"],
            "processing_time": f"{time.time() - start_time:.2f}s"
        })

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/reload', methods=['POST'])
def reload_documents():
    try:
        print("Reloading documents...")
        if os.path.exists(VECTOR_STORE_PATH):
            os.remove(VECTOR_STORE_PATH)
        initialize_system()
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
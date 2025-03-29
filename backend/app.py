from flask import Flask, request, jsonify
from rag_system import LegalRAGSystem
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

rag = LegalRAGSystem()

# Initialize system
pdf_paths = ["PIPEDA.pdf", "GDPR.pdf", "ARTIFICIALINTELLIGENCEACT.pdf"]
rag.load_documents(pdf_paths)
rag.initialize_llm()

@app.route('/')
def home():
    return "Legal RAG Backend Running!"

@app.route('/query', methods=['POST'])
def handle_query():
    data = request.json
    response = rag.query(data['question'])
    return jsonify({"answer": response})

@app.route('/evaluate', methods=['GET'])
def handle_evaluation():
    results = rag.evaluate()
    return jsonify({"results": results})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import QueryForm from './components/QueryForm';
import ResponseView from './components/ResponseView';
import { queryRAG } from './services/api';

function App() {
  const [answer, setAnswer] = useState('');

  const handleQuerySubmit = async (question) => {
    const response = await queryRAG(question);
    setAnswer(response);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <h1>Legal RAG Assistant</h1>
      <QueryForm onSubmit={handleQuerySubmit} />
      {answer && <ResponseView answer={answer} />}
    </Container>
  );
}

export default App;
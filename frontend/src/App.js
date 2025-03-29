import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import { queryRAG } from './services/api';
import theme from './styles/theme';
import InputBar from './components/InputBar';

function App() {
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your Legal AI Assistant. Ask me anything about PIPEDA, GDPR, or the AI Act.", 
      sender: 'bot' 
    }
  ]);

  const handleSend = async (message) => {
    // Add user message
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    
    // Get bot response
    const response = await queryRAG(message);
    setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        bgcolor: 'background.default'
      }}>
        <Header />
        <ChatWindow messages={messages} />
        <InputBar onSend={handleSend} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
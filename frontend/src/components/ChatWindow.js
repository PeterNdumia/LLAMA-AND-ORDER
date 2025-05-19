import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Message from './Message';

export default function ChatWindow({ messages, isLoading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{
      flex: 1,
      overflowY: 'auto',
      p: 2,
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#cbd5e0',
        borderRadius: '3px',
      },
    }}>
      {messages.length === 0 && !isLoading ? (
        <Box sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'text.secondary',
        }}>
          <Typography variant="h6" gutterBottom>
            Welcome to Llama and Order
          </Typography>
          <Typography>
            Ask questions about PIPEDA, GDPR, or the EU AI Act
          </Typography>
        </Box>
      ) : (
        messages.map((msg, index) => (
          <Message 
            key={index} 
            text={msg.text} 
            sender={msg.sender}
            sources={msg.sources}
            timestamp={msg.timestamp}
          />
        ))
      )}
      {isLoading && (
        <Message 
          text="Researching your question..."
          sender="bot"
          isLoading={true}
        />
      )}
      <div ref={endRef} />
    </Box>
  );
}
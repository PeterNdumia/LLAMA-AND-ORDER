import React, { useEffect, useRef } from 'react';
import { Box} from '@mui/material';
import Message from './Message';

export default function ChatWindow({ messages }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{
      flex: 1,
      overflowY: 'auto',
      p: 2,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)'
    }}>
      {messages.map((msg, index) => (
        <Message 
          key={index} 
          text={msg.text} 
          sender={msg.sender} 
        />
      ))}
      <div ref={endRef} />
    </Box>
  );
}
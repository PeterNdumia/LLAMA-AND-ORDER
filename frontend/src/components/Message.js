import React from 'react';
import { Box, Typography, Avatar, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const MessageBubble = styled(Box)(({ theme, sender }) => ({
  maxWidth: '70%',
  padding: theme.spacing(1.5, 2),
  marginBottom: theme.spacing(2),
  borderRadius: sender === 'user' 
    ? '18px 18px 0 18px' 
    : '18px 18px 18px 0',
  backgroundColor: sender === 'user' 
    ? theme.palette.primary.main 
    : theme.palette.grey[200],
  color: sender === 'user' ? '#fff' : theme.palette.text.primary,
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
  boxShadow: theme.shadows[1],
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap'
}));

export default function Message({ text, sender, sources }) {
  // Handle both string and RAG response object
  const content = typeof text === 'object' ? text.answer : text;
  const messageSources = sources || (typeof text === 'object' ? text.sources : []);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: sender === 'user' ? 'flex-end' : 'flex-start',
      width: '100%'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        {sender === 'bot' && (
          <Avatar 
            sx={{ 
              width: 24, 
              height: 24, 
              mr: 1,
              bgcolor: 'primary.main',
              fontSize: '0.75rem'
            }}
          >
            AI
          </Avatar>
        )}
        <Typography variant="caption" color="text.secondary">
          {sender === 'user' ? 'You' : 'Legal Assistant'}
        </Typography>
      </Box>
      
      <MessageBubble sender={sender}>
        <Typography>{content}</Typography>
        
        {messageSources && messageSources.length > 0 && (
          <>
            <Divider sx={{ 
              my: 1, 
              borderColor: sender === 'user' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' 
            }} />
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 0.5,
              '& .MuiChip-root': {
                fontSize: '0.65rem',
                height: 20,
                color: sender === 'user' ? 'rgba(255,255,255,0.8)' : undefined,
                borderColor: sender === 'user' ? 'rgba(255,255,255,0.3)' : undefined
              }
            }}>
              {messageSources.map((source, index) => (
                <Chip 
                  key={index}
                  label={source}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </>
        )}
      </MessageBubble>
    </Box>
  );
}
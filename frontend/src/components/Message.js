import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
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

export default function Message({ text, sender }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: sender === 'user' ? 'flex-end' : 'flex-start'
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
        <Typography>{text}</Typography>
      </MessageBubble>
    </Box>
  );
}
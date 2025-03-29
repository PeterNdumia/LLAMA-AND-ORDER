import React, { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function InputBar({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
      p: 2,
      borderTop: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="outlined"
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a legal question..."
          sx={{
            mr: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '24px',
              bgcolor: 'background.default'
            }
          }}
        />
        <IconButton 
          type="submit" 
          color="primary"
          disabled={!message.trim()}
          sx={{ 
            p: '10px',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
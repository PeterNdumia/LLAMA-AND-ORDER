import React, { useState } from 'react';
import { Box, TextField, IconButton, Tooltip,Typography, } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function InputBar({ onSend, disabled }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{
        p: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 1,
      }}>
        <Tooltip title="Attach document">
          <IconButton size="small">
            <AttachFileIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="outlined"
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about PIPEDA, GDPR, or EU AI Act..."
          disabled={disabled}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '24px',
              bgcolor: 'background.default',
              '& fieldset': {
                borderColor: 'divider',
              },
            },
          }}
        />
        
        <Tooltip title="Voice input">
          <IconButton size="small" disabled={disabled}>
            <MicIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        
        <IconButton 
          type="submit" 
          color="primary"
          disabled={!message.trim() || disabled}
          sx={{ 
            p: '10px',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
            '&:disabled': {
              bgcolor: 'grey.300',
              color: 'grey.500',
            },
          }}
        >
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        Llama and Order may produce inaccurate information about laws and regulations.
      </Typography>
    </Box>
  );
}
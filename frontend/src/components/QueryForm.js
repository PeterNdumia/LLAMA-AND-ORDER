import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function QueryForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a legal question..."
      />
      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
}
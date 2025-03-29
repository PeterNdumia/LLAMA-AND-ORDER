import React from 'react';
import { Paper, Typography } from '@mui/material';

export default function ResponseView({ answer }) {
  return (
    <Paper elevation={3} sx={{ p: 3, my: 2 }}>
      <Typography variant="h6">Answer:</Typography>
      <Typography component="div" sx={{ whiteSpace: 'pre-wrap' }}>
        {answer}
      </Typography>
    </Paper>
  );
}
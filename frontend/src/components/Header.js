import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';

export default function Header() {
  return (
    <AppBar 
      position="sticky"
      elevation={0}
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BalanceIcon color="primary" fontSize="large" />
          <Typography variant="h6" fontWeight="bold">
            Llama and Order
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          A Peter Ndumia Production
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
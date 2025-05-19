import React from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Chip, 
  Divider, 
  Skeleton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MessageBubble = styled(Box)(({ theme, sender }) => ({
  maxWidth: 'min(80%, 700px)',
  padding: theme.spacing(1.5, 2),
  marginBottom: theme.spacing(1.5),
  borderRadius: sender === 'user' 
    ? '18px 18px 0 18px' 
    : '18px 18px 18px 0',
  backgroundColor: sender === 'user' 
    ? theme.palette.primary.main 
    : theme.palette.background.paper,
  color: sender === 'user' ? '#fff' : theme.palette.text.primary,
  alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
  boxShadow: theme.shadows[1],
  wordWrap: 'break-word',
  whiteSpace: 'pre-wrap',
  border: sender !== 'user' ? `1px solid ${theme.palette.divider}` : 'none',
}));

export default function Message({ text, sender, sources, timestamp, isLoading }) {
  const content = typeof text === 'object' ? text.answer : text;
  const messageSources = sources || (typeof text === 'object' ? text.sources : []);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: sender === 'user' ? 'flex-end' : 'flex-start',
      width: '100%',
      px: 1,
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 0.5,
        gap: 1,
      }}>
        {sender === 'bot' && (
          <Avatar 
            sx={{ 
              width: 28, 
              height: 28, 
              bgcolor: 'primary.light',
              fontSize: '0.75rem'
            }}
          >
            <VerifiedIcon fontSize="small" />
          </Avatar>
        )}
        <Typography variant="caption" color="text.secondary">
          {sender === 'user' ? 'You' : 'Llama and Order'}
        </Typography>
        {timestamp && (
          <Tooltip title={new Date(timestamp).toLocaleString()}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon fontSize="inherit" />
              <Typography variant="caption" color="text.secondary">
                {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
          </Tooltip>
        )}
      </Box>
      
      <MessageBubble sender={sender}>
        {isLoading ? (
          <>
            <Skeleton width="60%" />
            <Skeleton width="80%" />
            <Skeleton width="70%" />
          </>
        ) : (
          <>
            <Typography>{content}</Typography>
            
            {messageSources && messageSources.length > 0 && (
              <>
                <Divider sx={{ 
                  my: 1.5, 
                  borderColor: sender === 'user' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' 
                }} />
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: 1,
                }}>
                  <Typography variant="caption" sx={{ width: '100%', mb: 0.5 }}>
                    Sources referenced:
                  </Typography>
                  {messageSources.map((source, index) => (
                    <Chip 
                      key={index}
                      label={source}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: sender === 'user' ? 'rgba(255,255,255,0.3)' : undefined,
                        color: sender === 'user' ? 'rgba(255,255,255,0.8)' : undefined,
                      }}
                    />
                  ))}
                </Box>
              </>
            )}
          </>
        )}
      </MessageBubble>
    </Box>
  );
}
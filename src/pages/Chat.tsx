import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Box, Button, TextField, Typography } from '@mui/material';

const socket = io('http://localhost:4000');

export default function Chat() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected:', socket.id);
    });

    socket.on('message', (msg: string) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message'); // cleanup
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('message', input);
      setInput('');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Socket.IO Chat</Typography>
      <Box sx={{ mt: 2, mb: 2 }}>
        {messages.map((msg, i) => (
          <Typography key={i}>{msg}</Typography>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <Button variant="contained" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

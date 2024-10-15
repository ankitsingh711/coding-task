import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { createOrder } from '../services/api';

const OrderForm = () => {
  const [orderID, setOrderID] = useState('');
  const [productId, setProductId] = useState('');
  const [orderedOn, setOrderedOn] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = { orderID, productId, orderedOn, userId };
    try {
      await createOrder(orderData);
      alert('Order created successfully');
    } catch (error) {
      alert('Error creating order');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create Order
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Order ID"
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Ordered On"
            value={orderedOn}
            onChange={(e) => setOrderedOn(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Create Order
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default OrderForm;

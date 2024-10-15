import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { createProduct } from '../services/api';

const ProductForm = () => {
  const [productId, setProductId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = { productId };
    try {
      await createProduct(productData);
      alert('Product created successfully');
    } catch (error) {
      alert('Error creating product');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
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
            Create Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProductForm;

import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import productRoutes from './routes/productRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/products', productRoutes);

app.use(errorHandler);

app.listen(2300, () => {
  console.log('Server running on port 2300');
});

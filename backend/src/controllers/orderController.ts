import { Request, Response } from 'express';
import Order from '../models/orderModel';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { orderID, productId, orderedOn, userId } = req.body;
    const newOrder = new Order({ orderID, productId, orderedOn, userId });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

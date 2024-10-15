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

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { address, productId, orderedOn, userId } = req.query;

    let filter: any = {};

    if (address) filter.address = { $regex: address, $options: 'i' };
    if (productId) filter.productId = productId;
    if (orderedOn) filter.orderedOn = orderedOn;
    if (userId) filter.userId = userId;

    const orders = await Order.find(filter);

    res.status(200).json({ data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

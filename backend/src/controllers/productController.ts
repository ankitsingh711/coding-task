import { Request, Response } from 'express';
import Product from '../models/productModel';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const newProduct = new Product({ productId });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

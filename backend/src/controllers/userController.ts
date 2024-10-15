import { Request, Response } from 'express';
import User from '../models/userModel';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, address, phoneNumber, emailAddress } = req.body;
    const newUser = new User({ username, address, phoneNumber, emailAddress });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

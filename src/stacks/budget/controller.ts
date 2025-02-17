import { Request, Response } from 'express';
import Budget from './model';

export const getBudgets = async (req: Request, res: Response) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ...other CRUD operations...
import { Request, Response } from 'express';
import { Category } from '../models/Category';

// פונקציה ליצירת קטגוריה חדשה
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // בדיקה שחובה להביא שם קטגוריה
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    // יצירת הקטגוריה במסד הנתונים
    const newCategory = await Category.create({ name, description });

    return res.status(201).json({
      message: 'Category created successfully',
      category: newCategory
    });

  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
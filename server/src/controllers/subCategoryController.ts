import { Request, Response } from 'express';
import { SubCategory } from '../models/SubCategory';

// פונקציה ליצירת תת-קטגוריה חדשה
export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, categoryId } = req.body;

    // בדיקה שחובה להביא שם וגם את ה-ID של הקטגוריה הגדולה
    if (!name || !categoryId) {
      return res.status(400).json({ message: 'Name and categoryId are required' });
    }

    // יצירת תת-הקטגוריה
    const newSubCategory = await SubCategory.create({ name, description, categoryId });

    return res.status(201).json({
      message: 'Sub-category created successfully',
      subCategory: newSubCategory
    });

  } catch (error) {
    console.error('Error creating sub-category:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
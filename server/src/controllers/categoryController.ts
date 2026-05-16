import { Request, Response } from 'express';
import { Category } from '../models/Category';

// 1. פונקציה ליצירת קטגוריה חדשה (כבר קיימת אצלך)
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

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

// 2. הפונקציה החדשה: שליפת כל הקטגוריות (GET)
export const getCategories = async (req: Request, res: Response) => {
  try {
    // הפקודה findAll הולכת ל-MySQL ומביאה את כל השורות מטבלת categories
    const categories = await Category.findAll();
    
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
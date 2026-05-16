import { Request, Response } from 'express';
import { Course } from '../models/Course';

// פונקציה ליצירת קורס חדש
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, price, subCategoryId } = req.body;

    // בדיקה שחובה להביא כותרת, מחיר ותת-קטגוריה
    if (!title || price === undefined || !subCategoryId) {
      return res.status(400).json({ message: 'Title, price and subCategoryId are required' });
    }

    // יצירת הקורס במסד הנתונים
    const newCourse = await Course.create({ title, description, price, subCategoryId });

    return res.status(201).json({
      message: 'Course created successfully',
      course: newCourse
    });

  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
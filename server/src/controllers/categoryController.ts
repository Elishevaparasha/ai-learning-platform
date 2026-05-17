import { Request, Response } from 'express';
import { Category } from '../models/Category';
import { SubCategory } from '../models/SubCategory'; // ייבוא חדש שצריך להוסיף למעלה
import { Course } from '../models/Course';         // ייבוא חדש שצריך להוסיף למעלה

// 1. יצירת קטגוריה (נשאר אותו דבר)
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });
    const newCategory = await Category.create({ name, description });
    return res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// 2. הפונקציה המשודרגת לשלב 4 - שולפת הכל כולל הכל!
export const getCategories = async (req: Request, res: Response) => {
  try {
    // אנחנו אומרים ל-Sequelize להביא את הקטגוריות ולכלול בפנים את תתי-הקטגוריות והקורסים
    const categories = await Category.findAll({
      include: [
        {
          model: SubCategory,
          as: 'subCategories',
          include: [
            {
              model: Course,
              as: 'courses'
            }
          ]
        }
      ]
    });
    
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories with details:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
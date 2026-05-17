import { Request, Response } from 'express';
import { Prompt } from '../models/Prompt';
import { SubCategory } from '../models/SubCategory';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { generateAIResponse } from '../services/aiService';

// 1. יצירת פרומפט וקבלת תשובה מה-AI [cite: 26, 34]
export const createPrompt = async (req: Request, res: Response) => {
  try {
    const { title, subCategoryId } = req.body;
    const userId = req.body.userId || 1; // ברירת מחדל 1 לבדיקות מוקדמות

    if (!title || !subCategoryId) {
      return res.status(400).json({ message: 'Title and subCategoryId are required' });
    }

    const subCategory = await SubCategory.findByPk(subCategoryId, {
      include: [{ model: Category }]
    });

    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    const categoryName = (subCategory as any).Category?.name || 'General';
    const subCategoryName = subCategory.name;

    // קריאה ל-Gemini AI המחובר והאמיתי שלנו
    const aiAnswer = await generateAIResponse(categoryName, subCategoryName, title);

    // שמירה למסד הנתונים [cite: 26]
    const newPrompt = await Prompt.create({
      title: title,
      content: aiAnswer,
      subCategoryId,
      userId
    });

    return res.status(201).json({
      message: 'AI response generated and saved successfully',
      prompt: newPrompt
    });

  } catch (error) {
    console.error('Error in createPrompt:', error);
    return res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
};

// 2. שליפת היסטוריית הלמידה של משתמש ספציפי [cite: 28, 36]
export const getUserHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const history = await Prompt.findAll({
      where: { userId },
      include: [{ model: SubCategory, attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching user history:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// 3. שליפת כל הפרומפטים במערכת עבור דשבורד מנהל (Admin) 
export const getAdminDashboardData = async (req: Request, res: Response) => {
  try {
    const allPrompts = await Prompt.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'phone'] }, // מציג מי המשתמש ששאל [cite: 23]
        { model: SubCategory, attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(allPrompts);
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
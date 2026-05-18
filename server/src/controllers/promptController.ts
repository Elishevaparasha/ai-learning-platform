import { Request, Response } from 'express';
import { Prompt } from '../models/Prompt';
import { Category } from '../models/Category';
import { SubCategory } from '../models/SubCategory';
import { User } from '../models/User';
import { generateAIResponse } from '../services/aiService';

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const { prompt, subCategoryId, userId = 1 } = req.body;

    if (!prompt || !subCategoryId) {
      return res.status(400).json({ message: 'prompt and subCategoryId are required' });
    }

    const subCategory = await SubCategory.findByPk(subCategoryId, {
      include: [{ model: Category, as: 'category' }]
    });

    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    const category = (subCategory as any).category;
    const categoryId = category?.id || subCategory.categoryId;
    const categoryName = category?.name || 'General';
// חיבור של כל הנתונים למשפט אחד ברור עבור ה-AI
const fullPrompt = `Subject Category: ${categoryName}, Sub-category: ${subCategory.name}. User Request: ${prompt}`;

// שליחה של הארגומנט האחד והיחיד לפונקציה
const aiResponse = await generateAIResponse(fullPrompt);

    const newPrompt = await Prompt.create({
      userId,
      categoryId,
      subCategoryId,
      prompt,
      response: aiResponse,
    });

    return res.status(201).json({ message: 'AI response generated and saved successfully', prompt: newPrompt });
  } catch (error) {
    console.error('Error in createPrompt:', error);
    return res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
};

export const getUserHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const history = await Prompt.findAll({
      where: { userId },
      include: [
        { model: Category, as: 'Category', attributes: ['id', 'name'] },
        { model: SubCategory, as: 'SubCategory', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching user history:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAdminDashboardData = async (req: Request, res: Response) => {
  try {
    const allPrompts = await Prompt.findAll({
      include: [
        { model: User, as: 'User', attributes: ['id', 'name', 'phone'] },
        { model: Category, as: 'Category', attributes: ['id', 'name'] },
        { model: SubCategory, as: 'SubCategory', attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(allPrompts);
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

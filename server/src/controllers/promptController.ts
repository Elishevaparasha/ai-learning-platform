import { Request, Response } from 'express';
import { Prompt } from '../models/Prompt';
import { SubCategory } from '../models/SubCategory';
import { Category } from '../models/Category';
import { generateAIResponse } from '../services/aiService';

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const { title, subCategoryId } = req.body;
    
    // שליפת ה-userId מתוך ה-Token (שומר הסף מזריק אותו לתוך req.user או req.body בהתאם ל-Middleware שלך)
    // אם ה-middleware שלך שומר את זה ב-req.body.userId, נשתמש בזה:
    const userId = req.body.userId || 1; // ברירת מחדל 1 לבדיקות ראשוניות

    // 1. בדיקה שכל השדות הנדרשים הגיעו מהלקוח
    if (!title || !subCategoryId) {
      return res.status(400).json({ message: 'Title (question) and subCategoryId are required' });
    }

    // 2. שליפת פרטי תת-הקטגוריה והקטגוריה כדי לשלוח הקשר חכם ל-AI
    const subCategory = await SubCategory.findByPk(subCategoryId, {
      include: [{ model: Category }] // מניח שיש קשר מוגדר בין SubCategory ל-Category
    });

    if (!subCategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    const categoryName = (subCategory as any).Category?.name || 'General';
    const subCategoryName = subCategory.name;

    // 3. פנייה לשירות ה-AI וקבלת התשובה (מפעיל את aiService)
    const aiAnswer = await generateAIResponse(categoryName, subCategoryName, title);

    // 4. שמירת השאלה והתשובה במסד הנתונים לפי המודל שלך
    const newPrompt = await Prompt.create({
      title: title,            // השאלה של המשתמש
      content: aiAnswer,       // התשובה שחזרה מה-AI
      subCategoryId,
      userId
    });

    // 5. החזרת התשובה בהצלחה לקליינט
    return res.status(201).json({
      message: 'AI response generated and saved successfully',
      prompt: newPrompt
    });

  } catch (error) {
    console.error('Error in createPrompt:', error);
    return res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
};
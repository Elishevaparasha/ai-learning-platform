import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/categoryController';

const router = Router();

// נתיב לקבלת כל הקטגוריות ותתי-הקטגוריות
router.get('/', getCategories);

// נתיב ליצירת קטגוריה חדשה
router.post('/', createCategory);

export default router;
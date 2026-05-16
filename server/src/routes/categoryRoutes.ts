import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/categoryController'; // הוספנו את getCategories בייבוא

const router = Router();

// נתיב ליצירת קטגוריה (כבר קיים)
router.post('/create', createCategory);

// הנתיב החדש: קבלת כל הקטגוריות
router.get('/all', getCategories);

export default router;
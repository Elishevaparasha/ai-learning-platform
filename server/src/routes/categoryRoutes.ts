import { Router } from 'express';
import { createCategory } from '../controllers/categoryController';

const router = Router();

// נתיב ליצירת קטגוריה
router.post('/create', createCategory);

export default router;
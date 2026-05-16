import { Router } from 'express';
import { createSubCategory } from '../controllers/subCategoryController';

const router = Router();

// נתיב ליצירת תת-קטגוריה
router.post('/create', createSubCategory);

export default router;
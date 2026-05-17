import { Router } from 'express';
import { createPrompt, getUserHistory, getAdminDashboardData } from '../controllers/promptController';

const router = Router();

// יצירת שאלה וקבלת תשובת AI [cite: 34]
router.post('/generate', createPrompt);

// היסטוריית למידה של משתמש ספציפי 
router.get('/history/:userId', getUserHistory);

// דשבורד מנהל - כל הפרומפטים וכל המשתמשים 
router.get('/admin/all', getAdminDashboardData);

export default router;
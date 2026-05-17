import { Router } from 'express';
import { createPrompt, getUserHistory, getAdminDashboardData } from '../controllers/promptController';

const router = Router();

// יצירת שאלה וקבלת תשובת AI
router.post('/generate', createPrompt);

// היסטוריית למידה של משתמש
router.get('/history/:userId', getUserHistory);

// דשבורד מנהל - כל הפרומפטים
router.get('/admin/all', getAdminDashboardData);

export default router;
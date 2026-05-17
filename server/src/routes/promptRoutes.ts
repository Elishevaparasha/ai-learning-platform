import { Router } from 'express';
import { createPrompt } from '../controllers/promptController';
// אם יש לך middleware של אימות טוקן, ייבאי אותו כאן. למשל:
// import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// נתיב ליצירת שאלה וקבלת תשובת AI
// אם יש לך את ה-middleware, תוסיפי אותו כאן באמצע כדי להגן על הנתיב
router.post('/generate', createPrompt);

export default router;
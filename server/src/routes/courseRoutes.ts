import { Router } from 'express';
import { createCourse } from '../controllers/courseController';
import { authenticateJWT, isAdmin } from '../middlewares/authMiddleware'; // מייבאים את ההגנות החדשות

const router = Router();

// הוספנו את authenticateJWT ואת isAdmin בתור שומרי סף לפני שמגיעים ל-createCourse
router.post('/create', authenticateJWT, isAdmin, createCourse);

export default router;
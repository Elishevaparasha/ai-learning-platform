import { Router } from 'express';
import { createCourse } from '../controllers/courseController';

const router = Router();

// נתיב ליצירת קורס
router.post('/create', createCourse);

export default router;
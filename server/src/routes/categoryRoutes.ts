import { Router } from 'express';
import { createCategory, getCategories, getSubCategoriesByCategoryId } from '../controllers/categoryController';

const router = Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.get('/:id/subcategories', getSubCategoriesByCategoryId);

export default router;
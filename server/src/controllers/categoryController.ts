import { Request, Response } from 'express';
import { Category } from '../models/Category';
import { SubCategory } from '../models/SubCategory';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name is required' });
    const newCategory = await Category.create({ name, description });
    return res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({ include: [{ model: SubCategory, as: 'subCategories' }] });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSubCategoriesByCategoryId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subCategories = await SubCategory.findAll({ where: { categoryId: id } });
    return res.status(200).json(subCategories);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
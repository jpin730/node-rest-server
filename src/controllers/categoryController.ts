import { RequestHandler } from 'express';

import { Category } from '../models/category';

export const postCategory: RequestHandler = async (req, res) => {
  const name = req.body.name.toUpperCase();

  const categoryExists = !!(await Category.findOne({ name }));

  if (categoryExists) {
    return res.status(400).json({ error: `Category already exists` });
  }

  const createdCategory = new Category({
    name,
    user: req.body.user.id,
  });

  try {
    await createdCategory.save();
    res.status(201).json({ createdCategory });
  } catch (error) {
    res.status(500).json(error);
  }
};

import { RequestHandler } from 'express';
import { FilterQuery } from 'mongoose';

import { Category, ICategory } from '../models/category';
import { intParser } from '../helpers/intParser';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../utils/constants';

export const getAllCategories: RequestHandler = async (req, res) => {
  const { limit, offset } = req.query;

  const parsedLimit = intParser(limit as string, DEFAULT_LIMIT);
  const parsedOffset = intParser(offset as string, DEFAULT_OFFSET);

  const filter: FilterQuery<ICategory> = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(filter),
    Category.find(filter)
      .populate('user', 'username')
      .skip(parsedOffset)
      .limit(parsedLimit),
  ]);

  res.json({ total, limit: parsedLimit, offset: parsedOffset, categories });
};

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

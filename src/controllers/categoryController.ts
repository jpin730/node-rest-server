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

  res
    .status(200)
    .json({ total, limit: parsedLimit, offset: parsedOffset, categories });
};

export const getCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', 'username');

  res.status(200).json({ category });
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

export const putCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  let { name, user } = req.body;

  name = name.toUpperCase();
  user = req.body.user.id;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, user },
      { new: true },
    ).populate('user', 'username');

    res.status(201).json({ updatedCategory });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndUpdate(id, {
      status: false,
    }).populate('user', 'username');

    res.status(201).json({ deletedCategory });
  } catch (error) {
    res.status(500).json(error);
  }
};

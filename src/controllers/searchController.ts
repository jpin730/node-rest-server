import { RequestHandler, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { COLLECTIONS, CollectionEnum } from '../utils/constants';
import { User } from '../models/user';
import { Category } from '../models/category';
import { Product } from '../models/product';

const searchUsers = async (query: string, res: Response) => {
  if (isValidObjectId(query)) {
    const user = await User.findById(query);
    if (user) {
      return res.json({ results: [user] });
    }
  }

  const regex = new RegExp(query, 'i');
  const usuarios = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  res.json({
    results: usuarios,
  });
};

const searchCategories = async (query: string, res: Response) => {
  if (isValidObjectId(query)) {
    const category = await Category.findById(query).populate(
      'user',
      'username',
    );
    if (category) {
      return res.json({ results: [category] });
    }
  }

  const regex = new RegExp(query, 'i');
  const categories = await Category.find({
    name: regex,
    status: true,
  }).populate('user', 'username');
  res.json({
    results: categories,
  });
};

const searchProducts = async (query: string, res: Response) => {
  if (isValidObjectId(query)) {
    const product = await Product.findById(query)
      .populate('category', 'name')
      .populate('user', 'username');

    if (product) {
      return res.json({ results: [product] });
    }
  }

  const regex = new RegExp(query, 'i');
  const products = await Product.find({
    name: regex,
    status: true,
  })
    .populate('category', 'name')
    .populate('user', 'username');

  res.json({
    results: products,
  });
};

export const search: RequestHandler = (req, res) => {
  const { collection, query } = req.params;

  switch (collection) {
    case CollectionEnum.USERS:
      searchUsers(query, res);
      break;

    case CollectionEnum.CATEGORIES:
      searchCategories(query, res);
      break;

    case CollectionEnum.PRODUCTS:
      searchProducts(query, res);
      break;

    default:
      res.status(400).json({
        error: `Invalid collection. Allowed collections: ${COLLECTIONS}`,
      });
      break;
  }
};

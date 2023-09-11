import { RequestHandler, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import {
  COLLECTIONS,
  CollectionEnum,
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
} from '../utils/constants';
import { User } from '../models/user';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { createErrorResponse } from '../helpers/createErrorResponse';
import { intParser } from '../helpers/intParser';

const searchUsers = async (
  query: string,
  res: Response,
  limit: number,
  offset: number,
) => {
  if (isValidObjectId(query)) {
    const user = await User.findById(query);
    if (user) {
      return res.json({ total: 1, limit, offset, users: [user] });
    }
  }

  const regex = new RegExp(query, 'i');
  const filter = {
    $or: [{ username: regex }, { email: regex }],
    $and: [{ status: true }],
  };
  const [total, users] = await Promise.all([
    User.count(filter),
    User.find(filter).limit(limit).skip(offset),
  ]);

  res.json({
    total,
    limit,
    offset,
    users,
  });
};

const searchCategories = async (
  query: string,
  res: Response,
  limit: number,
  offset: number,
) => {
  if (isValidObjectId(query)) {
    const category = await Category.findById(query).populate(
      'user',
      'username',
    );
    if (category) {
      return res.json({ total: 1, limit, offset, categories: [category] });
    }
  }

  const regex = new RegExp(query, 'i');
  const filter = {
    name: regex,
    status: true,
  };
  const [total, categories] = await Promise.all([
    Category.count(filter),
    Category.find(filter)
      .populate('user', 'username')
      .limit(limit)
      .skip(offset),
  ]);

  res.json({
    total,
    limit,
    offset,
    categories,
  });
};

const searchProducts = async (
  query: string,
  res: Response,
  limit: number,
  offset: number,
) => {
  if (isValidObjectId(query)) {
    const product = await Product.findById(query)
      .populate('category', 'name')
      .populate('user', 'username');

    if (product) {
      return res.json({ total: 1, limit, offset, products: [product] });
    }
  }

  const regex = new RegExp(query, 'i');
  const filter = {
    name: regex,
    status: true,
  };
  const [total, products] = await Promise.all([
    Product.count(filter),
    Product.find(filter)
      .populate('category', 'name')
      .populate('user', 'username')
      .limit(limit)
      .skip(offset),
  ]);

  res.json({
    total,
    limit,
    offset,
    products,
  });
};

export const search: RequestHandler = (req, res) => {
  const { limit, offset } = req.query;

  const parsedLimit = intParser(limit as string, DEFAULT_LIMIT);
  const parsedOffset = intParser(offset as string, DEFAULT_OFFSET);

  const { collection, query } = req.params;

  switch (collection) {
    case CollectionEnum.USERS:
      searchUsers(query, res, parsedLimit, parsedOffset);
      break;

    case CollectionEnum.CATEGORIES:
      searchCategories(query, res, parsedLimit, parsedOffset);
      break;

    case CollectionEnum.PRODUCTS:
      searchProducts(query, res, parsedLimit, parsedOffset);
      break;

    default:
      res
        .status(400)
        .json(
          createErrorResponse(
            `Invalid collection. Allowed collections: ${COLLECTIONS}`,
          ),
        );
      break;
  }
};

import { RequestHandler } from 'express';
import { FilterQuery } from 'mongoose';

import { IProduct, Product } from '../models/product';
import { intParser } from '../helpers/intParser';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../utils/constants';

export const getAllProducts: RequestHandler = async (req, res) => {
  const { limit, offset } = req.query;

  const parsedLimit = intParser(limit as string, DEFAULT_LIMIT);
  const parsedOffset = intParser(offset as string, DEFAULT_OFFSET);

  const filter: FilterQuery<IProduct> = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .populate('user', 'username')
      .populate('category', 'name')
      .skip(parsedOffset)
      .limit(parsedLimit),
  ]);

  res.status(200).json({
    total,
    limit: parsedLimit,
    offset: parsedOffset,
    products,
  });
};

export const getProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate('user', 'username')
    .populate('category', 'name');

  res.status(200).json({ product });
};

export const postProduct: RequestHandler = async (req, res) => {
  const name = req.body.name.toUpperCase();
  const { category, user, description, price, inStock } = req.body;

  const productExists = !!(await Product.findOne({ name }));

  if (productExists) {
    return res.status(400).json({ error: 'Product already exists' });
  }

  const createdProduct = new Product({
    name,
    status: true,
    category,
    user: user._id,
    description,
    price,
    inStock,
  });

  try {
    await createdProduct.save();
    res.status(201).json({ createdProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const putProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();
  const { category, user, description, price, inStock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        user: user._id,
        description,
        price,
        inStock,
      },
      { new: true },
    )
      .populate('user', 'username')
      .populate('category', 'name');

    res.status(201).json({ updatedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      id,
      { status: false },
      { new: true },
    );
    res.json({ deletedProduct });
  } catch (error) {
    res.status(500).json(error);
  }
};

import { RequestHandler } from 'express';

import { Product } from '../models/product';

export const getAllProducts: RequestHandler = async (req, res) => {
  res.status(200).json({ req });
};

export const getProduct: RequestHandler = async (req, res) => {
  res.status(200).json({ req });
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
  res.status(200).json({ req });
};

export const deleteProduct: RequestHandler = async (req, res) => {
  res.status(200).json({ req });
};

import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../models/user';

export const getUsers: RequestHandler = (req, res) => {
  const { query } = req;
  res.status(200).json({ query });
};

export const postUser: RequestHandler = async (req, res) => {
  const { role, password, email, username } = req.body;
  const createdUser = new User({
    role,
    password,
    email,
    username,
  });

  const salt = bcrypt.genSaltSync();
  createdUser.password = bcrypt.hashSync(password, salt);

  try {
    await createdUser.save();
    res.status(201).json({ createdUser });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const putUser: RequestHandler = (req, res) => {
  const { body, params } = req;
  res.status(201).json({ body, params });
};

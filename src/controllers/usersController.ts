import { RequestHandler } from 'express';
import { FilterQuery } from 'mongoose';

import { IUser, User } from '../models/user';
import { encrypt } from '../helpers/encrypt';
import { intParser } from '../helpers/intParser';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../utils/constants';

export const getUsers: RequestHandler = async (req, res) => {
  const { limit, offset } = req.query;

  const parsedLimit = intParser(limit as string, DEFAULT_LIMIT);
  const parsedOffset = intParser(offset as string, DEFAULT_OFFSET);

  const filter: FilterQuery<IUser> = { status: true };

  const [total, users] = await Promise.all([
    User.count(filter),
    User.find(filter).limit(parsedLimit).skip(parsedOffset),
  ]);

  res
    .status(200)
    .json({ total, limit: parsedLimit, offset: parsedOffset, users });
};

export const postUser: RequestHandler = async (req, res) => {
  const { role, password, email, username } = req.body;
  const createdUser = new User({
    role,
    password,
    email,
    username,
  });

  createdUser.password = encrypt(password);

  try {
    await createdUser.save();
    res.status(201).json({ createdUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const putUser: RequestHandler = async (req, res) => {
  const { body, params } = req;
  delete body._id;
  delete body.google;
  delete body.email;
  const { password, ...rest } = body;

  if (password) {
    rest.password = encrypt(password);
  }

  try {
    const modifiedUser = await User.findByIdAndUpdate(
      params.id as string,
      rest,
      { returnDocument: 'after' },
    );
    res.status(201).json({ modifiedUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { params } = req;

  try {
    const deletedUser = await User.findByIdAndUpdate(
      params.id as string,
      { status: false },
      { returnDocument: 'after' },
    );
    res.status(201).json({ deletedUser });
  } catch (error) {
    res.status(500).json(error);
  }
};

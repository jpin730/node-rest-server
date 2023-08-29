import { RequestHandler } from 'express';

import { User } from '../models/user';
import { encrypt } from '../helpers/encrypt';

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

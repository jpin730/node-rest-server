import { RequestHandler } from 'express';
import { compareSync } from 'bcryptjs';

import { User } from '../models/user';
import { generateJWT } from '../helpers/generateJWT';
import { googleVerify } from '../helpers/googleVerify';
import { RolesEnum } from '../utils/constants';

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: 'Email or password are incorrect - email' });
    }

    if (!user.status) {
      return res
        .status(400)
        .json({ error: 'Email or password are incorrect - status' });
    }

    const validPassword = compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        error: 'Email or password are incorrect - password',
      });
    }

    const token = await generateJWT(user.id);

    res.status(201).json({ user, token });
  } catch {
    res.status(500).json({
      error: 'Could not complete login',
    });
  }
};

export const googleSignIn: RequestHandler = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { username, email, avatar } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
        password: 'google',
        avatar,
        google: true,
        role: RolesEnum.USER,
      });

      await user.save();
    }

    if (!user?.status) {
      return res.status(401).json({
        error: 'User is disabled',
      });
    }

    const token = await generateJWT(user.id);

    res.status(201).json({ user, token });
  } catch {
    res.status(500).json({
      error: 'Could not complete Google sign in',
    });
  }
};

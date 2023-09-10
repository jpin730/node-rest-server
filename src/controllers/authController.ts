import { RequestHandler } from 'express';
import { compareSync } from 'bcryptjs';

import { User } from '../models/user';
import { generateJWT } from '../helpers/generateJWT';
import { googleVerify } from '../helpers/googleVerify';
import {
  REFRESH_EXP_TIME,
  RolesEnum,
  TOKEN_EXP_TIME,
} from '../utils/constants';
import { createErrorResponse } from '../helpers/createErrorResponse';

export const checkToken: RequestHandler = async (req, res) => {
  const { user } = req.body;

  try {
    const token = await generateJWT(user.id, TOKEN_EXP_TIME);
    const refresh = await generateJWT(user.id, REFRESH_EXP_TIME);
    res.status(201).json({ user, token, refresh });
  } catch {
    res.status(500).json(createErrorResponse('Could not complete login'));
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json(createErrorResponse('Email or password are incorrect'));
    }

    if (!user.status) {
      return res
        .status(400)
        .json(createErrorResponse('Email or password are incorrect'));
    }

    const validPassword = compareSync(password, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json(createErrorResponse('Email or password are incorrect'));
    }

    const token = await generateJWT(user.id, TOKEN_EXP_TIME);
    const refresh = await generateJWT(user.id, REFRESH_EXP_TIME);

    res.status(201).json({ user, token, refresh });
  } catch {
    res.status(500).json(createErrorResponse('Could not complete login'));
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
      return res.status(401).json(createErrorResponse('User is disabled'));
    }

    const token = await generateJWT(user.id, '1h');
    const refresh = await generateJWT(user.id, '2h');

    res.status(201).json({ user, token, refresh });
  } catch {
    res
      .status(500)
      .json(createErrorResponse('Could not complete Google sign in'));
  }
};

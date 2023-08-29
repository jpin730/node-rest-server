import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';

import { User } from '../models/user';
import { generateJWT } from '../helpers/generateJWT';

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

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        error: 'Email or password are incorrect - password',
      });
    }

    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch {
    res.status(500).json({
      error: 'Could not complete login',
    });
  }
};

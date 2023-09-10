import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import { User } from '../models/user';
import { createErrorResponse } from '../helpers/createErrorResponse';

interface jwtPayload {
  uid: string;
}

export const validateJWT: RequestHandler = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json(createErrorResponse('Token is required'));
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const { uid } = verify(token, secret) as jwtPayload;

    const user = await User.findById(uid);

    if (!user || !user.status) {
      return res.status(401).json(createErrorResponse('Token is invalid'));
    }

    req.body = { ...req.body, user };

    next();
  } catch {
    res.status(401).json(createErrorResponse('Token is invalid'));
  }
};

import { RequestHandler } from 'express';
import { RolesEnum } from '../utils/constants';
import { IUser } from '../models/user';

export const isAdmin: RequestHandler = (req, res, next) => {
  const { role } = req.body.user as IUser;

  return role === RolesEnum.ADMIN
    ? next()
    : res.status(401).json({
        error: 'User has not admin role',
      });
};

export const hasRole =
  (...roles: RolesEnum[]): RequestHandler =>
  (req, res, next) => {
    const { role } = req.body.user as IUser;

    return roles.includes(role)
      ? next()
      : res.status(401).json({
          error: 'User has no privilegies',
        });
  };

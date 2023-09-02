import { RequestHandler } from 'express';
import { Role } from '../models/role';
import { createErrorResponse } from '../helpers/createErrorResponse';

export const getAllRoles: RequestHandler = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ roles });
  } catch {
    res.status(500).json(createErrorResponse('Server error'));
  }
};

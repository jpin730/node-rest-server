import { RequestHandler } from 'express';
import { Role } from '../models/role';

export const getAllRoles: RequestHandler = async (req, res) => {
  try {
    const roles = await Role.find();

    res.status(200).json({ roles });
  } catch (error) {
    res.status(500).json({ error });
  }
};

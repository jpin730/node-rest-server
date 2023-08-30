import { RequestHandler } from 'express';

export const uploadFile: RequestHandler = (req, res) => {
  const { body } = req;
  res.status(201).json({ body });
};

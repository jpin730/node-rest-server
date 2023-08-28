import { RequestHandler } from 'express';

export const getUsers: RequestHandler = (req, res) => {
  const { query } = req;
  res.json({ query });
};

export const postUser: RequestHandler = (req, res) => {
  const { body } = req;
  res.json({ body });
};

export const putUser: RequestHandler = (req, res) => {
  const { body, params } = req;
  res.json({ body, params });
};

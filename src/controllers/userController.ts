import { Request, Response } from 'express';
import { users } from '../models/user';

export const createUser = (req: Request, res: Response) => {
  const { id, name } = req.body;
  if (!id || !name) return res.status(400).json({ error: 'Missing fields' });

  users[id] = { id, name };
  res.status(201).json(users[id]);
};

export const getUser = (req: Request, res: Response) => {
  const user = users[req.params.id];
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  const user = users[req.params.id];
  if (!user) return res.status(404).json({ error: 'User not found' });

  delete users[req.params.id];
  res.status(204).send();
};

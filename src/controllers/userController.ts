import { Request, Response } from 'express';
import { User } from '../models/user';

// In-memory storage for simplicity
let users: User[] = [];
let nextId = 1;

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const addUser = (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
    }
    
    const newUser: User = {
      id: nextId++,
      name: name.trim()
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
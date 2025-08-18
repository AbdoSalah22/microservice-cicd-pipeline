import { createUser, getUser, deleteUser } from '../src/controllers/userController';
import { Request, Response } from 'express';

describe('User Controller', () => {
  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  it('should create a user', () => {
    const req = { body: { id: '1', name: 'Alice' } } as Request;
    const res = mockResponse();

    createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Alice' });
  });

  it('should return 404 for non-existent user', () => {
    const req = { params: { id: '999' } } as Request;
    const res = mockResponse();

    getUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});

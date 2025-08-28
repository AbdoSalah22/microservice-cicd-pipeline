import { Request, Response } from 'express';
import { getUsers, addUser, deleteUser } from '../src/controllers/userController';

// Mock Response object
const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res as Response;
};

// Mock Request object
const mockRequest = (body?: any, params?: any): Request => {
  return {
    body,
    params: params || {},
  } as Request;
};

describe('User Controller', () => {
  // Helper function to clear users by calling getUsers and checking the response
  const clearUsersState = async () => {
    // We need to manipulate the controller's internal state
    // Since we can't access it directly, we'll work with what we have
  };

  describe('getUsers', () => {
    it('should return users as JSON', () => {
      // Arrange
      const req = mockRequest();
      const res = mockResponse();

      // Act
      getUsers(req, res);

      // Assert
      expect(res.json).toHaveBeenCalled();
      // The response should be an array (could be empty or contain users)
      expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });
  });

  describe('addUser', () => {
    it('should add a new user successfully', () => {
      // Arrange
      const userData = { name: 'Test User' };
      const req = mockRequest(userData);
      const res = mockResponse();

      // Act
      addUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Test User'
        })
      );
    });

    it('should return 400 for missing name', () => {
      // Arrange
      const req = mockRequest({});
      const res = mockResponse();

      // Act
      addUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Name is required and must be a non-empty string'
      });
    });

    it('should return 400 for empty name', () => {
      // Arrange
      const req = mockRequest({ name: '' });
      const res = mockResponse();

      // Act
      addUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Name is required and must be a non-empty string'
      });
    });

    it('should return 400 for null name', () => {
      // Arrange
      const req = mockRequest({ name: null });
      const res = mockResponse();

      // Act
      addUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Name is required and must be a non-empty string'
      });
    });

    it('should return 400 for non-string name', () => {
      // Arrange
      const req = mockRequest({ name: 123 });
      const res = mockResponse();

      // Act
      addUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Name is required and must be a non-empty string'
      });
    });

    it('should trim whitespace from name', () => {
      // Arrange
      const userData = { name: '  Trimmed User  ' };
      const req = mockRequest(userData);
      const res = mockResponse();

      // Act
      addUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Trimmed User'
        })
      );
    });

    it('should return 400 for whitespace-only name', () => {
      // Arrange
      const req = mockRequest({ name: '   ' });
      const res = mockResponse();

      // Act
      addUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Name is required and must be a non-empty string'
      });
    });
  });

  describe('deleteUser', () => {
    it('should return 400 for invalid ID', () => {
      // Arrange
      const req = mockRequest({}, { id: 'abc' });
      const res = mockResponse();

      // Act
      deleteUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid user ID'
      });
    });

    it('should return 404 for non-existent user', () => {
      // Arrange
      const req = mockRequest({}, { id: '99999' });
      const res = mockResponse();

      // Act
      deleteUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'User not found'
      });
    });

    it('should return 400 for missing ID', () => {
      // Arrange
      const req = mockRequest({}, {});
      const res = mockResponse();

      // Act
      deleteUser(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid user ID'
      });
    });
  });

  describe('Integration Tests', () => {
    it('should add and then delete a user successfully', () => {
      // First, add a user
      const addReq = mockRequest({ name: 'Integration Test User' });
      const addRes = mockResponse();
      
      addUser(addReq, addRes);
      
      expect(addRes.status).toHaveBeenCalledWith(201);
      
      // Get the created user ID from the mock call
      const createdUser = (addRes.json as jest.Mock).mock.calls[0][0];
      const userId = createdUser.id;
      
      // Now delete the user
      const deleteReq = mockRequest({}, { id: userId.toString() });
      const deleteRes = mockResponse();
      
      deleteUser(deleteReq, deleteRes);
      
      expect(deleteRes.status).toHaveBeenCalledWith(204);
      expect(deleteRes.send).toHaveBeenCalled();
    });

    it('should maintain user list correctly', () => {
      // Add a user
      const addReq1 = mockRequest({ name: 'User 1' });
      const addRes1 = mockResponse();
      addUser(addReq1, addRes1);
      
      // Add another user
      const addReq2 = mockRequest({ name: 'User 2' });
      const addRes2 = mockResponse();
      addUser(addReq2, addRes2);
      
      // Get all users
      const getReq = mockRequest();
      const getRes = mockResponse();
      getUsers(getReq, getRes);
      
      // Should have called res.json with an array
      expect(getRes.json).toHaveBeenCalledWith(expect.any(Array));
      
      // Get the users array from the mock call
      const usersList = (getRes.json as jest.Mock).mock.calls[0][0];
      
      // Should have at least the users we added
      expect(usersList.length).toBeGreaterThanOrEqual(2);
      
      // Check that our users are in the list
      const userNames = usersList.map((user: any) => user.name);
      expect(userNames).toContain('User 1');
      expect(userNames).toContain('User 2');
    });
  });
});
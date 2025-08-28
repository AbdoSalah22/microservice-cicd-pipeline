# Microservice CI/CD Pipeline

(to be updated later...........)

A small, critical microservice written in TypeScript using Node.js and Express.  
It provides basic user management endpoints with in-memory storage.

## Endpoints

### Create User
- **POST** `/users`
- **Body:**  
  ```json
  {
    "id": "string",
    "name": "string"
  }
  ```
- **Response:**  
  `201 Created` with the created user.

### Get User
- **GET** `/users/:id`
- **Response:**  
  `200 OK` with user data, or `404 Not Found` if user does not exist.

### Delete User
- **DELETE** `/users/:id`
- **Response:**  
  `204 No Content` if deleted, or `404 Not Found` if user does not exist.

## Getting Started

1. **Install dependencies:**
   ```
   npm install
   ```

2. **Run the service:**
   ```
   npm start
   ```

3. **Run tests:**
   ```
   npm test
   ```

## Project Structure

- `src/models/user.ts` — User interface and in-memory store
- `src/controllers/userController.ts` — Endpoint logic
- `src/routes/userRoutes.ts` — Route definitions
- `src/app.ts` — Express app setup

## Notes

- Data is stored in-memory and will be lost on restart.
- For production, use a persistent database.

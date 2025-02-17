# PostgreSQL CRUD Application - Node.js & React.js

This application allows users to manage a list of users with functionalities to create, read, update, and delete user records. It uses PostgreSQL as the database.

## Features
- Create, Read, Update, Delete (CRUD) operations for user management
- User-friendly interface built with React.js
- RESTful API built with Node.js and Express.js
- Docker support for easy deployment

## Database Setup
1. Install PostgreSQL on your system.
2. Create a database and user.
3. Update the .env file with your database credentials.

## Installation Instructions
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>`
3. Install dependencies: `npm install`
4. Start the backend server: `cd backend && npm start`
5. Start the frontend development server: `cd frontend && npm run dev`
6. (Optional) To run with Docker, follow the instructions in the Dockerfile.

## Usage
- Access the application at `http://localhost:3000` for the frontend.
- Use Postman or similar tools to interact with the API at `http://localhost:5000/api`.

## API Endpoints
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
# Devops

# SecureConnect Backend

A secure authentication API built with Node.js, Express, and MongoDB.

## Project Overview

This is the backend API for the SecureConnect application, providing secure user authentication, session management, and data persistence. The API follows RESTful design principles and implements best practices for security and error handling.

## Features

- **User Authentication**
  - Secure signup with password hashing
  - Login with JWT token generation
  - Session management with expiration
  - Logout functionality

- **Security**
  - Password hashing with bcrypt
  - JWT authentication
  - Session timeout after 30 minutes
  - CORS protection
  - Input validation and sanitization

- **API Endpoints**
  - User registration
  - User login
  - Session validation
  - User logout
  - Field validation

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **express-session** - Session management
- **dotenv** - Environment variable management

## Project Structure

```
backend/
├── node_modules/        # Dependencies
├── src/
│   ├── config/          # Configuration files
│   │   └── db.js        # Database connection
│   ├── controllers/     # Route controllers
│   │   └── authController.js
│   ├── middlewares/     # Custom middlewares
│   │   └── errorMiddleware.js
│   ├── models/          # Mongoose models
│   │   └── User.js
│   └── routes/          # API routes
│       └── authRoutes.js
├── .env                 # Environment variables
├── .gitignore
├── package-lock.json
├── package.json         # Dependencies and scripts
├── README.md            # Project documentation
└── server.js            # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/secureconnect.git
cd secureconnect/backend
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Set up environment variables
```bash
# Create a .env file with:
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
PORT=5000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
SESSION_SECRET=your_session_secret
SESSION_EXPIRE=30m
```

4. Start the server
```bash
# Development mode
npm run dev
# or
yarn dev

# Production mode
npm start
# or
yarn start
```

## API Documentation

### Authentication Endpoints

#### Register User
- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "username",
    "password": "password",
    "confirmPassword": "password"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully"
  }
  ```

#### Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "username",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "jwt_token",
    "username": "username"
  }
  ```

#### Get Current User
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**: 
  ```
  Authorization: Bearer jwt_token
  ```
- **Response**:
  ```json
  {
    "username": "username",
    "lastLogin": "timestamp"
  }
  ```

#### Logout
- **URL**: `/api/auth/logout`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

#### Validate Field
- **URL**: `/api/auth/validate`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "field": "username",
    "value": "usernameToCheck"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "field": "username",
    "errors": []
  }
  ```

## Security Considerations

- JWT tokens are used for authentication
- Passwords are hashed using bcrypt
- Sessions expire after 30 minutes
- All input is validated and sanitized
- CORS is configured to accept requests only from allowed origins in production

## Error Handling

The API uses a standardized error format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "field_name",
      "message": "Error for this specific field"
    }
  ]
}
```

## Environment Variables

```
MONGO_URI          # MongoDB connection string
NODE_ENV           # development or production
PORT               # Server port (default: 5000)
JWT_SECRET         # Secret key for JWT
JWT_EXPIRES_IN     # JWT expiration time (e.g. "1d")
SESSION_SECRET     # Secret for express-session
SESSION_EXPIRE     # Session expiration time (e.g. "30m")
```

## Connecting to Frontend

This backend is designed to work with the SecureConnect frontend. The frontend connects to this API using the `/api` routes.

## License

This project is licensed under the MIT License.

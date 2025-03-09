SecureConnect Backend
A secure authentication API built with Node.js, Express, and MongoDB.
Project Overview
This is the backend API for the SecureConnect application, providing secure user authentication, session management, and data persistence. The API follows RESTful design principles and implements best practices for security and error handling.
Features

User Authentication

Secure signup with password hashing
Login with JWT token generation
Session management with expiration
Logout functionality


Security

Password hashing with bcrypt
JWT authentication
Session timeout after 30 minutes
CORS protection
Input validation and sanitization


API Endpoints

User registration
User login
Session validation
User logout
Field validation



Tech Stack

Node.js - JavaScript runtime
Express - Web framework
MongoDB - Database
Mongoose - ODM for MongoDB
JWT - Authentication tokens
bcrypt - Password hashing
express-session - Session management
dotenv - Environment variable management

Project Structure
Copybackend/
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
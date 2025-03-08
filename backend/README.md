backend/
  ├── config/             # Configuration files
  │   └── db.js           # Database connection
  ├── controllers/        # Route controllers
  │   └── authController.js # Auth controllers
  ├── middlewares/        # Middleware functions
  │   ├── authMiddleware.js # Authentication middleware
  │   ├── errorMiddleware.js # Error handling
  │   └── validationMiddleware.js # Input validation
  ├── models/             # Database models
  │   └── User.js         # User model
  ├── routes/             # API routes
  │   └── authRoutes.js   # Auth routes
  ├── .env                # Environment variables
  ├── .gitignore          # Git ignore file
  ├── package.json        # Dependencies
  ├── README.md           # Project documentation
  └── server.js           # Entry point
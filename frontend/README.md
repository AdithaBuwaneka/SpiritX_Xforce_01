SecureConnect
A modern, secure authentication system built with React, Vite, and Tailwind CSS.
Project Overview
SecureConnect is a full-featured authentication system that provides a secure and user-friendly login experience. This implementation demonstrates best practices in frontend authentication, secure session management, and responsive user interface design.
Features
Signup Page

Username validation (minimum 8 characters)
Password strength requirements:

Lowercase letters
Uppercase letters
Special characters


Real-time validation with instant feedback
Password strength indicator
Confirmation dialog and automatic redirect

Login Page

Secure authentication with error handling
Session management with timeout
Responsive design for all devices
Password visibility toggle

Dashboard

Live session countdown timer
Security status monitoring
Last login information
Secure logout functionality

Tech Stack

React - Frontend library
Vite - Build tool and development server
Tailwind CSS - Utility-first CSS framework
React Router - Client-side routing
React Icons - Icon components
React Hot Toast - Toast notifications

Project Structure
Copyfrontend/
├── node_modules/       # Dependencies
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable UI components
│   │   ├── Alert.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── PasswordStrengthMeter.jsx
│   ├── contexts/       # React context providers
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── SignupPage.jsx
│   ├── services/       # API services
│   │   └── authService.js
│   ├── App.jsx         # Main component
│   ├── index.css
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── .gitignore
├── eslint.config.js    # ESLint configuration
├── index.html
├── package.json        # Dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── README.md           # Project documentation
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
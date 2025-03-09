# SecureConnect

A modern, secure authentication system built with React, Vite, and Tailwind CSS.

## Project Overview

SecureConnect is a full-featured authentication system that provides a secure and user-friendly login experience. This implementation demonstrates best practices in frontend authentication, secure session management, and responsive user interface design.

## Features

### Signup Page
- Username validation (minimum 8 characters)
- Password strength requirements:
  - Lowercase letters
  - Uppercase letters
  - Special characters
- Real-time validation with instant feedback
- Password strength indicator
- Confirmation dialog and automatic redirect

### Login Page
- Secure authentication with error handling
- Session management with timeout
- Responsive design for all devices
- Password visibility toggle

### Dashboard
- Live session countdown timer
- Security status monitoring
- Last login information
- Secure logout functionality

## Tech Stack

- **React** - Frontend library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Icons** - Icon components
- **React Hot Toast** - Toast notifications

## Project Structure

```
frontend/
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
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/secureconnect.git
cd secureconnect/frontend
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
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

### Building for Production

```bash
npm run build
# or
yarn build
```

## Connecting to Backend

This frontend is designed to work with the SecureConnect backend API. Ensure the backend server is running and the `VITE_API_URL` in your `.env` file points to the correct API endpoint.

## Features Implementation

### Authentication Flow
- The app uses JWT tokens for authentication
- Tokens are stored in localStorage for persistence
- Session expires after 30 minutes of inactivity
- Real-time validation prevents common security issues

### Security Features
- Password strength requirements reduce vulnerability to brute force attacks
- Session timeout with live countdown improves security awareness
- Automatic logout on session expiration

## Credits

Created as part of the SecureConnect project.

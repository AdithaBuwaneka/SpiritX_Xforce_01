# SecureConnect - User Authentication System

## Project Overview
SecureConnect is a secure and user-friendly authentication system developed for the SpiritX Hackathon 2025. The system provides a robust signup and login functionality with proper validation, error handling, and session management.

## Features

### Signup Page (110 points)
- **Easy Level (30 points)**
  - Three input fields (Username, Password, Confirm Password)
  - Error display under each input field
  - Empty field validation
  
- **Medium Level (50 points)**
  - Username validation (8+ characters, uniqueness check)
  - Password requirements (lowercase, uppercase, special character)
  - Password confirmation matching
  - Real-time validation as user types
  
- **Hard Level (30 points)**
  - Authentication errors above submit button
  - Confirmation dialog with auto-redirect after signup
  - Password strength indicator

### Login Page (140 points)
- **Easy Level (30 points)**
  - Two input fields (Username, Password)
  - Error display under each input field
  - Empty field validation
  
- **Medium Level (60 points)**
  - Advanced error handling and validation
  - Username existence and password correctness verification
  - Real-time validation
  
- **Hard Level (50 points)**
  - Successful login redirects to personalized dashboard
  - Personalized welcome message ("Hello, username!")
  - Session management (keeps user logged in until logout)

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB Atlas account or local MongoDB installation

### Database Setup
1. Create a MongoDB Atlas cluster or use a local MongoDB installation
2. Create a database named `SecureConnect_DB`
3. The application will automatically create the required collections when first run

### Environment Variables

#### Backend (.env file in the backend directory)
```
MONGO_URI=mongodb+srv://<username>:<password>@spiritx.pnu1d.mongodb.net/SecureConnect_DB
NODE_ENV=development
PORT=5000
JWT_SECRET=f16a1d67f8de5886df2157f4c034dcaa8b943b7e1dc4e69f7c3f12d12a25f698
JWT_EXPIRES_IN=1d
SESSION_SECRET=PX8r2vY7fL9sKqTzGn4mHj3bWc6xE5dA
SESSION_EXPIRE=30m
```

#### Frontend (.env file in the frontend directory)
```
VITE_API_URL=http://localhost:5000/api
```

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/YourUsername/SpiritX_TeamName_01.git
cd SpiritX_TeamName_01
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Start the backend server
```bash
cd ../backend
npm start
```

5. In a new terminal, start the frontend development server
```bash
cd ../frontend
npm run dev
```

6. Access the application at `http://localhost:3000`

## Development Assumptions

1. **User Experience**: The application prioritizes user feedback with real-time validation and clear error messages to guide users through the authentication process.

2. **Security**: 
   - Passwords are hashed using bcrypt before storage
   - Session management is implemented using JWT tokens
   - Form inputs are validated both client-side and server-side

3. **API Design**: The backend follows RESTful API principles with endpoints for user authentication, validation, and session management.

4. **Responsiveness**: The UI is designed to be fully responsive across various device sizes.

## Additional Features

1. **Password Strength Meter**: Visual indicator showing password strength based on complexity.

2. **Real-time Validation**: Form fields are validated in real-time as the user types.

3. **Personalized Dashboard**: Upon successful login, users are greeted with a personalized dashboard displaying their session information.

4. **Error Handling**: Comprehensive error handling throughout the application with user-friendly error messages.

5. **Session Management**: Users remain logged in until they explicitly log out or their session expires.

## Project Structure

### Frontend
```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Alert.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── PasswordStrengthMeter.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── SignupPage.jsx
│   ├── services/
│   │   └── authService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── package.json
└── vite.config.js
```

### Backend
```
backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   └── User.js
│   └── routes/
│       └── authRoutes.js
├── .env
├── package.json
└── server.js
```

## Challenges Faced
- Implementing secure and efficient session management
- Ensuring real-time validation without overwhelming server requests
- Creating a responsive and user-friendly interface
- Balancing security requirements with user experience

## Future Improvements
- Implement email verification for new accounts
- Add two-factor authentication
- Enhance password recovery flow
- Expand the dashboard with more user profile features
- Implement rate limiting to prevent brute force attacks

## Video Demonstrations
1. [Signup Process Demo](https://drive.google.com/link-to-your-video)
2. [Login and Dashboard Demo](https://drive.google.com/link-to-your-video)

## Contributors
- Your Name
- Team Member Names (if applicable)

## License
This project is licensed under the MIT License.

# SecureConnect

## Instructions to Run the Project

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas)

### Clone the Repository
1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/AdithaBuwaneka/Spiritx.git
   cd Spiritx
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the backend directory with the following:
   ```
   MONGO_URI=mongodb+srv://adithabuwaneka0:oUKa76FgEJ5kwXVb@spiritx.pnu1d.mongodb.net/SecureConnect_DB
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=f16a1d67f8de5886df2157f4c034dcaa8b943b7e1dc4e69f7c3f12d12a25f698
   JWT_EXPIRES_IN=1d
   SESSION_SECRET=PX8r2vY7fL9sKqTzGn4mHj3bWc6xE5dA
   SESSION_EXPIRE=30m
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the frontend directory with the following:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

## Database Setup and Configuration

The application uses MongoDB as its database. The connection is automatically established when the backend server starts using the MongoDB URI provided in the `.env` file.

Database schema includes:
- User model with fields for username, password, and creation timestamp
- Passwords are securely hashed using bcrypt before storage
- JWT is used for authentication tokens

You don't need to manually create collections; they will be automatically created when the application is first used.

## Assumptions Made During Development

1. **Security Assumptions**:
   - Users need strong passwords with lowercase, uppercase, and special characters
   - Session timeout after 30 minutes of inactivity
   - JWT tokens for secure authentication
   - All sensitive data is encrypted/hashed

2. **User Experience Assumptions**:
   - Real-time validation feedback is essential for good UX
   - Clear error messages should guide users
   - The UI should be responsive and work across various devices
   - Visual indicators (like password strength meter) improve user understanding

3. **Technical Assumptions**:
   - The application needs both client-side and server-side validation
   - Session management should be handled via JWT and cookies
   - Error handling should be comprehensive and user-friendly
   - The API follows RESTful design principles

## Additional Features Implemented

The SecureConnect project implements all required features from the project specification (250 total points) and includes these additional enhancements:

1. **Live Session Countdown Timer**:
   - Implemented a real-time countdown timer on the dashboard
   - Timer visually shows the remaining session time before automatic logout
   - Changes color from yellow to red when session is about to expire
   - Automatically logs out the user when time reaches zero

2. **Password Visibility Toggle**:
   - Added show/hide password functionality on login and signup forms
   - Improves user experience while maintaining security
   - Custom implementation that avoids browser's built-in password reveal

3. **Enhanced Error Handling**:
   - Structured API responses with consistent error formatting
   - Detailed field-specific error messages
   - Comprehensive validation feedback
   - Toast notifications for system messages

4. **Custom 404 Not Found Page**:
   - Implemented a dedicated page for handling invalid routes
   - User-friendly error message with clear navigation options
   - Smart redirect button that changes based on authentication status
   - Consistent styling with the rest of the application

5. **Mobile-Responsive Design**:
   - Fully responsive layout that works on all device sizes
   - Optimized component rendering for different screen widths
   - Consistent experience across mobile, tablet, and desktop

# SecureConnect Frontend

This is the frontend implementation for the SecureConnect project, a secure and user-friendly authentication system built with React, Vite, and Tailwind CSS.

## Project Overview

SecureConnect consists of two main parts:
- **Signup Page**: Where users create their accounts with a unique username and strong password
- **Login Page**: Where users sign in and are greeted with a friendly, personalized welcome page

## Features 

### Signup Page (Total: 110 points)
- **Easy (30 Points)**
  - Three input fields - Username, Password, Confirm Password
  - Error display under each input field if validation fails
  - Prevention of signup if any field is empty
- **Medium (50 Points)**
  - Username validation (at least 8 characters and unique)
  - Password requirements (lowercase letter, uppercase letter, special character)
  - Password confirmation matching
  - Real-time validation feedback
- **Hard (30 Points)**
  - Authentication errors displayed above the CTA button
  - Success confirmation with automatic redirect after 2 seconds
  - Password strength indicator with dynamic updates

### Login Page (Total: 140 Points)
- **Easy (30 Points)**
  - Two input fields - Username and Password
  - Error display under each field if validation fails
  - Prevention of login if fields are empty
- **Medium (60 Points)**
  - Error handling and validation
  - Username/password checking
  - Real-time validation feedback
- **Hard (50 Points)**
  - Success navigation to landing page with personalized greeting
  - Session management for persistence
  - Logout functionality

##
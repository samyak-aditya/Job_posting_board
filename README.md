
# Job Posting Board
This is a fullstack application that includes a frontend and a backend. Follow the instructions below to install and run the application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Frontend Installation](#frontend-installation)
- [Backend Installation](#backend-installation)
- [Creating the .env File](#creating-the-env-file)
- [Backend API Endpoints](#backend-api-endpoints)
- [Example Request for Postman](#example-request-for-postman)
- [License](#license)

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (v6 or later)

## Frontend Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the frontend application:

   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`.

## Backend Installation

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the backend application:

   ```bash
   npm start
   ```

   The backend should now be running on `http://localhost:5000`.

## Creating the .env File

In the backend directory, create a `.env` file with the following variables:

```plaintext
JWT_SECRET=your_jwt_secret
MONGO_URL=your_mongodb_connection_string
```

Replace `your_jwt_secret` with a secure secret for signing JWTs and `your_mongodb_connection_string` with your MongoDB connection string.

## Backend API Endpoints

### Authentication

- **Signup**  
  **Endpoint:** `POST /api/signup`  
  **Request Body:**
  ```json
  {
    "name": "John Doe",
    "phone": "1234567890",
    "companyName": "Example Corp",
    "email": "john@example.com",
    "employeeSize": "50",
    "password": "your_password"
  }
  ```


### OTP Verification

- **Verify Email OTP**  
  **Endpoint:** `POST /api/verify-email-otp`  
  **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "otp": "123456"
  }
  ```

- **Verify Mobile OTP**  
  **Endpoint:** `POST /api/verify-mobile-otp`  
  **Request Body:**
  ```json
  {
    "phone": "1234567890",
    "otp": "123456"
  }
  ```

### Invite Candidates

- **Create Invite**  
  **Endpoint:** `POST /api/create-invite`  
  **Request Body:**
  ```json
  {
    "jobTitle": "Software Engineer",
    "jobDescription": "Develop and maintain web applications.",
    "experienceLevel": "Mid-level",
    "candidates": ["candidate1@example.com", "candidate2@example.com"],
    "endDate": "2024-10-31"
  }
  ```

## Example Request for Postman

### Register User

**Endpoint:** `POST http://localhost:5000/api/signup`  
**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "1234567890",
  "companyName": "Example Corp",
  "email": "john@example.com",
  "employeeSize": "50",
  "password": "your_password"
}
```





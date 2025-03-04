# Expense Tracker Application

This is a full-stack Expense Tracker application that allows users to **add, view, and filter expenses** with authentication using **JWT (JSON Web Tokens)**. The app uses **MongoDB** for data storage, **Express.js** for the backend, and **React.js with styled-components** for the frontend.

## Features
### Frontend:
- **Authentication** (Login/Signup with JWT stored in localStorage)
- **Expense Management** (Add, View, Filter, and Calculate Total Expenses)
- **Protected Routes** (Only logged-in users can access expense pages)
- **Styled Components** for modern UI design
- **.env support** to configure API Base URL

### Backend:
- **User Authentication** (Signup, Login with JWT)
- **Middleware for Protected Routes** (Verifies JWT Token)
- **CRUD operations for Expenses** (MongoDB-based)
- **Filtering & Total Calculation** (Fetch expenses by date & category)
- **Express.js with Mongoose for MongoDB**

## Tech Stack
- **Frontend:** React.js, React Router, Styled Components, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication
- **Database:** MongoDB Atlas (or local MongoDB instance)

---

# Backend Setup

## Prerequisites
- Install **Node.js** (v16+ recommended)
- Install **MongoDB** (local or MongoDB Atlas)

## Installation Steps
1. **Clone the repository**
   ```bash
   git clone Repository URL
   cd expense-tracker/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the `backend` folder and configure:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://your-mongodb-url
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the backend server**
   ```bash
   npm start
   ```

5. **API Endpoints:**
   - `POST /api/auth/signup` → Create a new user
   - `POST /api/auth/login` → Authenticate user & return JWT
   - `POST /api/expenses` → Add a new expense
   - `GET /api/expenses` → Retrieve all expenses
   - `GET /api/expenses?category=Food&date=YYYY-MM-DD` → Filter expenses
   - `GET /api/expenses/total?start=YYYY-MM-DD&end=YYYY-MM-DD` → Get total expenses for a date range

---

# Frontend Setup

## Prerequisites
- Install **Node.js** (v16+ recommended)

## Installation Steps
1. **Navigate to frontend folder**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the `frontend` folder and configure:
   ```env
   REACT_APP_BASEURL=http://localhost:8000
   ```

4. **Run the frontend application**
   ```bash
   npm start
   ```

5. **Available Pages:**
   - `/` → Login Page
   - `/signup` → Signup Page
   - `/dashboard` → Expense Tracker (Protected Route)

## Protected Routes Implementation
The frontend uses **React Router** with JWT-based authentication:
- **On Login/Signup**, the JWT is stored in `localStorage`.
- **Protected Routes** ensure only authenticated users can access `/dashboard`.
- If the user is not logged in, they are redirected to `/` (Login Page).

---

## Folder Structure
```
expense-tracker/
│
├── backend/                # Backend (Node.js + Express + MongoDB)
│   ├── controllers/       # Route handlers
│   ├── middleware/        # JWT authentication middleware
│   ├── models/           # Mongoose models (User, Expense)
│   ├── routes/           # API routes
│   ├── server.js         # Entry point for Express server
│   ├── .env              # Environment variables (MongoDB URI, JWT Secret)
│
├── frontend/              # Frontend (React.js + Styled Components)
│   ├── src/
│   │   ├── components/   # Styled Components
│   │   ├── pages/        # Login, Signup, Expense Tracker
│   │   ├── App.js        # Main app file
│   │   ├── index.js      # React entry point
│   ├── .env              # Environment file for API base URL
│
└── README.md              # Project Documentation
```

---

## Future Enhancements
- **Expense Categories with Icons** for better visualization
- **Charts & Graphs** to display spending trends
- **Google OAuth** for social login
- **Recurring Expenses** to track subscriptions automatically

---

## License
This project is **open-source** and free to use. Feel free to contribute!

---

Now your Expense Tracker application is **ready to use!** 🚀 Happy Coding! 🎉


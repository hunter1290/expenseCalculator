# Expense Tracker Backend

## 📌 Overview
This is the backend server for the Expense Tracker application, built with **Node.js, Express, and MongoDB**. It provides authentication using **JWT (JSON Web Token)** and allows users to:

- **Sign up and log in** securely.
- **Add expenses** with details such as amount, category, date, and description.
- **Retrieve expenses** for a logged-in user.
- **Filter expenses** by category and date.
- **Get the total expenses** for a specified date range.

---

## 🚀 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ORM
- **Authentication:** JWT (JSON Web Token)
- **Security:** Helmet, CORS

---

## 📂 Project Structure
```
expense-tracker-backend/
│── node_modules/
│── src/
│   ├── config/
│   │   ├── db.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── expenseRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── expenseController.js
│   ├── index.js
│── .env
│── package.json
│── README.md
```

---

## 📌 API Endpoints

### **🔐 Authentication**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive JWT token |

### **💰 Expense Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/expenses` | Add a new expense |
| `GET` | `/api/expenses` | Get all expenses for logged-in user |
| `GET` | `/api/expenses?category=Food&date=YYYY-MM-DD` | Filter expenses by category & date |
| `GET` | `/api/expenses/total?start=YYYY-MM-DD&end=YYYY-MM-DD` | Get total expenses for a date range |

---

## 📌 Setup & Installation

### **1️⃣ Clone the Repository**
```sh
git clone URL of the repo
cd backend
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add the following:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### **4️⃣ Start MongoDB Locally** (if not using a cloud provider like MongoDB Atlas)
```sh
mongod
```

### **5️⃣ Run the Server**
```sh
npm run dev
```

---

## 🔥 Example Requests

### **🔐 User Signup**
**Request:**
```sh
POST /api/auth/signup
Content-Type: application/json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```
**Response:**
```json
{
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

### **💰 Add an Expense**
**Request:**
```sh
POST /api/expenses
Authorization: Bearer <JWT Token>
Content-Type: application/json
{
    "amount": 100,
    "category": "Food",
    "date": "2025-03-04",
    "description": "Dinner with friends"
}
```
**Response:**
```json
{
    "message": "Expense added successfully",
    "expense": {
        "user": "65fd5b7c8e4d5f3c4a77c24a",
        "amount": 100,
        "category": "Food",
        "date": "2025-03-04T00:00:00.000Z",
        "description": "Dinner with friends"
    }
}
```

---



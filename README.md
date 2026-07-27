# 🔐 Express Authentication API

A secure and scalable Authentication REST API built with **Express.js**, **TypeScript**, **MongoDB**, **JWT**, and **bcrypt**.

## 🚀 Features

- User Registration
- Login using Email or Username
- JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- Role-Based Authorization (User/Admin)
- Current User Endpoint
- MongoDB Integration
- MVC Architecture
- TypeScript Support

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt

---

## 📂 Project Structure

```
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
└── server.ts
```

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login using Email or Username |
| GET | /api/auth/protected | Protected Route |
| GET | /api/auth/admin | Admin Only Route |
| GET | /api/auth/me | Get Current User |

---

## ⚙️ Installation

```bash
git clone https://github.com/YourUsername/express-auth-api.git

cd express-auth-api

npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the server:

```bash
npm run dev
```

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Kariem Tamer**

Computer Science Student | Backend Developer
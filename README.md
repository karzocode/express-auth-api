# 🔐 Express Authentication API + React Frontend

A secure and scalable **Authentication Full-Stack** built with **Express.js**, **TypeScript**, **MongoDB**, **JWT**, **React + Vite + Tailwind**.

> ينفع تعمل فرونت اند للمشروع ده ؟ الإجابة: أه طبعاً، واتعمل خلاص 😎

## 🚀 Features

### Backend
- User Registration
- Login using Email or Username
- JWT Authentication (Bearer token)
- Password Hashing with bcrypt
- Protected Routes + Role-Based Authorization (User/Admin)
- CORS enabled for frontend
- MVC Architecture + TypeScript

### Frontend (NEW ✨)
- React + Vite + Tailwind CSS (dark glassmorphism UI)
- React Router DOM
- Axios with JWT interceptor
- AuthContext (auto-login via /me)
- Pages: Home, Login, Register, Dashboard, Protected, Admin
- ProtectedRoute + AdminRoute guards
- عربي + English UI

---

## 📂 Project Structure

```
express-auth-api/
├── src/
│   ├── config/db.ts
│   ├── controllers/auth.controller.ts
│   ├── middlewares/auth.middleware.ts + role.middleware.ts
│   ├── models/user.model.ts
│   ├── routes/auth.route.ts
│   └── server.ts (CORS enabled)
├── client/  <-- NEW React Frontend
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── context/AuthContext.jsx
│   │   ├── components/Navbar.jsx + ProtectedRoute.jsx
│   │   ├── pages/Home.jsx, Login.jsx, Register.jsx, Dashboard.jsx, Protected.jsx, Admin.jsx
│   │   ├── App.jsx
│   │   └── index.css (Tailwind)
│   └── vite.config.js (proxy to :5000)
└── package.json
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

## ⚙️ Installation & Running

### 1. Backend
```bash
git clone ...
cd express-auth-api
npm install
```

Create `.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:
```bash
npm run dev
# http://localhost:5000
```

### 2. Frontend
```bash
cd client
npm install
echo "VITE_API_URL=http://localhost:5000/api/auth" > .env
npm run dev
# http://localhost:5173
```

### 3. Run Both Together
```bash
npm run dev:all
# backend :5000 + frontend :5173
```

---

## 🔧 Frontend Integration Notes

- تم إضافة `cors` في `server.ts` يسمح بـ `http://localhost:5173`
- الـ frontend بيستخدم `Authorization: Bearer <token>` تلقائياً
- Token متخزن في `localStorage`
- `/me` بيتعمل auto-check أول ما التطبيق يفتح

---

## 🎨 Screens
- **/register** – firstName, lastName, username, email, phone, age, password, role
- **/login** – identifier (email or username) + password
- **/dashboard** – يعرض بيانات المستخدم + نتيجة protected + me
- **/protected** – مثال لـ protected route
- **/admin** – يشتغل فقط لو role = admin

---

## 📄 License
MIT

## 👨‍💻 Author
**Kariem Tamer** + Frontend by Arena AI
Computer Science Student | Backend Developer

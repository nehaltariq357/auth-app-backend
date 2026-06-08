# 🟢 Full Auth System - Backend

A secure authentication backend built with Node.js and Express, implementing JWT authentication, httpOnly cookies, and protected routes.

---

## 🚀 Features

* User Signup & Login API
* JWT Authentication (Access + Refresh Tokens)
* Secure httpOnly Cookies
* Password Hashing (bcrypt)
* Protected Routes with Middleware
* Token Refresh System
* Scalable folder structure

---

## 🧰 Tech Stack

* Node.js
* Express.js
* JWT (jsonwebtoken)
* bcrypt.js
* cookie-parser
* dotenv

---

## 📁 Folder Structure

```bash
/backend
  /controllers
  /routes
  /middleware
  /models
  /config
  server.ts
```

---

## ⚙️ Setup

### Install dependencies

```bash
npm install
```

### Create `.env`

```env
PORT=5000
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
DATABASE_URL=your_database_url
```

### Run server

```bash
npm run dev
```

---

## 🔐 API Routes

### Auth Routes

```http
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
```

### Protected Route

```http
GET /api/user/profile
```

---

## 🛡️ Security

* bcrypt password hashing
* JWT token expiration
* httpOnly cookies
* Middleware protection

---


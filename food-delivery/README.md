# 🍔 FoodExpress - Food Delivery App

Full stack food delivery app built with React, Redux, Node.js, Express, MongoDB & Razorpay.

---

## 📁 Project Structure
```
food-delivery/
├── frontend/    → React + Redux
└── backend/     → Node.js + Express + MongoDB
```

---

## 🚀 HOW TO RUN

### Step 1 — Install MongoDB
Download from: https://www.mongodb.com/try/download/community
Start MongoDB service on your machine.

### Step 2 — Setup Backend
```bash
cd backend
npm install
```
Edit `.env` file and add your keys:
```
MONGO_URI=mongodb://localhost:27017/fooddelivery
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```
Run backend:
```bash
npm run dev
```
Backend runs on: http://localhost:5000

### Step 3 — Setup Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on: http://localhost:3000

---

## 🔑 Get Razorpay Keys (Free Test Keys)
1. Go to https://razorpay.com
2. Sign up → Dashboard → Settings → API Keys
3. Copy Key ID and Secret
4. Add to backend `.env`
5. Add Key ID to `frontend/src/pages/Cart.js` line: `key: "your_razorpay_key_id"`

---

## ✅ Features
- 🏪 Restaurant listing with search & filter
- 🍕 Menu with categories
- 🛒 Cart with Redux (add/remove items)
- 💳 Razorpay payment integration
- 🔐 JWT Authentication (Login/Register)
- 📦 Order history
- 📱 Responsive design

---

## 🌐 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/restaurants | Get all restaurants |
| GET | /api/restaurants/:id | Get single restaurant |
| POST | /api/orders | Place order |
| GET | /api/orders/my-orders | Get user orders |
| POST | /api/payment/create-order | Create Razorpay order |

---

## 🚀 Deploy
- Frontend → Netlify: `npm run build` then drag `/build` folder
- Backend → Render.com: Connect GitHub repo and deploy

---

## 💼 Resume Description
> "Built a full stack Food Delivery app using React, Redux, Node.js, Express, MongoDB with Razorpay payment integration, JWT authentication and order tracking"

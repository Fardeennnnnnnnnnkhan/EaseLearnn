<div align="center">

# 🎓 EaseLearn
**A Premium, Full-Stack E-Learning Platform**

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?logo=stripe&logoColor=white)](https://stripe.com/)

EaseLearn is a modern, responsive, and highly interactive online learning platform built with the MERN stack. It offers secure video streaming, automated course progress tracking, Stripe-powered payments, and a comprehensive admin dashboard.

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Deployment](#-deployment-guide)

</div>

---

## ✨ Key Features

### 👨‍🎓 For Students
*   **YouTube-Style Learning Interface:** Immersive video player with a sticky, collapsible course playlist sidebar.
*   **Dynamic Progress Tracking:** Visual circular progress indicators calculate exact completion percentages based on watched lectures.
*   **Premium Dashboard:** A beautifully animated user account dashboard to track purchased courses, total learning stats, and history.
*   **Secure Authentication:** JWT-based login with OTP email verification for secure account creation and password recovery.
*   **Frictionless Checkout:** Seamless course purchases powered by Stripe Checkout, handling cards, failures, and automatic redirects securely.
*   **Modern Aesthetics:** Fully responsive, "glassmorphism" inspired UI built with Tailwind CSS and Framer Motion.

### 👨‍💻 For Administrators
*   **Course Management:** Create, update, and delete courses with rich descriptions, pricing, and category tagging.
*   **Lecture Uploads:** Add video lectures and study materials directly to courses.
*   **User Analytics:** Monitor registered users, track platform growth, and manage user roles.
*   **Revenue Tracking:** View purchase history and revenue statistics.

---

## 🛠 Tech Stack

**Frontend Architecture:**
*   **Framework:** React 18 powered by Vite for lightning-fast HMR.
*   **Styling:** Tailwind CSS + custom CSS for premium layout control.
*   **Animations:** Framer Motion & GSAP for silky smooth micro-interactions.
*   **Routing:** React Router DOM v6.
*   **Notifications:** React Hot Toast.

**Backend Architecture:**
*   **Runtime:** Node.js.
*   **Framework:** Express.js.
*   **Database:** MongoDB Atlas with Mongoose ODM.
*   **Payments:** Stripe Node.js SDK + Webhooks for asynchronous order fulfillment.
*   **Security:** Bcrypt (Password Hashing), JWT (Stateless Auth).
*   **Emails:** Nodemailer for automated OTP delivery.
*   **File Handling:** Multer for processing media uploads.

---

## 🚀 Installation & Local Development

### Prerequisites
*   Node.js (v18+)
*   MongoDB Atlas Account (or local MongoDB server)
*   Stripe Account (for test API keys)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/EaseLearn.git
cd EaseLearn/eLearning_new
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=3000
MONGO_URL=mongodb+srv://<your_mongo_url>
Activation_Token=your_secret_activation_token
Jwt_Sec=your_jwt_secret
Gmail=your_email@gmail.com
Password=your_app_password
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd ../frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```
Your app will now be running on `http://localhost:5173`!

---

## 🌍 Deployment Guide

EaseLearn is engineered to be deployed using a split-architecture pattern for maximum performance: **Vercel** for the React Frontend and **Render** for the Node.js Backend.

### 1. Backend (Render)
1. Push the entire codebase to GitHub.
2. In Render, create a new **Web Service**.
3. **Root Directory:** Set this to `backend`.
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. Enter all `.env` variables (Leave `FRONTEND_URL` and `STRIPE_WEBHOOK_SECRET` blank for now).
7. Deploy and copy your new live Render URL (e.g., `https://easelearn-api.onrender.com`).

### 2. Frontend (Vercel)
1. Import your GitHub repository into Vercel.
2. **Root Directory:** Edit and set to `frontend`.
3. **Environment Variables:** Add `VITE_BACKEND_URL` and set the value to your live Render URL.
4. Deploy and copy your live Vercel URL.

### 3. Final Connections
1. Go back to Render's Environment Variables and update `FRONTEND_URL` to your live Vercel URL.
2. **Stripe Webhooks:** Go to the Stripe Dashboard -> Webhooks. Add an endpoint pointing to `https://easelearn-api.onrender.com/api/payment/webhook`. Select the `checkout.session.completed` event.
3. Copy the live Webhook Signing Secret from Stripe and add it to Render's `STRIPE_WEBHOOK_SECRET` variable.

---

## 🛡 License
This project is open-source and available under the MIT License.

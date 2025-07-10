# 🛍️ MERN E-Commerce Platform

A fully-featured, production-ready e-commerce platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js), using **Redux Toolkit** for state management, **Tailwind CSS** and **shadcn/ui** for modern styling, and integrated with **Cloudinary** and **PayPal** for media and payment handling.

This project supports both admin and shopper roles, secure authentication, order management, cart functionality, and a verified review system — all in a scalable, modular architecture.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stack](https://img.shields.io/badge/stack-MERN-blueviolet)]()
[![Status](https://img.shields.io/badge/status-In_Progress-yellow)]()

---

## 🚀 Features

### 👨‍💻 Full Stack Functionality
- Complete separation of frontend and backend code.
- Modular file structure and clear project organization.

### 🔐 Authentication & Authorization
- Secure JWT-based login and registration.
- Role-based access control (admin vs shopper).
- Protected routes with dynamic redirection.

### 🛍️ E-Commerce Functionality
- Product listing with filtering, sorting, and details modal.
- Cart management with quantity control and stock validation.
- Checkout process with PayPal sandbox integration.
- Review system limited to verified buyers.

### 👩‍💼 Admin Panel
- Create, update, and delete products.
- Upload product images using Cloudinary.
- Manage all orders and update their statuses.

### 💾 State Management
- Redux Toolkit slices by domain: auth, cart, products, orders,
- Async thunks for API integration and side effects.

### 💡 UX & UI
- Responsive design with Tailwind CSS.
- Reusable components (forms, modals, buttons).
- Toast notifications, loading indicators, and form validation.

---

## 🧰 Tech Stack

**Frontend:**
- React
- Redux Toolkit
- Tailwind CSS
- shadcn/ui

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer (file uploads)
- Cloudinary (image hosting)
- JWT (authentication)

**Payments:**
- PayPal REST APIs (sandbox mode)

**Development Tools:**
- Vite
- Postman
- dotenv
- concurrently

**Deployment (Planned):**
- Vercel (Frontend)
- Render (Backend)

---

## 🌐 Future Enhancements

- [ ] Stripe payment gateway as an alternative to PayPal.
- [ ] Sales analytics dashboard for admins.
- [ ] Search functionality with Algolia or Elastic.
- [ ] Advanced order tracking & shipment module.

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mern-ecommerce.git
cd mern-ecommerce
2. Set Up Environment Variables
Create .env files in both the server/ and client/ folders. Refer to .env.example if provided.

Example: server/.env
env

MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
Example: client/.env
env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
3. Install Dependencies

# Root project dependencies (including concurrently)
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
4. Run the Application
npm run dev

React Client: http://localhost:5173

Express API Server: http://localhost:5000/api


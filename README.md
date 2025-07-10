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

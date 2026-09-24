# AI Expense Tracker

A full-stack personal finance management application built with the MERN stack. The application helps users track income and expenses, understand spending patterns, and receive AI-powered financial insights.

> 🚧 **Status: Under Development**

---

## Overview

AI Expense Tracker is a full-stack financial management application where users can securely manage their income and expenses through a centralized dashboard.

The application is being developed incrementally, with the frontend and backend being built as separate layers and gradually integrated.

Planned capabilities include:

- Income and expense management
- Transaction search and filtering
- Financial summaries
- Spending analytics and visualizations
- Secure user authentication
- AI-powered spending analysis
- Budget recommendations
- Natural-language financial queries

---

# Current Progress

## Frontend

### Project Setup

- [x] React + Vite project setup
- [x] React Router configuration
- [x] Application routing structure
- [x] Nested dashboard routing

### Authentication

- [x] Login page
- [x] Registration page
- [x] Form validation
- [x] Authentication Context
- [x] Custom authentication hook
- [x] Protected route structure
- [x] JWT integration with frontend
- [x] Authentication persistence across page refresh
- [x] Logout functionality

### Dashboard

- [x] Dashboard layout
- [x] Reusable Sidebar component
- [x] Reusable Header component
- [x] Overview dashboard page
- [x] Analytics page structure
- [x] Profile page structure
- [x] 404 / Not Found page

### Transactions UI

- [x] Transactions page
- [x] Transaction details page
- [x] Reusable transaction form
- [x] Add transaction functionality
- [x] Edit transaction functionality
- [x] Delete transaction functionality
- [x] Transaction search
- [x] Transaction filtering
- [x] Transaction type filtering
- [x] Category filtering
- [x] Responsive UI styling

### State Management

- [x] Authentication Context
- [x] Transaction Context
- [x] Custom authentication hook
- [x] Custom transaction hook

> **Note:** Transaction functionality on the frontend currently uses React state. It will be replaced with persistent backend storage during the frontend-backend integration phase.

---

# Backend

## Project Setup

- [x] Node.js backend project setup
- [x] Express.js server setup
- [x] CORS configuration
- [x] JSON request parsing
- [x] Nodemon development setup
- [x] Environment variable configuration
- [x] Backend health-check endpoint

---

## Database

- [x] MongoDB Atlas cluster setup
- [x] Mongoose installed and configured
- [x] MongoDB connection module created
- [x] MongoDB connection configuration
- [x] Successfully connected backend to MongoDB Atlas

---

# User Authentication

## Registration

- [x] User Mongoose schema
- [x] User model
- [x] Registration controller
- [x] Registration route
- [x] Input validation
- [x] Password hashing using bcrypt
- [x] Duplicate email handling
- [x] Registration API tested successfully

## Login

- [x] Login controller
- [x] Login route
- [x] Password verification using bcrypt
- [x] JWT generation
- [x] Login API tested successfully

## Authentication & Authorization

- [x] JWT authentication middleware
- [x] Protected `/api/auth/me` endpoint
- [x] Current authenticated user retrieval
- [x] JWT stored on frontend
- [x] Authentication restored after page refresh
- [x] Logout functionality
- [x] Protected frontend routes
- [x] Authentication-based API requests
- [x] Transaction-level user ownership checks

---

# Transactions

The application uses a unified transaction model for both income and expenses.

## Transaction Model

The transaction structure is:

```text
Transaction
├── user
├── type
├── title
├── amount
├── category
├── date
├── description
├── createdAt
└── updatedAt
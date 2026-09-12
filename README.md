# AI Expense Tracker

A full-stack personal finance management application built with the MERN stack. The application is designed to help users track income and expenses, understand their spending patterns, and receive AI-powered financial insights.

> 🚧 **Status: Under Development**

---

## Overview

AI Expense Tracker is being developed as a full-stack financial management application where users can manage their income and expenses through a centralized dashboard.

The planned application will provide:

- Income and expense management
- Transaction search and filtering
- Financial summaries
- Spending analytics and visualizations
- Secure user authentication
- AI-powered spending analysis
- Budget recommendations
- Natural-language financial queries

The project is being developed incrementally, starting with the frontend application and backend architecture before integrating the two systems.

---

## Current Progress

### Frontend

- [x] React + Vite project setup
- [x] React Router configuration
- [x] Login page
- [x] Registration page
- [x] Form validation
- [x] Protected route structure
- [x] Dashboard layout
- [x] Reusable Sidebar component
- [x] Reusable Header component
- [x] Overview dashboard page
- [x] Transactions page
- [x] Transaction details page
- [x] Transaction form
- [x] Add transaction functionality
- [x] Edit transaction functionality
- [x] Delete transaction functionality
- [x] Transaction search
- [x] Transaction filtering
- [x] Transaction type filtering
- [x] Category filtering
- [x] Responsive UI styling
- [x] Authentication Context
- [x] Transaction Context
- [x] Custom authentication hook
- [x] Custom transaction hook
- [x] Nested dashboard routing
- [x] Analytics page structure
- [x] Profile page structure
- [x] 404 / Not Found page

### Backend

#### Project Setup

- [x] Node.js backend project setup
- [x] Express.js server setup
- [x] CORS configuration
- [x] JSON request parsing
- [x] Nodemon development setup
- [x] Environment variable configuration
- [x] Backend health-check endpoint

#### Database

- [x] MongoDB Atlas cluster setup
- [x] Mongoose installed and configured
- [x] MongoDB connection module created
- [x] MongoDB connection configuration added
- [ ] Resolve current MongoDB Atlas network/authentication connection issue

#### User Authentication

- [x] User Mongoose schema
- [x] User model
- [x] Registration controller structure
- [x] Registration route structure
- [x] Password hashing implementation using bcrypt
- [ ] Successfully test registration API
- [ ] Login API
- [ ] JWT generation
- [ ] JWT verification middleware
- [ ] Persistent authentication
- [ ] User authorization

#### Transactions

- [ ] Transaction Mongoose model
- [ ] Transaction REST API
- [ ] Create transaction endpoint
- [ ] Get transactions endpoint
- [ ] Get transaction by ID endpoint
- [ ] Update transaction endpoint
- [ ] Delete transaction endpoint
- [ ] User ownership/authorization

---

## Analytics

- [ ] Dashboard financial summaries
- [ ] Available balance calculation
- [ ] Total income calculation
- [ ] Total expenses calculation
- [ ] Spending by category
- [ ] Highest spending category
- [ ] Average expense
- [ ] Number of transactions
- [ ] Income vs expenses
- [ ] Monthly spending trends
- [ ] Interactive charts
- [ ] Date-range filtering
- [ ] Weekly analytics
- [ ] Monthly analytics
- [ ] Last 3 months analytics
- [ ] Yearly analytics
- [ ] Custom date range

---

## AI Features

The AI functionality will be implemented as a modular layer so that the core expense tracker remains functional even if AI services are unavailable.

Planned AI capabilities:

- [ ] AI expense categorization
- [ ] AI spending analysis
- [ ] Personalized budget recommendations
- [ ] Monthly financial summaries
- [ ] Natural-language financial queries
- [ ] Spending pattern detection
- [ ] Financial insights based on transaction history

---

## Financial Model

The application uses the following financial model:

```text
Opening Balance
       +
Total Income
       -
Total Expenses
       =
Available Balance
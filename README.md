# 🚀 ApexTrade — Invest in the Future

ApexTrade is a modern full-stack stock trading simulation platform where users can securely authenticate, trade virtual stocks with real-time market prices, monitor their portfolio, and receive AI-powered investment insights.

Built as a product-oriented portfolio project using React, Express, MySQL, Clerk Authentication, and Finnhub APIs.

---

## ✨ Features

### 🔐 Authentication
- Secure authentication using Clerk
- Email & Google Sign-In
- Individual user portfolios
- Protected routes
- Persistent login sessions

### 📈 Trading
- Buy & Sell stocks
- Live stock prices
- Portfolio updates instantly
- Cash balance tracking
- Holdings management

### 📊 Portfolio Dashboard
- Portfolio value
- Total invested amount
- Available cash
- Total holdings
- Transaction history
- User-specific dashboard

### 🤖 AI Advisor
- AI-powered stock recommendations
- Market analysis
- Investment suggestions

### 👤 User Isolation
Every authenticated user has:
- Independent portfolio
- Independent trade history
- Independent dashboard
- Secure database records

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- React Router
- Clerk Authentication
- CSS3

## Backend
- Node.js
- Express.js
- MySQL
- REST API

## APIs
- Finnhub Stock API
- Clerk Authentication API

---

# 📂 Project Structure

```text
ApexTrade/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── styles/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── ...
│
└── README.md
```

---

# ⚙️ Installation

## Clone

```bash
git clone https://github.com/RahulVerma2629/ApexTrade---Invest-in-the-future.git
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm start
```

---

# 🔑 Environment Variables

Create `.env` files for both frontend and backend.

### Frontend

```env
VITE_CLERK_PUBLISHABLE_KEY=your_key_here
VITE_API_URL=http://localhost:5000
```

### Backend

```env
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=apextrade
CLERK_SECRET_KEY=your_secret
FINNHUB_API_KEY=your_api_key
```

---

# 🎯 Project Highlights

- Full-stack architecture
- RESTful API design
- Secure authentication
- Real-time portfolio calculations
- MySQL relational database
- Product-oriented folder structure
- Responsive UI
- Clean codebase

---

# 🚀 Future Enhancements

- Stock watchlist
- Price charts
- Portfolio analytics
- News integration
- Email notifications
- Trade history filters
- Performance graphs

---

# 👨‍💻 Author

**Rahul Verma**

GitHub:
https://github.com/RahulVerma2629

---

## ⭐ If you found this project interesting, consider giving it a star!

# 🎧 VIBE BUSINESS TRACKER

**Empowering Small Traders with Smart, AI-Powered Expense Tracking**  
_Built for the Vibe Coding Hackathon — Part of the #1MillionDevs Movement_

---

## 🚀 Overview

The **Vibe Business Tracker** is a lightweight, mobile-friendly web application designed to help small business owners track their income and expenses in real time — even using voice or photo input! This project was built during the **Vibe Coding Hackathon** to showcase how human-centered, joy-driven AI and low-code tools can solve real-world problems faced by local traders.

> 🧾 Problem: Many small traders don’t track their income or expenses and have no idea if they’re making a profit.  
> 🎯 Solution: A smart, fast, and intuitive platform that simplifies financial tracking for informal retailers.

---

## 🎯 Hackathon Theme

> **“Building Human-Centered, Joy-Driven Solutions Using AI and Low-Code Tools”**

This project aligns perfectly with the theme by focusing on real-time income and expense tracking powered by tools like **Supabase**, **Lovable.dev**, and **AI-assisted logic**.

---

## ✨ Features

- 🧠 **AI-Enhanced Expense Logging**  
  Use voice or image input to log entries (future upgrade).
  
- 📊 **Dashboard Overview**  
  Track income, expenses, and net profit with visual graphs.

- 🔐 **Authentication via Supabase**  
  Secure sign-in/sign-up system with session persistence.

- 🔁 **Real-Time Data Sync**  
  Cloud-powered backend ensures data is live across devices.

- 📱 **Responsive UI**  
  Works beautifully on both mobile and desktop.

---

## 🔧 Tech Stack & Tools

| Category | Tools Used |
|---------|-------------|
| Frontend | React, Vite, TailwindCSS |
| Backend | Supabase (PostgreSQL, Auth, Realtime) |
| AI/Low-Code | Lovable.dev, Cursor IDE |
| Dev Tools | GitHub, Vercel (for deployment) |

---

## 📸 Screenshots

> Coming soon — Add screenshots or a Loom demo link here!

---

## 🧠 Judging Criteria Mapping

| Criteria | Our Implementation |
|----------|--------------------|
| Prompt Engineering | AI-driven input (planned via Lovable.dev / Claude) |
| UI/UX Vibes | Smooth, minimalist design with clean animations |
| Technical Creativity | Supabase integration + real-time dashboard |
| Rapid Prototyping | Built quickly with Vite, Supabase, Tailwind |
| Security | JWT-based auth, protected routes |
| Presentation | You're reading it — fully documented repo ✅ |

---

## 🧪 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Mbarak-jr/VIBE-BUSINESS-TRACKER.git
cd VIBE-BUSINESS-TRACKER

# 2. Install dependencies
npm install

# 3. Create a .env file
cp .env.example .env
# Fill in your Supabase credentials

# 4. Run the dev server
npm run dev

📁 Project Structure

vibe-retail-tracker/
├── public/
├── src/
│   ├── assets/                 # Logos, icons, audio cues
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── SummaryChart.jsx
│   │   │   └── index.js
│   │   ├── Insights/
│   │   │   ├── SpendingTrends.jsx
│   │   │   ├── IncomeVsExpense.jsx
│   │   │   └── index.js
│   │   ├── Inventory/
│   │   │   ├── InventoryList.jsx
│   │   │   ├── AddItemModal.jsx
│   │   │   └── index.js
│   │   ├── Transactions/
│   │   │   ├── TransactionList.jsx
│   │   │   ├── AddTransaction.jsx
│   │   │   └── index.js
│   │   ├── Voice/
│   │   │   ├── VoiceInput.jsx
│   │   │   ├── TranscriptionBox.jsx
│   │   │   └── index.js
│   │   ├── Common/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Insights.jsx
│   │   ├── Inventory.jsx
│   │   ├── Transactions.jsx
│   │   ├── Voice.jsx
│   │   └── Login.jsx
│   ├── routes/
│   │   └── AppRouter.jsx
│   ├── services/
│   │   ├── supabaseClient.js       # Supabase init
│   │   ├── authService.js
│   │   ├── transactionService.js
│   │   └── inventoryService.js
│   ├── store/
│   │   ├── index.js                # Redux or Zustand if needed
│   │   └── slices/
│   ├── utils/
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── README.md

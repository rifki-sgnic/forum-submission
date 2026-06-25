# 🧵 Threads Forum

A modern community discussion platform built with React and Redux Toolkit. Create threads, join conversations, and engage with the community — all in a clean, responsive interface.

🔗 **[Live Demo](https://forum-submission-taupe.vercel.app)**

---

## ✨ Features

- 🧵 Browse and create discussion threads
- 💬 Comment and engage on threads
- 🔐 User authentication (register & login)
- 👍 Upvote / downvote threads and comments
- 🗂️ Filter threads by category
- 📊 Leaderboard — see the most active users
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

| Category | Tech |
|---|---|
| Framework | React 19 |
| State Management | Redux Toolkit + React Redux |
| Routing | React Router v7 |
| UI Library | Material UI (MUI) v7 |
| Form Handling | Formik + Yup |
| Notifications | Notistack |
| Build Tool | Vite |
| Unit Testing | Vitest + Testing Library |
| E2E Testing | Cypress |
| Component Dev | Storybook |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/rifki-sgnic/forum-submission.git
cd forum-submission

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Running the App

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# Unit tests with coverage
npx vitest --coverage

# E2E tests (requires dev server running)
npm run e2e

# Run all tests (CI)
npm run ci:test

# Storybook
npm run storybook
```

---

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/           # Page-level components
├── store/           # Redux store, slices, thunks
├── hooks/           # Custom React hooks
├── utils/           # Helper functions
└── stories/         # Storybook stories
```

---

## 📄 License

MIT

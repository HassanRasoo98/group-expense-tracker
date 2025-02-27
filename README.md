# Expense Tracker Application

This is a **Next.js 15 + Supabase** application that allows users to create **expense tracking groups**, add expenses to those groups, and view expenses by group. The app supports **user authentication, group management, and expense management**.

---

## 🚀 Features

- User Authentication (via Supabase)
- Create and Manage Groups
- Track Expenses by Group
- Real-time Data Fetching with Next.js 15
- Server Actions for Expense and Group Creation
- Authorization and Role-based Access
- Fully TypeScript and Modern Next.js App Router

---

## 🛠️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/HassanRasoo98/group-expense-tracker
cd expense-tracker
```

---

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following values:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

In this example the .env.local file is already uploaded.
Make sure your Supabase project is configured with:

- Auth enabled
- Tables: `groups`, `expenses`
- Appropriate RLS (Row Level Security) policies

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Run the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 How AI Tools (ChatGPT) Helped

This project was developed with significant assistance from **ChatGPT (AI Tool)**, which played a key role in:

### 1. DB Planning
- Designing the database schema on supabase.
- Writing queries to create tables in sql editor of supabase.

### 2. API and Server Actions
- Refactoring the core API endpoints for groups and expenses.
- Creating secure **Server Actions** for handling form submissions.
- Implementing proper error handling and response formatting.

### 3. Debugging and Fixes
- Helping correct issues with `Authorization` headers and extracting user tokens safely.

### 4. Improving Code Quality
- Recommended better patterns for:
    - Form handling (server actions with `formData` in ExpenseForm and GroupForm).
    - Separating client and server responsibilities.

### 5. Documentation & Best Practices
- Suggested improvements for:
    - File and folder structure.
    - TypeScript type usage.
    - Consistent handling of error messages and loading states.

---
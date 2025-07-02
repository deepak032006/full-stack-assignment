# 🏗️ B2B Tender Management Platform

A full-stack B2B platform where companies can:
- Register & manage their profile
- Create & publish tenders
- Browse & apply to tenders
- Search other companies

---

## 📁 Project Structure

full-stack-assignment/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ ├── utils/
│ │ └── server.js
│ ├── prisma/
│ │ ├── schema.prisma
│ │ └── migrations/
│ └── package.json
├── frontend/
│ ├── pages/
│ ├── components/
│ └── package.json



---

## ⚙️ Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | Next.js (TypeScript + Tailwind) |
| Backend   | Express.js + JWT Auth         |
| Database  | PostgreSQL + Prisma ORM       |
| Storage   | Supabase (file uploads)       |

---

## 🔧 Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev

Create a .env file:
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/yourdb
JWT_SECRET=your-secret-key
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_KEY=your-supabase-api-key
SUPABASE_BUCKET=projects
PORT=4000

🔧 Frontend Setup
cd frontend
npm install
npm run dev

.env.local file:
NEXT_PUBLIC_API_BASE=http://localhost:4000/api


✅ Features
🔐 Auth: Register / Login with JWT

🏢 Company: Create + View company with logo

📢 Tender: Publish & apply to tenders

📨 Application: Submit proposals

🔎 Search: Find companies by name/industry/services

🖼️ Uploads: Logo upload via Supabase

🔒 Auth Flow
Frontend stores JWT in localStorage

Token is sent in header: Authorization: Bearer <token>

Backend middleware verifies token and sets req.user

🗂️ Supabase Storage
Uses Supabase bucket named projects

Upload API: /api/upload/logo

Multer used for memory upload → Supabase public URL generated

#👨‍💻 Author
Deepak sharma

Internship Assignment for Full Stack Developer Role

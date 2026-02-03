# MegaBlog 📝

MegaBlog is a blogging platform MVP built with a **production-first mindset**.  
The focus of this project is on **application logic, architecture, and real-world practices**, rather than UI polish.

This project was built as a **course project** for **Chai aur React** by **Hitesh Choudhary (Chai aur Code)**.

---

## 🚀 Project Overview

MegaBlog allows authenticated users to create, manage, and publish blog posts with featured images.  
It uses **Appwrite (BaaS)** for authentication, database management, and file storage.

The app demonstrates how real-world blog platforms are structured and secured using authentication-based access control.

---

## ✨ Features

- User authentication (Login / Signup)
- Protected routes for authenticated users
- Create, edit, and delete blog posts
- Author-only access for editing and deleting posts
- Post status management (Active / Inactive)
- Featured image upload using Appwrite Storage
- Slug-based dynamic routing
- Global state management using Redux Toolkit
- Clean, scalable project structure

---

## 🛠 Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router
- React Hook Form
- Tailwind CSS

### Backend (BaaS)
- Appwrite
  - Authentication
  - Database
  - Storage

---

## 🔐 Access Control

- Only **logged-in users** can view blog posts
- Only the **author** of a post can edit or delete it
- Posts can be marked as `active` or `inactive`
- Full role-based access control (RBAC) with explicit roles is not implemented yet

---

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_RTE_KEY = your_RTE_key
```

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/megablog.git
cd megablog
npm install
npm run dev
```
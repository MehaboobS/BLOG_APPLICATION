# BLOG_APPLICATION

A full-stack blog platform built with a Next.js frontend and an Express + MongoDB backend.

The application supports authentication, role-based access, post creation and management, owner-only edit/delete controls, and an admin dashboard to view all registered users.

## Highlights

- JWT-based authentication (register/login/logout)
- Role-aware UI and route protection (`user`, `admin`)
- Post CRUD with ownership rules
- Dedicated `My Posts` page for personal content management
- Public/community post listing on dashboard
- Admin panel to review all registered users
- Responsive UI with a consistent gradient + glassmorphism design language

## Architecture

This repository is organized as a monorepo:

- `apps/frontend` - Next.js 16 app (React 19, Tailwind CSS 4)
- `apps/server` - Express API (Node.js, MongoDB via Mongoose)
- `packages` - shared modules (reserved)
- `docs` - project documentation (reserved)

## Tech Stack

Frontend:

- Next.js 16
- React 19
- Tailwind CSS 4
- Axios

Backend:

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- CORS + dotenv

## Core Features

### 1. Authentication and Authorization

- User registration and login using email/password
- JWT token issued on login and sent in `Authorization: Bearer <token>`
- Protected API routes using auth middleware
- Admin-only API endpoints controlled via role middleware

### 2. Post Management

- Create post (authenticated)
- View all posts
- View personal posts on separate `My Posts` page
- Update/delete post only if:
	- logged-in user is the post owner, or
	- logged-in user has `admin` role

### 3. Dashboards

- User dashboard:
	- Create new post
	- View all posts
	- View post details in modal
	- Edit/delete actions available only for owner
- Admin dashboard:
	- View all users
	- User role summary cards
	- Admin access protection

### 4. UI/UX

- Shared navbar with role-aware navigation
- Consistent visual style across pages
- Responsive layouts for desktop/mobile
- Loading, empty, and error states in key sections

## API Overview

Base URL:

- `http://localhost:5000/api`

Auth routes:

- `POST /auth/register`
- `POST /auth/login`

Post routes:

- `GET /posts` - list all posts
- `GET /posts/me` - list logged-in user posts
- `POST /posts` - create post (auth)
- `PUT /posts/:id` - update post (auth + owner/admin)
- `DELETE /posts/:id` - delete post (auth + owner/admin)

User routes:

- `GET /users` - list all users (auth + admin only)

## Local Setup

### Prerequisites

- Node.js (18+ recommended)
- npm
- MongoDB connection string

### 1) Clone and install dependencies

Install frontend dependencies:

```bash
cd apps/frontend
npm install
```

Install backend dependencies:

```bash
cd apps/server
npm install
```

### 2) Configure environment variables

Create/update `apps/server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3) Run backend

From `apps/server`:

```bash
nodemon server.js
```

### 4) Run frontend

From `apps/frontend`:

```bash
npm run dev
```

Frontend runs on:

- `http://localhost:3000`

Backend runs on:

- `http://localhost:5000`

## Authentication Flow

1. User logs in using `/auth/login`
2. Backend returns `token` + safe user object
3. Frontend stores token in `localStorage`
4. Axios interceptor attaches token to API requests
5. Protected endpoints validate token and role/ownership rules

## Roadmap Ideas

- Rich text editor for posts
- Image upload support
- Post categories/tags and search
- Comment system
- Like/bookmark system
- Pagination and filters
- Automated tests (frontend + backend)

## Author

Maintained by the BLOG_APPLICATION team.

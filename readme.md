# vidThix

**vidThix** is a full-stack social media video publishing platform that allows creators to upload, customize, schedule, and publish video content across connected social media platforms from one workspace.

The project combines a **React frontend** with a **FastAPI backend**, MongoDB persistence, JWT authentication, YouTube OAuth, video uploads, publishing workflows, and scheduled posts.

The current implementation focuses on the core workflow:

```text
Upload video → Customize post → Select platforms → Publish → Schedule → Track status
```

SEO optimization is temporarily disabled and preserved for future development.

---

## Features

### Video Management

* Drag-and-drop video upload
* Video preview
* Video metadata management
* Title, description, tags, and category
* Video library
* Delete uploaded videos
* Persistent video records through MongoDB

### Multi-Platform Publishing

* Select connected social media platforms
* Publish video content from one workspace
* YouTube publishing through the YouTube Data API
* Platform connection management
* Platform-specific publishing status
* Instagram, TikTok, LinkedIn, and Facebook prepared for future integration

### Scheduling

* Schedule videos for future publishing
* View scheduled posts
* Cancel scheduled posts
* Automatic scheduled publishing through APScheduler
* Publishing status tracking

### Authentication

* User registration
* User login
* JWT access tokens
* JWT refresh tokens
* Current-user endpoint
* Protected API routes

### YouTube Integration

* Google OAuth authentication
* YouTube account connection
* OAuth callback handling
* YouTube channel information
* Video publishing through YouTube Data API
* Resumable video uploads

### Dashboard

* Upload statistics
* Publishing statistics
* Scheduled-post statistics
* Recent activity
* Platform connection status

### Frontend

* Responsive React dashboard
* Light and dark themes
* Toast notifications
* Loading states
* Lazy-loaded routes
* Public home, about, contact, and blog pages
* Admin blog management
* React Router navigation

---

## Supported Platforms

| Platform  | Status         |
| --------- | -------------- |
| YouTube   | ✅ Available    |
| Instagram | 🚧 Coming soon |
| TikTok    | 🚧 Coming soon |
| Facebook  | 🚧 Coming soon |
| LinkedIn  | 🚧 Coming soon |

The current backend includes the architecture required to add additional platforms through dedicated services and OAuth integrations.

---

# Tech Stack

## Frontend

* React 19
* Vite 8
* React Router
* Tailwind CSS
* Lucide React
* Recharts
* React Dropzone
* React Datepicker
* date-fns
* tsParticles

## Backend

* FastAPI
* Python 3.11+
* MongoDB
* Motor
* Pydantic
* python-jose
* Google API Python Client
* google-auth-oauthlib
* APScheduler

## DevOps / Infrastructure

* Docker
* Docker Compose
* MongoDB Docker container
* Uvicorn

---

# Project Structure

```text
vidThix/
│
├── frontend/
│   ├── src/
│   │   ├── components/       Reusable UI and feature components
│   │   ├── context/          Application and toast state
│   │   ├── hooks/            Shared React hooks
│   │   ├── layout/           Shared dashboard layout
│   │   ├── pages/            Route-level page components
│   │   ├── utils/            Constants, helpers, demo data
│   │   ├── App.jsx           Router and application shell
│   │   ├── index.css         Global styles
│   │   └── main.jsx          React entry point
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   └── security.py
│   │   │
│   │   ├── models/
│   │   │
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   ├── platform.py
│   │   │   ├── video.py
│   │   │   └── scheduled_post.py
│   │   │
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── youtube.py
│   │   │   ├── platforms.py
│   │   │   ├── videos.py
│   │   │   ├── scheduled.py
│   │   │   └── dashboard.py
│   │   │
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── youtube_service.py
│   │   │   └── scheduler_service.py
│   │   │
│   │   ├── uploads/
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── .env.example
│   └── ...
│
├── .gitignore
├── README.md
└── docker-compose.yml
```

---

# Getting Started

## Prerequisites

Make sure you have:

* Node.js and npm
* Python 3.11+
* Docker and Docker Compose
* Git

For real YouTube publishing:

* A Google Cloud project
* YouTube Data API v3 enabled
* Google OAuth credentials

---

# 1. Clone the Repository

```bash
git clone <your-repository-url>
cd vidThix
```

---

# 2. Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create your environment file:

```bash
cp .env.example .env
```

On Windows, you can also create `.env` manually from `.env.example`.

---

# 3. Backend Environment Variables

Example:

```env
SECRET_KEY=your-secret-key

MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=vidthix

FRONTEND_ORIGIN=http://localhost:5173

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/youtube/callback

MAX_UPLOAD_SIZE_MB=500
```

Generate a secure JWT secret:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

# 4. Start MongoDB

Using Docker:

```bash
docker run -d --name vidthix-mongo -p 27017:27017 mongo:7
```

Or use Docker Compose if your project configuration includes MongoDB.

---

# 5. Start the Backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger API documentation:

```text
http://localhost:8000/docs
```

---

# 6. Frontend Setup

Open another terminal and move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 7. Google Cloud / YouTube Setup

Real YouTube publishing requires Google OAuth.

### Step 1 — Create a Google Cloud Project

Create or select a project in Google Cloud Console.

### Step 2 — Enable YouTube Data API v3

Go to:

```text
APIs & Services → Library
```

Search for:

```text
YouTube Data API v3
```

Enable it.

### Step 3 — Create OAuth Credentials

Go to:

```text
APIs & Services → Credentials
```

Create an:

```text
OAuth Client ID
```

Select:

```text
Web application
```

Add the redirect URI:

```text
http://localhost:8000/api/auth/youtube/callback
```

Copy the generated:

```text
Client ID
Client Secret
```

and place them in your backend `.env`.

### Step 4 — Add a Test User

While the OAuth application is in testing mode, add your Google account as a test user through the OAuth consent-screen configuration.

---

# API Overview

| Method | Endpoint                     | Purpose                      |
| ------ | ---------------------------- | ---------------------------- |
| POST   | `/api/auth/register`         | Create an account            |
| POST   | `/api/auth/login`            | Login and receive tokens     |
| POST   | `/api/auth/refresh`          | Refresh access token         |
| GET    | `/api/auth/me`               | Get current user             |
| GET    | `/api/auth/youtube/connect`  | Start YouTube OAuth          |
| GET    | `/api/auth/youtube/callback` | Handle Google OAuth callback |
| GET    | `/api/platforms`             | List connected platforms     |
| DELETE | `/api/platforms/{platform}`  | Disconnect platform          |
| POST   | `/api/videos/upload`         | Upload a video               |
| GET    | `/api/videos`                | List uploaded videos         |
| PATCH  | `/api/videos/{id}`           | Update video metadata        |
| POST   | `/api/videos/{id}/publish`   | Publish a video              |
| DELETE | `/api/videos/{id}`           | Delete a video               |
| POST   | `/api/scheduled/{video_id}`  | Schedule a video             |
| GET    | `/api/scheduled`             | List scheduled posts         |
| DELETE | `/api/scheduled/{id}`        | Cancel scheduled post        |
| GET    | `/api/dashboard/stats`       | Get dashboard statistics     |

Interactive API documentation is available at:

```text
http://localhost:8000/docs
```

---

# Frontend Routes

| Route             | Purpose                                 |
| ----------------- | --------------------------------------- |
| `/`               | Public home page                        |
| `/about`          | About page                              |
| `/contact`        | Contact page                            |
| `/blog`           | Blog listing                            |
| `/blog/:slug`     | Individual blog post                    |
| `/pages/:slug`    | Footer content pages                    |
| `/dashboard`      | Dashboard overview                      |
| `/upload`         | Upload, customize, publish, or schedule |
| `/platforms`      | Connect and manage platforms            |
| `/settings`       | User and application settings           |
| `/dashboard/blog` | Admin blog management                   |
| `/scheduled`      | Redirects to dashboard                  |

Unknown routes redirect to the home page.

---

# Core Workflow

The main vidThix workflow is:

```text
                 Upload Video
                      │
                      ▼
              Customize Post
                      │
                      ▼
              Select Platforms
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       YouTube    Instagram     TikTok
          │           │           │
          └───────────┼───────────┘
                      ▼
                Publish / Schedule
                      │
                      ▼
              Track Publishing Status
```

The goal is to allow creators to manage their social video publishing workflow from a single workspace instead of manually uploading the same content to every platform.

---

# Current Development Status

### Working

* React frontend
* FastAPI backend
* MongoDB persistence
* JWT authentication
* Video upload
* Video metadata
* YouTube OAuth
* YouTube publishing
* Platform connection management
* Scheduled posts
* APScheduler publishing
* Dashboard statistics
* Docker development environment

### Coming Soon

* Instagram publishing
* TikTok publishing
* Facebook publishing
* LinkedIn publishing
* Platform-specific content customization
* Advanced analytics
* Production cloud storage
* Scalable background workers

---

# SEO Status

SEO optimization is **temporarily disabled** because the current product focus is multi-platform social media publishing.

The SEO implementation has **not been deleted** and remains preserved for future development.

Previously implemented SEO components include:

```text
frontend/src/pages/SEOAnalyzer.jsx
frontend/src/components/seo/SEOScore.jsx
frontend/src/components/seo/SEOSuggestions.jsx
frontend/src/utils/seoCalculator.js
```

SEO-related integrations have been commented out rather than deleted.

The future SEO workflow can be restored when the core publishing system is mature.

---

# Data and Storage

During development:

* MongoDB stores application data.
* Uploaded videos are stored locally under:

```text
backend/app/uploads/
```

* Environment variables are stored in `.env`.
* `.env` files are excluded from Git.
* Uploaded files are excluded from Git except for `.gitkeep`.

For production, local video storage should be replaced with object storage such as:

* Amazon S3
* Google Cloud Storage
* Cloudflare R2

---

# Docker

The project is designed to support Docker-based development.

Start the complete development environment:

```bash
docker compose up --build
```

Stop the containers:

```bash
docker compose down
```

MongoDB uses a persistent Docker volume so database data can survive container restarts.

---

# Production Architecture

A future production deployment can follow this architecture:

```text
                    Users
                      │
                      ▼
               React Frontend
                      │
                      ▼
                FastAPI API
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
     MongoDB      Object Storage   Redis
                                  │
                                  ▼
                              Job Worker
                                  │
              ┌───────────────────┼──────────────────┐
              ▼                   ▼                  ▼
           YouTube            Instagram          TikTok
```

For multiple backend instances, scheduled publishing should eventually move from APScheduler inside the API process to a dedicated worker system such as Celery + Redis or another distributed job queue.

---

# Security Notes

Never commit:

```text
.env
Google Client Secret
JWT Secret
Database credentials
OAuth tokens
Uploaded private media
```

These values should always be stored in environment variables or a secure secret-management system.

---

# Development

### Frontend lint

```bash
cd frontend
npm run lint
```

### Frontend production build

```bash
cd frontend
npm run build
```

### Frontend preview

```bash
cd frontend
npm run preview
```

### Backend development server

```bash
cd backend
uvicorn app.main:app --reload
```

---

# Future Roadmap

```text
[x] React frontend prototype
[x] FastAPI backend
[x] MongoDB persistence
[x] JWT authentication
[x] YouTube OAuth
[x] YouTube publishing
[x] Video uploads
[x] Scheduling
[x] Dashboard statistics
[x] Docker development setup

[ ] Instagram integration
[ ] TikTok integration
[ ] Facebook integration
[ ] LinkedIn integration
[ ] Platform-specific post customization
[ ] Advanced analytics
[ ] Cloud video storage
[ ] Distributed background workers
[ ] SEO optimization
[ ] Production deployment
```

---

# License

No license has been specified for this project yet.

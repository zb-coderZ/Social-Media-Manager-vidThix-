# vidThix - Multi-Platform Content Publishing & Automation Studio

**vidThix** is a full-stack social media publishing platform that allows creators and digital teams to upload, customize, schedule, and publish video & text content across connected social platforms (YouTube & LinkedIn) from one unified workspace.

The application combines a modern **React 19 frontend** with a **FastAPI backend**, MongoDB database persistence, JWT authentication, YouTube & LinkedIn OAuth 2.0 authorization, automated APScheduler queueing, and a state-of-the-art UI/UX dashboard.

```text
Upload / Create Content → Customize Metadata → Select Targets (YouTube / LinkedIn) → Auto Publish / Schedule → Track Live Status
```

---

## Key Features & Capabilities

### 🎥 Multi-Platform Publishing Studio
* **YouTube Publishing**: Full integration with YouTube Data API v3 for resumable video uploads with custom titles, descriptions, categories, and tags.
* **LinkedIn Publishing**: Integration with LinkedIn v2 REST APIs for sharing posts, text updates, and media content directly to member profiles.
* **Platform Selector**: Brand-accented platform selector with target-specific options and direct live URL links upon publishing.

### 🔐 Enterprise OAuth 2.0 Authorization
* ✅ **Google / YouTube OAuth 2.0**: Operational authorization flow with state-token validation, offline refresh tokens, and channel profile sync (Avatar, Channel Name, Subscribers).
* ✅ **LinkedIn OAuth 2.0**: Operational authorization flow with PKCE state verification, userinfo sync, member profile URNs, and token refresh handling.
* **State Token Security**: Signed JWT state tokens prevent CSRF callback attacks.
* **MongoDB Token Storage**: Encrypted storage of OAuth credentials in the `platform_connections` collection.

### 📅 Smart Scheduling & Queue Management
* **Timezone-Aware Queue**: Schedule posts for future release with local timezone support.
* **APScheduler Integration**: Automated background scheduler process that triggers video/text publishing at the designated time.
* **Queue Resolution & Cancellation**: Visual countdowns ("In 2 hours"), status filters (`All`, `Pending`, `Completed`), and one-click cancellation.

### 📊 Intelligent Dashboard & Analytics
* **Content Distribution Ratio**: Live visualization of YouTube vs LinkedIn publishing distribution.
* **Segmented Activity Feeds**: Platform filter tabs (`All`, `YouTube`, `LinkedIn`, `Instagram`, `TikTok`, `Facebook`) with count badges and live post links.
* **System Status Pulse**: Real-time system health and channel connection indicators (`2 Active Connections`).

### 📝 CMS & Blog Management Studio
* **Admin CMS Studio**: Summary stats (Total Articles, Published Posts, Draft Manuscripts, Reader Views).
* **Live Google Search SEO Preview**: Dual-column editor featuring real-time preview of how articles will look on Google search results.
* **Auto-Slug Generator**: One-click slugification tool for article URLs.
* **Public Reader Experience**: Topic filter pills (`All Topics`, `SEO`, `Content Strategy`, `Automation`), hero search bar, reading time badges, and share buttons.

### 🎨 Premium Landing Page & User Design
* **Hero Studio Mockup**: Interactive glassmorphic preview box showing live channel states and queue items.
* **Product Tour Demo Modal**: Video tour modal with direct dashboard launch options.
* **Transparent Pricing Matrix**: 3-tier pricing table with interactive Monthly / Annual billing toggle (`Save 20%`).
* **Interactive Accordion FAQ**: Resolves common questions regarding OAuth security, timezone support, and creator features.

---

## Supported Platforms Matrix

| Platform  | Integration Status          | Authorization Protocol & API Details |
| --------- | --------------------------- | ------------------------------------ |
| **YouTube** | ✅ Connected & Operational | Google OAuth 2.0 & YouTube Data API v3 Resumable Uploads |
| **LinkedIn**| ✅ Connected & Operational | LinkedIn OAuth 2.0 & v2 REST Userinfo / Social Posts API |
| **Instagram**| 🚧 Coming Soon (Sandbox)  | Prepared for Meta Graph API Integration |
| **TikTok**   | 🚧 Coming Soon (Sandbox)  | Prepared for TikTok Content Posting API |
| **Facebook** | 🚧 Coming Soon (Sandbox)  | Prepared for Facebook Graph API |

---

## Tech Stack

### Frontend
* **Core**: React 19, Vite 8, React Router v7
* **Styling & Aesthetics**: Tailwind CSS, Glassmorphic UI Design System, Custom SVG Platform Icons
* **Icons & Visuals**: Lucide React, tsParticles Background
* **Form & Utilities**: React Dropzone, date-fns, Recharts Analytics

### Backend
* **Framework**: FastAPI (Python 3.11+)
* **Database**: MongoDB & Motor (Async Python Driver)
* **Authentication**: JWT Access & Refresh Tokens (`python-jose`, `passlib`, `bcrypt`)
* **OAuth Services**: Google API Python Client, `google-auth-oauthlib`, LinkedIn REST Service
* **Scheduler**: APScheduler (Async Background Job Queue)

### DevOps & Infrastructure
* **Containerization**: Docker & Docker Compose
* **Process Manager**: Uvicorn ASGI Server
* **Linter**: ESLint 9 (`npm run lint` verified with 0 errors)

---

## Project Directory Structure

```text
vidThix/
│
├── frontend/
│   ├── src/
│   │   ├── components/       
│   │   │   ├── common/       Navbar, Sidebar, Toast, LoadingSpinner
│   │   │   ├── dashboard/    ActivityFeed, DistributionBar
│   │   │   ├── home/         Hero, FeatureCard, PlatformCard, WorkflowSteps, Footer
│   │   │   ├── upload/       PlatformSelector, ProgressPipeline
│   │   │   └── ...           BlogTable, BlogEditor, BlogCard, BlogSidebar
│   │   │
│   │   ├── context/          AppContext, ToastContext
│   │   ├── hooks/            usePageMeta, useToast
│   │   ├── layout/           MainLayout (Admin App Shell)
│   │   ├── pages/            Home, Dashboard, Upload, Platforms, Scheduled, Settings, Blog, BlogAdmin, BlogPost
│   │   ├── utils/            api.js, blogData.js, dummyData.js, iconMap.js
│   │   ├── App.jsx           Router configuration & protected routes
│   │   └── index.css         Tailwind utilities & glassmorphic tokens
│   │
│   ├── package.json
│   └── eslint.config.js
│
├── backend/
│   ├── app/
│   │   ├── core/             security.py (JWT hashing & verification)
│   │   ├── models/           Database MongoDB PyObjectId helper
│   │   ├── schemas/          user.py, platform.py, video.py, scheduled_post.py
│   │   │
│   │   ├── routers/
│   │   │   ├── auth.py       Authentication & User session
│   │   │   ├── youtube.py    Google OAuth 2.0 connect & callback
│   │   │   ├── linkedin.py   LinkedIn OAuth 2.0 connect & callback
│   │   │   ├── platforms.py  Connected platform accounts & disconnect
│   │   │   ├── videos.py     Video upload & publishing endpoints
│   │   │   ├── scheduled.py  Scheduled post queue management
│   │   │   └── dashboard.py  Dashboard stats & distribution metrics
│   │   │
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── youtube_service.py   Resumable upload & Google API client
│   │   │   ├── linkedin_service.py  LinkedIn OAuth & social post publisher
│   │   │   └── scheduler_service.py APScheduler job handler
│   │   │
│   │   ├── uploads/          Local video binary storage
│   │   ├── config.py         Application settings & environment schema
│   │   ├── database.py       Motor MongoDB async connection
│   │   └── main.py           FastAPI application entry point
│   │
│   ├── requirements.txt
│   └── .env.example
│
├── README.md
└── docker-compose.yml
```

---

## Getting Started

### 1. Prerequisites
* **Node.js**: v18.0.0+ and `npm`
* **Python**: v3.11+
* **MongoDB**: Local MongoDB service running on port `27017` (or via Docker)

---

### 2. Environment Variables Configuration

Create a `.env` file in the `backend/` directory:

```env
# General
SECRET_KEY=your_generated_jwt_secret_key_32_bytes
MAX_UPLOAD_SIZE_MB=500
FRONTEND_ORIGIN=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=vidthix

# YouTube OAuth 2.0
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/youtube/callback

# LinkedIn OAuth 2.0
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
LINKEDIN_REDIRECT_URI=http://localhost:8000/api/auth/linkedin/callback
LINKEDIN_SCOPES=openid profile email w_member_social
```

---

### 3. Backend Setup & Startup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment (Windows)
python -m venv .venv
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI Uvicorn dev server
uvicorn app.main:app --reload
```
* **API Server**: `http://localhost:8000`
* **Interactive Swagger Docs**: `http://localhost:8000/docs`

---

### 4. Frontend Setup & Startup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install Node modules
npm install

# Run ESLint validation
npm run lint

# Start Vite dev server
npm run dev
```
* **Frontend Web App**: `http://localhost:5173`

---

## OAuth 2.0 Authorization Workflow Architecture

```text
User Clicks 'Connect Platform' on UI (/platforms)
       │
       ▼
GET /api/auth/{platform}/connect 
(Backend verifies User JWT, generates signed state token, returns OAuth URL)
       │
       ▼
Redirect to Google / LinkedIn Consent Screen
       │
       ▼
Platform Redirects to Callback URI: GET /api/auth/{platform}/callback?code=...&state=...
       │
       ▼
Backend Validates State JWT & Exchanges Code for Access & Refresh Tokens
       │
       ▼
Backend Fetches User / Channel Profile Metadata (Title, Avatar, URN)
       │
       ▼
Credentials Saved in MongoDB ('platform_connections') with status: "connected"
       │
       ▼
Redirect to Frontend (/platforms?connected={platform}) with Toast Feedback
```

---

## REST API Endpoint Summary

| Method | Endpoint                        | Description                                  |
| ------ | ------------------------------- | -------------------------------------------- |
| `POST`   | `/api/auth/register`            | Register a new user account                  |
| `POST`   | `/api/auth/login`               | Authenticate user & issue JWT tokens         |
| `GET`    | `/api/auth/me`                  | Get current authenticated user session       |
| `GET`    | `/api/auth/youtube/connect`     | Generate Google OAuth authorization URL      |
| `GET`    | `/api/auth/youtube/callback`    | Process Google OAuth callback & sync channel |
| `GET`    | `/api/auth/linkedin/connect`    | Generate LinkedIn OAuth authorization URL    |
| `GET`    | `/api/auth/linkedin/callback`   | Process LinkedIn OAuth callback & sync profile|
| `GET`    | `/api/platforms`                | List connected user platforms & health status |
| `DELETE` | `/api/platforms/{platform}`     | Disconnect social account & revoke tokens    |
| `POST`   | `/api/videos/upload`            | Upload video binary file to storage          |
| `GET`    | `/api/videos`                   | List user's uploaded videos                  |
| `POST`   | `/api/videos/{id}/publish`      | Publish video immediately to target platform |
| `POST`   | `/api/scheduled/{video_id}`     | Schedule video for future queue release      |
| `GET`    | `/api/scheduled`                | Get user's scheduled post queue              |
| `DELETE` | `/api/scheduled/{id}`           | Cancel a scheduled post from queue           |
| `GET`    | `/api/dashboard/stats`          | Retrieve stats & platform ratio breakdown    |

---

## Completed Milestones & Roadmap

- [x] **React 19 Frontend Shell & Navigation**
- [x] **FastAPI & Async MongoDB Backend Architecture**
- [x] **JWT Authentication (Login, Register, Session)**
- [x] **YouTube OAuth 2.0 Authorization & Resumable Video Publishing**
- [x] **LinkedIn OAuth 2.0 Authorization & Social Post Publishing**
- [x] **Platform Connection Management & Disconnect Confirmation Modal**
- [x] **APScheduler Automated Queueing & Timezone Post Cancellation**
- [x] **CMS Blog Management Studio with Live Google SEO Snippet Preview**
- [x] **Overhauled UI/UX across Dashboard, Upload, Scheduled, Platforms, Settings, Blog & Landing Page**
- [x] **ESLint Linting (Verified 0 Errors)**
- [ ] **Instagram Reels & Stories Integration**
- [ ] **TikTok Short Video Integration**
- [ ] **Facebook Page Video Publishing**
- [ ] **Cloud Object Storage (Amazon S3 / Google Cloud Storage)**

---

## License

This project is licensed under the MIT License - see the project root for details.

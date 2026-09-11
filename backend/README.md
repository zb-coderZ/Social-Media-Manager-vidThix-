# vidThix Backend (FastAPI)

Backend API for **vidThix** — handles user accounts, real YouTube OAuth
connections, video uploads, publishing to YouTube, scheduling, and dashboard
stats. Built to plug directly into the existing vidThix React frontend,
replacing its simulated/localStorage behavior with real persistence and a
real YouTube publish flow.

## Stack

- **FastAPI** — API framework
- **MongoDB** (via Motor, async driver) — local for development, Atlas for production
- **JWT** (python-jose) — access/refresh token auth
- **Google API Python Client + google-auth-oauthlib** — YouTube OAuth + upload
- **APScheduler** — background job that publishes scheduled posts on time
- **Docker / docker-compose** — local dev environment (API + MongoDB)

## Project structure

```text
app/
├── main.py              FastAPI app, CORS, router wiring, startup/shutdown
├── config.py             Settings loaded from environment variables
├── database.py           MongoDB connection + indexes
├── core/
│   └── security.py       Password hashing, JWT create/verify
├── models/                (reserved for future ORM-style models)
├── schemas/               Pydantic request/response models
│   ├── user.py
│   ├── platform.py
│   ├── video.py
│   └── scheduled_post.py
├── routers/               API endpoints, grouped by feature
│   ├── auth.py            Register, login, refresh, /me
│   ├── youtube.py         YouTube OAuth connect + callback
│   ├── platforms.py       List/disconnect platform connections
│   ├── videos.py          Upload, metadata, publish, delete
│   ├── scheduled.py       Create/list/cancel scheduled posts
│   └── dashboard.py       Aggregate stats for the dashboard
├── services/
│   ├── auth_service.py    get_current_user JWT dependency
│   ├── youtube_service.py YouTube OAuth + resumable upload logic
│   └── scheduler_service.py  Background job that publishes due posts
└── uploads/                Uploaded video files land here (dev/local storage)
```

---

## 1. Prerequisites

- Python 3.11+ (3.12 recommended)
- Docker + Docker Compose (recommended — handles MongoDB for you)
- A Google Cloud project with the **YouTube Data API v3** enabled

---

## 2. Google Cloud setup (required for real YouTube auth)

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → create or select a project.
2. Enable **YouTube Data API v3** under "APIs & Services" → "Library".
3. Go to "APIs & Services" → "Credentials" → "Create Credentials" → **OAuth client ID**.
   - Application type: **Web application**
   - Authorized redirect URI: `http://localhost:8000/api/auth/youtube/callback`
4. Copy the generated **Client ID** and **Client Secret** — you'll need them in `.env`.
5. Under "OAuth consent screen", add your own Google account as a **test user** while your app is unverified. This lets you test the full flow immediately. Public (non-test) users will need your app to pass Google's verification for the `youtube.upload` scope — start that process early since it can take time.

---

## 3. Install and run (Docker — recommended)

```bash
# 1. Clone/unzip the project, then move into it
cd vidthix-backend

# 2. Copy the environment template and fill in your values
cp .env.example .env
# Edit .env: set SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET

# 3. Build and start the API + local MongoDB together
docker compose up --build
```

The API will be available at **http://localhost:8000**
Interactive API docs (Swagger UI): **http://localhost:8000/docs**

MongoDB runs in its own container with a persistent volume (`mongo_data`), so
your data survives container restarts. No local MongoDB install needed.

---

## 4. Install and run (without Docker)

```bash
# 1. Move into the project folder
cd vidthix-backend

# 2. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Copy and edit the environment file
cp .env.example .env
# Edit .env with your values (see below)

# 5. Make sure MongoDB is running locally
#    Easiest option: run just the database container
docker run -d --name vidthix-mongo -p 27017:27017 mongo:7
#    (or install MongoDB Community Server directly if you prefer no Docker at all)

# 6. Start the API with auto-reload for development
uvicorn app.main:app --reload
```

The API will be available at **http://localhost:8000**

---

## 5. Environment variables (`.env`)

| Variable | Description |
|---|---|
| `SECRET_KEY` | Random secret for signing JWTs. Generate with `python -c "import secrets; print(secrets.token_hex(32))"` |
| `MONGODB_URI` | `mongodb://localhost:27017` for local dev, or your Atlas connection string for production |
| `MONGODB_DB_NAME` | Database name (default: `vidthix`) |
| `FRONTEND_ORIGIN` | Your React app's URL, for CORS (default: `http://localhost:5173`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | From Google Cloud Console (step 2 above) |
| `GOOGLE_REDIRECT_URI` | Must exactly match what you registered in Google Cloud Console |
| `MAX_UPLOAD_SIZE_MB` | Max video upload size, in MB (default: 500) |

---

## 6. Switching from local MongoDB to Atlas (production)

1. Create a free (M0) cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Add your server's IP (or `0.0.0.0/0` for quick testing — restrict this before going live) to the Atlas Network Access list.
3. Create a database user and grab the connection string.
4. In your production `.env`, set:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net
   ```
5. No code changes needed — `database.py` reads `MONGODB_URI` directly from settings.

---

## 7. API overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create an account |
| POST | `/api/auth/login` | Log in, get access + refresh tokens |
| POST | `/api/auth/refresh` | Exchange refresh token for a new access token |
| GET | `/api/auth/me` | Current user profile |
| GET | `/api/auth/youtube/connect` | Get the Google consent URL to redirect the browser to |
| GET | `/api/auth/youtube/callback` | Google redirects here after consent (handled automatically) |
| GET | `/api/platforms` | List all platform connections (YouTube + coming-soon placeholders) |
| DELETE | `/api/platforms/{platform}` | Disconnect a platform |
| POST | `/api/videos/upload` | Upload a video file (multipart/form-data) |
| GET | `/api/videos` | List your uploaded videos |
| PATCH | `/api/videos/{id}` | Update title/description/tags/category |
| POST | `/api/videos/{id}/publish` | Publish immediately to a connected platform |
| DELETE | `/api/videos/{id}` | Delete a video |
| POST | `/api/scheduled/{video_id}` | Schedule a video for future publishing |
| GET | `/api/scheduled` | List scheduled posts |
| DELETE | `/api/scheduled/{id}` | Cancel a pending scheduled post |
| GET | `/api/dashboard/stats` | Upload/publish/scheduled counts + recent activity |

Full interactive docs with request/response schemas are always available at `/docs` once the server is running.

---

## 8. Connecting the React frontend

In the frontend, replace the simulated YouTube connect flow with a real call:

1. Call `GET /api/auth/youtube/connect` (with the user's JWT in the `Authorization: Bearer <token>` header).
2. Redirect the browser to the returned `authorization_url`.
3. Google redirects back to your backend's `/api/auth/youtube/callback` automatically — no frontend code needed for that step.
4. The backend then redirects the browser to `{FRONTEND_ORIGIN}/platforms?connected=youtube`, so your platforms page can show a success state.

For uploads, send a `multipart/form-data` POST to `/api/videos/upload` with the video file — this matches how `react-dropzone` (already in your stack) hands you a `File` object.

---

## 9. Notes on scaling this later

- **File storage**: videos currently save to local disk (`app/uploads/`). For production, swap this for S3/GCS/Cloudflare R2 — only `videos.py`'s upload handler needs to change.
- **Scheduler**: uses APScheduler inside the same process. Fine for a single backend instance. If you ever run multiple instances behind a load balancer, move scheduled publishing to a dedicated worker (e.g. Celery + Redis) so posts don't get published twice.
- **Other platforms**: Instagram/TikTok/LinkedIn/Facebook are stubbed as "coming soon" in `/api/platforms`. Add each one the same way YouTube was built: a `<platform>_service.py` in `services/`, plus connect/callback routes.

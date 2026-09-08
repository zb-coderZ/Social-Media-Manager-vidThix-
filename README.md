# vidThix

vidThix is a React dashboard for managing video content across social media platforms. It brings uploading, SEO optimization, scheduling, platform connections, analytics, and content management into one workspace.

This repository currently contains a frontend prototype. Its workflows use simulated delays and browser storage, so it can be explored without an API or third-party OAuth credentials.

## Features

- Dashboard with upload, scheduling, SEO, platform, and engagement statistics
- Video upload flow with drag-and-drop file selection and file preview
- Video metadata form for title, description, tags, and category
- Simulated publishing and scheduled-post workflows
- Real-time SEO scoring with actionable suggestions
- Platform connection management with a simulated YouTube connection flow
- Light and dark themes with persisted preferences
- Responsive public pages for the home page, about, contact, blog, and blog posts
- Admin blog management route for users marked as administrators
- Toast notifications and loading states throughout the application
- Lazy-loaded route pages with a shared application layout

## Supported platforms

YouTube is enabled for the current prototype. Instagram, TikTok, LinkedIn, and Facebook are represented in the interface but marked as coming soon.

## Tech stack

- React 19
- Vite 8
- React Router
- Tailwind CSS
- Lucide React icons
- Recharts
- React Dropzone
- React Datepicker
- date-fns
- tsParticles

## Getting started

### Prerequisites

- Node.js and npm

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL in the terminal, normally `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run lint checks

```bash
npm run lint
```

## Application routes

| Route | Purpose |
| --- | --- |
| `/` | Public home page |
| `/about` | About page |
| `/contact` | Contact page |
| `/blog` | Blog listing |
| `/blog/:slug` | Individual blog post |
| `/pages/:slug` | Footer content pages |
| `/dashboard` | Dashboard overview |
| `/upload` | Upload, optimize, publish, or schedule a video |
| `/seo` | Standalone SEO analyzer |
| `/platforms` | Connect and manage social platforms |
| `/settings` | User and application settings |
| `/dashboard/blog` | Admin blog management |
| `/scheduled` | Alias that redirects to `/dashboard` |

Unknown routes redirect to the home page.

## Project structure

```text
src/
├── components/       Reusable UI and feature components
├── context/          Application and toast state providers
├── hooks/            Shared React hooks
├── layout/           Shared dashboard layout
├── pages/            Route-level page components
├── utils/            Constants, demo data, helpers, and SEO logic
├── App.jsx           Router and application shell
├── index.css         Global styles
└── main.jsx          React entry point
```

## Data and prototype behavior

The app does not currently call a backend. User preferences, connected platforms, statistics, uploads, and scheduled posts are stored in `localStorage` using the `vidthix_*` keys defined in `src/utils/constants.js`.

The following interactions are simulated:

- Upload progress advances locally before a post is marked as published.
- Scheduling stores a local scheduled-post record.
- Connecting YouTube waits for a simulated OAuth flow and then uses demo channel data.
- SEO results are calculated locally from the title, description, and tags.

To reset the demo state, clear the site's local storage in the browser and reload the application.

## Development notes

- The app defaults to the user's system color preference and persists theme changes.
- The admin route currently treats the default demo user as an administrator.
- There are no environment variables or external service credentials required for the current build.
- A production version would need a backend for authentication, OAuth, media storage, publishing APIs, scheduling, and persistent analytics.

## License

No license has been specified for this project yet.

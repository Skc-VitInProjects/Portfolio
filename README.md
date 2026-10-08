# Skand Kumar Choubey — Product Portfolio

A responsive React/Vite portfolio served by an Express API with MongoDB-backed contact submissions.

## Stack

- **Frontend:** React 18, Vite, CSS
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **Deployment:** Render web service (the backend serves the built frontend in production)

## Run locally

1. Install dependencies:

   ```bash
   cd backend && npm ci
   cd ../frontend && npm ci
   ```

2. Create `backend/.env` from [`backend/.env.example`](./backend/.env.example) and provide a MongoDB connection string. For local development, the default fallback is `mongodb://localhost:27017/portfolio`.

3. Start the API:

   ```bash
   cd backend
   npm run dev
   ```

4. In a second terminal, start Vite:

   ```bash
   cd frontend
   npm run dev
   ```

Vite proxies `/api` requests to `http://localhost:5000`. The API health endpoint is available at `http://localhost:5000/api/health`.

## Render deployment

This repository includes [`render.yaml`](./render.yaml) for a single Render Web Service:

- **Build:** `cd backend && npm ci && cd ../frontend && npm ci && npm run build`
- **Start:** `cd backend && npm start`
- **Health check:** `/api/health`

In Render, set these environment variables:

- `NODE_ENV=production`
- `MONGODB_URI=<your MongoDB Atlas connection string>`
- `FRONTEND_URL=https://<your-service-name>.onrender.com`

Add the Render service's outbound access to MongoDB Atlas Network Access. A production process exits when MongoDB cannot connect, so Render will report a failed deploy instead of serving a partially broken contact form.

## Feature checks

- Navigation links scroll to Profile, Skills, Projects, Internship, Academics, and Contact.
- Project cards load from `GET /api/projects` and retain local fallback data if the API is temporarily unavailable.
- Contact submissions use `POST /api/contact`, validate name/email/message, and persist to MongoDB.
- The API returns a health status from `GET /api/health`.
- Project cards use horizontal touch scrolling on small screens.
- External links open in a new tab with `noreferrer`; email and phone links use the user's installed handlers.

Before publishing, verify the deployed `/api/health`, project links, contact form success/error states, and the layout at mobile, tablet, and desktop widths.

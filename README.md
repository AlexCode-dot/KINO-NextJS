# Deployment (Vercel)

## Live Deployment

The application is live and accessible at:  
[https://kino-next-js.vercel.app](https://kino-next-js.vercel.app)

## This fullstack Next.js application is deployed entirely in the cloud using Vercel, with a database hosted on MongoDB Atlas.

### Stack

- Frontend: Next.js (React-based framework)

- Backend: Next.js API routes

- Database: MongoDB Atlas

- Hosting: Vercel

### Deployment Steps

1. The GitHub repository was connected directly to Vercel.

2. Environment variables (such as MONGODB_URI, OMDB_API_KEY, etc.) were configured in the Vercel dashboard.

3. Vercel automatically installs dependencies, builds the app using npm run build, and deploys it using the default Next.js configuration.

4. MongoDB Atlas is used to persist all data, including users, movies, rooms, screenings, bookings, and reviews.

### Continuous Deployment

Every push to the main branch automatically triggers a new build and deployment through Vercel.

There is also a preview deployment for every PR to main. To get access to the preview deployment you need following:

- Must have a Vercel account

- Must be added as a team member to your Vercel project

- Must be logged in to Vercel when opening the preview link

### Result

The entire app (frontend, backend, and database) is now fully cloud-based and can be used directly through the browser with no local setup required.

---

# Branch Protection Rules for "main"

## Rules in Place

### 1. Pull Requests Required

- All changes to "main" must go through a pull request.
- Direct pushes to "main" are blocked.

### 2. Minimum 1 Approval

- A pull request needs at least 1 approval from another team member before it can be merged.

### 3. Tests Must Pass

- Pull requests will only be mergeable if the "Tests CI" workflow passes.
- Make sure your branch passes "npm test" before requesting a review.

### 4. Force Pushes Blocked

- Force pushing to "main" is disabled to protect commit history.

### 5. Deletions Blocked

- The "main" branch cannot be deleted accidentally.

---

### Tips for Working with These Rules

- Always create a feature branch from "main" before starting work.
- Push your changes and open a pull request when ready.
- Tag someone for review.
- If your PR falls behind "main", you may need to "git merge main" into your branch.

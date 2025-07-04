
# 🎮 KINO-NextJS

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


![CI](https://github.com/AlexCode-dot/KINO-NextJS/actions/workflows/ci.yml/badge.svg)

A fullstack Next.js application for movie enthusiasts – featuring dynamic routing, server-side rendering, MongoDB integration, and a clean, component-based UI. Built with care, discipline, and a love for code and great cinema.

---

## 🚀 Live Demo

👉 (https://kvikkjokk-nextjs.ekedala-services.se/)

---

## 🛠️ Tech Stack

> This project leverages a modern fullstack setup optimized for performance, collaboration, and scalability.

### Frontend

- **Next.js 15.3.1** – Running the latest major version with full App Router support
- **React 19** – With support for concurrent features and `use()`
- **Sass** – With scss modules- Scoped, maintainable styling per component
- **fetch API** – Handles data fetching from backend and external APIs

### Backend

- **Next.js API Routes** – Backend logic under `app/api`
- **MongoDB Atlas** – Cloud-hosted NoSQL database for movies & bookings
- **Mongoose** – ODM for schema modeling (`Movie`, `Screening`, etc.)
- **OMDb API** – External source for movie metadata

### Testing

- **Jest** – Unit testing framework with custom mocks
- **jest.unstable_mockModule** – For mocking ES module imports
- **formdata-node** – Simulates `formData()` in a Node.js test environment

### Tooling & Configuration

- **Turbopack** – Next-gen bundler replacing Webpack for blazing fast dev builds
- **ESM (ECMAScript Modules)** – Clean import/export syntax
- **cross-env** – Environment variable support across platforms
- **Module Aliases (`@`)** – Shortcuts for cleaner imports (`@/lib/...`)

---

## ✨ Modern Highlights

- Built with **Next.js 15+ App Router**
- Using **Turbopack** for ultra-fast local development
- Full support for **React 19** and future-proof features
- Modular architecture using **Server Components** and **Server Actions**
- Supports **Partial Pre-Rendering** for mixed static/dynamic content
- Clean file structure under `/app/`

---

## 🔐 Branch Protection Rules for `main`

### ✅ Enforced Rules

1. **Pull Requests Only**

   - No direct commits to `main`. All changes must go through PRs.

2. **Minimum 1 Approval**

   - A PR must be approved by at least one other team member before merging.

3. **CI Tests Must Pass**

   - PRs are only mergeable if the `Tests CI` workflow passes (`npm test`).

4. **No Force Pushes**

   - Force pushing to `main` is completely disabled.

5. **Deletion Protection**

   - The `main` branch cannot be deleted.

---

## 🔄 Workflow & Collaboration

1. Create a new feature branch off `main`
2. Commit your changes and push to remote
3. Open a pull request (PR)
4. Ensure all tests pass and CI is green
5. Request a review from another developer
6. Merge only when approved

---

## 📅 Project Structure

```bash
├── lib/
│   └── db.js
├── app/
│   ├── about/
│   │   └── page.jsx
│   ├── movies/
│   │   └── [id]/
│   │       └── page.jsx
│   ├── login/
│   │   └── page.jsx
│   ├── admin/
│   │   └── page.jsx
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── NavMenu.jsx
│   └── MovieCard.jsx
├── public/
│   └── images/
├── styles/
│   ├── main.scss
│   └── NavMenu.module.scss
├── .env
├── jest.config.js
├── package.json
└── README.md
```

---

## 👥 Team

| Name      | Role                |
| --------- | ------------------- |
| Alexander | Fullstack Developer |
| Robert    | Fullstack Developer |
| Dennis    | Fullstack Developer |
| Ronja     | Fullstack Developer |
| Patrik    | Fullstack Developer |
| Calle     | Fullstack Developer |
| Jimmy     | Fullstack Developer |

---

## 📌 Setup & Installation

```bash
git clone https://github.com/your-username/kino-nextjs.git
cd kino-nextjs
npm install
npm run dev
```

---

## 🌐 Deployment

This project is deployed using [Vercel](https://vercel.com/). Any push to `main` triggers an automatic deployment.

🔗 Live link: [kino-nextjs.vercel.app](https://kino-nextjs.vercel.app)

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

> This means you're free to use, modify, and distribute the code – even commercially – as long as you include the original copyright notice.

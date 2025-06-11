# VerdeFlow API

VerdeFlow is a commit-aware green coding measurement platform that enables teams to track the energy efficiency, latency, CPU, and memory usage of API endpoints over time and across Git commits.

## ✨ Features

- ✅ Modular Node.js + Express architecture with Prisma ORM
- 🔁 Git-integrated commit and branch tracking
- ⚡ Real-time API measurement via Raspberry Pi agents
- 🔍 Compare performance across commits and branches
- 📊 Branch-level measurement visualization
- 🔐 JWT-based auth with refresh token support
- 📘 Swagger API documentation
- 🧩 Zod-based request validation
- 📦 Winston logging and standardized error responses

## 🧱 Project Structure

```
src/
  modules/           # Feature-based modules (user, project, commit, etc.)
  config/            # DB, Swagger, and global config
  middleware/        # Auth, error handler, validation
  utils/             # JWT, logger, helpers
  app.js             # Express app setup
  server.js          # Server entrypoint
```

## 📁 Prisma Models

- User
- Project (with `baseUrl`, `authToken`)
- Branch
- Commit
- APIRequest (with path, method, payload)
- Measurement (energy, CPU, memory, latency)

## 🔧 Scripts

- `npm run dev` – Start development server with nodemon
- `npx prisma migrate dev` – Run DB migrations
- `npx prisma db seed` – Seed test data

## 🚀 Usage Flow

1. Define a project and its API requests
2. Link GitHub/GitLab webhooks or run agent manually
3. Agent pulls repo, detects commit, runs requests
4. Measurements are sent to API
5. Dashboard shows metrics per request, commit, branch

## 📚 API Docs

Swagger available at:  
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## 🧪 Sample Seed User

```
Email: test@example.com
Password: <hashed>
```

## 📦 Contributing

- Use 4-digit internal codes: `1xxx` for success, `0xxx` for errors
- Use `feature.type.js` naming (e.g., `user.service.js`)
- Always return structured responses for errors and success

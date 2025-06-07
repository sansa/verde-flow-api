# VerdeFlow API

VerdeFlow is a commit-aware green coding measurement tool that helps developers track energy and resource efficiency of API requests across git commits.

## Features

- Modular API architecture using Node.js, Express, Prisma
- Git commit-based measurements
- Developer-friendly with logging, Swagger, and clear module separation
- Real-time metrics from Raspberry Pi agent

## Project Structure

```
src/
  modules/        # All business logic grouped by domain
  config/         # Environment and database config
  middleware/     # Custom Express middleware
  utils/          # Shared utility functions
```

## Scripts

- `npm run dev` – Starts the dev server with nodemon

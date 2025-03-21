# Base Template

A full-stack React application template with TanStack Router, tRPC, Drizzle ORM, and more.

## Features

- ⚛️ React 19
- 🌐 TanStack Router for type-safe routing
- 🔄 TanStack Start for SSR and streaming
- 🔍 TanStack Query for data fetching
- 🧰 tRPC for end-to-end type safety
- 💾 Drizzle ORM with PostgreSQL
- 🎨 Tailwind CSS v4
- 🔐 DIY Authentication with PostgreSQL
- 📋 Form handling with React Hook Form and Zod validation
- 🎭 Shadcn UI components
- 🔄 Environment variable management
- 🧹 Biome for linting and formatting

## Quick Start

1. Clone this repository
2. Install dependencies with `bun install`
3. Copy `.env.example` to `.env` and configure your environment
4. Start PostgreSQL with Docker: `docker-compose up -d`
5. Run database migrations: `bun run db:push`
6. Start the development server: `bun run dev`

## Scripts

- `bun run dev` - Start the development server
- `bun run build` - Build for production
- `bun run start` - Start the production server
- `bun run lint` - Lint code with Biome
- `bun run format` - Format code with Biome
- `bun run db:generate` - Generate migration based on schema changes
- `bun run db:push` - Push schema changes to the database
- `bun run db:studio` - Open Drizzle Studio to manage your database

## Deployment

This template includes a Dockerfile for containerized deployment. Build and deploy with:

```bash
docker build -t your-app-name .
docker run -p 3000:3000 your-app-name
```

You can also deploy to Vercel by connecting your repository and using the default settings.

## Project Structure

```
src/
├── app/              # TanStack Start app configuration and routes
├── components/       # UI components
│   ├── ui/           # Shadcn UI components
│   └── auth/         # Authentication components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
│   ├── trpc/         # tRPC client and server setup
│   └── utils/        # Helper functions
├── server/           # Server-side code
│   ├── api/          # API routes and handlers
│   ├── auth/         # Authentication logic
│   └── db/           # Database schema and setup
└── styles/           # Global styles
```

## License

MIT 
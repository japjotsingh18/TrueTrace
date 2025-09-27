# Use this file to provide workspace-specific custom instructions to Copilot
# For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file

This is a Next.js 14 application with TypeScript, Tailwind CSS, and Prisma for a misinformation detection platform (TrueTrace).

## Project Structure
- `/src/app` - Next.js App Router pages and API routes
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and configurations
- `/src/hooks` - Custom React hooks
- `/prisma` - Database schema and migrations

## Key Technologies
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling with glassmorphism effects
- Prisma with PostgreSQL for database
- NextAuth for authentication
- Framer Motion for animations
- React Hot Toast for notifications

## Design System
- Color palette: Deep navy background with cyan (#06b6d4) and orange (#f97316) accents
- Glassmorphism cards with `glass-card` utility class
- Gradient text with `gradient-text` utility class
- Neon glow effects with `neon-glow` utility class

## API Routes
- `POST /api/analyze` - Start content analysis
- `GET /api/analyze?id=...` - Get analysis results
- `/api/auth/[...nextauth]` - NextAuth authentication

## Components Guidelines
- Use 'use client' directive for client components
- Implement proper TypeScript interfaces
- Use Framer Motion for animations
- Follow the glassmorphism design pattern
- Include proper error handling and loading states

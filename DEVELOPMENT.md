# 🛠️ Development Setup Guide

This guide will help your teammates set up the fake news detection platform for local development.

## 📋 Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 15+ ([Download](https://www.postgresql.org/download/))
- **Redis** 7+ ([Download](https://redis.io/download))
- **Git** ([Download](https://git-scm.com/downloads))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/truetrace.git
cd truetrace
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
# Copy environment variables
cp .env.example .env

# Edit .env with your local settings
code .env
```

### 4. Database Setup

```bash
# Start PostgreSQL and Redis services
# On macOS with Homebrew:
brew services start postgresql
brew services start redis

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed the database (optional)
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (auth)/         # Authentication pages
│   ├── analyze/        # Analysis pages
│   ├── dashboard/      # Dashboard pages
│   ├── reports/        # Reports pages
│   └── api/            # API routes
├── components/         # Reusable components
│   ├── ui/            # Base UI components
│   ├── forms/         # Form components
│   ├── charts/        # Chart components
│   └── home/          # Homepage components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## 🎨 Design System

### Colors
- **Primary**: Cyan (#06b6d4)
- **Secondary**: Orange (#f97316)
- **Background**: Navy (#0f172a)
- **Surface**: Dark blue (#1e293b)

### Utility Classes
- `.glass-card` - Glassmorphism effect
- `.gradient-text` - Gradient text effect
- `.neon-glow` - Neon glow effect

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript checks
npm run format       # Format code with Prettier

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔍 Troubleshooting

### Common Issues

**Database Connection Issues**
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Restart PostgreSQL
brew services restart postgresql
```

**Redis Connection Issues**
```bash
# Check if Redis is running
redis-cli ping

# Start Redis
brew services start redis
```

**Module Resolution Issues**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 👥 Team Collaboration

### Branch Strategy
- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

### Commit Convention
```
feat: add new analysis algorithm
fix: resolve database connection issue
docs: update API documentation
style: improve button hover effects
refactor: optimize data processing
test: add unit tests for auth service
```

### Pull Request Process
1. Create feature branch from `develop`
2. Make changes and commit
3. Push branch and create pull request
4. Request code review
5. Merge after approval

## 🧪 Testing Strategy

### Unit Tests
- Components with Jest and React Testing Library
- Utility functions
- API route handlers

### Integration Tests
- Database operations
- API endpoints
- Authentication flow

### E2E Tests
- Critical user journeys
- Cross-browser testing

## 📊 Monitoring & Analytics

### Development Tools
- **Prisma Studio** - Database GUI
- **React DevTools** - Component debugging
- **Redux DevTools** - State management
- **Lighthouse** - Performance auditing

### Production Monitoring
- **Vercel Analytics** - Performance metrics
- **Sentry** - Error tracking
- **LogRocket** - Session recordings

## 🔒 Security Guidelines

- Never commit `.env` files
- Use environment variables for sensitive data
- Validate all user inputs
- Implement rate limiting
- Use HTTPS in production
- Keep dependencies updated

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 🆘 Getting Help

- Create an issue for bugs
- Use discussions for questions
- Check existing documentation first
- Ask in team Slack/Discord channel

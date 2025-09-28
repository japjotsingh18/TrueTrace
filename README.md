
A sleek, modern AI-powered true trace detection and verification web application built for hackathon judges who want to see the "wow factor" in both functionality and design.
![TrueTrace](https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=400&fit=crop&auto=format)
This guide will help your teammates set up the TrueTrace platform for local development.
DATABASE_URL="postgresql://username:password@localhost:5432/truetrace_db"
git clone https://github.com/your-username/truetrace.git
cd truetrace
# FakeNews Detector 🛡️

A sleek, modern AI-powered misinformation detection and verification web application built for hackathon judges who want to see the "wow factor" in both functionality and design.

![TrueTrace](https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=400&fit=crop&auto=format)

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Analysis**: Advanced agentic AI system for comprehensive fact-checking
- **Multi-Input Support**: URLs, text input, and file uploads (PDF, TXT, HTML)
- **Real-Time Agent Workflow**: Visual representation of AI analysis steps
- **Credibility Scoring**: Comprehensive scoring based on multiple factors
- **Source Verification**: Cross-references 50+ trusted news sources
- **Detailed Reports**: Complete analysis with evidence and citations

### 🎨 Modern UI/UX
- **Futuristic Design**: Glassmorphism effects with neon accents
- **Responsive Layout**: Works seamlessly across all devices
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Dark Theme**: Easy on the eyes with navy/cyan/orange palette
- **Accessibility**: WCAG 2.1 AA compliant

### 🔐 Authentication & Security
- **NextAuth Integration**: Google OAuth and email/password
- **Role-Based Access**: User and admin roles
- **Rate Limiting**: Abuse prevention and API protection
- **Secure File Handling**: Type validation and size limits

## 🚀 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hot Toast** for notifications
- **Lucide React** for icons

### Backend
- **Next.js API Routes** for serverless functions
- **Prisma** with PostgreSQL for database
- **NextAuth** for authentication
- **Zod** for validation
- **Redis** for caching and job queues

### Development
- **ESLint** for code quality
- **TypeScript** for type checking
- **Prisma Studio** for database management

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes    │    │   Database      │
│                 │    │                 │    │                 │
│ • React/Next.js │◄──►│ • Analysis API  │◄──►│ • PostgreSQL    │
│ • Tailwind CSS  │    │ • Auth API      │    │ • Prisma ORM    │
│ • Framer Motion │    │ • File Upload   │    │ • Redis Cache   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └─────────── Agentic AI Pipeline ───────────────┘
                            │
              ┌─────────────────────────────┐
              │   Content Analysis Flow     │
              │                             │
              │ 1. Content Extraction       │
              │ 2. Source Discovery         │
              │ 3. Cross-Reference Check    │
              │ 4. Credibility Scoring      │
              │ 5. Verdict Generation       │
              └─────────────────────────────┘
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Redis server (optional, for caching)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/TrueTrace.git
cd TrueTrace
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local` and update the values:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fake_news_db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Redis
REDIS_URL="redis://localhost:6379"

# API Keys
OPENAI_API_KEY="your-openai-api-key"
NEWS_API_KEY="your-news-api-key"
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Database Schema

```sql
-- Core tables for misinformation detection
User (id, name, email, role, createdAt)
Analysis (id, userId, inputType, verdict, confidence, createdAt)
AnalysisStep (id, analysisId, step, status, details, duration)
Source (id, analysisId, url, publisher, credibilityScore)
Report (id, analysisId, userId, reason, status)
```

## 🔌 API Endpoints

### Analysis
- `POST /api/analyze` - Start content analysis
- `GET /api/analyze?id={analysisId}` - Get analysis results
- `GET /api/analyze/{id}/sources` - Get verified sources

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `GET /api/auth/session` - Get current session

### Reports
- `GET /api/reports` - Get user's saved analyses
- `POST /api/reports` - Report suspicious content
- `GET /api/admin/reports` - Admin: View all reports

## 🎨 Design System

### Colors
```css
/* Primary Colors */
--primary-500: #06b6d4  /* Cyan */
--accent-500: #f97316   /* Orange */
--navy-900: #0f172a     /* Dark Navy */

/* Utility Classes */
.glass-card        /* Glassmorphism effect */
.gradient-text     /* Gradient text effect */
.neon-glow        /* Neon glow animation */
```

### Components
- **Glass Cards**: Translucent cards with backdrop blur
- **Gradient Buttons**: Primary and secondary action buttons
- **Agent Workflow**: Real-time analysis step visualization
- **Verdict Badges**: Color-coded truth indicators

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Docker
```bash
# Build image
docker build -t truetrace .

# Run container
docker run -p 3000:3000 truetrace
```

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXTAUTH_SECRET` | NextAuth secret key | ✅ |
| `NEXTAUTH_URL` | Application URL | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ❌ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | ❌ |
| `REDIS_URL` | Redis connection string | ❌ |
| `OPENAI_API_KEY` | OpenAI API key | ❌ |
| `NEWS_API_KEY` | News API key | ❌ |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Important**: This AI system is designed to assist in identifying potentially false information, but it is not infallible. All AI outputs should be verified with trusted sources before making important decisions. The system is intended as a tool to aid critical thinking, not replace human judgment.

## 🎯 Hackathon Highlights

### For Judges: Why This Project Stands Out

1. **Visual Impact**: Stunning glassmorphism UI with smooth animations
2. **Technical Excellence**: Full-stack TypeScript with modern best practices
3. **Real-World Application**: Addresses the critical issue of misinformation
4. **Scalable Architecture**: Production-ready with proper authentication and admin features
5. **User Experience**: Intuitive interface with real-time feedback
6. **Innovation**: Agentic AI workflow visualization is unique and engaging

### Demo Flow
1. **Landing Page**: Eye-catching hero with stats and features
2. **Analysis Input**: Multi-modal input options (URL/Text/File)
3. **Real-Time Processing**: Watch AI agents work step-by-step
4. **Results Display**: Beautiful verdict cards with confidence scores
5. **Source Verification**: Detailed source analysis and credibility scores
6. **Report Generation**: Comprehensive PDF reports with evidence

---

Built with ❤️ for hackathon judges who appreciate both form and function.

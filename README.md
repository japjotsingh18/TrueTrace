# TrueTrace 🔍

An AI-powered misinformation detection platform that helps users verify the credibility of online content in seconds.

## 🚀 Features

### Core Functionality
- **AI-Powered Content Analysis** - Advanced algorithms to detect misinformation patterns
- **Real-time Fact Checking** - Instant verification of articles, claims, and content
- **Credibility Scoring** - Comprehensive scoring system for content reliability
- **Source Verification** - Cross-reference with trusted databases and fact-checking APIs
- **URL Analysis** - Direct analysis of web articles and social media posts

### User Experience
- **Glassmorphism UI** - Modern, elegant interface with glass-card effects
- **Dark Theme** - Professional dark mode with cyan and orange accents
- **Responsive Design** - Optimized for desktop and mobile devices
- **Animated Star Background** - Subtle, engaging visual effects
- **Enhanced Navigation** - Smooth hover effects and interactive elements

### Analysis Features
- **Multi-source Verification** - Integration with Google Fact Check API
- **Content Classification** - Categorizes content as True, False, Mixed, or Unverified
- **Confidence Ratings** - Percentage-based confidence scores
- **Detailed Reports** - Comprehensive analysis with supporting evidence
- **Historical Tracking** - Save and review past analyses

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - App Router with server-side rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom glassmorphism effects
- **Framer Motion** - Smooth animations and transitions
- **React Hot Toast** - Beautiful notification system

### Backend & APIs
- **Next.js API Routes** - Serverless backend functions
- **Google Fact Check API** - Fact-checking database integration
- **Gemini AI** - Advanced content analysis
- **Custom Analysis Engine** - Multi-layered verification system

### Database & Authentication
- **Prisma ORM** - Type-safe database operations
- **PostgreSQL** - Robust relational database
- **NextAuth.js** - Secure authentication system

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/japjotsingh18/TrueTrace.git
cd TrueTrace
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Configure your API keys** (see API Integration section below)

5. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

6. **Run the development server**
```bash
npm run dev
```

7. **Open your browser**
Navigate to `http://localhost:3000`

## 🔑 API Integration Guide

### Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/truetrace"

# Google APIs
GOOGLE_FACT_CHECK_API_KEY="your_google_fact_check_api_key"
GOOGLE_SEARCH_API_KEY="your_google_custom_search_api_key"
GOOGLE_SEARCH_ENGINE_ID="your_custom_search_engine_id"

# Gemini AI
GEMINI_API_KEY="your_gemini_api_key"

# NextAuth
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Additional fact-checking APIs
FACTCHECK_ORG_API_KEY="your_factcheck_org_api_key"
SNOPES_API_KEY="your_snopes_api_key"
```

### 1. Google Fact Check API Setup

1. **Get API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the "Fact Check Tools API"
   - Create credentials and get your API key

2. **Integration**:
```typescript
// src/lib/fact-check.ts
export async function checkWithGoogle(query: string) {
  const response = await fetch(
    `https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${process.env.GOOGLE_FACT_CHECK_API_KEY}&query=${encodeURIComponent(query)}`
  );
  return response.json();
}
```

### 2. Google Custom Search API Setup

1. **Create Custom Search Engine**:
   - Go to [Google Custom Search](https://cse.google.com/cse/)
   - Create a new search engine
   - Configure to search fact-checking websites
   - Get your Search Engine ID

2. **Get Search API Key**:
   - In Google Cloud Console, enable "Custom Search API"
   - Use the same API key or create a new one

3. **Integration**:
```typescript
// src/lib/google-search.ts
export async function searchFactChecks(query: string) {
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
  );
  return response.json();
}
```

### 3. Gemini AI Setup

1. **Get API Key**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your environment variables

2. **Integration**:
```typescript
// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeContent(content: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const prompt = `Analyze this content for misinformation: ${content}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
```

### 4. Database Setup (PostgreSQL)

1. **Install PostgreSQL** or use a cloud service like:
   - [Neon](https://neon.tech/)
   - [Supabase](https://supabase.com/)
   - [PlanetScale](https://planetscale.com/)

2. **Update DATABASE_URL** in your `.env.local`

3. **Run migrations**:
```bash
npx prisma generate
npx prisma db push
```

### 5. Adding Custom Fact-Checking APIs

You can integrate additional APIs by following this pattern:

```typescript
// src/lib/custom-fact-checker.ts
interface FactCheckResult {
  verdict: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED';
  confidence: number;
  sources: string[];
}

export async function checkWithCustomAPI(content: string): Promise<FactCheckResult> {
  try {
    const response = await fetch('https://your-api-endpoint.com/fact-check', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.YOUR_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    
    const data = await response.json();
    
    return {
      verdict: data.verdict,
      confidence: data.confidence,
      sources: data.sources,
    };
  } catch (error) {
    console.error('Custom API error:', error);
    return {
      verdict: 'UNVERIFIED',
      confidence: 0,
      sources: [],
    };
  }
}
```

### 6. Integrating Your API into the Analysis Pipeline

Update the main analysis endpoint to include your custom API:

```typescript
// src/app/api/analyze/route.ts
import { checkWithGoogle } from '@/lib/fact-check';
import { checkWithCustomAPI } from '@/lib/custom-fact-checker';
import { analyzeContent } from '@/lib/gemini';

export async function POST(request: Request) {
  const { content } = await request.json();
  
  // Run multiple fact-checking services
  const [googleResult, customResult, aiAnalysis] = await Promise.all([
    checkWithGoogle(content),
    checkWithCustomAPI(content),
    analyzeContent(content),
  ]);
  
  // Combine results and calculate final verdict
  const finalVerdict = combineResults([googleResult, customResult, aiAnalysis]);
  
  return Response.json(finalVerdict);
}
```

## 🔧 API Endpoints

### Analysis API
```typescript
POST /api/analyze
Body: { content: string, url?: string }
Response: {
  verdict: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED',
  confidence: number,
  sources: string[],
  analysis: string
}

GET /api/analyze?id={analysisId}
Response: Analysis results from database
```

### Authentication
```typescript
/api/auth/[...nextauth]
- NextAuth.js authentication endpoints
- Supports multiple providers
```

## 🌟 Key Features Implemented

### Analysis Engine
- Multi-source fact-checking integration
- AI-powered content analysis with Gemini
- Real-time credibility scoring
- Source verification and cross-referencing

### User Interface
- Modern glassmorphism design
- Animated star background
- Enhanced dropdown menus with color-coded options
- Interactive navigation with hover effects
- Responsive mobile-first design

### Content Management
- Save and organize analysis reports
- Filter reports by verdict type
- Sort by date and confidence scores
- Export analysis results

## 🎨 Design System

### Color Palette
- **Background**: Deep navy (`#0a0a0a`)
- **Primary Accent**: Cyan (`#06b6d4`)
- **Secondary Accent**: Orange (`#f97316`)
- **Glass Cards**: Semi-transparent with backdrop blur

### Custom CSS Classes
- `.glass-card` - Glassmorphism card styling
- `.gradient-text` - Cyan to orange text gradients
- `.neon-glow` - Glowing border effects
- `.star-background` - Animated starfield background

## 📱 Responsive Design

- **Desktop**: Full-featured interface with sidebar navigation
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Streamlined experience with bottom navigation

## 🔒 Security Features

- Server-side content analysis
- Secure API key management
- Input sanitization and validation
- Rate limiting on analysis endpoints

## 📊 Analytics & Reporting

- Detailed analysis breakdowns
- Confidence score visualization
- Source attribution and linking
- Historical analysis tracking

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t truetrace .
docker run -p 3000:3000 truetrace
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**TrueTrace** - Empowering users to navigate the information landscape with confidence through AI-powered fact-checking technology.

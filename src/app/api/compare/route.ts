import { NextRequest, NextResponse } from 'next/server';
import { fetchWebpageContent } from '@/lib/fetch_webpage';
import { geminiFactChecker } from '@/lib/gemini';

// Helper to compare facts/claims between sources
function compareAnalyses(analyses: any[]) {
  // This is a placeholder. In production, use NLP to compare claims/facts.
  // For now, just return all analyses side by side.
  return {
    sources: analyses.map((a, i) => ({
      index: i,
      url: a.url,
      facts: a.facts || a.analysis || a.content || '',
      confidence: a.confidence || null,
    })),
    // Optionally, add logic to highlight similarities/differences
  };
}

export async function POST(req: NextRequest) {
  try {
    const { urls } = await req.json();
    if (!Array.isArray(urls) || urls.length < 2) {
      return NextResponse.json({ error: 'At least two URLs are required.' }, { status: 400 });
    }

    // Fetch and analyze each URL

    const analyses = await Promise.all(
      urls.map(async (url: string) => {
        const content = await fetchWebpageContent(url);
        const analysis = await geminiFactChecker.analyzeContent({
          content,
          contentType: 'url',
          url
        });
        return { url, ...analysis };
      })
    );

    // Compare analyses
    const comparison = compareAnalyses(analyses);
    return NextResponse.json(comparison);
  } catch (error) {
  const errorMessage = (error instanceof Error && error.message) ? error.message : 'Internal error';
  return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

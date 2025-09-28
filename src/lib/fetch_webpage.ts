import { load } from 'cheerio';
import axios from 'axios';

/**
 * Fetches and extracts the main text content from a webpage URL.
 * Returns plain text suitable for analysis.
 */
export async function fetchWebpageContent(url: string): Promise<string> {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TrueTraceBot/1.0)'
      },
      timeout: 10000
    });
  const $ = load(data);
    // Remove script, style, nav, footer, and noscript tags
    $('script, style, nav, footer, noscript, header, aside, form, svg').remove();
    // Get main text from <main> or <article> if present, else body
    let text = $('main').text() || $('article').text() || $('body').text();
    // Clean up whitespace
    text = text.replace(/\s+/g, ' ').trim();
    // Limit to 10,000 characters for analysis
    return text.slice(0, 10000);
  } catch (error) {
    console.error('Failed to fetch webpage content:', error);
    throw new Error('Unable to fetch or parse webpage content.');
  }
}

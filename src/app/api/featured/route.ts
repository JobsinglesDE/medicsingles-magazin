import { NextResponse } from 'next/server';
import { reader } from '@/lib/keystatic';
import { getArticleUrl } from '@/lib/routes';

export const dynamic = 'force-dynamic';

export async function GET() {
  const allArticles = await reader.collections.articles.all();

  const featuredArticles = allArticles
    .filter((a) => a.entry.isFeatured && a.entry.status === 'published')
    .map((a) => ({
      title: a.entry.title,
      excerpt: a.entry.excerpt || '',
      url: `https://medicsingles.de/magazin${getArticleUrl(a.slug, a.entry.specialization, a.entry.section)}`,
      image: a.entry.featuredImage
        ? `https://medicsingles.de/magazin${a.entry.featuredImage}`
        : '',
      category: a.entry.category,
    }));

  return NextResponse.json({ articles: featuredArticles, stories: [] });
}

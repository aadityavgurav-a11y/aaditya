import { MetadataRoute } from 'next';
import { PORTFOLIO_CONTENT } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = 'https://yoursite.com'; // {/* SEO: Update with production URL */}
  
  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...PORTFOLIO_CONTENT.projects.map((project) => ({
      url: `${url}${project.link}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  ];
}

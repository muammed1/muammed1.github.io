import { getCollection, getEntry } from 'astro:content';
import type { APIRoute } from 'astro';

const staticRoutes = ['/', '/projects/', '/resume/'];

const escapeXml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const prerender = true;

export const GET: APIRoute = async () => {
  const [siteEntry, projects] = await Promise.all([
    getEntry('site', 'site'),
    getCollection('projects'),
  ]);

  if (!siteEntry) {
    throw new Error('Missing required site content entry "site".');
  }

  const projectRoutes = projects
    .filter((project) => project.data.published)
    .sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id))
    .map((project) => `/projects/${encodeURIComponent(project.id)}/`);

  const urls = [...staticRoutes, ...projectRoutes]
    .map((route) => {
      const absoluteUrl = new URL(route, siteEntry.data.siteUrl).href;
      return `  <url><loc>${escapeXml(absoluteUrl)}</loc></url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

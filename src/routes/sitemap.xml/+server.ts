import type { RequestHandler } from './$types';

const BASE_URL = 'https://markgrenville.com';

const pages = [
	{ path: '', priority: '1.0', changefreq: 'monthly' },
	{ path: '/cli', priority: '0.7', changefreq: 'monthly' },
	{ path: '/swagger', priority: '0.7', changefreq: 'monthly' },
	{ path: '/json', priority: '0.7', changefreq: 'monthly' },
	{ path: '/document', priority: '0.7', changefreq: 'monthly' },
	{ path: '/card', priority: '0.7', changefreq: 'monthly' },
	{ path: '/game', priority: '0.5', changefreq: 'monthly' },
	{ path: '/chat', priority: '0.5', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.8', changefreq: 'monthly' }
];

export const GET: RequestHandler = () => {
	const today = new Date().toISOString().split('T')[0];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(p) => `  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};

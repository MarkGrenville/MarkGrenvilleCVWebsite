import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const body = `User-agent: *
Allow: /

Sitemap: https://markgrenville.com/sitemap.xml`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};

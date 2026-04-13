import { json } from '@sveltejs/kit';
import { cvData } from '$lib/data/cv';

export function GET() {
	console.log('[API] GET /api/cv/clients');
	return json(cvData.clients);
}

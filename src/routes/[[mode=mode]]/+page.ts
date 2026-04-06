import type { PageLoad } from './$types';
import type { ViewMode } from '$lib/types/cv';

export const load: PageLoad = ({ params }) => {
	const mode: ViewMode = (params.mode as ViewMode) || 'gui';
	return { mode };
};

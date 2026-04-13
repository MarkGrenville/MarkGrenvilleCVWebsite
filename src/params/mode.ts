import type { ParamMatcher } from '@sveltejs/kit';

const validModes = ['cli', 'swagger', 'json', 'document', 'card', 'game', 'chat'];

export const match: ParamMatcher = (param) => {
	return validModes.includes(param);
};

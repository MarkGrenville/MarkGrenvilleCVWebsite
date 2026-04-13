import { onRequest } from 'firebase-functions/v2/https';

process.env.PROTOCOL_HEADER = 'x-forwarded-proto';
process.env.HOST_HEADER = 'x-forwarded-host';

const { handler } = await import('./build/handler.js');

export const ssr = onRequest(
	{
		secrets: ['ANTHROPIC_API_KEY'],
		memory: '512MiB',
		timeoutSeconds: 60
	},
	handler
);

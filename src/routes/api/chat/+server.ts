import { SYSTEM_PROMPT } from '$lib/data/systemPrompt';
import Anthropic from '@anthropic-ai/sdk';
import { env } from '$env/dynamic/private';

export async function POST({ request }) {
	const apiKey = env.ANTHROPIC_API_KEY;
	if (!apiKey) {
		console.log('[API] POST /api/chat — no ANTHROPIC_API_KEY configured');
		return new Response(
			JSON.stringify({ error: 'Chat is not available. The API key has not been configured.' }),
			{ status: 503, headers: { 'Content-Type': 'application/json' } }
		);
	}

	let body: { messages: Array<{ role: string; content: string }> };
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid request body' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
		return new Response(JSON.stringify({ error: 'Messages array is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	console.log(`[API] POST /api/chat — ${body.messages.length} messages in conversation`);

	const client = new Anthropic({ apiKey });

	try {
		const response = await client.messages.create({
			model: 'claude-sonnet-4-20250514',
			max_tokens: 1024,
			temperature: 0.7,
			system: SYSTEM_PROMPT,
			stream: true,
			messages: body.messages.map((m) => ({
				role: m.role as 'user' | 'assistant',
				content: m.content
			}))
		});

		const encoder = new TextEncoder();
		const readable = new ReadableStream({
			async start(controller) {
				try {
					for await (const event of response) {
						if (
							event.type === 'content_block_delta' &&
							event.delta.type === 'text_delta'
						) {
							controller.enqueue(encoder.encode(event.delta.text));
						}
					}
					console.log('[API] Stream complete');
					controller.close();
				} catch (err) {
					console.error('[API] Stream error:', err);
					controller.error(err);
				}
			}
		});

		return new Response(readable, {
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'no-cache'
			}
		});
	} catch (err) {
		console.error('[API] Anthropic API error:', err);
		const message = err instanceof Error ? err.message : 'Unknown error';
		return new Response(
			JSON.stringify({ error: `Failed to get a response: ${message}` }),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
}

<script lang="ts">
	import { onMount, tick } from 'svelte';

	interface ChatMessage {
		role: 'user' | 'assistant';
		content: string;
		timestamp: string;
	}

	let messages = $state<ChatMessage[]>([]);
	let inputText = $state('');
	let isStreaming = $state(false);
	let chatAreaEl: HTMLDivElement;
	let inputEl: HTMLTextAreaElement;
	let error = $state('');

	function getTimestamp(): string {
		const now = new Date();
		return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
	}

	async function scrollToBottom() {
		await tick();
		if (chatAreaEl) {
			chatAreaEl.scrollTop = chatAreaEl.scrollHeight;
		}
	}

	async function sendMessage() {
		const text = inputText.trim();
		if (!text || isStreaming) return;

		error = '';
		inputText = '';

		messages.push({
			role: 'user',
			content: text,
			timestamp: getTimestamp()
		});
		messages = messages;
		await scrollToBottom();

		isStreaming = true;

		messages.push({
			role: 'assistant',
			content: '',
			timestamp: getTimestamp()
		});
		messages = messages;
		const assistantIdx = messages.length - 1;
		await scrollToBottom();

		try {
			const apiMessages = messages
				.slice(1, assistantIdx)
				.filter((m) => m.content)
				.map((m) => ({ role: m.role, content: m.content }));

			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: apiMessages })
			});

			if (!res.ok) {
				const errData = await res.json().catch(() => ({ error: 'Request failed' }));
				throw new Error(errData.error || `HTTP ${res.status}`);
			}

			const reader = res.body?.getReader();
			if (!reader) throw new Error('No response body');

			const decoder = new TextDecoder();
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				messages[assistantIdx] = {
					...messages[assistantIdx],
					content: messages[assistantIdx].content + chunk,
					timestamp: getTimestamp()
				};
				await scrollToBottom();
			}
		} catch (err) {
			console.error('[Chat] Error:', err);
			error = err instanceof Error ? err.message : 'Something went wrong';
			messages = messages.filter((_, i) => i !== assistantIdx);
		} finally {
			isStreaming = false;
			inputEl?.focus();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}

	onMount(() => {
		messages = [
			{
				role: 'assistant',
				content:
					"Hey there! I'm Mark. Thanks for checking out my CV. Feel free to ask me anything — about my experience, the projects I've worked on, why I'm looking to move into AI, how I work with teams, or anything else you're curious about. I'm an open book.",
				timestamp: getTimestamp()
			}
		];
		inputEl?.focus();
	});
</script>

<div class="flex min-h-screen flex-col bg-[#0b141a]">
	<!-- Chat header -->
	<div class="flex items-center gap-3 border-b border-[#222d35] bg-[#1f2c34] px-5 py-3">
		<div class="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-base">
			MG
		</div>
		<div class="flex-1">
			<div class="text-sm font-semibold text-[#e9edef]">Mark Grenville</div>
			<div class="text-[11px] text-[#8696a0]">
				{#if isStreaming}
					typing...
				{:else}
					Ask me anything about my experience
				{/if}
			</div>
		</div>
		<button
			onclick={() => { messages = [messages[0]]; error = ''; }}
			class="rounded-lg px-3 py-1.5 font-mono text-[10px] tracking-wider text-[#8696a0] uppercase transition-colors hover:bg-[#2a3942] hover:text-[#e9edef]"
		>
			New Chat
		</button>
	</div>

	<!-- Chat messages area -->
	<div
		bind:this={chatAreaEl}
		class="flex-1 overflow-y-auto px-4 py-4 md:px-12 lg:px-20"
		style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-20 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"
	>
		<div class="mx-auto max-w-2xl">
			{#each messages as msg, i}
				<div class="mb-2 flex {msg.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div
						class="relative max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed md:max-w-[75%]
							{msg.role === 'user'
								? 'bg-[#005c4b] text-[#e9edef]'
								: 'bg-[#1f2c34] text-[#e9edef]'}"
					>
						<!-- Bubble tail -->
						{#if msg.role === 'user'}
							<div class="absolute -right-1.5 top-0 h-0 w-0 border-l-[6px] border-t-[6px] border-l-transparent border-t-[#005c4b]"></div>
						{:else}
							{#if i === 0 || messages[i - 1]?.role !== 'assistant'}
								<div class="absolute -left-1.5 top-0 h-0 w-0 border-r-[6px] border-t-[6px] border-r-transparent border-t-[#1f2c34]"></div>
							{/if}
						{/if}

						<!-- Name label for assistant -->
						{#if msg.role === 'assistant' && (i === 0 || messages[i - 1]?.role !== 'assistant')}
							<div class="mb-1 text-xs font-semibold text-accent">Mark</div>
						{/if}

						<div class="whitespace-pre-wrap">{msg.content}{#if isStreaming && i === messages.length - 1 && msg.role === 'assistant'}<span class="cursor-blink ml-0.5 text-accent">▌</span>{/if}</div>

						<div class="mt-1 text-right text-[10px] text-[#ffffff4d]">
							{msg.timestamp}
						</div>
					</div>
				</div>
			{/each}

			<!-- Typing indicator -->
			{#if isStreaming && messages[messages.length - 1]?.content === ''}
				<div class="mb-2 flex justify-start">
					<div class="rounded-lg bg-[#1f2c34] px-4 py-3">
						<div class="flex gap-1">
							<div class="h-2 w-2 animate-bounce rounded-full bg-[#8696a0]" style="animation-delay: 0ms;"></div>
							<div class="h-2 w-2 animate-bounce rounded-full bg-[#8696a0]" style="animation-delay: 150ms;"></div>
							<div class="h-2 w-2 animate-bounce rounded-full bg-[#8696a0]" style="animation-delay: 300ms;"></div>
						</div>
					</div>
				</div>
			{/if}

			<!-- Error message -->
			{#if error}
				<div class="mb-2 flex justify-center">
					<div class="rounded-lg bg-[#3b1c1c] px-4 py-2 text-xs text-[#ff6b6b]">
						{error}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Input area -->
	<div class="border-t border-[#222d35] bg-[#1f2c34] px-4 py-3">
		<div class="mx-auto flex max-w-2xl items-end gap-2">
			<textarea
				bind:this={inputEl}
				bind:value={inputText}
				onkeydown={handleKeyDown}
				placeholder="Type a message..."
				rows="1"
				class="flex-1 resize-none rounded-lg bg-[#2a3942] px-4 py-2.5 text-sm text-[#e9edef] placeholder-[#8696a0] outline-none transition-colors focus:bg-[#33444d]"
				disabled={isStreaming}
			></textarea>
			<button
				onclick={sendMessage}
				disabled={isStreaming || !inputText.trim()}
				aria-label="Send message"
				class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent text-base transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
			>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
					<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
				</svg>
			</button>
		</div>
	</div>
</div>

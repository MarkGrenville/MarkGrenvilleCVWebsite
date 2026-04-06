<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { cvData } from '$lib/data/cv';

	interface TerminalLine {
		type: 'input' | 'output' | 'error' | 'heading' | 'accent';
		text: string;
	}

	let lines = $state<TerminalLine[]>([]);
	let currentInput = $state('');
	let inputEl: HTMLInputElement;
	let terminalEl: HTMLDivElement;
	let isTyping = $state(false);
	let suggestion = $state('');

	const COMMAND_LIST = ['help', 'whoami', 'experience', 'skills', 'projects', 'clients', 'cat cover-letter.txt', 'clear'];

	const COMMANDS: Record<string, () => TerminalLine[]> = {
		help: () => [
			{ type: 'heading', text: 'Available commands:' },
			{ type: 'output', text: '  whoami            Who is Mark Grenville?' },
			{ type: 'output', text: '  experience        Work history' },
			{ type: 'output', text: '  skills            Technical skills' },
			{ type: 'output', text: '  projects          Selected projects' },
			{ type: 'output', text: '  clients           Client list' },
			{ type: 'output', text: '  cat cover-letter  Read the cover letter' },
			{ type: 'output', text: '  clear             Clear terminal' },
			{ type: 'output', text: '  help              Show this message' }
		],

		whoami: () => [
			{ type: 'heading', text: `${cvData.personal.name}` },
			{ type: 'accent', text: cvData.personal.title },
			{ type: 'output', text: '' },
			{ type: 'output', text: `Location:  ${cvData.personal.location}` },
			{ type: 'output', text: `Email:     ${cvData.personal.email}` },
			{ type: 'output', text: `GitHub:    github.com/MarkGrenville` },
			{ type: 'output', text: '' },
			{ type: 'output', text: cvData.personal.summary }
		],

		experience: () => {
			const result: TerminalLine[] = [
				{ type: 'heading', text: 'Work Experience' },
				{ type: 'output', text: '' }
			];
			for (const entry of cvData.experience) {
				result.push({ type: 'accent', text: `${entry.role} @ ${entry.company}` });
				result.push({ type: 'output', text: `Period: ${entry.period}` });
				result.push({ type: 'output', text: entry.description });
				result.push({ type: 'output', text: '' });
				for (const h of entry.highlights) {
					result.push({ type: 'output', text: `  • ${h}` });
				}
				result.push({ type: 'output', text: '' });
			}
			return result;
		},

		skills: () => {
			const result: TerminalLine[] = [
				{ type: 'heading', text: 'Technical Skills' },
				{ type: 'output', text: '' }
			];
			for (const cat of cvData.skills) {
				result.push({ type: 'accent', text: `[${cat.category}]` });
				result.push({ type: 'output', text: cat.items.join(' · ') });
				result.push({ type: 'output', text: '' });
			}
			return result;
		},

		projects: () => {
			const result: TerminalLine[] = [
				{ type: 'heading', text: 'Selected Projects' },
				{ type: 'output', text: '' }
			];
			for (const proj of cvData.projects) {
				result.push({ type: 'accent', text: proj.name + (proj.client ? ` (${proj.client})` : '') });
				result.push({ type: 'output', text: proj.description });
				result.push({ type: 'output', text: `Tech: ${proj.tech.join(', ')}` });
				result.push({ type: 'output', text: '' });
			}
			return result;
		},

		clients: () => {
			const result: TerminalLine[] = [
				{ type: 'heading', text: 'Clients' },
				{ type: 'output', text: '' }
			];
			for (const client of cvData.clients) {
				result.push({
					type: 'output',
					text: `  ${client.name.padEnd(30)} ${client.industry}`
				});
			}
			return result;
		},

		'cat cover-letter': () => {
			const paragraphs = cvData.coverLetter.split('\n\n');
			const result: TerminalLine[] = [
				{ type: 'heading', text: '--- cover-letter.txt ---' },
				{ type: 'output', text: '' }
			];
			for (const p of paragraphs) {
				result.push({ type: 'output', text: p.trim() });
				result.push({ type: 'output', text: '' });
			}
			return result;
		}
	};

	COMMANDS['cat cover-letter.txt'] = COMMANDS['cat cover-letter'];

	function getAutoSuggestion(input: string): string {
		if (!input) return '';
		const lower = input.toLowerCase();
		const match = COMMAND_LIST.find((cmd) => cmd.startsWith(lower) && cmd !== lower);
		return match ? match.slice(input.length) : '';
	}

	function updateSuggestion() {
		suggestion = getAutoSuggestion(currentInput);
	}

	function getTabCompletion(input: string): string | null {
		if (!input) return null;
		const lower = input.toLowerCase();
		const matches = COMMAND_LIST.filter((cmd) => cmd.startsWith(lower));
		if (matches.length === 1) return matches[0];
		if (matches.length > 1) {
			let common = matches[0];
			for (const m of matches.slice(1)) {
				let i = 0;
				while (i < common.length && i < m.length && common[i] === m[i]) i++;
				common = common.slice(0, i);
			}
			if (common.length > input.length) return common;
		}
		return null;
	}

	async function handleCommand(cmd: string) {
		const trimmed = cmd.trim().toLowerCase();
		lines.push({ type: 'input', text: `$ ${cmd}` });

		if (trimmed === 'clear') {
			lines = [];
			await tick();
			inputEl?.focus();
			return;
		}

		const handler = COMMANDS[trimmed];
		if (handler) {
			isTyping = true;
			const output = handler();
			for (const line of output) {
				lines.push(line);
				lines = lines;
				await tick();
				scrollToBottom();
				await sleep(20);
			}
			isTyping = false;
		} else if (trimmed === '') {
			// do nothing
		} else {
			lines.push({ type: 'error', text: `command not found: ${trimmed}. Type 'help' for available commands.` });
		}

		lines = lines;
		await tick();
		scrollToBottom();
		inputEl?.focus();
	}

	function sleep(ms: number) {
		return new Promise((r) => setTimeout(r, ms));
	}

	function scrollToBottom() {
		if (terminalEl) {
			terminalEl.scrollTop = terminalEl.scrollHeight;
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !isTyping) {
			e.preventDefault();
			const cmd = currentInput;
			currentInput = '';
			suggestion = '';
			handleCommand(cmd);
		} else if (e.key === 'Tab') {
			e.preventDefault();
			if (suggestion) {
				currentInput = currentInput + suggestion;
				suggestion = '';
			} else {
				const completion = getTabCompletion(currentInput);
				if (completion) {
					currentInput = completion;
					suggestion = '';
				}
			}
		} else if (e.key === 'ArrowRight' && suggestion) {
			e.preventDefault();
			currentInput = currentInput + suggestion;
			suggestion = '';
		}
	}

	function handleInput() {
		updateSuggestion();
	}

	function focusInput() {
		inputEl?.focus();
	}

	onMount(async () => {
		lines = [
			{ type: 'heading', text: '╔══════════════════════════════════════════╗' },
			{ type: 'heading', text: '║     MARK GRENVILLE — CV Terminal         ║' },
			{ type: 'heading', text: '╚══════════════════════════════════════════╝' },
			{ type: 'output', text: '' },
			{ type: 'accent', text: "Type 'help' for available commands. Tab to autocomplete." },
			{ type: 'output', text: '' }
		];
		await tick();
		focusInput();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions a11y_no_noninteractive_element_interactions -->
<div
	class="flex min-h-screen flex-col bg-[#0a0a0a] p-4 md:p-8"
	role="application"
	onclick={focusInput}
>
	<!-- Terminal window chrome -->
	<div class="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-border/60 shadow-2xl">
		<!-- Title bar -->
		<div class="flex items-center gap-2 border-b border-border/40 bg-surface/80 px-4 py-3">
			<div class="flex gap-1.5">
				<div class="h-3 w-3 rounded-full bg-[#ff5f57]"></div>
				<div class="h-3 w-3 rounded-full bg-[#febc2e]"></div>
				<div class="h-3 w-3 rounded-full bg-[#28c840]"></div>
			</div>
			<div class="ml-4 font-mono text-[11px] text-text-muted">mark@cv ~ %</div>
		</div>

		<!-- Terminal body -->
		<div
			bind:this={terminalEl}
			class="h-[calc(100vh-12rem)] overflow-y-auto bg-[#0c0c0c] p-6 font-mono text-sm leading-relaxed"
		>
			{#each lines as line}
				{#if line.type === 'input'}
					<div class="text-text-secondary">{line.text}</div>
				{:else if line.type === 'heading'}
					<div class="font-bold text-accent">{line.text}</div>
				{:else if line.type === 'accent'}
					<div class="text-accent">{line.text}</div>
				{:else if line.type === 'error'}
					<div class="text-[#ff5f57]">{line.text}</div>
				{:else}
					<div class="whitespace-pre-wrap text-text-secondary">{line.text}</div>
				{/if}
			{/each}

			<!-- Input line -->
			<div class="mt-1 flex items-center gap-2">
				<span class="text-accent">$</span>
				<div class="relative flex-1">
					<input
						bind:this={inputEl}
						bind:value={currentInput}
						onkeydown={handleKeyDown}
						oninput={handleInput}
						class="relative z-10 w-full border-none bg-transparent font-mono text-sm text-text outline-none"
						autocomplete="off"
						autocorrect="off"
						autocapitalize="off"
						spellcheck="false"
						disabled={isTyping}
					/>
					{#if suggestion}
						<div class="pointer-events-none absolute left-0 top-0 font-mono text-sm">
							<span class="invisible">{currentInput}</span><span class="text-text-muted/40">{suggestion}</span>
						</div>
					{/if}
				</div>
				<span class="cursor-blink text-accent">▌</span>
			</div>
		</div>
	</div>
</div>

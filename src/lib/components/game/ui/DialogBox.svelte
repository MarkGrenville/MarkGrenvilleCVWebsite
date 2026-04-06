<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		lines: string[];
		currentLine: number;
		onDismiss: () => void;
	}

	let { lines, currentLine, onDismiss }: Props = $props();

	let displayedText = $state('');
	let typewriterDone = $state(false);
	let interval: ReturnType<typeof setInterval> | null = null;

	function startTypewriter(text: string) {
		displayedText = '';
		typewriterDone = false;
		let i = 0;
		if (interval) clearInterval(interval);
		interval = setInterval(() => {
			if (i < text.length) {
				displayedText += text[i];
				i++;
			} else {
				typewriterDone = true;
				if (interval) clearInterval(interval);
			}
		}, 20);
	}

	function handleClick(e: MouseEvent) {
		e.stopPropagation();
		if (!typewriterDone) {
			if (interval) clearInterval(interval);
			displayedText = lines[currentLine];
			typewriterDone = true;
		} else {
			onDismiss();
		}
	}

	$effect(() => {
		startTypewriter(lines[currentLine]);
		return () => { if (interval) clearInterval(interval); };
	});

	onMount(() => {
		return () => { if (interval) clearInterval(interval); };
	});
</script>

<!-- svelte-ignore a11y_autofocus -->
<div
	style="
		position: fixed;
		bottom: 60px;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
		max-width: 560px;
		z-index: 99999;
		background: #0a0a0a;
		border: 2px solid #D4FF00;
		border-radius: 8px;
		box-shadow: 0 0 40px rgba(212, 255, 0, 0.2), 0 4px 20px rgba(0,0,0,0.8);
		cursor: pointer;
		user-select: none;
	"
	onclick={handleClick}
	onkeydown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleClick(e as unknown as MouseEvent); }}}
	role="button"
	tabindex="0"
	autofocus
>
	<div style="padding: 16px 20px;">
		<p style="
			color: #FFFFFF;
			font-family: 'Courier New', Courier, monospace;
			font-size: 14px;
			line-height: 1.6;
			margin: 0;
			min-height: 3.2em;
			word-wrap: break-word;
		">
			{displayedText}<span style="
				display: inline-block;
				width: 6px;
				height: 16px;
				background: #D4FF00;
				margin-left: 2px;
				vertical-align: middle;
				animation: blink-cursor 1s step-end infinite;
			"></span>
		</p>
	</div>
	<div style="
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 20px;
		border-top: 1px solid #333;
	">
		<span style="color: #888; font-family: monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em;">
			{currentLine + 1} / {lines.length}
		</span>
		<span style="color: #D4FF00; font-family: monospace; font-size: 11px; font-weight: bold;">
			{#if typewriterDone}
				{currentLine < lines.length - 1 ? 'NEXT ▸' : 'CLOSE ✕'}
			{/if}
		</span>
	</div>
</div>

<style>
	@keyframes blink-cursor {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
</style>

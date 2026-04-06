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
		}, 25);
	}

	function handleClick() {
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

<button
	class="absolute bottom-20 left-1/2 z-30 w-[90%] max-w-xl -translate-x-1/2 cursor-pointer border-2 border-[#D4FF00] bg-[#0a0a0a]/95 p-0 text-left backdrop-blur-sm"
	onclick={handleClick}
	aria-label="Advance dialog"
>
	<div class="px-5 py-4">
		<p class="min-h-[3em] font-mono text-sm leading-relaxed text-[#FAFAFA] md:text-base">
			{displayedText}<span class="cursor-blink ml-0.5 inline-block h-4 w-1.5 bg-[#D4FF00] align-middle"></span>
		</p>
	</div>
	<div class="flex items-center justify-between border-t border-[#333] px-5 py-2">
		<span class="font-mono text-[10px] tracking-wider text-[#444] uppercase">
			{currentLine + 1}/{lines.length}
		</span>
		<span class="font-mono text-[10px] text-[#D4FF00]">
			{#if typewriterDone}
				{currentLine < lines.length - 1 ? 'NEXT >' : 'CLOSE x'}
			{/if}
		</span>
	</div>
</button>

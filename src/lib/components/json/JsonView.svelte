<script lang="ts">
	import { cvData } from '$lib/data/cv';

	let copied = $state(false);

	const jsonString = JSON.stringify(cvData, null, 2);

	function syntaxHighlight(json: string): string {
		return json.replace(
			/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
			(match) => {
				let cls = 'text-[#ce9178]'; // string
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'text-[#9cdcfe]'; // key
					}
				} else if (/true|false/.test(match)) {
					cls = 'text-[#569cd6]'; // boolean
				} else if (/null/.test(match)) {
					cls = 'text-[#569cd6]'; // null
				} else {
					cls = 'text-[#b5cea8]'; // number
				}
				return `<span class="${cls}">${match}</span>`;
			}
		);
	}

	async function copyToClipboard() {
		await navigator.clipboard.writeText(jsonString);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<div>
				<h1 class="font-display text-xl font-bold text-text">cv-data.json</h1>
				<p class="mt-1 font-mono text-xs text-text-muted">{jsonString.length.toLocaleString()} characters · {jsonString.split('\n').length} lines</p>
			</div>
			<button
				onclick={copyToClipboard}
				class="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 font-mono text-xs text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-text"
			>
				{copied ? '✓ Copied' : 'Copy JSON'}
			</button>
		</div>

		<!-- Code block -->
		<div class="overflow-hidden rounded-xl border border-border/40 shadow-2xl">
			<!-- File tab -->
			<div class="flex items-center gap-2 border-b border-border/30 bg-surface/80 px-4 py-2">
				<div class="flex gap-1.5">
					<div class="h-3 w-3 rounded-full bg-[#ff5f57]"></div>
					<div class="h-3 w-3 rounded-full bg-[#febc2e]"></div>
					<div class="h-3 w-3 rounded-full bg-[#28c840]"></div>
				</div>
				<span class="ml-3 font-mono text-[11px] text-text-muted">cv-data.json</span>
			</div>

			<!-- Code content -->
			<div class="overflow-auto bg-[#1e1e1e] p-6" style="max-height: calc(100vh - 14rem);">
				<pre class="font-mono text-[13px] leading-relaxed"><code>{@html syntaxHighlight(jsonString)}</code></pre>
			</div>
		</div>
	</div>
</div>

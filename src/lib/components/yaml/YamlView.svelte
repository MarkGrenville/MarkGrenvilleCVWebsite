<script lang="ts">
	import { cvData } from '$lib/data/cv';
	import { toYaml } from '$lib/utils/yaml';

	let copied = $state(false);

	const yamlString = toYaml(cvData);

	function syntaxHighlight(yaml: string): string {
		return yaml
			.split('\n')
			.map((line) => {
				// Comments
				if (line.trim().startsWith('#')) {
					return `<span class="text-[#6a9955]">${escapeHtml(line)}</span>`;
				}
				// Key-value pairs
				return line.replace(
					/^(\s*)([\w-]+)(:)(.*)$/,
					(_, indent, key, colon, value) => {
						let valHtml = escapeHtml(value);
						if (/^\s*".*"$/.test(value)) {
							valHtml = `<span class="text-[#ce9178]">${escapeHtml(value)}</span>`;
						} else if (/^\s*(true|false|null)$/.test(value)) {
							valHtml = `<span class="text-[#569cd6]">${escapeHtml(value)}</span>`;
						} else if (/^\s*-?\d+(\.\d+)?$/.test(value.trim())) {
							valHtml = `<span class="text-[#b5cea8]">${escapeHtml(value)}</span>`;
						} else if (value.trim()) {
							valHtml = `<span class="text-[#ce9178]">${escapeHtml(value)}</span>`;
						}
						return `${indent}<span class="text-[#9cdcfe]">${escapeHtml(key)}</span><span class="text-text-muted">${colon}</span>${valHtml}`;
					}
				);
			})
			.join('\n');
	}

	function escapeHtml(s: string): string {
		return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	async function copyToClipboard() {
		await navigator.clipboard.writeText(yamlString);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<div class="mb-6 flex items-center justify-between">
			<div>
				<h1 class="font-display text-xl font-bold text-text">cv-data.yaml</h1>
				<p class="mt-1 font-mono text-xs text-text-muted">{yamlString.length.toLocaleString()} characters · {yamlString.split('\n').length} lines</p>
			</div>
			<button
				onclick={copyToClipboard}
				class="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 font-mono text-xs text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-text"
			>
				{copied ? '✓ Copied' : 'Copy YAML'}
			</button>
		</div>

		<!-- Code block -->
		<div class="overflow-hidden rounded-xl border border-border/40 shadow-2xl">
			<div class="flex items-center gap-2 border-b border-border/30 bg-surface/80 px-4 py-2">
				<div class="flex gap-1.5">
					<div class="h-3 w-3 rounded-full bg-[#ff5f57]"></div>
					<div class="h-3 w-3 rounded-full bg-[#febc2e]"></div>
					<div class="h-3 w-3 rounded-full bg-[#28c840]"></div>
				</div>
				<span class="ml-3 font-mono text-[11px] text-text-muted">cv-data.yaml</span>
			</div>

			<div class="overflow-auto bg-[#1e1e1e] p-6" style="max-height: calc(100vh - 14rem);">
				<pre class="font-mono text-[13px] leading-relaxed"><code>{@html syntaxHighlight(yamlString)}</code></pre>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import { cvData } from '$lib/data/cv';

	interface Endpoint {
		method: string;
		path: string;
		summary: string;
		description: string;
		tag: string;
	}

	const endpoints: Endpoint[] = [
		{ method: 'GET', path: '/api/cv', summary: 'Full CV', description: 'Returns the complete CV data including personal info, experience, skills, projects, capabilities, clients, and cover letter.', tag: 'CV' },
		{ method: 'GET', path: '/api/cv/personal', summary: 'Personal Info', description: 'Returns name, title, location, email, tagline, and professional summary.', tag: 'Sections' },
		{ method: 'GET', path: '/api/cv/experience', summary: 'Work Experience', description: 'Returns work history with companies, roles, periods, descriptions, and highlights.', tag: 'Sections' },
		{ method: 'GET', path: '/api/cv/skills', summary: 'Technical Skills', description: 'Returns skills grouped by category: Languages, Platforms, AI, Marketing, Domains.', tag: 'Sections' },
		{ method: 'GET', path: '/api/cv/projects', summary: 'Selected Projects', description: 'Returns portfolio of key projects with descriptions, tech stacks, and highlights.', tag: 'Sections' },
		{ method: 'GET', path: '/api/cv/clients', summary: 'Client List', description: 'Returns list of clients with industry classifications and descriptions.', tag: 'Sections' },
		{ method: 'GET', path: '/api/cv/cover-letter', summary: 'Cover Letter', description: 'Returns the full cover letter text.', tag: 'Sections' }
	];

	let expandedEndpoint = $state<string | null>(null);
	let responses = $state<Record<string, { status: number; data: unknown; loading: boolean }>>({});

	function toggleEndpoint(path: string) {
		expandedEndpoint = expandedEndpoint === path ? null : path;
	}

	async function executeRequest(path: string) {
		responses[path] = { status: 0, data: null, loading: true };
		responses = responses;

		try {
			const res = await fetch(path);
			const data = await res.json();
			responses[path] = { status: res.status, data, loading: false };
		} catch (err) {
			responses[path] = { status: 500, data: { error: 'Request failed' }, loading: false };
		}
		responses = responses;
	}
</script>

<div class="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<div class="mb-8 rounded-xl border border-border/40 bg-surface/60 p-8">
			<div class="flex items-start gap-4">
				<div class="flex h-12 w-12 items-center justify-center rounded-lg bg-accent font-mono text-lg font-bold text-base">
					CV
				</div>
				<div>
					<h1 class="font-display text-2xl font-bold text-text">{cvData.personal.name} — CV API</h1>
					<p class="mt-1 text-sm text-text-secondary">Public REST API for exploring professional background data.</p>
					<div class="mt-3 flex items-center gap-3">
						<span class="rounded-full bg-[#28c840]/20 px-3 py-1 font-mono text-[10px] font-medium text-[#28c840]">
							PUBLIC — NO AUTH REQUIRED
						</span>
						<span class="font-mono text-[10px] text-text-muted">v1.0 | OpenAPI 3.0</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Endpoints by tag -->
		{#each ['CV', 'Sections'] as tag}
			<div class="mb-6">
				<h2 class="mb-3 font-display text-sm font-bold tracking-wider text-text-muted uppercase">{tag}</h2>
				<div class="flex flex-col gap-2">
					{#each endpoints.filter((e) => e.tag === tag) as endpoint}
						<div class="overflow-hidden rounded-xl border border-border/40 transition-colors hover:border-border/60">
							<!-- Endpoint header -->
							<button
								onclick={() => toggleEndpoint(endpoint.path)}
								class="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-surface/40"
							>
								<span class="flex-shrink-0 rounded-md bg-[#28c840]/15 px-3 py-1 font-mono text-xs font-bold text-[#28c840]">
									{endpoint.method}
								</span>
								<span class="font-mono text-sm text-text">{endpoint.path}</span>
								<span class="ml-auto text-sm text-text-muted">{endpoint.summary}</span>
								<svg
									class="h-4 w-4 flex-shrink-0 text-text-muted transition-transform duration-200 {expandedEndpoint === endpoint.path ? 'rotate-180' : ''}"
									fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
								>
									<path d="M19 9l-7 7-7-7" />
								</svg>
							</button>

							<!-- Expanded content -->
							{#if expandedEndpoint === endpoint.path}
								<div class="border-t border-border/30 bg-[#0c0c0c] px-5 py-6">
									<p class="mb-6 text-sm text-text-secondary">{endpoint.description}</p>

									<!-- Parameters -->
									<div class="mb-6">
										<h4 class="mb-2 font-mono text-xs font-bold text-text-muted uppercase">Parameters</h4>
										<div class="rounded-lg border border-border/30 bg-surface/30 px-4 py-3 font-mono text-xs text-text-muted">
											No parameters required
										</div>
									</div>

									<!-- Try it out -->
									<button
										onclick={() => executeRequest(endpoint.path)}
										class="mb-6 rounded-lg bg-accent px-5 py-2.5 font-display text-sm font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(212,255,0,0.2)]"
									>
										{responses[endpoint.path]?.loading ? 'Loading...' : 'Execute'}
									</button>

									<!-- Response -->
									{#if responses[endpoint.path] && !responses[endpoint.path].loading}
										<div>
											<div class="mb-2 flex items-center gap-3">
												<h4 class="font-mono text-xs font-bold text-text-muted uppercase">Response</h4>
												<span class="rounded-full bg-[#28c840]/20 px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#28c840]">
													{responses[endpoint.path].status}
												</span>
											</div>
											<div class="max-h-96 overflow-auto rounded-lg border border-border/30 bg-[#0c0c0c] p-4">
												<pre class="font-mono text-xs leading-relaxed text-text-secondary"><code>{JSON.stringify(responses[endpoint.path].data, null, 2)}</code></pre>
											</div>
										</div>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

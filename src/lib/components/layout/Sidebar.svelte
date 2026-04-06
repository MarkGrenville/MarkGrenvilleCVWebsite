<script lang="ts">
	import { page } from '$app/stores';
	import { sidebarOpen } from '$lib/stores/viewMode';
	import { viewModes } from '$lib/data/cv';
	import type { ViewMode } from '$lib/types/cv';

	function getModeUrl(id: ViewMode): string {
		return id === 'gui' ? '/' : `/${id}`;
	}

	function getActiveMode(pathname: string): ViewMode | null {
		const segment = pathname.split('/')[1] || '';
		if (segment === 'contact') return null;
		const valid: ViewMode[] = ['cli', 'swagger', 'json', 'document', 'card', 'game', 'chat'];
		return valid.includes(segment as ViewMode) ? (segment as ViewMode) : 'gui';
	}

	const activeMode: ViewMode | null = $derived(getActiveMode($page.url.pathname));
</script>

<aside class="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-border/40 bg-base/90 backdrop-blur-xl lg:flex">
	<div class="flex h-full flex-col">
		<!-- Brand -->
		<div class="border-b border-border/40 px-6 py-8">
			<div class="font-display text-sm font-medium tracking-[0.3em] text-text-muted uppercase">
				Curriculum Vitae
			</div>
			<a href="/" class="mt-2 block font-display text-lg font-bold tracking-tight text-text">
				Mark<span class="text-accent">.</span>
			</a>
		</div>

		<!-- View modes -->
		<nav class="flex-1 px-4 py-6">
			<div class="mb-4 px-2 font-mono text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase">
				View Mode
			</div>
			<div class="flex flex-col gap-1">
				{#each viewModes as mode}
					<a
						href={getModeUrl(mode.id)}
						onclick={() => ($sidebarOpen = false)}
						class="group flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-300
							{activeMode === mode.id
								? 'bg-accent/10 text-accent'
								: 'text-text-secondary hover:bg-surface hover:text-text'}"
					>
						<span
							class="flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300
								{activeMode === mode.id
									? 'bg-accent text-base'
									: 'bg-surface text-text-muted group-hover:bg-card group-hover:text-text-secondary'}"
						>
							{@html mode.icon}
						</span>
						<div class="flex flex-col">
							<span class="text-sm font-semibold">{mode.label}</span>
							<span class="text-[11px] text-text-muted">{mode.description}</span>
						</div>
						{#if activeMode === mode.id}
							<div class="ml-auto h-1.5 w-1.5 rounded-full bg-accent"></div>
						{/if}
					</a>
				{/each}

				<!-- Contact -->
				<a
					href="/contact"
					class="group flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-300
						{$page.url.pathname === '/contact'
							? 'bg-accent/10 text-accent'
							: 'text-text-secondary hover:bg-surface hover:text-text'}"
				>
					<span
						class="flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300
							{$page.url.pathname === '/contact'
								? 'bg-accent text-base'
								: 'bg-surface text-text-muted group-hover:bg-card group-hover:text-text-secondary'}"
					>
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
					</span>
					<div class="flex flex-col">
						<span class="text-sm font-semibold">Contact</span>
						<span class="text-[11px] text-text-muted">Get in touch</span>
					</div>
					{#if $page.url.pathname === '/contact'}
						<div class="ml-auto h-1.5 w-1.5 rounded-full bg-accent"></div>
					{/if}
				</a>
			</div>
		</nav>

		<!-- Footer -->
		<div class="border-t border-border/40 px-6 py-5">
			<div class="font-mono text-[10px] text-text-muted">
				&copy; {new Date().getFullYear()} Mark Grenville
			</div>
		</div>
	</div>
</aside>

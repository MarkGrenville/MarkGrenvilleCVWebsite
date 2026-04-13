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

	function toggleMenu() {
		$sidebarOpen = !$sidebarOpen;
	}

	const activeMode: ViewMode | null = $derived(getActiveMode($page.url.pathname));
	const activeLabel = $derived(activeMode ? (viewModes.find((m) => m.id === activeMode)?.label ?? 'GUI') : 'Contact');
</script>

<!-- Mobile header bar -->
<header class="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border/40 bg-base/90 px-5 py-4 backdrop-blur-xl lg:hidden">
	<a href="/" class="font-display text-sm font-bold tracking-tight text-text">
		MG<span class="text-accent">.</span>
	</a>

	<div class="flex items-center gap-3">
		<span class="font-mono text-[10px] tracking-wider text-text-muted uppercase">
			{activeLabel}
		</span>
		<button
			onclick={toggleMenu}
			class="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-border/60 transition-colors hover:border-accent/40"
			aria-label="Toggle menu"
		>
			<span
				class="block h-[2px] w-5 bg-text transition-all duration-300
					{$sidebarOpen ? 'translate-y-[5px] rotate-45' : ''}"
			></span>
			<span
				class="block h-[2px] w-5 bg-text transition-all duration-300
					{$sidebarOpen ? 'opacity-0' : ''}"
			></span>
			<span
				class="block h-[2px] w-5 bg-text transition-all duration-300
					{$sidebarOpen ? '-translate-y-[5px] -rotate-45' : ''}"
			></span>
		</button>
	</div>
</header>

<!-- Mobile overlay -->
{#if $sidebarOpen}
	<div class="fixed inset-0 z-40 lg:hidden">
		<!-- Backdrop -->
		<button
			class="absolute inset-0 bg-base/80 backdrop-blur-sm"
			onclick={() => ($sidebarOpen = false)}
			aria-label="Close menu"
		></button>

		<!-- Slide-in panel -->
		<div class="absolute right-0 top-0 h-full w-72 border-l border-border/40 bg-base/95 backdrop-blur-xl">
			<div class="px-6 pt-20">
				<div class="mb-6 font-mono text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase">
					View Mode
				</div>
				<div class="flex flex-col gap-2">
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
								class="flex h-9 w-9 items-center justify-center rounded-md transition-all duration-300
									{activeMode === mode.id
										? 'bg-accent text-base'
										: 'bg-surface text-text-muted group-hover:text-text-secondary'}"
							>
								{@html mode.icon}
							</span>
							<div class="flex flex-col">
								<span class="text-sm font-semibold">{mode.label}</span>
								<span class="text-[11px] text-text-muted">{mode.description}</span>
							</div>
						</a>
					{/each}
					<!-- Contact -->
					<a
						href="/contact"
						onclick={() => ($sidebarOpen = false)}
						class="group flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-300
							{$page.url.pathname === '/contact'
								? 'bg-accent/10 text-accent'
								: 'text-text-secondary hover:bg-surface hover:text-text'}"
					>
						<span
							class="flex h-9 w-9 items-center justify-center rounded-md transition-all duration-300
								{$page.url.pathname === '/contact'
									? 'bg-accent text-base'
									: 'bg-surface text-text-muted group-hover:text-text-secondary'}"
						>
							<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
						</span>
						<div class="flex flex-col">
							<span class="text-sm font-semibold">Contact</span>
							<span class="text-[11px] text-text-muted">Get in touch</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
{/if}

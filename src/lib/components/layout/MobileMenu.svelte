<script lang="ts">
	import { viewMode, sidebarOpen } from '$lib/stores/viewMode';
	import { viewModes } from '$lib/data/cv';

	function selectMode(id: typeof $viewMode) {
		$viewMode = id;
		$sidebarOpen = false;
	}

	function toggleMenu() {
		$sidebarOpen = !$sidebarOpen;
	}
</script>

<!-- Mobile header bar -->
<header class="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border/40 bg-base/90 px-5 py-4 backdrop-blur-xl lg:hidden">
	<div class="font-display text-sm font-bold tracking-tight text-text">
		MG<span class="text-accent">.</span>
	</div>

	<div class="flex items-center gap-3">
		<span class="font-mono text-[10px] tracking-wider text-text-muted uppercase">
			{viewModes.find((m) => m.id === $viewMode)?.label}
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
						<button
							onclick={() => selectMode(mode.id)}
							class="group flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-300
								{$viewMode === mode.id
									? 'bg-accent/10 text-accent'
									: 'text-text-secondary hover:bg-surface hover:text-text'}"
						>
							<span
								class="flex h-9 w-9 items-center justify-center rounded-md font-mono text-xs font-bold transition-all duration-300
									{$viewMode === mode.id
										? 'bg-accent text-base'
										: 'bg-surface text-text-muted group-hover:text-text-secondary'}"
							>
								{mode.icon}
							</span>
							<div class="flex flex-col">
								<span class="text-sm font-semibold">{mode.label}</span>
								<span class="text-[11px] text-text-muted">{mode.description}</span>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

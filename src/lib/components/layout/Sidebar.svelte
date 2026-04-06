<script lang="ts">
	import { viewMode, sidebarOpen } from '$lib/stores/viewMode';
	import { viewModes } from '$lib/data/cv';

	function selectMode(id: typeof $viewMode) {
		$viewMode = id;
		$sidebarOpen = false;
	}
</script>

<aside class="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-border/40 bg-base/90 backdrop-blur-xl lg:flex">
	<div class="flex h-full flex-col">
		<!-- Brand -->
		<div class="border-b border-border/40 px-6 py-8">
			<div class="font-display text-sm font-medium tracking-[0.3em] text-text-muted uppercase">
				Curriculum Vitae
			</div>
			<div class="mt-2 font-display text-lg font-bold tracking-tight text-text">
				Mark<span class="text-accent">.</span>
			</div>
		</div>

		<!-- View modes -->
		<nav class="flex-1 px-4 py-6">
			<div class="mb-4 px-2 font-mono text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase">
				View Mode
			</div>
			<div class="flex flex-col gap-1">
				{#each viewModes as mode}
					<button
						onclick={() => selectMode(mode.id)}
						class="group flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-300
							{$viewMode === mode.id
								? 'bg-accent/10 text-accent'
								: 'text-text-secondary hover:bg-surface hover:text-text'}"
					>
						<span
							class="flex h-8 w-8 items-center justify-center rounded-md font-mono text-xs font-bold transition-all duration-300
								{$viewMode === mode.id
									? 'bg-accent text-base'
									: 'bg-surface text-text-muted group-hover:bg-card group-hover:text-text-secondary'}"
						>
							{mode.icon}
						</span>
						<div class="flex flex-col">
							<span class="text-sm font-semibold">{mode.label}</span>
							<span class="text-[11px] text-text-muted">{mode.description}</span>
						</div>
						{#if $viewMode === mode.id}
							<div class="ml-auto h-1.5 w-1.5 rounded-full bg-accent"></div>
						{/if}
					</button>
				{/each}

				<!-- Contact -->
				<a
					href="/contact"
					class="group flex items-center gap-3 rounded-lg px-3 py-3 text-left text-text-secondary transition-all duration-300 hover:bg-surface hover:text-text"
				>
					<span
						class="flex h-8 w-8 items-center justify-center rounded-md bg-surface font-mono text-xs font-bold text-text-muted transition-all duration-300 group-hover:bg-card group-hover:text-text-secondary"
					>
						✉
					</span>
					<div class="flex flex-col">
						<span class="text-sm font-semibold">Contact</span>
						<span class="text-[11px] text-text-muted">Get in touch</span>
					</div>
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

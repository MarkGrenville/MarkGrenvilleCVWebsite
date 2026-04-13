<script lang="ts">
	import { cvData } from '$lib/data/cv';
	import { reveal } from '$lib/utils/animations';
</script>

<section class="relative px-6 py-32 md:px-12 lg:px-20">
	<div class="mx-auto max-w-6xl">
		<div use:reveal class="mb-16">
			<span class="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">06 / Clients</span>
		</div>

		<h2 use:reveal class="mb-6 font-display text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl">
			Trusted by <span class="text-accent">leading</span> brands.
		</h2>

		<p use:reveal={{ delay: 0.1 }} class="mb-16 max-w-xl text-text-secondary">
			From automotive giants to fintech startups, international NGOs to media companies.
		</p>

		<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
			{#each cvData.clients as client, i}
				<div
					use:reveal={{ delay: Math.min(i * 0.05, 0.5) }}
					class="glass group relative flex flex-col items-center justify-center rounded-xl px-4 py-6 text-center transition-all duration-300 hover:border-accent/30"
				>
					<div class="font-display text-sm font-bold text-text transition-colors group-hover:text-accent">
						{client.name}
					</div>
					<div class="mt-1 font-mono text-[9px] tracking-wider text-text-muted uppercase">
						{client.industry}
					</div>

					<!-- Hover tooltip -->
					{#if client.description}
						<div class="pointer-events-none absolute -bottom-2 left-1/2 z-10 -translate-x-1/2 translate-y-full rounded-lg bg-card px-3 py-2 text-xs text-text-secondary opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-[calc(100%+4px)] group-hover:opacity-100">
							{client.description}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<script lang="ts">
	import { cvData } from '$lib/data/cv';
	import { reveal } from '$lib/utils/animations';
</script>

<section class="relative px-6 py-32 md:px-12 lg:px-20">
	<div class="mx-auto max-w-6xl">
		<div use:reveal class="mb-16">
			<span class="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">03 / Skills</span>
		</div>

		<h2 use:reveal class="mb-20 font-display text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl">
			Technical <span class="text-accent">depth</span>.
		</h2>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each cvData.skills as category, i}
				<div use:reveal={{ delay: i * 0.1 }} class="glass group rounded-2xl p-8 transition-all duration-300 hover:border-accent/30">
					<h3 class="mb-6 font-display text-lg font-bold text-text">
						{category.category}
					</h3>
					<div class="flex flex-wrap gap-2">
						{#each category.items as skill}
							<span class="rounded-lg bg-surface px-3 py-1.5 font-mono text-xs text-text-secondary transition-all duration-300 group-hover:bg-card group-hover:text-text">
								{skill}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

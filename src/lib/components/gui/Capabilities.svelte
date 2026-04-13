<script lang="ts">
	import { cvData } from '$lib/data/cv';
	import { reveal } from '$lib/utils/animations';
</script>

<section class="relative overflow-hidden px-6 py-32 md:px-12 lg:px-20">
	<div class="mx-auto max-w-6xl">
		<div use:reveal class="mb-16">
			<span class="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">05 / Capabilities</span>
		</div>

		<h2 use:reveal class="mb-20 font-display text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl">
			What I <span class="text-accent">do</span>.
		</h2>

		<div class="grid gap-6 md:grid-cols-2">
			{#each cvData.capabilities as cap, i}
				<div
					use:reveal={{ delay: i * 0.1 }}
					class="glass group relative overflow-hidden rounded-2xl p-10 transition-all duration-500 hover:border-accent/30"
				>
					<!-- Large background label -->
					<div class="pointer-events-none absolute -bottom-4 -right-4 font-display text-[8rem] font-bold leading-none text-text/[0.02] transition-all duration-500 group-hover:text-accent/[0.05]">
						{cap.label}
					</div>

					<div class="relative">
						<h3 class="mb-2 font-display text-2xl font-bold text-text">{cap.label}</h3>
						<p class="mb-6 text-sm leading-relaxed text-text-secondary">{cap.description}</p>

						<ul class="flex flex-col gap-2">
							{#each cap.items as item}
								<li class="flex items-center gap-2 text-sm text-text-muted">
									<span class="h-[2px] w-3 bg-accent/40"></span>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

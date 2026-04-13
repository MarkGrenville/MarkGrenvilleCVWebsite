<script lang="ts">
	import { cvData } from '$lib/data/cv';
	import { reveal } from '$lib/utils/animations';
</script>

<section class="relative overflow-hidden px-6 py-32 md:px-12 lg:px-20">
	<!-- Large background accent -->
	<div
		class="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03] blur-[150px]"
		style="background: radial-gradient(circle, var(--color-accent), transparent 70%);"
	></div>

	<div class="relative mx-auto max-w-4xl">
		<div use:reveal class="mb-16">
			<span class="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">07 / The Shift</span>
		</div>

		<h2 use:reveal class="mb-16 font-display text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-6xl">
			Why I'm moving<br />
			toward <span class="text-accent">AI</span>.
		</h2>

		<div class="flex flex-col gap-12">
			{#each cvData.whyAI as paragraph, i}
				<div use:reveal={{ delay: i * 0.15 }} class="relative pl-8 md:pl-12">
					<!-- Accent line -->
					<div class="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-accent/60 via-accent/20 to-transparent"></div>

					<!-- Quote number -->
					<div class="absolute -left-1 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-accent font-mono text-[10px] font-bold text-base">
						{i + 1}
					</div>

					<p class="text-lg leading-relaxed text-text-secondary md:text-xl">
						{paragraph}
					</p>
				</div>
			{/each}
		</div>

		<!-- Pull quote -->
		<div use:reveal={{ delay: 0.5 }} class="mt-20 border-l-2 border-accent pl-8">
			<blockquote class="font-display text-2xl font-bold leading-snug tracking-tight text-text md:text-3xl">
				"I know how to build. I know how to adapt. I know how to work close to customer needs."
			</blockquote>
			<cite class="mt-4 block font-mono text-sm not-italic text-text-muted">— Mark Grenville</cite>
		</div>
	</div>
</section>

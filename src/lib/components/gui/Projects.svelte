<script lang="ts">
	import { cvData } from '$lib/data/cv';
	import { reveal } from '$lib/utils/animations';
</script>

<section class="relative px-6 py-32 md:px-12 lg:px-20">
	<!-- Background accent -->
	<div
		class="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[600px] translate-x-1/3 rounded-full opacity-[0.04] blur-[120px]"
		style="background: radial-gradient(circle, var(--color-accent), transparent 70%);"
	></div>

	<div class="relative mx-auto max-w-6xl">
		<div use:reveal class="mb-16">
			<span class="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">04 / Projects</span>
		</div>

		<h2 use:reveal class="mb-20 font-display text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl">
			Selected <span class="text-accent">work</span>.
		</h2>

		<div class="grid gap-8 md:grid-cols-2">
			{#each cvData.projects as project, i}
				<div
					use:reveal={{ delay: i * 0.1 }}
					class="glass group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:border-accent/30 md:p-10
						{i === 0 ? 'md:col-span-2' : ''}"
				>
					<!-- Hover accent glow -->
					<div class="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-[0.08]"
						style="background: var(--color-accent);"
					></div>

					<div class="relative">
						{#if project.client}
							<div class="mb-2 font-mono text-[10px] tracking-wider text-accent uppercase">{project.client}</div>
						{/if}

						<h3 class="mb-3 font-display text-xl font-bold text-text md:text-2xl">{project.name}</h3>
						<p class="mb-6 leading-relaxed text-text-secondary">{project.description}</p>

						<!-- Tech stack -->
						<div class="mb-6 flex flex-wrap gap-2">
							{#each project.tech as tech}
								<span class="rounded-md border border-border/60 px-2.5 py-1 font-mono text-[10px] text-text-muted transition-colors group-hover:border-accent/30 group-hover:text-text-secondary">
									{tech}
								</span>
							{/each}
						</div>

						<!-- Highlights -->
						<ul class="flex flex-col gap-1.5">
							{#each project.highlights as highlight}
								<li class="flex items-start gap-2 text-sm text-text-muted">
									<span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent/60"></span>
									{highlight}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<script lang="ts">
	import { cvData } from '$lib/data/cv';
	import { reveal } from '$lib/utils/animations';
</script>

<section class="relative overflow-hidden px-6 py-32 md:px-12 lg:px-20">
	<!-- Background accent -->
	<div
		class="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04] blur-[100px]"
		style="background: radial-gradient(circle, var(--color-accent), transparent 70%);"
	></div>

	<div class="relative mx-auto max-w-6xl">
		<div use:reveal class="mb-16">
			<span class="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">02 / Experience</span>
		</div>

		<h2 use:reveal class="mb-20 font-display text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl">
			Where I've <span class="text-accent">built</span>.
		</h2>

		<!-- Timeline -->
		<div class="relative">
			<!-- Timeline line -->
			<div class="absolute left-0 top-0 hidden h-full w-[1px] bg-gradient-to-b from-accent/40 via-border to-transparent md:block md:left-8"></div>

			<div class="flex flex-col gap-16">
				{#each cvData.experience as entry, i}
					<div use:reveal={{ delay: i * 0.15 }} class="group relative md:pl-24">
						<!-- Timeline dot -->
						<div class="absolute left-0 top-2 hidden h-4 w-4 md:block md:left-[25px]">
							<div class="h-full w-full rounded-full border-2 border-accent bg-base transition-all duration-300 group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(212,255,0,0.3)]"></div>
						</div>

						<div class="glass rounded-2xl p-8 transition-all duration-300 hover:border-accent/30 md:p-10">
							<div class="mb-1 font-mono text-xs tracking-wider text-accent">{entry.period}</div>
							<h3 class="font-display text-2xl font-bold text-text">{entry.role}</h3>
							<div class="mb-4 text-sm text-text-secondary">{entry.company}</div>

							<p class="mb-6 leading-relaxed text-text-secondary">{entry.description}</p>

							<ul class="flex flex-col gap-2">
								{#each entry.highlights as highlight}
									<li class="flex items-start gap-3 text-sm text-text-muted">
										<span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent"></span>
										{highlight}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

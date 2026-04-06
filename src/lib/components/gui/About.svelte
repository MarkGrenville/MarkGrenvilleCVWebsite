<script lang="ts">
	import { cvData } from '$lib/data/cv';
	import { reveal } from '$lib/utils/animations';
</script>

<section id="about" class="relative px-6 py-32 md:px-12 lg:px-20">
	<div class="mx-auto max-w-6xl">
		<!-- Section label -->
		<div use:reveal class="mb-16">
			<span class="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">01 / About</span>
		</div>

		<div class="grid gap-16 lg:grid-cols-12">
			<!-- Text column -->
			<div class="lg:col-span-7">
				<h2 use:reveal class="font-display text-3xl font-bold leading-tight tracking-tight text-text md:text-4xl lg:text-5xl">
					13 years building<br />
					<span class="text-accent">digital systems</span> that<br />
					make businesses work.
				</h2>

				<p use:reveal={{ delay: 0.1 }} class="mt-8 max-w-xl text-lg leading-relaxed text-text-secondary">
					{cvData.personal.summary}
				</p>
			</div>

			<!-- Stats + Image column -->
			<div class="lg:col-span-5">
				<div use:reveal={{ delay: 0.2 }} class="relative mb-8 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border/40 lg:max-w-none">
					<img
						src={cvData.personal.profileImage}
						alt={cvData.personal.name}
						class="h-full w-full object-cover"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-transparent"></div>
				</div>

				<!-- Stats grid -->
				<div class="grid grid-cols-3 gap-4">
					{#each [
						{ value: '13+', label: 'Years' },
						{ value: '20+', label: 'Platforms' },
						{ value: '6+', label: 'Yr Toyota' }
					] as stat, i}
						<div use:reveal={{ delay: 0.3 + i * 0.1 }} class="glass rounded-xl px-4 py-5 text-center transition-all duration-300 hover:border-accent/40">
							<div class="font-display text-2xl font-bold text-accent">{stat.value}</div>
							<div class="mt-1 font-mono text-[10px] tracking-wider text-text-muted uppercase">{stat.label}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

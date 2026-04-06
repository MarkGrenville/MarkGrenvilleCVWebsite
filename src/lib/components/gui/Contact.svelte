<script lang="ts">
	import { cvData } from '$lib/data/cv';
	import { reveal } from '$lib/utils/animations';
</script>

<section class="relative px-6 py-32 md:px-12 lg:px-20">
	<div class="mx-auto max-w-4xl text-center">
		<div use:reveal class="mb-10">
			<span class="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">08 / Contact</span>
		</div>

		<h2 use:reveal class="font-display text-4xl font-bold tracking-tight text-text md:text-5xl lg:text-7xl">
			Let's <span class="text-accent">talk</span>.
		</h2>

		<p use:reveal={{ delay: 0.1 }} class="mx-auto mt-6 max-w-lg text-lg text-text-secondary">
			Ready to contribute technical depth, entrepreneurial ownership, and practical execution to a team shaping the future of AI.
		</p>

		<div use:reveal={{ delay: 0.2 }} class="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
			<a
				href="mailto:{cvData.personal.email}"
				class="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-display text-base font-semibold text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(212,255,0,0.25)]"
			>
				{cvData.personal.email}
				<span class="text-xl">&rarr;</span>
			</a>
		</div>

		<!-- Bottom decoration -->
		<div use:reveal={{ delay: 0.3 }} class="mt-24">
			<div class="mx-auto h-[1px] w-32 bg-gradient-to-r from-transparent via-border to-transparent"></div>
			<div class="mt-8 font-mono text-[10px] tracking-widest text-text-muted">
				&copy; {new Date().getFullYear()} MARK GRENVILLE &mdash; JOHANNESBURG, SOUTH AFRICA
			</div>
		</div>
	</div>
</section>

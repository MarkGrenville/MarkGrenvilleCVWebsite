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
			<a
				href="https://www.linkedin.com/in/markgrenville/"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-3 rounded-full border border-border px-8 py-4 font-display text-base font-semibold text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-text"
			>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
				LinkedIn
			</a>
			<a
				href="https://github.com/MarkGrenville"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-3 rounded-full border border-border px-8 py-4 font-display text-base font-semibold text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-text"
			>
				<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
				GitHub
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

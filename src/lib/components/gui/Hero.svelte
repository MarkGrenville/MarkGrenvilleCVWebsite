<script lang="ts">
	import { onMount } from 'svelte';
	import { cvData } from '$lib/data/cv';

	let mounted = $state(false);
	let nameRevealed = $state(false);

	onMount(() => {
		mounted = true;
		setTimeout(() => (nameRevealed = true), 200);
	});
</script>

<section class="relative flex min-h-screen items-center overflow-hidden px-6 py-20 md:px-12 lg:px-20">
	<!-- Accent gradient orb -->
	<div
		class="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full opacity-[0.07] blur-[120px] transition-opacity duration-[2s]"
		style="background: radial-gradient(circle, var(--color-accent), transparent 70%);
			opacity: {mounted ? 0.07 : 0};"
	></div>

	<!-- Subtle grid pattern -->
	<div class="pointer-events-none absolute inset-0 opacity-[0.03]"
		style="background-image: linear-gradient(var(--color-border) 1px, transparent 1px),
			linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
			background-size: 80px 80px;"
	></div>

	<div class="relative z-10 w-full max-w-6xl">
		<!-- Location badge -->
		<div
			class="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-4 py-2 backdrop-blur-sm transition-all duration-700"
			style="opacity: {mounted ? 1 : 0}; transform: translateY({mounted ? 0 : 20}px);"
		>
			<span class="h-2 w-2 rounded-full bg-accent"></span>
			<span class="font-mono text-xs tracking-wider text-text-secondary">{cvData.personal.location}</span>
		</div>

		<!-- Name -->
		<div class="overflow-hidden">
			<h1
				class="font-display text-[clamp(3rem,10vw,10rem)] font-bold leading-[0.9] tracking-tighter text-text transition-all duration-1000"
				style="opacity: {nameRevealed ? 1 : 0};
					transform: translateY({nameRevealed ? 0 : 60}px);
					letter-spacing: {nameRevealed ? '-0.04em' : '0.1em'};"
			>
				<span class="text-accent">MARK</span><br />
				GRENVILLE
			</h1>
		</div>

		<!-- Accent line -->
		<div class="my-8 h-[2px] w-0 bg-accent {mounted ? 'accent-line-animate' : ''}" style="max-width: 200px;"></div>

		<!-- Title -->
		<p
			class="max-w-xl font-display text-lg font-light leading-relaxed text-text-secondary transition-all delay-500 duration-700 md:text-xl"
			style="opacity: {mounted ? 1 : 0}; transform: translateY({mounted ? 0 : 20}px);"
		>
			{cvData.personal.title}
		</p>

		<!-- Tagline -->
		<p
			class="mt-4 max-w-lg text-base leading-relaxed text-text-muted transition-all delay-700 duration-700"
			style="opacity: {mounted ? 1 : 0}; transform: translateY({mounted ? 0 : 20}px);"
		>
			{cvData.personal.tagline}
		</p>

		<!-- CTA -->
		<div
			class="mt-12 flex flex-wrap gap-4 transition-all delay-[900ms] duration-700"
			style="opacity: {mounted ? 1 : 0}; transform: translateY({mounted ? 0 : 20}px);"
		>
			<a
				href="mailto:{cvData.personal.email}"
				class="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-sm font-semibold text-base transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(212,255,0,0.25)]"
			>
				Get in touch
				<span class="text-lg">&rarr;</span>
			</a>
			<a
				href="#about"
				class="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-display text-sm font-semibold text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-text"
			>
				Explore CV
			</a>
			<a
				href="https://github.com/MarkGrenville"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-display text-sm font-semibold text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-text"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
				GitHub
			</a>
		</div>

		<!-- Scroll indicator -->
		<div
			class="absolute bottom-10 left-6 flex flex-col items-center gap-2 transition-all delay-[1200ms] duration-700 md:left-12"
			style="opacity: {mounted ? 0.4 : 0};"
		>
			<div class="h-12 w-[1px] bg-gradient-to-b from-transparent via-text-muted to-transparent"></div>
			<span class="font-mono text-[9px] tracking-widest text-text-muted uppercase">Scroll</span>
		</div>
	</div>
</section>

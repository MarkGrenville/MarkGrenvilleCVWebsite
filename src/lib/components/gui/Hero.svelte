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
				MARK<br />
				<span class="text-accent">GREN</span>VILLE
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

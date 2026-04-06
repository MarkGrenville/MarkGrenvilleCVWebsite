<script lang="ts">
	import { onMount } from 'svelte';
	import { cvData } from '$lib/data/cv';
	import { downloadVCard } from '$lib/utils/vcf';

	const { personal, skills, experience } = cvData;
	const topSkills = skills.flatMap((cat) => cat.items).slice(0, 12);
	const yearsExperience = '13+';
	const projectCount = cvData.projects.length + '+';
	const clientCount = cvData.clients.length + '+';

	let mounted = $state(false);
	let step = $state(0);
	let cardEl: HTMLElement | undefined = $state(undefined);
	let tiltX = $state(0);
	let tiltY = $state(0);
	let glowX = $state(50);
	let glowY = $state(50);
	let isHovering = $state(false);
	let isTouch = $state(false);

	onMount(() => {
		isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		mounted = true;
		const timers: ReturnType<typeof setTimeout>[] = [];
		for (let i = 1; i <= 7; i++) {
			timers.push(setTimeout(() => (step = i), i * 150));
		}
		return () => timers.forEach(clearTimeout);
	});

	function handleMouseMove(e: MouseEvent) {
		if (isTouch || !cardEl) return;
		const rect = cardEl.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		tiltX = (y - 0.5) * -14;
		tiltY = (x - 0.5) * 14;
		glowX = x * 100;
		glowY = y * 100;
		isHovering = true;
	}

	function handleMouseLeave() {
		tiltX = 0;
		tiltY = 0;
		isHovering = false;
	}

	function handleDownload() {
		downloadVCard(personal);
	}
</script>

<section class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 md:px-8">
	<!-- Background grid -->
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.03]"
		style="background-image: linear-gradient(var(--color-border) 1px, transparent 1px),
			linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
			background-size: 80px 80px;"
	></div>

	<!-- Floating accent orb -->
	<div
		class="pointer-events-none absolute h-[500px] w-[500px] rounded-full blur-[140px] transition-opacity duration-[2s]"
		style="background: radial-gradient(circle, var(--color-accent), transparent 70%);
			opacity: {mounted ? 0.06 : 0};
			top: 50%; left: 50%; transform: translate(-50%, -50%);"
	></div>

	<!-- 3D perspective wrapper -->
	<div style="perspective: 1200px;" class="relative z-10 w-full max-w-lg">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			bind:this={cardEl}
			onmousemove={handleMouseMove}
			onmouseleave={handleMouseLeave}
			class="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 shadow-2xl backdrop-blur-xl transition-transform"
			style="transform: rotateX({tiltX}deg) rotateY({tiltY}deg) scale({isHovering ? 1.02 : 1});
				transition-duration: {isHovering ? '100ms' : '600ms'};"
		>
			<!-- Cursor-following glow overlay -->
			{#if isHovering}
				<div
					class="pointer-events-none absolute inset-0 z-0 opacity-20 transition-opacity duration-300"
					style="background: radial-gradient(circle at {glowX}% {glowY}%, var(--color-accent), transparent 60%);"
				></div>
			{/if}

			<!-- Accent top edge -->
			<div class="h-[2px] w-full bg-gradient-to-r from-transparent via-accent to-transparent"></div>

			<div class="relative z-10 flex flex-col items-center px-8 pb-10 pt-10 md:px-10">
				<!-- Profile image -->
				<div
					class="relative mb-6 transition-all duration-700"
					style="opacity: {step >= 1 ? 1 : 0}; transform: scale({step >= 1 ? 1 : 0.8});"
				>
					<div class="absolute -inset-1 rounded-full bg-accent/30 blur-md {mounted ? 'animate-pulse-slow' : ''}"></div>
					<div class="relative h-28 w-28 overflow-hidden rounded-full border-2 border-accent/60 md:h-32 md:w-32">
						<img
							src={personal.profileImage}
							alt={personal.name}
							class="h-full w-full object-cover"
						/>
					</div>
				</div>

				<!-- Name -->
				<h1
					class="mb-1 text-center font-display text-3xl font-bold tracking-tight text-text transition-all duration-700 md:text-4xl"
					style="opacity: {step >= 2 ? 1 : 0}; transform: translateY({step >= 2 ? 0 : 20}px);"
				>
					<span class="text-accent">{personal.name.split(' ')[0]}</span>
					{personal.name.split(' ').slice(1).join(' ')}
				</h1>

				<!-- Title -->
				<p
					class="mb-4 text-center font-display text-sm font-light text-text-secondary transition-all duration-700 md:text-base"
					style="opacity: {step >= 3 ? 1 : 0}; transform: translateY({step >= 3 ? 0 : 15}px);"
				>
					{personal.title}
				</p>

				<!-- Location + Email badges -->
				<div
					class="mb-6 flex flex-wrap items-center justify-center gap-3 transition-all duration-700"
					style="opacity: {step >= 4 ? 1 : 0}; transform: translateY({step >= 4 ? 0 : 15}px);"
				>
					<span class="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/60 px-3 py-1.5 backdrop-blur-sm">
						<span class="h-1.5 w-1.5 rounded-full bg-accent"></span>
						<span class="font-mono text-[11px] tracking-wider text-text-secondary">{personal.location}</span>
					</span>
					<a
						href="mailto:{personal.email}"
						class="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface/60 px-3 py-1.5 backdrop-blur-sm transition-colors duration-200 hover:border-accent/40"
					>
						<svg class="h-3 w-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<span class="font-mono text-[11px] tracking-wider text-text-secondary">{personal.email}</span>
					</a>
				</div>

				<!-- Tagline -->
				<p
					class="mb-6 max-w-sm text-center text-sm leading-relaxed text-text-muted transition-all duration-700"
					style="opacity: {step >= 4 ? 1 : 0}; transform: translateY({step >= 4 ? 0 : 10}px);"
				>
					{personal.tagline}
				</p>

				<!-- Stats row -->
				<div
					class="mb-6 flex w-full items-center justify-center gap-6 border-y border-border/30 py-4 transition-all duration-700 md:gap-10"
					style="opacity: {step >= 5 ? 1 : 0}; transform: translateY({step >= 5 ? 0 : 10}px);"
				>
					<div class="text-center">
						<div class="font-display text-xl font-bold text-accent">{yearsExperience}</div>
						<div class="font-mono text-[10px] tracking-wider text-text-muted uppercase">Years</div>
					</div>
					<div class="h-8 w-px bg-border/40"></div>
					<div class="text-center">
						<div class="font-display text-xl font-bold text-accent">{projectCount}</div>
						<div class="font-mono text-[10px] tracking-wider text-text-muted uppercase">Projects</div>
					</div>
					<div class="h-8 w-px bg-border/40"></div>
					<div class="text-center">
						<div class="font-display text-xl font-bold text-accent">{clientCount}</div>
						<div class="font-mono text-[10px] tracking-wider text-text-muted uppercase">Clients</div>
					</div>
				</div>

				<!-- Skills pills -->
				<div
					class="mb-8 flex flex-wrap justify-center gap-2 transition-all duration-700"
					style="opacity: {step >= 6 ? 1 : 0}; transform: translateY({step >= 6 ? 0 : 10}px);"
				>
					{#each topSkills as skill}
						<span class="rounded-full border border-border/40 bg-surface/50 px-3 py-1 font-mono text-[10px] tracking-wider text-text-secondary transition-colors duration-200 hover:border-accent/50 hover:text-accent">
							{skill}
						</span>
					{/each}
				</div>

				<!-- Download VCF button -->
				<button
					onclick={handleDownload}
					class="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3 font-display text-sm font-semibold text-base transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(212,255,0,0.25)]"
					style="opacity: {step >= 7 ? 1 : 0}; transform: translateY({step >= 7 ? 0 : 10}px);
						transition: opacity 0.7s, transform 0.7s, box-shadow 0.3s, scale 0.3s;"
				>
					<svg class="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					Download VCF
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes pulse-slow {
		0%, 100% { opacity: 0.3; }
		50% { opacity: 0.6; }
	}
	:global(.animate-pulse-slow) {
		animation: pulse-slow 3s ease-in-out infinite;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { cvData } from '$lib/data/cv';
	import { downloadVCard } from '$lib/utils/vcf';

	const { personal, skills } = cvData;
	const topSkills = skills.flatMap((cat) => cat.items).slice(0, 8);
	const yearsExperience = '13';
	const projectCount = cvData.projects.length;
	const clientCount = cvData.clients.length;

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
		for (let i = 1; i <= 5; i++) {
			timers.push(setTimeout(() => (step = i), i * 180));
		}
		return () => timers.forEach(clearTimeout);
	});

	function handleMouseMove(e: MouseEvent) {
		if (isTouch || !cardEl) return;
		const rect = cardEl.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		tiltX = (y - 0.5) * -12;
		tiltY = (x - 0.5) * 12;
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
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.03]"
		style="background-image: linear-gradient(var(--color-border) 1px, transparent 1px),
			linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
			background-size: 80px 80px;"
	></div>

	<div
		class="pointer-events-none absolute h-[500px] w-[500px] rounded-full blur-[140px] transition-opacity duration-[2s]"
		style="background: radial-gradient(circle, var(--color-accent), transparent 70%);
			opacity: {mounted ? 0.06 : 0};
			top: 50%; left: 50%; transform: translate(-50%, -50%);"
	></div>

	<div class="relative z-10 flex flex-col items-center gap-5">
		<!-- Download VCF — moved to top -->
		<button
			onclick={handleDownload}
			class="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-display text-sm font-semibold text-base transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(212,255,0,0.25)]"
			style="opacity: {step >= 1 ? 1 : 0}; transform: translateY({step >= 1 ? 0 : -10}px);
				transition: opacity 0.7s, transform 0.7s, box-shadow 0.3s, scale 0.3s;"
		>
			<svg class="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
			</svg>
			Download VCF
		</button>

		<!-- 3D perspective wrapper -->
		<div style="perspective: 1200px;" class="w-full max-w-[380px]">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				bind:this={cardEl}
				onmousemove={handleMouseMove}
				onmouseleave={handleMouseLeave}
				class="mtg-card relative overflow-hidden rounded-[14px] transition-transform"
				style="transform: rotateX({tiltX}deg) rotateY({tiltY}deg) scale({isHovering ? 1.03 : 1});
					transition-duration: {isHovering ? '100ms' : '600ms'};"
			>
				<!-- Holographic foil shimmer -->
				{#if isHovering}
					<div
						class="pointer-events-none absolute inset-0 z-50 mix-blend-overlay transition-opacity duration-300"
						style="opacity: 0.1;
							background: conic-gradient(from {glowX * 3.6}deg at {glowX}% {glowY}%,
							rgba(255,0,0,0.4), rgba(255,136,0,0.4), rgba(255,255,0,0.4),
							rgba(0,255,0,0.4), rgba(0,136,255,0.4), rgba(136,0,255,0.4), rgba(255,0,0,0.4));"
					></div>
				{/if}

				<!-- Cursor-following glow -->
				{#if isHovering}
					<div
						class="pointer-events-none absolute inset-0 z-40 opacity-20 transition-opacity duration-300"
						style="background: radial-gradient(circle at {glowX}% {glowY}%, var(--color-accent), transparent 50%);"
					></div>
				{/if}

				<!-- Outer frame (green tinted) -->
				<div class="mtg-frame p-[7px]">
					<div class="mtg-inner-frame flex flex-col gap-[3px] rounded-lg p-[6px]">

						<!-- Name Bar -->
						<div
							class="mtg-bar mtg-bar-top flex items-center justify-between px-3 py-[6px]"
							style="opacity: {step >= 2 ? 1 : 0}; transition: opacity 0.5s;"
						>
							<span class="font-display text-[15px] font-bold tracking-tight text-text">
								{personal.name}
							</span>
							<div class="flex items-center gap-[3px]">
								<span class="mtg-mana generic">3</span>
								<span class="mtg-mana green">G</span>
								<span class="mtg-mana green">G</span>
							</div>
						</div>

						<!-- Art Window -->
						<div
							class="mtg-art overflow-hidden"
							style="opacity: {step >= 2 ? 1 : 0}; transition: opacity 0.7s 0.1s;"
						>
							<img
								src="/mtg-card-art.png"
								alt="{personal.name} — Digital Archmage"
								class="h-full w-full object-cover"
								style="object-position: center 25%;"
							/>
						</div>

						<!-- Type Line -->
						<div
							class="mtg-bar flex items-center justify-between px-3 py-[5px]"
							style="opacity: {step >= 3 ? 1 : 0}; transition: opacity 0.5s;"
						>
							<span class="font-display text-[11px] font-medium text-text-secondary">
								Legendary Creature — Human Engineer
							</span>
							<span class="mtg-rarity">◆</span>
						</div>

						<!-- Text Box -->
						<div
							class="mtg-text-box flex flex-col gap-[6px] rounded-b-md px-3 py-3"
							style="opacity: {step >= 4 ? 1 : 0}; transition: opacity 0.5s;"
						>
							<p class="font-display text-[11px] font-bold leading-tight text-accent">
								Haste, Vigilance, Hexproof
							</p>

							<p class="text-[11px] leading-[1.55] text-text-secondary">
								<span class="font-bold text-text">{'{T}'}:</span> Deploy a scalable digital
								system for target organisation. It gains +1/+1 for each project you control.
							</p>

							<p class="text-[11px] leading-[1.55] text-text-secondary">
								Whenever {personal.name.split(' ')[0]} resolves a project, create a 2/2 Client
								token with partnership.
							</p>

							<p
								class="border-t border-border/30 pt-[6px] text-[10px] italic leading-relaxed text-text-muted"
							>
								"{personal.tagline}"
							</p>

							<div class="flex flex-wrap gap-1 pt-[2px]">
								{#each topSkills as skill}
									<span
										class="rounded-full border border-accent/25 bg-accent/5 px-2 py-[2px] font-mono text-[8px] tracking-wider text-accent/70"
									>
										{skill}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Bottom info + Power/Toughness -->
				<div
					class="flex items-end justify-between px-4 pb-[6px] pt-[2px]"
					style="opacity: {step >= 5 ? 1 : 0}; transition: opacity 0.5s;"
				>
					<span class="font-mono text-[8px] tracking-wider text-text-muted/50">
						MG · 001/001 · WebFootprint · 2026
					</span>
					<div class="mtg-pt">
						<span class="font-display text-[15px] font-bold text-text">{yearsExperience}</span>
						<span class="font-display text-[13px] font-bold text-text-muted/50">/</span>
						<span class="font-display text-[15px] font-bold text-text">∞</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.mtg-card {
		background: #080808;
		border: 3px solid #1a1a1a;
		box-shadow:
			0 0 0 1px rgba(212, 255, 0, 0.04),
			0 25px 60px rgba(0, 0, 0, 0.6),
			0 0 100px rgba(212, 255, 0, 0.03);
	}

	.mtg-frame {
		background: linear-gradient(
			160deg,
			rgba(40, 80, 20, 0.6) 0%,
			rgba(20, 40, 10, 0.8) 30%,
			rgba(30, 60, 15, 0.7) 70%,
			rgba(40, 80, 20, 0.6) 100%
		);
		border-radius: 10px;
	}

	.mtg-inner-frame {
		background: linear-gradient(180deg, #0e0e0e 0%, #111 50%, #0e0e0e 100%);
	}

	.mtg-bar {
		background: linear-gradient(180deg, #1a2a16 0%, #111a0d 100%);
		border: 1px solid rgba(212, 255, 0, 0.12);
	}

	.mtg-bar-top {
		border-radius: 6px 6px 0 0;
		box-shadow: inset 0 1px 0 rgba(212, 255, 0, 0.05);
	}

	.mtg-art {
		aspect-ratio: 5 / 4;
		border: 2px solid rgba(212, 255, 0, 0.1);
		box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.6);
	}

	.mtg-text-box {
		background: linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%);
		border: 1px solid rgba(212, 255, 0, 0.08);
	}

	.mtg-mana {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		font-size: 10px;
		font-weight: 800;
		line-height: 1;
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.15);
	}

	.mtg-mana.generic {
		background: linear-gradient(135deg, #999 0%, #555 100%);
		color: #111;
	}

	.mtg-mana.green {
		background: linear-gradient(135deg, #d4ff00 0%, #7a9900 100%);
		color: #111;
	}

	.mtg-rarity {
		color: #ff6b35;
		font-size: 14px;
		text-shadow: 0 0 8px rgba(255, 107, 53, 0.6);
	}

	.mtg-pt {
		background: linear-gradient(135deg, #1a2a16 0%, #111a0d 100%);
		border: 2px solid rgba(212, 255, 0, 0.2);
		border-radius: 4px;
		padding: 1px 8px;
		display: flex;
		align-items: center;
		gap: 2px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
	}
</style>

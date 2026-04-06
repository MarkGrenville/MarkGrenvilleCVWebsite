<script lang="ts">
	interface Props {
		locationName: string;
		playerHp: number;
		playerMaxHp: number;
		playerXp: number;
		isMobile: boolean;
	}

	let { locationName, playerHp, playerMaxHp, playerXp, isMobile }: Props = $props();

	const hpPct = $derived(Math.max(0, (playerHp / playerMaxHp) * 100));
</script>

<div class="pointer-events-none absolute left-0 right-0 top-0 z-10 flex items-start justify-between p-3 md:p-4">
	<!-- Location name -->
	<div class="rounded-lg border border-[#333] bg-[#0a0a0a]/90 px-3 py-1.5 backdrop-blur-sm">
		<span class="font-mono text-[10px] tracking-wider text-[#D4FF00] uppercase">{locationName}</span>
	</div>

	<!-- HP + XP -->
	<div class="flex items-center gap-3">
		<div class="rounded-lg border border-[#333] bg-[#0a0a0a]/90 px-3 py-1.5 backdrop-blur-sm">
			<div class="flex items-center gap-2">
				<span class="font-mono text-[10px] text-[#888]">HP</span>
				<div class="h-2 w-16 overflow-hidden rounded-full bg-[#1a1a1a] md:w-20">
					<div
						class="h-full rounded-full transition-all duration-300"
						style="width: {hpPct}%; background: {hpPct > 50 ? '#4ade80' : hpPct > 20 ? '#fbbf24' : '#ef4444'}"
					></div>
				</div>
				<span class="font-mono text-[10px] text-[#888]">{playerHp}</span>
			</div>
		</div>
		<div class="rounded-lg border border-[#333] bg-[#0a0a0a]/90 px-3 py-1.5 backdrop-blur-sm">
			<span class="font-mono text-[10px] text-[#888]">XP {playerXp}</span>
		</div>
	</div>
</div>

<!-- Controls hint (desktop only) -->
{#if !isMobile}
	<div class="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
		<div class="rounded-lg border border-[#333]/50 bg-[#0a0a0a]/70 px-4 py-1.5 backdrop-blur-sm">
			<span class="font-mono text-[9px] tracking-wider text-[#444]">
				ARROWS / WASD move &middot; SPACE interact &middot; ESC close
			</span>
		</div>
	</div>
{/if}

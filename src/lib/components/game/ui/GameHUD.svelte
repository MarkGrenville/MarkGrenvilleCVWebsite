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

	function hpColor(pct: number): string {
		if (pct > 50) return '#4ade80';
		if (pct > 20) return '#fbbf24';
		return '#ef4444';
	}
</script>

<div style="position: absolute; top: 0; left: 0; right: 0; z-index: 100; display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 12px; pointer-events: none;">
	<!-- Location -->
	<div style="background: rgba(10,10,10,0.9); border: 1px solid #333; border-radius: 6px; padding: 5px 12px; backdrop-filter: blur(4px);">
		<span style="font-family: monospace; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #D4FF00;">
			{locationName}
		</span>
	</div>

	<!-- HP + XP -->
	<div style="display: flex; gap: 8px; align-items: center;">
		<div style="background: rgba(10,10,10,0.9); border: 1px solid #333; border-radius: 6px; padding: 5px 12px; display: flex; align-items: center; gap: 8px; backdrop-filter: blur(4px);">
			<span style="font-family: monospace; font-size: 10px; color: #888;">HP</span>
			<div style="width: 60px; height: 8px; background: #1a1a1a; border-radius: 4px; overflow: hidden;">
				<div style="height: 100%; border-radius: 4px; transition: width 0.3s; width: {hpPct}%; background: {hpColor(hpPct)};"></div>
			</div>
			<span style="font-family: monospace; font-size: 10px; color: #888;">{playerHp}</span>
		</div>
		<div style="background: rgba(10,10,10,0.9); border: 1px solid #333; border-radius: 6px; padding: 5px 10px; backdrop-filter: blur(4px);">
			<span style="font-family: monospace; font-size: 10px; color: #888;">XP {playerXp}</span>
		</div>
	</div>
</div>

{#if !isMobile}
	<div style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); z-index: 100; pointer-events: none;">
		<div style="background: rgba(10,10,10,0.7); border: 1px solid rgba(51,51,51,0.5); border-radius: 6px; padding: 4px 16px; backdrop-filter: blur(4px);">
			<span style="font-family: monospace; font-size: 9px; letter-spacing: 0.1em; color: #555;">
				ARROWS move · SPACE interact · ESC close
			</span>
		</div>
	</div>
{/if}

<script lang="ts">
	import type { BattleState, SkillAttack } from '../engine/types';
	import { drawBattleEnemy, drawPlayerBattleSprite } from '../engine/sprites';
	import { onMount } from 'svelte';

	interface Props {
		battle: BattleState;
		onSkill: (skill: SkillAttack) => void;
		onFlee: () => void;
		onEnd: () => void;
	}

	let { battle, onSkill, onFlee, onEnd }: Props = $props();

	let battleCanvas: HTMLCanvasElement;
	let showSkills = $state(false);
	let canvasReady = $state(false);

	onMount(() => {
		canvasReady = true;
	});

	$effect(() => {
		if (!canvasReady || !battleCanvas) return;
		const ctx = battleCanvas.getContext('2d');
		if (!ctx) return;
		const w = battleCanvas.width;
		const h = battleCanvas.height;

		ctx.clearRect(0, 0, w, h);

		const gradient = ctx.createLinearGradient(0, 0, 0, h);
		gradient.addColorStop(0, '#0a0a1a');
		gradient.addColorStop(1, '#050505');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, w, h);

		ctx.strokeStyle = '#1a1a2a';
		ctx.lineWidth = 0.5;
		for (let i = 0; i < w; i += 20) {
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i, h);
			ctx.stroke();
		}
		for (let i = 0; i < h; i += 20) {
			ctx.beginPath();
			ctx.moveTo(0, i);
			ctx.lineTo(w, i);
			ctx.stroke();
		}

		let enemyX = w * 0.65;
		let enemyY = h * 0.35;
		if (battle.shakeEnemy) {
			enemyX += (Math.random() - 0.5) * 8;
			enemyY += (Math.random() - 0.5) * 8;
		}
		drawBattleEnemy(ctx, battle.enemy.name, battle.enemy.spriteColor, enemyX, enemyY, Math.min(w, h) * 0.35);

		let playerX = w * 0.25;
		let playerY = h * 0.7;
		if (battle.shakePlayer) {
			playerX += (Math.random() - 0.5) * 8;
			playerY += (Math.random() - 0.5) * 8;
		}
		drawPlayerBattleSprite(ctx, playerX, playerY, Math.min(w, h) * 0.5);
	});

	function handleSkillSelect(skill: SkillAttack) {
		showSkills = false;
		onSkill(skill);
	}

	const enemyHpPct = $derived(Math.max(0, (battle.enemyHp / battle.enemyMaxHp) * 100));
	const playerHpPct = $derived(Math.max(0, (battle.playerHp / battle.playerMaxHp) * 100));
	const latestLog = $derived(battle.log[battle.log.length - 1] || '');
	const isOver = $derived(battle.turn === 'victory' || battle.turn === 'defeat');
</script>

<div class="absolute inset-0 z-40 flex flex-col bg-[#050505]">
	<!-- Enemy info -->
	<div class="flex items-center justify-between px-4 pt-3 md:px-8 md:pt-4">
		<div class="w-48 md:w-56">
			<div class="mb-1 font-mono text-xs font-bold text-[#FAFAFA]">{battle.enemy.name}</div>
			<div class="h-3 w-full overflow-hidden rounded-full bg-[#1a1a1a]">
				<div
					class="h-full rounded-full transition-all duration-500"
					style="width: {enemyHpPct}%; background: {enemyHpPct > 50 ? '#4ade80' : enemyHpPct > 20 ? '#fbbf24' : '#ef4444'}"
				></div>
			</div>
			<div class="mt-0.5 font-mono text-[10px] text-[#888]">HP {battle.enemyHp}/{battle.enemyMaxHp}</div>
		</div>
	</div>

	<!-- Battle canvas -->
	<div class="relative flex flex-1 items-center justify-center">
		<canvas bind:this={battleCanvas} width={400} height={240} class="h-full w-full" style="image-rendering: pixelated;"></canvas>
	</div>

	<!-- Player info -->
	<div class="flex items-center justify-end px-4 md:px-8">
		<div class="w-48 md:w-56">
			<div class="mb-1 font-mono text-xs font-bold text-[#D4FF00]">MARK</div>
			<div class="h-3 w-full overflow-hidden rounded-full bg-[#1a1a1a]">
				<div
					class="h-full rounded-full transition-all duration-500"
					style="width: {playerHpPct}%; background: {playerHpPct > 50 ? '#4ade80' : playerHpPct > 20 ? '#fbbf24' : '#ef4444'}"
				></div>
			</div>
			<div class="mt-0.5 font-mono text-[10px] text-[#888]">HP {battle.playerHp}/{battle.playerMaxHp} | XP {battle.playerXp}</div>
		</div>
	</div>

	<!-- Log -->
	<div class="border-t border-[#333] bg-[#0a0a0a] px-4 py-2 md:px-8">
		<p class="font-mono text-xs text-[#FAFAFA] md:text-sm">{latestLog}</p>
	</div>

	<!-- Actions -->
	<div class="border-t border-[#333] bg-[#0a0a0a] p-3 md:p-4">
		{#if isOver}
			<button
				onclick={onEnd}
				class="w-full rounded-lg bg-[#D4FF00] px-4 py-3 font-mono text-sm font-bold text-[#050505] transition-transform hover:scale-[1.02] active:scale-95"
			>
				{battle.turn === 'victory' ? 'VICTORY! Continue' : 'Try Again...'}
			</button>
		{:else if showSkills}
			<div class="grid grid-cols-2 gap-2">
				{#each battle.playerSkills.slice(0, 4) as skill}
					<button
						onclick={() => handleSkillSelect(skill)}
						disabled={battle.turn !== 'player' || battle.animating}
						class="rounded-lg border border-[#333] bg-[#1a1a1a] px-3 py-2 text-left font-mono text-xs text-[#FAFAFA] transition-colors hover:border-[#D4FF00] hover:text-[#D4FF00] disabled:opacity-40"
					>
						<span class="block font-bold">{skill.name}</span>
						<span class="text-[10px] text-[#888]">PWR {skill.power}</span>
					</button>
				{/each}
			</div>
			<button
				onclick={() => showSkills = false}
				class="mt-2 w-full font-mono text-[10px] text-[#888] hover:text-[#D4FF00]"
			>
				BACK
			</button>
		{:else}
			<div class="grid grid-cols-2 gap-2">
				<button
					onclick={() => showSkills = true}
					disabled={battle.turn !== 'player' || battle.animating}
					class="rounded-lg border border-[#D4FF00] bg-[#D4FF00]/10 px-4 py-3 font-mono text-sm font-bold text-[#D4FF00] transition-colors hover:bg-[#D4FF00]/20 disabled:opacity-40"
				>
					FIGHT
				</button>
				<button
					onclick={onFlee}
					disabled={battle.turn !== 'player' || battle.animating}
					class="rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-3 font-mono text-sm font-bold text-[#FAFAFA] transition-colors hover:border-[#888] disabled:opacity-40"
				>
					RUN
				</button>
			</div>
		{/if}
	</div>
</div>

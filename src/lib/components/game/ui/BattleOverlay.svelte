<script lang="ts">
	import type { BattleState, SkillAttack } from '../engine/types';

	interface Props {
		battle: BattleState;
		onSkill: (skill: SkillAttack) => void;
		onFlee: () => void;
		onEnd: () => void;
	}

	let { battle, onSkill, onFlee, onEnd }: Props = $props();

	let showSkills = $state(false);

	const enemyHpPct = $derived(Math.max(0, (battle.enemyHp / battle.enemyMaxHp) * 100));
	const playerHpPct = $derived(Math.max(0, (battle.playerHp / battle.playerMaxHp) * 100));
	const isOver = $derived(battle.turn === 'victory' || battle.turn === 'defeat');
	const isPlayerTurn = $derived(battle.turn === 'player' && !battle.animating);

	function handleSkillSelect(skill: SkillAttack) {
		showSkills = false;
		onSkill(skill);
	}

	function hpColor(pct: number): string {
		if (pct > 50) return '#4ade80';
		if (pct > 20) return '#fbbf24';
		return '#ef4444';
	}
</script>

<div style="
	position: fixed;
	inset: 0;
	z-index: 99998;
	background: #050505;
	display: flex;
	flex-direction: column;
	font-family: 'Courier New', Courier, monospace;
">
	<!-- Enemy section -->
	<div style="padding: 16px 20px 8px; flex-shrink: 0;">
		<div style="max-width: 280px;">
			<div style="color: #FAFAFA; font-size: 16px; font-weight: bold; margin-bottom: 6px;">
				{battle.enemy.name}
			</div>
			<div style="background: #1a1a1a; border-radius: 10px; height: 14px; overflow: hidden; border: 1px solid #333;">
				<div style="height: 100%; border-radius: 10px; transition: width 0.5s; width: {enemyHpPct}%; background: {hpColor(enemyHpPct)};"></div>
			</div>
			<div style="color: #888; font-size: 11px; margin-top: 3px;">HP {battle.enemyHp} / {battle.enemyMaxHp}</div>
		</div>
	</div>

	<!-- Battle arena -->
	<div style="flex: 1; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; min-height: 150px;">
		<!-- Battle grid background -->
		<div style="position: absolute; inset: 0; opacity: 0.15;">
			{#each Array(20) as _, i}
				<div style="position: absolute; left: {i * 5}%; top: 0; bottom: 0; width: 1px; background: #D4FF00;"></div>
			{/each}
			{#each Array(10) as _, i}
				<div style="position: absolute; top: {i * 10}%; left: 0; right: 0; height: 1px; background: #D4FF00;"></div>
			{/each}
		</div>

		<!-- Enemy sprite -->
		<div style="
			position: absolute;
			right: 15%;
			top: 20%;
			font-size: 64px;
			filter: {battle.shakeEnemy ? 'brightness(2)' : 'none'};
			transform: {battle.shakeEnemy ? 'translateX(4px)' : 'none'};
			transition: filter 0.2s, transform 0.1s;
		">
			{#if battle.enemy.name === 'Bug Swarm'}
				<div style="color: {battle.enemy.spriteColor}; text-shadow: 0 0 20px {battle.enemy.spriteColor};">🐛🐛🐛</div>
			{:else if battle.enemy.name === 'Legacy Codebase'}
				<div style="color: {battle.enemy.spriteColor}; text-shadow: 0 0 20px {battle.enemy.spriteColor};">
					<div style="font-size: 48px;">📟</div>
					<div style="font-size: 10px; color: #ff4444; text-align: center;">DEPRECATED</div>
				</div>
			{:else if battle.enemy.name === 'Scope Creep'}
				<div style="color: {battle.enemy.spriteColor}; text-shadow: 0 0 20px {battle.enemy.spriteColor};">🐙</div>
			{:else if battle.enemy.name === 'Deadline Dragon'}
				<div style="color: {battle.enemy.spriteColor}; text-shadow: 0 0 20px {battle.enemy.spriteColor};">🐉</div>
			{:else}
				<div style="color: {battle.enemy.spriteColor}; text-shadow: 0 0 20px {battle.enemy.spriteColor};">👾</div>
			{/if}
		</div>

		<!-- Player sprite -->
		<div style="
			position: absolute;
			left: 15%;
			bottom: 15%;
			font-size: 52px;
			filter: {battle.shakePlayer ? 'brightness(2)' : 'none'};
			transform: {battle.shakePlayer ? 'translateX(-4px)' : 'none'};
			transition: filter 0.2s, transform 0.1s;
		">
			<div>🧑‍💻</div>
			<div style="font-size: 10px; color: #D4FF00; text-align: center; font-weight: bold;">MARK</div>
		</div>
	</div>

	<!-- Player HP -->
	<div style="padding: 8px 20px; flex-shrink: 0;">
		<div style="max-width: 280px; margin-left: auto;">
			<div style="color: #D4FF00; font-size: 14px; font-weight: bold; margin-bottom: 4px; text-align: right;">MARK</div>
			<div style="background: #1a1a1a; border-radius: 10px; height: 14px; overflow: hidden; border: 1px solid #333;">
				<div style="height: 100%; border-radius: 10px; transition: width 0.5s; width: {playerHpPct}%; background: {hpColor(playerHpPct)};"></div>
			</div>
			<div style="color: #888; font-size: 11px; margin-top: 3px; text-align: right;">
				HP {battle.playerHp} / {battle.playerMaxHp} &nbsp;|&nbsp; XP {battle.playerXp}
			</div>
		</div>
	</div>

	<!-- Battle log -->
	<div style="border-top: 1px solid #333; background: #0a0a0a; padding: 10px 20px; flex-shrink: 0;">
		<div style="color: #FAFAFA; font-size: 13px; min-height: 1.5em;">
			{battle.log[battle.log.length - 1] || ''}
		</div>
		{#if battle.log.length > 1}
			<div style="color: #555; font-size: 11px; margin-top: 2px;">
				{battle.log[battle.log.length - 2] || ''}
			</div>
		{/if}
	</div>

	<!-- Actions -->
	<div style="border-top: 1px solid #333; background: #0a0a0a; padding: 12px 16px; flex-shrink: 0;">
		{#if isOver}
			<button
				onclick={onEnd}
				style="
					width: 100%;
					padding: 14px;
					background: #D4FF00;
					color: #050505;
					border: none;
					border-radius: 8px;
					font-family: 'Courier New', monospace;
					font-size: 15px;
					font-weight: bold;
					cursor: pointer;
				"
			>
				{battle.turn === 'victory' ? '🎉 VICTORY! Continue' : '💀 Defeated... Try Again'}
			</button>
		{:else if showSkills}
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
				{#each battle.playerSkills.slice(0, 4) as skill}
					<button
						onclick={() => handleSkillSelect(skill)}
						disabled={!isPlayerTurn}
						style="
							padding: 10px 12px;
							background: {isPlayerTurn ? '#1a1a1a' : '#111'};
							color: {isPlayerTurn ? '#FAFAFA' : '#555'};
							border: 1px solid {isPlayerTurn ? '#444' : '#222'};
							border-radius: 8px;
							font-family: 'Courier New', monospace;
							font-size: 12px;
							text-align: left;
							cursor: {isPlayerTurn ? 'pointer' : 'not-allowed'};
						"
					>
						<div style="font-weight: bold;">{skill.name}</div>
						<div style="color: #888; font-size: 10px; margin-top: 2px;">PWR {skill.power} • {skill.category}</div>
					</button>
				{/each}
			</div>
			<button
				onclick={() => showSkills = false}
				style="width: 100%; margin-top: 8px; padding: 6px; background: none; border: none; color: #888; font-family: monospace; font-size: 11px; cursor: pointer;"
			>
				← BACK
			</button>
		{:else}
			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
				<button
					onclick={() => showSkills = true}
					disabled={!isPlayerTurn}
					style="
						padding: 14px;
						background: {isPlayerTurn ? 'rgba(212,255,0,0.15)' : '#111'};
						color: {isPlayerTurn ? '#D4FF00' : '#555'};
						border: 2px solid {isPlayerTurn ? '#D4FF00' : '#222'};
						border-radius: 8px;
						font-family: 'Courier New', monospace;
						font-size: 15px;
						font-weight: bold;
						cursor: {isPlayerTurn ? 'pointer' : 'not-allowed'};
					"
				>
					⚔️ FIGHT
				</button>
				<button
					onclick={onFlee}
					disabled={!isPlayerTurn}
					style="
						padding: 14px;
						background: {isPlayerTurn ? '#1a1a1a' : '#111'};
						color: {isPlayerTurn ? '#FAFAFA' : '#555'};
						border: 2px solid {isPlayerTurn ? '#333' : '#222'};
						border-radius: 8px;
						font-family: 'Courier New', monospace;
						font-size: 15px;
						font-weight: bold;
						cursor: {isPlayerTurn ? 'pointer' : 'not-allowed'};
					"
				>
					🏃 RUN
				</button>
			</div>
			{#if !isPlayerTurn && !isOver}
				<div style="text-align: center; margin-top: 8px; color: #888; font-size: 11px; animation: pulse 1s infinite;">
					Enemy is attacking...
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}
</style>

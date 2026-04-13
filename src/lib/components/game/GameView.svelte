<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { GameEngine } from './engine/GameEngine';
	import type { GameEvent } from './engine/GameEngine';
	import type { BattleState, SkillAttack } from './engine/types';
	import DialogBox from './ui/DialogBox.svelte';
	import BattleOverlay from './ui/BattleOverlay.svelte';
	import MobileControls from './ui/MobileControls.svelte';
	import GameHUD from './ui/GameHUD.svelte';
	import { Direction } from './engine/types';

	let canvasEl: HTMLCanvasElement;
	let containerEl: HTMLDivElement;
	let engine: GameEngine | null = null;

	let dialog = $state<{ lines: string[]; currentLine: number } | null>(null);
	let battle = $state<BattleState | null>(null);
	let locationName = $state('Tech Campus');
	let playerHp = $state(100);
	let playerMaxHp = $state(100);
	let playerXp = $state(0);
	let isMobile = $state(false);
	let mounted = $state(false);
	let facingInteraction = $state<string | null>(null);

	function handleGameEvent(event: GameEvent) {
		switch (event.type) {
			case 'dialog':
				dialog = event.data as typeof dialog;
				break;
			case 'battle_start':
			case 'battle_update':
				battle = { ...(event.data as BattleState) };
				break;
			case 'battle_end':
				battle = null;
				syncStateFromEngine();
				break;
			case 'map_change':
				locationName = event.data as string;
				syncStateFromEngine();
				break;
			case 'state_update': {
				const d = event.data as { facingInteraction?: string | null } | undefined;
				if (d && 'facingInteraction' in d) {
					facingInteraction = d.facingInteraction ?? null;
				}
				syncStateFromEngine();
				break;
			}
		}
	}

	function syncStateFromEngine() {
		if (!engine) return;
		const s = engine.getState();
		playerHp = s.playerHp;
		playerMaxHp = s.playerMaxHp;
		playerXp = s.playerXp;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!engine) return;
		if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
			e.preventDefault();
			engine.handleKeyDown(e.key);
		}
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			if (dialog) {
				engine.dismissDialog();
			} else {
				engine.pressInteract();
			}
		}
		if (e.key === 'Escape') {
			e.preventDefault();
			if (dialog) {
				engine.dismissDialog();
			}
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		if (!engine) return;
		engine.handleKeyUp(e.key);
	}

	function handleResize() {
		if (!engine || !containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		engine.resize(rect.width, rect.height);
		isMobile = 'ontouchstart' in window || window.innerWidth < 768;
		engine.setMobile(isMobile);
	}

	function handleDirection(dir: Direction | null) {
		if (engine) engine.setInputDirection(dir);
	}

	function handleInteract() {
		if (!engine) return;
		if (dialog) {
			engine.dismissDialog();
		} else {
			engine.pressInteract();
		}
	}

	function handleBattleSkill(skill: SkillAttack) {
		if (engine) engine.handleBattleSkill(skill);
	}

	function handleBattleFlee() {
		if (engine) engine.handleBattleFlee();
	}

	function handleBattleEnd() {
		if (engine) engine.endBattle();
	}

	function handleDialogDismiss() {
		if (engine) engine.dismissDialog();
	}

	onMount(() => {
		mounted = true;
		isMobile = 'ontouchstart' in window || window.innerWidth < 768;

		engine = new GameEngine(canvasEl, handleGameEvent);
		handleResize();
		engine.start();

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		window.addEventListener('resize', handleResize);

		canvasEl.focus();
	});

	onDestroy(() => {
		if (engine) engine.stop();
		if (typeof window !== 'undefined') {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
			window.removeEventListener('resize', handleResize);
		}
	});
</script>

<div
	bind:this={containerEl}
	class="relative h-[calc(100dvh-4rem)] w-full overflow-hidden bg-[#050505] lg:h-screen"
	style="touch-action: none;"
>
	<canvas
		bind:this={canvasEl}
		class="absolute inset-0 z-0 block h-full w-full"
		style="image-rendering: pixelated;"
		tabindex="0"
	></canvas>

	{#if mounted}
		{#if !battle}
			<GameHUD
				{locationName}
				{playerHp}
				{playerMaxHp}
				{playerXp}
				{isMobile}
			/>
		{/if}

		{#if facingInteraction && !dialog && !battle && !isMobile}
			<div style="
				position: absolute;
				bottom: 40px;
				left: 50%;
				transform: translateX(-50%);
				z-index: 200;
				pointer-events: none;
			">
				<div style="
					background: rgba(10, 10, 10, 0.9);
					border: 1px solid #D4FF00;
					border-radius: 6px;
					padding: 6px 16px;
					font-family: 'Courier New', monospace;
					font-size: 12px;
					color: #D4FF00;
					white-space: nowrap;
					animation: bounce-prompt 1s ease-in-out infinite;
				">
					{facingInteraction === 'npc' ? '💬' : '📋'} Press SPACE to {facingInteraction === 'npc' ? 'talk' : 'read'}
				</div>
			</div>
		{/if}

		{#if facingInteraction && !dialog && !battle && isMobile}
			<div style="
				position: absolute;
				bottom: 200px;
				left: 50%;
				transform: translateX(-50%);
				z-index: 200;
				pointer-events: none;
			">
				<div style="
					background: rgba(10, 10, 10, 0.9);
					border: 1px solid #D4FF00;
					border-radius: 6px;
					padding: 6px 16px;
					font-family: 'Courier New', monospace;
					font-size: 12px;
					color: #D4FF00;
					white-space: nowrap;
				">
					{facingInteraction === 'npc' ? '💬' : '📋'} Tap A to {facingInteraction === 'npc' ? 'talk' : 'read'}
				</div>
			</div>
		{/if}

		{#if dialog && !battle}
			<DialogBox
				lines={dialog.lines}
				currentLine={dialog.currentLine}
				onDismiss={handleDialogDismiss}
			/>
		{/if}

		{#if battle}
			<BattleOverlay
				{battle}
				onSkill={handleBattleSkill}
				onFlee={handleBattleFlee}
				onEnd={handleBattleEnd}
			/>
		{/if}

		{#if isMobile && !battle}
			<MobileControls
				onDirection={handleDirection}
				onInteract={handleInteract}
			/>
		{/if}
	{/if}
</div>

<style>
	@keyframes bounce-prompt {
		0%, 100% { transform: translateX(-50%) translateY(0); }
		50% { transform: translateX(-50%) translateY(-4px); }
	}
</style>

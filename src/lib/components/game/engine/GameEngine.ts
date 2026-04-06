import { Direction } from './types';
import type { GameState, Camera, InteractionPoint } from './types';
import { createPlayerState, tryMove, updateMovement } from './Player';
import { initMaps, getMap, updateCamera, renderWorld, updateNPCs, checkInteraction, checkStandingInteraction, shouldTriggerEncounter } from './World';
import { createBattleState, getRandomEnemy, playerAttack, enemyAttack, attemptFlee } from './Battle';
import type { SkillAttack } from './types';
import { clearTileCache } from './sprites';

export type GameEventCallback = (event: GameEvent) => void;

export interface GameEvent {
	type: 'dialog' | 'battle_start' | 'battle_update' | 'battle_end' | 'map_change' | 'state_update';
	data?: unknown;
}

export class GameEngine {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private state: GameState;
	private camera: Camera = { x: 0, y: 0 };
	private animFrameId: number = 0;
	private lastTime: number = 0;
	private keys: Set<string> = new Set();
	private eventCallback: GameEventCallback;
	private destroyed = false;

	constructor(canvas: HTMLCanvasElement, callback: GameEventCallback) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d')!;
		this.eventCallback = callback;

		initMaps();

		const playerState = createPlayerState();
		const startMap = getMap('overworld');
		playerState.player.pos = { ...startMap.spawnPos };
		playerState.moveTarget = { ...startMap.spawnPos };

		this.state = {
			currentMap: 'overworld',
			...playerState,
			dialog: null,
			battle: null,
			transitioning: false,
			transitionAlpha: 0,
			transitionTarget: null,
			transitionSpawn: null,
			playerHp: 100,
			playerMaxHp: 100,
			playerXp: 0,
			defeatedBosses: [],
			isMobile: false,
			inputDirection: null,
			interactPressed: false
		};

		this.ctx.imageSmoothingEnabled = false;
	}

	start(): void {
		this.lastTime = performance.now();
		this.loop(this.lastTime);
	}

	stop(): void {
		this.destroyed = true;
		if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
		clearTileCache();
	}

	getState(): GameState {
		return this.state;
	}

	setMobile(isMobile: boolean): void {
		this.state.isMobile = isMobile;
	}

	handleKeyDown(key: string): void {
		this.keys.add(key);
		if (!this.state.moving && !this.state.dialog && !this.state.battle?.active && !this.state.transitioning) {
			const dir = this.keyToDirection(key);
			if (dir) {
				const map = getMap(this.state.currentMap);
				tryMove(this.state, dir, map);
			}
		}
	}

	handleKeyUp(key: string): void {
		this.keys.delete(key);
	}

	private keyToDirection(key: string): Direction | null {
		if (key === 'ArrowUp' || key === 'w' || key === 'W') return Direction.UP;
		if (key === 'ArrowDown' || key === 's' || key === 'S') return Direction.DOWN;
		if (key === 'ArrowLeft' || key === 'a' || key === 'A') return Direction.LEFT;
		if (key === 'ArrowRight' || key === 'd' || key === 'D') return Direction.RIGHT;
		return null;
	}

	setInputDirection(dir: Direction | null): void {
		this.state.inputDirection = dir;
	}

	pressInteract(): void {
		this.state.interactPressed = true;
	}

	handleBattleSkill(skill: SkillAttack): void {
		if (!this.state.battle || this.state.battle.turn !== 'player' || this.state.battle.animating) return;

		playerAttack(this.state.battle, skill);
		this.state.battle.shakeEnemy = true;

		setTimeout(() => {
			if (!this.state.battle) return;
			this.state.battle.shakeEnemy = false;
			this.state.battle.animating = false;

			if (this.state.battle.turn === 'enemy') {
				setTimeout(() => {
					if (!this.state.battle) return;
					enemyAttack(this.state.battle);
					this.state.battle.shakePlayer = true;

					setTimeout(() => {
						if (!this.state.battle) return;
						this.state.battle.shakePlayer = false;
						this.state.battle.animating = false;
						this.emitEvent({ type: 'battle_update', data: this.state.battle });
					}, 400);

					this.emitEvent({ type: 'battle_update', data: this.state.battle });
				}, 600);
			} else {
				this.emitEvent({ type: 'battle_update', data: this.state.battle });
			}

			this.emitEvent({ type: 'battle_update', data: this.state.battle });
		}, 400);
	}

	handleBattleFlee(): void {
		if (!this.state.battle || this.state.battle.turn !== 'player' || this.state.battle.animating) return;

		const fled = attemptFlee(this.state.battle);
		if (fled) {
			this.endBattle();
		} else {
			setTimeout(() => {
				if (!this.state.battle) return;
				enemyAttack(this.state.battle);
				this.state.battle.shakePlayer = true;

				setTimeout(() => {
					if (!this.state.battle) return;
					this.state.battle.shakePlayer = false;
					this.state.battle.animating = false;
					this.emitEvent({ type: 'battle_update', data: this.state.battle });
				}, 400);

				this.emitEvent({ type: 'battle_update', data: this.state.battle });
			}, 600);
		}
		this.emitEvent({ type: 'battle_update', data: this.state.battle });
	}

	endBattle(): void {
		if (this.state.battle) {
			this.state.playerHp = this.state.battle.playerHp;
			this.state.playerXp = this.state.battle.playerXp;
			this.state.defeatedBosses = [...this.state.battle.defeatedBosses];
			if (this.state.battle.turn === 'defeat') {
				this.state.playerHp = this.state.playerMaxHp;
			}
		}
		this.state.battle = null;
		this.emitEvent({ type: 'battle_end' });
	}

	dismissDialog(): void {
		if (!this.state.dialog) return;
		if (this.state.dialog.currentLine < this.state.dialog.lines.length - 1) {
			this.state.dialog.currentLine++;
			this.emitEvent({ type: 'dialog', data: this.state.dialog });
		} else {
			this.state.dialog = null;
			this.keys.clear();
			this.state.inputDirection = null;
			this.emitEvent({ type: 'dialog', data: null });
		}
	}

	resize(width: number, height: number): void {
		const dpr = window.devicePixelRatio || 1;
		this.canvas.width = width * dpr;
		this.canvas.height = height * dpr;
		this.canvas.style.width = width + 'px';
		this.canvas.style.height = height + 'px';
		this.ctx.scale(dpr, dpr);
		this.ctx.imageSmoothingEnabled = false;
	}

	private loop = (time: number): void => {
		if (this.destroyed) return;
		const dt = Math.min(time - this.lastTime, 50);
		this.lastTime = time;

		this.update(dt, time);
		this.render(time);

		this.animFrameId = requestAnimationFrame(this.loop);
	};

	private update(dt: number, time: number): void {
		if (this.state.transitioning) {
			this.updateTransition(dt);
			return;
		}

		if (this.state.battle?.active) return;

		if (this.state.interactPressed) {
			this.state.interactPressed = false;
			this.handleInteract();
		}

		if (this.state.dialog) return;

		const dir = this.getInputDirection();
		if (dir) {
			const map = getMap(this.state.currentMap);
			tryMove(this.state, dir, map);
		}

		const moveCompleted = updateMovement(this.state, dt);

		if (moveCompleted) {
			const standing = checkStandingInteraction(this.state);
			if (standing) {
				this.handleStandingInteraction(standing);
			} else if (shouldTriggerEncounter(this.state)) {
				this.startBattle();
			}
		}

		updateNPCs(this.state, dt);
		const dpr = window.devicePixelRatio || 1;
		const scale = this.getScale();
		updateCamera(this.state, this.camera, this.canvas.width / dpr / scale, this.canvas.height / dpr / scale);
	}

	getScale(): number {
		const dpr = window.devicePixelRatio || 1;
		const h = this.canvas.height / dpr;
		const baseH = 704;
		return Math.max(1, Math.min(2, h / baseH * 1.2));
	}

	private render(time: number): void {
		const dpr = window.devicePixelRatio || 1;
		const w = this.canvas.width / dpr;
		const h = this.canvas.height / dpr;
		const scale = this.getScale();

		this.ctx.save();
		this.ctx.scale(scale, scale);
		renderWorld(this.ctx, this.state, this.camera, w / scale, h / scale, time);
		this.ctx.restore();
	}

	private getInputDirection(): Direction | null {
		if (this.state.inputDirection) return this.state.inputDirection;
		if (this.keys.has('ArrowUp') || this.keys.has('w') || this.keys.has('W')) return Direction.UP;
		if (this.keys.has('ArrowDown') || this.keys.has('s') || this.keys.has('S')) return Direction.DOWN;
		if (this.keys.has('ArrowLeft') || this.keys.has('a') || this.keys.has('A')) return Direction.LEFT;
		if (this.keys.has('ArrowRight') || this.keys.has('d') || this.keys.has('D')) return Direction.RIGHT;
		return null;
	}

	private handleInteract(): void {
		if (this.state.dialog) {
			this.dismissDialog();
			return;
		}

		const interaction = checkInteraction(this.state);
		if (!interaction) return;

		if (interaction.type === 'sign' || interaction.type === 'npc') {
			if (interaction.data) {
				this.state.dialog = { lines: interaction.data, currentLine: 0 };
				this.emitEvent({ type: 'dialog', data: this.state.dialog });
			}
		} else if (interaction.type === 'door') {
			this.startTransition(interaction.target!, interaction.spawnPos!);
		}
	}

	private handleStandingInteraction(interaction: InteractionPoint): void {
		if (interaction.type === 'door' || interaction.type === 'exit') {
			this.startTransition(interaction.target!, interaction.spawnPos!);
		}
	}

	private startTransition(target: string, spawnPos: { x: number; y: number }): void {
		this.state.transitioning = true;
		this.state.transitionAlpha = 0;
		this.state.transitionTarget = target;
		this.state.transitionSpawn = spawnPos;
	}

	private updateTransition(dt: number): void {
		if (this.state.transitionAlpha < 1) {
			this.state.transitionAlpha = Math.min(1, this.state.transitionAlpha + dt * 0.004);
		} else if (this.state.transitionTarget) {
			const target = this.state.transitionTarget;
			const spawn = this.state.transitionSpawn!;

			this.state.currentMap = target;
			this.state.player.pos = { ...spawn };
			this.state.moveTarget = { ...spawn };
			this.state.moving = false;
			this.state.moveProgress = 0;
			this.state.transitionTarget = null;
			this.state.transitionSpawn = null;

			this.keys.clear();
			this.state.inputDirection = null;

			const loadedMap = getMap(target);
			const dpr2 = window.devicePixelRatio || 1;
			const scale2 = this.getScale();
			const canvasW = this.canvas.width / dpr2 / scale2;
			const canvasH = this.canvas.height / dpr2 / scale2;
			this.camera.x = Math.max(0, spawn.x * 32 - canvasW / 2);
			this.camera.y = Math.max(0, spawn.y * 32 - canvasH / 2);

			this.emitEvent({ type: 'map_change', data: loadedMap.name });
		} else {
			this.state.transitionAlpha = Math.max(0, this.state.transitionAlpha - dt * 0.004);
			if (this.state.transitionAlpha <= 0) {
				this.state.transitioning = false;
			}
		}
	}

	private startBattle(): void {
		const enemy = getRandomEnemy();
		this.state.battle = createBattleState(
			enemy,
			this.state.playerHp,
			this.state.playerMaxHp,
			this.state.playerXp,
			this.state.defeatedBosses
		);
		this.emitEvent({ type: 'battle_start', data: this.state.battle });
	}

	private emitEvent(event: GameEvent): void {
		this.eventCallback(event);
	}
}

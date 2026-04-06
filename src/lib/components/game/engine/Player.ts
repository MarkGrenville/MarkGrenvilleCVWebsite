import { Direction, TILE_SIZE, PLAYER_SPEED } from './types';
import type { GameState, MapData, Position } from './types';

export function createPlayerState(): Pick<GameState, 'player' | 'moving' | 'moveProgress' | 'moveTarget'> {
	return {
		player: {
			pos: { x: 15, y: 12 },
			direction: Direction.DOWN,
			animFrame: 0,
			animTimer: 0
		},
		moving: false,
		moveProgress: 0,
		moveTarget: { x: 15, y: 12 }
	};
}

export function tryMove(
	state: GameState,
	direction: Direction,
	map: MapData
): boolean {
	if (state.moving || state.dialog || state.battle?.active || state.transitioning) return false;

	state.player.direction = direction;

	const dx = direction === Direction.LEFT ? -1 : direction === Direction.RIGHT ? 1 : 0;
	const dy = direction === Direction.UP ? -1 : direction === Direction.DOWN ? 1 : 0;
	const nx = state.player.pos.x + dx;
	const ny = state.player.pos.y + dy;

	if (nx < 0 || ny < 0 || nx >= map.width || ny >= map.height) return false;
	if (map.collisions[ny][nx]) return false;

	for (const npc of map.npcs) {
		if (npc.pos.x === nx && npc.pos.y === ny) return false;
	}

	state.moving = true;
	state.moveProgress = 0;
	state.moveTarget = { x: nx, y: ny };
	return true;
}

export function updateMovement(state: GameState, dt: number): boolean {
	if (!state.moving) return false;

	state.moveProgress += PLAYER_SPEED * dt * 0.06;
	state.player.animTimer += dt;

	if (state.player.animTimer > 200) {
		state.player.animFrame = (state.player.animFrame + 1) % 4;
		state.player.animTimer = 0;
	}

	if (state.moveProgress >= 1) {
		state.player.pos.x = state.moveTarget.x;
		state.player.pos.y = state.moveTarget.y;
		state.moving = false;
		state.moveProgress = 0;
		return true;
	}
	return false;
}

export function getPlayerScreenPos(state: GameState): Position {
	if (state.moving) {
		const sx = state.player.pos.x + (state.moveTarget.x - state.player.pos.x) * state.moveProgress;
		const sy = state.player.pos.y + (state.moveTarget.y - state.player.pos.y) * state.moveProgress;
		return { x: sx * TILE_SIZE, y: sy * TILE_SIZE };
	}
	return { x: state.player.pos.x * TILE_SIZE, y: state.player.pos.y * TILE_SIZE };
}

export function getFacingTile(state: GameState): Position {
	const dir = state.player.direction;
	return {
		x: state.player.pos.x + (dir === Direction.LEFT ? -1 : dir === Direction.RIGHT ? 1 : 0),
		y: state.player.pos.y + (dir === Direction.UP ? -1 : dir === Direction.DOWN ? 1 : 0)
	};
}

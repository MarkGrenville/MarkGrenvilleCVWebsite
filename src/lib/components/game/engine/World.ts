import { Direction, TileType, TILE_SIZE, ENCOUNTER_CHANCE } from './types';
import type { GameState, MapData, InteractionPoint, Camera, Position } from './types';
import { drawTile, drawPlayer, drawNPC, drawBuildingExterior } from './sprites';
import { getPlayerScreenPos, getFacingTile } from './Player';
import { getAllMaps } from './maps';

let maps: Record<string, MapData>;

export function initMaps(): Record<string, MapData> {
	maps = getAllMaps();
	return maps;
}

export function getMap(name: string): MapData {
	if (!maps) initMaps();
	return maps[name];
}

function getCameraTarget(state: GameState, canvasW: number, canvasH: number): { x: number; y: number } {
	const playerScreen = getPlayerScreenPos(state);
	const map = getMap(state.currentMap);
	const mapW = map.width * TILE_SIZE;
	const mapH = map.height * TILE_SIZE;

	let x: number;
	let y: number;

	if (mapW <= canvasW) {
		x = -(canvasW - mapW) / 2;
	} else {
		x = Math.max(0, Math.min(mapW - canvasW, playerScreen.x - canvasW / 2 + TILE_SIZE / 2));
	}

	if (mapH <= canvasH) {
		y = -(canvasH - mapH) / 2;
	} else {
		y = Math.max(0, Math.min(mapH - canvasH, playerScreen.y - canvasH / 2 + TILE_SIZE / 2));
	}

	return { x, y };
}

export function updateCamera(state: GameState, camera: Camera, canvasW: number, canvasH: number, snap: boolean): void {
	const target = getCameraTarget(state, canvasW, canvasH);

	if (snap) {
		camera.x = target.x;
		camera.y = target.y;
	} else {
		camera.x += (target.x - camera.x) * 0.12;
		camera.y += (target.y - camera.y) * 0.12;
	}
}

export function renderWorld(
	ctx: CanvasRenderingContext2D,
	state: GameState,
	camera: Camera,
	canvasW: number,
	canvasH: number,
	time: number
): void {
	const map = getMap(state.currentMap);

	ctx.fillStyle = '#050505';
	ctx.fillRect(0, 0, canvasW, canvasH);

	ctx.save();
	ctx.translate(-Math.round(camera.x), -Math.round(camera.y));

	const startCol = Math.max(0, Math.floor(camera.x / TILE_SIZE) - 1);
	const endCol = Math.min(map.width, Math.ceil((camera.x + canvasW) / TILE_SIZE) + 1);
	const startRow = Math.max(0, Math.floor(camera.y / TILE_SIZE) - 1);
	const endRow = Math.min(map.height, Math.ceil((camera.y + canvasH) / TILE_SIZE) + 1);

	for (let y = startRow; y < endRow; y++) {
		for (let x = startCol; x < endCol; x++) {
			drawTile(ctx, map.tiles[y][x], x, y, time);
		}
	}

	if (state.currentMap === 'overworld') {
		drawBuildingExterior(ctx, 'Experience', 3, 3, 5, 4);
		drawBuildingExterior(ctx, 'Skills', 22, 3, 6, 4);
		drawBuildingExterior(ctx, 'Projects', 2, 13, 5, 4);
		drawBuildingExterior(ctx, 'Capabilities', 23, 13, 5, 4);
		drawBuildingExterior(ctx, 'Contact', 12, 2, 6, 3);
	}

	const entities: Array<{ y: number; draw: () => void }> = [];

	const playerPos = getPlayerScreenPos(state);
	entities.push({
		y: playerPos.y,
		draw: () => drawPlayer(ctx, state.player, playerPos.x, playerPos.y)
	});

	for (const npc of map.npcs) {
		const nx = npc.pos.x * TILE_SIZE;
		const ny = npc.pos.y * TILE_SIZE;
		entities.push({
			y: ny,
			draw: () => drawNPC(ctx, npc.color, npc.direction, npc.animFrame, nx, ny)
		});
	}

	entities.sort((a, b) => a.y - b.y);
	entities.forEach((e) => e.draw());

	ctx.restore();

	if (state.transitioning) {
		ctx.fillStyle = `rgba(5,5,5,${state.transitionAlpha})`;
		ctx.fillRect(0, 0, canvasW, canvasH);
	}
}

export function updateNPCs(state: GameState, dt: number): void {
	const map = getMap(state.currentMap);

	for (const npc of map.npcs) {
		npc.animTimer += dt;
		if (npc.animTimer > 400) {
			npc.animFrame = (npc.animFrame + 1) % 2;
			npc.animTimer = 0;
		}

		if (npc.path && npc.path.length > 1) {
			npc.pathTimer = (npc.pathTimer || 0) + dt;
			if (npc.pathTimer > 2000) {
				npc.pathTimer = 0;
				npc.pathIndex = ((npc.pathIndex || 0) + 1) % npc.path.length;
				const target = npc.path[npc.pathIndex!];
				if (target.x > npc.pos.x) npc.direction = Direction.RIGHT;
				else if (target.x < npc.pos.x) npc.direction = Direction.LEFT;
				else if (target.y > npc.pos.y) npc.direction = Direction.DOWN;
				else if (target.y < npc.pos.y) npc.direction = Direction.UP;
				npc.pos = { ...target };
			}
		}
	}
}

export function checkInteraction(state: GameState): InteractionPoint | null {
	const map = getMap(state.currentMap);
	const facing = getFacingTile(state);

	for (const ia of map.interactions) {
		if (ia.x === facing.x && ia.y === facing.y) return ia;
	}

	for (const npc of map.npcs) {
		if (npc.pos.x === facing.x && npc.pos.y === facing.y) {
			return { x: npc.pos.x, y: npc.pos.y, type: 'npc', data: npc.dialog };
		}
	}

	return null;
}

export function checkStandingInteraction(state: GameState): InteractionPoint | null {
	const map = getMap(state.currentMap);
	const px = state.player.pos.x;
	const py = state.player.pos.y;

	for (const ia of map.interactions) {
		if (ia.x === px && ia.y === py && (ia.type === 'door' || ia.type === 'exit')) {
			return ia;
		}
	}
	return null;
}

export function isInWildZone(state: GameState): boolean {
	const map = getMap(state.currentMap);
	if (!map.wildEncounterZone) return false;
	const { x, y } = state.player.pos;
	const z = map.wildEncounterZone;
	return x >= z.x1 && x <= z.x2 && y >= z.y1 && y <= z.y2;
}

export function shouldTriggerEncounter(state: GameState): boolean {
	if (!isInWildZone(state)) return false;
	const map = getMap(state.currentMap);
	const tile = map.tiles[state.player.pos.y]?.[state.player.pos.x];
	if (tile !== TileType.TALL_GRASS) return false;
	return Math.random() < ENCOUNTER_CHANCE;
}

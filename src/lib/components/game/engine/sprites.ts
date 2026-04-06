import { TileType, Direction, TILE_SIZE } from './types';
import type { Entity } from './types';

const COLORS = {
	base: '#050505',
	surface: '#111111',
	card: '#1a1a1a',
	accent: '#D4FF00',
	accentDim: '#a3c200',
	text: '#FAFAFA',
	textMuted: '#444444',
	border: '#333333',
	grass1: '#0a1f0a',
	grass2: '#0d2b0d',
	grass3: '#143814',
	path1: '#1e1e1e',
	path2: '#252525',
	water1: '#0a1628',
	water2: '#0d1d38',
	water3: '#1a3a5c',
	tree1: '#0d3d0d',
	tree2: '#0a2e0a',
	trunk: '#3d2b1a',
	roof: '#2a2a2a',
	wallBrick: '#2a2222',
	flower1: '#ff6b8a',
	flower2: '#ffaa44',
	flower3: '#7b68ee',
	tallGrass: '#1a4a1a',
	fence: '#4a3a2a',
	desk: '#3d3020',
	monitor: '#1a2a3a',
	monitorScreen: '#0d4433',
	arcade1: '#3a1a4a',
	arcade2: '#1a3a4a',
	fountain: '#3a5a7a',
	bench: '#5a4030'
};

const tileCache = new Map<string, HTMLCanvasElement>();

function getCachedTile(key: string, draw: (ctx: CanvasRenderingContext2D) => void): HTMLCanvasElement {
	let cached = tileCache.get(key);
	if (cached) return cached;
	cached = document.createElement('canvas');
	cached.width = TILE_SIZE;
	cached.height = TILE_SIZE;
	const ctx = cached.getContext('2d')!;
	draw(ctx);
	tileCache.set(key, cached);
	return cached;
}

function seededRandom(x: number, y: number): number {
	const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
	return n - Math.floor(n);
}

export function drawTile(ctx: CanvasRenderingContext2D, type: TileType, x: number, y: number, time: number): void {
	const T = TILE_SIZE;
	const px = x * T;
	const py = y * T;

	const cacheKey = `${type}-${x}-${y}`;

	switch (type) {
		case TileType.GRASS: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.grass1;
				c.fillRect(0, 0, T, T);
				const r = seededRandom(x, y);
				for (let i = 0; i < 3; i++) {
					const fx = ((r * 1000 + i * 13) % T) | 0;
					const fy = ((r * 2000 + i * 17) % T) | 0;
					c.fillStyle = i % 2 === 0 ? COLORS.grass2 : COLORS.grass3;
					c.fillRect(fx, fy, 2, 2);
				}
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.TALL_GRASS: {
			ctx.fillStyle = COLORS.grass1;
			ctx.fillRect(px, py, T, T);
			const waveOffset = Math.sin(time * 0.002 + x * 0.5) * 2;
			ctx.fillStyle = COLORS.tallGrass;
			for (let i = 0; i < 5; i++) {
				const bx = px + 3 + i * 6;
				const by = py + T - 4;
				ctx.beginPath();
				ctx.moveTo(bx, by + 4);
				ctx.lineTo(bx + 2 + waveOffset, by - 10);
				ctx.lineTo(bx + 4, by + 4);
				ctx.fill();
			}
			break;
		}

		case TileType.PATH: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.path1;
				c.fillRect(0, 0, T, T);
				c.strokeStyle = COLORS.path2;
				c.lineWidth = 0.5;
				c.strokeRect(0, 0, T, T);
				const r = seededRandom(x, y);
				if (r > 0.7) {
					c.fillStyle = COLORS.path2;
					c.fillRect(((r * 100) % 24) | 0, ((r * 200) % 24) | 0, 3, 3);
				}
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.WALL:
		case TileType.BUILDING_WALL: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = type === TileType.WALL ? COLORS.wallBrick : COLORS.surface;
				c.fillRect(0, 0, T, T);
				c.strokeStyle = COLORS.border;
				c.lineWidth = 1;
				if (type === TileType.BUILDING_WALL) {
					c.strokeRect(0.5, 0.5, T - 1, T - 1);
				} else {
					c.beginPath();
					c.moveTo(0, T / 2);
					c.lineTo(T, T / 2);
					c.stroke();
					c.beginPath();
					c.moveTo(T / 2, 0);
					c.lineTo(T / 2, T / 2);
					c.stroke();
				}
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.BUILDING_ROOF: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.roof;
				c.fillRect(0, 0, T, T);
				c.fillStyle = COLORS.border;
				c.fillRect(0, T - 2, T, 2);
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.WATER: {
			ctx.fillStyle = COLORS.water1;
			ctx.fillRect(px, py, T, T);
			const shimmer = Math.sin(time * 0.003 + x * 0.8 + y * 0.6);
			ctx.fillStyle = shimmer > 0.3 ? COLORS.water3 : COLORS.water2;
			const sx = px + 4 + Math.sin(time * 0.002 + y) * 3;
			ctx.fillRect(sx, py + 8, 12, 2);
			ctx.fillRect(sx + 6, py + 20, 10, 2);
			break;
		}

		case TileType.DOOR: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.surface;
				c.fillRect(0, 0, T, T);
				c.fillStyle = COLORS.accent;
				c.fillRect(4, 2, T - 8, T - 2);
				c.fillStyle = COLORS.accentDim;
				c.fillRect(6, 4, T - 12, T - 6);
				c.fillStyle = COLORS.text;
				c.fillRect(T - 10, T / 2 - 2, 3, 4);
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.EXIT_MAT: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.card;
				c.fillRect(0, 0, T, T);
				c.fillStyle = COLORS.accent;
				c.globalAlpha = 0.3;
				c.fillRect(2, 2, T - 4, T - 4);
				c.globalAlpha = 1;
				c.fillStyle = COLORS.accentDim;
				c.font = '7px monospace';
				c.textAlign = 'center';
				c.fillText('EXIT', T / 2, T / 2 + 3);
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.SIGN: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.path1;
				c.fillRect(0, 0, T, T);
				c.fillStyle = COLORS.fence;
				c.fillRect(13, 16, 6, 14);
				c.fillStyle = COLORS.card;
				c.fillRect(4, 4, 24, 14);
				c.strokeStyle = COLORS.accent;
				c.lineWidth = 1;
				c.strokeRect(4, 4, 24, 14);
				c.fillStyle = COLORS.accent;
				c.fillRect(8, 8, 4, 2);
				c.fillRect(8, 12, 16, 2);
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.TREE: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.grass1;
				c.fillRect(0, 0, T, T);
				c.fillStyle = COLORS.trunk;
				c.fillRect(12, 20, 8, 12);
				c.fillStyle = COLORS.tree1;
				c.beginPath();
				c.arc(16, 14, 12, 0, Math.PI * 2);
				c.fill();
				c.fillStyle = COLORS.tree2;
				c.beginPath();
				c.arc(13, 12, 6, 0, Math.PI * 2);
				c.fill();
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.BUILDING_FLOOR: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.card;
				c.fillRect(0, 0, T, T);
				c.strokeStyle = COLORS.border;
				c.lineWidth = 0.3;
				c.strokeRect(0, 0, T, T);
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.DESK: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.card;
				c.fillRect(0, 0, T, T);
				c.fillStyle = COLORS.desk;
				c.fillRect(2, 6, T - 4, T - 10);
				c.strokeStyle = COLORS.border;
				c.lineWidth = 1;
				c.strokeRect(2, 6, T - 4, T - 10);
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.MONITOR: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.card;
				c.fillRect(0, 0, T, T);
				c.fillStyle = COLORS.monitor;
				c.fillRect(4, 2, T - 8, T - 12);
				c.fillStyle = COLORS.monitorScreen;
				c.fillRect(6, 4, T - 12, T - 16);
				c.fillStyle = COLORS.border;
				c.fillRect(14, T - 10, 4, 6);
				c.fillRect(10, T - 4, 12, 2);
				c.fillStyle = COLORS.accent;
				c.globalAlpha = 0.5;
				c.fillRect(8, 6, 6, 1);
				c.fillRect(8, 9, 10, 1);
				c.fillRect(8, 12, 8, 1);
				c.globalAlpha = 1;
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.ARCADE: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.card;
				c.fillRect(0, 0, T, T);
				const color = seededRandom(x, y) > 0.5 ? COLORS.arcade1 : COLORS.arcade2;
				c.fillStyle = color;
				c.fillRect(6, 2, T - 12, T - 4);
				c.fillStyle = COLORS.base;
				c.fillRect(8, 4, T - 16, 12);
				c.fillStyle = COLORS.accent;
				c.globalAlpha = 0.6;
				c.fillRect(10, 6, T - 20, 8);
				c.globalAlpha = 1;
				c.fillStyle = COLORS.text;
				c.fillRect(14, 20, 4, 4);
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.FOUNTAIN: {
			ctx.fillStyle = COLORS.path1;
			ctx.fillRect(px, py, T, T);
			ctx.fillStyle = COLORS.fountain;
			ctx.beginPath();
			ctx.arc(px + T / 2, py + T / 2, 12, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = COLORS.water2;
			ctx.beginPath();
			ctx.arc(px + T / 2, py + T / 2, 8, 0, Math.PI * 2);
			ctx.fill();
			const splash = Math.sin(time * 0.005) * 3;
			ctx.fillStyle = COLORS.water3;
			ctx.beginPath();
			ctx.arc(px + T / 2, py + T / 2 - 4 - splash, 2, 0, Math.PI * 2);
			ctx.fill();
			break;
		}

		case TileType.BENCH: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.grass1;
				c.fillRect(0, 0, T, T);
				c.fillStyle = COLORS.bench;
				c.fillRect(4, 12, T - 8, 10);
				c.fillStyle = COLORS.fence;
				c.fillRect(6, 8, 2, 14);
				c.fillRect(T - 8, 8, 2, 14);
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.FENCE: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.grass1;
				c.fillRect(0, 0, T, T);
				c.fillStyle = COLORS.fence;
				c.fillRect(0, 10, T, 4);
				c.fillRect(2, 6, 4, 20);
				c.fillRect(T - 6, 6, 4, 20);
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.FLOWER: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.grass1;
				c.fillRect(0, 0, T, T);
				const r = seededRandom(x, y);
				const colors = [COLORS.flower1, COLORS.flower2, COLORS.flower3];
				const col = colors[(r * 3) | 0];
				c.fillStyle = COLORS.grass3;
				c.fillRect(10, 16, 2, 8);
				c.fillRect(20, 14, 2, 10);
				c.fillStyle = col;
				c.beginPath();
				c.arc(11, 14, 4, 0, Math.PI * 2);
				c.fill();
				c.beginPath();
				c.arc(21, 12, 3, 0, Math.PI * 2);
				c.fill();
			});
			ctx.drawImage(tile, px, py);
			break;
		}

		case TileType.STREETLIGHT: {
			const tile = getCachedTile(cacheKey, (c) => {
				c.fillStyle = COLORS.path1;
				c.fillRect(0, 0, T, T);
				c.fillStyle = COLORS.border;
				c.fillRect(14, 8, 4, 24);
				c.fillStyle = COLORS.textMuted;
				c.fillRect(10, 4, 12, 6);
				c.fillStyle = COLORS.accent;
				c.globalAlpha = 0.4;
				c.fillRect(12, 6, 8, 2);
				c.globalAlpha = 1;
			});
			ctx.drawImage(tile, px, py);
			break;
		}
	}
}

export function drawPlayer(ctx: CanvasRenderingContext2D, entity: Entity, screenX: number, screenY: number): void {
	const T = TILE_SIZE;
	const frame = entity.animFrame;
	const dir = entity.direction;

	ctx.fillStyle = COLORS.base;
	ctx.fillRect(screenX + 8, screenY + 2, 16, 14);

	ctx.fillStyle = '#e8d0b0';
	ctx.fillRect(screenX + 11, screenY + 3, 10, 10);

	if (dir === Direction.LEFT) {
		ctx.fillStyle = COLORS.base;
		ctx.fillRect(screenX + 12, screenY + 6, 2, 2);
	} else if (dir === Direction.RIGHT) {
		ctx.fillStyle = COLORS.base;
		ctx.fillRect(screenX + 18, screenY + 6, 2, 2);
	} else if (dir === Direction.UP) {
		ctx.fillStyle = COLORS.base;
		ctx.fillRect(screenX + 13, screenY + 3, 6, 4);
	} else {
		ctx.fillStyle = COLORS.base;
		ctx.fillRect(screenX + 13, screenY + 6, 2, 2);
		ctx.fillRect(screenX + 17, screenY + 6, 2, 2);
	}

	ctx.fillStyle = COLORS.card;
	ctx.fillRect(screenX + 8, screenY + 14, 16, 12);

	ctx.fillStyle = COLORS.accent;
	ctx.fillRect(screenX + 8, screenY + 14, 16, 2);

	const legOffset = frame % 2 === 0 ? 0 : 2;
	ctx.fillStyle = '#2a2a3a';
	ctx.fillRect(screenX + 10 - legOffset, screenY + 26, 5, 4);
	ctx.fillRect(screenX + 17 + legOffset, screenY + 26, 5, 4);

	ctx.fillStyle = COLORS.accent;
	ctx.globalAlpha = 0.6;
	ctx.fillRect(screenX + 10 - legOffset, screenY + 28, 5, 2);
	ctx.fillRect(screenX + 17 + legOffset, screenY + 28, 5, 2);
	ctx.globalAlpha = 1;
}

export function drawNPC(ctx: CanvasRenderingContext2D, color: string, dir: Direction, frame: number, screenX: number, screenY: number): void {
	const T = TILE_SIZE;

	ctx.fillStyle = '#333';
	ctx.fillRect(screenX + 8, screenY + 2, 16, 14);

	ctx.fillStyle = '#d4b896';
	ctx.fillRect(screenX + 11, screenY + 3, 10, 10);

	if (dir === Direction.DOWN) {
		ctx.fillStyle = '#222';
		ctx.fillRect(screenX + 13, screenY + 6, 2, 2);
		ctx.fillRect(screenX + 17, screenY + 6, 2, 2);
	}

	ctx.fillStyle = color;
	ctx.fillRect(screenX + 8, screenY + 14, 16, 12);

	const legOffset = frame % 2 === 0 ? 0 : 2;
	ctx.fillStyle = '#2a2a2a';
	ctx.fillRect(screenX + 10 - legOffset, screenY + 26, 5, 4);
	ctx.fillRect(screenX + 17 + legOffset, screenY + 26, 5, 4);
}

export function drawBattleEnemy(ctx: CanvasRenderingContext2D, name: string, color: string, x: number, y: number, size: number): void {
	switch (name) {
		case 'Bug Swarm': {
			for (let i = 0; i < 5; i++) {
				const bx = x + Math.sin(i * 1.3) * size * 0.3;
				const by = y + Math.cos(i * 1.7) * size * 0.2;
				ctx.fillStyle = color;
				ctx.beginPath();
				ctx.ellipse(bx, by, size * 0.15, size * 0.1, i * 0.5, 0, Math.PI * 2);
				ctx.fill();
				ctx.fillStyle = '#ff3333';
				ctx.fillRect(bx - 2, by - 3, 2, 2);
				ctx.fillRect(bx + 1, by - 3, 2, 2);
			}
			break;
		}
		case 'Legacy Codebase': {
			ctx.fillStyle = color;
			ctx.fillRect(x - size * 0.35, y - size * 0.4, size * 0.7, size * 0.8);
			ctx.fillStyle = '#0a0a0a';
			ctx.fillRect(x - size * 0.3, y - size * 0.35, size * 0.6, size * 0.7);
			ctx.fillStyle = '#4a4a4a';
			ctx.font = `${size * 0.12}px monospace`;
			ctx.fillText('<?php', x - size * 0.2, y - size * 0.15);
			ctx.fillText('GOTO 10', x - size * 0.2, y);
			ctx.fillText('// TODO', x - size * 0.2, y + size * 0.15);
			ctx.fillStyle = '#ff4444';
			ctx.fillText('ERROR', x - size * 0.15, y + size * 0.3);
			break;
		}
		case 'Scope Creep': {
			ctx.fillStyle = color;
			const tentacles = 6;
			for (let i = 0; i < tentacles; i++) {
				const angle = (i / tentacles) * Math.PI * 2;
				const tx = x + Math.cos(angle) * size * 0.5;
				const ty = y + Math.sin(angle) * size * 0.4;
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.quadraticCurveTo(x + Math.cos(angle) * size * 0.2, y + Math.sin(angle) * size * 0.3, tx, ty);
				ctx.lineWidth = 3;
				ctx.strokeStyle = color;
				ctx.stroke();
			}
			ctx.beginPath();
			ctx.arc(x, y, size * 0.25, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = '#ff0';
			ctx.fillRect(x - 6, y - 4, 4, 4);
			ctx.fillRect(x + 2, y - 4, 4, 4);
			break;
		}
		case 'Deadline Dragon': {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(x, y - size * 0.45);
			ctx.lineTo(x + size * 0.35, y + size * 0.2);
			ctx.lineTo(x - size * 0.35, y + size * 0.2);
			ctx.closePath();
			ctx.fill();

			ctx.beginPath();
			ctx.ellipse(x, y + size * 0.15, size * 0.35, size * 0.25, 0, 0, Math.PI * 2);
			ctx.fill();

			ctx.fillStyle = '#ff6600';
			ctx.beginPath();
			ctx.moveTo(x - size * 0.4, y - size * 0.1);
			ctx.lineTo(x - size * 0.6, y - size * 0.3);
			ctx.lineTo(x - size * 0.3, y);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(x + size * 0.4, y - size * 0.1);
			ctx.lineTo(x + size * 0.6, y - size * 0.3);
			ctx.lineTo(x + size * 0.3, y);
			ctx.closePath();
			ctx.fill();

			ctx.fillStyle = '#ff3300';
			ctx.fillRect(x - 6, y - size * 0.1, 5, 5);
			ctx.fillRect(x + 2, y - size * 0.1, 5, 5);

			ctx.fillStyle = '#ffaa00';
			ctx.beginPath();
			ctx.moveTo(x - 3, y + size * 0.3);
			ctx.lineTo(x, y + size * 0.5);
			ctx.lineTo(x + 3, y + size * 0.3);
			ctx.fill();
			break;
		}
		default: {
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(x, y, size * 0.35, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = '#fff';
			ctx.fillRect(x - 6, y - 4, 4, 4);
			ctx.fillRect(x + 2, y - 4, 4, 4);
			break;
		}
	}
}

export function drawBuildingExterior(
	ctx: CanvasRenderingContext2D,
	label: string,
	x: number,
	y: number,
	w: number,
	h: number
): void {
	const px = x * TILE_SIZE;
	const py = y * TILE_SIZE;
	const pw = w * TILE_SIZE;
	const ph = h * TILE_SIZE;

	ctx.fillStyle = COLORS.surface;
	ctx.fillRect(px, py, pw, ph);
	ctx.strokeStyle = COLORS.border;
	ctx.lineWidth = 1;
	ctx.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1);

	ctx.fillStyle = COLORS.roof;
	ctx.fillRect(px, py, pw, TILE_SIZE * 0.6);
	ctx.fillStyle = COLORS.border;
	ctx.fillRect(px, py + TILE_SIZE * 0.6 - 2, pw, 2);

	ctx.fillStyle = COLORS.accent;
	ctx.font = 'bold 8px monospace';
	ctx.textAlign = 'center';
	ctx.fillText(label.toUpperCase(), px + pw / 2, py + TILE_SIZE * 0.4);
	ctx.textAlign = 'start';

	for (let i = 1; i < w - 1; i += 2) {
		if (i === Math.floor(w / 2)) continue;
		ctx.fillStyle = COLORS.water2;
		ctx.fillRect(px + i * TILE_SIZE + 8, py + TILE_SIZE + 4, 16, 12);
		ctx.fillStyle = COLORS.accent;
		ctx.globalAlpha = 0.15;
		ctx.fillRect(px + i * TILE_SIZE + 10, py + TILE_SIZE + 6, 12, 8);
		ctx.globalAlpha = 1;
	}
}

export function drawPlayerBattleSprite(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
	ctx.fillStyle = '#e8d0b0';
	ctx.beginPath();
	ctx.arc(x, y - size * 0.25, size * 0.18, 0, Math.PI * 2);
	ctx.fill();

	ctx.fillStyle = COLORS.base;
	ctx.fillRect(x - size * 0.12, y - size * 0.45, size * 0.24, size * 0.12);

	ctx.fillStyle = COLORS.card;
	ctx.fillRect(x - size * 0.2, y - size * 0.08, size * 0.4, size * 0.35);
	ctx.fillStyle = COLORS.accent;
	ctx.fillRect(x - size * 0.2, y - size * 0.08, size * 0.4, size * 0.05);

	ctx.fillStyle = '#2a2a3a';
	ctx.fillRect(x - size * 0.15, y + size * 0.27, size * 0.12, size * 0.18);
	ctx.fillRect(x + size * 0.03, y + size * 0.27, size * 0.12, size * 0.18);

	ctx.fillStyle = COLORS.accent;
	ctx.globalAlpha = 0.6;
	ctx.fillRect(x - size * 0.15, y + size * 0.38, size * 0.12, size * 0.07);
	ctx.fillRect(x + size * 0.03, y + size * 0.38, size * 0.12, size * 0.07);
	ctx.globalAlpha = 1;
}

export function clearTileCache(): void {
	tileCache.clear();
}

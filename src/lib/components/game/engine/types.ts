export enum TileType {
	GRASS = 0,
	PATH = 1,
	WALL = 2,
	WATER = 3,
	DOOR = 4,
	SIGN = 5,
	TREE = 6,
	BUILDING_FLOOR = 7,
	DESK = 8,
	MONITOR = 9,
	ARCADE = 10,
	FOUNTAIN = 11,
	BENCH = 12,
	FENCE = 13,
	FLOWER = 14,
	TALL_GRASS = 15,
	BUILDING_WALL = 16,
	BUILDING_ROOF = 17,
	EXIT_MAT = 18,
	STREETLIGHT = 19
}

export enum Direction {
	UP = 'up',
	DOWN = 'down',
	LEFT = 'left',
	RIGHT = 'right'
}

export interface Position {
	x: number;
	y: number;
}

export interface Entity {
	pos: Position;
	direction: Direction;
	animFrame: number;
	animTimer: number;
}

export interface NPC extends Entity {
	name: string;
	dialog: string[];
	color: string;
	path?: Position[];
	pathIndex?: number;
	pathTimer?: number;
}

export interface InteractionPoint {
	x: number;
	y: number;
	type: 'sign' | 'npc' | 'door' | 'exit';
	data?: string[];
	target?: string;
	spawnPos?: Position;
}

export interface MapData {
	name: string;
	width: number;
	height: number;
	tiles: TileType[][];
	collisions: boolean[][];
	interactions: InteractionPoint[];
	npcs: NPC[];
	spawnPos: Position;
	wildEncounterZone?: { x1: number; y1: number; x2: number; y2: number };
}

export interface SkillAttack {
	name: string;
	category: 'frontend' | 'backend' | 'ai' | 'marketing' | 'domain';
	power: number;
}

export interface EnemyDef {
	name: string;
	maxHp: number;
	attack: number;
	defense: number;
	weakness: SkillAttack['category'];
	spriteColor: string;
	xpReward: number;
}

export interface BattleState {
	active: boolean;
	playerHp: number;
	playerMaxHp: number;
	enemyHp: number;
	enemyMaxHp: number;
	enemy: EnemyDef;
	playerSkills: SkillAttack[];
	log: string[];
	turn: 'player' | 'enemy' | 'victory' | 'defeat';
	animating: boolean;
	shakeEnemy: boolean;
	shakePlayer: boolean;
	playerXp: number;
	defeatedBosses: string[];
}

export interface GameState {
	currentMap: string;
	player: Entity;
	moving: boolean;
	moveProgress: number;
	moveTarget: Position;
	dialog: { lines: string[]; currentLine: number } | null;
	battle: BattleState | null;
	transitioning: boolean;
	transitionAlpha: number;
	transitionTarget: string | null;
	transitionSpawn: Position | null;
	playerHp: number;
	playerMaxHp: number;
	playerXp: number;
	defeatedBosses: string[];
	isMobile: boolean;
	inputDirection: Direction | null;
	interactPressed: boolean;
}

export interface Camera {
	x: number;
	y: number;
}

export const TILE_SIZE = 32;
export const PLAYER_SPEED = 0.15;
export const ENCOUNTER_CHANCE = 0.08;

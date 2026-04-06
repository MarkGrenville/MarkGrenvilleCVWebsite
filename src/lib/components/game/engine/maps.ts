import { TileType as T, Direction } from './types';
import type { MapData, NPC, InteractionPoint, Position } from './types';
import { cvData } from '$lib/data/cv';

function createCollisions(tiles: T[][]): boolean[][] {
	const solid = new Set([
		T.WALL, T.WATER, T.TREE, T.BUILDING_WALL, T.BUILDING_ROOF,
		T.DESK, T.MONITOR, T.ARCADE, T.FOUNTAIN, T.FENCE, T.STREETLIGHT
	]);
	return tiles.map((row) => row.map((t) => solid.has(t)));
}

function fill(w: number, h: number, tile: T): T[][] {
	return Array.from({ length: h }, () => Array(w).fill(tile));
}

function setRect(tiles: T[][], x: number, y: number, w: number, h: number, tile: T): void {
	for (let dy = 0; dy < h; dy++) {
		for (let dx = 0; dx < w; dx++) {
			if (y + dy < tiles.length && x + dx < tiles[0].length) {
				tiles[y + dy][x + dx] = tile;
			}
		}
	}
}

function setBorder(tiles: T[][], x: number, y: number, w: number, h: number, tile: T): void {
	for (let dx = 0; dx < w; dx++) {
		tiles[y][x + dx] = tile;
		tiles[y + h - 1][x + dx] = tile;
	}
	for (let dy = 0; dy < h; dy++) {
		tiles[y + dy][x] = tile;
		tiles[y + dy][x + w - 1] = tile;
	}
}

function buildOverworld(): MapData {
	const W = 30, H = 22;
	const tiles = fill(W, H, T.GRASS);

	setBorder(tiles, 0, 0, W, H, T.TREE);
	for (let i = 1; i < W - 1; i++) tiles[1][i] = T.FENCE;
	tiles[1][15] = T.GRASS;

	setRect(tiles, 8, 9, 14, 4, T.PATH);
	setRect(tiles, 14, 4, 2, 14, T.PATH);
	setRect(tiles, 8, 9, 2, 9, T.PATH);
	setRect(tiles, 20, 9, 2, 9, T.PATH);
	setRect(tiles, 8, 17, 14, 2, T.PATH);

	tiles[11][15] = T.FOUNTAIN;

	tiles[9][10] = T.STREETLIGHT;
	tiles[9][19] = T.STREETLIGHT;
	tiles[17][10] = T.STREETLIGHT;
	tiles[17][19] = T.STREETLIGHT;

	tiles[10][12] = T.BENCH;
	tiles[10][17] = T.BENCH;

	setRect(tiles, 3, 3, 5, 4, T.BUILDING_WALL);
	setRect(tiles, 3, 3, 5, 1, T.BUILDING_ROOF);
	tiles[6][5] = T.DOOR;
	tiles[7][5] = T.PATH;
	setRect(tiles, 7, 4, 1, 3, T.PATH);

	setRect(tiles, 22, 3, 6, 4, T.BUILDING_WALL);
	setRect(tiles, 22, 3, 6, 1, T.BUILDING_ROOF);
	tiles[6][25] = T.DOOR;
	tiles[7][25] = T.PATH;
	setRect(tiles, 21, 5, 1, 4, T.PATH);

	setRect(tiles, 2, 13, 5, 4, T.BUILDING_WALL);
	setRect(tiles, 2, 13, 5, 1, T.BUILDING_ROOF);
	tiles[16][4] = T.DOOR;
	tiles[17][4] = T.PATH;
	setRect(tiles, 5, 17, 3, 1, T.PATH);

	setRect(tiles, 23, 13, 5, 4, T.BUILDING_WALL);
	setRect(tiles, 23, 13, 5, 1, T.BUILDING_ROOF);
	tiles[16][25] = T.DOOR;
	tiles[17][25] = T.PATH;
	setRect(tiles, 22, 13, 1, 5, T.PATH);

	setRect(tiles, 12, 2, 6, 3, T.BUILDING_WALL);
	setRect(tiles, 12, 2, 6, 1, T.BUILDING_ROOF);
	tiles[4][15] = T.DOOR;

	tiles[5][12] = T.FLOWER;
	tiles[5][17] = T.FLOWER;
	tiles[8][3] = T.FLOWER;
	tiles[8][26] = T.FLOWER;
	tiles[19][3] = T.FLOWER;
	tiles[19][26] = T.FLOWER;

	setRect(tiles, 24, 19, 5, 2, T.TALL_GRASS);
	setRect(tiles, 25, 17, 4, 2, T.TALL_GRASS);
	tiles[18][23] = T.TALL_GRASS;
	tiles[19][22] = T.TALL_GRASS;
	tiles[20][24] = T.TALL_GRASS;
	tiles[20][25] = T.TALL_GRASS;
	tiles[20][26] = T.TALL_GRASS;

	tiles[2][15] = T.TREE;
	tiles[2][14] = T.TREE;
	tiles[8][1] = T.TREE;
	tiles[12][1] = T.TREE;
	tiles[19][1] = T.TREE;
	tiles[8][28] = T.TREE;
	tiles[12][28] = T.TREE;
	tiles[19][28] = T.TREE;
	tiles[20][2] = T.TREE;
	tiles[20][3] = T.TREE;

	setRect(tiles, 1, 2, 2, 5, T.WATER);
	tiles[3][3] = T.WATER;

	tiles[8][5] = T.SIGN;
	tiles[8][25] = T.SIGN;
	tiles[18][4] = T.SIGN;
	tiles[18][25] = T.SIGN;
	tiles[5][15] = T.SIGN;

	const interactions: InteractionPoint[] = [
		{ x: 5, y: 6, type: 'door', target: 'experience', spawnPos: { x: 7, y: 10 } },
		{ x: 25, y: 6, type: 'door', target: 'skills', spawnPos: { x: 7, y: 10 } },
		{ x: 4, y: 16, type: 'door', target: 'projects', spawnPos: { x: 7, y: 10 } },
		{ x: 25, y: 16, type: 'door', target: 'capabilities', spawnPos: { x: 7, y: 10 } },
		{ x: 15, y: 4, type: 'door', target: 'contact', spawnPos: { x: 7, y: 10 } },
		{
			x: 5, y: 8, type: 'sign',
			data: ['EXPERIENCE HALL', 'Walk in to explore Mark\'s work history and career timeline.']
		},
		{
			x: 25, y: 8, type: 'sign',
			data: ['SKILLS LAB', 'Enter to discover Mark\'s technical skills and expertise.']
		},
		{
			x: 4, y: 18, type: 'sign',
			data: ['PROJECTS ARCADE', 'Step inside to see the projects Mark has built.']
		},
		{
			x: 25, y: 18, type: 'sign',
			data: ['CAPABILITIES TOWER', 'Visit to learn what Mark can do for your business.']
		},
		{
			x: 15, y: 5, type: 'sign',
			data: ['CONTACT OFFICE', 'Come in to get Mark\'s contact details.']
		}
	];

	const npcs: NPC[] = [
		{
			name: 'Guide',
			pos: { x: 13, y: 11 },
			direction: Direction.DOWN,
			animFrame: 0,
			animTimer: 0,
			color: '#4a6fa5',
			dialog: [
				'Welcome to Mark Grenville\'s CV!',
				'This is a tech campus. Each building contains a section of Mark\'s CV.',
				'Walk into the doors to explore Experience, Skills, Projects, and more!',
				'Watch out for bugs in the tall grass to the east...',
				'Use ARROW KEYS to move and SPACE to interact.'
			]
		},
		{
			name: 'Dev',
			pos: { x: 16, y: 17 },
			direction: Direction.LEFT,
			animFrame: 0,
			animTimer: 0,
			color: '#a54a6f',
			dialog: [
				'Hey! Did you know Mark has 13+ years of experience?',
				'He\'s built systems for Toyota, Discovery, and many more.',
				'Check out the Experience Hall to the north-west!'
			],
			path: [{ x: 16, y: 17 }, { x: 18, y: 17 }, { x: 18, y: 15 }, { x: 16, y: 15 }],
			pathIndex: 0,
			pathTimer: 0
		},
		{
			name: 'AI Fan',
			pos: { x: 11, y: 14 },
			direction: Direction.RIGHT,
			animFrame: 0,
			animTimer: 0,
			color: '#6fa54a',
			dialog: [
				'Mark is passionate about AI and its potential.',
				'He builds AI-assisted workflows, chatbots, and LLM integrations.',
				'The future is AI-powered — and Mark is building it!'
			]
		}
	];

	return {
		name: 'Tech Campus',
		width: W,
		height: H,
		tiles,
		collisions: createCollisions(tiles),
		interactions,
		npcs,
		spawnPos: { x: 15, y: 12 },
		wildEncounterZone: { x1: 22, y1: 17, x2: 29, y2: 21 }
	};
}

function buildExperienceRoom(): MapData {
	const W = 16, H = 12;
	const tiles = fill(W, H, T.BUILDING_FLOOR);
	setBorder(tiles, 0, 0, W, H, T.BUILDING_WALL);
	setRect(tiles, 0, 0, W, 1, T.BUILDING_ROOF);

	tiles[H - 1][7] = T.EXIT_MAT;
	tiles[H - 1][8] = T.EXIT_MAT;

	for (let x = 2; x < W - 2; x += 3) {
		tiles[2][x] = T.DESK;
		tiles[2][x + 1] = T.MONITOR;
	}

	tiles[5][3] = T.SIGN;
	tiles[5][7] = T.SIGN;
	tiles[5][11] = T.SIGN;
	tiles[8][5] = T.SIGN;
	tiles[8][10] = T.SIGN;

	const exp = cvData.experience;
	const interactions: InteractionPoint[] = [
		{ x: 7, y: 11, type: 'exit', target: 'overworld', spawnPos: { x: 5, y: 7 } },
		{ x: 8, y: 11, type: 'exit', target: 'overworld', spawnPos: { x: 5, y: 7 } },
		{
			x: 3, y: 5, type: 'sign',
			data: [
				`${exp[0].company} — ${exp[0].role}`,
				exp[0].period,
				exp[0].description.substring(0, 120) + '...'
			]
		},
		{
			x: 7, y: 5, type: 'sign',
			data: exp[0].highlights.slice(0, 3)
		},
		{
			x: 11, y: 5, type: 'sign',
			data: exp[0].highlights.slice(3, 6)
		},
		{
			x: 5, y: 8, type: 'sign',
			data: [
				`${exp[1].company} — ${exp[1].role}`,
				exp[1].period,
				exp[1].description.substring(0, 120) + '...'
			]
		},
		{
			x: 10, y: 8, type: 'sign',
			data: exp[1].highlights
		}
	];

	const npcs: NPC[] = [{
		name: 'Historian',
		pos: { x: 12, y: 8 },
		direction: Direction.LEFT,
		animFrame: 0, animTimer: 0,
		color: '#8b6914',
		dialog: [
			'This is the Experience Hall!',
			'Mark founded WebFootprint in 2012 and has been building systems ever since.',
			'Read the signs to learn about his career journey.'
		]
	}];

	return {
		name: 'Experience Hall',
		width: W, height: H, tiles,
		collisions: createCollisions(tiles),
		interactions, npcs,
		spawnPos: { x: 7, y: 10 }
	};
}

function buildSkillsRoom(): MapData {
	const W = 16, H = 12;
	const tiles = fill(W, H, T.BUILDING_FLOOR);
	setBorder(tiles, 0, 0, W, H, T.BUILDING_WALL);
	setRect(tiles, 0, 0, W, 1, T.BUILDING_ROOF);

	tiles[H - 1][7] = T.EXIT_MAT;
	tiles[H - 1][8] = T.EXIT_MAT;

	for (let x = 2; x < W - 2; x += 2) {
		tiles[2][x] = T.MONITOR;
	}

	const skills = cvData.skills;
	const signPositions: Position[] = [
		{ x: 3, y: 5 }, { x: 7, y: 5 }, { x: 11, y: 5 },
		{ x: 5, y: 8 }, { x: 10, y: 8 }
	];

	signPositions.forEach((p) => { tiles[p.y][p.x] = T.SIGN; });

	const interactions: InteractionPoint[] = [
		{ x: 7, y: 11, type: 'exit', target: 'overworld', spawnPos: { x: 25, y: 7 } },
		{ x: 8, y: 11, type: 'exit', target: 'overworld', spawnPos: { x: 25, y: 7 } }
	];

	skills.forEach((cat, i) => {
		if (i < signPositions.length) {
			interactions.push({
				x: signPositions[i].x,
				y: signPositions[i].y,
				type: 'sign',
				data: [cat.category, ...cat.items]
			});
		}
	});

	const npcs: NPC[] = [{
		name: 'Techie',
		pos: { x: 12, y: 9 },
		direction: Direction.DOWN,
		animFrame: 0, animTimer: 0,
		color: '#1e90ff',
		dialog: [
			'Welcome to the Skills Lab!',
			'Mark works with TypeScript, Python, SvelteKit, Angular, and more.',
			'He also specializes in AI, 3D configurators, and marketing systems.',
			'Check each monitor station for detailed skill categories!'
		]
	}];

	return {
		name: 'Skills Lab',
		width: W, height: H, tiles,
		collisions: createCollisions(tiles),
		interactions, npcs,
		spawnPos: { x: 7, y: 10 }
	};
}

function buildProjectsRoom(): MapData {
	const W = 16, H = 12;
	const tiles = fill(W, H, T.BUILDING_FLOOR);
	setBorder(tiles, 0, 0, W, H, T.BUILDING_WALL);
	setRect(tiles, 0, 0, W, 1, T.BUILDING_ROOF);

	tiles[H - 1][7] = T.EXIT_MAT;
	tiles[H - 1][8] = T.EXIT_MAT;

	tiles[2][3] = T.ARCADE;
	tiles[2][6] = T.ARCADE;
	tiles[2][9] = T.ARCADE;
	tiles[2][12] = T.ARCADE;

	tiles[5][3] = T.SIGN;
	tiles[5][7] = T.SIGN;
	tiles[5][11] = T.SIGN;
	tiles[8][3] = T.SIGN;
	tiles[8][7] = T.SIGN;
	tiles[8][11] = T.SIGN;

	const projects = cvData.projects;
	const interactions: InteractionPoint[] = [
		{ x: 7, y: 11, type: 'exit', target: 'overworld', spawnPos: { x: 4, y: 17 } },
		{ x: 8, y: 11, type: 'exit', target: 'overworld', spawnPos: { x: 4, y: 17 } }
	];

	const signPos: Position[] = [
		{ x: 3, y: 5 }, { x: 7, y: 5 }, { x: 11, y: 5 },
		{ x: 3, y: 8 }, { x: 7, y: 8 }, { x: 11, y: 8 }
	];

	projects.forEach((proj, i) => {
		if (i < signPos.length) {
			interactions.push({
				x: signPos[i].x,
				y: signPos[i].y,
				type: 'sign',
				data: [
					proj.name + (proj.client ? ` (${proj.client})` : ''),
					proj.description.substring(0, 100) + '...',
					'Tech: ' + proj.tech.join(', ')
				]
			});
		}
	});

	const npcs: NPC[] = [{
		name: 'Gamer',
		pos: { x: 8, y: 4 },
		direction: Direction.DOWN,
		animFrame: 0, animTimer: 0,
		color: '#ff6b9d',
		dialog: [
			'Welcome to the Projects Arcade!',
			'Each cabinet represents a project Mark has built.',
			'From Toyota\'s 3D configurator to ParkUpp\'s parking platform!',
			'Read the signs for project details.'
		]
	}];

	return {
		name: 'Projects Arcade',
		width: W, height: H, tiles,
		collisions: createCollisions(tiles),
		interactions, npcs,
		spawnPos: { x: 7, y: 10 }
	};
}

function buildCapabilitiesRoom(): MapData {
	const W = 16, H = 12;
	const tiles = fill(W, H, T.BUILDING_FLOOR);
	setBorder(tiles, 0, 0, W, H, T.BUILDING_WALL);
	setRect(tiles, 0, 0, W, 1, T.BUILDING_ROOF);

	tiles[H - 1][7] = T.EXIT_MAT;
	tiles[H - 1][8] = T.EXIT_MAT;

	tiles[3][4] = T.SIGN;
	tiles[3][11] = T.SIGN;
	tiles[7][4] = T.SIGN;
	tiles[7][11] = T.SIGN;

	tiles[5][7] = T.FOUNTAIN;

	const caps = cvData.capabilities;
	const interactions: InteractionPoint[] = [
		{ x: 7, y: 11, type: 'exit', target: 'overworld', spawnPos: { x: 25, y: 17 } },
		{ x: 8, y: 11, type: 'exit', target: 'overworld', spawnPos: { x: 25, y: 17 } }
	];

	const signPos: Position[] = [
		{ x: 4, y: 3 }, { x: 11, y: 3 }, { x: 4, y: 7 }, { x: 11, y: 7 }
	];

	caps.forEach((cap, i) => {
		if (i < signPos.length) {
			interactions.push({
				x: signPos[i].x,
				y: signPos[i].y,
				type: 'sign',
				data: [
					`${cap.icon} ${cap.label}`,
					cap.description,
					...cap.items
				]
			});
		}
	});

	const npcs: NPC[] = [{
		name: 'Mentor',
		pos: { x: 8, y: 9 },
		direction: Direction.UP,
		animFrame: 0, animTimer: 0,
		color: '#ffa500',
		dialog: [
			'This is the Capabilities Tower!',
			'Mark can Build, Grow, Automate, and Specialise.',
			'Each corner represents a different capability area.',
			'Whether you need a website, marketing, AI, or 3D — Mark can help!'
		]
	}];

	return {
		name: 'Capabilities Tower',
		width: W, height: H, tiles,
		collisions: createCollisions(tiles),
		interactions, npcs,
		spawnPos: { x: 7, y: 10 }
	};
}

function buildContactRoom(): MapData {
	const W = 16, H = 12;
	const tiles = fill(W, H, T.BUILDING_FLOOR);
	setBorder(tiles, 0, 0, W, H, T.BUILDING_WALL);
	setRect(tiles, 0, 0, W, 1, T.BUILDING_ROOF);

	tiles[H - 1][7] = T.EXIT_MAT;
	tiles[H - 1][8] = T.EXIT_MAT;

	tiles[2][7] = T.DESK;
	tiles[2][8] = T.DESK;
	tiles[2][6] = T.MONITOR;
	tiles[2][9] = T.MONITOR;

	tiles[5][4] = T.SIGN;
	tiles[5][11] = T.SIGN;
	tiles[8][7] = T.SIGN;

	const personal = cvData.personal;
	const interactions: InteractionPoint[] = [
		{ x: 7, y: 11, type: 'exit', target: 'overworld', spawnPos: { x: 15, y: 5 } },
		{ x: 8, y: 11, type: 'exit', target: 'overworld', spawnPos: { x: 15, y: 5 } },
		{
			x: 4, y: 5, type: 'sign',
			data: [
				personal.name,
				personal.title,
				personal.location,
				`Email: ${personal.email}`
			]
		},
		{
			x: 11, y: 5, type: 'sign',
			data: [
				'About Mark',
				personal.summary.substring(0, 120) + '...',
				personal.tagline
			]
		},
		{
			x: 7, y: 8, type: 'sign',
			data: [
				'Get in Touch!',
				`Email: ${personal.email}`,
				'Based in ' + personal.location,
				'Always open to new opportunities and collaborations.'
			]
		}
	];

	const npcs: NPC[] = [{
		name: 'Receptionist',
		pos: { x: 8, y: 4 },
		direction: Direction.DOWN,
		animFrame: 0, animTimer: 0,
		color: '#9370db',
		dialog: [
			'Welcome to the Contact Office!',
			`You can reach Mark at ${personal.email}.`,
			`He\'s based in ${personal.location}.`,
			'Feel free to explore the signs for more info!'
		]
	}];

	return {
		name: 'Contact Office',
		width: W, height: H, tiles,
		collisions: createCollisions(tiles),
		interactions, npcs,
		spawnPos: { x: 7, y: 10 }
	};
}

export function getAllMaps(): Record<string, MapData> {
	return {
		overworld: buildOverworld(),
		experience: buildExperienceRoom(),
		skills: buildSkillsRoom(),
		projects: buildProjectsRoom(),
		capabilities: buildCapabilitiesRoom(),
		contact: buildContactRoom()
	};
}

import type { BattleState, SkillAttack, EnemyDef } from './types';
import { cvData } from '$lib/data/cv';

const SKILL_CATEGORY_MAP: Record<string, SkillAttack['category']> = {
	'Languages & Frameworks': 'frontend',
	'Platforms & Infrastructure': 'backend',
	'AI & Automation': 'ai',
	'Marketing & Growth': 'marketing',
	'Domains': 'domain'
};

export function getPlayerSkills(): SkillAttack[] {
	const skills: SkillAttack[] = [];
	for (const cat of cvData.skills) {
		const category = SKILL_CATEGORY_MAP[cat.category] || 'domain';
		for (const item of cat.items.slice(0, 2)) {
			skills.push({
				name: item,
				category,
				power: 15 + Math.floor(Math.random() * 10)
			});
		}
	}
	return skills.slice(0, 8);
}

export const ENEMIES: EnemyDef[] = [
	{
		name: 'Bug Swarm',
		maxHp: 35,
		attack: 8,
		defense: 3,
		weakness: 'backend',
		spriteColor: '#44aa44',
		xpReward: 15
	},
	{
		name: 'Legacy Codebase',
		maxHp: 55,
		attack: 12,
		defense: 8,
		weakness: 'frontend',
		spriteColor: '#886644',
		xpReward: 25
	},
	{
		name: 'Scope Creep',
		maxHp: 70,
		attack: 15,
		defense: 5,
		weakness: 'ai',
		spriteColor: '#7744aa',
		xpReward: 35
	},
	{
		name: 'Deadline Dragon',
		maxHp: 100,
		attack: 20,
		defense: 10,
		weakness: 'marketing',
		spriteColor: '#cc3333',
		xpReward: 50
	}
];

export function getRandomEnemy(): EnemyDef {
	const roll = Math.random();
	if (roll < 0.45) return ENEMIES[0];
	if (roll < 0.75) return ENEMIES[1];
	if (roll < 0.92) return ENEMIES[2];
	return ENEMIES[3];
}

export function createBattleState(enemy: EnemyDef, playerHp: number, playerMaxHp: number, playerXp: number, defeatedBosses: string[]): BattleState {
	return {
		active: true,
		playerHp,
		playerMaxHp,
		enemyHp: enemy.maxHp,
		enemyMaxHp: enemy.maxHp,
		enemy,
		playerSkills: getPlayerSkills(),
		log: [`A wild ${enemy.name} appeared!`],
		turn: 'player',
		animating: false,
		shakeEnemy: false,
		shakePlayer: false,
		playerXp,
		defeatedBosses: [...defeatedBosses]
	};
}

export function playerAttack(battle: BattleState, skill: SkillAttack): void {
	battle.animating = true;
	battle.shakeEnemy = true;

	let damage = skill.power + Math.floor(Math.random() * 8) - battle.enemy.defense;
	let effectiveness = '';

	if (skill.category === battle.enemy.weakness) {
		damage = Math.floor(damage * 1.8);
		effectiveness = " It's super effective!";
	}

	damage = Math.max(1, damage);
	battle.enemyHp = Math.max(0, battle.enemyHp - damage);
	battle.log.push(`Mark used ${skill.name}! ${damage} damage!${effectiveness}`);

	if (battle.enemyHp <= 0) {
		battle.log.push(`${battle.enemy.name} was defeated!`);
		battle.log.push(`Gained ${battle.enemy.xpReward} XP!`);
		battle.playerXp += battle.enemy.xpReward;

		if (!battle.defeatedBosses.includes(battle.enemy.name)) {
			battle.defeatedBosses.push(battle.enemy.name);
		}

		if (battle.defeatedBosses.length >= ENEMIES.length) {
			battle.log.push('ALL BOSSES DEFEATED! You are a true champion!');
		}

		battle.turn = 'victory';
	} else {
		battle.turn = 'enemy';
	}
}

export function enemyAttack(battle: BattleState): void {
	battle.animating = true;
	battle.shakePlayer = true;

	const damage = Math.max(1, battle.enemy.attack + Math.floor(Math.random() * 6) - 5);
	battle.playerHp = Math.max(0, battle.playerHp - damage);
	battle.log.push(`${battle.enemy.name} attacks! ${damage} damage!`);

	if (battle.playerHp <= 0) {
		battle.log.push('You were defeated... But Mark never gives up!');
		battle.turn = 'defeat';
	} else {
		battle.turn = 'player';
	}
}

export function attemptFlee(battle: BattleState): boolean {
	if (Math.random() < 0.6) {
		battle.log.push('Got away safely!');
		battle.active = false;
		return true;
	}
	battle.log.push("Couldn't escape!");
	battle.turn = 'enemy';
	return false;
}

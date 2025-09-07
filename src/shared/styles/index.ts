export class FightingStyle {
	name: string;
	skills: Map<Skill, Enum.KeyCode>;

	constructor(name: string, skills: Map<Skill, Enum.KeyCode>, passives: Array<Passive>) {
		this.name = name;
		this.skills = skills;
	}
}

export interface Passive {}

export type SkillData = {
	animation?: Animation;
	hitbox?: HitboxData;
	stunTime?: number;
};

export type HitboxData = {
	cframe: (playerPosition: CFrame) => CFrame;
	size: Vector3;
	duration: number;
	hitData: OnHitData;
};

export type OnHitData = {
	stunDuration?: number;
};

export class Skill {
	timeline: Record<number, SkillData>;

	constructor(timeline: Record<number, SkillData>) {
		this.timeline = timeline;
	}
}

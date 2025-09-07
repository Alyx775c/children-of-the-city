export class FightingStyle {
	name: string;
	id: string;
	skills: Map<Skill, Enum.KeyCode>;
	passives: Array<Passive>;
	moveSpeed: number;

	constructor(data: {
		name: string;
		id: string;
		skills: Map<Skill, Enum.KeyCode>;
		passives: Array<Passive>;
		defaultMoveSpeed: number;
	}) {
		this.name = data.name;
		this.id = data.id;
		this.skills = data.skills;
		this.passives = data.passives;
		this.moveSpeed = data.defaultMoveSpeed;
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
	dmgMult: number;
};

export class Skill {
	timeline: Record<number, SkillData>;

	constructor(timeline: Record<number, SkillData>) {
		this.timeline = timeline;
	}
}

const styleList: FightingStyle[] = [];
const pages = script.FindFirstChild("pages") as Instance | undefined;
if (pages) {
	for (const inst of pages.GetDescendants()) {
		if (inst.IsA("ModuleScript")) styleList.push(require(inst) as FightingStyle);
	}
}

const StyleLookup: Record<string, FightingStyle> = {};
for (const style of styleList) {
	StyleLookup[style.id] = style;
}

export { StyleLookup };

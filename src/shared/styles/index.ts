export class FightingStyle {
	name: string;
	skills: Map<Skill, Enum.KeyCode>;

	constructor(name: string, skills: Map<Skill, Enum.KeyCode>) {
		this.name = name;
		this.skills = skills;

		script.Parent?.WaitForChild("attacks");
	}
}

export type SkillData = {
	animation: string | Animation;
	hitbox: (playerPosition: CFrame) => CFrame;
};

export class Skill {
	timeline: Record<number, SkillData>;

	constructor(timeline: Record<number, SkillData>) {
		this.timeline = timeline;
	}
}

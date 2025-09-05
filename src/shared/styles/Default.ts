export interface FightingStyle {
	name: string;
	// Skill, DefaultBinding
	skills: Map<Skill, Enum.KeyCode>;
}

export interface Skill {
	// Time to execute and data
	timeline: Map<
		number,
		{
			animation: string | Animation;
			hitbox: (playerPosition: Vector3) => CFrame;
		}
	>;
}

export const RatStyle: FightingStyle = {
	name: "Pete's Page",
	skills: new Map(),
};

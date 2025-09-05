import { Skill } from "shared/styles";

export = new Skill({
	0.0: {
		animation: "",
		hitbox: (playerPosition: CFrame) => {
			return new CFrame();
		},
	},
});

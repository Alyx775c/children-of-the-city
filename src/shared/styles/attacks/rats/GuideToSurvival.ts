import { Skill } from "shared/styles/data";

export = new Skill({
	timeline: {
		0.0: {
			animation: "rbxassetid://100716342013127",
			hitbox: {
				cframe: (playerPosition: CFrame) => {
					let dat = new CFrame();
					dat = dat.mul(playerPosition);

					return dat;
				},
				size: new Vector3(5, 5, 5),
				duration: 0.5,
				hitData: {
					dmgMult: 1,
				},
			},
		},
	},
});

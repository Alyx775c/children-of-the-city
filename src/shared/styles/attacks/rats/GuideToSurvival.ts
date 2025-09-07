import { Skill } from "shared/styles";

export = new Skill({
	0.0: {
		animation: (() => {
			const anim = new Instance("Animation");
			anim.AnimationId = "";

			return anim;
		})(),
		hitbox: {
			cframe: (playerPosition: CFrame) => {
				const dat = new CFrame();
				dat.mul(playerPosition);

				return dat;
			},
			size: new Vector3(5, 5, 5),
			duration: 0.5,
			hitData: {},
		},
	},
});

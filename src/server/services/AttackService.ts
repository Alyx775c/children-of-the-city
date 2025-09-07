import { Service, OnStart } from "@flamework/core";
import { Events } from "server/network";
import { MovesetService } from "./MovesetService";
import { FightingStyle, Skill, SkillData } from "shared/styles";
import { RunService } from "@rbxts/services";
import { HitboxService } from "./HitboxService";

@Service({})
export class AttackService implements OnStart {
	constructor(private movesetService: MovesetService, private hitboxService: HitboxService) {}

	onStart() {
		Events.keypress.connect((plr: Player, inp: InputObject) => {
			const moveset = this.movesetService.getMoveset(plr) as FightingStyle;
			if (moveset === undefined) return;

			for (const [skill, keycode] of pairs(moveset.skills)) {
				if (inp.KeyCode === keycode) {
					this.runSkill(plr, skill);
				}
			}
		});
	}

	private runSkill(player: Player, skill: Skill) {
		let time = 0;
		const times: Array<number> = [];

		// eslint-disable-next-line roblox-ts/no-array-pairs
		for (const [time, _] of pairs(skill.timeline)) {
			times.push(time);
		}

		let nextIndex = 0;

		task.spawn(() => {
			const conn = RunService.Heartbeat.Connect((dt: number) => {
				time += dt;
				while (nextIndex < times.size() && time >= times[nextIndex]) {
					const dat = skill.timeline[times[nextIndex]];
					// we can safely assume that player.character is loaded
					// because they pressed a fuckin button ( this is a complete lie btw )
					if (dat.hitbox) this.hitboxService.MakeHitbox(player.Character as Model, dat.hitbox);
					else if (dat.animation !== "" && dat.animation) print("");

					nextIndex++;
				}
				if (nextIndex >= times.size()) {
					conn.Disconnect();
				}
			});
		});
	}
}

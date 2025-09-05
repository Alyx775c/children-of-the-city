import { Service, OnStart } from "@flamework/core";
import { Events } from "server/network";
import { MovesetService } from "./MovesetService";
import { FightingStyle, Skill } from "shared/styles/Default";
import { RunService } from "@rbxts/services";

@Service({})
export class AttackService implements OnStart {
	constructor(private movesetService: MovesetService) {}

	onStart() {
		Events.keypress.connect((plr: Player, inp: InputObject) => {
			const moveset = this.movesetService.getMoveset(plr) as FightingStyle;
			if (moveset === undefined) return;

			for (const [skill, keycode] of pairs(moveset.skills)) {
				if (inp.KeyCode === keycode) {
					this.runSkill(skill);
				}
			}
		});
	}

	private async runSkill(skill: Skill) {
		let time = 0;
		const times: Array<number> = [];

		for (const [time, _] of pairs(skill.timeline)) {
			times.push(time);
		}

		task.spawn(() => {
			RunService.Heartbeat.Connect((dt: number) => {
				time += dt;
				times.forEach((e) => {
					if (time >= e) {
						times.shift();
					}
				});
			});
		});
	}
}

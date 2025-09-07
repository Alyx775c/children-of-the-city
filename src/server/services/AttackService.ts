import { Service, OnStart } from "@flamework/core";
import { Events } from "server/network";
import { MovesetService } from "./MovesetService";
import { FightingStyle, Skill, SkillData } from "shared/styles";
import { RunService } from "@rbxts/services";
import { HitboxService } from "./HitboxService";
import { Components } from "@flamework/components";
import { PlayerState, PlayerStateComponent } from "server/components/PlayerStateComponent";

@Service({})
export class AttackService implements OnStart {
	constructor(
		private movesetService: MovesetService,
		private hitboxService: HitboxService,
		private components: Components,
	) {}

	onStart() {
		Events.keypress.connect((plr: Player, inp: InputObject) => {
			const moveset = this.movesetService.getMoveset(plr) as FightingStyle;
			if (moveset === undefined) return;

			// this way we save precious time
			const stateComponent = this.components.getComponent<PlayerStateComponent>(plr);
			if (!stateComponent) return;
			if (stateComponent?.getState() === PlayerState.Stunned) return;

			for (const [skill, keycode] of pairs(moveset.skills)) {
				if (inp.KeyCode === keycode) {
					this.runSkill(plr, skill, stateComponent);
				}
			}
		});
	}

	private runSkill(player: Player, skill: Skill, state: PlayerStateComponent) {
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
					const chr = player.Character as Character;

					if (chr) {
						if (dat.hitbox) {
							this.hitboxService.MakeHitbox(chr, dat.hitbox);
							if (dat.hitbox.hitData.stunDuration !== undefined)
								state.setStun(dat.hitbox.hitData.stunDuration);
						} else if (dat.animation) {
							// technically these types aren't nullable but it's better to check
							// for their existence than deal with shitty errors down the line
							const humanoid = chr.Humanoid;
							if (!humanoid) return;

							const animator = humanoid.Animator;
							if (!animator) return;

							const track = animator.LoadAnimation(dat.animation);
							track.Play();
						}
					}

					nextIndex++;
				}
				if (nextIndex >= times.size()) {
					conn.Disconnect();
				}
			});
		});
	}

	applyStun(plr: Player, duration: number) {
		plr;
	}
}

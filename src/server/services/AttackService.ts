import { Service, OnStart } from "@flamework/core";
import { Events } from "server/network";
import { MovesetService } from "./MovesetService";
import { FightingStyle, Skill, SkillData } from "shared/styles/data";
import { RunService } from "@rbxts/services";
import { HitboxService } from "./HitboxService";
import { Components } from "@flamework/components";
import { PlayerState, PlayerStateComponent } from "server/components/PlayerStateComponent";
import { IEffect } from "shared/components/EffectComponent";

@Service({})
export class AttackService implements OnStart {
	constructor(
		private movesetService: MovesetService,
		private hitboxService: HitboxService,
		private components: Components,
	) {}

	onStart() {
		Events.keypress.connect((plr: Player, key: Enum.KeyCode, mouse: Enum.UserInputType) => {
			const moveset = this.movesetService.getMoveset(plr) as FightingStyle;
			if (moveset === undefined) return;

			// this way we save precious time
			const stateComponent = this.components.getComponent<PlayerStateComponent>(plr);
			if (!stateComponent) return;
			if (stateComponent?.getState() === PlayerState.Stunned) return;

			for (const [skill, keycode] of pairs(moveset.skills)) {
				if (key === keycode) {
					print("Found skill", skill);
					this.runSkill(plr, skill, stateComponent);
				}
			}
		});
	}

	private runSkill(player: Player, skill: Skill, state: PlayerStateComponent) {
		let time = 0;
		const times: Array<number> = [];

		if (skill.data.timeline && skill.data.timeline[0]) {
			const timeline = skill.data.timeline as Record<number, SkillData>

			// eslint-disable-next-line roblox-ts/no-array-pairs
			for (const [time, _] of pairs(timeline)) {
				times.push(time);
			}

			let nextIndex = 0;

			task.spawn(() => {
				const conn = RunService.Heartbeat.Connect((dt: number) => {
					time += dt;
					while (nextIndex < times.size() && time >= times[nextIndex]) {
						const dat = timeline[times[nextIndex]];
						const chr = player.Character as Character;

						if (chr) {
							if (dat.hitbox) {
								print("Making hitbox");
								this.hitboxService.MakeHitbox(chr, dat.hitbox);
								if (dat.hitbox.hitData.stunDuration !== undefined)
									state.setStun(dat.hitbox.hitData.stunDuration);
							}

							print("attempting to play animation");

							// technically these types aren't nullable but it's better to check
							// for their existence than deal with shitty errors down the line
							const humanoid = chr.Humanoid;
							if (!humanoid) {
								print("Humanoid is invalid");
								return;
							}

							const animator = humanoid.Animator;
							if (!animator) {
								print("Humanoid's Animator is invalid");
								return;
							}

							const anim = new Instance("Animation");
							if (dat.animation !== undefined) {
								anim.AnimationId = dat.animation;
								print("Playing animation: ", dat.animation);
								const track = animator.LoadAnimation(anim);
								track.Play();
							} else {
								print("Animation ID is undefined, skipping animation.");
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
	}

	calculateDamage(plr: Player, baseDmg: number): number {
		const stateComponent = this.components.getComponent<PlayerStateComponent>(plr);
		if (!stateComponent) return 0;

		let base = baseDmg;

		stateComponent.getEffects().forEach((effect: IEffect, n: number) => {
			base += effect.DamageModifier();
		});

		return base;
	}
}

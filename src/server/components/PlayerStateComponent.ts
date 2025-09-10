import { Dependency, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Players, RunService } from "@rbxts/services";
import { FightingStyle, StyleLookup } from "shared/styles/data";
import PetePage from "shared/styles/pages/rats/PetePage";
import { Events } from "server/network";
import { IEffect } from "shared/components/EffectComponent";

export enum PlayerState {
	Idle,
	Stunned,
}

@Component({})
export class PlayerStateComponent extends BaseComponent<{}, Player> implements OnStart, OnTick {
	private currentState: PlayerState = PlayerState.Idle;
	private stunTime: number = 0;
	private effects: Map<number, IEffect> = new Map();
	private effectTimer: number = 0;
	private playerStyle: FightingStyle = PetePage;

	onStart(): void {
		Events.tryChangeStyle.connect((plr: Player, target: string) => {
			if (StyleLookup[target]) this.playerStyle = StyleLookup[target];
		});
	}

	onTick(dt: number): void {
		this.currentState = PlayerState.Idle;
		this.effectTimer += dt;

		const chr = this.instance.Character as Character | undefined;
		if (!chr) return;

		if (this.effectTimer >= 10) {
			this.effects.forEach((effect: IEffect, n: number) => {
				effect.OnEffectTick();
				if (effect.ExpireNextTick) this.effects.delete(n);
			});

			chr.Humanoid.WalkSpeed = this.playerStyle.moveSpeed;

			// this takes priority over every other state
			if (this.stunTime > 0) {
				if (this.instance.Character) chr.Humanoid.WalkSpeed = 0;
				this.currentState = PlayerState.Stunned;
			}
		}
	}

	/**
	 * this doesnt need to be abs()'d but it prevents negative stun values which may cause unintended behaviour
	 * */
	setStun(n: number) {
		this.stunTime = math.abs(n);
	}

	getState() {
		return this.currentState;
	}

	getEffects() {
		return this.effects;
	}
}

Players.PlayerAdded.Connect((plr: Player) => {
	const components = Dependency<Components>();
	components.addComponent<PlayerStateComponent>(plr);
});

Players.PlayerRemoving.Connect((plr: Player) => {
	const components = Dependency<Components>();
	components.removeComponent<PlayerStateComponent>(plr);
});

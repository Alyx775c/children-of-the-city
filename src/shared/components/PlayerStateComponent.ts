import { Dependency, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Players, RunService } from "@rbxts/services";
import { EffectComponent } from "./EffectComponent";

interface Attributes {}

export enum PlayerState {
	Idle,
	Stunned,
}

@Component({})
export class PlayerStateComponent extends BaseComponent<Attributes> implements OnTick {
	private currentState: PlayerState = PlayerState.Idle;
	private stunTime: number = 0;
	private effects: Array<EffectComponent> = [];
	private effectTimer: number = 0;

	onTick(dt: number): void {
		this.currentState = PlayerState.Idle;
		this.effectTimer += dt;

		if (this.effectTimer >= 10) {
			for (const effect of this.effects) effect.OnEffectTick();
		}

		// this takes priority over every event
		if (this.stunTime > 0) this.currentState = PlayerState.Stunned;
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
}

Players.PlayerAdded.Connect((plr: Player) => {
	const components = Dependency<Components>();
	components.addComponent<PlayerStateComponent>(plr);
});

Players.PlayerRemoving.Connect((plr: Player) => {
	const components = Dependency<Components>();
	components.removeComponent<PlayerStateComponent>(plr);
});

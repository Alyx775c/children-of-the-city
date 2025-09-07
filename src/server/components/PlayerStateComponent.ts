import { Dependency, OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Players, RunService } from "@rbxts/services";
import { EffectComponent } from "../../shared/components/EffectComponent";
import { FightingStyle, StyleLookup } from "shared/styles";
import PetePage from "shared/styles/pages/rats/PetePage";
import { Events } from "server/network";

export enum PlayerState {
	Idle,
	Stunned,
}

@Component({})
export class PlayerStateComponent extends BaseComponent<{}, Player> implements OnStart, OnTick {
	private currentState: PlayerState = PlayerState.Idle;
	private stunTime: number = 0;
	private effects: Array<EffectComponent> = [];
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
			for (const effect of this.effects) {
				effect.OnEffectTick();
				if (effect.expireNextTick) effect.destroy();
			}
		}

		chr.Humanoid.WalkSpeed = this.playerStyle.moveSpeed;

		// this takes priority over every other state
		if (this.stunTime > 0) {
			if (this.instance.Character) chr.Humanoid.WalkSpeed = 0;
			this.currentState = PlayerState.Stunned;
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
}

Players.PlayerAdded.Connect((plr: Player) => {
	const components = Dependency<Components>();
	components.addComponent<PlayerStateComponent>(plr);
});

Players.PlayerRemoving.Connect((plr: Player) => {
	const components = Dependency<Components>();
	components.removeComponent<PlayerStateComponent>(plr);
});

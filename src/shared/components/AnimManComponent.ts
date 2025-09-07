import { Dependency, OnInit, OnStart } from "@flamework/core";
import { Component, BaseComponent, Components } from "@flamework/components";
import { Players } from "@rbxts/services";

interface Attributes {}

@Component({})
export class AnimManComponent extends BaseComponent<Attributes> implements OnInit {
	constructor(private components: Components) {
		super();
	}

	async QueueAnimation() {}

	onInit() {
		Players.PlayerAdded.Connect((plr: Player) => {
			plr.CharacterAdded.Connect((chr: Model) => {
				this.components.addComponent(chr, AnimManComponent);
			});

			plr.CharacterRemoving.Connect((chr: Model) => {
				this.components.removeComponent(chr, AnimManComponent);
			});
		});
	}
}

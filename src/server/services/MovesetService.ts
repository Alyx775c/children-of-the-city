import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { FightingStyle } from "shared/styles";
import PetePage from "shared/styles/pages/rats/PetePage";

@Service({})
export class MovesetService implements OnStart {
	private plrRegistry: Map<Player, FightingStyle> = new Map();

	onStart() {
		Players.PlayerAdded.Connect((plr: Player) => {
			this.plrRegistry.set(plr, PetePage);
		});

		Players.PlayerRemoving.Connect((plr: Player) => {
			this.plrRegistry.delete(plr);
		});
	}

	getMoveset(plr: Player): FightingStyle | unknown {
		return this.plrRegistry.get(plr);
	}
}

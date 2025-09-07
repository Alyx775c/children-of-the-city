import { ReplicatedStorage, ServerScriptService } from "@rbxts/services";
import { Storybook } from "@rbxts/ui-labs";

const storybook: Storybook = {
	name: "Hud",
	storyRoots: [ReplicatedStorage.TS.ui.hud],
};

export = storybook;

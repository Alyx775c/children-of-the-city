import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import { Events } from "client/network";

@Controller({})
export class AttackController implements OnStart {
	onStart(): void {
		UserInputService.InputBegan.Connect((input: InputObject) => {
			print(input.KeyCode);
			Events.keypress(input.KeyCode, input.UserInputType);
		});
	}
}

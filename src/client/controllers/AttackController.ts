import { Controller, OnStart } from "@flamework/core";
import { Events } from "client/network";
import { OnInputBegan } from "shared/lifetime";

@Controller({})
export class AttackController implements OnInputBegan {
	inputBegan(input: InputObject): void {
		Events.keypress(input);
	}
}

import { Modding, OnStart, Service } from "@flamework/core";
import { UserInputService } from "@rbxts/services";

export interface OnInputBegan {
	inputBegan(input: InputObject): void;
}

export interface OnInputEnd {
	inputEnded(input: InputObject): void;
}

@Service()
class InputLifetime implements OnStart {
	onStart() {
		const beganListeners = new Set<OnInputBegan>();
		const endedListeners = new Set<OnInputEnd>();

		Modding.onListenerAdded<OnInputBegan>((object) => beganListeners.add(object));
		Modding.onListenerRemoved<OnInputBegan>((object) => beganListeners.delete(object));

		Modding.onListenerAdded<OnInputEnd>((object) => endedListeners.add(object));
		Modding.onListenerRemoved<OnInputEnd>((object) => endedListeners.delete(object));

		UserInputService.InputBegan.Connect((input: InputObject) => {
			for (const listener of beganListeners) {
				task.spawn(() => listener.inputBegan(input));
			}
		});

		UserInputService.InputEnded.Connect((input: InputObject) => {
			for (const listener of endedListeners) {
				task.spawn(() => listener.inputEnded(input));
			}
		});
	}
}

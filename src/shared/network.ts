import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	keypress(inputObject: InputObject, mousePress: Enum.UserInputType): void;
	tryChangeStyle(targetStyleID: string): void;
}

interface ServerToClientEvents {}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();

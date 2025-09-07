import { OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

interface Attributes {}

@Component({})
export class EffectComponent extends BaseComponent<Attributes> {
	expireNextTick: boolean = false;

	/**
	 * Effect tick, happens every 10 seconds
	 */
	OnEffectTick(): void {}
}

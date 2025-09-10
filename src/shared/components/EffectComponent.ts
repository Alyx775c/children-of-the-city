import { OnStart, OnTick } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

export interface IEffect {
	ExpireNextTick: boolean;

	/**
	 * Effect tick, happens every 10 seconds
	 */
	OnEffectTick(): void;

	/**
	 * Damage Modifier
	 */
	DamageModifier(): number;
}

import { FightingStyle, Skill } from "../../data";
import BiteOff from "../../attacks/rats/GuideToSurvival";

export = new FightingStyle({
	id: "PetePage",
	name: "Pete's Page",
	skills: new Map<Skill, Enum.KeyCode>([[BiteOff, Enum.KeyCode.R]]),
	passives: [],
	defaultMoveSpeed: 16,
});

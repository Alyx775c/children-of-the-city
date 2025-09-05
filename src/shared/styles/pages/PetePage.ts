import { FightingStyle, Skill } from "..";
import BiteOff from "../attacks/rats/BiteOff";

export = new FightingStyle("Pete's Page", new Map<Skill, Enum.KeyCode>([[BiteOff, Enum.KeyCode.R]]));

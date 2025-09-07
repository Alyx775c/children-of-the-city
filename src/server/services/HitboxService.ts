import { Service } from "@flamework/core";
import { HitboxData } from "shared/styles";

@Service({})
export class HitboxService {
	public MakeHitbox(character: Model, data: HitboxData) {
		const hb = new Instance("Part");
		hb.CanCollide = false;
		hb.CanQuery = true;
		hb.Size = data.size;
		hb.CFrame = data.cframe(character.PrimaryPart?.CFrame as CFrame);

		hb.Touched.Connect((part: BasePart) => {});
	}
}

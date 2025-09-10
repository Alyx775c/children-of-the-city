import { Service } from "@flamework/core";
import { Debris, Workspace } from "@rbxts/services";
import { HitboxData } from "shared/styles/data";

@Service({})
export class HitboxService {
	public MakeHitbox(character: Model, data: HitboxData) {
		const hbGroup = new Instance("Model");
		const humanoid = new Instance("Humanoid");
		humanoid.Parent = hbGroup;

		const hb = new Instance("Part");
		hb.CanCollide = false;
		hb.CanQuery = true;
		hb.Size = data.size;
		hb.CFrame = data.cframe(character.PrimaryPart?.CFrame as CFrame);
		hb.Name = "Hitbox";
		hb.Anchored = true;
		hb.Material = Enum.Material.SmoothPlastic;
		hb.Color = new Color3(0.6, 0, 0);

		hb.Touched.Connect((part: BasePart) => {});

		Debris.AddItem(hb, 0.1);

		hb.Parent = Workspace;
	}
}

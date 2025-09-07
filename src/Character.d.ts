type Character = Model & {
	["Left Leg"]: Part & {
		LeftFootAttachment: Attachment;
	};
	Humanoid: Humanoid & {
		Animator: Animator;
		HumanoidDescription: HumanoidDescription;
	};
	["Right Leg"]: Part & {
		RightFootAttachment: Attachment;
	};
	Head: Part & {
		HatAttachment: Attachment;
		FaceFrontAttachment: Attachment;
		HairAttachment: Attachment;
		face: Decal;
		Mesh: SpecialMesh;
		FaceCenterAttachment: Attachment;
	};
	Torso: Part & {
		RightCollarAttachment: Attachment;
		WaistCenterAttachment: Attachment;
		BodyBackAttachment: Attachment;
		Neck: Motor6D;
		LeftCollarAttachment: Attachment;
		["Left Hip"]: Motor6D;
		roblox: Decal;
		["Right Hip"]: Motor6D;
		["Left Shoulder"]: Motor6D;
		["Right Shoulder"]: Motor6D;
		BodyFrontAttachment: Attachment;
		WaistBackAttachment: Attachment;
		WaistFrontAttachment: Attachment;
		NeckAttachment: Attachment;
	};
	HumanoidRootPart: Part & {
		RootJoint: Motor6D;
		RootAttachment: Attachment;
	};
	["Right Arm"]: Part & {
		RightShoulderAttachment: Attachment;
		RightGripAttachment: Attachment;
	};
	["Left Arm"]: Part & {
		LeftGripAttachment: Attachment;
		LeftShoulderAttachment: Attachment;
	};
	["Body Colors"]: BodyColors;
};

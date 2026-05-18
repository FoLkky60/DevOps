export type LabColor =
  | "cyan"
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "fuchsia";

export type LabShadow = "soft" | "deep" | "neon" | "inset";

export type LabAnimation = "steady" | "float" | "pulse" | "drift" | "spin";

export type LabTypography = "sans" | "mono" | "display" | "wide";

export interface LabConfig {
  color: LabColor;
  borderRadius: 12 | 20 | 28 | 36 | 48 | 64;
  shadow: LabShadow;
  animation: LabAnimation;
  typography: LabTypography;
}

export interface Recipe {
  _id: string;
  name: string;
  config: LabConfig;
  generatedCode: string;
  likes: number;
  createdAt: string;
}

export interface RecipeInput {
  name: string;
  config: LabConfig;
  generatedCode: string;
}

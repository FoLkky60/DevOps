import type {
  LabAnimation,
  LabColor,
  LabConfig,
  LabShadow,
  LabTypography,
  Recipe,
} from "@/types/recipe";

export const LAB_CONFIG_STORAGE_KEY = "chaos-lab:selected-recipe";

export const COLOR_OPTIONS: Array<{ value: LabColor; label: string }> = [
  { value: "cyan", label: "Cryo Cyan" },
  { value: "violet", label: "Ion Violet" },
  { value: "emerald", label: "Bio Emerald" },
  { value: "amber", label: "Plasma Amber" },
  { value: "rose", label: "Nova Rose" },
  { value: "fuchsia", label: "Quantum Fuchsia" },
];

export const SHADOW_OPTIONS: Array<{ value: LabShadow; label: string }> = [
  { value: "soft", label: "Soft Vapor" },
  { value: "deep", label: "Deep Reactor" },
  { value: "neon", label: "Neon Burst" },
  { value: "inset", label: "Inset Glass" },
];

export const ANIMATION_OPTIONS: Array<{ value: LabAnimation; label: string }> = [
  { value: "steady", label: "Steady" },
  { value: "float", label: "Float" },
  { value: "pulse", label: "Pulse" },
  { value: "drift", label: "Drift" },
  { value: "spin", label: "Spin" },
];

export const TYPOGRAPHY_OPTIONS: Array<{ value: LabTypography; label: string }> = [
  { value: "sans", label: "Clean Sans" },
  { value: "mono", label: "Terminal Mono" },
  { value: "display", label: "Display Alloy" },
  { value: "wide", label: "Wide Signal" },
];

export const RADIUS_OPTIONS = [12, 20, 28, 36, 48, 64] as const;

const COLOR_PROFILES: Record<
  LabColor,
  {
    label: string;
    accent: string;
    border: string;
    surface: string;
    chip: string;
    glow: string;
    text: string;
    code: string;
  }
> = {
  cyan: {
    label: "Cryo Cyan",
    accent: "from-cyan-400/30 via-sky-400/15 to-slate-950",
    border: "border-cyan-300/30",
    surface: "bg-cyan-400/8",
    chip: "border-cyan-300/30 bg-cyan-400/10 text-cyan-100",
    glow: "shadow-[0_0_36px_rgba(34,211,238,0.3)]",
    text: "text-cyan-50",
    code: "text-cyan-100",
  },
  violet: {
    label: "Ion Violet",
    accent: "from-violet-400/30 via-fuchsia-400/15 to-slate-950",
    border: "border-violet-300/30",
    surface: "bg-violet-400/8",
    chip: "border-violet-300/30 bg-violet-400/10 text-violet-100",
    glow: "shadow-[0_0_36px_rgba(168,85,247,0.3)]",
    text: "text-violet-50",
    code: "text-violet-100",
  },
  emerald: {
    label: "Bio Emerald",
    accent: "from-emerald-400/30 via-cyan-400/15 to-slate-950",
    border: "border-emerald-300/30",
    surface: "bg-emerald-400/8",
    chip: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
    glow: "shadow-[0_0_36px_rgba(16,185,129,0.3)]",
    text: "text-emerald-50",
    code: "text-emerald-100",
  },
  amber: {
    label: "Plasma Amber",
    accent: "from-amber-400/30 via-orange-400/15 to-slate-950",
    border: "border-amber-300/30",
    surface: "bg-amber-400/8",
    chip: "border-amber-300/30 bg-amber-400/10 text-amber-100",
    glow: "shadow-[0_0_36px_rgba(245,158,11,0.32)]",
    text: "text-amber-50",
    code: "text-amber-100",
  },
  rose: {
    label: "Nova Rose",
    accent: "from-rose-400/30 via-pink-400/15 to-slate-950",
    border: "border-rose-300/30",
    surface: "bg-rose-400/8",
    chip: "border-rose-300/30 bg-rose-400/10 text-rose-100",
    glow: "shadow-[0_0_36px_rgba(244,63,94,0.3)]",
    text: "text-rose-50",
    code: "text-rose-100",
  },
  fuchsia: {
    label: "Quantum Fuchsia",
    accent: "from-fuchsia-400/30 via-violet-400/15 to-slate-950",
    border: "border-fuchsia-300/30",
    surface: "bg-fuchsia-400/8",
    chip: "border-fuchsia-300/30 bg-fuchsia-400/10 text-fuchsia-100",
    glow: "shadow-[0_0_36px_rgba(217,70,239,0.3)]",
    text: "text-fuchsia-50",
    code: "text-fuchsia-100",
  },
};

const SHADOW_PROFILES: Record<
  LabShadow,
  { label: string; className: string; code: string }
> = {
  soft: {
    label: "Soft Vapor",
    className: "shadow-[0_20px_50px_-24px_rgba(15,23,42,0.85)]",
    code: "shadow-[0_20px_50px_-24px_rgba(15,23,42,0.85)]",
  },
  deep: {
    label: "Deep Reactor",
    className: "shadow-[0_28px_60px_-20px_rgba(2,6,23,0.9)]",
    code: "shadow-[0_28px_60px_-20px_rgba(2,6,23,0.9)]",
  },
  neon: {
    label: "Neon Burst",
    className: "shadow-[0_0_40px_rgba(56,189,248,0.35)]",
    code: "shadow-[0_0_40px_rgba(56,189,248,0.35)]",
  },
  inset: {
    label: "Inset Glass",
    className: "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
    code: "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
  },
};

const ANIMATION_PROFILES: Record<
  LabAnimation,
  { label: string; className: string; code: string }
> = {
  steady: {
    label: "Steady",
    className: "",
    code: "",
  },
  float: {
    label: "Float",
    className: "animate-lab-float",
    code: "animate-lab-float",
  },
  pulse: {
    label: "Pulse",
    className: "animate-lab-pulse",
    code: "animate-lab-pulse",
  },
  drift: {
    label: "Drift",
    className: "animate-lab-drift",
    code: "animate-lab-drift",
  },
  spin: {
    label: "Spin",
    className: "animate-lab-spin",
    code: "animate-lab-spin",
  },
};

const TYPOGRAPHY_PROFILES: Record<
  LabTypography,
  { label: string; className: string; code: string }
> = {
  sans: {
    label: "Clean Sans",
    className: "font-sans tracking-tight",
    code: "font-sans tracking-tight",
  },
  mono: {
    label: "Terminal Mono",
    className: "font-mono tracking-[0.22em] uppercase",
    code: "font-mono tracking-[0.22em] uppercase",
  },
  display: {
    label: "Display Alloy",
    className: "font-serif tracking-tight",
    code: "font-serif tracking-tight",
  },
  wide: {
    label: "Wide Signal",
    className: "font-sans tracking-[0.3em] uppercase",
    code: "font-sans tracking-[0.3em] uppercase",
  },
};

const RADIUS_PROFILES: Record<LabConfig["borderRadius"], { label: string; className: string; code: string }> = {
  12: { label: "12px", className: "rounded-xl", code: "rounded-xl" },
  20: { label: "20px", className: "rounded-2xl", code: "rounded-2xl" },
  28: { label: "28px", className: "rounded-[28px]", code: "rounded-[28px]" },
  36: { label: "36px", className: "rounded-[36px]", code: "rounded-[36px]" },
  48: { label: "48px", className: "rounded-[48px]", code: "rounded-[48px]" },
  64: { label: "64px", className: "rounded-[64px]", code: "rounded-[64px]" },
};

export const DEFAULT_CONFIG: LabConfig = {
  color: "cyan",
  borderRadius: 28,
  shadow: "neon",
  animation: "float",
  typography: "mono",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function pickRandom<T>(values: readonly T[]) {
  return values[Math.floor(Math.random() * values.length)];
}

export function createRandomConfig(): LabConfig {
  return {
    color: pickRandom(COLOR_OPTIONS).value,
    borderRadius: pickRandom(RADIUS_OPTIONS),
    shadow: pickRandom(SHADOW_OPTIONS).value,
    animation: pickRandom(ANIMATION_OPTIONS).value,
    typography: pickRandom(TYPOGRAPHY_OPTIONS).value,
  };
}

export function normalizeConfig(config: unknown): LabConfig {
  const candidate = config as Partial<LabConfig> | null | undefined;

  return {
    color: COLOR_OPTIONS.some((option) => option.value === candidate?.color)
      ? (candidate?.color as LabColor)
      : DEFAULT_CONFIG.color,
    borderRadius: RADIUS_OPTIONS.includes(
      candidate?.borderRadius as (typeof RADIUS_OPTIONS)[number],
    )
      ? (candidate?.borderRadius as LabConfig["borderRadius"])
      : DEFAULT_CONFIG.borderRadius,
    shadow: SHADOW_OPTIONS.some((option) => option.value === candidate?.shadow)
      ? (candidate?.shadow as LabShadow)
      : DEFAULT_CONFIG.shadow,
    animation: ANIMATION_OPTIONS.some(
      (option) => option.value === candidate?.animation,
    )
      ? (candidate?.animation as LabAnimation)
      : DEFAULT_CONFIG.animation,
    typography: TYPOGRAPHY_OPTIONS.some(
      (option) => option.value === candidate?.typography,
    )
      ? (candidate?.typography as LabTypography)
      : DEFAULT_CONFIG.typography,
  };
}

export function getConfigLabel(config: LabConfig) {
  return {
    color: COLOR_PROFILES[config.color].label,
    borderRadius: RADIUS_PROFILES[config.borderRadius].label,
    shadow: SHADOW_PROFILES[config.shadow].label,
    animation: ANIMATION_PROFILES[config.animation].label,
    typography: TYPOGRAPHY_PROFILES[config.typography].label,
  };
}

export function getPreviewClasses(config: LabConfig) {
  const color = COLOR_PROFILES[config.color];
  const radius = RADIUS_PROFILES[config.borderRadius];
  const shadow = SHADOW_PROFILES[config.shadow];
  const animation = ANIMATION_PROFILES[config.animation];
  const typography = TYPOGRAPHY_PROFILES[config.typography];

  return cn(
    "relative overflow-hidden border bg-gradient-to-br transition-all duration-500",
    color.accent,
    color.border,
    color.text,
    color.glow,
    radius.className,
    shadow.className,
    animation.className,
    typography.className,
  );
}

export function getPreviewPanelClasses(config: LabConfig) {
  const color = COLOR_PROFILES[config.color];
  return cn(
    "relative overflow-hidden border bg-slate-950/70 backdrop-blur-2xl",
    color.border,
    color.glow,
    color.surface,
    "rounded-[30px]",
  );
}

export function generateChaosCode(config: LabConfig) {
  const color = COLOR_PROFILES[config.color];
  const radius = RADIUS_PROFILES[config.borderRadius];
  const shadow = SHADOW_PROFILES[config.shadow];
  const animation = ANIMATION_PROFILES[config.animation];
  const typography = TYPOGRAPHY_PROFILES[config.typography];

  const className = cn(
    "group relative overflow-hidden border bg-gradient-to-br px-6 py-5 transition-all duration-500",
    color.accent,
    color.border,
    color.text,
    color.glow,
    radius.code,
    shadow.code,
    animation.code,
    typography.code,
  );

  return [
    "export function ChaosCard() {",
    "  return (",
    `    <div className=\"${className}\">`,
    '      <h3 className="text-lg font-semibold">Chaos Lab</h3>',
    '      <p className="mt-2 text-sm text-white/70">A generated interface recipe.</p>',
    "    </div>",
    "  );",
    "}",
  ].join("\n");
}

export function summarizeConfig(config: LabConfig) {
  const labels = getConfigLabel(config);

  return [
    { label: "Color", value: labels.color },
    { label: "Radius", value: labels.borderRadius },
    { label: "Shadow", value: labels.shadow },
    { label: "Animation", value: labels.animation },
    { label: "Typography", value: labels.typography },
  ];
}

export function formatRecipeDate(recipe: Recipe) {
  return new Date(recipe.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function recipeFromStorage(value: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<Recipe>;

    return {
      _id: String(parsed._id ?? "local"),
      name: typeof parsed.name === "string" ? parsed.name : "Loaded Recipe",
      config: normalizeConfig(parsed.config),
      generatedCode:
        typeof parsed.generatedCode === "string"
          ? parsed.generatedCode
          : generateChaosCode(normalizeConfig(parsed.config)),
      likes: typeof parsed.likes === "number" ? parsed.likes : 0,
      createdAt:
        typeof parsed.createdAt === "string"
          ? parsed.createdAt
          : new Date().toISOString(),
    } satisfies Recipe;
  } catch {
    return null;
  }
}

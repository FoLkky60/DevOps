"use client";

import { useState } from "react";
import { DEFAULT_CONFIG, createRandomConfig, generateChaosCode } from "@/lib/utils";
import type { LabAnimation, LabColor, LabConfig, LabShadow, LabTypography } from "@/types/recipe";

export function useChaosMixer(initialConfig?: LabConfig) {
  const [config, setConfig] = useState<LabConfig>(initialConfig ?? DEFAULT_CONFIG);
  const [recipeName, setRecipeName] = useState("Nebula Blend");
  const [burstKey, setBurstKey] = useState(0);

  const generatedCode = generateChaosCode(config);

  const updateConfig = (patch: Partial<LabConfig>) => {
    setConfig((current) => ({ ...current, ...patch }));
  };

  const setColor = (color: LabColor) => updateConfig({ color });
  const setBorderRadius = (borderRadius: LabConfig["borderRadius"]) =>
    updateConfig({ borderRadius });
  const setShadow = (shadow: LabShadow) => updateConfig({ shadow });
  const setAnimation = (animation: LabAnimation) => updateConfig({ animation });
  const setTypography = (typography: LabTypography) => updateConfig({ typography });

  const randomizeChaos = () => {
    setConfig(createRandomConfig());
    setBurstKey((current) => current + 1);
  };

  const resetChaos = () => {
    setConfig(DEFAULT_CONFIG);
    setRecipeName("Nebula Blend");
    setBurstKey((current) => current + 1);
  };

  const applyConfig = (nextConfig: LabConfig) => {
    setConfig(nextConfig);
  };

  return {
    config,
    recipeName,
    setRecipeName,
    burstKey,
    generatedCode,
    setColor,
    setBorderRadius,
    setShadow,
    setAnimation,
    setTypography,
    randomizeChaos,
    resetChaos,
    applyConfig,
    setConfig,
  };
}

"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ChaosButtonProps {
  burstKey: number;
  onClick: () => void;
  disabled?: boolean;
}

export function ChaosButton({ burstKey, onClick, disabled }: ChaosButtonProps) {
  const particles = Array.from({ length: 10 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 10;
    const distance = 70 + (index % 3) * 12;

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">

      <AnimatePresence>
        {burstKey > 0 ? (
          <motion.span
            key={burstKey}
            className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.8)]"
            initial={{ scale: 0.3, opacity: 0.9 }}
            animate={{ scale: 10, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {burstKey > 0
          ? particles.map((particle, index) => (
              <motion.span
                key={`${burstKey}-${index}`}
                className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-white"
                initial={{ x: 0, y: 0, opacity: 0.95, scale: 1 }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                  scale: 0.2,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))
          : null}
      </AnimatePresence>
    </div>
  );
}

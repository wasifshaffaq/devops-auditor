"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const SpotlightCard = ({
  children,
  className = "",
  containerClassName = "",
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative rounded-soft border border-white/5 bg-[#080808] transition-colors duration-500 overflow-hidden ${containerClassName}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-soft opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(0, 163, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  );
};

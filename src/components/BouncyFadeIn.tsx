"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BouncyFadeInProps {
  children: ReactNode;
  delay?: number;
  bounce?: number;
  threshold?: number;
  className?: string;
}

export default function BouncyFadeIn({
  children,
  delay = 0,
  bounce = 0.7,
  threshold = 0.5,
  className,
}: BouncyFadeInProps) {
  const variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: bounce > 0 ? ("spring" as const) : ("tween" as const),
        damping: bounce > 0 ? 8 : undefined,
        stiffness: bounce > 0 ? 150 : undefined,
        duration: 0.6,
        delay,
        ease: bounce === 0 ? ("easeOut" as const) : undefined,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

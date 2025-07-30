'use client'; // This is important for client-side components in Next.js 13+ App Router

import React from 'react';
import { motion } from 'framer-motion';

interface BouncyFadeInProps {
  children: React.ReactNode;
  delay?: number; // Optional delay before the animation starts
  duration?: number; // Optional duration of the animation
  bounce?: number; // Optional bounce value for the spring animation (0-1)
  threshold?: number; // How much of the item needs to be visible to trigger (0-1)
  className?: string; // Optional CSS class for styling
}

const BouncyFadeIn: React.FC<BouncyFadeInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bounce = 0.7, // More bounce for a more dynamic effect
  threshold = 0.5, // Trigger when 50% of the element is visible
  className,
}) => {
  const variants = {
    hidden: { opacity: 0, y: 60 }, // Start further below for more dramatic effect
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const, // Use spring physics for the bounce
        damping: 8, // Lower damping for more oscillations
        stiffness: 150, // Higher stiffness for faster initial movement
        duration: duration,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible" // Triggers when the element enters the viewport
      viewport={{ once: true, amount: threshold }} // Animate only once and define visibility threshold
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default BouncyFadeIn; 
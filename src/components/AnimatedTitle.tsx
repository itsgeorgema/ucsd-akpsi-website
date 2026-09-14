"use client";

import { useState, useEffect } from "react";

interface AnimatedTitleProps {
  texts?: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function AnimatedTitle({
  texts = ["ALPHA\nKAPPA PSI.", "NU XI\nCHAPTER."],
  typeSpeed = 80, // lower is faster
  deleteSpeed = 50, // lower is faster
  pauseDuration = 2250,
  className = "",
}: AnimatedTitleProps) {
  const [isTyping, setIsTyping] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const currentText = texts[currentTextIndex];
  const isActivelyTyping = isTyping
    ? currentCharIndex < currentText.length
    : currentCharIndex > 0;

  useEffect(() => {
    if (isTyping) {
      if (currentCharIndex < currentText.length) {
        const timer = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + 1);
        }, typeSpeed);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsTyping(false), pauseDuration);
        return () => clearTimeout(timer);
      }
    } else {
      if (currentCharIndex > 0) {
        const timer = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex - 1);
        }, deleteSpeed);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setIsTyping(true);
        }, 1750);
        return () => clearTimeout(timer);
      }
    }
  }, [
    currentCharIndex,
    isTyping,
    currentText,
    texts.length,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
  ]);

  return (
    <div className={`block whitespace-pre-line relative ${className}`}>
      <div className="absolute bottom-0 left-0 right-0">
        {currentText.slice(0, currentCharIndex)}
        <span
          className={`typewriter-cursor ${isActivelyTyping ? "no-blink" : ""}`}
        ></span>
      </div>
    </div>
  );
}

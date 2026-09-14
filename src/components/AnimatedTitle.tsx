"use client";

import { useState, useEffect } from "react";

const TEXTS = ["ALPHA\nKAPPA PSI.", "NU XI\nCHAPTER."];
const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_DURATION = 2250;

export default function AnimatedTitle() {
  const [isTyping, setIsTyping] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const currentText = TEXTS[currentTextIndex];
  const isActivelyTyping = isTyping
    ? currentCharIndex < currentText.length
    : currentCharIndex > 0;

  useEffect(() => {
    if (isTyping) {
      if (currentCharIndex < currentText.length) {
        const timer = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + 1);
        }, TYPE_SPEED);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setIsTyping(false), PAUSE_DURATION);
        return () => clearTimeout(timer);
      }
    } else {
      if (currentCharIndex > 0) {
        const timer = setTimeout(() => {
          setCurrentCharIndex(currentCharIndex - 1);
        }, DELETE_SPEED);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % TEXTS.length);
          setIsTyping(true);
        }, 1750);
        return () => clearTimeout(timer);
      }
    }
  }, [currentCharIndex, isTyping, currentText]);

  return (
    <div className="block whitespace-pre-line relative">
      <div className="absolute bottom-0 left-0 right-0">
        {currentText.slice(0, currentCharIndex)}
        <span
          className={`typewriter-cursor ${isActivelyTyping ? "no-blink" : ""}`}
        ></span>
      </div>
    </div>
  );
}

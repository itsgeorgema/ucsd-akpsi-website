'use client';

import { useState, useEffect } from 'react';

interface AnimatedTitleProps {
  texts?: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function AnimatedTitle({
  texts = [
    'ALPHA\nKAPPA PSI.',
    'NU XI\nCHAPTER.'
  ],
  typeSpeed = 80, // lower is faster
  deleteSpeed = 50, // lower is faster
  pauseDuration = 2250,
  className = ''
}: AnimatedTitleProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isActivelyTyping, setIsActivelyTyping] = useState(false);

  useEffect(() => {
    if (isTyping) {
      if (currentCharIndex < texts[currentTextIndex].length) {
        setIsActivelyTyping(true);
        const timer = setTimeout(() => {
          setDisplayText(texts[currentTextIndex].slice(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        }, typeSpeed);
        return () => clearTimeout(timer);
      } else {
        setIsActivelyTyping(false);
        const timer = setTimeout(() => setIsTyping(false), pauseDuration);
        return () => clearTimeout(timer);
      }
    } else {
      if (currentCharIndex > 0) {
        setIsActivelyTyping(true);
        const timer = setTimeout(() => {
          setDisplayText(texts[currentTextIndex].slice(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        }, deleteSpeed);
        return () => clearTimeout(timer);
      } else {
        setIsActivelyTyping(false);
        const timer = setTimeout(() => {
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setIsTyping(true);
        }, 1750);
        return () => clearTimeout(timer);
      }
    }
  }, [currentCharIndex, isTyping, currentTextIndex, texts, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <div className={`block whitespace-pre-line relative ${className}`}>
      <div className="absolute bottom-0 left-0 right-0">
        {displayText}
        <span className={`typewriter-cursor ${isActivelyTyping ? 'no-blink' : ''}`}></span>
      </div>
    </div>
  );
} 
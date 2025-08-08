'use client';

import { useEffect, useRef, useState } from 'react';

export type ColumnsBreakpoint = {
  minWidth: number;
  columns: number;
};

/**
 * Compute a responsive column count on the client without causing SSR mismatches.
 * - Initializes with `initialColumns` (default 1) to avoid hydration issues
 * - Uses a throttled resize listener to avoid excessive re-renders
 * - Only updates state when the computed column count actually changes
 * - Breakpoints should be sorted in descending order by minWidth for optimal performance
 */
export function useResponsiveColumns(
  breakpoints: ColumnsBreakpoint[],
  initialColumns: number = 1,
  throttleMs: number = 120,
): number {
  const [columns, setColumns] = useState<number>(initialColumns);
  const rafIdRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Sort breakpoints in descending order by minWidth for optimal performance
  const sortedBreakpoints = [...breakpoints].sort((a, b) => b.minWidth - a.minWidth);

  // Validate breakpoints are properly sorted (for development)
  if (process.env.NODE_ENV === 'development') {
    const isProperlySorted = breakpoints.every((breakpoint, index) => {
      if (index === 0) return true;
      return breakpoint.minWidth <= breakpoints[index - 1].minWidth;
    });
    
    if (!isProperlySorted) {
      console.warn(
        'useResponsiveColumns: Breakpoints should be sorted in descending order by minWidth for optimal performance. ' +
        'The hook will automatically sort them, but consider sorting them in your component for better performance.'
      );
    }
  }

  useEffect(() => {
    const computeColumns = () => {
      if (typeof window === 'undefined') return initialColumns;
      const width = window.innerWidth;
      for (const { minWidth, columns } of sortedBreakpoints) {
        if (width >= minWidth) return columns;
      }
      return initialColumns;
    };

    const applyColumns = () => {
      const next = computeColumns();
      setColumns(prev => (prev !== next ? next : prev));
    };

    // Initial apply after mount
    applyColumns();

    const onResize = () => {
      if (timeoutRef.current !== null) return; // throttle
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null;
        if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
          applyColumns();
          rafIdRef.current = null;
        });
      }, throttleMs);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [sortedBreakpoints, initialColumns, throttleMs]);

  return columns;
}


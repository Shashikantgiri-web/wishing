'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type HexagonBackgroundProps = React.ComponentProps<'div'> & {
  hexagonProps?: React.ComponentProps<'div'>;
  hexagonSize?: number; // value greater than 50
  hexagonMargin?: number;
  glowColor?: string;
  gridOpacity?: number;
};

/**
 * HexagonBackground - Premium 'Background of Backgrounds'
 * A multi-layered background system featuring a radial glow,
 * interactive hexagon grid, and modern vignette overlay.
 */
function HexagonBackground({
  className,
  children,
  hexagonProps,
  hexagonSize = 80,
  hexagonMargin = 4,
  glowColor = 'oklch(0.623 0.214 259.815 / 0.15)', // Using theme-like oklch
  gridOpacity = 0.4,
  ...props
}: HexagonBackgroundProps) {
  const hexagonWidth = hexagonSize;
  const hexagonHeight = hexagonSize * 1.15;
  const rowSpacing = hexagonSize * 0.85;
  const baseMarginTop = -40; // Base offset
  const computedMarginTop = baseMarginTop + hexagonMargin;
  const oddRowMarginLeft = -(hexagonSize / 2);
  const evenRowMarginLeft = hexagonMargin / 2;

  const [gridDimensions, setGridDimensions] = React.useState({
    rows: 0,
    columns: 0,
  });

  const updateGridDimensions = React.useCallback(() => {
    // Adding extra buffers to ensure full coverage during resize
    const rows = Math.ceil(window.innerHeight / rowSpacing) + 3;
    const columns = Math.ceil(window.innerWidth / hexagonWidth) + 3;
    setGridDimensions({ rows, columns });
  }, [rowSpacing, hexagonWidth]);

  React.useEffect(() => {
    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, [updateGridDimensions]);

  return (
    <div
      data-slot="hexagon-background"
      className={cn(
        'fixed inset-0 overflow-hidden pointer-events-none select-none',
        'bg-white dark:bg-neutral-950',
        className,
      )}
      {...props}
    >
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 z-0 scale-150 blur-3xl"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 60%)`,
        }}
      />

      {/* Hexagon Grid layer */}
      <div 
        className="absolute inset-0 z-10 transition-opacity duration-1000"
        style={{ opacity: gridOpacity }}
      >
        <div className="relative size-full">
          {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              style={{
                marginTop: computedMarginTop,
                marginLeft:
                  ((rowIndex + 1) % 2 === 0
                    ? evenRowMarginLeft
                    : oddRowMarginLeft) - 20,
              }}
              className="inline-flex whitespace-nowrap"
            >
              {Array.from({ length: gridDimensions.columns }).map(
                (_, colIndex) => (
                  <div
                    key={`hexagon-${rowIndex}-${colIndex}`}
                    {...hexagonProps}
                    style={{
                      width: hexagonWidth,
                      height: hexagonHeight,
                      marginLeft: hexagonMargin,
                      ...hexagonProps?.style,
                    }}
                    className={cn(
                      'relative transition-all duration-700 ease-in-out',
                      '[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                      // Outer border look
                      'before:content-[""] before:absolute before:inset-0 before:bg-neutral-200 dark:before:bg-neutral-800/30',
                      // Inner background (gap creates the border)
                      'after:content-[""] after:absolute after:inset-[1px] after:bg-white dark:after:bg-neutral-950',
                      'after:[clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]',
                      // Interactive hover state
                      'hover:before:bg-primary/20 dark:hover:before:bg-primary/40',
                      hexagonProps?.className,
                    )}
                  />
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modern Vignette Overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.03) 100%)',
        }}
      />

      {/* Dark mode specific vignette */}
      <div 
        className="hidden dark:block absolute inset-0 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
      
      {children}
    </div>
  );
}

export { HexagonBackground };
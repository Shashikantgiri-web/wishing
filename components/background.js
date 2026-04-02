import { HexagonBackground } from '@/components/animate-ui/components/backgrounds/hexagon';

export const HexagonBackgroundDemo = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <HexagonBackground 
        className="size-full" 
        hexagonSize={100}
        hexagonMargin={2}
      />
    </div>
  );
};
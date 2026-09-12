// Shared by the build-time image generator and the rendered srcset.
export const imageWidths = [400, 480, 640, 768, 800, 1200] as const;

// Match .shell and the corresponding grids in index.css. Desktop containers
// cap at 1280px; tablet/mobile gutters are 64px/40px respectively.
function columnSizes(fraction: number, gap: number, tabletGap: number) {
  const column = (guttersAndGap: number) =>
    `calc(${(100 * fraction).toFixed(6)}vw - ${(guttersAndGap * fraction).toFixed(6)}px)`;
  return [
    '(max-width: 760px) calc(100vw - 40px)',
    `(max-width: 1100px) ${column(64 + tabletGap)}`,
    `(max-width: 1392px) ${column(112 + gap)}`,
    `${((1280 - gap) * fraction).toFixed(6)}px`,
  ].join(', ');
}

export const imageSizes = {
  hero: columnSizes(1 / 2.08, 50, 30),
  about: columnSizes(0.82 / 1.82, 80, 40),
  service: columnSizes(1 / 2.15, 70, 40),
};

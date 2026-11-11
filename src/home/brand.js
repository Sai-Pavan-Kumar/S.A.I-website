// The mark, exactly as in brand/logo/sai-mark-gradient.svg: four circles of radius 24 on a
// 96-unit square, linear gradients from light (top right) to deep (bottom left), drawn in this
// order with slight transparency so the overlaps mix, and a hollow centre of radius 6.
export const MARK = {
  box: 96,
  radius: 24,
  hollow: 6,
  circles: [
    { key: 'learn', name: 'Learn', x: 0, y: -24, from: '#6FB2FF', to: '#0636D9', opacity: 0.94 },
    { key: 'prove', name: 'Prove', x: 24, y: 0, from: '#5EDDBE', to: '#08735F', opacity: 0.86 },
    { key: 'build', name: 'Build', x: 0, y: 24, from: '#FFD24D', to: '#EE6A05', opacity: 0.86 },
    { key: 'placed', name: 'Get placed', x: -24, y: 0, from: '#FF9478', to: '#D92B14', opacity: 0.86 },
  ],
};

export const CIRCLE = Object.fromEntries(MARK.circles.map((circle) => [circle.key, circle]));

import { extractGlyphStrokes, getStrokeLength } from './glyphStrokes';

// Same raster the board engine uses (palaka penStrokes.ts), so strokes come out identical.
export const RASTER_PX = 120;
export const GLYPH_W = 240;
export const GLYPH_H = 200;
export const ORIGIN_X = 60;
export const BASELINE_Y = 140;
export const HAND_FONT = `700 ${RASTER_PX}px Gaegu`;
const INK_ALPHA = 110;
// Every point would put thousands of nodes in the DOM with no visible gain.
const PATH_POINT_STEP = 3;
// Board spacing from palaka: Gaegu is set slightly tight, words tighter still.
const LETTER_SPACING_EM = -0.025;
const WORD_SPACING_EM = -0.1;

const glyphCache = new Map();
let rasterContext = null;

function getRasterContext() {
  if (!rasterContext) {
    const canvas = document.createElement('canvas');
    canvas.width = GLYPH_W;
    canvas.height = GLYPH_H;
    rasterContext = canvas.getContext('2d', { willReadFrequently: true });
  }
  return rasterContext;
}

function readInk(char) {
  const context = getRasterContext();
  context.clearRect(0, 0, GLYPH_W, GLYPH_H);
  context.font = HAND_FONT;
  context.fillText(char, ORIGIN_X, BASELINE_Y);
  const { data } = context.getImageData(0, 0, GLYPH_W, GLYPH_H);
  const ink = new Uint8Array(GLYPH_W * GLYPH_H);
  for (let i = 0; i < ink.length; i++) ink[i] = data[i * 4 + 3] > INK_ALPHA ? 1 : 0;
  return ink;
}

function touchesEdge(ink) {
  for (let x = 0; x < GLYPH_W; x++) if (ink[x] || ink[(GLYPH_H - 1) * GLYPH_W + x]) return true;
  for (let y = 0; y < GLYPH_H; y++) if (ink[y * GLYPH_W] || ink[y * GLYPH_W + GLYPH_W - 1]) return true;
  return false;
}

// Null means "no pen path for this letter": the caller wipes it on instead.
export function getGlyphStrokes(char) {
  if (glyphCache.has(char)) return glyphCache.get(char);
  const ink = readInk(char);
  const glyph = touchesEdge(ink) ? null : extractGlyphStrokes({ ink, width: GLYPH_W, height: GLYPH_H });
  const usable = glyph && glyph.strokes.length ? glyph : null;
  glyphCache.set(char, usable);
  return usable;
}

export function toPathData(points) {
  const kept = points.filter((_, index) => index % PATH_POINT_STEP === 0 || index === points.length - 1);
  const [first, ...rest] = kept;
  // A dot has no length to dash along, so it gets the shortest possible line.
  const line = rest.length ? rest.map((point) => `L${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join('') : `L${first.x + 0.01} ${first.y}`;
  return `M${first.x.toFixed(1)} ${first.y.toFixed(1)}${line}`;
}

// Places each letter of a run by its real advance, so every letter can carry its own pen mask.
export function layoutRun({ text, x, y, size }) {
  const context = getRasterContext();
  context.font = HAND_FONT;
  const scale = size / RASTER_PX;
  const letters = [];
  let cursor = x;
  for (const char of text) {
    const advance = context.measureText(char).width * scale + LETTER_SPACING_EM * size;
    if (char === ' ') {
      cursor += advance + WORD_SPACING_EM * size;
      continue;
    }
    const glyph = getGlyphStrokes(char);
    const lengths = glyph ? glyph.strokes.map((points) => getStrokeLength(points) * scale) : [advance];
    letters.push({ char, x: cursor, y, size, glyph, lengths, width: advance });
    cursor += advance;
  }
  return { letters, width: cursor - x };
}

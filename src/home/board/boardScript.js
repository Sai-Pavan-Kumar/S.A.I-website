import { layoutRun, toPathData, RASTER_PX, ORIGIN_X, BASELINE_Y } from './penWriting';

// The lesson on the board: binary search. Checked: halving 1,000,000 reaches 1 in 20 steps,
// because 2^20 = 1,048,576 is the first power of two above a million.
const INK = '#f5f5fa';
const SOFT = '#9d9daf';
const ACCENT = '#ffd24d';
const CROSS = '#ff9478';
const ARROW = { arrow: true };

// Pen travel between marks, in board units, so pauses feel like a hand lifting.
const LETTER_LIFT = 10;
const PART_LIFT = 60;
const ROW_LIFT = 160;

const fixed = (value) => value.toFixed(1);

// The sorted list itself: a box of names, the middle one pointed at, the half that cannot hold
// the answer crossed out.
function sortedListSketch(x, top, width, height) {
  const names = [1, 2, 3, 4, 5, 6, 7].map((row) => {
    const y = top + (height / 8) * row;
    const isMiddle = row === 4;
    return { d: `M${fixed(x + 22)} ${fixed(y)}Q${fixed(x + width / 2)} ${fixed(y - 3)} ${fixed(x + width - (isMiddle ? 22 : 34 + (row % 3) * 10))} ${fixed(y + 1)}`, colour: isMiddle ? ACCENT : SOFT };
  });
  const middle = top + height / 2;
  const right = x + width;
  const bottom = top + height;
  return [
    { d: `M${x} ${top}L${right} ${top + 2}L${right - 2} ${bottom}L${x + 2} ${bottom - 2}L${x} ${top}`, colour: INK },
    ...names,
    { d: `M${right + 80} ${middle}Q${right + 50} ${middle - 6} ${right + 14} ${middle}`, colour: ACCENT },
    { d: `M${right + 30} ${middle - 14}L${right + 14} ${middle}L${right + 30} ${middle + 14}`, colour: ACCENT },
    { d: `M${x + 12} ${middle + 26}L${right - 12} ${bottom - 14}`, colour: CROSS },
    { d: `M${right - 12} ${middle + 26}L${x + 12} ${bottom - 14}`, colour: CROSS },
  ];
}

export const BOARD_LAYOUTS = {
  wide: {
    width: 1600,
    height: 900,
    rows: [
      { x: 100, y: 210, size: 128, ink: INK, parts: ['Find 1 name in 1,000,000'] },
      { x: 100, y: 350, size: 96, ink: INK, parts: ['check the middle, drop half'] },
      { sketch: sortedListSketch(1410, 400, 130, 380) },
      { x: 100, y: 500, size: 64, ink: SOFT, parts: ['1,000,000', ARROW, '500,000', ARROW, '250,000', ARROW, '...'] },
      { x: 150, y: 710, size: 112, ink: ACCENT, parts: ['about 20 checks'], circle: true },
      { x: 190, y: 850, size: 52, ink: SOFT, parts: ['2^20 = 1,048,576'] },
    ],
  },
  narrow: {
    width: 800,
    height: 1120,
    rows: [
      { x: 56, y: 150, size: 92, ink: INK, parts: ['Find 1 name'] },
      { x: 56, y: 250, size: 92, ink: INK, parts: ['in 1,000,000'] },
      { x: 56, y: 380, size: 66, ink: INK, parts: ['check the middle,'] },
      { x: 56, y: 460, size: 66, ink: INK, parts: ['drop half'] },
      { x: 56, y: 600, size: 58, ink: SOFT, parts: ['1,000,000', ARROW, '500,000'] },
      { x: 56, y: 690, size: 58, ink: SOFT, parts: [ARROW, '250,000', ARROW, '...'] },
      { x: 90, y: 880, size: 92, ink: ACCENT, parts: ['about 20 checks'], circle: true },
      { x: 56, y: 1040, size: 52, ink: SOFT, parts: ['2^20 = 1,048,576'] },
    ],
  },
};

// A slightly bowed shaft and a two-stroke head, the way an arrow is dashed off by hand.
function arrowStrokes(x, y, length, size) {
  const end = x + length;
  const head = size * 0.22;
  return [
    `M${fixed(x)} ${fixed(y)}Q${fixed(x + length / 2)} ${fixed(y - size * 0.06)} ${fixed(end)} ${fixed(y)}`,
    `M${fixed(end - head)} ${fixed(y - head * 0.8)}L${fixed(end)} ${fixed(y)}L${fixed(end - head)} ${fixed(y + head * 0.8)}`,
  ];
}

// A loop that overshoots its start, like a teacher circling the answer.
function roughEllipse(cx, cy, rx, ry) {
  const points = [];
  for (let step = 0; step <= 64; step++) {
    const angle = -2.4 + (step / 64) * Math.PI * 2.18;
    const wobble = 1 + 0.025 * Math.sin(step * 0.9);
    points.push(`${fixed(cx + Math.cos(angle) * rx * wobble)} ${fixed(cy + Math.sin(angle) * ry * wobble + step * 0.35)}`);
  }
  return `M${points.join('L')}`;
}

function approximateLength(d) {
  const numbers = d.match(/-?\d+(\.\d+)?/g).map(Number);
  let length = 0;
  for (let i = 2; i + 1 < numbers.length; i += 2) length += Math.hypot(numbers[i] - numbers[i - 2], numbers[i + 1] - numbers[i - 1]);
  return length;
}

function createPlanner() {
  const marks = [];
  let travelled = 0;
  return {
    marks,
    lift(distance) {
      travelled += distance;
    },
    letter(letter) {
      const strokes = letter.lengths.map((length, index) => {
        const stroke = { start: travelled, length, d: letter.glyph ? toPathData(letter.glyph.strokes[index]) : null };
        travelled += length + (index < letter.lengths.length - 1 ? LETTER_LIFT * 0.6 : 0);
        return stroke;
      });
      marks.push({ kind: 'letter', ...letter, strokes });
    },
    line(d, colour, width) {
      const length = approximateLength(d);
      marks.push({ kind: 'line', d, colour, width, start: travelled, length });
      travelled += length;
    },
    get total() {
      return travelled;
    },
  };
}

const SKETCH_PEN = 5;

function writeRow(planner, row) {
  if (row.sketch) {
    row.sketch.forEach((mark) => planner.line(mark.d, mark.colour, SKETCH_PEN));
    return;
  }
  let cursor = row.x;
  let written = null;
  row.parts.forEach((part, index) => {
    if (index > 0) planner.lift(PART_LIFT);
    if (part.arrow) {
      const length = row.size * 1.1;
      const [shaft, head] = arrowStrokes(cursor + row.size * 0.2, row.y - row.size * 0.28, length, row.size);
      planner.line(shaft, row.ink, row.size * 0.075);
      planner.line(head, row.ink, row.size * 0.075);
      cursor += length + row.size * 0.55;
      return;
    }
    const run = layoutRun({ text: part, x: cursor, y: row.y, size: row.size });
    run.letters.forEach((letter) => {
      planner.letter({ ...letter, ink: row.ink });
      planner.lift(LETTER_LIFT);
    });
    written = { x: cursor, width: run.width };
    cursor += run.width + row.size * 0.25;
  });
  if (row.circle && written) {
    planner.lift(PART_LIFT);
    const radiusX = written.width / 2 + row.size * 0.5;
    planner.line(roughEllipse(written.x + written.width / 2, row.y - row.size * 0.3, radiusX, row.size * 0.72), row.ink, row.size * 0.07);
  }
}

export function buildBoardPlan(layoutKey) {
  const layout = BOARD_LAYOUTS[layoutKey];
  const planner = createPlanner();
  layout.rows.forEach((row, index) => {
    if (index > 0) planner.lift(ROW_LIFT);
    writeRow(planner, row);
  });
  return { width: layout.width, height: layout.height, marks: planner.marks, total: planner.total };
}

// One handwritten line, sized to fit its own words, for notes outside the board (the hero).
export function buildNotePlan(text, size, ink) {
  const { width } = layoutRun({ text, x: 0, y: 0, size });
  const margin = size * 0.12;
  const planner = createPlanner();
  writeRow(planner, { x: margin, y: size * 0.95, size, ink, parts: [text] });
  return { width: width + margin * 2, height: size * 1.3, marks: planner.marks, total: planner.total };
}

// Where a letter's raster box lands on the board, for its pen mask.
export function letterFrame(letter) {
  const scale = letter.size / RASTER_PX;
  return { scale, left: letter.x - ORIGIN_X * scale, top: letter.y - BASELINE_Y * scale };
}

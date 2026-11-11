import { Renderer, Program, Mesh, Triangle } from 'ogl';
import { MARK } from '../brand';
import { VERTEX, FRAGMENT } from './orbShader';
import { createSprings } from './orbSprings';

const MAX_PIXEL_RATIO = 2;
// Phones have dense screens and weak GPUs: soft circles look the same at 1.5x and cost about half the pixels.
const MAX_PIXEL_RATIO_NARROW = 1.5;
const NARROW_SCREEN = '(max-width: 899px)';
const POINTER_EASE = 0.06;
const POINTER_PUSH = 5;
const POINTER_REACH = 22;
// The way each circle points out of the mark, for the kick a tap gives it.
const OUTWARD = MARK.circles.map((circle) => [Math.sign(circle.x), Math.sign(circle.y)]);

function toRgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

// Where the mark sits and how big, in CSS pixels. Mirrors hero.css: beside the copy on wide
// screens, above it on phones (sized from the screen, because there the hero grows with its copy).
export function layoutFor(width, height) {
  if (width < 900) {
    const size = Math.min(width * 0.74, window.innerHeight * 0.34);
    return { x: width / 2, y: 72 + size / 2, scale: size / MARK.box };
  }
  const size = Math.min(height * 0.84, width * 0.5);
  return { x: width * 0.7, y: height * 0.52, scale: size / MARK.box };
}

function createProgram(gl, pixelRatio) {
  return new Program(gl, {
    vertex: VERTEX,
    fragment: FRAGMENT,
    transparent: true,
    uniforms: {
      uResolution: { value: [1, 1] },
      uPixelRatio: { value: pixelRatio },
      uCentre: { value: [0, 0] },
      uScale: { value: 1 },
      uCircle: { value: MARK.circles.flatMap((circle) => [circle.x, circle.y]) },
      uRadius: { value: MARK.circles.map(() => MARK.radius) },
      uFrom: { value: MARK.circles.flatMap((circle) => toRgb(circle.from)) },
      uTo: { value: MARK.circles.flatMap((circle) => toRgb(circle.to)) },
      uOpacity: { value: MARK.circles.map((circle) => circle.opacity) },
      uHollow: { value: MARK.hollow },
      uGlow: { value: 1 },
    },
  });
}

// Each circle breathes along its own axis, sways a little across it, moves out as the page
// scrolls it turns around the hollow at the same size, steps aside from the cursor, and hangs on its spring when someone pulls it.
function circlePosition(circle, index, time, state, pointer, spring) {
  const breath = 1 + 0.035 * Math.sin(time * 0.55 + index * 1.4);
  const sway = 0.7 * Math.sin(time * 0.37 + index * 2.1);
  const restX = circle.x * breath + (circle.y === 0 ? 0 : sway);
  const restY = circle.y * breath + (circle.x === 0 ? 0 : sway);
  const cos = Math.cos(state.spin);
  const sin = Math.sin(state.spin);
  let x = restX * cos - restY * sin;
  let y = restX * sin + restY * cos;
  const dx = x - pointer.x;
  const dy = y - pointer.y;
  const distance = Math.hypot(dx, dy) || 1;
  const push = POINTER_PUSH * Math.exp(-distance / POINTER_REACH) * pointer.active;
  x += (dx / distance) * push + spring.x;
  y += (dy / distance) * push + spring.y;
  return [x, y];
}

function easePointer(pointer) {
  pointer.x += (pointer.targetX - pointer.x) * POINTER_EASE;
  pointer.y += (pointer.targetY - pointer.y) * POINTER_EASE;
  pointer.active += (pointer.targetActive - pointer.active) * POINTER_EASE;
}

// From page pixels to the mark's own 96-unit space, centred on the hollow.
function toMarkSpace(container, layout, clientX, clientY) {
  const box = container.getBoundingClientRect();
  return [(clientX - box.left - layout.x) / layout.scale, (clientY - box.top - layout.y) / layout.scale];
}

function createSurface(container) {
  const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, window.matchMedia(NARROW_SCREEN).matches ? MAX_PIXEL_RATIO_NARROW : MAX_PIXEL_RATIO), alpha: true, premultipliedAlpha: true });
  const { gl } = renderer;
  gl.clearColor(0, 0, 0, 0);
  container.appendChild(gl.canvas);
  const program = createProgram(gl, renderer.dpr);
  return { renderer, gl, mesh: new Mesh(gl, { geometry: new Triangle(gl), program }), uniforms: program.uniforms };
}

// Pointer to spring: pick the circle under the finger, follow it, and let go. Drag speed is
// measured in real time, so the release velocity matches the flick.
function dragControls(springs, toMark, circleAt) {
  let lastDrag = 0;
  return {
    grabAt(clientX, clientY) {
      const [x, y] = toMark(clientX, clientY);
      const index = circleAt(x, y);
      if (index < 0) return false;
      springs.grab(index, x, y);
      lastDrag = performance.now();
      return true;
    },
    dragTo(clientX, clientY) {
      const now = performance.now();
      const [x, y] = toMark(clientX, clientY);
      springs.dragTo(x, y, (now - lastDrag) / 1000);
      lastDrag = now;
    },
    release() {
      springs.release(OUTWARD);
    },
  };
}

export function createOrbField(container) {
  const { renderer, gl, mesh, uniforms } = createSurface(container);

  // Tweened from outside: grow (intro) and spin (scroll). Glow stays off: on paper it smudges the hollow.
  const state = { grow: [0, 0, 0, 0], spin: 0, glow: 0 };
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: 0, targetActive: 0 };
  let layout = layoutFor(1, 1);
  const springs = createSprings(MARK.circles.length);
  let positions = MARK.circles.map((circle) => [circle.x, circle.y]);
  let lastFrame = 0;

  const toMark = (clientX, clientY) => toMarkSpace(container, layout, clientX, clientY);
  const radiusNow = (index) => MARK.radius * state.grow[index];
  // The circle drawn last sits on top, so it is the one a finger lands on.
  const circleAt = (x, y) => positions.findLastIndex(([cx, cy], index) => Math.hypot(x - cx, y - cy) <= radiusNow(index));

  const field = {
    state,
    canvas: gl.canvas,
    resize() {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
      layout = layoutFor(container.clientWidth, container.clientHeight);
    },
    setPointer(clientX, clientY) {
      [pointer.targetX, pointer.targetY] = toMark(clientX, clientY);
      pointer.targetActive = springs.dragging ? 0 : 1;
    },
    ...dragControls(springs, toMark, circleAt),
    releasePointer() {
      pointer.targetActive = 0;
    },
    render(time) {
      easePointer(pointer);
      springs.step(lastFrame ? time - lastFrame : 0);
      lastFrame = time;
      positions = MARK.circles.map((circle, index) => circlePosition(circle, index, time, state, pointer, springs.offsets[index]));
      uniforms.uCentre.value = [layout.x, layout.y];
      uniforms.uScale.value = layout.scale;
      uniforms.uCircle.value = positions.flat();
      uniforms.uRadius.value = state.grow.map((_, index) => radiusNow(index));
      uniforms.uHollow.value = MARK.hollow;
      uniforms.uGlow.value = state.glow;
      renderer.render({ scene: mesh });
    },
    destroy() {
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      gl.canvas.remove();
    },
  };
  field.resize();
  return field;
}

export function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

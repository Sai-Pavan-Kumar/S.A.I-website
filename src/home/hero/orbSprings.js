// Each circle hangs on a soft spring from its place in the mark. Pull one and it stretches with a
// rubber-band give; let go and it swings back with the speed you flicked it, wobbling as it settles.
// Plain spring maths (Hooke's law with damping): four bodies do not need a physics engine.
const STIFFNESS = 90;
const DAMPING = 9;
const MAX_PULL = 34;
const MAX_STEP = 1 / 30;
const NEIGHBOUR_SHARE = 0.22;
const TAP_KICK = 60;
// Below this, a finger's jitter is still a tap, not a drag (in mark units).
const DRAG_START = 1.5;

// The further you pull, the harder it resists, and it never leaves the mark entirely.
function rubberBand(dx, dy) {
  const distance = Math.hypot(dx, dy);
  if (!distance) return [0, 0];
  const eased = MAX_PULL * (1 - Math.exp(-distance / MAX_PULL));
  return [(dx / distance) * eased, (dy / distance) * eased];
}

function settle(body, seconds) {
  body.vx += (-STIFFNESS * body.x - DAMPING * body.vx) * seconds;
  body.vy += (-STIFFNESS * body.y - DAMPING * body.vy) * seconds;
  body.x += body.vx * seconds;
  body.y += body.vy * seconds;
}

export function createSprings(count) {
  const bodies = Array.from({ length: count }, () => ({ x: 0, y: 0, vx: 0, vy: 0 }));
  const drag = { index: -1, fromX: 0, fromY: 0, moved: false };

  return {
    offsets: bodies,
    get dragging() {
      return drag.index >= 0;
    },
    grab(index, x, y) {
      drag.index = index;
      drag.fromX = x - bodies[index].x;
      drag.fromY = y - bodies[index].y;
      drag.moved = false;
    },
    // Velocity comes from how the hand moves, so a fast flick swings back hard.
    dragTo(x, y, dt) {
      if (drag.index < 0) return;
      const body = bodies[drag.index];
      const [nextX, nextY] = rubberBand(x - drag.fromX, y - drag.fromY);
      const step = Math.max(dt, 1 / 240);
      body.vx = (nextX - body.x) / step;
      body.vy = (nextY - body.y) / step;
      body.x = nextX;
      body.y = nextY;
      if (Math.hypot(nextX, nextY) > DRAG_START) drag.moved = true;
    },
    // A tap with no drag still gets a reaction: a small kick outward, along the circle's own direction.
    release(outward) {
      if (drag.index < 0) return;
      const body = bodies[drag.index];
      if (!drag.moved) {
        body.vx += outward[drag.index][0] * TAP_KICK;
        body.vy += outward[drag.index][1] * TAP_KICK;
      }
      bodies.forEach((other, index) => {
        if (index === drag.index) return;
        other.vx += body.vx * NEIGHBOUR_SHARE;
        other.vy += body.vy * NEIGHBOUR_SHARE;
      });
      drag.index = -1;
    },
    step(dt) {
      const seconds = Math.min(dt, MAX_STEP);
      bodies.forEach((body, index) => index !== drag.index && settle(body, seconds));
    },
  };
}

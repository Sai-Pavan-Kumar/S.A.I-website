import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, FULL_MOTION, WIDE_FULL_MOTION } from '../motion';
import { MARK } from '../brand';
import { layoutFor, supportsWebGL } from '../hero/orbField';
import { markState } from './markState';

// The docked flower: small, bottom-right, clear of the nav and of the screen edge.
const DOCK = { wide: { size: 88, inset: 40 }, narrow: { size: 64, inset: 20 } };
// Choreography, measured by where the method's top is on screen (share of screen height):
// the flower leaves the hero over most of a screen of scrolling, and only once it has docked
// may the first circle leave it. One thing moves at a time.
// On phones the method starts right at the foot of the first screen, so the flower waits for a
// real scroll (to 85%) before it takes off; there is less hero to scroll through, so it docks lower.
const TIMING = {
  wide: { leaveFrom: 1, dockedAt: 0.3, releaseFrom: 0.25 },
  narrow: { leaveFrom: 0.85, dockedAt: 0.35, releaseFrom: 0.3 },
};
// Docked, the flower always shows the next circle to leave at the top. The circles leave in
// mark order (learn, prove, build, placed), each a quarter turn round from the last, so after
// each departure the flower turns a quarter back. It starts turning once the circle is this far out.
const QUARTER = Math.PI / 2;
const TURN_AFTER = 0.25;
// A circle flies from the moment its step's circle crosses the screen edge until it is this far in.
const FLIGHT_SPAN = 0.55;
// Share of the leave in which the WebGL flower hands over to this one.
const CROSSFADE = 0.08;
// The disc behind the docked flower is this much wider than the flower.
const DISC_GROWTH = 1.45;

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const mix = (from, to, amount) => from + (to - from) * amount;
const ease = gsap.parseEase('power2.inOut');

// Every position is read from the page as it is right now, never stored: scrolling back up
// replays the same maths in reverse, and the circles find their way home on their own.
function flowerNow(hero, method, wide) {
  const heroBox = hero.getBoundingClientRect();
  const layout = layoutFor(heroBox.width, heroBox.height);
  const dock = wide ? DOCK.wide : DOCK.narrow;
  const height = window.innerHeight;
  const methodTop = method.getBoundingClientRect().top;
  const { leaveFrom, dockedAt, releaseFrom } = wide ? TIMING.wide : TIMING.narrow;
  const leave = clamp01((height * leaveFrom - methodTop) / (height * (leaveFrom - dockedAt)));
  const release = clamp01((height * releaseFrom - methodTop) / (height * releaseFrom));
  const travel = ease(leave);
  const dockX = window.innerWidth - dock.inset - dock.size / 2;
  const dockY = window.innerHeight - dock.inset - dock.size / 2;
  return {
    leave,
    release,
    dock: { x: dockX, y: dockY, size: dock.size * DISC_GROWTH },
    x: mix(heroBox.left + layout.x, dockX, travel),
    y: mix(heroBox.top + layout.y, dockY, travel),
    size: mix(layout.scale * MARK.box, dock.size, travel),
  };
}

// Where a step's circle is drawn. Its box is rotated by the method motion, so the size comes
// from its own width and scale, not from the (larger) rotated bounding box.
function orbNow(orb) {
  const box = orb.getBoundingClientRect();
  return {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
    size: orb.offsetWidth * gsap.getProperty(orb, 'scale'),
    rotation: gsap.getProperty(orb, 'rotation'),
  };
}

function flightProgress(target, wide) {
  return wide
    ? clamp01((window.innerWidth - target.x) / (window.innerWidth * FLIGHT_SPAN))
    : clamp01((window.innerHeight - target.y) / (window.innerHeight * FLIGHT_SPAN));
}

function place(element, { x, y, size }, rotation = 0) {
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
  element.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px) rotate(${rotation}deg)`;
}

// Learn sits at the top at no turn; the hero's own scroll turn is unwound on the way to the dock,
// then each departure adds a quarter turn back, so the next circle rolls up into the top place.
function dockedSpin(leave, flights) {
  const departures = flights.slice(0, -1).reduce((sum, flight) => sum + ease(clamp01((flight - TURN_AFTER) / (1 - TURN_AFTER))), 0);
  return mix(markState.spin, 0, ease(leave)) - departures * QUARTER;
}

function petalIn(flower, circle) {
  const cos = Math.cos(flower.spin);
  const sin = Math.sin(flower.spin);
  const unit = flower.size / MARK.box;
  return {
    x: flower.x + (circle.x * cos - circle.y * sin) * unit,
    y: flower.y + (circle.x * sin + circle.y * cos) * unit,
    size: MARK.radius * 2 * unit,
  };
}

// The disc arrives with the flower and leaves with the last circle.
function drawFlower(parts, flower, lastFlight) {
  const handover = clamp01(flower.leave / CROSSFADE);
  place(parts.disc, flower.dock);
  parts.disc.style.opacity = String(clamp01((flower.leave - 0.6) / 0.4) * (1 - lastFlight));
  parts.stage.style.opacity = String(1 - handover);
  parts.flowerLayer.style.opacity = String(handover);
  parts.flowerLayer.style.setProperty('--cx', `${flower.x}px`);
  parts.flowerLayer.style.setProperty('--cy', `${flower.y}px`);
  parts.flowerLayer.style.setProperty('--hole', `${(MARK.hollow / MARK.box) * flower.size}px`);
}

function drawCircle(parts, index, flower, target, progress) {
  const circle = MARK.circles[index];
  const petal = petalIn(flower, circle);
  const flyer = parts.flyers[index];
  const travel = ease(progress);
  place(parts.petals[index], petal);
  parts.petals[index].style.visibility = progress > 0 ? 'hidden' : 'visible';
  place(flyer, { x: mix(petal.x, target.x, travel), y: mix(petal.y, target.y, travel), size: mix(petal.size, target.size, travel) }, mix(0, target.rotation, travel));
  flyer.style.opacity = String(mix(circle.opacity, 1, travel));
  flyer.style.visibility = progress > 0 && progress < 1 ? 'visible' : 'hidden';
  parts.orbs[index].style.visibility = progress < 1 ? 'hidden' : '';
}

function findParts(layer) {
  return {
    hero: document.querySelector('#top'),
    stage: document.querySelector('.hero__stage'),
    method: document.querySelector('#method'),
    flowerLayer: layer.querySelector('.flight__flower'),
    disc: layer.querySelector('.flight__disc'),
    petals: MARK.circles.map((circle) => layer.querySelector(`.flight__petal[data-key="${circle.key}"]`)),
    flyers: MARK.circles.map((circle) => layer.querySelector(`.flight__flyer[data-key="${circle.key}"]`)),
    orbs: MARK.circles.map((circle) => document.querySelector(`.method__panel--${circle.key} .method__orb`)),
  };
}

function startFlight(layer, wide) {
  const parts = findParts(layer);
  // All reads first, then all writes, so the browser lays the page out once per frame.
  const update = () => {
    const flower = flowerNow(parts.hero, parts.method, wide);
    const targets = parts.orbs.map(orbNow);
    // Once the method is behind the reader every circle has landed, whatever the lagging
    // sideways track says: a fast scroll or a reload further down must never strand one mid-air.
    const passed = parts.method.getBoundingClientRect().bottom <= 1;
    const flights = targets.map((target) => (passed ? 1 : Math.min(flower.release, flightProgress(target, wide))));
    flower.spin = dockedSpin(flower.leave, flights);
    drawFlower(parts, flower, flights[flights.length - 1]);
    targets.forEach((target, index) => drawCircle(parts, index, flower, target, flights[index]));
  };
  const zone = ScrollTrigger.create({
    trigger: parts.method,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? gsap.ticker.add(update) : (gsap.ticker.remove(update), update())),
  });
  update();
  if (zone.isActive) gsap.ticker.add(update);
  return () => {
    zone.kill();
    gsap.ticker.remove(update);
    parts.stage.style.opacity = '';
    parts.orbs.forEach((orb) => (orb.style.visibility = ''));
    parts.flowerLayer.style.opacity = '0';
    parts.disc.style.opacity = '0';
    parts.flyers.forEach((flyer) => (flyer.style.visibility = 'hidden'));
  };
}

export default function useMarkFlight(layer) {
  useGSAP(() => {
    if (!supportsWebGL()) return;
    gsap.matchMedia().add({ motion: FULL_MOTION, wide: WIDE_FULL_MOTION }, (context) => {
      if (!context.conditions.motion) return undefined;
      return startFlight(layer.current, context.conditions.wide);
    });
  });
}

export const VERTEX = /* glsl */ `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// One pass draws the whole mark. Circles are composited in brand order with their own opacity
// (so overlaps mix exactly like the SVG), then grain specks darken the ink, the hollow centre is
// cut out, and a faint light from each circle spills onto the dark page around it.
export const FRAGMENT = /* glsl */ `
precision highp float;

uniform vec2 uResolution;
uniform float uPixelRatio;
uniform vec2 uCentre;
uniform float uScale;
uniform vec2 uCircle[4];
uniform float uRadius[4];
uniform vec3 uFrom[4];
uniform vec3 uTo[4];
uniform float uOpacity[4];
uniform float uHollow;
uniform float uGlow;

// Brand gradient runs from (0.85, 0.1) to (0.15, 0.9) of each circle's bounding box.
const vec2 GRADIENT_START = vec2(0.85, 0.1);
const vec2 GRADIENT_AXIS = vec2(-0.7, 0.8);
const float GRADIENT_LENGTH_SQ = 1.13;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y) / uPixelRatio;
  vec2 mark = (px - uCentre) / uScale;
  float edge = 1.0 / uScale;

  vec3 colour = vec3(0.0);
  float alpha = 0.0;
  vec3 light = vec3(0.0);

  for (int i = 0; i < 4; i++) {
    vec2 offset = mark - uCircle[i];
    float distanceToEdge = length(offset) - uRadius[i];
    float inside = 1.0 - smoothstep(-edge, edge, distanceToEdge);
    vec2 local = offset / (2.0 * uRadius[i]) + 0.5;
    float t = clamp(dot(local - GRADIENT_START, GRADIENT_AXIS) / GRADIENT_LENGTH_SQ, 0.0, 1.0);
    vec3 ink = mix(uFrom[i], uTo[i], t);
    float layer = inside * uOpacity[i];
    colour = ink * layer + colour * (1.0 - layer);
    alpha = layer + alpha * (1.0 - layer);
    light += mix(uFrom[i], uTo[i], 0.5) * exp(-max(distanceToEdge, 0.0) * 0.08 / max(uRadius[i] / 24.0, 0.5)) * (1.0 - inside);
  }

  float hollow = smoothstep(uHollow - edge, uHollow + edge, length(mark));
  colour *= hollow;
  alpha *= hollow;

  // Sparse, fine specks like the printed logo: most pixels untouched, a few darkened.
  vec2 cell = floor(px * 0.9);
  float noise = hash(cell);
  float speck = pow(noise, 4.0) * 0.32 + (hash(cell + 17.0) - 0.5) * 0.05;
  colour *= 1.0 - speck;

  light *= uGlow * 0.07 * (1.0 - alpha);
  gl_FragColor = vec4(colour + light, alpha);
}
`;

// Moves every pen stroke to where the hand would be at this point of the lesson (0 to 1).
export function inkTo(svg, plan, progress) {
  const reached = progress * plan.total;
  svg.querySelectorAll('[data-start]').forEach((element) => {
    const share = Math.min(Math.max((reached - Number(element.dataset.start)) / Number(element.dataset.length), 0), 1);
    if (element.dataset.wipe) {
      element.setAttribute('width', Number(element.dataset.wipe) * share);
      return;
    }
    // A round cap draws a dot even at zero length, so unwritten strokes are hidden outright.
    element.style.visibility = share > 0 ? 'visible' : 'hidden';
    element.style.strokeDasharray = '1 2';
    element.style.strokeDashoffset = String(1 - share);
  });
}

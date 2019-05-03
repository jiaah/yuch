const requestAnimationFrame =
  global.requestAnimationFrame ||
  function animationFrame(f) {
    return setTimeout(f, 0);
  };
export default requestAnimationFrame;

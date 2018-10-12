/* eslint no-multi-assign: 0 */
// const requestAnimationFrame = (global.requestAnimationFrame = callback => {
//   setTimeout(callback, 0);
// });

const requestAnimationFrame =
  global.requestAnimationFrame ||
  function animationFrame(f) {
    return setTimeout(f, 0);
  };
export default requestAnimationFrame;

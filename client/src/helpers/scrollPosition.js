export const saveYposition = () =>
  sessionStorage.setItem('currentYOffset', window.pageYOffset);

export const keepScrollPosition = () => {
  if (sessionStorage.currentYOffset !== undefined) {
    const jumpTo = sessionStorage.currentYOffset;
    window.scrollTo(0, jumpTo);
    sessionStorage.removeItem('currentYOffset');
  }
};

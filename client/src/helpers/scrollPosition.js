export const saveYposition = () =>
  sessionStorage.setItem('currentYOffset', window.pageYOffset);

export const keepScrollPosition = async () => {
  if (sessionStorage.currentYOffset !== undefined) {
    const jumpTo = await sessionStorage.currentYOffset;
    window.scrollTo(0, jumpTo);
    return sessionStorage.removeItem('currentYOffset');
  }
};

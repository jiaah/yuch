export const saveYposition = () =>
  sessionStorage.setItem('currentYOffset', window.pageYOffset);

export const keepScrollPosition = async () => {
  if (sessionStorage.currentYOffset !== undefined) {
    const jumpTo = await sessionStorage.currentYOffset;
    window.scrollTo(0, jumpTo);
    return sessionStorage.removeItem('currentYOffset');
  }
};

export const scrollToElement = el => {
  const searched = document.getElementById(el);
  const rect = searched.getBoundingClientRect();

  const scrollTop = document.documentElement.scrollTop
    ? document.documentElement.scrollTop
    : document.body.scrollTop;

  const elementTop = rect.top + scrollTop;
  const jumpTo = elementTop - 200;
  window.scrollTo(0, jumpTo);

  // const scrollLeft = document.documentElement.scrollLeft?
  //                document.documentElement.scrollLeft:document.body.scrollLeft;

  // const elementLeft = rect.left + scrollLeft;
};

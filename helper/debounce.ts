export const useDebounce = (delay = 800) => {
  let timer = null;

  return function (func) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func();
    }, delay);
  };
};

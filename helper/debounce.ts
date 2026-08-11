export const useDebounce = (delay = 800) => {
  let timer: NodeJS.Timeout | null = null;

  return function (func: Function) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func();
    }, delay);
  };
};

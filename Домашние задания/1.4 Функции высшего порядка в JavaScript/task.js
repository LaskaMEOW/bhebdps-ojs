function cachingDecoratorNew(func) {
  const cache = [];

  return function (...args) {
    const hash = md5(JSON.stringify(args));
    const cached = cache.find(item => item.hash === hash && item.context === this);

    if (cached) {
      return 'Из кеша: ' + cached.value;
    }

    const result = func.apply(this, args);
    cache.push({
      hash,
      context: this,
      value: result
    });

    if (cache.length > 5) {
      cache.shift();
    }

    return 'Вычисляем: ' + result;
  };
}

function debounceDecoratorNew(func, delay) {
  let firstCall = true;
  let timer = null;

  function wrapper(...args) {
    wrapper.allCount += 1;

    if (firstCall) {
      firstCall = false;
      wrapper.count += 1;
      return func.apply(this, args);
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      wrapper.count += 1;
      func.apply(this, args);
    }, delay);
  }

  wrapper.count = 0;
  wrapper.allCount = 0;
  return wrapper;
}


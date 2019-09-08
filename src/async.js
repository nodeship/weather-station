const isPromise = (value) => value && (typeof value.then === 'function');
// Async is a higher order function that takes a generator function as an argument


export function async(generator) {
  let iterator = generator();
  (function next(value) {
    let iteration = iterator.next(value);
    let nextValue = iteration.value;
    if (!iteration.done) {
      if (isPromise(nextValue)) {
        nextValue.then(next);
      } else {
        Promise.resolve(nextValue).then(next);
      }
    } else {
      return iteration.value;
    }
  })();
}

export function memoize<T extends (...args: any) => any>(
  fn: T,
  lifetime: number = 1000 * 60 * 30
): (...args: [...Parameters<T>]) => ReturnType<T> {
  const cache = new Map<string, any>();
  return (...args: [...Parameters<T>]): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
      setTimeout(() => {
        cache.delete(key);
      }, lifetime);
    }
    return cache.get(key);
  };
}

import { useEffect, useRef } from "react";

export default function useInterval<T extends Function>(
  callback: T,
  delay: number,
  active: boolean = false
) {
  const savedCallback = useRef<T>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

import { useEffect, useRef } from "react";

// assigning to a ref does not rerender so it always shows the previous value
export default function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

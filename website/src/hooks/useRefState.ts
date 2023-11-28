import { MutableRefObject, useRef, useState } from "react";

export default function useRefState<T>(
  initialState: T
): [T, (data: T) => void, MutableRefObject<T>] {
  const [state, _setState] = useState(initialState);
  const stateRef = useRef(state);
  const setState = (data: T) => {
    stateRef.current = data;
    _setState(data);
  };
  return [state, setState, stateRef];
}

import { useEffect } from "react";

export default function useAsynEffect(callback: () => Promise<void>, deps?: React.DependencyList) {
  useEffect(() => {
    callback();
  }, deps);
}

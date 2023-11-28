import { useEffect } from "react";

export default function useLogger(val: any, ...deps: any[]) {
  useEffect(() => {
    console.log(val);
  }, deps);
}

import { useState, useEffect } from "react";

const useDebounce = (term: string, delay: number): string => {
  const [debounceTerm, setDebounceTerm] = useState<string>(term);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceTerm(term);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [term]);
  return debounceTerm;
};

export default useDebounce;

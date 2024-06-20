import { useState, useEffect } from 'react';

interface Transition {
  startingCSS: any;
  endingCSS: any;
  duration?: number;
  delay?: number
}

const useEntryTransition = (opts:Transition) => {
  const {
    startingCSS,
    endingCSS,
    duration = 1000,
    delay = 0
  } = opts;

  const [style, setStyle] = useState({
    ...startingCSS, 
    transition: `all ${duration}ms`
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStyle({
        ...endingCSS,
        transition: `all ${duration}ms`
      });
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, endingCSS])

  return style;
}

export default useEntryTransition;
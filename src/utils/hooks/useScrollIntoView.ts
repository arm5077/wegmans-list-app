import { useRef, RefObject } from 'react';

type UseScrollIntoView = () => [RefObject<HTMLDivElement>, () => void];


const useScrollIntoView: UseScrollIntoView = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = () => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return [elementRef, scrollIntoView];
};

export default useScrollIntoView;
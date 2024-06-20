'use client'

import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import IntroSection from '@/components/IntroSection';
import ResultsSection from '@/components/ResultsSection';
import useScrollIntoView from '@/utils/hooks/useScrollIntoView';
import { listAtom } from '@/state';

import styles from "./page.module.css";

export default function App() {

  const [ref, scrollIntoView] = useScrollIntoView();
  const [ data ] = useRecoilState(listAtom);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (data) {
      timeoutId = setTimeout(scrollIntoView, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [data, scrollIntoView]);

  return (
    <div>
      <IntroSection />
      <div ref={ref}>
        {
          data && (
            <ResultsSection />
          )
        }
        
      </div>
    </div>    
  );
}

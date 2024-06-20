'use client'

import { RecoilRoot } from 'recoil';
import App from '@/components/App';

export default function Home() {

  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
    
  );
}

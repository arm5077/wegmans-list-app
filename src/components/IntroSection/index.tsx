import React from 'react';
import { useRecoilState } from 'recoil';

import DisplayText from '@/components/common/DisplayText';
import Section from '@/components/common/Section';
import { listAtom } from '@/state';


import InputModule from './InputModule';

import classes from './styles.module.scss';

const IntroSection: React.FC = () => {
  const [data] = useRecoilState(listAtom);
  return (
    <Section>
      <DisplayText
        headline='Grocery Sorcery'
        text={<span>Convert your grocery list to an <strong>aisle-by-aisle grocery PLAN</strong> through the power of AI.</span>}
        note="*currently only works for the Wisconsin Ave. Wegmans in Washington, D.C., because that’s my grocery store"
        isH1={true}
      />
      <InputModule />
    </Section>
  );
  
};

export default IntroSection;
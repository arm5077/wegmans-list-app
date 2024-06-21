import React from 'react';

import Section from '@/components/common/Section';
import DisplayText from '@/components/common/DisplayText';

import OutputModule from './OutputModule';

import classes from './styles.module.scss';

const ResultsSection: React.FC = () => {
  return (
    <Section flipOnDesktop>
      <OutputModule />
      <DisplayText
        headline={<div>Abra-<br/>cadabra!</div>}
        text='You’re ready for your trip to the grocery store.'
        isH1={false}
      />
    </Section>
  );  
};

export default ResultsSection;
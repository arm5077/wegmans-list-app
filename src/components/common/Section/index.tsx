import React from 'react';
import classNames from 'classnames';

import useWindowHeight from '@/utils/hooks/useWindowHeight';
import useEntryTransition from '@/utils/hooks/useEntryTransition';

import classes from './styles.module.scss';

interface SectionProps {
  flipOnDesktop?: boolean;
}

const Section: React.FC<React.PropsWithChildren<SectionProps>> = (props) => {
  const { 
    children,
    flipOnDesktop
  } = props;
  const height = useWindowHeight();
  const fadeInStyles = useEntryTransition({
    startingCSS: {
      opacity: 0
    },
    endingCSS: {
      opacity: 1
    },
    duration: 500
  });

  return (
    <div 
      className={classNames(
        classes.root,
        { [classes.flipped]: flipOnDesktop }
      )}
      style={{ 
        height, 
        ...fadeInStyles 
      }}
    >
      {children}
    </div>
  );
  
};

export default Section;
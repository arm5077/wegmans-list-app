import Markdown from 'react-markdown';
import React from 'react';

import classes from './styles.module.scss';

interface DisplayTextProps {
  headline: string | React.ReactNode;
  text: string | React.ReactNode;
  note?: string;
  isH1?: boolean;
}

const DisplayText: React.FC<DisplayTextProps> = (props) => {
  const {
    headline,
    text,
    note,
    isH1 = false
  } = props;

  const title = isH1 
    ? (
      <h1 className={classes.title}>{headline}</h1>
    ) 
    : (
      <div className={classes.title}>{headline}</div>
    )

  return (
    <div className={classes.root}>
      {title}
      <div className={classes.deck}>
        <Markdown>{text}</Markdown>
        {
          note && (
            <div className={classes.note}>
              <Markdown>{note}</Markdown>
            </div>
          )
        } 
      </div>
      
    </div>
  );
  
};

export default DisplayText;
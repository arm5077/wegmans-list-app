import classNames from 'classnames';
import React from 'react';

import { Work_Sans } from "next/font/google";

import classes from './styles.module.scss';

interface ToggleProps {
  mode: string,
  setMode: React.Dispatch<React.SetStateAction<string>>
}

const workSans = Work_Sans({ subsets: ["latin"] });

const Toggle: React.FC<ToggleProps> = (props) => {
  const {
    mode, 
    setMode
  } = props; 

  return (
    <div className={classes.root}>
      <button 
        className={classNames(
          classes.button,
          workSans.className,
          { [classes.active]: mode === 'text' }
        )}
        onClick={() => setMode('text')}
      >
        Paste in text
      </button>

      <button 
        className={classNames(
          classes.button,
          workSans.className,
          { [classes.active]: mode === 'image' }
        )}
        onClick={() => setMode('image')}
      >
        Upload image
      </button>
    </div>
  );
  
};

export default Toggle;
import React, { useState, useRef } from 'react';

import Toggle from './Toggle';
import TextInput from './TextInput';
import ImageInput from './ImageInput';

import classes from './styles.module.scss';

const InputModule: React.FC = () => {
  const [mode, setMode] = useState('text');

  return (
    <div className={classes.root}>
      <div className={classes['module-wrapper']}>
        <Toggle 
          mode={mode}
          setMode={setMode}
        />
        <div className={classes.content}>
          <TextInput
            active={mode === 'text'}
          />
          <ImageInput
            active={mode === 'image'}
          />
        </div>
      </div>
    </div>
  )
};

export default InputModule;
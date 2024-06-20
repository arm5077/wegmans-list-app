import classNames from 'classnames';
import React, { useState, useRef } from 'react';
import { Work_Sans } from "next/font/google";

import SubmitBar from '@/components/common/SubmitBar';
import useSubmit from '@/utils/hooks/useSubmit';

import classes from './styles.module.scss';

interface TextInputProps {
  active: boolean
}

const workSans = Work_Sans({ subsets: ["latin"] });

const TextInput: React.FC<TextInputProps> = (props) => {
  const { 
    active
  } = props;

  const [textInputValue, setTextInputValue] = useState('');
  const [textToSubmit, setTextToSubmit] = useState('');
  const { data, isLoading, error, setError  } = useSubmit({
    type: 'text', 
    input: textToSubmit,
  });

  const submitAction = () => {
   setTextToSubmit(textInputValue);
  }

  if (!active) {
    return '';
  }

  const handleTextInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInputValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      <textarea 
        placeholder={'Paste in your list here:\n\n- milk \n-cheerios \n-yogurt'}
        className={workSans.className}
        value={textInputValue}
        onChange={handleTextInputChange}
      ></textarea>


      <SubmitBar 
        show={!!textInputValue}
        isLoading={isLoading}
        isError={!!error}
        clearAction={() => {
          setTextInputValue('');
          setError('');
        }}
        submitAction={submitAction}
      />
    </div>
  );
  
};

export default TextInput;
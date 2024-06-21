import Markdown from 'react-markdown';
import React, { useRef } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';

import Loading from './Loading';
import Error from './Error';

import classes from './styles.module.scss';

interface SubmitBarProps {
  show: any;
  isLoading: boolean;
  isError: boolean;
  submitAction: any;
  clearAction: any;
}

const transitionStyles = {
  entering: { opacity: 0, height: 0, },
  entered: { opacity: 1, height: '40px', },
  exiting: { opacity: 1, height: '40px', },
  exited: { opacity: 0, height: 0, },
  unmounted: { opacity: 0, height: 0, }
}

const SubmitBar: React.FC<SubmitBarProps> = (props) => {
  const {
    show, 
    isLoading,
    isError,
    submitAction,
    clearAction,
  } = props; 

  const nodeRef = useRef(null);

  return (
    <Transition
      in={show}
      nodeRef={nodeRef}
      addEndListener={()=>{}}
    >
      {(state) => (
        <div
          className={classNames(
            classes.root,
            { 
              [classes.loading]: isLoading,
              [classes.error]: isError
            },
          )}
          style={{ ...transitionStyles[state] }}
          ref={nodeRef}
        >
          <div>
            <Loading 
              active={isLoading}
            />
            <Error
              active={isError}
            />
          </div>
          

          <div className={classes['button-holder']}>
            <button 
              onClick={clearAction}
              className={classes.minor}
            >Clear</button>
            <button onClick={submitAction}>Submit</button>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default SubmitBar;
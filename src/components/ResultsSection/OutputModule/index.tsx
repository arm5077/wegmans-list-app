import React from 'react';
import { useRecoilState } from 'recoil';

import { listAtom } from '@/state';

import { Item, AisleList, DataPayload } from '@/types/list';

import classes from './styles.module.scss';

const OutputModule: React.FC = () => {
  const [ data ] = useRecoilState(listAtom);
  if (!data) {
    return '';
  }
  const { 
    aisles = [] 
  } = data as DataPayload;
  
console.log(data);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {
          aisles.map((aisle: AisleList) => (
            <div 
              key={aisle.name}
              className={classes.aisle}
            >
              <h2>{aisle.name}</h2>
              <ul>
                {
                  aisle.items.map((item: Item) => (
                    <li key={item.name}>
                      {item.name}
                      {' '}
                      {
                        item.amount && (
                          <span>({item.amount})</span>
                        )
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </div>
  );
  
};

export default OutputModule;
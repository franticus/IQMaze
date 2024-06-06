import React from 'react';
import s from './CheckList.module.scss';

const items = [
  { label: 'Memory', value: 'memory' },
  { label: 'Speed', value: 'speed' },
  { label: 'Reaction', value: 'reaction' },
  { label: 'Concentration', value: 'concentration' },
  { label: 'Logic', value: 'logic' },
];

const CheckList = ({ currentStep }) => {
  return (
    <div className={s.checkList}>
      {items.map((item, index) => (
        <label
          key={item.value}
          className={s.checkLabel}
          data-selected={index < currentStep}
        >
          <input
            type='checkbox'
            value={item.value}
            disabled
            className={s.checkInput}
          />
          <span className={s.checkBox} aria-hidden='true'>
            <svg viewBox='0 0 17 18' className={s.checkIcon}>
              <polyline
                fill='none'
                points='1 9 7 14 15 4'
                stroke='currentColor'
                strokeDasharray='22'
                strokeDashoffset='44'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              />
            </svg>
          </span>
          <span className={s.checkText}>{item.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckList;

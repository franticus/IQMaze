import React from 'react';
import s from './CheckList.module.scss';

const items = [
  { label: 'Testing Your Memory', value: 'memory' },
  { label: 'Analyzing Your Speed', value: 'speed' },
  { label: 'Measuring Your Reaction Time', value: 'reaction' },
  { label: 'Assessing Your Concentration', value: 'concentration' },
  { label: 'Evaluating Your Logic Skills', value: 'logic' },
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

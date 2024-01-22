import React from 'react';
import s from './Test.module.scss';

const Test = () => {
  return (
    <div className={s.test}>
      <div>12,502 people did this test last week.</div>
      <div>Test your IQ!</div>
      <div>
        The IQ Test is to assess an intellectual abilities formed by general
        experience, not affected by training or learning. You can figure out
        your intellectual level compared to the group of the same age.
      </div>
      <div>
        As it requires concentration for a given amount of time, please conduct
        the test in a quiet and comfortable place.
      </div>
      <button>Start IQ test</button>
    </div>
  );
};

export default Test;

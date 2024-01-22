import React from 'react';
import s from './Test.module.scss';
import Quiz from '../../components/Quiz/Quiz';

const Test = () => {
  return (
    <div className={s.test}>
      <Quiz />
    </div>
  );
};

export default Test;

import React from 'react';
import s from './HowImprovingScore.module.scss';

const HowImprovingScore = () => {
  return (
    <div className={s.container}>
      <h2>
        How <span className={s.highlight}>Improving Your IQ Score</span> Can{' '}
        <span className={s.highlight}>Impact</span> Your Life
      </h2>
      <div className={s.benefits}>
        <p>
          <span className={s.checkmark}>✔</span> <strong>Solve</strong> complex{' '}
          <strong>problems</strong> with greater clarity and confidence
        </p>
        <p>
          <span className={s.checkmark}>✔</span> <strong>Outperform</strong>{' '}
          your <strong>peers</strong> and excel in competitive environments
        </p>
        <p>
          <span className={s.checkmark}>✔</span> <strong>Learn</strong> new{' '}
          <strong>skills</strong> faster and retain information more effectively
        </p>
        <p>
          <span className={s.checkmark}>✔</span> Open new{' '}
          <strong>career opportunities</strong> and achieve professional goals
        </p>
        <p>
          <span className={s.checkmark}>✔</span> Make{' '}
          <strong>better decisions</strong> across all aspects of your life
        </p>
        <p>
          <span className={s.checkmark}>✔</span>{' '}
          <strong>Boost your confidence</strong> and self-assurance to tackle
          new challenges
        </p>
      </div>
    </div>
  );
};

export default HowImprovingScore;

import React from 'react';
import s from './WhyTrustUs.module.scss';
import trust_1 from '../../img/whyTrust/trust_1.svg';
import trust_2 from '../../img/whyTrust/trust_2.svg';
import trust_3 from '../../img/whyTrust/trust_3.svg';

const WhyTrustUs = () => {
  return (
    <div className={s.container}>
      <h2>
        Why You Can Trust <span className={s.highlight}>IQMaze</span>
      </h2>
      <div className={s.cards}>
        <div className={s.card}>
          <div className={s.icon}>
            <img src={trust_1} alt='Validated IQ Test' />
          </div>
          <h3>Validated IQ Test</h3>
          <p>
            Our assessment is based on the Stanford-Binet Intelligence Scale,
            the gold standard in IQ testing since 1916.
          </p>
        </div>
        <div className={s.card}>
          <div className={s.icon}>
            <img src={trust_2} alt='Comprehensive Report' />
          </div>
          <h3>Comprehensive Report</h3>
          <p>
            Your personalized report is generated using the widely accepted
            Cattell-Horn-Carroll (CHC) theory of cognitive abilities.
          </p>
        </div>
        <div className={s.card}>
          <div className={s.icon}>
            <img src={trust_3} alt='Neuroscience-Backed Training' />
          </div>
          <h3>Neuroscience-Backed Training</h3>
          <p>
            Our cognitive training programs are grounded in the latest
            neuroscience research, proven to enhance cognitive function and
            boost IQ scores.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyTrustUs;

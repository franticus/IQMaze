import s from './CustomPayFormV1.module.scss';
import cancelAnytime from '../../img/cancelAnytime.svg';
import guarantee from '../../img/guarantee.svg';
import { useEffect, useState } from 'react';

const CustomPayFormHeader = ({ user, subscriptionInfo }) => {
  const [testsTaken, setTestsTaken] = useState(3548);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestsTaken(prevTestsTaken => prevTestsTaken + 1);
    }, Math.random() * 2000 + 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={s.header}>
        <p className={s.description_over}>
          Over <strong>{testsTaken}</strong> tests taken today Avg. IQ score:
          103
        </p>
        <h2>
          Try <span className={s.highlight}>IQMaze</span> for 1 month
        </h2>
      </div>
      <ul className={s.benefits}>
        <li>
          ✔ Get your precise IQ score with our scientifically-validated
          assessment
        </li>
        <li>✔ Know where you stand compared to the general population</li>
        <li>✔ Identify your cognitive strengths and weaknesses</li>
        <li>
          ✔ Evidence-based personalized training to boost IQ by up to 37% in 4
          weeks
        </li>
      </ul>
      <div className={s.totalDue}>
        <p>Total due today:</p>
        <p className={s.price}>
          <del>${(subscriptionInfo.regularPrice / 100).toFixed(2)}</del> $
          {(subscriptionInfo.trialPrice / 100).toFixed(2)} <br />
          <span className={s.discount}>You save 85%</span>
        </p>
      </div>
      <p className={s.afterwards}>
        Your 1 month trial will cost only $
        {(subscriptionInfo.trialPrice / 100).toFixed(2)}. Afterwards, it will be
        ${(subscriptionInfo.regularPrice / 100).toFixed(2)}/month.
      </p>
      <p className={s.noCommitment}>
        <img
          className={s.guaranteeImg}
          src={cancelAnytime}
          alt='cancel anytime'
        />
        No commitment. Cancel anytime.
      </p>
      <p className={s.moneyBackGuarantee}>
        <img
          className={s.guaranteeImg}
          src={guarantee}
          alt='money back guarantee'
        />
        30-Day Money-Back Guarantee.
      </p>
    </div>
  );
};

export default CustomPayFormHeader;

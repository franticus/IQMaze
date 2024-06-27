import React from 'react';
import s from './TestResultsInfo.module.scss';
import certificate from '../../img/certificate.png';

const TestResultsInfo = () => {
  return (
    <>
      <h2 className={s.mainHeading}>Information on Test Results</h2>
      <ul className={s.list}>
        <li>
          After entering your details, you'll receive a personalized and signed
          certificate displaying your test results. <br /> (The photo is a rough
          sample with fictitious data)
        </li>
        <li>
          <img
            src={certificate}
            alt='certificate'
            className={s.heroImage}
            loading='lazy'
          />
        </li>
        <li>
          This certificate is unique and will be created specifically for you,
          reflecting your IQ score and ranking amongst over 5 million people
          worldwide.
        </li>
        <li>
          Understand your job relevance with detailed insights from IQMaze,
          including your percentile and IQ score.
        </li>
        <li>
          Don't miss out on this opportunity to validate and celebrate your
          intellectual achievements!
        </li>
      </ul>
    </>
  );
};

export default TestResultsInfo;

import React from 'react';
import s from './ValueProposition.module.scss';
import certificateImage from '../../img/certificate.png';
import girl from '../../img/girl.jpg';
import man from '../../img/man.jpg';
import chart from '../../img/chart.jpg';

const ValueProposition = () => {
  return (
    <div className={s.valueProposition}>
      <h2 className={s.heading}>What We Offer:</h2>

      <div className={s.section}>
        <img src={certificateImage} alt='IQ Certificate' className={s.image} />
        <div className={s.text}>
          <h3 className={s.subHeading}>Personalized IQ Certificate</h3>
          <p>
            After purchasing the test results, you will receive a personalized
            IQ certificate that includes your score, ranking, and other valuable
            data. This certificate is unique to you and provides a professional
            assessment of your cognitive abilities.
          </p>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.text}>
          <h3 className={s.subHeading}>Detailed Analysis of Results</h3>
          <p>
            Along with the certificate, you will receive a detailed breakdown of
            your IQ test results. This includes information on various cognitive
            areas, strengths, and areas for improvement. Understand your
            intellectual capabilities comprehensively.
          </p>
        </div>
        <img src={girl} alt='IQ Distribution Chart' className={s.image} />
      </div>

      <div className={s.section}>
        <img src={man} alt='Job Relevance' className={s.image} />
        <div className={s.text}>
          <h3 className={s.subHeading}>
            Insights for Professional Development
          </h3>
          <p>
            Learn how your IQ relates to different job roles and industries. Our
            insights provide information on how your cognitive abilities align
            with various career paths, helping you make informed decisions about
            your professional development.
          </p>
        </div>
      </div>

      <div className={s.section}>
        <div className={s.text}>
          <h3 className={s.subHeading}>Global Ranking</h3>
          <p>
            Discover how you compare with over 5 million test-takers worldwide.
            Your score and percentile ranking offer a global perspective on your
            cognitive performance, highlighting your intellectual strengths in a
            competitive context.
          </p>
        </div>
        <img src={chart} alt='Global Ranking' className={s.image} />
      </div>

      <div className={s.section}>
        <div className={s.text}>
          <h3 className={s.subHeading}>Support the Development of IQMaze</h3>
          <p>
            Your <strong>one-time payment</strong> of just{' '}
            <strong>$1.90</strong> helps us keep IQMaze running and improving.
            This small contribution allows us to maintain the website, add new
            features, and provide a better experience for all users.{' '}
            <strong>Thank you for your support!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;

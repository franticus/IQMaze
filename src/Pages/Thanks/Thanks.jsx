import React from 'react';
import s from './Thanks.module.scss';
import { useNavigate } from 'react-router-dom';

const Thanks = () => {
  const navigate = useNavigate();

  return (
    <div className={s.thanks}>
      <section className={s.heroSection}>
        <h1 className={s.mainHeading}>Thank you!</h1>
        <p className={s.introText}>
          You have finished the IQ test.
          <br /> The certificate will be sent to your email.
        </p>
        <button onClick={() => navigate('/home')}>Go to IQMaze</button>
      </section>
    </div>
  );
};

export default Thanks;

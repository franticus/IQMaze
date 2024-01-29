import React from 'react';
import s from './Thanks.module.scss';
import { useNavigate } from 'react-router-dom';
import certificate from '../../img/certificate.png';

const Thanks = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem('userName'));
  const iqValue = JSON.parse(localStorage.getItem('iqScore'));
  const date = new Date().toLocaleDateString();

  return (
    <div className={s.thanks}>
      <section className={s.heroSection}>
        <h1 className={s.mainHeading}>Thank you!</h1>
        <p className={s.introText}>
          You have finished the IQ test.
          <br /> There is your certificate.
        </p>
        <div className={s.certificate}>
          <img src={certificate} alt='certificate' className={s.heroImage} />
          <div className={s.certificate_name}>{userName}</div>
          <div className={s.certificate_iq}>{iqValue}</div>
          <div className={s.certificate_date}>{date}</div>
        </div>
        <button onClick={() => navigate('/home')}>Go to IQMaze</button>
      </section>
    </div>
  );
};

export default Thanks;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import s from './Thanks.module.scss';
import { useNavigate } from 'react-router-dom';
import certificate from '../../img/certificate.png';

const Thanks = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem('userName'));
  const iqValue = JSON.parse(localStorage.getItem('iqScore'));
  const date = new Date().toLocaleDateString();
  const certificateRef = useRef();
  const [fontSize, setFontSize] = useState({
    name: '1rem',
    iq: '2rem',
    date: '1rem',
  });

  useEffect(() => {
    userName !== '' && navigate('/');
  }, []);

  useEffect(() => {
    const updateFontSize = () => {
      const certificateWidth = certificateRef.current.offsetWidth;
      setFontSize({
        name: `${certificateWidth / 20}px`,
        iq: `${certificateWidth / 14}px`,
        date: `${certificateWidth / 40}px`,
      });
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);

    return () => {
      window.removeEventListener('resize', updateFontSize);
    };
  }, []);

  return (
    <div className={s.thanks}>
      <section className={s.heroSection}>
        <h1 className={s.mainHeading}>Thank you!</h1>
        <p className={s.introText}>
          You have finished the IQ test.
          <br /> There is your certificate.
        </p>
        <div className={s.certificate} ref={certificateRef}>
          <img src={certificate} alt='certificate' className={s.heroImage} />
          <div
            className={s.certificate_name}
            style={{ fontSize: fontSize.name }}
          >
            {userName}
          </div>
          <div className={s.certificate_iq} style={{ fontSize: fontSize.iq }}>
            {iqValue}
          </div>
          <div
            className={s.certificate_date}
            style={{ fontSize: fontSize.date }}
          >
            {date}
          </div>
        </div>
        <button onClick={() => navigate('/home')}>Go to IQMaze</button>
      </section>
    </div>
  );
};

export default Thanks;

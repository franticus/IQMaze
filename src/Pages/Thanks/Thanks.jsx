/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import s from './Thanks.module.scss';
import { useNavigate } from 'react-router-dom';
import certificate from '../../img/certificate.png';
import axios from 'axios';

const Thanks = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem('userName'));
  const iqValue = JSON.parse(localStorage.getItem('iqScore'));
  const date = new Date().toLocaleDateString();
  const [isUserValid, setIsUserValid] = useState(false);
  const certificateRef = useRef();
  const uniqueVisitorId = window.uniqueVisitorId;
  const [fontSize, setFontSize] = useState({
    name: '1rem',
    iq: '2rem',
    date: '1rem',
  });

  // useEffect(() => {
  //   userName === '' && navigate('/');
  // }, []);

  useEffect(() => {
    axios
      .post('check.php', {
        userID_0: uniqueVisitorId,
      })
      .then(response => {
        console.log('response:', response);
        console.log('response.data:', response.data);
        if (response.data.success) {
          response.data.success ? setIsUserValid(true) : setIsUserValid(false);
        } else {
          setIsUserValid(false);
        }
      })
      .catch(error => {
        console.error('Произошла ошибка: ' + error);
      });
  }, []);

  useEffect(() => {
    const updateFontSize = () => {
      const certificateWidth = certificateRef?.current?.offsetWidth;
      setFontSize({
        name: `${certificateWidth / 20}px`,
        iq: `${certificateWidth / 14}px`,
        iqText: `${certificateWidth / 30}px`,
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
    <>
      {isUserValid ? (
        <div className={s.thanks}>
          <section className={s.heroSection}>
            <h1 className={s.mainHeading}>Thank you!</h1>
            <p className={s.introText}>
              You have finished the IQ test.
              <br /> There is your certificate.
            </p>
            <div className={s.certificate} ref={certificateRef}>
              <img
                src={certificate}
                alt='certificate'
                className={s.heroImage}
              />
              <div
                className={s.certificate_name}
                style={{ fontSize: fontSize.name }}
              >
                {userName}
              </div>
              <div
                className={s.certificate_iq}
                style={{ fontSize: fontSize.iq }}
              >
                {iqValue}
              </div>
              <div
                className={s.certificate_iqText}
                style={{ fontSize: fontSize.iqText }}
              >
                IQ
              </div>
              <div
                className={s.certificate_date}
                style={{ fontSize: fontSize.date }}
              >
                {date}
              </div>
            </div>

            <div className={s.iqDistribution}>
              <div className={s.iqTitle}>IQ Score Distribution Graph</div>
              <div className={s.iqLabels_container}>
                <div className={s.iqLabels}>
                  <div className={s.iqLabels_item}>
                    <div>Above 145</div>
                    <div>Genius or near genius</div>
                  </div>
                  <div className={s.iqLabels_item}>
                    <div>130 ~ 145</div>
                    <div>Very superior</div>
                  </div>
                  <div className={s.iqLabels_item}>
                    <div>115 ~ 130</div>
                    <div>Superior</div>
                  </div>
                  <div className={s.iqLabels_item}>
                    <div>85 ~ 115</div>
                    <div>Normal</div>
                  </div>
                  <div className={s.iqLabels_item}>
                    <div>70 ~ 85</div>
                    <div>Dullness</div>
                  </div>
                  <div className={s.iqLabels_item}>
                    <div>Below 70</div>
                    <div>Borderline Deficiency</div>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => navigate('/home')}>Go to IQMaze</button>
          </section>
        </div>
      ) : (
        <div className={s.return_block}>
          <div>Чтото пошло не так</div>
          <button className={s.return} onClick={() => navigate('/')}>
            На главную
          </button>
        </div>
      )}
    </>
  );
};

export default Thanks;

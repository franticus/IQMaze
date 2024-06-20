import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import s from './Thanks.module.scss';
import { useNavigate } from 'react-router-dom';
import certificate from '../../img/certificate_empty.png';
import html2canvas from 'html2canvas';
import { getIQDescription } from './getIQDescription';
import graph from '../../img/graph.jpg';

const Thanks = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const storedUserName = localStorage.getItem('userName');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'thanksPage',
      });
    }
  }, []);

  useEffect(() => {
    if (storedUserName) {
      setUserName(storedUserName.replace(/['"]+/g, ''));
    }
  }, [storedUserName]);

  const iqValue = JSON.parse(localStorage.getItem('iqScore'));
  const date = new Date().toLocaleDateString();
  const certificateRef = useRef();
  const [fontSize, setFontSize] = useState({
    name: '1rem',
    iq: '2rem',
    iqText: '2rem',
    date: '1rem',
  });

  const updateFontSize = () => {
    const certificateWidth = certificateRef?.current?.offsetWidth;
    setFontSize({
      name: `${certificateWidth / 20}px`,
      iq: `${certificateWidth / 14}px`,
      iqText: `${certificateWidth / 30}px`,
      date: `${certificateWidth / 40}px`,
    });
  };

  useLayoutEffect(() => {
    localStorage.setItem('completePayment', true);
    AOS.init({
      duration: 2000,
      once: true,
    });

    updateFontSize();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 3000);
    window.addEventListener('resize', updateFontSize);

    return () => {
      window.removeEventListener('resize', updateFontSize);
    };
  }, []);

  const downloadCertificate = () => {
    html2canvas(certificateRef.current).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'certificate.png';
      link.click();
    });
  };

  return (
    <>
      <div className={s.thanks}>
        <section className={s.heroSection} data-aos='fade-up'>
          <h1 className={s.mainHeading}>Thank you!</h1>
          <p className={s.introText}>
            You have finished the IQ test.
            <br /> Here is your certificate.
          </p>
          <div
            className={s.certificate}
            ref={certificateRef}
            data-aos='fade-up'
          >
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

          <button onClick={downloadCertificate} data-aos='fade-up'>
            Download Certificate
          </button>

          <div className={s.iqDescription} data-aos='fade-right'>
            <h2>Result description</h2>
            <div
              dangerouslySetInnerHTML={{ __html: getIQDescription(iqValue) }}
            />
          </div>

          <div className={s.iqDistribution} data-aos='fade-left'>
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
            <img src={graph} alt='IQ Distribution' className={s.iqImage} />
          </div>

          <button onClick={() => navigate('/home')} data-aos='fade-up'>
            Go to IQMaze
          </button>
        </section>
      </div>
    </>
  );
};

export default Thanks;

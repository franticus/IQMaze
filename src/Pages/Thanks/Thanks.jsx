import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import s from './Thanks.module.scss';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import certificate from '../../img/certificate_empty.png';
import html2canvas from 'html2canvas';
import { getIQDescription } from './getIQDescription';
import graph from '../../img/graph.jpg';
import cn from 'classnames';

const Thanks = () => {
  const customNavigate = useCustomNavigate();
  const [userName, setUserName] = useState('');
  const storedUserName = localStorage.getItem('userName');
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'thanksPage',
      });
    }

    const savedParams = localStorage.getItem('savedParams');
    if (savedParams) {
      const newUrl = `${window.location.pathname}${savedParams}`;
      window.history.replaceState(null, '', newUrl);
    }

    const lastAnswers = JSON.parse(localStorage.getItem('lastAnswers')) || [];
    const incorrect = lastAnswers.filter(answer => !answer.isUserTrue);
    setIncorrectAnswers(incorrect);
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

  const defaultVariantIncorrectAnswers = useCallback(
    () => (
      <ul>
        {incorrectAnswers.map((answer, index) => (
          <li key={index} className={s.question_item}>
            <div
              className={cn(s.quest_image, {
                [s[`quest_image_square`]]: answer.variants.length > 6,
              })}
              style={{
                backgroundImage: `url(${require(`../../img/quiz/${answer.question}.png`)})`,
              }}
            ></div>
            <div>
              <strong>Your Answer:</strong>{' '}
              {answer.variants[answer.userAnswer - 1]}
            </div>
            <div>
              <strong>Correct Answer:</strong>{' '}
              {answer.variants[answer.true - 1]}
            </div>
            <ul className={s.questVariants}>
              {answer.variants.map((variant, variantIndex) => (
                <li key={`${variant}-${variantIndex}`}>
                  <div
                    className={cn(s.quest_icon, {
                      [s[`quest_icon_${variantIndex + 1}`]]: true,
                      [s[`quest_icon_square_${variantIndex + 1}`]]:
                        answer.variants.length > 6,
                      [s.quest_icon_wrong]: variantIndex + 1 === answer.true,
                      [s.quest_icon_correct]:
                        variantIndex + 1 !== answer.true &&
                        variantIndex + 1 === answer.userAnswer,
                    })}
                    style={{
                      backgroundImage: `url(${require(`../../img/quiz/${answer.question}.png`)})`,
                    }}
                  ></div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    ),
    [incorrectAnswers]
  );

  return (
    <div className={s.thanks}>
      <section className={s.heroSection} data-aos='fade-up'>
        <h1 className={s.mainHeading}>Thank you!</h1>
        <p className={s.introText}>
          You have finished the IQ test.
          <br /> Here is your certificate.
        </p>
        <div className={s.certificate} ref={certificateRef} data-aos='fade-up'>
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

        <div className={s.incorrectAnswers}>
          <h1 className={s.mainHeading}>Incorrect Answers</h1>
          {defaultVariantIncorrectAnswers()}
        </div>

        <button onClick={() => customNavigate('/home')} data-aos='fade-up'>
          Go to IQMaze
        </button>
      </section>
    </div>
  );
};

export default Thanks;

import React, { useEffect, useRef, useState, useCallback } from 'react';
import s from './Thanks.module.scss';
import IQDistribution from '../../components/IQDistribution/IQDistribution';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { getIQDescription } from './getIQDescription';
import cn from 'classnames';
import CertificateResult from '../../components/СertificateResult/СertificateResult';

const Thanks = () => {
  const customNavigate = useCustomNavigate();
  const [userName, setUserName] = useState('');
  console.log('userName:', userName);
  const storedUserName = localStorage.getItem('userName');
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [showIncorrectAnswers, setShowIncorrectAnswers] = useState(false);
  const incorrectAnswersRef = useRef(null);

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

  const handleShowIncorrectAnswers = () => {
    setShowIncorrectAnswers(true);
    setTimeout(() => {
      incorrectAnswersRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
                      [s.quest_icon_correct]: variantIndex + 1 === answer.true,
                      [s.quest_icon_wrong]:
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
      <section className={s.heroSection}>
        <h1 className={s.mainHeading}>Thank you!</h1>
        <p className={s.introText}>
          You have finished the IQ test.
          <br /> Here is your certificate.
        </p>

        <CertificateResult userName={userName} iqValue={iqValue} date={date} />

        <button onClick={handleShowIncorrectAnswers}>
          Show my incorrect answers
        </button>

        <div className={s.resultDescription}>
          <h2>Result description</h2>
          <div
            dangerouslySetInnerHTML={{ __html: getIQDescription(iqValue) }}
          />
        </div>

        <IQDistribution />

        {showIncorrectAnswers && (
          <div
            className={cn(s.incorrectAnswers, {
              [s.hidden]: !showIncorrectAnswers,
            })}
            ref={incorrectAnswersRef}
          >
            <h2 className={s.mainHeading}>Incorrect Answers</h2>
            {defaultVariantIncorrectAnswers()}
          </div>
        )}

        <button onClick={() => customNavigate('/home')}>Go to IQMaze</button>
      </section>
    </div>
  );
};

export default Thanks;

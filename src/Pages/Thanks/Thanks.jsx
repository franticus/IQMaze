import React, { useEffect, useRef, useState } from 'react';
import s from './Thanks.module.scss';
import IQDistribution from '../../components/IQDistribution/IQDistribution';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { getIQDescription } from './getIQDescription';
import cn from 'classnames';
import CertificateResult from '../../components/CertificateResult/CertificateResult';
import IncorrectAnswers from '../../components/IncorrectAnswers/IncorrectAnswers';

const Thanks = () => {
  const customNavigate = useCustomNavigate();
  const [userName, setUserName] = useState('');
  const [tempUserName, setTempUserName] = useState('');
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
      setTempUserName(storedUserName.replace(/['"]+/g, ''));
    } else {
      setUserName('Your Name');
      setTempUserName('Your Name');
    }
  }, [storedUserName]);

  const handleUserNameChange = e => {
    setTempUserName(e.target.value);
  };

  const handleUserNameSubmit = () => {
    setUserName(tempUserName);
    localStorage.setItem('userName', JSON.stringify(tempUserName));
  };

  const iqValue = JSON.parse(localStorage.getItem('iqScore'));
  const date = new Date().toLocaleDateString();

  const handleShowIncorrectAnswers = () => {
    setShowIncorrectAnswers(true);
    setTimeout(() => {
      incorrectAnswersRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className={s.thanks}>
      <section className={s.heroSection}>
        <h1 className={s.mainHeading}>Thank you!</h1>
        <p className={s.introText}>
          You have finished the IQ test.
          <br /> Here is your certificate.
        </p>

        <div className={s.nameInputContainer}>
          <input
            type='text'
            value={tempUserName}
            onChange={handleUserNameChange}
            className={s.nameInput}
            placeholder='Name and Surname'
          />
          <button onClick={handleUserNameSubmit} className={s.submitButton}>
            Update Name
          </button>
        </div>

        <CertificateResult userName={userName} iqValue={iqValue} date={date} />

        {incorrectAnswers.length !== 0 && (
          <button onClick={handleShowIncorrectAnswers}>
            Show my incorrect answers
          </button>
        )}

        <div className={s.resultDescription}>
          <h2>Result description</h2>
          <div
            dangerouslySetInnerHTML={{ __html: getIQDescription(iqValue) }}
          />
        </div>

        <IQDistribution />

        {showIncorrectAnswers && (
          <div
            className={cn(s.incorrectAnswersContainer, {
              [s.hidden]: !showIncorrectAnswers,
            })}
            ref={incorrectAnswersRef}
          >
            <IncorrectAnswers incorrectAnswers={incorrectAnswers} />
          </div>
        )}

        <button onClick={() => customNavigate('/home')}>Go to IQMaze</button>
      </section>
    </div>
  );
};

export default Thanks;

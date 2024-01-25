import React, { useEffect, useState } from 'react';
import s from './Paywall.module.scss';
import certificate from '../../img/certificate.jpg';
import { useNavigate } from 'react-router-dom';

const Paywall = () => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [iqValue, setIqValue] = useState(0);
  const navigate = useNavigate();

  const calculateIQ = () => {
    const seriesScoresLocal = JSON.parse(localStorage.getItem('seriesScores'));
    const seriesScores = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
    };

    if (!seriesScoresLocal) {
      console.log('No quiz data found.');
      return;
    }

    Object.keys(seriesScoresLocal).forEach(level => {
      const count = seriesScoresLocal[level];
      seriesScores[level] = count;
    });

    const iqTable = {
      A: [8, 9, 10, 11, 12],
      B: [8, 9, 10, 11, 12],
      C: [4, 5, 6, 7, 8],
      D: [2, 3, 4, 5, 6],
      E: [0, 1, 2, 3, 4],
    };

    let iq = 0;
    Object.keys(seriesScores).forEach(series => {
      const score = seriesScores[series];
      if (iqTable[series][score]) {
        iq += iqTable[series][score];
      }
    });

    setIqValue(iq);
    console.log('IQ Score:', iq);
  };
  useEffect(() => {
    calculateIQ();
  }, []);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      console.log('Email:', email);
      setIsValid(true);
      // код для отправки email на сервер
      setTimeout(() => {
        navigate('/thanks');
      }, 1000);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className={s.paywall}>
      <section className={s.heroSection}>
        <h1 className={s.mainHeading}>Well done!</h1>
        <h4 className={s.mainHeading}>IQ: {iqValue}</h4>
        <p className={s.introText}>
          You have finished the IQ test.
          <br /> A certificate will be sent to the email address you entered,
          <br /> so enter it correctly.
        </p>
        <label htmlFor='emailInput'>Email:</label>
        <input
          id='emailInput'
          type='email'
          value={email}
          onChange={handleEmailChange}
          className={!isValid ? s.invalid : ''}
        />
        {!isValid && (
          <p className={s.error}>Please enter a valid email address.</p>
        )}
        <button onClick={handleSubmit}>Get my IQ score</button>
        <h2 className={s.mainHeading}>Information on Test Results</h2>
        <ul className={s.list}>
          <li className={s.list_item}>
            The following certificate will be issued with the information you
            entered.
          </li>
          <li>
            <img src={certificate} alt='certificate' className={s.heroImage} />
          </li>
          <li className={s.list_item}>
            Certificate Sample This test is the only IQ test that derives a
            ranking with a scale of more than 5 million people worldwide.
          </li>
          <li className={s.list_item}>
            You can see the job relevance according to Mensa IQ, percentile, and
            IQ score.
          </li>
          <li className={s.list_item}>
            The link to the test results will be sent to the email you entered.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Paywall;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import s from './Paywall.module.scss';
import certificate from '../../img/certificate.png';
import { useNavigate } from 'react-router-dom';

const Paywall = () => {
  // const [email, setEmail] = useState('');
  // const [isValid, setIsValid] = useState(true);
  const [name, setName] = useState('');
  const [iqValue, setIqValue] = useState(0);
  const navigate = useNavigate();

  const iqTable = {
    15: 62,
    16: 65,
    17: 65,
    18: 66,
    19: 67,
    20: 69,
    21: 70,
    22: 71,
    23: 72,
    24: 73,
    25: 75,
    26: 76,
    27: 77,
    28: 79,
    29: 80,
    30: 82,
    31: 83,
    32: 84,
    33: 86,
    34: 87,
    35: 88,
    36: 90,
    37: 91,
    38: 92,
    39: 94,
    40: 95,
    41: 96,
    42: 98,
    43: 99,
    44: 100,
    45: 102,
    46: 104,
    47: 106,
    48: 108,
    49: 110,
    50: 112,
    51: 114,
    52: 116,
    53: 118,
    54: 120,
    55: 122,
    56: 124,
    57: 126,
    58: 128,
    59: 130,
    60: 140,
  };

  const calculateIQ = () => {
    const seriesScoresLocal = JSON.parse(localStorage.getItem('seriesScores'));
    if (!seriesScoresLocal) {
      console.log('No quiz data found.');
      return;
    }

    console.log('seriesScoresLocal:', seriesScoresLocal);
    let totalCorrectAnswers = Object.values(seriesScoresLocal).reduce(
      (total, num) => total + num,
      0
    );

    const iq = iqTable[totalCorrectAnswers] || '62';

    setIqValue(iq);
    console.log('Calculated IQ Score:', iq);
    console.log('Total Correct Answers:', totalCorrectAnswers);
  };
  useEffect(() => {
    calculateIQ();
  }, []);

  // const handleEmailChange = event => {
  //   setEmail(event.target.value);
  // };

  const handleNameChange = event => {
    setName(event.target.value);
  };

  // const validateEmail = email => {
  //   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return re.test(email);
  // };

  const handleSubmit = () => {
    // if (validateEmail(email)) {
    //   console.log('Email:', email);
    //   setIsValid(true);
    //   // код для отправки email на сервер
    //   setTimeout(() => {
    //     navigate('/thanks');
    //   }, 1000);
    // } else {
    //   setIsValid(false);
    // }

    setTimeout(() => {
      localStorage.setItem('userName', JSON.stringify(name));
      localStorage.setItem('iqScore', JSON.stringify(iqValue));
      navigate('/thanks');
    }, 1000);
  };

  return (
    <div className={s.paywall}>
      <section className={s.heroSection}>
        <h1 className={s.mainHeading}>Well done!</h1>
        <h4 className={s.mainHeading}>IQ: {iqValue}</h4>
        <p className={s.introText}>
          You have finished the IQ test. <br /> Please enter your first and last
          name to receive your certificate.
        </p>
        {/* <label htmlFor='emailInput'>Email:</label>
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
        <button onClick={handleSubmit}>Get my IQ score</button> */}
        <label htmlFor='emailInput'>Your first and last name:</label>
        <input
          id='nameInput'
          type='text'
          value={name}
          onChange={handleNameChange}
        />
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
            You can see the job relevance according to IQMaze, percentile, and
            IQ score.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Paywall;

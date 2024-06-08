/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { quizData } from './quizData/quizData.js';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import { useNavigate } from 'react-router-dom';
import s from './Quiz.module.scss';
import cn from 'classnames';
import { getUserId } from '../../helpers/userId.js';

const Quiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [seriesScores, setSeriesScores] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
  });
  const [pointerEvents, setPointerEvents] = useState(true);
  const question = quizData[step];
  const style = {
    backgroundImage: `url(${require(`../../img/quiz/${question.question}.png`)})`,
  };
  const isLastQuestion = step === quizData.length - 1;

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowQuiz(true);
      setPointerEvents(false);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [step]);

  useEffect(() => {
    localStorage.setItem('seriesScores', JSON.stringify(seriesScores));
  }, [seriesScores]);

  const recordAnswer = useCallback(
    index => {
      const isTrueAnswer = question.true === index;

      if (isTrueAnswer) {
        setSeriesScores(prevScores => ({
          ...prevScores,
          [question.level]: prevScores[question.level] + 1,
        }));
      }

      const userId = getUserId();

      if (step === 0) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'firstQuestionAnswered',
          userId: userId,
          timestamp: new Date().toISOString(),
        });
      }

      if ((step + 1) % 12 === 0) {
        const eventMap = {
          A: 'A_QuestionsAnswered',
          B: 'B_QuestionsAnswered',
          C: 'C_QuestionsAnswered',
          D: 'D_QuestionsAnswered',
          E: 'E_QuestionsAnswered',
        };

        window.dataLayer.push({
          event: eventMap[question.level],
          userId: userId,
          timestamp: new Date().toISOString(),
        });
      }
    },
    [question.true, question.level, step]
  );

  const onClickVariant = useCallback(() => {
    setPointerEvents(true);
    setShowQuiz(false);

    if (!isLastQuestion) {
      setTimeout(() => {
        setStep(prev => prev + 1);
      }, 500);
    } else {
      setTimeout(() => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.setItem('seriesScores', JSON.stringify(seriesScores));
        navigate('/analyzing');
      }, 1000);
    }
  }, [isLastQuestion, navigate]);

  const stepBack = useCallback(() => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  }, [step]);

  const percentage = Math.round(((step + 1) / quizData.length) * 100);

  const defaultVariant = useCallback(
    () => (
      <ul
        className={cn(
          s.fade,
          showQuiz ? s.show : '',
          step >= 24 ? s.eight : ''
        )}
      >
        {question.variants &&
          question.variants.map((quest, index) => (
            <li
              key={`${quest}-${step}`}
              onClick={() => {
                recordAnswer(index + 1);
                onClickVariant();
              }}
            >
              <span>{index + 1}</span>
              <div
                className={cn(s.quest_icon, {
                  [s[`quest_icon_${index + 1}`]]: true,
                  [s[`quest_icon_square_${index + 1}`]]: step >= 24,
                })}
                style={style}
              ></div>
            </li>
          ))}
      </ul>
    ),
    [question.variants, recordAnswer, onClickVariant, showQuiz, step, style]
  );

  const skip = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.setItem(
      'seriesScores',
      JSON.stringify({
        A: 12,
        B: 8,
        C: 6,
        D: 6,
        E: 6,
      })
    );

    navigate('/analyzing');
  };

  return (
    <div
      className={cn(
        s.fade,
        showQuiz ? s.show : '',
        pointerEvents && s.preventClick
      )}
    >
      <div data-aos='fade-down'>
        <ProgressBar percentage={percentage} stepBack={stepBack} />
      </div>
      <div className={s.questions_title} data-aos='fade-down'>
        (Level {question.level}) Question {step + 1}/{quizData.length}: Choose
        the correct form for the blanks.
      </div>
      <div className={s.questions}>
        <div
          className={cn(s.quest_image, {
            [s[`quest_image_square`]]: step >= 24,
          })}
          style={style}
        ></div>
        <div className={s.quiz_container} data-aos='fade-left'>
          <div className={s.quiz}>{defaultVariant()}</div>
        </div>
      </div>
      <button onClick={() => skip()}>Skip</button>
    </div>
  );
};

export default Quiz;

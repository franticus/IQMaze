/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { quizData } from './quizData/quizData.js';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import { useNavigate } from 'react-router-dom';
import s from './Quiz.module.scss';
import cn from 'classnames';

const Quiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [pointerEvents, setPointerEvents] = useState(true);
  const question = quizData[step];
  const style = {
    backgroundImage: `url(${require(`../../img/quiz/${question.question}.png`)})`,
  };
  const isLastQuestion = step === quizData.length - 1;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowQuiz(true);
      setPointerEvents(false);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [step]);

  const recordAnswer = index => {
    console.log(`Q${step + 1}: ${index}`);
  };

  const onClickVariant = () => {
    setPointerEvents(true);
    setTimeout(() => {
      setShowQuiz(false);
    }, 300);

    setTimeout(() => {
      !isLastQuestion && setStep(prev => prev + 1);
    }, 500);

    setTimeout(() => {
      isLastQuestion && navigate('/paywall');
    }, 1000);
  };

  const stepBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  const percentage = Math.round(((step + 1) / quizData.length) * 100);

  const defaultVariant = () => {
    return (
      <ul className={cn(s.fade, showQuiz ? s.show : '')}>
        {question.variants &&
          question.variants.map((quest, index) => {
            return (
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
                  })}
                  style={style}
                ></div>
              </li>
            );
          })}
      </ul>
    );
  };

  return (
    <div
      className={cn(
        s.fade,
        showQuiz ? s.show : '',
        pointerEvents && s.preventClick
      )}
    >
      <ProgressBar percentage={percentage} stepBack={stepBack} />
      <div className={s.questions_title}>
        Question {step + 1}/{quizData.length}: Choose the correct form for the
        blanks.
      </div>
      <div className={s.questions}>
        <div className={s.quest_image} style={style}></div>
        <div className={s.quiz_container}>
          <div className={s.quiz}>{defaultVariant()}</div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { quizData } from './quizData/quizData.js';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import { useNavigate } from 'react-router-dom';
import s from './Quiz.module.scss';
import cn from 'classnames';

const Quiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(true);
  const question = quizData[step];
  console.log('question:', question.variants[0]);

  const onClickVariant = () => {
    if (!question.nextButton) {
      setTimeout(() => {
        setShowQuiz(false);
      }, 300);

      setTimeout(() => {
        setStep(prev => prev + 1);
        step !== quizData.length - 1 || navigate('/result');
      }, 500);
    }
  };

  const percentage = Math.round((step / quizData.length) * 100);

  const defaultVariant = () => {
    return (
      <>
        <ul className={cn(s.fade, showQuiz ? s.show : '')}>
          {question.variants &&
            question.variants.map((quest, index) => (
              <li key={quest} onClick={() => onClickVariant()}>
                <img
                  className={s.quest_icon}
                  src={require(`../../img/quiz/answers_q${step + 1}/${
                    index + 1
                  }.png`)}
                  alt='icon'
                />
              </li>
            ))}
        </ul>
      </>
    );
  };

  return (
    <>
      <ProgressBar percentage={percentage} />
      <div>{question.title}</div>
      <div className={s.questions}>
        <img
          className={s.quest_image}
          src={require(`../../img/quiz/${question.questionImage}.png`)}
          alt=''
        />
        <div className={s.quiz_container}>
          <div className={s.quiz}>{defaultVariant()}</div>
        </div>
      </div>
    </>
  );
};

export default Quiz;

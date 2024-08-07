/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { quizData } from './quizData/quizData.js';
import { quizDataV30q } from './quizData/quizDataV30q.js';
import { quizDataV20q } from './quizData/quizDataV20q.js';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import s from './Quiz.module.scss';
import cn from 'classnames';
import { getUserId } from '../../helpers/userId.js';
import Pagination from '../Pagination/Pagination.jsx';

const Quiz = () => {
  const customNavigate = useCustomNavigate();
  const currentUrl = window.location.href;
  const isV30q = currentUrl.includes('V30q');
  const isV20q = currentUrl.includes('V20q');
  const eventQuestionsLength = isV30q ? 6 : isV20q ? 4 : 12;

  const quizDataVariant = useMemo(() => {
    return isV30q ? quizDataV30q : isV20q ? quizDataV20q : quizData;
  }, [isV30q, isV20q]);

  const whenEightVariants = useMemo(() => {
    return isV30q ? 12 : isV20q ? 8 : 24;
  }, [isV30q, isV20q]);

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem('answers');
    return savedAnswers ? JSON.parse(savedAnswers) : [];
  });

  const [step, setStep] = useState(() => {
    let savedStep = localStorage.getItem('currentStep');
    if (savedStep === null || savedStep === '' || isNaN(savedStep)) {
      savedStep = 0;
      localStorage.setItem('currentStep', 0);
    } else {
      savedStep = parseInt(savedStep, 10);
    }
    return savedStep;
  });

  const [seriesScores, setSeriesScores] = useState(() => {
    const savedScores = localStorage.getItem('seriesScores');
    return savedScores
      ? JSON.parse(savedScores)
      : {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          E: 0,
        };
  });

  const [showQuiz, setShowQuiz] = useState(false);
  const [pointerEvents, setPointerEvents] = useState(true);
  const [loading, setLoading] = useState(true);
  const question = quizDataVariant[step];
  const style = question
    ? {
        backgroundImage: `url(${require(`../../img/quiz/${question.question}.png`)})`,
      }
    : {};

  const isLastQuestion = step === quizDataVariant.length - 1;

  useEffect(() => {
    setShowQuiz(true);
    setPointerEvents(false);
  }, [step]);

  useEffect(() => {
    localStorage.setItem('currentStep', step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem('seriesScores', JSON.stringify(seriesScores));
  }, [seriesScores]);

  useEffect(() => {
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    setLoading(true);
    const img = new Image();
    img.src = require(`../../img/quiz/${question.question}.png`);
    img.onload = () => setLoading(false);
  }, [question]);

  const recordAnswer = useCallback(
    index => {
      if (!question) return;

      const isTrueAnswer = question.true === index;
      const previousAnswer = answers.find(
        ans => ans.id === question.id && ans.level === question.level
      );

      if (previousAnswer) {
        if (previousAnswer.isUserTrue && !isTrueAnswer) {
          setSeriesScores(prevScores => ({
            ...prevScores,
            [question.level]: prevScores[question.level] - 1,
          }));
        } else if (!previousAnswer.isUserTrue && isTrueAnswer) {
          setSeriesScores(prevScores => ({
            ...prevScores,
            [question.level]: prevScores[question.level] + 1,
          }));
        }

        setAnswers(prevAnswers =>
          prevAnswers.map(ans =>
            ans.id === question.id && ans.level === question.level
              ? { ...ans, userAnswer: index, isUserTrue: isTrueAnswer }
              : ans
          )
        );
      } else {
        setAnswers(prevAnswers => [
          ...prevAnswers,
          {
            id: question.id,
            level: question.level,
            question: question.question,
            variants: question.variants,
            true: question.true,
            userAnswer: index,
            isUserTrue: isTrueAnswer,
          },
        ]);

        if (isTrueAnswer) {
          setSeriesScores(prevScores => ({
            ...prevScores,
            [question.level]: prevScores[question.level] + 1,
          }));
        }
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

      if ((step + 1) % eventQuestionsLength === 0) {
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
    [question, step, answers]
  );

  const onClickVariant = useCallback(
    index => {
      recordAnswer(index + 1);
      setPointerEvents(true);
      setShowQuiz(false);

      if (!isLastQuestion) {
        setTimeout(() => {
          setStep(prev => prev + 1);
        }, 100);
      } else {
        const updatedAnswers = [
          ...answers,
          {
            id: question.id,
            level: question.level,
            question: question.question,
            variants: question.variants,
            true: question.true,
            userAnswer: index + 1,
            isUserTrue: question.true === index + 1,
          },
        ];
        setAnswers(updatedAnswers);
        setTimeout(() => {
          localStorage.setItem('lastAnswers', JSON.stringify(updatedAnswers));
          localStorage.removeItem('answers');
          localStorage.removeItem('currentStep');
          customNavigate('/analyzing');
        }, 1000);
      }
    },
    [isLastQuestion, customNavigate, answers, recordAnswer, question]
  );

  const stepBack = useCallback(() => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  }, [step]);

  const percentage = useMemo(() => {
    return Math.round(((step + 1) / quizDataVariant.length) * 100);
  }, [step, quizDataVariant.length]);

  const defaultVariant = useCallback(
    () => (
      <ul
        className={cn(
          s.fade,
          showQuiz ? s.show : '',
          step >= whenEightVariants ? s.eight : ''
        )}
      >
        {question &&
          question.variants &&
          question.variants.map((quest, index) => (
            <li key={`${quest}-${step}`} onClick={() => onClickVariant(index)}>
              <span>{index + 1}</span>
              <div
                className={cn(s.quest_icon, {
                  [s[`quest_icon_${index + 1}`]]: true,
                  [s[`quest_icon_square_${index + 1}`]]:
                    step >= whenEightVariants,
                })}
                style={style}
              ></div>
            </li>
          ))}
      </ul>
    ),
    [question, onClickVariant, showQuiz, step, style]
  );

  const goToPage = page => {
    setStep(page);
  };

  return (
    <div
      className={cn(
        s.fade,
        showQuiz ? s.show : '',
        pointerEvents && s.preventClick
      )}
    >
      <div>
        <ProgressBar percentage={percentage} stepBack={stepBack} />
      </div>
      <div className={s.questions_title}>
        {question
          ? `(Level ${question.level}) Question ${step + 1}/${
              quizDataVariant.length
            }: Choose the correct form for the blanks.`
          : 'Loading...'}
      </div>
      <div className={s.questions}>
        {question && (
          <>
            {loading ? (
              <Skeleton
                height={step >= whenEightVariants ? 250 : 220}
                width={step >= whenEightVariants ? 300 : 340}
                className={s.quest_image}
              />
            ) : (
              <div
                className={cn(s.quest_image, {
                  [s[`quest_image_square`]]: step >= whenEightVariants,
                })}
                style={style}
              ></div>
            )}
            <div className={s.quiz_container}>
              <div className={s.quiz}>
                {loading ? (
                  <Skeleton count={4} height={50} className={s.questVariants} />
                ) : (
                  defaultVariant()
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Pagination
        currentStep={step}
        totalSteps={quizDataVariant.length}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default Quiz;

import React from 'react';
import s from './IncorrectAnswers.module.scss';
import cn from 'classnames';

const IncorrectAnswers = ({ incorrectAnswers }) => {
  const defaultVariantIncorrectAnswers = () => (
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
            <strong>Correct Answer:</strong> {answer.variants[answer.true - 1]}
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
  );

  return (
    <div className={s.incorrectAnswers}>
      <h2 className={s.mainHeading}>Incorrect Answers</h2>
      {defaultVariantIncorrectAnswers()}
    </div>
  );
};

export default IncorrectAnswers;

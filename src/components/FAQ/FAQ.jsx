import React, { useState, useRef, useEffect } from 'react';
import s from './FAQ.module.scss';
import { faqs } from './faqData.js';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [heights, setHeights] = useState({});

  const refs = useRef([]);

  useEffect(() => {
    const newHeights = {};
    refs.current.forEach((ref, index) => {
      if (ref) {
        newHeights[index] = ref.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, []);

  const toggleAccordion = index => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={s.faqContainer}>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className={s.faqItem}>
          <div className={s.question} onClick={() => toggleAccordion(index)}>
            <span>{faq.question}</span>
            <span className={activeIndex === index ? s.plusOpen : s.plus}>
              +
            </span>
          </div>
          <div
            ref={el => (refs.current[index] = el)}
            className={`${s.answerWrapper} ${
              activeIndex === index ? s.open : ''
            }`}
            style={{
              maxHeight: activeIndex === index ? `${heights[index]}px` : '0',
            }}
          >
            <div className={s.answer}>{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;

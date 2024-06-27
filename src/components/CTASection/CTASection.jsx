import React from 'react';
import PropTypes from 'prop-types';
import s from './CTASection.module.scss';

const CTASection = ({ hasStartedTest, handleStartTest }) => {
  return (
    <section className={s.ctaSection}>
      <h2 className={s.sectionHeading}>Get Started with IQMaze</h2>
      <p className={s.sectionText}>
        Ready to discover your cognitive strengths? Take our scientifically
        validated IQ test today and start your journey towards personal and
        professional growth.
      </p>
      <button className={s.button} onClick={handleStartTest}>
        {hasStartedTest ? 'Continue IQ test' : 'Start IQ test'}
      </button>
    </section>
  );
};

CTASection.propTypes = {
  hasStartedTest: PropTypes.bool.isRequired,
  handleStartTest: PropTypes.func.isRequired,
};

export default CTASection;

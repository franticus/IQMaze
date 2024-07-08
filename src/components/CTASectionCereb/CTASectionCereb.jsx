import React from 'react';
import PropTypes from 'prop-types';
import s from './CTASectionCereb.module.scss';
import certificate from '../../img/certificate.png';

const CTASectionCereb = ({ hasStartedTest, handleStartTest }) => {
  return (
    <section className={s.CTASectionCereb}>
      <div className={s.left}>
        <h2 className={s.sectionHeading}>
          Discover your true <div className={s.sectionHeading_iq}>IQ score</div>
        </h2>
        <button className={s.button} onClick={handleStartTest}>
          {hasStartedTest ? 'Continue Certified Test' : 'Start Certified Test'}
        </button>
      </div>
      <div className={s.right}>
        <img className={s.certificate} src={certificate} alt='certificate' />
      </div>
    </section>
  );
};

CTASectionCereb.propTypes = {
  hasStartedTest: PropTypes.bool.isRequired,
  handleStartTest: PropTypes.func.isRequired,
};

export default CTASectionCereb;

import React from 'react';
import PropTypes from 'prop-types';
import s from './HeroSectionCereb.module.scss';
// import cn from 'classnames';
import 'react-loading-skeleton/dist/skeleton.css';

const HeroSectionCereb = ({
  loading,
  hasStartedTest,
  // showLastResults,
  handleStartTest,
  // handleShowLastResults,
  handleContinueTest,
}) => {
  return (
    <>
      <div className={s.HeroSectionCereb}>
        <div className={s.title}>
          Discover your true
          <div className={s.title_iq}>IQ score</div>
          in 5 minutes
        </div>

        <button className={s.button} onClick={handleStartTest}>
          Start Certified Test
        </button>
        {hasStartedTest && (
          <button className={s.button} onClick={handleContinueTest}>
            Continue Certified Test
          </button>
        )}
        {/* {showLastResults && (
          <button
            className={cn(s.button, s.button_last)}
            onClick={handleShowLastResults}
          >
            Show Last Results
          </button>
        )} */}
      </div>
    </>
  );
};

HeroSectionCereb.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasStartedTest: PropTypes.bool.isRequired,
  // showLastResults: PropTypes.bool.isRequired,
  handleStartTest: PropTypes.func.isRequired,
  // handleShowLastResults: PropTypes.func.isRequired,
};

export default HeroSectionCereb;

import React from 'react';
import PropTypes from 'prop-types';
import s from './HeroSection.module.scss';
// import cn from 'classnames';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import about_1 from '../../img/about_1.jpg';

const HeroSection = ({
  loading,
  hasStartedTest,
  // showLastResults,
  handleStartTest,
  // handleShowLastResults,
  handleContinueTest,
}) => {
  return (
    <>
      <div className={s.hero}>
        {loading ? (
          <Skeleton height={20} width={200} />
        ) : (
          <div className={s.did}>12,502 people did this test last week.</div>
        )}
        <div className={s.title}>
          Test your <span className={s.title_iq}>IQ!</span>
        </div>
        {loading ? (
          <>
            <Skeleton count={2} />
            <Skeleton height={40} width={200} className={s.buttonSkeleton} />
          </>
        ) : (
          <>
            <div className={s.description}>
              The IQ Test is to assess intellectual abilities formed by general
              experience, not affected by training or learning. You can figure
              out your intellectual level compared to the group of the same age.
            </div>
            <div className={s.description}>
              As it requires concentration for a given amount of time, please
              conduct the test in a quiet and comfortable place.
            </div>
            <button className={s.button} onClick={handleStartTest}>
              Start IQ test
            </button>
            {hasStartedTest && (
              <button className={s.button} onClick={handleContinueTest}>
                Continue IQ test
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
          </>
        )}
      </div>

      <section className={s.heroSection}>
        <div className={s.heroContent}>
          <h1 className={s.mainHeading}>
            Unlock Your Cognitive Potential with IQMaze
          </h1>
          <p className={s.introText}>
            Join us on an exciting journey through the realms of intelligence
            and cognitive prowess. IQMaze offers scientifically validated tests
            that unveil the intricacies of your mind, helping you discover your
            unique intellectual strengths.
          </p>
          {loading ? (
            <Skeleton height={300} width={300} />
          ) : (
            <img
              src={about_1}
              alt='Brain maze representing the complexity of human intelligence'
              className={s.heroImage}
              loading='lazy'
            />
          )}
        </div>
      </section>
    </>
  );
};

HeroSection.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasStartedTest: PropTypes.bool.isRequired,
  // showLastResults: PropTypes.bool.isRequired,
  handleStartTest: PropTypes.func.isRequired,
  // handleShowLastResults: PropTypes.func.isRequired,
};

export default HeroSection;

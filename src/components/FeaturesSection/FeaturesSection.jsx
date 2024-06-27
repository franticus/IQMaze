import React from 'react';
import PropTypes from 'prop-types';
import s from './FeaturesSection.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import about_2 from '../../img/about_2.jpg';
import about_3 from '../../img/about_3.jpg';
import about_4 from '../../img/about_4.jpg';

const FeaturesSection = ({ loading }) => {
  return (
    <section className={s.featuresSection}>
      <h2 className={s.sectionHeading}>Why Choose IQMaze?</h2>
      <div className={s.features}>
        <div className={s.featureItem}>
          {loading ? (
            <Skeleton height={150} width={150} />
          ) : (
            <img
              src={about_2}
              alt='Feature 1'
              className={s.featureImage}
              loading='lazy'
            />
          )}
          <h3 className={s.featureTitle}>Comprehensive Analysis</h3>
          <p className={s.featureText}>
            Our tests provide a thorough analysis of your cognitive abilities,
            highlighting your strengths and areas for improvement.
          </p>
        </div>
        <div className={s.featureItem}>
          {loading ? (
            <Skeleton height={150} width={150} />
          ) : (
            <img
              src={about_3}
              alt='Feature 2'
              className={s.featureImage}
              loading='lazy'
            />
          )}
          <h3 className={s.featureTitle}>Scientifically Validated</h3>
          <p className={s.featureText}>
            Developed by experts, our tests are backed by rigorous research and
            scientific validation.
          </p>
        </div>
        <div className={s.featureItem}>
          {loading ? (
            <Skeleton height={150} width={150} />
          ) : (
            <img
              src={about_4}
              alt='Feature 3'
              className={s.featureImage}
              loading='lazy'
            />
          )}
          <h3 className={s.featureTitle}>Personal Growth</h3>
          <p className={s.featureText}>
            Use your results to foster personal and professional growth,
            enhancing your cognitive skills.
          </p>
        </div>
      </div>
    </section>
  );
};

FeaturesSection.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default FeaturesSection;

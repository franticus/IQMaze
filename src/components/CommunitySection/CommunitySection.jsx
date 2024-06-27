import React from 'react';
import PropTypes from 'prop-types';
import s from './CommunitySection.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import about_5 from '../../img/about_5.jpg';

const CommunitySection = ({ loading }) => {
  return (
    <section className={s.communitySection}>
      <h2 className={s.sectionHeading}>Join the IQMaze Community</h2>
      <p className={s.sectionText}>
        Connect with like-minded individuals, share your results, and
        participate in engaging discussions about intelligence and cognitive
        health. Our community is here to support your journey toward unlocking
        your full cognitive potential.
      </p>
      {loading ? (
        <Skeleton height={300} width={300} />
      ) : (
        <img
          src={about_5}
          alt='A diverse group of people from the IQMaze community'
          className={s.communityImage}
          loading='lazy'
        />
      )}
    </section>
  );
};

CommunitySection.propTypes = {
  loading: PropTypes.bool.isRequired,
  about_5: PropTypes.string.isRequired,
};

export default CommunitySection;

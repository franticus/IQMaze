import React from 'react';
import s from './CerebStatsHero.module.scss';
import about_1 from '../../img/about_1.jpg';
import check from '../../img/check.svg';
import top from '../../img/top.svg';
import comment from '../../img/comment.svg';

const CerebStatsHero = () => {
  return (
    <section className={s.heroSection}>
      <div className={s.left}>
        <div className={s.introText}>
          Our test is based on the latest psychological studies, and gives very
          similar results compared to standardized IQ tests.
        </div>
        <div className={s.introText}>
          <img className={s.statsImg} src={check} alt='check' />
          <p>
            <strong>3.318</strong> Tests taken today
          </p>
        </div>
        <div className={s.introText}>
          <img className={s.statsImg} src={top} alt='top' />
          <p>
            Avg. IQ score: <strong>105</strong>
          </p>
        </div>
        <div className={s.introText}>
          <img className={s.statsImg} src={comment} alt='comment' />
          <p>Excellent client reviews ⭐⭐⭐⭐⭐</p>
        </div>
      </div>
      <div className={s.right}>
        <img
          src={about_1}
          alt='Unlock Your Cognitive Potential with IQMaze'
          className={s.heroImage}
          loading='lazy'
        />
      </div>
    </section>
  );
};

export default CerebStatsHero;

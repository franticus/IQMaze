import React from 'react';
import graph from '../../img/graph.jpg';
import s from './IQDistribution.module.scss';

const IQDistribution = () => {
  return (
    <div className={s.iqDistribution}>
      <div className={s.iqTitle}>IQ Score Distribution Graph</div>
      <div className={s.iqLabels_container}>
        <div className={s.iqLabels}>
          <div className={s.iqLabels_item}>
            <div>Above 145</div>
            <div>Genius or near genius</div>
          </div>
          <div className={s.iqLabels_item}>
            <div>130 ~ 145</div>
            <div>Very superior</div>
          </div>
          <div className={s.iqLabels_item}>
            <div>115 ~ 130</div>
            <div>Superior</div>
          </div>
          <div className={s.iqLabels_item}>
            <div>85 ~ 115</div>
            <div>Normal</div>
          </div>
          <div className={s.iqLabels_item}>
            <div>70 ~ 85</div>
            <div>Dullness</div>
          </div>
          <div className={s.iqLabels_item}>
            <div>Below 70</div>
            <div>Borderline Deficiency</div>
          </div>
        </div>
      </div>
      <img src={graph} alt='IQ Distribution' className={s.iqImage} />
    </div>
  );
};

export default IQDistribution;

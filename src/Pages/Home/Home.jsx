import React from 'react';
import s from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import graph from '../../img/graph.jpg';

const Home = () => {
  const navigate = useNavigate('/test');

  return (
    <div className={s.home}>
      <div className={s.hero}>
        <div className={s.did}>12,502 people did this test last week.</div>
        <div className={s.title}>Test your IQ!</div>
        <div className={s.description}>
          The IQ Test is to assess an intellectual abilities formed by general
          experience, not affected by training or learning. You can figure out
          your intellectual level compared to the group of the same age.
        </div>
        <div className={s.description}>
          As it requires concentration for a given amount of time, please
          conduct the test in a quiet and comfortable place.
        </div>
        <button className={s.button} onClick={() => navigate('/iqtest')}>
          Start IQ test
        </button>
      </div>

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
    </div>
  );
};

export default Home;

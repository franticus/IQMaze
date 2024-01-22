import React from 'react';
import s from './Home.module.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate('/test');

  return (
    <div className={s.home}>
      <div className={s.did}>12,502 people did this test last week.</div>
      <div className={s.title}>Test your IQ!</div>
      <div className={s.description}>
        The IQ Test is to assess an intellectual abilities formed by general
        experience, not affected by training or learning. You can figure out
        your intellectual level compared to the group of the same age.
      </div>
      <div className={s.description}>
        As it requires concentration for a given amount of time, please conduct
        the test in a quiet and comfortable place.
      </div>
      <button className={s.button} onClick={() => navigate('/iqtest')}>
        Start IQ test
      </button>
    </div>
  );
};

export default Home;

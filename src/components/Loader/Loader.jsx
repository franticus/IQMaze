import React from 'react';
import s from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={s.loader_container}>
      <div className={s.loader}></div>
    </div>
  );
};

export default Loader;

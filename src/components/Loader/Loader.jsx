import React from 'react';
import s from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={s.loader}>
      <div>Waiting for Payment</div>
      <div className={s.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;

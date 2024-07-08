import React from 'react';
import s from './CerebWhatProcess.module.scss';
import trophy from '../../img/trophy.svg';
import dumbbell from '../../img/dumbbell.svg';
import idea from '../../img/idea.svg';

const CerebWhatProcess = () => {
  return (
    <section className={s.CerebWhatProcess}>
      <div className={s.processItem}>What is the process?</div>
      <div className={s.processItem}>
        <img className={s.processImg} src={idea} alt='idea' />
        <p>Take the IQ Test.</p>
      </div>
      <div className={s.processItem}>
        <img className={s.processImg} src={dumbbell} alt='dumbbell' />
        <p>Obtain Your Detailed IQ Report.</p>
      </div>
      <div className={s.processItem}>
        <img className={s.processImg} src={trophy} alt='trophy' />
        <p>Find Strengths & Growth Points.</p>
      </div>
    </section>
  );
};

export default CerebWhatProcess;

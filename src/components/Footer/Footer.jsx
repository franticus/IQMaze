import React from 'react';
import s from './Footer.module.scss';
import logo from '../../img/iq_logo.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <header className={s.footer}>
      <div className={s.footer__container}>
        <div className={s.logo}>
          <img className={s.mainLogo} src={logo} alt='' />
          <span
            href='index.html'
            className={s.logo}
            onClick={() => navigate('/home')}
          >
            IQMaze
          </span>
        </div>
        <div className={s.copyright}>
          Copyright © |{' '}
          <span onClick={() => navigate('/home')}>IQMaze 2024</span> | All
          rights reserved
        </div>
      </div>
    </header>
  );
};

export default Footer;

import React, { useEffect } from 'react';
import s from './Footer.module.scss';
import logo from '../../img/iq_logo.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = path => {
    navigate(path);
    window.scrollTo(0, 0); // Прокрутка страницы наверх
  };

  return (
    <footer className={s.footer}>
      <div className={s.footer__container}>
        <div className={s.logo}>
          <img className={s.mainLogo} src={logo} alt='IQMaze Logo' />
          <span className={s.logoText} onClick={() => handleNavigate('/home')}>
            IQMaze
          </span>
        </div>
        <div className={s.links}>
          <span className={s.link} onClick={() => handleNavigate('/privacy')}>
            Privacy Policy
          </span>
          <span className={s.link} onClick={() => handleNavigate('/terms')}>
            Terms of Use
          </span>
        </div>
        <div className={s.copyright}>
          Copyright © |{' '}
          <span onClick={() => handleNavigate('/home')}>IQMaze 2024</span> | All
          rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;

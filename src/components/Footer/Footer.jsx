import React from 'react';
import s from './Footer.module.scss';
import logo from '../../img/iq_logo.png';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={s.footer}>
      <div className={s.footer__container}>
        <div className={s.logo}>
          <img className={s.mainLogo} src={logo} alt='IQMaze Logo' />
          <span className={s.logoText} onClick={() => navigate('/home')}>
            IQMaze
          </span>
        </div>
        <div className={s.links}>
          <span className={s.link} onClick={() => navigate('/privacy')}>
            Privacy Policy
          </span>
          <span className={s.link} onClick={() => navigate('/terms')}>
            Terms of Use
          </span>
          <a href='mailto:admin@iq-check140.com' className={s.link}>
            Contact Us
          </a>
        </div>
        <div className={s.copyright}>
          Copyright © |{' '}
          <span onClick={() => navigate('/home')}>IQMaze 2024</span> | All
          rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;

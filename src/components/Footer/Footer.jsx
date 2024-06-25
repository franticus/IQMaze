import React from 'react';
import s from './Footer.module.scss';
import logo from '../../img/iq_logo.png';
import cn from 'classnames';
import useCustomNavigate from '../../hooks/useCustomNavigate';

const Footer = () => {
  const customNavigate = useCustomNavigate();
  const currentUrl = window.location.href;
  const isPaywall = currentUrl.includes('paywall');

  return (
    <footer className={cn(s.footer, isPaywall && s.footer_pb)}>
      <div className={s.footer__container}>
        <div className={s.logo}>
          <img className={s.mainLogo} src={logo} alt='IQMaze Logo' />
          <span className={s.logoText} onClick={() => customNavigate('/home')}>
            IQMaze
          </span>
        </div>
        <div className={s.links}>
          <span className={s.link} onClick={() => customNavigate('/privacy')}>
            Privacy Policy
          </span>
          <span className={s.link} onClick={() => customNavigate('/terms')}>
            Terms of Use
          </span>
          <a href='mailto:admin@iq-check140.com' className={s.link}>
            Contact Us
          </a>
        </div>
        <div className={s.copyright}>
          Copyright © |{' '}
          <span onClick={() => customNavigate('/home')}>IQMaze 2024</span> | All
          rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;

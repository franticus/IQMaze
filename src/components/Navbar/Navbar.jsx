import React, { useEffect, useState } from 'react';
import s from './Navbar.module.scss';
import cn from 'classnames';
import logo from '../../img/iq_logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pageLinks = [
    'Home',
    'IQTest',
    'About',
    'Privacy Policy',
    'Terms of Use',
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 730) {
        setIsOpen(false);
        document.body.style.overflow = 'visible';
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return (
    <div className={isOpen ? s.menu_open : ''}>
      <header className={s.header}>
        <div className={s.header__container}>
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
          <div className={cn(s.header__menu, s.menu)}>
            <button
              type='button'
              className={cn(s.menu__icon, s.icon_menu)}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span></span>
            </button>
            <nav className={s.menu__body}>
              <ul className={s.menu__list}>
                {pageLinks.map(link => (
                  <li
                    onClick={() => {
                      setIsOpen(false);
                      const route = link.split(' ')[0].toLowerCase();
                      navigate(`/${route}`);
                    }}
                    className={cn(s.menu__item, s.menu__link)}
                    key={link}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

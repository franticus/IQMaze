import React, { useState } from 'react';
import s from './Navbar.module.scss';
import cn from 'classnames';
import logo from '../../img/iq_logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pageLinks = ['Home', 'About', 'IQTest'];

  return (
    <div className={isOpen ? s.menu_open : ''}>
      <header class={s.header}>
        <div class={s.header__container}>
          <div class={s.logo}>
            <img className={s.mainLogo} src={logo} alt='' />
            <a href='index.html' class={s.logo}>
              IQMaze
            </a>
          </div>
          <div class={cn(s.header__menu, s.menu)}>
            <button
              type='button'
              class={cn(s.menu__icon, s.icon_menu)}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span></span>
            </button>
            <nav class={s.menu__body}>
              <ul class={s.menu__list}>
                {pageLinks.map(link => (
                  <li class={s.menu__item}>
                    <a href='index.html' class={s.menu__link}>
                      {link}
                    </a>
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

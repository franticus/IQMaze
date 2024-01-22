import React, { useState } from 'react';
import s from './Navbar.module.scss';
import cn from 'classnames';
import logo from '../img/iq_logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={s.navbar}>
      <div className={s.logo}>
        {' '}
        <img className={s.logo_img} src={logo} alt='' />
        IQ Maze
      </div>
      <ul className={cn(s.nav_links, isOpen ? s.open : '')}>
        <li>
          <a href='/home'>Home</a>
        </li>
        <li>
          <a href='/iqtest'>IQ Maze</a>
        </li>
        <li>
          <a href='/contact'>Contact</a>
        </li>
      </ul>
      <button className={s.burger} onClick={() => setIsOpen(!isOpen)}>
        <span className={s.bar}></span>
        <span className={s.bar}></span>
        <span className={s.bar}></span>
      </button>
    </nav>
  );
};

export default Navbar;

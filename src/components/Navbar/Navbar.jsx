import React, { useEffect, useRef, useState } from 'react';
import s from './Navbar.module.scss';
import cn from 'classnames';
import logo from '../../img/iq_logo.png';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { url, urlDEV, urlLOCAL } from '../../key.js';
import { checkSubscription } from '../../helpers/stripeService';

const currentUrl = window.location.href;
const apiUrl = currentUrl.includes('iq-check140')
  ? url
  : currentUrl.includes('localhost')
  ? urlLOCAL
  : urlDEV;

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [hasSubscription, setHasSubscription] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch(`${apiUrl}/get-api-key`, {
          method: 'GET',
        });
        const { apiKey } = await response.json();
        setApiKey(apiKey);
      } catch (error) {
        console.error('Failed to fetch API key:', error);
      }
    };

    fetchApiKey();
  }, []);

  useEffect(() => {
    const verifySubscription = async () => {
      if (user) {
        const { hasSubscription } = await checkSubscription(user.email);
        setHasSubscription(hasSubscription);
      } else {
        setHasSubscription(false);
      }
    };

    verifySubscription();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      navigate('/home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleBillingPortal = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        console.error('Email not found in localStorage');
        return;
      }
      if (!apiKey) {
        console.error('API key not found');
        return;
      }
      const response = await fetch(`${apiUrl}/create-billing-portal-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ email: email.replace(/['"]+/g, '') }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error redirecting to billing portal:', error);
    }
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={isOpen ? s.menu_open : ''}>
      <header className={s.header}>
        <div className={s.header__container}>
          <div className={s.logo}>
            <img className={s.mainLogo} src={logo} alt='' />
            <span className={s.logo} onClick={() => navigate('/home')}>
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
                {['Home', 'IQTest'].map(link => (
                  <li
                    onClick={() => {
                      setIsOpen(false);
                      navigate(`/${link.toLowerCase()}`);
                    }}
                    className={cn(s.menu__item, s.menu__link)}
                    key={link}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </nav>
            {user && (
              <div
                className={s.userStatus}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                ref={dropdownRef}
              >
                <span className={s.userName}>
                  {user.displayName || user.email}
                </span>
                <span className={s.onlineIndicator}></span>
                {isDropdownOpen && (
                  <div className={s.dropdownMenu}>
                    {hasSubscription && (
                      <button
                        onClick={handleBillingPortal}
                        className={s.dropdownItem}
                      >
                        Manage Subscription
                      </button>
                    )}
                    <button
                      onClick={handleSignOut}
                      className={cn(s.dropdownItem, s.dropdownItem_red)}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;

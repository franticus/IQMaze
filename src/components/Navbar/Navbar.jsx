import React, { useEffect, useRef, useState } from 'react';
import s from './Navbar.module.scss';
import cn from 'classnames';
import logo from '../../img/iq_logo.png';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { createBillingPortalSession } from '../../helpers/stripeHelpers';
import Modal from '../../components/Modal/Modal';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useSubscription } from '../../context/SubscriptionContext';

const Navbar = ({ user }) => {
  const customNavigate = useCustomNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dropdownRef = useRef(null);
  const hasSubscription = useSubscription();
  const isSpecificRoute = routes =>
    routes.some(route =>
      new RegExp(`^${route}$`).test(window.location.pathname)
    );
  const isHome = isSpecificRoute(['/', '/home']);
  const isPaywall = isSpecificRoute(['/paywall']);
  const isThanks = isSpecificRoute(['/thanks']);
  const isShow = isHome || isPaywall || isThanks;

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      customNavigate('/home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleBillingPortal = async () => {
    try {
      const email = user.email;
      if (!email) {
        console.error('Email not found');
        return;
      }
      const billingPortalUrl = await createBillingPortalSession(email);
      window.location.href = billingPortalUrl;
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

  const switchToSignUp = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className={isOpen ? s.menu_open : ''}>
      <header className={s.header}>
        <div className={s.header__container}>
          <div className={s.logo}>
            <img
              className={s.mainLogo}
              src={logo}
              alt=''
              width='32px'
              height='32px'
            />
            <span className={s.logo} onClick={() => customNavigate('/home')}>
              IQMaze
            </span>
          </div>
          {isShow && (
            <div className={cn(s.header__menu, s.menu)}>
              <button
                name='menu'
                aria-label='Toggle menu'
                type='button'
                className={cn(s.menu__icon, s.icon_menu)}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
                <span className={s.srOnly}>Toggle menu</span>
              </button>
              <nav className={s.menu__body}>
                <ul className={s.menu__list}>
                  <li
                    onClick={() => {
                      setIsOpen(false);
                      customNavigate(`/home`);
                    }}
                    className={cn(s.menu__item, s.menu__link)}
                  >
                    Home
                  </li>
                  <li
                    onClick={() => {
                      setIsOpen(false);
                      customNavigate(`/iqtest`);
                    }}
                    className={cn(s.menu__item, s.menu__link)}
                  >
                    IQ Test
                  </li>
                </ul>
              </nav>
              {user ? (
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
                        <>
                          <button
                            onClick={handleBillingPortal}
                            className={s.dropdownItem}
                          >
                            Manage Subscription
                          </button>
                        </>
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
              ) : (
                <button
                  className={s.loginButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  Log In
                </button>
              )}
            </div>
          )}
        </div>
      </header>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {isLogin ? (
            <LoginForm
              switchToSignUp={switchToSignUp}
              onSuccess={() => setIsModalOpen(false)}
            />
          ) : (
            <SignUpForm
              switchToLogin={switchToLogin}
              onSuccess={() => setIsModalOpen(false)}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default Navbar;

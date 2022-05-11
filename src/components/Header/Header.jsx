import React, {
  useCallback, useEffect, useState,
} from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Link from 'next/link';
import HeaderLogo from '../../assets/svg/header-logo.svg';
import PhoneIcon from '../../assets/svg/phone.svg';
import Nav from '../Nav/Nav';
import InstagramIcon from '../../assets/svg/social/instagram-logo.svg';
import WhatsappIcon from '../../assets/svg/social/whatsapp-logo.svg';
import TelegramIcon from '../../assets/svg/social/telegram-logo.svg';
import useYMetrika from '../../utils/hooks/useYMetrika';
import useGTag from '../../utils/hooks/useGTag';
import useFbPixel from '../../utils/hooks/useFbPixel';

const Header = function ({ windowWidth, orderCallClick }) {
  const [clientWindowHeight, setClientWindowHeight] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [height, setHeight] = useState(100);
  const ym = useYMetrika();
  const gtag = useGTag();
  const fbq = useFbPixel();

  const handleTelegramClick = useCallback(() => {
    ym('reachGoal', 'TELEGRAM_CLICKED');
    gtag('event', 'TELEGRAM_CLICKED');
    fbq('track', 'TELEGRAM_CLICKED');
  }, []);

  const handleWhatsappClick = useCallback(() => {
    ym('reachGoal', 'WHATSAPP_CLICKED');
    gtag('event', 'WHATSAPP_CLICKED');
    fbq('track', 'WHATSAPP_CLICKED');
  }, []);

  const handlePhoneClick = useCallback(() => {
    ym('reachGoal', 'TEL_CLICKED');
    gtag('event', 'TEL_CLICKED');
    fbq('track', 'TEL_CLICKED');
  }, []);

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  const handleBurgerClick = useCallback(() => setMenuOpened(!menuOpened), [menuOpened]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    if (clientWindowHeight > 100) {
      setHeight(70);
    } else {
      setHeight(100);
    }
  }, [clientWindowHeight]);

  return (
    <header
      className="header"
      style={{
        height: `${windowWidth > 1279 ? height : (windowWidth > 390 ? 80 : 60)}px`,
      }}
    >
      {(windowWidth > 1279) ? (
        <div className="header-wrapper">
          <div className="container">
            <Link passHref href="/">
              <a>
                <HeaderLogo className="header-logo" />
              </a>
            </Link>
          </div>
          <Nav
            setMenuOpened={setMenuOpened}
            handleTelegramClick={handleTelegramClick}
            handleWhatsappClick={handleWhatsappClick}
            handlePhoneClick={handlePhoneClick}
          />
          <div className="header-contacts">
            <a onClick={handlePhoneClick} href="tel:79160791214" className="phone-number">+7 916 079-12-14</a>
            <button onClick={orderCallClick} type="button" className="header-button">Заказать звонок</button>
          </div>
        </div>
      ) : (
        <>
          <div className="mobile-header" />
          <div className="header-wrapper">
            <Link passHref href="/">
              <a>
                <div className="header-logo">
                  <HeaderLogo />
                </div>
              </a>
            </Link>
            <div className="mobile-icons">
              <div className={classnames('phone-icon', { invisible: menuOpened })}>
                <a onClick={handlePhoneClick} href="tel:79160791214">
                  <PhoneIcon />
                </a>
              </div>
              <div
                className={classnames('header-burger-menu', { open: menuOpened })}
                onClick={handleBurgerClick}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <CSSTransition
            classNames="mobile-nav"
            in={menuOpened}
            timeout={600}
            mountOnEnter
            unmountOnExit
          >
            <div className="mobile-nav">
              <div className="container">
                <div className="nav-container">
                  <Nav
                    mobile
                    setMenuOpened={setMenuOpened}
                    handleTelegramClick={handleTelegramClick}
                    handleWhatsappClick={handleWhatsappClick}
                    handlePhoneClick={handlePhoneClick}
                  />
                </div>
                <div className="contacts-container">
                  <div className="header-contacts">
                    <a onClick={handlePhoneClick} href="tel:79160791214" className="phone-number">+7 916 079-12-14</a>
                    <button onClick={orderCallClick} type="button" className="header-button">Заказать звонок</button>
                  </div>
                  <div className="social-links">
                    <Link passHref href="https://www.instagram.com/z_hockey_/" target="_blank">
                      <div className="social-links-item"><InstagramIcon /></div>
                    </Link>
                    <Link passHref href="https://wa.me/79160791214">
                      <div onClick={handleWhatsappClick} className="social-links-item"><WhatsappIcon /></div>
                    </Link>
                    <Link passHref href="https://t.me/GHA_hockey">
                      <div onClick={handleTelegramClick} className="social-links-item"><TelegramIcon /></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
          <div className={classnames('backdrop', { active: menuOpened })} />
        </>
      )}
    </header>
  );
};

export default Header;

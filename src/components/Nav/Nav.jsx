import React from 'react';
import Link from 'next/link';
import { NAVLINKS } from '../../constants/navLinks';
import InstagramIcon from '../../assets/svg/social/instagram-logo.svg';
import WhatsappIcon from '../../assets/svg/social/whatsapp-logo.svg';
import TelegramIcon from '../../assets/svg/social/telegram-logo.svg';

const Nav = function ({ mobile, setMenuOpened, handleTelegramClick, handleWhatsappClick, handlePhoneClick }) {
  const handleCloseClick = () => {
    setMenuOpened(false);
  };

  return (
    <>
      <nav className="navigation">
        {NAVLINKS.map((link) => (
          <Link href={`/${link.path}`} key={link.title}>
            <a onClick={handleCloseClick} className="nav-link">{link.title}</a>
          </Link>
        ))}
      </nav>
      {!mobile && (
      <div className="social-links">
        <Link passHref href="https://www.instagram.com/gha_hockey/" target="_blank">
          <div className="social-links-item"><InstagramIcon /></div>
        </Link>
        <Link passHref href="https://wa.me/79160791214">
          <div onClick={handleWhatsappClick} className="social-links-item"><WhatsappIcon /></div>
        </Link>
        <Link passHref href="https://t.me/GHA_hockey">
          <div onClick={handleTelegramClick} className="social-links-item"><TelegramIcon /></div>
        </Link>
      </div>
      )}
    </>
  );
};

export default Nav;

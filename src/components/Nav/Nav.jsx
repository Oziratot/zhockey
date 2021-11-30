import React from 'react';
import Link from "next/link";
import { NAVLINKS } from "../../constants/navLinks";
import InstagramIcon from '../../assets/svg/social/instagram-logo.svg';
import WhatsappIcon from '../../assets/svg/social/whatsapp-logo.svg';
import TelegramIcon from '../../assets/svg/social/telegram-logo.svg';


function Nav() {
    return (
        <>
            <nav className="navigation">
                {NAVLINKS.map((link) => (
                    <Link href={`/${link.path}`} key={link.title}>
                        <a className="nav-link">{link.title}</a>
                    </Link>
                ))}
            </nav>
            <div className="social-links">
                <div className="social-links-item"><InstagramIcon /></div>
                <div className="social-links-item"><WhatsappIcon /></div>
                <div className="social-links-item"><TelegramIcon /></div>
            </div>
        </>
    );
}

export default Nav;

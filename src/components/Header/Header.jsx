import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HeaderLogo from '../../assets/svg/header-logo.svg';
import PhoneIcon from "../../assets/svg/phone.svg";

import Nav from "../Nav/Nav";
import classnames from "classnames";
import { CSSTransition } from "react-transition-group";
import InstagramIcon from "../../assets/svg/social/instagram-logo.svg";
import WhatsappIcon from "../../assets/svg/social/whatsapp-logo.svg";
import TelegramIcon from "../../assets/svg/social/telegram-logo.svg";

function Header({ windowWidth }) {

    const [clientWindowHeight, setClientWindowHeight] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false);
    const [height, setHeight] = useState(100);


    const handleScroll = () => {
        setClientWindowHeight(window.scrollY);
    };

    const handleBurgerClick = useCallback(() => setMenuOpened(!menuOpened), [menuOpened]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    useEffect(() => {
        if (clientWindowHeight <= 90)
        setHeight(100 - clientWindowHeight / 3)
    }, [clientWindowHeight]);

    return (
        <header
            className="header"
            style={{
                height: `${windowWidth >= 1024 ? height : 80}px`,
        }}>
            {(windowWidth >= 1024) ? (<div className="header-wrapper">
                <div className="header-logo">
                    <HeaderLogo/>
                </div>
                <Nav/>
                <div className="header-contacts">
                    <p className="phone-number">+7 916 079-12-14</p>
                    <button type="button" className="header-button">Заказать звонок</button>
                </div>
            </div>) : (
                <>
                    <div className="header-wrapper">
                        <div className="header-logo">
                            <HeaderLogo />
                        </div>
                        <div className="mobile-icons">ч
                            <div className={classnames('phone-icon', { invisible: menuOpened })}>
                                <PhoneIcon />
                            </div>
                            <div
                                className={classnames('header-burger-menu', { open: menuOpened})}
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
                                    <Nav mobile />
                                </div>
                                <div className="contacts-container">
                                    <div className="header-contacts">
                                        <p className="phone-number">+7 916 079-12-14</p>
                                        <button type="button" className="header-button">Заказать звонок</button>
                                    </div>
                                    <div className="social-links">
                                        <div className="social-links-item"><InstagramIcon /></div>
                                        <div className="social-links-item"><WhatsappIcon /></div>
                                        <div className="social-links-item"><TelegramIcon /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                </>

            )}
        </header>
    )
}

export default Header;

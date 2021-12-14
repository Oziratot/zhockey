import React, { useEffect, useMemo, useState } from 'react';
import HeaderLogo from '../../assets/svg/header-logo.svg';
import Nav from "../Nav/Nav";

function Header() {

    const [clientWindowHeight, setClientWindowHeight] = useState(false);
    const [height, setHeight] = useState(100);

    const handleScroll = () => {
        setClientWindowHeight(window.scrollY);
    };

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
                height: `${height}px`,
        }}>
            <div className="header-wrapper">
                <div className="header-logo">
                    <HeaderLogo />
                </div>
                <Nav />
                <div className="header-contacts">
                    <p className="phone-number">+7 916 079-12-14</p>
                    <button type="button" className="header-button">Заказать звонок</button>
                </div>
            </div>
        </header>
    )
}

export default Header;

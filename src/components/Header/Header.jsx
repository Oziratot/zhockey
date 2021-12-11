import React from 'react';
import HeaderLogo from '../../assets/svg/header-logo.svg';
import Nav from "../Nav/Nav";

function Header({props}) {
    return (
        <header className="header">
            <div className="header-wrapper">
                <HeaderLogo />
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

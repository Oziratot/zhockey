import React from 'react';

function BookBar({ text, buttonText }) {
    return (
        <div className="bookbar">
            <p className="bookbar-text">{text}</p>
            <button className="bookbar-button" type="button">{buttonText}</button>
        </div>
    )
}

export default BookBar;

import React from 'react';

function BookBar({ text, buttonText }) {
    return (
        <div className="bookbar">
          <div className="bookbar-container">
              <p className="bookbar-text">{text}</p>
              <button className="bookbar-button" type="button">{buttonText}</button>
          </div>
        </div>
    )
}

export default BookBar;

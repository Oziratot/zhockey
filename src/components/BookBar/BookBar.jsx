import React from 'react';
import Button from '../Button/Button';

const BookBar = function ({ text, buttonText, orderCallClick }) {
  return (
    <div className="bookbar">
      <div className="bookbar-container">
        <div className="bookbar-text" dangerouslySetInnerHTML={{ __html: text }} />
        <Button color="white" onClick={orderCallClick} type="button">{buttonText}</Button>
      </div>
    </div>
  );
};

export default BookBar;

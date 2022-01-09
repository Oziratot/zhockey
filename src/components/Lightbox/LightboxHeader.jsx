import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../../assets/svg/lightbox-close.svg';

const LightboxHeader = ({ albumTitle, images, currentIndex, onClose }) => (
  <div className="lightbox-top-header-bar">
    <div className="left-container">
      <div className="page-indicator">
        <span>{currentIndex + 1}</span>
        <span className="slash" />
        <span>{images.length}</span>
      </div>
    </div>

    <div className="center-container">
      {albumTitle && <div className="album-title">{albumTitle}</div>}
      {/*<div className="image-title">{images[currentIndex].alt}</div>*/}
    </div>

    <div className="right-container">
      <button className="close-button" type="button" onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  </div>
);

LightboxHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  albumTitle: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default LightboxHeader;

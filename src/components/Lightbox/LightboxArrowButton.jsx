import React from 'react';
import PropTypes from 'prop-types';
import ArrowLeftIcon from '../../assets/svg/lightbox-arrow-left.svg';
import ArrowRightIcon from '../../assets/svg/lightbox-arrow-right.svg';

const LightboxArrowButton = ({ position, onClick, disabled }) => {

  return (
        <div>
          <button className={`lightbox-arrow lightbox-arrow-${position}`} type="button" onClick={onClick}>
            {position === "left" && <ArrowLeftIcon />}
            {position === "right" && <ArrowRightIcon />}
          </button>
        </div>
      )
};

LightboxArrowButton.propTypes = {
  position: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

LightboxArrowButton.defaultProps = {
  disabled: false
};

export default LightboxArrowButton;

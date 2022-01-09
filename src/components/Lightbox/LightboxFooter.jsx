import React from 'react';
import PropTypes from 'prop-types';

const LightboxFooter = ({ images, currentIndex }) => (
  <div className="lightbox-footer">
    {/*{images[currentIndex].alt}*/}
  </div>
);

LightboxFooter.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  ).isRequired,
};

export default LightboxFooter;

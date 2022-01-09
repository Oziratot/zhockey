import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-spring-lightbox';
import LightboxArrowButton from './LightboxArrowButton';
import LightboxFooter from './LightboxFooter';
import LightboxHeader from './LightboxHeader';

/**
 * Double click + pinch to zoom
 * Keyboard Left/Right + swipe to page
 * Keyboard Esc to close
 *
 * @see https://github.com/tim-soft/react-spring-lightbox
 * @see https://timellenberger.com
 */
const CustomLightbox = ({
  images,
  albumTitle,
  currentImageIndex,
  setCurrentIndex,
  isOpen,
  withCaptions,
  onClose,
}) => {
  const gotoPrevious = () => currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () => currentImageIndex + 1 < images.length &&
    setCurrentIndex(currentImageIndex + 1);

  return (
    <Lightbox
      className="lightbox"
      isOpen={isOpen}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      onClose={onClose}
      images={images}
      currentIndex={currentImageIndex}
      singleClickToZoom
      pageTransitionConfig={{
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { mass: 1, tension: 320, friction: 32 },
      }}
      renderHeader={() => (
        <LightboxHeader
          albumTitle={albumTitle}
          images={images}
          currentIndex={currentImageIndex}
          onClose={onClose}
        />
      )}
      renderPrevButton={({ canPrev }) => (
        <LightboxArrowButton
          position="left"
          onClick={gotoPrevious}
          disabled={!canPrev}
        />
      )}
      renderNextButton={({ canNext }) => (
        <LightboxArrowButton position="right" onClick={gotoNext} disabled={!canNext} />
      )}
      // renderImageOverlay={() => <ImageOverlay />}
      renderFooter={() => <LightboxFooter images={images} currentIndex={currentImageIndex} />}
    />
  );
};

CustomLightbox.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  ),
  currentImageIndex: PropTypes.number.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomLightbox;

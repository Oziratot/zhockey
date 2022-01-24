import React, { useCallback, useRef, useState } from 'react';
import Slider from 'react-slick';
import { REVIEWS } from '../../constants/reviews';
import NextIcon from '../../assets/svg/slider-arrow-right.svg';
import PrevIcon from '../../assets/svg/slider-arrow-left.svg';
import CustomLightbox from '../Lightbox';

const items = REVIEWS.map((item) => ({
  src: item.src,
  alt: item.photo,
}));

// const NextArrow = function (props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       onClick={onClick}
//     >
//       <NextIcon />
//     </div>
//   );
// };
//
// const PrevArrow = function (props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       onClick={onClick}
//     >
//       <PrevIcon />
//     </div>
//   );
// };

const settings = {
  className: 'reviews-slider',
  centerMode: true,
  infinite: true,
  adaptiveHeight: true,
  slidesToShow: 3,
  speed: 500,
  centerPadding: '0px',
  initialSlide: 4,
  lazyLoad: 'ondemand',
  // nextArrow: <NextArrow />,
  // prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        lazyLoad: 'ondemand',
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        lazyLoad: 'ondemand',
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
      },
    },
  ],
};

const ReviewsSwiper = function () {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentIndex] = useState(0);
  const handleLightboxClose = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const swipeRef = useRef({
    startTime: 0, startX: 0, startY: 0, newX: 0, newY: 0,
  });
  const handleSwipeEnd = useCallback((e) => {
    const {
      newX, startX, newY, startY,
    } = swipeRef.current;
    const deltaX = newX - startX;
    const deltaY = newY - startY;
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      const { index } = e.currentTarget.dataset;
      setCurrentIndex(index * 1);
      setIsLightboxOpen(true);
    }
  }, []);
  const handleMouseDown = useCallback((e) => {
    swipeRef.current.startTime = Date.now();
    swipeRef.current.startX = e.pageX;
    swipeRef.current.startY = e.pageY;
  }, []);
  const handleMouseMove = useCallback((e) => {
    swipeRef.current.newX = e.pageX;
    swipeRef.current.newY = e.pageY;
  }, []);
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length !== 1) return;
    const touch = e.changedTouches[0];
    swipeRef.current.startTime = Date.now();
    swipeRef.current.startX = touch.pageX;
    swipeRef.current.startY = touch.pageY;
  }, []);
  const handleTouchMove = useCallback((e) => {
    swipeRef.current.newX = e.changedTouches[0].pageX;
    swipeRef.current.newY = e.changedTouches[0].pageY;
  }, []);

  return (
    <div className="reviews-wrapper">
      <Slider {...settings}>
        {items.map((item, i) => (
          <div key={item.alt}>
            <img
              data-index={i}
              className="review-item"
              src={item.src}
              alt={item.alt}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleSwipeEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleSwipeEnd}
              onTouchCancel={handleSwipeEnd}
            />
          </div>
        ))}
      </Slider>
      <CustomLightbox
        albumTitle="Отзывы"
        currentImageIndex={currentImageIndex}
        setCurrentIndex={setCurrentIndex}
        isOpen={isLightboxOpen}
        onClose={handleLightboxClose}
        images={items}
        withCaptions
      />
    </div>
  );
};

export default ReviewsSwiper;

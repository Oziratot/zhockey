import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

const settings = {
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        customPaging() {
          return (
            <div className="custom-dot" />
          );
        },
        centerMode: true,
        centerPadding: '0px',
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        customPaging() {
          return (
            <div className="custom-dot" />
          );
        },
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CoachesSwiper = function ({ items, setCoach }) {
  const sliderRef = useRef(1);

  return (
    <Slider {...settings} ref={sliderRef}>
      {items.map((item) => (
        <div key={item.name} className="coach-item" onClick={() => setCoach(item)}>
          <img className="coach-photo" src={item.src} alt={item.name} />
          <p className="text-xl bold white">{item.name}</p>
          <div className="text-s white" dangerouslySetInnerHTML={{ __html: item.desc }} />
        </div>
      ))}
    </Slider>
  );
};

CoachesSwiper.propTypes = {
  clientWindowWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
};

export default CoachesSwiper;

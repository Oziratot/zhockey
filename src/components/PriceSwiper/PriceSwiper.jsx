import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import PriceTab from '../PriceTab/PriceTab';
import usePrevious from '../../utils/hooks/usePrevious';

const settings = {
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 3,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        customPaging() {
          return (
            <div className="custom-dot" />
          );
        },
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        customPaging() {
          return (
            <div className="custom-dot" />
          );
        },
        dots: true,
        slidesToShow: 2,
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

const PriceSwiper = function ({ items, orderCallClick, clientWindowWidth }) {
  const sliderRef = useRef(1);
  const prevWidth = usePrevious(clientWindowWidth);

  useEffect(() => {
    if (clientWindowWidth < 768 && prevWidth === false) {
      sliderRef.current.slickGoTo(1);
    }
  }, [clientWindowWidth]);

  return (
    <Slider {...settings} ref={sliderRef}>
      {items.map((item) => (
        <PriceTab
          key={item}
          type={item.type}
          days={item.days}
          items={item.items}
          price={item.price}
          orderCallClick={orderCallClick}
        />
      ))}
    </Slider>
  );
};

PriceSwiper.propTypes = {
  orderCallClick: PropTypes.func.isRequired,
  clientWindowWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
};

export default PriceSwiper;

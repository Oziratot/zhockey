import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { PRICE } from '../../constants/price';
import PriceTab from '../PriceTab/PriceTab';
import NextIcon from '../../assets/svg/slider-arrow-right.svg';
import PrevIcon from '../../assets/svg/slider-arrow-left.svg';
import PropTypes from 'prop-types';
import usePrevious from '../../utils/hooks/usePrevious';

const NextArrow = function (props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <NextIcon />
    </div>
  );
};

const PrevArrow = function (props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <PrevIcon />
    </div>
  );
};

const settings = {
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
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
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      },
    },
  ],
};

const PriceSwiper = function ({ orderCallClick, clientWindowWidth }) {
  const sliderRef = useRef(1);
  const prevWidth = usePrevious(clientWindowWidth);

  useEffect(() => {
    if (clientWindowWidth < 768 && prevWidth === false) {
      sliderRef.current.slickGoTo(1);
    }
  }, [clientWindowWidth]);

  return (
    <Slider {...settings} ref={sliderRef}>
      {PRICE.map((item) => (
        <PriceTab
          orderCallClick={orderCallClick}
          key={item.price}
          type={item.type}
          format={item.format}
          duration={item.duration}
          list={item.items}
          price={item.price}
          note={item.note}
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

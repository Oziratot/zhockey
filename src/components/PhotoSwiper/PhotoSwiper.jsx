import React from 'react';
import Slider from "react-slick";
import { PHOTOS } from "../../constants/photos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextIcon from "../../assets/svg/slider-arrow-right.svg";
import PrevIcon from "../../assets/svg/slider-arrow-left.svg";

const settings = {
    className: "photo-slider",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "300px",
            }
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "220px",
            }
        },
        {
            breakpoint: 768,
            settings: {
                customPaging: function () {
                    return (
                        <div className="custom-dot" />
                    )
                },
                dots: true,
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "150px",
            }
        },
        {
            breakpoint: 624,
            settings: {
                customPaging: function () {
                    return (
                        <div className="custom-dot" />
                    )
                },
                dots: true,
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "100px",
            }
        },
        {
            breakpoint: 480,
            settings: {
                customPaging: function () {
                    return (
                        <div className="custom-dot" />
                    )
                },
                dots: true,
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "80px",
            }
        },
        {
            breakpoint: 320,
            settings: {
                customPaging: function () {
                    return (
                        <div className="custom-dot" />
                    )
                },
                dots: true,
                slidesToShow: 1,
                centerMode: true,
                centerPadding: "50px",
            }
        },
    ]
}

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <NextIcon />
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <PrevIcon />
        </div>
    );
}

function PhotoSwiper() {
    return (
            <Slider {...settings}>
                {PHOTOS.map((item) => (
                    <img className="photo-item" src={item.src} key={item.photo} />
                ))}
            </Slider>
    )
}

export default PhotoSwiper;

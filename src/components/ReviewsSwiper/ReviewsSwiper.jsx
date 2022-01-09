import Slider from "react-slick";
import Image from 'next/image';
import { REVIEWS } from '../../constants/reviews';
import NextIcon from "../../assets/svg/slider-arrow-right.svg";
import PrevIcon from "../../assets/svg/slider-arrow-left.svg";

const settings = {
    className: "reviews-slider",
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
                customPaging: function () {
                    return (
                        <div className="custom-dot" />
                    )
                },
                dots: true,
            }
        }
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

function ReviewsSwiper() {
    return (
        <div className="reviews-wrapper">
            <Slider {...settings}>
                <div>
                    <img className="review-item" src="/assets/img/reviews/review.jpeg" />
                </div>
                <div>
                    <img className="review-item" src="/assets/img/reviews/review.jpeg" />
                </div>
                <div>
                    <img className="review-item" src="/assets/img/reviews/review.jpeg" />
                </div>
                <div>
                    <img className="review-item" src="/assets/img/reviews/review.jpeg" />
                </div>
            </Slider>
        </div>
    )
}

export default ReviewsSwiper;

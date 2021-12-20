import Slider from "react-slick";
import { PHOTOS } from "../../constants/photos";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import NextIcon from "../../assets/svg/slider-arrow-right.svg";
import PrevIcon from "../../assets/svg/slider-arrow-left.svg";

const settings = {
    className: "reviews-slider",
    centerMode: true,
    // infinite: true,
    slidesToShow: 3,
    speed: 500,
    centerPadding: '0px',
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
}

function ReviewsSwiper() {
    return (
        <div className="reviews-wrapper">
            <Slider {...settings}>
                <div>
                    <img src="/assets/img/reviews/review.jpeg" />
                </div>
                <div>
                    <img src="/assets/img/reviews/review.jpeg" />
                </div>
                <div>
                    <img src="/assets/img/reviews/review.jpeg" />
                </div>
                <div>
                    <img src="/assets/img/reviews/review.jpeg" />
                </div>
            </Slider>
        </div>
    )
}

export default ReviewsSwiper;

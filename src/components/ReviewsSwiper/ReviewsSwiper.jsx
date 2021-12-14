import Slider from "react-slick";
import { REVIEWS } from "../../constants/reviews";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextIcon from "../../assets/svg/slider-arrow-right.svg";
import PrevIcon from "../../assets/svg/slider-arrow-left.svg";
// import Img1 from "assets/img/reviews/review.jpeg";

const settings = {
    className: "reviews-slider",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    // centerPadding: "60px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
            <div>
                <img src="/assets/img/reviews/review.jpeg" />
            </div>
            <div>
                <img src="/assets/img/reviews/review.jpeg" />
            </div>
        </Slider>
    )
}

export default ReviewsSwiper;

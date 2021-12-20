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
                    <img src={item.src} key={item.photo} />
                ))}
            </Slider>
    )
}

export default PhotoSwiper;

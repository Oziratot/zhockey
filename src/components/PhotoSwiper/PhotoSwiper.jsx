import Slider from "react-slick";
import { PHOTOS } from "../../constants/photos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    className: "photo-slider",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    centerPadding: "60px",
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

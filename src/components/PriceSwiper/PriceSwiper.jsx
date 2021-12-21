import Slider from "react-slick";
import { PRICE } from "../../constants/price";
import PriceTab from "../PriceTab/PriceTab";

const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
};

function PriceSwiper() {
    return (
        <Slider {...settings}>
            {PRICE.map((item) => (
                <PriceTab
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
    )
}

export default PriceSwiper;

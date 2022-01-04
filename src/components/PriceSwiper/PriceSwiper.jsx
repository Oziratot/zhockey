import Slider from "react-slick";
import { PRICE } from "../../constants/price";
import PriceTab from "../PriceTab/PriceTab";
import NextIcon from "../../assets/svg/slider-arrow-right.svg";
import PrevIcon from "../../assets/svg/slider-arrow-left.svg";

const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1440,
            settings: {
                customPaging: function () {
                    return (
                        <div className="custom-dot" />
                    )
                },
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                customPaging: function () {
                    return (
                        <div className="custom-dot" />
                    )
                },
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />,
            }
        },
        {
            breakpoint: 767,
            settings: {
                customPaging: function () {
                    return (
                        <div className="custom-dot" />
                    )
                },
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />,
            }
        }
    ]
};

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

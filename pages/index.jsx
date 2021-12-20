import Head from 'next/head';
import Link from "next/link";
import Image from 'next/image'
import Header from "../src/components/Header/Header";
import classnames from 'classnames';
import { ADVANTAGES } from "../src/constants/advantages";
import { METHODOLOGY } from "../src/constants/methodology";
import { DIRECTIONS } from "../src/constants/directions";
import { PRICE } from "../src/constants/price";
import { FAQ } from "../src/constants/faq";
import MarkerIcon from '../src/assets/svg/marker.svg'
import CheckIcon from "../src/assets/svg/check.svg"
import ArrowIcon from '../src/assets/svg/arrow.svg';
import ScheduleImage from '../src/assets/images/schedule.jpeg';
import FirstPromotionImage from '../src/assets/images/promotion-1.png';
import SecondPromotionImage from '../src/assets/images/promotion-2.png';
import BookBar from "../src/components/BookBar/BookBar";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import PriceTab from "../src/components/PriceTab/PriceTab";
import PhotoSwiper from "../src/components/PhotoSwiper/PhotoSwiper";
import InstagramIcon from '../src/assets/svg/social/instagram-logo.svg';
import WhatsappIcon from '../src/assets/svg/social/whatsapp-logo.svg';
import TelegramIcon from '../src/assets/svg/social/telegram-logo.svg';
import useContactsMap from "../src/utils/hooks/useContactsMap";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import MapModal from "../src/components/MapModal";
import ReviewsSwiper from "../src/components/ReviewsSwiper/ReviewsSwiper";
import Modal from "../src/components/Modal";
import OrderCallFrom from "../src/components/OrderCallForm/OrederCallFrom";
import YouTube from "react-youtube";

const ModalPortal = ({ children }) => {
    if (!process.browser) return null;
    return createPortal(children, window.document.body);
};

const TEAMS = [
    "Балтика Вильнюс МХЛ Б, Россия",
    "Alliston Coyotes GMHL, Канада",
    "Orangeville Ice Crushers GMHL, Канада",
    "Colborne Chiefs GMHL, Канада",
];

export default function Home() {
    const [activeDirectionsItems, setActiveDirectionsItems] = useState({ 0: true });
    const [activeFaqItem, setActiveFaqItem] = useState({ 0: true });
    const [modalActive, setModalActive] = useState(false);
    const [orderCallModalActive, setlOrderCallModalActive] = useState(false);
    const [clientWindowWidth, setClientWindowWidth] = useState(false);
    const handleMapModalOpen = useCallback(() => setModalActive(true), []);
    const handleModalClose = useCallback(() => setlOrderCallModalActive(false), []);
    const handleOrderCallClick = useCallback(() => setlOrderCallModalActive(true), []);
    const mapRef = useRef();
    useContactsMap(mapRef, true);

    const handleWidthChange = () => {
        setClientWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setClientWindowWidth(window.innerWidth);
        }
    },[]);

    useEffect(() => {
        window.addEventListener("resize", handleWidthChange);
        return () => window.removeEventListener("resize", handleWidthChange);
    });

    return (
    <>
        <Header windowWidth={clientWindowWidth}/>
        <main>
            <section className="section section-main">
                <div className="section-wrapper main-wrapper">
                    <div className="address-wrapper">
                        <MarkerIcon className="marker-icon" />
                        <span className="map-link" onClick={handleMapModalOpen}>Москва, ЛД «Морозово», ул. Новоостаповская д5с2</span>
                    </div>
                    <h1 className="h1 main-title">Групповые тренировки<br />по хоккею для детей<br />от 9 лет</h1>
                    <p className="main-text">Запишитесь на первую тренировку со скидкой 50%</p>
                    <button onClick={handleOrderCallClick} className="button-orange main-button">Получить консультацию</button>
                </div>
            </section>

            <section className="section section-advantages" id="about">
                <div className="section-wrapper">
                    <h2  className="section-title advantages-title">Преимущества тренировок в Z-hockey</h2>
                    <div className="advantages-wrapper">
                        <div className="advantages">
                            {ADVANTAGES.map((item) => (
                                <div key={item} className="advantages-item">
                                    <CheckIcon className="advantages-icon" />
                                    <p className="advantages-text">{item}</p>
                                </div>
                            ))}
                        </div>
                        <YouTube className="advantages-video" videoId="IWTvgZVWeB4" opts={{ }} />
                    </div>
                </div>
            </section>

            <section className="section section-methodology">
                <div className="section-wrapper">
                    <div className="methodology-wrap">
                        <img className="methodology-image" src="/assets/img/methodology-height.jpeg" />
                        <div className="methodology-wrapper">
                            <h2 className="section-title methodology-title">О методике</h2>
                            <p className="methodology-text">Меня зовут Егор Гришатов — я хоккейный тренер и агент, работаю с лигами США, Канады и Европы.</p>
                            <p className="methodology-text">Моя авторская методика основана на актуальных требованиях современного хоккея — упор на игровые упражнения и комплексное развитие навыков как для защитников, так и для нападающих.</p>
                            <ul className="methodology-list">
                                {METHODOLOGY.map((item) => (
                                    <li className="methodology-item" key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <BookBar text="Запишитесь на первую тренировку со скидкой 50%" buttonText="Записаться" />

            <section className="section section-directions">
                <div className="section-wrapper">
                    <div className="directions-wrapper">
                        <h2 className="section-title directions-title">Направленность тренировок</h2>
                        <ul className="directions-list">
                            {DIRECTIONS.map(({ direction, items }, i) => (
                                <li
                                    key={direction}
                                    className={classnames('directions-list-item', { _active: activeDirectionsItems[i] })}
                                    onClick={() => setActiveDirectionsItems(prevState => ({ [i]: prevState }))}
                                >
                                    <div className="direction-wrap">
                                        <div className="directions-direction" dangerouslySetInnerHTML={{ __html: direction }} />
                                        <ArrowIcon className="directions-icon" />
                                    </div>

                                        <ul className="directions-item">
                                            {items.map((item) => (
                                                <li className={classnames('direction-item', { _active: activeDirectionsItems[i] })} key={item} >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section section-coach">
                <div className="section-wrapper coach-wrapper">
                    <div className="coach-text">
                        <h2 className="section-title coach-title">О тренере</h2>
                        <p className="coach-paragraph coach-paragraph-bold">Гришатов Егор Александрович</p>
                        <p className="coach-paragraph">Тренерский стаж с 2016 года</p>
                        <p className="coach-paragraph">Высшее педагогическое образование РГСУ, специальность «Физическая культура и спорт»</p>
                        <p className="coach-paragraph">Выступал за команды:</p>
                        <ul className="coach-teams">
                            {TEAMS.map((team) => (
                                <li key={team} className="coach-team">{team}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="image-wrapper">
                        <img className="coach-image" src="/assets/img/coach.jpeg" />
                    </div>
                </div>
            </section>

            <BookBar text="Получить консультацию тренера" buttonText="Получить" />

            <section className="section section-schedule" id="schedule">
                <div className="section-wrapper">
                    <h2 className="section-title schedule-title">Расписание</h2>
                    <div className="schedule-wrapper">
                        <div className="schedule-image-container">
                            <img className="schedule-image" src="/assets/img/schedule.jpeg" alt="hockey field" />
                        </div>
                        <div className="schedule-text">
                            <p className="schedule-paragraph">Тренировки проходят по адресу г. Москва, ул. Новоостаповская д5с2, ЛД «Морозово», каждую субботу и воскресенье</p>
                            <div className="schedule-table">
                                <div className="table-column highlighted">
                                    <p className="table-header">День недели</p>
                                    <p className="table-header">Суббота</p>
                                    <p className="table-header">Воскресенье</p>
                                </div>
                                <div className="table-column centered">
                                    <p className="table-header">Земля</p>
                                    <p className="table-text">18:15–19:15</p>
                                    <p className="table-text">17:30–18:30</p>
                                </div>
                                <div className="table-column centered">
                                    <p className="table-header">Лёд</p>
                                    <p className="table-text">19:30–21:00</p>
                                    <p className="table-text">18:45–20:15</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-reviews" id="reviews">
                <h2 className="reviews-title">Отзывы</h2>
                <ReviewsSwiper />
            </section>

            <section className="section section-price">
                    <h2 className="section-title price-title">Стоимость</h2>
                    <div className="price-wrapper">
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
                    </div>
            </section>

            <section className="section section-promotion">
                <div className="section-wrapper promotion-wrapper">
                    <div className="promotion-pics">
                        <Image src={FirstPromotionImage} />
                        <Image src={SecondPromotionImage} />
                    </div>
                    <div className="promotion-text">
                        <h2 className="section-title promotion-title">Акция</h2>
                        <p className="promotion-paragraph">Получи в подарок майку и гамаши при покупке абонемента на 8 тренировок</p>
                        <button className="button-orange promotion-button">Получить</button>
                    </div>
                </div>
            </section>

            <section className="section section-faq">
                <div className="section-wrapper">
                    <div className="faq-wrapper">
                        <h2 className="section-title faq-title">FAQ</h2>
                        <ul className="faq-list">
                            {FAQ.map(({ question, answer }, i) => (
                                <li
                                    key={question}
                                    className={classnames('faq-list-item', { _opened: activeFaqItem[i] })}
                                    onClick={() => setActiveFaqItem(prevState => ({ [i]: prevState }))}
                                >
                                    <div className="question-wrapper">
                                        <div className="faq-question" dangerouslySetInnerHTML={{ __html: question }} />
                                        <ArrowIcon className="faq-icon"/>
                                    </div>
                                    <div className="faq-answer">
                                        <div className="faq-answer-content">
                                            {answer}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section section-photo">
                <h2 className="section-title photo-title">Фотогалерея</h2>
                <PhotoSwiper />
            </section>

            <section className="section section-contacts" id="contacts">
                <div className="section-wrapper contacts-wrapper">
                    <div className="contacts-content">
                        <h2 className="section-title contacts-title">Контакты</h2>
                        <p className="contacts-text">Свяжитесь с нами</p>
                        <p className="contacts-tel">+7 916 079-12-14</p>
                        <div className="social-links">
                            <div className="social-links-item"><InstagramIcon /></div>
                            <div className="social-links-item"><WhatsappIcon /></div>
                            <div className="social-links-item"><TelegramIcon /></div>
                        </div>
                        <button className="button-orange contacts-button">Задать вопрос</button>
                        <p className="contacts-address">Москва, ул. Новоостаповская д5с2</p>
                        <p className="contacts-requisites">ИП Гришатов Егор Александрович
                            ИНН 771894183640
                            ОГРН 317774600057720</p>
                        <Link href="#">
                            <a className="contacts-policy">Политика конфиденциальности</a>
                        </Link>
                    </div>
                    <div className="contacts-ymap">
                        <div className="static-map" ref={mapRef} />
                    </div>
                    <ModalPortal>
                        <CSSTransition
                            classNames="contacts-map-modal"
                            timeout={150}
                            in={modalActive}
                            mountOnEnter
                            unmountOnExit
                        >
                            <MapModal
                                onClose={useCallback(() => setModalActive(false), [])}
                            />
                        </CSSTransition>
                    </ModalPortal>
                    <Modal
                        onClose={handleModalClose}
                        active={orderCallModalActive}
                        header="Оставьте ваш контакт — мы перезвоним и ответим на все вопросы"
                        className="sdasd">
                        <div>
                            <OrderCallFrom />
                        </div>
                    </Modal>
                </div>
            </section>

        </main>
    </>
  )
}

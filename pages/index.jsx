import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import YouTube from 'react-youtube';
import { ADVANTAGES } from '../src/constants/advantages';
import { METHODOLOGY } from '../src/constants/methodology';
import { DIRECTIONS } from '../src/constants/directions';
import { FAQ } from '../src/constants/faq';
import MarkerIcon from '../src/assets/svg/marker.svg';
import CheckIcon from '../src/assets/svg/check.svg';
import ArrowIcon from '../src/assets/svg/arrow.svg';
import BookBar from '../src/components/BookBar/BookBar';
import PhotoSwiper from '../src/components/PhotoSwiper/PhotoSwiper';
import InstagramIcon from '../src/assets/svg/social/instagram-logo.svg';
import WhatsappIcon from '../src/assets/svg/social/whatsapp-logo.svg';
import TelegramIcon from '../src/assets/svg/social/telegram-logo.svg';
import YouTubePlay from '../src/assets/svg/youtube-play.svg';
import useContactsMap from '../src/utils/hooks/useContactsMap';
import MapModal from '../src/components/MapModal';
import ReviewsSwiper from '../src/components/ReviewsSwiper/ReviewsSwiper';
import Modal from '../src/components/Modal';
import OrderCallFrom from '../src/components/OrderCallForm/OrederCallFrom';
import PriceSwiper from '../src/components/PriceSwiper/PriceSwiper';
import useYMetrika from '../src/utils/hooks/useYMetrika';
import useGTag from '../src/utils/hooks/useGTag';
import useFbPixel from '../src/utils/hooks/useFbPixel';

export var ModalPortal = function ({ children }) {
  if (!process.browser) return null;
  return createPortal(children, window.document.body);
};

const TEAMS = [
  'Балтика Вильнюс МХЛ Б, Россия',
  'Alliston Coyotes GMHL, Канада',
  'Orangeville Ice Crushers GMHL, Канада',
  'Colborne Chiefs GMHL, Канада',
];

const modalHeader = <p>Оставьте ваш контакт — мы&nbsp;перезвоним и&nbsp;ответим на&nbsp;все&nbsp;вопросы</p>;
const firstBookBarText = <p>Запишитесь на первую тренировку со&nbsp;скидкой 50%</p>;

export default function Home({
  clientWindowWidth, handleModalClose, orderCallModalActive, handleOrderCallClick,
}) {
  const [activeDirectionsItems, setActiveDirectionsItems] = useState({ 0: true });
  const [activeFaqItem, setActiveFaqItem] = useState({ 0: true });
  const [modalActive, setModalActive] = useState(false);
  const [lazyLoadedVideo, setLazyLoadedVideo] = useState(false);
  const handleMapModalOpen = useCallback(() => setModalActive(true), []);
  const videoRef = useRef();
  const mapRef = useRef();

  const ym = useYMetrika();
  const gtag = useGTag();
  const fbq = useFbPixel();

  const handleVideoClick = useCallback((e) => {
    setLazyLoadedVideo(true);
    // console.log(e);
  }, []);

  const handleReady = useCallback((e) => {
    e.target.playVideo();
  }, []);

  const handleTelegramClick = useCallback(() => {
    ym('reachGoal', 'TELEGRAM_CLICKED');
    gtag('event', 'TELEGRAM_CLICKED');
    fbq('track', 'TELEGRAM_CLICKED');
  }, []);

  const handleWhatsappClick = useCallback(() => {
    ym('reachGoal', 'WHATSAPP_CLICKED');
    gtag('event', 'WHATSAPP_CLICKED');
    fbq('track', 'WHATSAPP_CLICKED');
  }, []);

  const handlePhoneClick = useCallback(() => {
    ym('reachGoal', 'TEL_CLICKED');
    gtag('event', 'TEL_CLICKED');
    fbq('track', 'TEL_CLICKED');
  }, []);

  useContactsMap(mapRef, true);

  return (
    <>
      <section className="section section-main">
        <div className="section-wrapper main-wrapper">
          <div className="address-wrapper">
            <MarkerIcon className="marker-icon" />
            <span className="map-link" onClick={handleMapModalOpen}>Москва, ЛД «Морозово», ул. Новоостаповская д5с2</span>
          </div>
          <h1 className="h1 main-title">
            Групповые&nbsp;тренировки
            <br />
            по&nbsp;хоккею&nbsp;для&nbsp;детей
            <br />
            от&nbsp;9&nbsp;лет
          </h1>
          <p className="main-text">Запишитесь на первую тренировку со&nbsp;скидкой 50%</p>
          <button onClick={handleOrderCallClick} className="button-orange main-button">Получить консультацию</button>
        </div>
      </section>

      <section className="section section-advantages" id="about">
        <div className="section-wrapper advantages-container">
          <h2 className="section-title advantages-title">Преимущества тренировок в&nbsp;Z-Hockey</h2>
          <div className="advantages-wrapper">
            <div className="advantages">
              {ADVANTAGES.map((item) => (
                <div key={item} className="advantages-item">
                  <CheckIcon className="advantages-icon" />
                  <p className="advantages-text">{item}</p>
                </div>
              ))}
            </div>
            {!lazyLoadedVideo && (
              <>
                <div className="mock" />
                <div onClick={handleVideoClick} className="video-preview" data-video-id="gmz0pxezzdA">
                  <YouTubePlay className="youtube-play-button" />
                  <img className="cover" src="https://img.youtube.com/vi/gmz0pxezzdA/sddefault.jpg" alt="youtube-video-gmz0pxezzdA" />
                  <div className="overlay" />
                </div>
              </>

            )}
            {lazyLoadedVideo && (
              <YouTube
                ref={videoRef}
                className="advantages-video"
                containerClassName="advantages-video-container"
                videoId="gmz0pxezzdA"
                onReady={handleReady}
                opts={{
                  autoplay: 1,
                  playerVars: {
                    autohide: 0, showinfo: 0, rel: 0, modestbranding: 1, disablekb: 1, controls: 2, wmode: 'transparent', mode: 'opaque',
                  },
                }}
              />
            )}
          </div>
        </div>
      </section>

      <section className="section section-methodology">
        <div className="section-wrapper">
          <div className="methodology-wrap">
            {clientWindowWidth > 768 && <div className="methodology-image" />}
            <div className="methodology-wrapper">
              <h2 className="section-title highlighted methodology-title">О методике</h2>
              {clientWindowWidth <= 768 && <div className="methodology-image" />}
              <p className="section-text methodology-text">Меня зовут Егор Гришатов — я хоккейный тренер и агент, работаю с лигами США, Канады и Европы.</p>
              <p className="section-text methodology-text">Моя авторская методика основана на актуальных требованиях современного хоккея — упор на игровые упражнения и&nbsp;комплексное развитие навыков как для защитников, так и для нападающих.</p>
              <ul className="methodology-list">
                {METHODOLOGY.map((item) => (
                  <li className="section-text methodology-item" key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BookBar orderCallClick={handleOrderCallClick} text={firstBookBarText} buttonText="Записаться" />

      <section className="section section-directions">
        <div className="section-wrapper directions-container">
          <div className="directions-wrapper">
            <h2 className="section-title highlighted directions-title">Направленность тренировок</h2>
            <ul className="directions-list">
              {DIRECTIONS.map(({ direction, items }, i) => (
                <li
                  key={direction}
                  className={classnames('directions-list-item', { _active: activeDirectionsItems[i] })}
                  onClick={() => setActiveDirectionsItems((prevState) => ({ [i]: !prevState[i] }))}
                >
                  <div className="direction-wrap">
                    <div className="directions-direction" dangerouslySetInnerHTML={{ __html: direction }} />
                    <ArrowIcon className="directions-icon" />
                  </div>

                  <ul className="directions-item">
                    {items.map((item) => (
                      <li className={classnames('direction-item', { _active: activeDirectionsItems[i] })} key={item}>
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
            <h2 className="section-title highlighted coach-title">О тренере</h2>
            {clientWindowWidth <= 768 && (
              <div className="image-wrapper">
                <img className="coach-image" src="/assets/img/coach.jpeg" alt="coach" />
              </div>
            )}
            <p className="section-text coach-paragraph coach-paragraph-bold">Гришатов Егор Александрович</p>
            <p className="section-text coach-paragraph">Тренерский стаж с 2016 года</p>
            <p className="section-text coach-paragraph">Высшее педагогическое образование РГСУ, специальность «Физическая культура и&nbsp;спорт»</p>
            <p className="section-text coach-paragraph">Выступал за команды:</p>
            <ul className="coach-teams">
              {TEAMS.map((team) => (
                <li key={team} className="section-text coach-team">{team}</li>
              ))}
            </ul>
          </div>
          {clientWindowWidth > 768 && (
          <div className="image-wrapper">
            <img className="coach-image" src="/assets/img/coach.jpeg" alt="coach" />
          </div>
          )}
        </div>
      </section>

      <BookBar orderCallClick={handleOrderCallClick} text="Получить консультацию тренера" buttonText="Получить" />

      <section className="section section-schedule" id="schedule">
        <div className="section-wrapper schedule-container">
          <h2 className="section-title schedule-title">Расписание</h2>
          <div className="schedule-wrapper">
            {clientWindowWidth > 1024 && (
              <div className="schedule-image-container">
                <img className="schedule-image" src="/assets/img/schedule.jpeg" alt="hockey field" />
              </div>
            )}
            <div className="schedule-text">
              {clientWindowWidth >= 768 ? (
                <p className="section-text schedule-paragraph">Тренировки проходят по адресу г. Москва, ул.&nbsp;Новоостаповская&nbsp;д5с2,<br />ЛД «Морозово», каждую субботу и&nbsp;воскресенье</p>
              ) : (
                <p className="section-text schedule-paragraph">Тренировки проходят по адресу г. Москва, ул. Новоостаповская&nbsp;д5с2, ЛД «Морозово», каждую субботу и&nbsp;воскресенье</p>
              )}
              {clientWindowWidth <= 1024 && (
              <div className="schedule-image-container">
                <img className="schedule-image" src="/assets/img/schedule.jpeg" alt="hockey field" />
              </div>
              )}
              <div className="schedule-table">
                <div className="table-column highlighted">
                  <p className="table-header">День&nbsp;недели</p>
                  <p className="table-header">Суббота</p>
                  <p className="table-header">Воскресенье</p>
                </div>
                <div className="table-column centered">
                  <p className="table-header">Земля</p>
                  <p className="table-text">18:15–19:15</p>
                  <p className="table-text">9:30–10:30</p>
                </div>
                <div className="table-column centered">
                  <p className="table-header">Лёд</p>
                  <p className="table-text">19:30–21:00</p>
                  <p className="table-text">7:45–9:15</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-reviews" id="reviews">
        <h2 className="section-title reviews-title">Отзывы</h2>
        <ReviewsSwiper />
      </section>

      <section className="section section-price" id="price">
        <h2 className="section-title price-title">Стоимость</h2>
        <div className="price-wrapper">
          <PriceSwiper
            clientWindowWidth={clientWindowWidth}
            orderCallClick={handleOrderCallClick}
          />
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
                  onClick={() => setActiveFaqItem((prevState) => ({ [i]: !prevState[i] }))}
                >
                  <div className="question-wrapper">
                    <div className="faq-question" dangerouslySetInnerHTML={{ __html: question }} />
                    <ArrowIcon className="faq-icon" />
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
        <PhotoSwiper currentWidth={clientWindowWidth} />
      </section>

      <section className="section section-contacts" id="contacts">
        <div className="section-wrapper contacts-wrapper">
          <div className="contacts-content">
            <h2 className="section-title highlighted contacts-title">Контакты</h2>
            <p className="contacts-text">Свяжитесь с нами</p>
            <a className="contacts-tel" onClick={handlePhoneClick} href="tel:79160791214">+7 916 079-12-14</a>
            <div className="social-links">
              <Link passHref href="https://www.instagram.com/z_hockey_/" target="_blank">
                <div className="social-links-item"><InstagramIcon /></div>
              </Link>
              <Link passHref href="https://wa.me/79160791214">
                <div onClick={handleWhatsappClick} className="social-links-item"><WhatsappIcon /></div>
              </Link>
              <Link passHref href="https://t.me/GHA_hockey">
                <div onClick={handleTelegramClick} className="social-links-item"><TelegramIcon /></div>
              </Link>
            </div>
            <button type="button" onClick={handleOrderCallClick} className="button-orange contacts-button">Задать вопрос</button>
            <p className="contacts-address">Москва, ул. Новоостаповская д5с2</p>
            {clientWindowWidth <= 480 && (
              <div className="contacts-ymap">
                <div className="static-map" ref={mapRef} />
              </div>
            )}
            <p className="contacts-requisites">
              ИП&nbsp;Гришатов&nbsp;Егор&nbsp;Александрович
              <br />
              ИНН&nbsp;771894183640
              <br />
              ОГРН&nbsp;317774600057720
            </p>
            <Link href="/legal/policy">
              <a className="contacts-policy">Политика конфиденциальности</a>
            </Link>
          </div>
          {clientWindowWidth > 480 && (
          <div className="contacts-ymap">
            <div className="static-map" ref={mapRef} />
          </div>
          )}
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
            header={modalHeader}
          >
            <div>
              <OrderCallFrom handleModalClose={handleModalClose} clientWindowWidth={clientWindowWidth} />
            </div>
          </Modal>
        </div>
      </section>
    </>
  );
}

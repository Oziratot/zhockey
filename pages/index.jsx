import React, { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { stringify } from 'qs';
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
import useContactsMap from '../src/utils/hooks/useContactsMap';
import MapModal from '../src/components/MapModal';
import ReviewsSwiper from '../src/components/ReviewsSwiper/ReviewsSwiper';
import Modal from '../src/components/Modal';
import OrderCallFrom from '../src/components/OrderCallForm/OrederCallFrom';
import PriceSwiper from '../src/components/PriceSwiper/PriceSwiper';
import useYMetrika from '../src/utils/hooks/useYMetrika';
import useGTag from '../src/utils/hooks/useGTag';
import useFbPixel from '../src/utils/hooks/useFbPixel';
import Button from '../src/components/Button/Button';
import { PHOTOS } from '../src/constants/photos';
import OnlyTextInputComponent from '../src/components/ui/OnlyTextInputComponent';
import PhoneInputComponent from '../src/components/ui/PhoneInputComponent';
import { PRICE } from '../src/constants/price';
import PriceTab from '../src/components/PriceTab/PriceTab';

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

const validationSchema = Yup.object({
  firstName: Yup.string().required('Поле обязательно'),
  phone: Yup.string().min(8, 'Телефон состоит минимум из 8 символов').matches(/^[\s\d-+()]*$/g, 'Телефон должен состоять только из цифр').required('Поле обязательно'),
  comment: Yup.string(),
});

const desktopHeader = <h1 className="h1 main-title">Групповые&nbsp;тренировки<br />по&nbsp;хоккею&nbsp;для&nbsp;детей<br />от&nbsp;9&nbsp;лет</h1>;
const mobileHeader = <h1 className="h1 main-title">Групповые<br />тренировки&nbsp;по&nbsp;хоккею<br />для&nbsp;детей&nbsp;от&nbsp;9&nbsp;лет</h1>;
const modalHeader = <p>Оставьте ваш контакт — мы&nbsp;перезвоним и&nbsp;ответим на&nbsp;все&nbsp;вопросы</p>;

export default function Home({
  clientWindowWidth, handleModalClose, orderCallModalActive, handleOrderCallClick, setlOrderCallModalActive,
}) {
  const [activeDirectionsItems, setActiveDirectionsItems] = useState({ 0: true });
  const [activeFaqItem, setActiveFaqItem] = useState({ 0: true });
  const [modalActive, setModalActive] = useState(false);
  const [successfullySent, setSuccessfullySent] = useState(false);
  const handleMapModalOpen = useCallback(() => setModalActive(true), []);
  const onModalClose = useCallback(() => {
    handleModalClose();
    // setSuccessfullySent(false);
  }, []);
  const mapRef = useRef();
  const formRef = useRef(null);
  const firstNameRef = useRef('');

  const ym = useYMetrika();
  const gtag = useGTag();
  const fbq = useFbPixel();

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

  const handleSubmit = useCallback((values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting || successfullySent) return;

    const safeValues = { ...values };

    if (formRef.current['gha-a-n-t-i-s-p-a-m-f-i-e-l-d'].checked) {
      safeValues['gha-a-n-t-i-s-p-a-m-f-i-e-l-d'] = 1;
    }

    firstNameRef.current = values.firstName;

    axios.post('/feedback-form.php', stringify(safeValues), { 'Content-Type': 'application/x-www-form-urlencoded', headers: { 'Access-Control-Allow-Origin': '*' } })
      .then(() => {
        ym('reachGoal', 'FILLED_AND_SUCCESSFULLY_SUBMITTED');
        gtag('event', 'FILLED_AND_SUCCESSFULLY_SUBMITTED');
        fbq('track', 'FILLED_AND_SUCCESSFULLY_SUBMITTED');
        setSubmitting(false);
        setSuccessfullySent(true);

        if (!modalActive) {
          setlOrderCallModalActive(true);
        }
      })
      .catch(() => {
        setSubmitting(false);
      });
  }, [successfullySent]);

  useContactsMap(mapRef, true);

  return (
    <>
      <section className="section section-main main">
        <div className="section-wrapper main-wrapper">
          <div className="address-wrapper">
            <MarkerIcon className="marker-icon" />
            <span className="map-link" onClick={handleMapModalOpen}>Москва, ЛД «Морозово», ул.&nbsp;Новоостаповская д5с2</span>
          </div>
          {clientWindowWidth > 768 ?
            desktopHeader :
            mobileHeader}
          <p className="main-text">Запишитесь на первую тренировку<br />со&nbsp;скидкой 50%</p>
          <Button className="main-button" onClick={handleOrderCallClick}>Забронировать</Button>
        </div>
      </section>

      <section className="section section-advantages" id="about">
        <div className="section-wrapper advantages-container">
          <h2 className="section-title advantages-title">Преимущества тренировок в&nbsp;Grishatov Hockey</h2>
          <div className="advantages-wrapper">
            <div className="advantages">
              {ADVANTAGES.map((item) => (
                <div key={item} className="advantages-item">
                  <CheckIcon className="advantages-icon" />
                  <p className="advantages-text">{item}</p>
                </div>
              ))}
            </div>
            <img className="advantages-image" src="/assets/img/advantages.jpg" alt="hockey player" />
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
              <p className="section-text methodology-text">Меня зовут Егор Гришатов — я&nbsp;хоккейный тренер и&nbsp;агент, работаю с&nbsp;лигами США, Канады и&nbsp;Европы.</p>
              <p className="section-text methodology-text">Моя авторская методика основана на&nbsp;актуальных требованиях современного хоккея — упор на&nbsp;игровые упражнения и&nbsp;комплексное развитие навыков как для защитников, так и&nbsp;для&nbsp;нападающих.</p>
              <ul className="methodology-list">
                {METHODOLOGY.map((item) => (
                  <li className="section-text methodology-item" key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BookBar orderCallClick={handleOrderCallClick} text="Запишитесь на первую тренировку со&nbsp;скидкой 50%" buttonText="Записаться" />

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
                      <li className={classnames('text-m light direction-item', { _active: activeDirectionsItems[i] })} key={item}>
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
          <div className="schedule">
            <div className="schedule-text">
              <div className="days-item">
                <p className="days">Понедельник-среда-пятница</p>
                <div className="day-container">
                  <p className="day text-xl bold">Лёд</p>
                  <p className="day text-xl">13:00–14:15</p>
                </div>
              </div>
              <div className="days-item">
                <p className="days">Суббота</p>
                <div className="day-container">
                  <p className="day text-xl bold">Земля</p>
                  <p className="day text-xl">18:15–19:15</p>
                </div>
                <div className="day-container">
                  <p className="day text-xl bold">Лёд</p>
                  <p className="day text-xl">19:30–21:00</p>
                </div>
              </div>
            </div>
            <img className="schedule-image" src="/assets/img/schedule.jpg" alt="coach with team" />
          </div>
        </div>
      </section>

      <section className="section section-reviews" id="reviews">
        <h2 className="section-title reviews-title">Отзывы</h2>
        <ReviewsSwiper />
      </section>

      <section className="section section-price" id="price">
        <h2 className="section-title price-title">Стоимость</h2>
        <div className="section-wrapper">
          {clientWindowWidth > 768 && (
            <div className="price-l">
              {PRICE.map((item) => (
                <PriceTab
                  key={item.type}
                  type={item.type}
                  days={item.days}
                  items={item.items}
                  price={item.price}
                  orderCallClick={handleOrderCallClick}
                />
              ))}
            </div>
          )}
          {clientWindowWidth <= 768 && (
            <PriceSwiper
              items={PRICE}
              clientWindowWidth={clientWindowWidth}
              orderCallClick={handleOrderCallClick}
            />
          )}
        </div>
      </section>

      <section className="section section-photo">
        <h2 className="section-title photo-title">Фотогалерея</h2>
        <PhotoSwiper photo={PHOTOS} currentWidth={clientWindowWidth} />
      </section>

      <section className="section section-faq">
        <div className="section-wrapper">
          <div className="faq-wrapper">
            <h2 className="section-title faq-title">Ответы на часто задаваемые вопросы</h2>
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

      <section className="section section-contact-us">
        <div className="section-wrapper">
          <h2 className="section-title centered">Остались вопросы? Задайте их нам</h2>
          <div className="contact-us-container">
            <div className="founder">
              <img className="founder-image" src="/assets/img/camp/coaches/egrishatov.jpg" alt="Егор Горишатов" />
              <div className="founder-text">
                <p className="founder-name">Егор Гришатов</p>
                <p className="text-xl white">Основатель, тренер</p>
              </div>
            </div>

            <Formik
              initialValues={{ firstName: '', phone: '', comment: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnMount
            >
              {({
                handleSubmit, handleReset, handleChange, handleBlur, values, errors, touched, isValid,
              }) => (
                <form className="feedback-form" onSubmit={handleSubmit} onReset={handleReset} ref={formRef}>
                  <div className="form-row">
                    <div className="field-wrap width-50">
                      <Field name="firstName" component={OnlyTextInputComponent} placeholder="Ваше имя" className={classnames({ invalid: errors.firstName && touched.firstName })} />
                      <ErrorMessage name="firstName" component="div" className="field-error" />
                    </div>
                    <div className="field-wrap width-50">
                      <Field name="phone" component={PhoneInputComponent} placeholder="Телефон для связи" className={classnames({ invalid: errors.phone && touched.phone })} />
                      <ErrorMessage name="phone" component="div" className="field-error" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="field-wrap">
                      <textarea
                        rows="1"
                        name="comment"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        placeholder="Комментарий"
                        value={values.comment}
                      />
                      <ErrorMessage name="comment" component="div" className="field-error" />
                    </div>
                  </div>

                  <input type="checkbox" name="gha-a-n-t-i-s-p-a-m-f-i-e-l-d" value="1" style={{ display: 'none' }} tabIndex="-1" autoComplete="none" />

                  <div className="form-row consent-and-submit">
                    {clientWindowWidth < 900 && (
                      <Button
                        className="form-page-button"
                        disabled={!isValid || successfullySent}
                        type="submit"
                      >
                        Получить консультацию
                      </Button>
                    )}
                    <div className="consent-personal-data-processing">
                      <span>Нажимая на кнопку, вы даете согласие на&nbsp;обработку </span>
                      <Link href="/legal/agreement">
                        <a className="blue-link">персональных&nbsp;данных</a>
                      </Link>
                    </div>
                    {clientWindowWidth >= 900 && (
                      <Button
                        className="form-page-button"
                        disabled={!isValid || successfullySent}
                        type="submit"
                      >
                        Получить консультацию
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
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
            <Button type="button" onClick={handleOrderCallClick} className="contacts-button">Задать вопрос</Button>
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
            onClose={onModalClose}
            active={orderCallModalActive}
            header={successfullySent ? '' : modalHeader}
          >
            <div>
              <OrderCallFrom
                successfullySent={successfullySent}
                setSuccessfullySent={setSuccessfullySent}
                handleModalClose={onModalClose}
                clientWindowWidth={clientWindowWidth}
              />
            </div>
          </Modal>
        </div>
      </section>
    </>
  );
}

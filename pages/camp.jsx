import React, { useCallback, useRef, useState } from 'react';
import classnames from 'classnames';
import { Formik, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import axios from 'axios';
import { stringify } from 'qs';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DoubleArrowDownIcon from '../src/assets/svg/double-arrow-down.svg';

import Button from '../src/components/Button/Button';
import { LIVING_PHOTOS } from '../src/constants/livingPhotos';
import { PREV_CAMP_PHOTOS } from '../src/constants/prevCampPhotos';
import { CAMP_FAQ } from '../src/constants/faq';
import { PARENTS_PHOTOS } from '../src/constants/photos';

import CampAdvIcon1 from '../src/assets/svg/camp-adv/camp-adv-1.svg';
import CampAdvIcon2 from '../src/assets/svg/camp-adv/camp-adv-2.svg';
import CampAdvIcon3 from '../src/assets/svg/camp-adv/camp-adv-3.svg';
import CampAdvIcon4 from '../src/assets/svg/camp-adv/camp-adv-4.svg';
import CampAdvIcon5 from '../src/assets/svg/camp-adv/camp-adv-5.svg';
import CampAdvIcon6 from '../src/assets/svg/camp-adv/camp-adv-6.svg';

import CampDirIcon1 from '../src/assets/svg/camp-dir/camp-dir-1.svg';
import CampDirIcon2 from '../src/assets/svg/camp-dir/camp-dir-2.svg';
import CampDirIcon3 from '../src/assets/svg/camp-dir/camp-dir-3.svg';
import CampDirIcon4 from '../src/assets/svg/camp-dir/camp-dir-4.svg';
import CampDirIcon5 from '../src/assets/svg/camp-dir/camp-dir-5.svg';
import CampDirIcon6 from '../src/assets/svg/camp-dir/camp-dir-6.svg';
import ReviewsSwiper from '../src/components/ReviewsSwiper/ReviewsSwiper';
import PhotoSwiper from '../src/components/PhotoSwiper/PhotoSwiper';

import SafetyIcon1 from '../src/assets/svg/camp-safety/safety-1.svg';
import SafetyIcon2 from '../src/assets/svg/camp-safety/safety-2.svg';
import SafetyIcon3 from '../src/assets/svg/camp-safety/safety-3.svg';
import SafetyIcon4 from '../src/assets/svg/camp-safety/safety-4.svg';
import SafetyIcon5 from '../src/assets/svg/camp-safety/safety-5.svg';
import ArrowIcon from '../src/assets/svg/arrow.svg';
import useYMetrika from '../src/utils/hooks/useYMetrika';
import useGTag from '../src/utils/hooks/useGTag';
import useFbPixel from '../src/utils/hooks/useFbPixel';
import InstagramIcon from '../src/assets/svg/social/instagram-logo.svg';
import WhatsappIcon from '../src/assets/svg/social/whatsapp-logo.svg';
import TelegramIcon from '../src/assets/svg/social/telegram-logo.svg';
import MapModal from '../src/components/MapModal/MapModal';
import Modal from '../src/components/Modal';
import OrderCallFrom from '../src/components/OrderCallForm/OrederCallFrom';
import { ModalPortal } from './index';
import useContactsMap from '../src/utils/hooks/useContactsMap';
import OnlyTextInputComponent from '../src/components/ui/OnlyTextInputComponent';
import PhoneInputComponent from '../src/components/ui/PhoneInputComponent';
import CoachesSwiper from '../src/components/CoachesSwiper/CoachesSwiper';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Поле обязательно'),
  phone: Yup.string().min(8, 'Телефон состоит минимум из 8 символов').matches(/^[\s\d-+()]*$/g, 'Телефон должен состоять только из цифр').required('Поле обязательно'),
  comment: Yup.string(),
});

const campAdvantages = [
  { label: '2 группы по&nbsp;24&nbsp;участника', text: 'Делим по&nbsp;возрастам: 2003–2007&nbsp;и&nbsp;2008–2012', icon: <CampAdvIcon1 className="adv-icon" /> },
  { label: '4&nbsp;тренировки в&nbsp;день', text: '2,5&nbsp;часа льда и&nbsp;2,5&nbsp;часа земли', icon: <CampAdvIcon2 className="adv-icon" /> },
  { label: '3&nbsp;тренера на&nbsp;льду', text: '+ 2&nbsp;тренера по&nbsp;ОФП', icon: <CampAdvIcon3 className="adv-icon" /> },
  { label: 'Постановка правильной техники', text: 'Ортопедический и&nbsp;функциональный контроль спортсменов с&nbsp;кинезиологом', icon: <CampAdvIcon4 className="adv-icon" /> },
  { label: 'Отслеживаемый прогресс', text: 'Тестирование и&nbsp;нормативы по&nbsp;показателям до&nbsp;и&nbsp;после&nbsp;лагеря', icon: <CampAdvIcon5 className="adv-icon" /> },
  { label: 'Сопровождение', text: 'Из&nbsp;Москвы для&nbsp;первой смены в&nbsp;Брест и&nbsp;для&nbsp;последней из&nbsp;Бреста', icon: <CampAdvIcon6 className="adv-icon" /> },
];

const campDirections = [
  {
    icon: <CampDirIcon1 className="dir-icon" />,
    label: 'Развитие игрового мышления',
    text: [
    '—&nbsp;Полноценная игра еженедельно',
    '—&nbsp;Разноплановые игровые упражнения на&nbsp;льду и&nbsp;на&nbsp;земле',
    '—&nbsp;Отработка тактических взаимодействий с&nbsp;элементами силовой борьбы',
    ],
  },
  {
    icon: <CampDirIcon2 className="dir-icon" />,
    label: 'Улучшение навыков силовой борьбы',
    text: [
      '—&nbsp;Применение силовых приёмов',
      '—&nbsp;Уверенность при&nbsp;контактной игре в&nbsp;корпус',
      '—&nbsp;Группировка для&nbsp;избежания травм в&nbsp;борьбе',
    ],
  },
  {
    icon: <CampDirIcon3 className="dir-icon" />,
    label: 'Интенсивная физическая подготовка',
    text: [
      '—&nbsp;Индивидуальная нагрузка по&nbsp;пульсу',
      '—&nbsp;Развитие всех качеств: баланс, координация, ловкость, сила, выносливость и&nbsp;игровое мышление',
      '—&nbsp;Программа тренировок с&nbsp;учётом биометрических особенностей',
    ],
  },
  {
    icon: <CampDirIcon4 className="dir-icon" />,
    label: 'Улучшение бросковой техники',
    text: [
      '—&nbsp;Постановка правильной техники броска',
      '—&nbsp;Броски и&nbsp;щелчки в&nbsp;игровых ситуациях',
      '—&nbsp;Броски из-под&nbsp;прессинга',
    ],
  },
  {
    icon: <CampDirIcon5 className="dir-icon" />,
    label: 'Отработка техники&nbsp;рук',
    text: [
      '—&nbsp;Удержание шайбы в&nbsp;единоборствах',
      '—&nbsp;Обыгрыш в&nbsp;движении',
      '—&nbsp;Привитие культуры пасса',
    ],
  },
  {
    icon: <CampDirIcon6 className="dir-icon" />,
    label: 'Улучшение навыков катания',
    text: [
      '—&nbsp;Силовое катание',
      '—&nbsp;Исправление закреплённых ошибок',
      '—&nbsp;Постановка правильной техники катания на&nbsp;льду и&nbsp;на&nbsp;dземле',
    ],
  },
];

const coaches = [
  {
    name: 'Дмитрий Михин',
    desc: 'Тренер по&nbsp;ледовой подготовке',
    src: '/assets/img/camp/coaches/mihin.jpg',
    text: [
      'Тренер по&nbsp;ледовой подготовке',
      'Тренерский стаж с&nbsp;2014&nbsp;года',
      'Высшее педагогическое образование РГУФКСМиТ, специальность «Тренер по&nbsp;хоккею с&nbsp;шайбой»',
      'Специалист по&nbsp;технической и&nbsp;функциональной подготовке на&nbsp;льду',
      'Работал с&nbsp;хоккеистами высших молодёжных и&nbsp;профессиональных лиг&nbsp;США, Канады и&nbsp;Европы.',
    ],
},
  {
    name: 'Егор Гришатов',
    desc: 'Тренер по&nbsp;ледовой подготовке',
    src: '/assets/img/camp/coaches/egrishatov.jpg',
    text: [
      'Тренер по&nbsp;ледовой подготовке',
      'Тренерский стаж с&nbsp;2016&nbsp;года',
      'Высшее педагогическое образование РГСУ, специальность «Физическая культура и&nbsp;спорт»',
      'Основатель спортивной школы Grishatov Hockey',
      'Основатель хоккейного агентства Grishatov Hockey Agency.',
    ],
},
  {
    name: 'Илья Винокуров',
    desc: 'Тренер по&nbsp;ледовой подготовке',
    src: '/assets/img/camp/coaches/vinokurov.jpg',
    text: [
      'Тренер по&nbsp;ледовой подготовке',
      'Тренерский стаж с&nbsp;2019&nbsp;года',
      'Высшее педагогическое образование НГГУ, специальность «Физическая Культура и&nbsp;Спорт»',
      'Специалист по&nbsp;технической подготовке на&nbsp;льду',
      'Работал с&nbsp;хоккеистами высших молодёжных и&nbsp;профессиональных лиг&nbsp;США, Канады и&nbsp;Европы.',
    ],
},
  {
    name: 'Александр Юрин',
    desc: 'Тренер по&nbsp;физической подготовке',
    src: '/assets/img/camp/coaches/yurin.jpg',
    text: [
      'Тренер по&nbsp;физической подготовке',
      'Тренерский стаж с&nbsp;2008&nbsp;года',
      'Образование National Academy of Sport Medicine USA',
      'Специалист по&nbsp;функциональной подготовке и&nbsp;ортопедическому контролю спортсменов',
      'Основатель спортивного центра диагностики, коррекции и&nbsp;восстановления D.R.E.A.M.',
    ],
},
  {
    name: 'Олег Гришатов',
    desc: 'Тренер по&nbsp;физической подготовке',
    src: '/assets/img/camp/coaches/ogrishatov.jpg',
    text: [
      'Тренер по&nbsp;физической подготовке',
      'Действующий игрок канадской команды Lakehead University, USport',
      'Лучший защитник канадской команды Bradford Rattlers, GMHL в&nbsp;сезоне 19–20&nbsp;и&nbsp;21–22',
      'Сертифицированный тренер американской ассоциации NSCA по&nbsp;направлению STRENGTH AND CONDITIONING SPECIALIST (CSCS).',
    ],
},
];

const priceSchedule = [
  { dates: '26&nbsp;июня&nbsp;— 9&nbsp;июля (14&nbsp;дней)', price: '84 900&nbsp;₽' },
  { dates: '10 июля&nbsp;— 23&nbsp;июля (14&nbsp;дней)', price: '84 900&nbsp;₽' },
  { dates: '26&nbsp;июня&nbsp;— 23&nbsp;июля (28&nbsp;дней)', price: '154 900&nbsp;₽' },
];

const priceIncludes = [
  'Проживание в&nbsp;загородной усадьбе в&nbsp;3–4-х местном номере с&nbsp;удобствами',
  '4-х разовое питание (завтрак, обед, полдник, ужин)',
  '4&nbsp;тренировки в&nbsp;день: 2,5&nbsp;часа льда и&nbsp;2,5&nbsp;часа земли',
  'Игры по&nbsp;субботам для&nbsp;каждой группы',
  'Заточка коньков',
  'Стирка одежды, спортивной формы и&nbsp;нательного белья',
  'Тренировочный свитер и гамаши',
  'Бутылка для&nbsp;воды',
  'Диплом участника лагеря',
  'Сувенирная шайба с&nbsp;символикой лагеря',
  'Экскурсия с&nbsp;гидом в&nbsp;Брестскую крепость',
  'Русская баня и&nbsp;барбекю каждую субботу после&nbsp;игр',
];

const living = [
  'Комфортабельные 3–4&nbsp;х&nbsp;местные номера, сайнузел и&nbsp;Wi-Fi в&nbsp;каждой комнате',
  'Большая территория базы: спортивные площадки, русская баня с&nbsp;бассейном, озеро (можно купаться и&nbsp;ловить рыбу), бильярд, настольный теннис',
  'Стиральные машинки во&nbsp;всех домах',
  'Кондиционеры в&nbsp;общих помещениях',
  'Специальное меню для&nbsp;спортсменов',
  'Ледовый дворец&nbsp;— домашняя арена команды беллорусской экстралиги ХК&nbsp;«Брест»',
  'Манеж&nbsp;— место тренировок олимпийской сборной Белоруссии по&nbsp;лёгкой атлетике',
  'Легкоатлетический манеж и&nbsp;ледовая арена находятся в&nbsp;соседних зданиях',
  'Раздевалки с&nbsp;сушилками и&nbsp;заточка коньков на&nbsp;территории ледового дворца',
];

const parents = [
  '2–3-х местные номера с&nbsp;Wi-Fi, телевизором и&nbsp;санузлом в&nbsp;номере',
  'Трехразовое питание',
  'Трансфер от базы до&nbsp;ледового дворца в&nbsp;стоимость не&nbsp;входит',
  'Проживание на территории базы в отдельном корпусе для родителей',
];

const safety = [
  { text: 'Закрытая территория базы. Кроме персонала усадьбы, тренеров, детей и&nbsp;их&nbsp;родителей на&nbsp;базе никто проживать не&nbsp;будет', icon: <SafetyIcon1 className="safety-icon" /> },
  { text: 'Дети будут под&nbsp;постоянной опекой и&nbsp;присмотром', icon: <SafetyIcon2 className="safety-icon" /> },
  { text: 'На&nbsp;территории Белоруссии действует российский страховой полис', icon: <SafetyIcon3 className="safety-icon" /> },
  { text: 'Все&nbsp;передвижения организованы на&nbsp;автобусе хоккейного клуба «Брест»', icon: <SafetyIcon4 className="safety-icon" /> },
  { text: 'Связь с&nbsp;тренерским штабом 24/7', icon: <SafetyIcon5 className="safety-icon" /> },
];

const modalSchedule = [
  '<span className="accent">7:30</span>&nbsp;— подъем',
  '<span className="accent">7:45</span>&nbsp;— завтрак',
  '<span className="accent">8:00</span>&nbsp;— отъезд на лед',
  '<span className="accent">8:45-10:00</span>&nbsp;— земля 08-12',
  '<span className="accent">10:30-11:45</span>&nbsp;— лед 08-12',
  '<span className="accent">9:00-10:15</span>&nbsp;— лед 03-07',
  '<span className="accent">10:45-12:00</span>&nbsp;— земля 03-07',
  '<span className="accent">12:15</span>&nbsp;— отъезд на базу',
  '<span className="accent">12:45</span>&nbsp;— обед',
  '<span className="accent">13:00-15:30</span>&nbsp;— тихий час',
  '<span className="accent">15:45</span>&nbsp;— полдник',
  '<span className="accent">16:00</span>&nbsp;— отъезд на лед',
  '<span className="accent">16:45-18:00</span>&nbsp;— земля 08-12',
  '<span className="accent">18:30-19:45</span>&nbsp;— лед 08-12',
  '<span className="accent">17:00-18:15</span>&nbsp;— лед 03-07',
  '<span className="accent">18:45-20:00</span>&nbsp;— земля 03-07',
  '<span className="accent">20:15</span>&nbsp;— отъезд на базу',
  '<span className="accent">20:45</span>&nbsp;— ужин',
  '<span className="accent">21:00-22:00</span>&nbsp;— свободное время',
  '<span className="accent">22:15</span>&nbsp;— в комнатах',
  '<span className="accent">22:30</span>&nbsp;— отбой',
];

const modalHeader = <p>Оставьте ваш контакт — мы&nbsp;перезвоним и&nbsp;ответим на&nbsp;все&nbsp;вопросы</p>;

const Camp = function ({ handleOrderCallClick, clientWindowWidth, handleModalClose, orderCallModalActive }) {
  const [activeFaqItem, setActiveFaqItem] = useState({ 0: true });
  const [modalActive, setModalActive] = useState(false);
  const [successfullySent, setSuccessfullySent] = useState(false);
  const [visibleDirs, setVisibleDirs] = useState(2);
  const [scheduleActive, setscheduleActive] = useState(false);
  const [coach, setCoach] = useState({});
  const formRef = useRef(null);
  const firstNameRef = useRef('');
  const mapRef = useRef();
  const topic = 'Закажите бесплатную консультацию';
  const ym = useYMetrika();
  const gtag = useGTag();
  const fbq = useFbPixel();
  const handleCoachClose = useCallback(() => setCoach({}), []);
  const handleCoachClick = useCallback((coach) => setCoach(coach), []);
  const handleDirsShownClick = useCallback(() => setVisibleDirs(campDirections.length), []);
  const handleDirsShownLessClick = useCallback(() => setVisibleDirs(2), []);
  const handleScheduleClick = useCallback(() => setscheduleActive((prev) => !prev), []);
  const parentsImageSrc = clientWindowWidth > 768 ? '/assets/img/camp/parents/parents.jpg' : '/assets/img/camp/parents/parents-mobile.jpg';

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

  const handleSubmit = useCallback((values, { isSubmitting, setSubmitting }) => {
    if (isSubmitting || successfullySent) return;

    const safeValues = { ...values, topic };

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
      })
      .catch(() => {
        setSubmitting(false);
      });
    handleModalClose();
  }, [successfullySent]);

  return (
    <>
      <section className="section section-main camp">
        <div className="section-wrapper main-wrapper">
          <div className="camp-text">
            <p className="text-xl white first">Интенсивная подготовка хоккеистов 2003–2010&nbsp;г.&nbsp;р.</p>
            <h1 className="camp-title">Хоккейный лагерь<br />в&nbsp;бресте июнь-июль 2022</h1>
            <p className="text-xl white">26&nbsp;июня&nbsp;— 9&nbsp;июля</p>
            <p className="text-xl white">10&nbsp;июля&nbsp;— 23&nbsp;июля</p>
            <Button className="main-button" onClick={handleOrderCallClick}>Забронировать</Button>
          </div>
        </div>
      </section>

      <section className="section section-camp-advantages">
        <div className="section-wrapper">
          <h2 className="section-title centered">Преимущества лагеря</h2>
          <ul className="camp-advantages">
            {campAdvantages.map((adv) => (
              <li key={adv.label} className="adv-item">
                {adv.icon}
                <div className="adv-wrapper">
                  <div className="text-l bold" dangerouslySetInnerHTML={{ __html: adv.label }} />
                  <div className="text-s" dangerouslySetInnerHTML={{ __html: adv.text }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-camp-directions small-p">
        <div className="section-wrapper">
          <h2 className="section-title centered">Направленность лагеря</h2>
          {clientWindowWidth > 1024 && (
            <ul className="camp-directions">
              {campDirections.map((dir) => (
                <li key={dir.label} className="dir-item">
                  {dir.icon}
                  <div className="dir-text">
                    <div className="text-xl bold" dangerouslySetInnerHTML={{ __html: dir.label }} />
                    <ul className="dirs">
                      {dir.text.map((item) => (
                        <li key={item} className="dir">
                          <div className="text-s" dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                    ))}
                    </ul>
                  </div>
                </li>
            ))}
            </ul>
          )}

          {clientWindowWidth <= 1024 && (
            <>
              <ul className="camp-directions">
                <TransitionGroup component={null}>
                  {campDirections.slice(0, visibleDirs).map((dir) => (
                    <CSSTransition
                      key={dir.label}
                      timeout={450}
                      classNames="dir-item"
                    >
                      <li className="dir-item">
                        {dir.icon}
                        <div className="dir-text">
                          <div className="text-xl bold" dangerouslySetInnerHTML={{ __html: dir.label }} />
                          <ul className="dirs">
                            {dir.text.map((item) => (
                              <li key={item} className="dir">
                                <div className="text-s" dangerouslySetInnerHTML={{ __html: item }} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ul>
              <CSSTransition in={visibleDirs < campDirections.length} classNames="show-more-block" timeout={300} unmountOnExit>
                <div className="show-more-block hidden-xs">
                  <button className="show-more-btn" type="button" onClick={handleDirsShownClick}>Показать еще</button>
                  <DoubleArrowDownIcon className="show-more-icon" onClick={handleDirsShownClick} />
                </div>
              </CSSTransition>
              <CSSTransition in={visibleDirs >= campDirections.length} classNames="show-more-block" timeout={300} unmountOnExit>
                <div className="show-more-block hidden-xs">
                  <button className="show-more-btn" type="button" onClick={handleDirsShownLessClick}>Свернуть</button>
                  <DoubleArrowDownIcon className="show-more-icon rotated" onClick={handleDirsShownLessClick} />
                </div>
              </CSSTransition>
            </>
          )}
        </div>
      </section>

      <section className="section section-coaches">
        <div className="section-wrapper">
          <h2 className="section-title centered white">Тренеры</h2>
          {clientWindowWidth > 1024 && (
            <ul className="camp-coaches">
              {coaches.map((coach) => (
                <li key={coach.name} className="coach-item" onClick={() => handleCoachClick(coach)}>
                  <img className="coach-photo" src={coach.src} alt={coach.name} />
                  <p className="text-xl bold white">{coach.name}</p>
                  <div className="text-s white" dangerouslySetInnerHTML={{ __html: coach.desc }} />
                </li>
            ))}
            </ul>
          )}
          {clientWindowWidth <= 1024 && (
            <CoachesSwiper setCoach={setCoach} clientWindowWidth={clientWindowWidth} items={coaches} />
          )}
        </div>
      </section>

      <section className="section section-training">
        <div className="section-wrapper">
          <h2 className="section-title centered">Тренировки 6&nbsp;дней в&nbsp;неделю</h2>
          <div className="training-container">
            <div className="container left">
              <div className="training-days">
                <p className="text-xl">Понедельник—Пятница</p>
                <ul className="ul-small">
                  <li className="text-m light">4&nbsp;тренировки в&nbsp;день</li>
                  <li className="text-m light">2,5&nbsp;часа льда ежедневно</li>
                  <li className="text-m light">2,5&nbsp;часа земли ежедневно</li>
                </ul>
              </div>
              <div className="training-days">
                <p className="text-xl">Суббота</p>
                <ul className="ul-small">
                  <li className="text-m light">Полноценные игры по&nbsp;1,5&nbsp;часа для&nbsp;каждой группы</li>
                </ul>
              </div>
            </div>
            <div className="container right">
              <p className="text-xl">Полноценное восстановление между&nbsp;тренировками</p>
              <ul className="ul-small">
                <li className="text-m light">9&nbsp;часов ночной&nbsp;сон</li>
                <li className="text-m light">2&nbsp;часа дневной&nbsp;сон</li>
                <li className="text-m light">30&nbsp;минут перерыв между&nbsp;вечерними льдом и&nbsp;землёй</li>
              </ul>
              <Button className="training-button" onClick={handleScheduleClick}>Посмотреть распорядок дня</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-living">
        <h2 className="section-title centered">Отличные бытовые и спортивные условия</h2>
        <PhotoSwiper photo={LIVING_PHOTOS} currentWidth={clientWindowWidth} />
        <div className="section-wrapper">
          <div className="section-container">
            <ul className="living">
              {living.map((item) => (
                <li key={item} className="living-item">
                  <div className="text-xl light" dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-reviews" id="reviews">
        <h2 className="section-title reviews-title">Отзывы</h2>
        <ReviewsSwiper />
      </section>

      <section className="section section-schedule-price small-p">
        <div className="section-wrapper">
          <div className="schedule-price-container section-container">
            <h2 className="section-title centered">Расписание заездов и&nbsp;стоимость</h2>
            <p className=" desc text-xl light centered">* Для&nbsp;бронирования необходимо внести предоплату в&nbsp;размере 25% стоимости до&nbsp;15&nbsp;мая. Оставшуюся часть&nbsp;— 75% оплатить до&nbsp;1&nbsp;июня.</p>
            <ul className="schedule-price">
              {priceSchedule.map((item, i) => (
                <li key={item.dates} className="schedule-price-item">
                  <div className="dates text-xl" dangerouslySetInnerHTML={{ __html: item.dates }} />
                  <div className={`price text-xl bold price-${i}`} dangerouslySetInnerHTML={{ __html: item.price }} />
                  <Button className="price-button" onClick={handleOrderCallClick}>Забронировать</Button>
                </li>
              ))}
            </ul>
            <p className="text-xl bold">В&nbsp;стоимость включено:</p>
            <ul className="price-includes">
              {priceIncludes.map((item) => (
                <li className="price-includes-item" key={item}>
                  <div className="text-xl light" dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-parents">
        <div className="section-wrapper">
          <h2 className="section-title centered">Проживание для&nbsp;родителей</h2>
          <p className="text-xl bold centered">17 500&nbsp;₽ в&nbsp;неделю</p>
          <ul className="parents-list">
            {parents.map((item) => (
              <li key={item} className="parents-item">
                <div className="text-xl light" dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
          <img className="parents-image" src={parentsImageSrc} alt="Для родителей" />
        </div>
      </section>

      <section className="section section-safety">
        <div className="section-wrapper">
          <h2 className="section-title centered white">Безопасность и&nbsp;дисциплина 24/7</h2>
          <div className="safety">
            <ul className="safety-items">
              {safety.map((item) => (
                <li key={item.text} className="safety-item">
                  {item.icon}
                  <div className="text-m white" dangerouslySetInnerHTML={{ __html: item.text }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-photo">
        <h2 className="section-title photo-title">Фотографии предыдущих сборов</h2>
        <PhotoSwiper photo={PREV_CAMP_PHOTOS} currentWidth={clientWindowWidth} />
      </section>

      <section className="section section-faq">
        <div className="section-wrapper">
          <div className="faq-wrapper">
            <h2 className="section-title faq-title">Ответы на часто задаваемые вопросы</h2>
            <ul className="faq-list">
              {CAMP_FAQ.map(({ question, answer }, i) => (
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
                    <div className="faq-answer-content" dangerouslySetInnerHTML={{ __html: answer }} />
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
                      <Field name="phone" component={PhoneInputComponent} placeholder="Телефон" className={classnames({ invalid: errors.phone && touched.phone })} />
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
                        className="form-button form-page-button"
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
                        className="form-button form-page-button"
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

      <Modal className="coach-modal" onClose={handleCoachClose} active={!!Object.keys(coach).length}>
        <div className="coach-modal-content">
          <img className="coach-modal-image" src={coach.src} alt={coach.name} />
          <div className="modal-text">
            <p className="text-xl">{coach.name}</p>
            <ul className="coach-text-items">
              {coach?.text?.map((item) => (
                <li key={item} className="coach-text-item">
                  <div className="text-s" dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>

      <Modal className="schedule-modal" onClose={handleScheduleClick} active={scheduleActive}>
        <p className="title">Распорядок дня</p>
        <div className="schedule-modal-content">
          <ul className="schedule-items">
            {modalSchedule.map((item) => (
              <li key={item} className="schedule-item">
                <div className="text-s item" dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>
      </Modal>

    </>
  );
};

export default Camp;

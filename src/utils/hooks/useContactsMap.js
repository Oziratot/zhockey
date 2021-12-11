import { useEffect } from 'react';
import isMobileTablet from '../isMobileTablet';
import isTouchDevice from '../isTouchDevice';
import useYMaps from './useYMaps';

/**
 * @param {MutableRefObject} mapRef
 */
function useContactsMap(mapRef, disableZoomScroll) {
    const promise = useYMaps();

    useEffect(() => {
        let map = null;

        promise.then(() => {
            const MyIconContentLayout = window.ymaps.templateLayoutFactory.createClass(
                '<div style="color: #333333; font-size: 12px; font-weight: 500; background: rgba(255,255,255,.85); line-height: 14px; padding: 4px 10px 3px; width: 120px; margin-left: -60px; border-radius: 8px; position: relative; z-index: -1;">$[properties.iconCaption]</div>',
            );
            const state = {
                controls: [],
                center: [55.723577, 37.677014],
                zoom: 14,
            };
            const options = {
                yandexMapDisablePoiInteractivity: true,
            };
            map = new window.ymaps.Map(mapRef.current, state, options);
            const point = new window.ymaps.Placemark(state.center, {
                // iconCaption: 'Новоостаповская ул., 5 стр. 2',
            }, {
                iconLayout: 'default#imageWithContent',
                // Свое изображение иконки метки.
                iconImageHref: '/assets/svg/marker-red.svg',
                // iconCaption: 'Новоостаповская ул., 5 стр.2',
                // Размеры метки.
                iconImageSize: [35, 35],
                // Смещение левого верхнего угла иконки относительно
                // ее "ножки" (точки привязки).
                // iconImageOffset: [-35, 35],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                iconContentOffset: [0, 40],
                // balloonOffset: [20, 20],
                // Макет содержимого.
                iconContentLayout: MyIconContentLayout,
                // preset: 'islands#blueCircleDotIconWithCaption',
                // iconCaptionMaxWidth: '100',
                hideIconOnBalloonOpen: false,
                openBalloonOnClick: false,
            });

            if (disableZoomScroll) {
                map.behaviors.disable('scrollZoom');
                if ((isMobileTablet() || isTouchDevice()) && process.browser) {
                    import('ymaps-touch-scroll')
                        .then((module) => {
                            module.default(map);
                        });
                    // map.behaviors.disable('drag');
                }
            }

            map.controls.add('zoomControl', {
                size: 'auto',
            });
            map.geoObjects.add(point);
        });

        window.addEventListener('resize', handleWindowResize);

        return () => {
            map?.destroy(); // eslint-disable-line no-unused-expressions
            window.removeEventListener('resize', handleWindowResize);
        };

        function handleWindowResize() {
            map?.container.fitToViewport(); // eslint-disable-line no-unused-expressions
        }
    }, []);
}

export default useContactsMap;

import { useRef } from 'react';

// const YANDEX_MAP_API_KEY = '5ce85076-e770-4c57-b2fb-6e320c6af67c'; // TODO: ymaps api key

const noop = new Promise(() => {});

/**
 * @returns {Promise}
 */
function useYMaps() {
    const ref = useRef();

    if (process.browser) {
        if (!ref.current) {
            ref.current = new Promise((resolve, reject) => {
                if (typeof window.ymaps !== 'undefined') resolve();

                const script = document.createElement('script');
                const head = document.getElementsByTagName('head')[0];

                script.onload = () => resolve();
                script.onerror = () => reject();
                // script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAP_API_KEY}&lang=ru_RU`;
                script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
                script.type = 'text/javascript';
                script.async = true;

                head.appendChild(script);
            }).then(() => window.ymaps.ready());
        }
    } else {
        ref.current = noop; // never resolve
    }

    return ref.current;
}

export default useYMaps;

function useFbPixel() {
    return (...args) => {
        if (!process.browser || !('fbq' in window)) return;
        window.fbq(...args);
    };
}

export default useFbPixel;

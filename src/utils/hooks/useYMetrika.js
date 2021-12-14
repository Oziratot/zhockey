function useYMetrika() {
    return (...args) => {
        if (!process.browser || !('ym' in window)) return;
        window.ym(65395597, ...args);
    };
}

export default useYMetrika;

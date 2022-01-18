function useYMetrika() {
    return (...args) => {
        if (!process.browser || !('ym' in window)) return;
        window.ym(48349664, ...args);
    };
}

export default useYMetrika;

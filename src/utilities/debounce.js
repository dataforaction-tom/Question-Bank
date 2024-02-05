function debounce(func, delay) {
    let debounceTimer;
    return function(...args) {
        const context = this;
        console.log("Debouncing...");
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            console.log("invoking debounce");
            func.apply(context, args);
        }, delay);
    };
}

export default debounce;

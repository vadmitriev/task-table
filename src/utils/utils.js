export const selectTextInElement = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
};

export const debounce = (fn, ms) => {
    let timeout;
    return function() {
        const fnCall = () => { fn.apply(this, arguments) };

        clearTimeout(timeout);

        timeout = setTimeout(fnCall, ms);
    };
};

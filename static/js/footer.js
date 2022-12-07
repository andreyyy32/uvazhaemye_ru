(function() {
    'use strict';
    function changeFooter() {
        const windowSize = window.innerWidth;
        if (windowSize < 659) {
            footer.classList.add('footer-text1');
            footer.classList.remove('footer-text');
        }
    }
    const footer = document.querySelector('.footer-text');

    window.addEventListener('open', changeFooter)
})();


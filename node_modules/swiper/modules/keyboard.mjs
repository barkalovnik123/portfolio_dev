import { j as elementParents, h as elementOffset } from '../shared/utils.mjs';

const Keyboard = ({ swiper, extendParams, on, emit }) => {
    extendParams({
        keyboard: {
            enabled: false,
            onlyInViewport: true,
            pageUpDown: true,
            speed: undefined,
        },
    });
    function getParams() {
        return swiper.params.keyboard;
    }
    function handle(event) {
        if (!swiper.enabled)
            return;
        const { rtlTranslate: rtl } = swiper;
        const e = 'originalEvent' in event && event.originalEvent ? event.originalEvent : event;
        const kc = e.keyCode || e.charCode;
        const params = getParams();
        const pageUpDown = !!params.pageUpDown;
        const isPageUp = pageUpDown && kc === 33;
        const isPageDown = pageUpDown && kc === 34;
        const isArrowLeft = kc === 37;
        const isArrowRight = kc === 39;
        const isArrowUp = kc === 38;
        const isArrowDown = kc === 40;
        // Directions locks
        if (!swiper.allowSlideNext &&
            ((swiper.isHorizontal() && isArrowRight) ||
                (swiper.isVertical() && isArrowDown) ||
                isPageDown)) {
            return false;
        }
        if (!swiper.allowSlidePrev &&
            ((swiper.isHorizontal() && isArrowLeft) || (swiper.isVertical() && isArrowUp) || isPageUp)) {
            return false;
        }
        if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
            return undefined;
        }
        const activeElement = document.activeElement;
        if (activeElement &&
            (activeElement.isContentEditable ||
                (activeElement.nodeName &&
                    (activeElement.nodeName.toLowerCase() === 'input' ||
                        activeElement.nodeName.toLowerCase() === 'textarea')))) {
            return undefined;
        }
        if (params.onlyInViewport &&
            (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)) {
            let inView = false;
            // Check that swiper should be inside of visible area of window
            if (elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 &&
                elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0) {
                return undefined;
            }
            const el = swiper.el;
            const swiperWidth = el.clientWidth;
            const swiperHeight = el.clientHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const swiperOffset = elementOffset(el);
            if (rtl)
                swiperOffset.left -= el.scrollLeft;
            const swiperCoord = [
                [swiperOffset.left, swiperOffset.top],
                [swiperOffset.left + swiperWidth, swiperOffset.top],
                [swiperOffset.left, swiperOffset.top + swiperHeight],
                [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight],
            ];
            for (let i = 0; i < swiperCoord.length; i += 1) {
                const point = swiperCoord[i];
                if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
                    if (point[0] === 0 && point[1] === 0)
                        continue;
                    inView = true;
                }
            }
            if (!inView)
                return undefined;
        }
        const speed = params.speed;
        if (swiper.isHorizontal()) {
            if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
                if (e.cancelable)
                    e.preventDefault();
            }
            if (((isPageDown || isArrowRight) && !rtl) || ((isPageUp || isArrowLeft) && rtl))
                swiper.slideNext(speed);
            if (((isPageUp || isArrowLeft) && !rtl) || ((isPageDown || isArrowRight) && rtl))
                swiper.slidePrev(speed);
        }
        else {
            if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
                if (e.cancelable)
                    e.preventDefault();
            }
            if (isPageDown || isArrowDown)
                swiper.slideNext(speed);
            if (isPageUp || isArrowUp)
                swiper.slidePrev(speed);
        }
        emit('keyPress', kc);
        return undefined;
    }
    function enable() {
        if (swiper.keyboard.enabled)
            return;
        document.addEventListener('keydown', handle);
        swiper.keyboard.enabled = true;
    }
    function disable() {
        if (!swiper.keyboard.enabled)
            return;
        document.removeEventListener('keydown', handle);
        swiper.keyboard.enabled = false;
    }
    swiper.keyboard = {
        enabled: false,
        enable,
        disable,
    };
    on('init', () => {
        if (getParams().enabled) {
            enable();
        }
    });
    on('destroy', () => {
        if (swiper.keyboard.enabled) {
            disable();
        }
    });
};

export { Keyboard as default };

import { r as isObject, e as elementChildren } from '../shared/utils.mjs';

const Thumb = ({ swiper, extendParams, on }) => {
    extendParams({
        thumbs: {
            swiper: null,
            multipleActiveThumbs: true,
            autoScrollOffset: 0,
            slideThumbActiveClass: 'swiper-slide-thumb-active',
            thumbsContainerClass: 'swiper-thumbs',
        },
    });
    let initialized = false;
    let swiperCreated = false;
    swiper.thumbs = {
        swiper: null,
    };
    function getParams() {
        return swiper.params.thumbs;
    }
    function isVirtualEnabled() {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed)
            return false;
        const virtual = thumbsSwiper.params.virtual;
        return !!virtual && !!virtual.enabled;
    }
    function onThumbClick() {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed)
            return;
        const clickedIndex = thumbsSwiper.clickedIndex;
        const clickedSlide = thumbsSwiper.clickedSlide;
        const thumbsParams = getParams();
        if (clickedSlide && clickedSlide.classList.contains(thumbsParams.slideThumbActiveClass))
            return;
        if (typeof clickedIndex === 'undefined' || clickedIndex === null)
            return;
        let slideToIndex;
        if (thumbsSwiper.params.loop) {
            const attr = thumbsSwiper.clickedSlide?.getAttribute('data-swiper-slide-index');
            slideToIndex = attr == null ? clickedIndex : parseInt(attr, 10);
        }
        else {
            slideToIndex = clickedIndex;
        }
        if (swiper.params.loop) {
            swiper.slideToLoop(slideToIndex);
        }
        else {
            swiper.slideTo(slideToIndex);
        }
    }
    function init() {
        const thumbsParams = getParams();
        if (initialized)
            return false;
        initialized = true;
        const SwiperClass = swiper.constructor;
        if (thumbsParams.swiper instanceof SwiperClass) {
            if (thumbsParams.swiper.destroyed) {
                initialized = false;
                return false;
            }
            const thumbsSwiper = thumbsParams.swiper;
            swiper.thumbs.swiper = thumbsSwiper;
            Object.assign(thumbsSwiper.originalParams, {
                watchSlidesProgress: true,
                slideToClickedSlide: false,
            });
            Object.assign(thumbsSwiper.params, {
                watchSlidesProgress: true,
                slideToClickedSlide: false,
            });
            thumbsSwiper.update();
        }
        else if (isObject(thumbsParams.swiper)) {
            const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
            Object.assign(thumbsSwiperParams, {
                watchSlidesProgress: true,
                slideToClickedSlide: false,
            });
            swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
            swiperCreated = true;
        }
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper)
            return false;
        thumbsSwiper.el.classList.add(thumbsParams.thumbsContainerClass);
        thumbsSwiper.on('tap', onThumbClick);
        if (isVirtualEnabled()) {
            thumbsSwiper.on('virtualUpdate', () => {
                update(false, { autoScroll: false });
            });
        }
        return true;
    }
    function update(initial, p) {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed)
            return;
        // Activate thumbs
        let thumbsToActivate = 1;
        const thumbsParams = getParams();
        const thumbActiveClass = thumbsParams.slideThumbActiveClass;
        const slidesPerView = swiper.params.slidesPerView;
        if (typeof slidesPerView === 'number' && slidesPerView > 1 && !swiper.params.centeredSlides) {
            thumbsToActivate = slidesPerView;
        }
        if (!thumbsParams.multipleActiveThumbs) {
            thumbsToActivate = 1;
        }
        thumbsToActivate = Math.floor(thumbsToActivate);
        thumbsSwiper.slides.forEach((slideEl) => slideEl.classList.remove(thumbActiveClass));
        if (thumbsSwiper.params.loop || isVirtualEnabled()) {
            for (let i = 0; i < thumbsToActivate; i += 1) {
                elementChildren(thumbsSwiper.slidesEl, `[data-swiper-slide-index="${swiper.realIndex + i}"]`).forEach((slideEl) => {
                    slideEl.classList.add(thumbActiveClass);
                });
            }
        }
        else {
            for (let i = 0; i < thumbsToActivate; i += 1) {
                const slide = thumbsSwiper.slides[swiper.realIndex + i];
                if (slide) {
                    slide.classList.add(thumbActiveClass);
                }
            }
        }
        if (p?.autoScroll ?? true) {
            autoScroll(initial ? 0 : undefined);
        }
    }
    function autoScroll(slideSpeed) {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed)
            return;
        const thumbsSlidesPerView = thumbsSwiper.params.slidesPerView;
        const slidesPerView = thumbsSlidesPerView === 'auto'
            ? thumbsSwiper.slidesPerViewDynamic()
            : (thumbsSlidesPerView ?? 1);
        const autoScrollOffset = getParams().autoScrollOffset;
        const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
        if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
            const currentThumbsIndex = thumbsSwiper.activeIndex;
            let newThumbsIndex;
            let direction;
            if (thumbsSwiper.params.loop) {
                const newThumbsSlide = thumbsSwiper.slides.find((slideEl) => slideEl.getAttribute('data-swiper-slide-index') === `${swiper.realIndex}`);
                newThumbsIndex = newThumbsSlide ? thumbsSwiper.slides.indexOf(newThumbsSlide) : -1;
                direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
            }
            else {
                newThumbsIndex = swiper.realIndex;
                direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
            }
            if (useOffset) {
                newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
            }
            if (thumbsSwiper.visibleSlidesIndexes &&
                thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
                if (thumbsSwiper.params.centeredSlides) {
                    if (newThumbsIndex > currentThumbsIndex) {
                        newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
                    }
                    else {
                        newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
                    }
                }
                else if (newThumbsIndex > currentThumbsIndex &&
                    thumbsSwiper.params.slidesPerGroup === 1) ;
                thumbsSwiper.slideTo(newThumbsIndex, slideSpeed);
            }
        }
    }
    on('beforeInit', () => {
        const thumbs = swiper.params.thumbs;
        if (!thumbs || !thumbs.swiper)
            return;
        if (typeof thumbs.swiper === 'string' || thumbs.swiper instanceof HTMLElement) {
            const getThumbsElementAndInit = () => {
                const thumbsElement = typeof thumbs.swiper === 'string'
                    ? document.querySelector(thumbs.swiper)
                    : thumbs.swiper;
                if (thumbsElement && thumbsElement.swiper) {
                    thumbs.swiper = thumbsElement.swiper;
                    init();
                    update(true);
                }
                else if (thumbsElement) {
                    const eventName = `${swiper.params.eventsPrefix}init`;
                    const onThumbsSwiper = (e) => {
                        const detail = e.detail;
                        thumbs.swiper = detail[0];
                        thumbsElement.removeEventListener(eventName, onThumbsSwiper);
                        init();
                        update(true);
                        thumbs.swiper.update();
                        swiper.update();
                    };
                    thumbsElement.addEventListener(eventName, onThumbsSwiper);
                }
                return thumbsElement;
            };
            const watchForThumbsToAppear = () => {
                if (swiper.destroyed)
                    return;
                const thumbsElement = getThumbsElementAndInit();
                if (!thumbsElement) {
                    requestAnimationFrame(watchForThumbsToAppear);
                }
            };
            requestAnimationFrame(watchForThumbsToAppear);
        }
        else {
            init();
            update(true);
        }
    });
    on('slideChange update resize observerUpdate', () => {
        update();
    });
    on('setTransition', (_s, duration) => {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed)
            return;
        thumbsSwiper.setTransition(duration);
    });
    on('beforeDestroy', () => {
        const thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper || thumbsSwiper.destroyed)
            return;
        if (swiperCreated) {
            thumbsSwiper.destroy();
        }
    });
    Object.assign(swiper.thumbs, {
        init,
        update,
    });
};

export { Thumb as default };

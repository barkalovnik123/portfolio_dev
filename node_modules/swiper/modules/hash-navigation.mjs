import { e as elementChildren } from '../shared/utils.mjs';

const isVirtualEnabled = (swiper) => !!swiper.virtual && !!swiper.params.virtual?.enabled;
const HashNavigation = ({ swiper, extendParams, emit, on }) => {
    let initialized = false;
    extendParams({
        hashNavigation: {
            enabled: false,
            replaceState: false,
            watchState: false,
            getSlideIndex(_s, hash) {
                if (isVirtualEnabled(swiper)) {
                    const slideWithHash = swiper.slides.find((slideEl) => slideEl.getAttribute('data-hash') === hash);
                    if (!slideWithHash)
                        return 0;
                    const index = parseInt(slideWithHash.getAttribute('data-swiper-slide-index') || '0', 10);
                    return index;
                }
                const matched = elementChildren(swiper.slidesEl, `.${swiper.params.slideClass}[data-hash="${hash}"], swiper-slide[data-hash="${hash}"]`)[0];
                return matched ? swiper.getSlideIndex(matched) : 0;
            },
        },
    });
    function getParams() {
        return swiper.params.hashNavigation;
    }
    const onHashChange = () => {
        emit('hashChange');
        const newHash = document.location.hash.replace('#', '');
        const activeSlideEl = isVirtualEnabled(swiper)
            ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`)
            : swiper.slides[swiper.activeIndex];
        const activeSlideHash = activeSlideEl ? activeSlideEl.getAttribute('data-hash') : '';
        if (newHash !== activeSlideHash) {
            const newIndex = getParams().getSlideIndex(swiper, newHash);
            if (typeof newIndex === 'undefined' || Number.isNaN(newIndex))
                return;
            swiper.slideTo(newIndex);
        }
    };
    const setHash = () => {
        const params = getParams();
        if (!initialized || !params.enabled)
            return;
        const activeSlideEl = isVirtualEnabled(swiper)
            ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${swiper.activeIndex}"]`)
            : swiper.slides[swiper.activeIndex];
        const activeSlideHash = activeSlideEl
            ? activeSlideEl.getAttribute('data-hash') || activeSlideEl.getAttribute('data-history')
            : '';
        if (params.replaceState && window.history && window.history.replaceState) {
            window.history.replaceState(null, '', `#${activeSlideHash}` || '');
            emit('hashSet');
        }
        else {
            document.location.hash = activeSlideHash || '';
            emit('hashSet');
        }
    };
    const init = () => {
        const params = getParams();
        const historyParams = swiper.params.history;
        if (!params.enabled || (historyParams && historyParams.enabled))
            return;
        initialized = true;
        const hash = document.location.hash.replace('#', '');
        if (hash) {
            const speed = 0;
            const index = params.getSlideIndex(swiper, hash);
            swiper.slideTo(index || 0, speed, swiper.params.runCallbacksOnInit, true);
        }
        if (params.watchState) {
            window.addEventListener('hashchange', onHashChange);
        }
    };
    const destroy = () => {
        if (getParams().watchState) {
            window.removeEventListener('hashchange', onHashChange);
        }
    };
    on('init', () => {
        if (getParams().enabled) {
            init();
        }
    });
    on('destroy', () => {
        if (getParams().enabled) {
            destroy();
        }
    });
    on('transitionEnd _freeModeNoMomentumRelease', () => {
        if (initialized) {
            setHash();
        }
    });
    on('slideChange', () => {
        if (initialized && swiper.params.cssMode) {
            setHash();
        }
    });
};

export { HashNavigation as default };

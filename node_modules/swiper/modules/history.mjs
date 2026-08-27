const History = ({ swiper, extendParams, on }) => {
    extendParams({
        history: {
            enabled: false,
            root: '',
            replaceState: false,
            key: 'slides',
            keepQuery: false,
        },
    });
    let initialized = false;
    let paths = { key: undefined, value: undefined };
    function getParams() {
        return swiper.params.history;
    }
    const slugify = (text) => {
        return text
            .toString()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };
    const getPathValues = (urlOverride) => {
        let location;
        if (urlOverride) {
            location = new URL(urlOverride);
        }
        else {
            location = window.location;
        }
        const pathArray = location.pathname
            .slice(1)
            .split('/')
            .filter((part) => part !== '');
        const total = pathArray.length;
        const key = pathArray[total - 2];
        const value = pathArray[total - 1];
        return { key, value };
    };
    const setHistory = (key, index) => {
        const params = getParams();
        if (!initialized || !params.enabled)
            return;
        let location;
        if (swiper.params.url) {
            location = new URL(swiper.params.url);
        }
        else {
            location = window.location;
        }
        const isVirtualEnabled = !!swiper.params.virtual
            ?.enabled;
        const slide = swiper.virtual && isVirtualEnabled
            ? swiper.slidesEl.querySelector(`[data-swiper-slide-index="${index}"]`)
            : swiper.slides[index];
        if (!slide)
            return;
        let value = slugify(slide.getAttribute('data-history') || '');
        const root = params.root;
        if (root.length > 0) {
            const trimmedRoot = root[root.length - 1] === '/' ? root.slice(0, root.length - 1) : root;
            value = `${trimmedRoot}/${key ? `${key}/` : ''}${value}`;
        }
        else if (!location.pathname.includes(key || '')) {
            value = `${key ? `${key}/` : ''}${value}`;
        }
        if (params.keepQuery) {
            value += location.search;
        }
        const currentState = window.history.state;
        if (currentState && currentState.value === value) {
            return;
        }
        if (params.replaceState) {
            window.history.replaceState({ value }, '', value);
        }
        else {
            window.history.pushState({ value }, '', value);
        }
    };
    const scrollToSlide = (speed, value, runCallbacks) => {
        if (value) {
            for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
                const slide = swiper.slides[i];
                const slideHistory = slugify(slide.getAttribute('data-history') || '');
                if (slideHistory === value) {
                    const index = swiper.getSlideIndex(slide);
                    swiper.slideTo(index, speed, runCallbacks);
                }
            }
        }
        else {
            swiper.slideTo(0, speed, runCallbacks);
        }
    };
    const setHistoryPopState = () => {
        paths = getPathValues(swiper.params.url);
        scrollToSlide(swiper.params.speed, paths.value, false);
    };
    const init = () => {
        const params = swiper.params.history;
        if (!params)
            return;
        if (!window.history || !window.history.pushState) {
            params.enabled = false;
            const hashParams = swiper.params.hashNavigation;
            if (hashParams)
                hashParams.enabled = true;
            return;
        }
        initialized = true;
        paths = getPathValues(swiper.params.url);
        if (!paths.key && !paths.value) {
            if (!params.replaceState) {
                window.addEventListener('popstate', setHistoryPopState);
            }
            return;
        }
        scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);
        if (!params.replaceState) {
            window.addEventListener('popstate', setHistoryPopState);
        }
    };
    const destroy = () => {
        if (!getParams().replaceState) {
            window.removeEventListener('popstate', setHistoryPopState);
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
            setHistory(getParams().key, swiper.activeIndex);
        }
    });
    on('slideChange', () => {
        if (initialized && swiper.params.cssMode) {
            setHistory(getParams().key, swiper.activeIndex);
        }
    });
};

export { History as default };

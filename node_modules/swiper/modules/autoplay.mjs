const Autoplay = ({ swiper, extendParams, on, emit, params }) => {
    swiper.autoplay = {
        running: false,
        paused: false,
        timeLeft: 0,
    };
    extendParams({
        autoplay: {
            enabled: false,
            delay: 3000,
            waitForTransition: true,
            disableOnInteraction: false,
            stopOnLastSlide: false,
            reverseDirection: false,
            pauseOnMouseEnter: false,
        },
    });
    function getParams() {
        return swiper.params.autoplay;
    }
    // params here is the user-supplied passedParams; extendParams hasn't yet
    // merged the defaults into swiper.params.autoplay at this point.
    const initialAutoplayDelay = typeof params.autoplay === 'object' &&
        params.autoplay &&
        typeof params.autoplay.delay === 'number'
        ? params.autoplay.delay
        : 3000;
    let timeout;
    let raf;
    let autoplayDelayTotal = initialAutoplayDelay;
    let autoplayDelayCurrent = initialAutoplayDelay;
    let autoplayTimeLeft = 0;
    let autoplayStartTime = new Date().getTime();
    let wasPaused = false;
    let isTouched = false;
    let pausedByTouch = false;
    let touchStartTimeout;
    let pausedByInteraction = false;
    let pausedByPointerEnter = false;
    function onTransitionEnd(e) {
        if (!swiper || swiper.destroyed || !swiper.wrapperEl)
            return;
        if (e.target !== swiper.wrapperEl)
            return;
        swiper.wrapperEl.removeEventListener('transitionend', onTransitionEnd);
        const detail = e.detail;
        if (pausedByPointerEnter || (detail && detail.bySwiperTouchMove)) {
            return;
        }
        resume();
    }
    const calcTimeLeft = () => {
        if (swiper.destroyed || !swiper.autoplay.running)
            return;
        if (swiper.autoplay.paused) {
            wasPaused = true;
        }
        else if (wasPaused) {
            autoplayDelayCurrent = autoplayTimeLeft;
            wasPaused = false;
        }
        const timeLeft = swiper.autoplay.paused
            ? autoplayTimeLeft
            : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
        swiper.autoplay.timeLeft = timeLeft;
        emit('autoplayTimeLeft', timeLeft, timeLeft / autoplayDelayTotal);
        raf = requestAnimationFrame(() => {
            calcTimeLeft();
        });
    };
    const getSlideDelay = () => {
        let activeSlideEl;
        const virtualEnabled = !!swiper.params.virtual?.enabled;
        if (swiper.virtual && virtualEnabled) {
            activeSlideEl = swiper.slides.find((slideEl) => slideEl.classList.contains('swiper-slide-active'));
        }
        else {
            activeSlideEl = swiper.slides[swiper.activeIndex];
        }
        if (!activeSlideEl)
            return undefined;
        const attr = activeSlideEl.getAttribute('data-swiper-autoplay');
        if (attr == null)
            return undefined;
        return parseInt(attr, 10);
    };
    const getTotalDelay = () => {
        let totalDelay = getParams().delay;
        const currentSlideDelay = getSlideDelay();
        if (typeof currentSlideDelay === 'number' &&
            !Number.isNaN(currentSlideDelay) &&
            currentSlideDelay > 0) {
            totalDelay = currentSlideDelay;
        }
        return totalDelay;
    };
    const run = (delayForce) => {
        if (swiper.destroyed || !swiper.autoplay.running)
            return 0;
        if (raf !== undefined)
            cancelAnimationFrame(raf);
        calcTimeLeft();
        let delay = delayForce;
        if (typeof delay === 'undefined') {
            delay = getTotalDelay();
            autoplayDelayTotal = delay;
            autoplayDelayCurrent = delay;
        }
        autoplayTimeLeft = delay;
        const speed = swiper.params.speed;
        const proceed = () => {
            if (!swiper || swiper.destroyed)
                return;
            const autoplayParams = getParams();
            if (autoplayParams.reverseDirection) {
                if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
                    swiper.slidePrev(speed, true, true);
                    emit('autoplay');
                }
                else if (!autoplayParams.stopOnLastSlide) {
                    swiper.slideTo(swiper.slides.length - 1, speed, true, true);
                    emit('autoplay');
                }
            }
            else {
                if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
                    swiper.slideNext(speed, true, true);
                    emit('autoplay');
                }
                else if (!autoplayParams.stopOnLastSlide) {
                    swiper.slideTo(0, speed, true, true);
                    emit('autoplay');
                }
            }
            if (swiper.params.cssMode) {
                autoplayStartTime = new Date().getTime();
                requestAnimationFrame(() => {
                    run();
                });
            }
        };
        if (delay > 0) {
            if (timeout !== undefined)
                clearTimeout(timeout);
            timeout = setTimeout(() => {
                proceed();
            }, delay);
        }
        else {
            requestAnimationFrame(() => {
                proceed();
            });
        }
        return delay;
    };
    const start = () => {
        autoplayStartTime = new Date().getTime();
        swiper.autoplay.running = true;
        run();
        emit('autoplayStart');
        return true;
    };
    const stop = () => {
        swiper.autoplay.running = false;
        if (timeout !== undefined)
            clearTimeout(timeout);
        if (raf !== undefined)
            cancelAnimationFrame(raf);
        emit('autoplayStop');
        return true;
    };
    const pause = (internal, reset) => {
        if (swiper.destroyed || !swiper.autoplay.running)
            return;
        if (timeout !== undefined)
            clearTimeout(timeout);
        if (!internal) {
            pausedByInteraction = true;
        }
        const proceed = () => {
            emit('autoplayPause');
            if (getParams().waitForTransition) {
                swiper.wrapperEl.addEventListener('transitionend', onTransitionEnd);
            }
            else {
                resume();
            }
        };
        swiper.autoplay.paused = true;
        if (reset) {
            proceed();
            return;
        }
        const delay = autoplayTimeLeft || getParams().delay;
        autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
        if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop)
            return;
        if (autoplayTimeLeft < 0)
            autoplayTimeLeft = 0;
        proceed();
    };
    const resume = () => {
        if ((swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) ||
            swiper.destroyed ||
            !swiper.autoplay.running)
            return;
        autoplayStartTime = new Date().getTime();
        if (pausedByInteraction) {
            pausedByInteraction = false;
            run(autoplayTimeLeft);
        }
        else {
            run();
        }
        swiper.autoplay.paused = false;
        emit('autoplayResume');
    };
    const onVisibilityChange = () => {
        if (swiper.destroyed || !swiper.autoplay.running)
            return;
        if (document.visibilityState === 'hidden') {
            pausedByInteraction = true;
            pause(true);
        }
        if (document.visibilityState === 'visible') {
            resume();
        }
    };
    const onPointerEnter = (e) => {
        if (e.pointerType !== 'mouse')
            return;
        pausedByInteraction = true;
        pausedByPointerEnter = true;
        if (swiper.animating || swiper.autoplay.paused)
            return;
        pause(true);
    };
    const onPointerLeave = (e) => {
        if (e.pointerType !== 'mouse')
            return;
        pausedByPointerEnter = false;
        if (swiper.autoplay.paused) {
            resume();
        }
    };
    const attachMouseEvents = () => {
        if (getParams().pauseOnMouseEnter) {
            swiper.el.addEventListener('pointerenter', onPointerEnter);
            swiper.el.addEventListener('pointerleave', onPointerLeave);
        }
    };
    const detachMouseEvents = () => {
        if (swiper.el && typeof swiper.el !== 'string') {
            swiper.el.removeEventListener('pointerenter', onPointerEnter);
            swiper.el.removeEventListener('pointerleave', onPointerLeave);
        }
    };
    const attachDocumentEvents = () => {
        document.addEventListener('visibilitychange', onVisibilityChange);
    };
    const detachDocumentEvents = () => {
        document.removeEventListener('visibilitychange', onVisibilityChange);
    };
    on('init', () => {
        if (getParams().enabled) {
            attachMouseEvents();
            attachDocumentEvents();
            start();
        }
    });
    on('destroy', () => {
        detachMouseEvents();
        detachDocumentEvents();
        if (swiper.autoplay.running) {
            stop();
        }
    });
    on('_freeModeStaticRelease', () => {
        if (pausedByTouch || pausedByInteraction) {
            resume();
        }
    });
    on('_freeModeNoMomentumRelease', () => {
        if (!getParams().disableOnInteraction) {
            pause(true, true);
        }
        else {
            stop();
        }
    });
    on('beforeTransitionStart', (_s, _speed, internal) => {
        if (swiper.destroyed || !swiper.autoplay.running)
            return;
        if (internal || !getParams().disableOnInteraction) {
            pause(true, true);
        }
        else {
            stop();
        }
    });
    on('sliderFirstMove', () => {
        if (swiper.destroyed || !swiper.autoplay.running)
            return;
        if (getParams().disableOnInteraction) {
            stop();
            return;
        }
        isTouched = true;
        pausedByTouch = false;
        pausedByInteraction = false;
        touchStartTimeout = setTimeout(() => {
            pausedByInteraction = true;
            pausedByTouch = true;
            pause(true);
        }, 200);
    });
    on('touchEnd', () => {
        if (swiper.destroyed || !swiper.autoplay.running || !isTouched)
            return;
        if (touchStartTimeout !== undefined)
            clearTimeout(touchStartTimeout);
        if (timeout !== undefined)
            clearTimeout(timeout);
        if (getParams().disableOnInteraction) {
            pausedByTouch = false;
            isTouched = false;
            return;
        }
        if (pausedByTouch && swiper.params.cssMode)
            resume();
        pausedByTouch = false;
        isTouched = false;
    });
    on('slideChange', () => {
        if (swiper.destroyed || !swiper.autoplay.running)
            return;
        if (swiper.autoplay.paused) {
            autoplayTimeLeft = getTotalDelay();
            autoplayDelayTotal = getTotalDelay();
        }
    });
    Object.assign(swiper.autoplay, {
        start,
        stop,
        pause,
        resume,
    });
};

export { Autoplay as default };

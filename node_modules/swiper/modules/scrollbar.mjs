import { c as classesToSelector } from '../shared/classes-to-selector.mjs';
import { s as makeElementsArray, c as classesToTokens, a as createElement, t as nextTick, h as elementOffset } from '../shared/utils.mjs';
import { c as createElementIfNotDefined } from '../shared/create-element-if-not-defined.mjs';

const Scrollbar = ({ swiper, extendParams, on, emit }) => {
    let isTouched = false;
    let timeout = null;
    let dragTimeout = null;
    let dragStartPos = 0;
    let dragSize = 0;
    let trackSize = 0;
    let divider = 0;
    extendParams({
        scrollbar: {
            el: null,
            dragSize: 'auto',
            hide: false,
            draggable: false,
            snapOnRelease: true,
            lockClass: 'swiper-scrollbar-lock',
            dragClass: 'swiper-scrollbar-drag',
            scrollbarDisabledClass: 'swiper-scrollbar-disabled',
            horizontalClass: `swiper-scrollbar-horizontal`,
            verticalClass: `swiper-scrollbar-vertical`,
        },
    });
    // Initialized as a partial; remaining methods (updateSize, setTranslate,
    // init, destroy, enable, disable) attach after their definitions below.
    swiper.scrollbar = {
        el: null,
        dragEl: null,
    };
    function getParams() {
        return swiper.params.scrollbar;
    }
    function setTranslate() {
        const params = getParams();
        if (!params.el || !swiper.scrollbar.el)
            return;
        const { scrollbar, rtlTranslate: rtl } = swiper;
        const { dragEl, el } = scrollbar;
        const progress = swiper.params.loop ? (swiper.progressLoop ?? 0) : swiper.progress;
        let newSize = dragSize;
        let newPos = (trackSize - dragSize) * progress;
        if (rtl) {
            newPos = -newPos;
            if (newPos > 0) {
                newSize = dragSize - newPos;
                newPos = 0;
            }
            else if (-newPos + dragSize > trackSize) {
                newSize = trackSize + newPos;
            }
        }
        else if (newPos < 0) {
            newSize = dragSize + newPos;
            newPos = 0;
        }
        else if (newPos + dragSize > trackSize) {
            newSize = trackSize - newPos;
        }
        if (swiper.isHorizontal()) {
            dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
            dragEl.style.width = `${newSize}px`;
        }
        else {
            dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
            dragEl.style.height = `${newSize}px`;
        }
        if (params.hide) {
            if (timeout)
                clearTimeout(timeout);
            el.style.opacity = '1';
            timeout = setTimeout(() => {
                el.style.opacity = '0';
                el.style.transitionDuration = '400ms';
            }, 1000);
        }
    }
    function setTransition(duration) {
        if (!getParams().el || !swiper.scrollbar.el)
            return;
        swiper.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
    }
    function updateSize() {
        const params = getParams();
        if (!params.el || !swiper.scrollbar.el)
            return;
        const { scrollbar } = swiper;
        const { dragEl, el } = scrollbar;
        dragEl.style.width = '';
        dragEl.style.height = '';
        trackSize = swiper.isHorizontal() ? el.offsetWidth : el.offsetHeight;
        divider =
            swiper.size /
                (swiper.virtualSize +
                    (swiper.params.slidesOffsetBefore ?? 0) -
                    (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));
        if (params.dragSize === 'auto') {
            dragSize = trackSize * divider;
        }
        else {
            dragSize = parseInt(String(params.dragSize), 10);
        }
        if (swiper.isHorizontal()) {
            dragEl.style.width = `${dragSize}px`;
        }
        else {
            dragEl.style.height = `${dragSize}px`;
        }
        if (divider >= 1) {
            el.style.display = 'none';
        }
        else {
            el.style.display = '';
        }
        if (params.hide) {
            el.style.opacity = '0';
        }
        if (swiper.params.watchOverflow && swiper.enabled) {
            scrollbar.el.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
        }
    }
    function getPointerPosition(e) {
        if (swiper.isHorizontal()) {
            return e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        }
        return e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    }
    function setDragPosition(e) {
        const { scrollbar, rtlTranslate: rtl } = swiper;
        const { el } = scrollbar;
        let positionRatio;
        positionRatio =
            (getPointerPosition(e) -
                elementOffset(el)[swiper.isHorizontal() ? 'left' : 'top'] -
                (dragStartPos !== null ? dragStartPos : dragSize / 2)) /
                (trackSize - dragSize);
        positionRatio = Math.max(Math.min(positionRatio, 1), 0);
        if (rtl) {
            positionRatio = 1 - positionRatio;
        }
        const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
        swiper.updateProgress(position);
        swiper.setTranslate(position);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
    }
    function onDragStart(e) {
        const params = getParams();
        const { scrollbar, wrapperEl } = swiper;
        const { el, dragEl } = scrollbar;
        isTouched = true;
        dragStartPos =
            e.target === dragEl
                ? getPointerPosition(e) -
                    e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top']
                : null;
        e.preventDefault();
        e.stopPropagation();
        wrapperEl.style.transitionDuration = '100ms';
        dragEl.style.transitionDuration = '100ms';
        setDragPosition(e);
        if (dragTimeout)
            clearTimeout(dragTimeout);
        el.style.transitionDuration = '0ms';
        if (params.hide) {
            el.style.opacity = '1';
        }
        if (swiper.params.cssMode) {
            swiper.wrapperEl.style.scrollSnapType = 'none';
        }
        emit('scrollbarDragStart', e);
    }
    function onDragMove(e) {
        const { scrollbar, wrapperEl } = swiper;
        const { el, dragEl } = scrollbar;
        if (!isTouched)
            return;
        if (e.cancelable)
            e.preventDefault();
        setDragPosition(e);
        wrapperEl.style.transitionDuration = '0ms';
        el.style.transitionDuration = '0ms';
        dragEl.style.transitionDuration = '0ms';
        emit('scrollbarDragMove', e);
    }
    function onDragEnd(e) {
        const params = getParams();
        const { scrollbar, wrapperEl } = swiper;
        const { el } = scrollbar;
        if (!isTouched)
            return;
        isTouched = false;
        if (swiper.params.cssMode) {
            swiper.wrapperEl.style.scrollSnapType = '';
            wrapperEl.style.transitionDuration = '';
        }
        if (params.hide) {
            if (dragTimeout)
                clearTimeout(dragTimeout);
            dragTimeout = nextTick(() => {
                el.style.opacity = '0';
                el.style.transitionDuration = '400ms';
            }, 1000);
        }
        emit('scrollbarDragEnd', e);
        if (params.snapOnRelease) {
            swiper.slideToClosest();
        }
    }
    function events(method) {
        const { scrollbar, params } = swiper;
        const el = scrollbar.el;
        if (!el)
            return;
        const activeListener = params.passiveListeners ? { passive: false, capture: false } : false;
        const passiveListener = params.passiveListeners ? { passive: true, capture: false } : false;
        const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
        el[eventMethod]('pointerdown', onDragStart, activeListener);
        document[eventMethod]('pointermove', onDragMove, activeListener);
        document[eventMethod]('pointerup', onDragEnd, passiveListener);
    }
    function enableDraggable() {
        if (!getParams().el || !swiper.scrollbar.el)
            return;
        events('on');
    }
    function disableDraggable() {
        if (!getParams().el || !swiper.scrollbar.el)
            return;
        events('off');
    }
    function init() {
        const { scrollbar, el: swiperEl } = swiper;
        swiper.params.scrollbar = createElementIfNotDefined(swiper, swiper.originalParams.scrollbar, swiper.params.scrollbar, { el: 'swiper-scrollbar' });
        const params = getParams();
        if (!params.el)
            return;
        let el;
        if (typeof params.el === 'string' && swiper.isElement) {
            el = swiper.el.querySelector(params.el);
        }
        else {
            el = params.el;
        }
        if (!el && typeof params.el === 'string') {
            el = document.querySelectorAll(params.el);
            if (!el.length)
                return;
        }
        else if (!el) {
            el = params.el;
        }
        if (swiper.params.uniqueNavElements &&
            typeof params.el === 'string' &&
            el.length > 1 &&
            swiperEl.querySelectorAll(params.el).length === 1) {
            el = swiperEl.querySelector(params.el);
        }
        if (el.length > 0) {
            el = el[0];
        }
        const elTyped = el;
        elTyped.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        let dragEl = null;
        if (elTyped) {
            dragEl = elTyped.querySelector(classesToSelector(params.dragClass));
            if (!dragEl) {
                dragEl = createElement('div', params.dragClass);
                elTyped.append(dragEl);
            }
        }
        Object.assign(scrollbar, {
            el: elTyped,
            dragEl,
        });
        if (params.draggable) {
            enableDraggable();
        }
        if (elTyped) {
            elTyped.classList[swiper.enabled ? 'remove' : 'add'](...classesToTokens(params.lockClass));
        }
    }
    function destroy() {
        const params = getParams();
        const el = swiper.scrollbar.el;
        if (el) {
            el.classList.remove(...classesToTokens(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass));
        }
        disableDraggable();
    }
    on('changeDirection', () => {
        if (!swiper.scrollbar || !swiper.scrollbar.el)
            return;
        const params = getParams();
        const els = makeElementsArray(swiper.scrollbar.el);
        els.forEach((subEl) => {
            subEl.classList.remove(params.horizontalClass, params.verticalClass);
            subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        });
    });
    on('init', () => {
        if (getParams().enabled === false) {
            disable();
        }
        else {
            init();
            updateSize();
            setTranslate();
        }
    });
    on('update resize observerUpdate lock unlock changeDirection', () => {
        updateSize();
    });
    on('setTranslate', () => {
        setTranslate();
    });
    on('setTransition', (_s, duration) => {
        setTransition(duration);
    });
    on('enable disable', () => {
        const { el } = swiper.scrollbar;
        if (el) {
            el.classList[swiper.enabled ? 'remove' : 'add'](...classesToTokens(getParams().lockClass));
        }
    });
    on('destroy', () => {
        destroy();
    });
    const enable = () => {
        const params = getParams();
        swiper.el.classList.remove(...classesToTokens(params.scrollbarDisabledClass));
        if (swiper.scrollbar.el) {
            swiper.scrollbar.el.classList.remove(...classesToTokens(params.scrollbarDisabledClass));
        }
        init();
        updateSize();
        setTranslate();
    };
    const disable = () => {
        const params = getParams();
        swiper.el.classList.add(...classesToTokens(params.scrollbarDisabledClass));
        if (swiper.scrollbar.el) {
            swiper.scrollbar.el.classList.add(...classesToTokens(params.scrollbarDisabledClass));
        }
        destroy();
    };
    Object.assign(swiper.scrollbar, {
        enable,
        disable,
        updateSize,
        setTranslate,
        init,
        destroy,
    });
};

export { Scrollbar as default };

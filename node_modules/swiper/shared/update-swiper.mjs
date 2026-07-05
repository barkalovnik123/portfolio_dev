import { w as setInnerHTML } from './utils.mjs';

/* underscore in name -> watch for changes */
const paramsList = [
    'eventsPrefix',
    'injectStyles',
    'injectStylesUrls',
    'modules',
    'init',
    '_direction',
    'oneWayMovement',
    'swiperElementNodeName',
    'touchEventsTarget',
    'initialSlide',
    '_speed',
    'cssMode',
    'updateOnWindowResize',
    'resizeObserver',
    'nested',
    'focusableElements',
    '_enabled',
    '_width',
    '_height',
    'preventInteractionOnTransition',
    'userAgent',
    'url',
    '_edgeSwipeDetection',
    '_edgeSwipeThreshold',
    '_freeMode',
    '_autoHeight',
    'setWrapperSize',
    'virtualTranslate',
    '_effect',
    'breakpoints',
    'breakpointsBase',
    '_spaceBetween',
    '_slidesPerView',
    'maxBackfaceHiddenSlides',
    '_grid',
    '_slidesPerGroup',
    '_slidesPerGroupSkip',
    '_slidesPerGroupAuto',
    '_centeredSlides',
    '_centeredSlidesBounds',
    '_slidesOffsetBefore',
    '_slidesOffsetAfter',
    'normalizeSlideIndex',
    '_centerInsufficientSlides',
    '_snapToSlideEdge',
    '_watchOverflow',
    'roundLengths',
    'touchRatio',
    'touchAngle',
    'simulateTouch',
    '_shortSwipes',
    '_longSwipes',
    'longSwipesRatio',
    'longSwipesMs',
    '_followFinger',
    'allowTouchMove',
    '_threshold',
    'touchMoveStopPropagation',
    'touchStartPreventDefault',
    'touchStartForcePreventDefault',
    'touchReleaseOnEdges',
    'uniqueNavElements',
    '_resistance',
    '_resistanceRatio',
    '_watchSlidesProgress',
    '_grabCursor',
    'preventClicks',
    'preventClicksPropagation',
    '_slideToClickedSlide',
    '_loop',
    'loopAdditionalSlides',
    'loopAddBlankSlides',
    'loopPreventsSliding',
    '_rewind',
    '_allowSlidePrev',
    '_allowSlideNext',
    '_swipeHandler',
    '_noSwiping',
    'noSwipingClass',
    'noSwipingSelector',
    'passiveListeners',
    'containerModifierClass',
    'slideClass',
    'slideActiveClass',
    'slideVisibleClass',
    'slideFullyVisibleClass',
    'slideNextClass',
    'slidePrevClass',
    'slideBlankClass',
    'wrapperClass',
    'lazyPreloaderClass',
    'lazyPreloadPrevNext',
    'runCallbacksOnInit',
    'observer',
    'observeParents',
    'observeSlideChildren',
    // modules
    'a11y',
    '_autoplay',
    '_controller',
    'coverflowEffect',
    'cubeEffect',
    'fadeEffect',
    'flipEffect',
    'creativeEffect',
    'cardsEffect',
    'hashNavigation',
    'history',
    'keyboard',
    'mousewheel',
    '_navigation',
    '_pagination',
    'parallax',
    '_scrollbar',
    '_thumbs',
    'virtual',
    'zoom',
    'control',
];

function isObject(o) {
    if (typeof o !== 'object' || o === null)
        return false;
    const obj = o;
    return (!!obj.constructor &&
        Object.prototype.toString.call(obj).slice(8, -1) === 'Object' &&
        !obj.__swiper__);
}
function extend(target, src) {
    const noExtend = ['__proto__', 'constructor', 'prototype'];
    const t = target;
    const s = src;
    Object.keys(s)
        .filter((key) => noExtend.indexOf(key) < 0)
        .forEach((key) => {
        const srcVal = s[key];
        const targetVal = t[key];
        if (typeof targetVal === 'undefined') {
            t[key] = srcVal;
        }
        else if (isObject(srcVal) && isObject(targetVal) && Object.keys(srcVal).length > 0) {
            if (srcVal.__swiper__) {
                t[key] = srcVal;
            }
            else {
                extend(targetVal, srcVal);
            }
        }
        else {
            t[key] = srcVal;
        }
    });
    return target;
}
function needsNavigation(params = {}) {
    const nav = params.navigation;
    if (!nav)
        return false;
    if (nav === true)
        return true;
    return typeof nav.nextEl === 'undefined' && typeof nav.prevEl === 'undefined';
}
function needsPagination(params = {}) {
    const pag = params.pagination;
    if (!pag)
        return false;
    if (pag === true)
        return true;
    return typeof pag.el === 'undefined';
}
function needsScrollbar(params = {}) {
    const sb = params.scrollbar;
    if (!sb)
        return false;
    if (sb === true)
        return true;
    return typeof sb.el === 'undefined';
}
function uniqueClasses(classNames = '') {
    const classes = classNames
        .split(' ')
        .map((c) => c.trim())
        .filter((c) => !!c);
    const unique = [];
    classes.forEach((c) => {
        if (unique.indexOf(c) < 0)
            unique.push(c);
    });
    return unique.join(' ');
}
function attrToProp(attrName = '') {
    return attrName.replace(/-[a-z]/g, (l) => l.toUpperCase().replace('-', ''));
}
function wrapperClass(className = '') {
    if (!className)
        return 'swiper-wrapper';
    if (!className.includes('swiper-wrapper'))
        return `swiper-wrapper ${className}`;
    return className;
}

function updateSwiper(args) {
    let { nextEl, prevEl, scrollbarEl, paginationEl } = args;
    const { swiper, slides, passedParams, changedParams } = args;
    const updateParams = changedParams.filter((key) => key !== 'children' && key !== 'direction' && key !== 'wrapperClass');
    const { params: currentParams, pagination, navigation, scrollbar, virtual, thumbs } = swiper;
    const passed = passedParams;
    const current = currentParams;
    let needThumbsInit;
    let needControllerInit;
    let needPaginationInit;
    let needScrollbarInit;
    let needNavigationInit;
    let loopNeedDestroy;
    let loopNeedEnable;
    let loopNeedReloop;
    const passedThumbs = passed.thumbs;
    const currentThumbs = current.thumbs;
    if (changedParams.includes('thumbs') &&
        isObject(passedThumbs) &&
        isObject(passedThumbs.swiper) &&
        !passedThumbs.swiper.destroyed &&
        isObject(currentThumbs) &&
        (!currentThumbs.swiper || currentThumbs.swiper.destroyed)) {
        needThumbsInit = true;
    }
    const passedController = passed.controller;
    const currentController = current.controller;
    if (changedParams.includes('controller') &&
        isObject(passedController) &&
        passedController.control &&
        isObject(currentController) &&
        !currentController.control) {
        needControllerInit = true;
    }
    const passedPagination = passed.pagination;
    if (changedParams.includes('pagination') &&
        isObject(passedPagination) &&
        (passedPagination.el || paginationEl) &&
        (current.pagination || current.pagination === false) &&
        pagination &&
        !pagination.el) {
        needPaginationInit = true;
    }
    const passedScrollbar = passed.scrollbar;
    if (changedParams.includes('scrollbar') &&
        isObject(passedScrollbar) &&
        (passedScrollbar.el || scrollbarEl) &&
        (current.scrollbar || current.scrollbar === false) &&
        scrollbar &&
        !scrollbar.el) {
        needScrollbarInit = true;
    }
    const passedNavigation = passed.navigation;
    if (changedParams.includes('navigation') &&
        isObject(passedNavigation) &&
        (passedNavigation.prevEl || prevEl) &&
        (passedNavigation.nextEl || nextEl) &&
        (current.navigation || current.navigation === false) &&
        navigation &&
        !navigation.prevEl &&
        !navigation.nextEl) {
        needNavigationInit = true;
    }
    const destroyModule = (mod) => {
        const moduleInstance = swiper[mod];
        if (!moduleInstance)
            return;
        moduleInstance.destroy();
        const currentModule = current[mod];
        const currentObj = isObject(currentModule) ? currentModule : undefined;
        if (mod === 'navigation') {
            if (swiper.isElement) {
                moduleInstance.prevEl?.remove();
                moduleInstance.nextEl?.remove();
            }
            if (currentObj) {
                currentObj.prevEl = undefined;
                currentObj.nextEl = undefined;
            }
            moduleInstance.prevEl = undefined;
            moduleInstance.nextEl = undefined;
        }
        else {
            if (swiper.isElement) {
                moduleInstance.el?.remove();
            }
            if (currentObj)
                currentObj.el = undefined;
            moduleInstance.el = undefined;
        }
    };
    if (changedParams.includes('loop') && swiper.isElement) {
        if (currentParams.loop && !passedParams.loop) {
            loopNeedDestroy = true;
        }
        else if (!currentParams.loop && passedParams.loop) {
            loopNeedEnable = true;
        }
        else {
            loopNeedReloop = true;
        }
    }
    updateParams.forEach((key) => {
        const currentValue = current[key];
        const passedValue = passed[key];
        if (isObject(currentValue) && isObject(passedValue)) {
            Object.assign(currentValue, passedValue);
            if ((key === 'navigation' || key === 'pagination' || key === 'scrollbar') &&
                'enabled' in passedValue &&
                !passedValue.enabled) {
                destroyModule(key);
            }
        }
        else {
            if ((passedValue === true || passedValue === false) &&
                (key === 'navigation' || key === 'pagination' || key === 'scrollbar')) {
                if (passedValue === false) {
                    destroyModule(key);
                }
            }
            else {
                current[key] = passedValue;
            }
        }
    });
    if (updateParams.includes('controller') &&
        !needControllerInit &&
        swiper.controller &&
        swiper.controller.control &&
        isObject(currentController) &&
        currentController.control) {
        swiper.controller.control = currentController.control;
    }
    if (changedParams.includes('children') && slides && virtual && currentParams.virtual?.enabled) {
        virtual.slides = slides;
        virtual.update(true);
    }
    else if (changedParams.includes('virtual') && virtual && currentParams.virtual?.enabled) {
        if (slides)
            virtual.slides = slides;
        virtual.update(true);
    }
    if (changedParams.includes('children') && slides && currentParams.loop) {
        loopNeedReloop = true;
    }
    if (needThumbsInit && thumbs) {
        const initialized = thumbs.init();
        if (initialized)
            thumbs.update(true);
    }
    if (needControllerInit && swiper.controller && isObject(currentController)) {
        swiper.controller.control = currentController.control;
    }
    if (needPaginationInit && pagination) {
        if (swiper.isElement && (!paginationEl || typeof paginationEl === 'string')) {
            const el = document.createElement('div');
            el.classList.add('swiper-pagination');
            el.part.add('pagination');
            swiper.el.appendChild(el);
            paginationEl = el;
        }
        const paginationParams = current.pagination;
        if (paginationEl && isObject(paginationParams))
            paginationParams.el = paginationEl;
        pagination.init();
        pagination.render();
        pagination.update();
    }
    if (needScrollbarInit && scrollbar) {
        if (swiper.isElement && (!scrollbarEl || typeof scrollbarEl === 'string')) {
            const el = document.createElement('div');
            el.classList.add('swiper-scrollbar');
            el.part.add('scrollbar');
            swiper.el.appendChild(el);
            scrollbarEl = el;
        }
        const scrollbarParams = current.scrollbar;
        if (scrollbarEl && isObject(scrollbarParams))
            scrollbarParams.el = scrollbarEl;
        scrollbar.init();
        scrollbar.updateSize();
        scrollbar.setTranslate();
    }
    if (needNavigationInit && navigation) {
        if (swiper.isElement) {
            if (!nextEl || typeof nextEl === 'string') {
                const el = document.createElement('div');
                el.classList.add('swiper-button-next');
                setInnerHTML(el, navigation.arrowSvg);
                el.part.add('button-next');
                swiper.el.appendChild(el);
                nextEl = el;
            }
            if (!prevEl || typeof prevEl === 'string') {
                const el = document.createElement('div');
                el.classList.add('swiper-button-prev');
                setInnerHTML(el, navigation.arrowSvg);
                el.part.add('button-prev');
                swiper.el.appendChild(el);
                prevEl = el;
            }
        }
        const navigationParams = current.navigation;
        if (nextEl && isObject(navigationParams))
            navigationParams.nextEl = nextEl;
        if (prevEl && isObject(navigationParams))
            navigationParams.prevEl = prevEl;
        navigation.init();
        navigation.update();
    }
    if (changedParams.includes('allowSlideNext')) {
        swiper.allowSlideNext = passed.allowSlideNext;
    }
    if (changedParams.includes('allowSlidePrev')) {
        swiper.allowSlidePrev = passed.allowSlidePrev;
    }
    if (changedParams.includes('direction')) {
        swiper.changeDirection(passed.direction, false);
    }
    if (loopNeedDestroy || loopNeedReloop) {
        swiper.loopDestroy();
    }
    if (loopNeedEnable || loopNeedReloop) {
        swiper.loopCreate();
    }
    swiper.update();
}

export { attrToProp as a, needsPagination as b, needsScrollbar as c, updateSwiper as d, extend as e, isObject as i, needsNavigation as n, paramsList as p, uniqueClasses as u, wrapperClass as w };

import { p as paramsList, i as isObject, e as extend, n as needsNavigation, b as needsPagination, c as needsScrollbar } from './update-swiper.mjs';
import { d as defaults } from './swiper-core.mjs';

function getChangedParams(swiperParams, oldParams, children, oldChildren, getKey) {
    const keys = [];
    if (!oldParams)
        return keys;
    const addKey = (key) => {
        if (keys.indexOf(key) < 0)
            keys.push(key);
    };
    if (children && oldChildren) {
        const oldChildrenKeys = oldChildren.map(getKey);
        const childrenKeys = children.map(getKey);
        if (oldChildrenKeys.join('') !== childrenKeys.join(''))
            addKey('children');
        if (oldChildren.length !== children.length)
            addKey('children');
    }
    const watchParams = paramsList.filter((key) => key[0] === '_').map((key) => key.replace(/_/, ''));
    watchParams.forEach((key) => {
        if (key in swiperParams && key in oldParams) {
            const newVal = swiperParams[key];
            const oldVal = oldParams[key];
            if (isObject(newVal) && isObject(oldVal)) {
                const newKeys = Object.keys(newVal);
                const oldKeys = Object.keys(oldVal);
                if (newKeys.length !== oldKeys.length) {
                    addKey(key);
                }
                else {
                    newKeys.forEach((newKey) => {
                        if (newVal[newKey] !== oldVal[newKey]) {
                            addKey(key);
                        }
                    });
                    oldKeys.forEach((oldKey) => {
                        if (newVal[oldKey] !== oldVal[oldKey])
                            addKey(key);
                    });
                }
            }
            else if (newVal !== oldVal) {
                addKey(key);
            }
        }
    });
    return keys;
}

function getParams(obj = {}, splitEvents = true) {
    // Build the params object as a loose Record so dynamic key writes are well-typed,
    // then return it under its precise public shape.
    const params = { on: {} };
    const events = {};
    const passedParams = {};
    extend(params, defaults);
    params._emitClasses = true;
    params.init = false;
    const rest = {};
    const allowedParams = paramsList.map((key) => key.replace(/_/, ''));
    const plainObj = { ...obj };
    Object.keys(plainObj).forEach((key) => {
        const value = obj[key];
        if (typeof value === 'undefined')
            return;
        if (allowedParams.indexOf(key) >= 0) {
            if (isObject(value)) {
                params[key] = {};
                passedParams[key] = {};
                extend(params[key], value);
                extend(passedParams[key], value);
            }
            else {
                params[key] = value;
                passedParams[key] = value;
            }
        }
        else if (key.search(/on[A-Z]/) === 0 && typeof value === 'function') {
            const eventName = `${key[2].toLowerCase()}${key.substring(3)}`;
            const handler = value;
            if (splitEvents) {
                events[eventName] = handler;
            }
            else {
                params.on[eventName] = handler;
            }
        }
        else {
            rest[key] = value;
        }
    });
    ['navigation', 'pagination', 'scrollbar'].forEach((key) => {
        if (params[key] === true)
            params[key] = {};
        if (params[key] === false)
            delete params[key];
    });
    return { params: params, passedParams, rest, events };
}

function mountSwiper(refs, swiperParams) {
    const { el, nextEl, prevEl, paginationEl, scrollbarEl, swiper } = refs;
    if (needsNavigation(swiperParams) && nextEl && prevEl) {
        const params = swiper.params.navigation;
        const original = swiper.originalParams.navigation;
        params.nextEl = nextEl;
        original.nextEl = nextEl;
        params.prevEl = prevEl;
        original.prevEl = prevEl;
    }
    if (needsPagination(swiperParams) && paginationEl) {
        swiper.params.pagination.el = paginationEl;
        swiper.originalParams.pagination.el = paginationEl;
    }
    if (needsScrollbar(swiperParams) && scrollbarEl) {
        swiper.params.scrollbar.el = scrollbarEl;
        swiper.originalParams.scrollbar.el = scrollbarEl;
    }
    swiper.init(el);
}

const updateOnVirtualData = (swiper) => {
    if (!swiper ||
        swiper.destroyed ||
        !swiper.params.virtual ||
        (swiper.params.virtual && !swiper.params.virtual.enabled))
        return;
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    swiper.emit('_virtualUpdated');
    if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
        swiper.parallax.setTranslate?.();
    }
};

export { getParams as a, getChangedParams as g, mountSwiper as m, updateOnVirtualData as u };

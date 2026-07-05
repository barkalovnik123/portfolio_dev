/**
 * Swiper React 14.0.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2026 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: June 29, 2026
 */

import React, { createContext, useContext, useEffect, useLayoutEffect, forwardRef, useState, useRef } from 'react';
import { a as getParams, m as mountSwiper, g as getChangedParams, u as updateOnVirtualData } from './shared/update-on-virtual-data.mjs';
import { u as uniqueClasses, w as wrapperClass, n as needsNavigation, c as needsScrollbar, b as needsPagination, e as extend, d as updateSwiper } from './shared/update-swiper.mjs';
import { S as Swiper$1 } from './shared/swiper-core.mjs';

const SwiperSlideContext = createContext(null);
const useSwiperSlide = () => useContext(SwiperSlideContext);
const SwiperContext = createContext(null);
const useSwiper = () => useContext(SwiperContext);

function isReactElement(child) {
    return (typeof child === 'object' &&
        child !== null &&
        'type' in child &&
        'props' in child);
}
function isChildSwiperSlide(child) {
    if (!isReactElement(child))
        return false;
    const { type } = child;
    if (typeof type !== 'function' && typeof type !== 'object')
        return false;
    const displayName = type.displayName;
    return !!displayName && displayName.includes('SwiperSlide');
}
function processChildren(c) {
    const slides = [];
    React.Children.toArray(c).forEach((child) => {
        if (isChildSwiperSlide(child)) {
            slides.push(child);
        }
        else if (isReactElement(child) && child.props && child.props.children) {
            processChildren(child.props.children).forEach((slide) => slides.push(slide));
        }
    });
    return slides;
}
function getChildren(c) {
    const slides = [];
    const slots = {
        'container-start': [],
        'container-end': [],
        'wrapper-start': [],
        'wrapper-end': [],
    };
    React.Children.toArray(c).forEach((child) => {
        if (isChildSwiperSlide(child)) {
            slides.push(child);
        }
        else if (isReactElement(child) &&
            child.props &&
            child.props.slot &&
            child.props.slot in slots) {
            slots[child.props.slot].push(child);
        }
        else if (isReactElement(child) && child.props && child.props.children) {
            const foundSlides = processChildren(child.props.children);
            if (foundSlides.length > 0) {
                foundSlides.forEach((slide) => slides.push(slide));
            }
            else {
                slots['container-end'].push(child);
            }
        }
        else if (isReactElement(child)) {
            slots['container-end'].push(child);
        }
    });
    return { slides, slots };
}

function useIsomorphicLayoutEffect(callback, deps) {
    if (typeof window === 'undefined')
        return useEffect(callback, deps);
    return useLayoutEffect(callback, deps);
}

function renderVirtual(swiper, slides, virtualData) {
    if (!virtualData || !swiper)
        return null;
    const getSlideIndex = (index) => {
        let slideIndex = index;
        if (index < 0) {
            slideIndex = slides.length + index;
        }
        else if (slideIndex >= slides.length) {
            slideIndex -= slides.length;
        }
        return slideIndex;
    };
    const style = swiper.isHorizontal()
        ? {
            [swiper.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
        }
        : {
            top: `${virtualData.offset}px`,
        };
    const { from, to } = virtualData;
    const loopFrom = swiper.params.loop ? -slides.length : 0;
    const loopTo = swiper.params.loop ? slides.length * 2 : slides.length;
    const slidesToRender = [];
    for (let i = loopFrom; i < loopTo; i += 1) {
        if (i >= from && i <= to) {
            const slide = slides[getSlideIndex(i)];
            if (slide)
                slidesToRender.push(slide);
        }
    }
    return slidesToRender.map((child, index) => {
        const virtualIndex = child.props.virtualIndex;
        return React.cloneElement(child, {
            swiper,
            style,
            key: virtualIndex || child.key || `slide-${index}`,
        });
    });
}

const Swiper = forwardRef(function Swiper(propsArg, externalElRef) {
    const { className, tag: Tag = 'div', wrapperTag: WrapperTag = 'div', children, onSwiper, ...rest } = propsArg ?? {};
    let eventsAssigned = false;
    const [containerClasses, setContainerClasses] = useState('swiper');
    const [virtualData, setVirtualData] = useState(null);
    const [breakpointChanged, setBreakpointChanged] = useState(false);
    const initializedRef = useRef(false);
    const swiperElRef = useRef(null);
    const swiperRef = useRef(null);
    const oldPassedParamsRef = useRef(null);
    const oldSlides = useRef(null);
    const nextElRef = useRef(null);
    const prevElRef = useRef(null);
    const paginationElRef = useRef(null);
    const scrollbarElRef = useRef(null);
    const { params: swiperParams, passedParams, rest: restProps, events, } = getParams(rest);
    const { slides, slots } = getChildren(children);
    const onBeforeBreakpoint = () => {
        setBreakpointChanged(!breakpointChanged);
    };
    Object.assign(swiperParams.on, {
        _containerClasses(_swiper, classes) {
            setContainerClasses(classes);
        },
    });
    const initSwiper = () => {
        Object.assign(swiperParams.on, events);
        eventsAssigned = true;
        const passParams = { ...swiperParams };
        delete passParams.wrapperClass;
        swiperRef.current = new Swiper$1(passParams);
        const instance = swiperRef.current;
        if (instance.virtual && instance.params.virtual?.enabled) {
            instance.virtual.slides = slides;
            const extendWith = {
                cache: false,
                slides,
                renderExternal: setVirtualData,
                renderExternalUpdate: false,
            };
            extend(instance.params.virtual, extendWith);
            if (instance.originalParams.virtual)
                extend(instance.originalParams.virtual, extendWith);
        }
    };
    if (!swiperElRef.current) {
        initSwiper();
    }
    if (swiperRef.current) {
        swiperRef.current.on('_beforeBreakpoint', onBeforeBreakpoint);
    }
    const attachEvents = () => {
        if (eventsAssigned || !events || !swiperRef.current)
            return;
        Object.keys(events).forEach((eventName) => {
            swiperRef.current.on(eventName, events[eventName]);
        });
    };
    const detachEvents = () => {
        if (!events || !swiperRef.current)
            return;
        Object.keys(events).forEach((eventName) => {
            swiperRef.current.off(eventName, events[eventName]);
        });
    };
    useEffect(() => {
        return () => {
            if (swiperRef.current)
                swiperRef.current.off('_beforeBreakpoint', onBeforeBreakpoint);
        };
    });
    useEffect(() => {
        if (!initializedRef.current && swiperRef.current) {
            swiperRef.current.emitSlidesClasses();
            initializedRef.current = true;
        }
    });
    useIsomorphicLayoutEffect(() => {
        if (externalElRef) {
            if (typeof externalElRef === 'function') {
                externalElRef(swiperElRef.current);
            }
            else {
                externalElRef.current = swiperElRef.current;
            }
        }
        if (!swiperElRef.current)
            return;
        if (swiperRef.current && swiperRef.current.destroyed) {
            initSwiper();
        }
        mountSwiper({
            el: swiperElRef.current,
            nextEl: nextElRef.current,
            prevEl: prevElRef.current,
            paginationEl: paginationElRef.current,
            scrollbarEl: scrollbarElRef.current,
            swiper: swiperRef.current,
        }, swiperParams);
        if (onSwiper && swiperRef.current && !swiperRef.current.destroyed)
            onSwiper(swiperRef.current);
        return () => {
            if (swiperRef.current && !swiperRef.current.destroyed) {
                swiperRef.current.destroy(true, false);
            }
        };
    }, []);
    useIsomorphicLayoutEffect(() => {
        attachEvents();
        const changedParams = getChangedParams(passedParams, oldPassedParamsRef.current, slides, oldSlides.current, (c) => c.key);
        oldPassedParamsRef.current = passedParams;
        oldSlides.current = slides;
        if (changedParams.length && swiperRef.current && !swiperRef.current.destroyed) {
            updateSwiper({
                swiper: swiperRef.current,
                slides,
                passedParams,
                changedParams,
                nextEl: nextElRef.current,
                prevEl: prevElRef.current,
                scrollbarEl: scrollbarElRef.current,
                paginationEl: paginationElRef.current,
            });
        }
        return () => {
            detachEvents();
        };
    });
    useIsomorphicLayoutEffect(() => {
        updateOnVirtualData(swiperRef.current);
    }, [virtualData]);
    function renderSlides() {
        if (swiperParams.virtual) {
            return renderVirtual(swiperRef.current, slides, virtualData);
        }
        return slides.map((child, index) => React.cloneElement(child, { swiper: swiperRef.current, swiperSlideIndex: index }));
    }
    const TagComponent = Tag;
    const WrapperComponent = WrapperTag;
    return (React.createElement(TagComponent, { ref: swiperElRef, className: uniqueClasses(`${containerClasses}${className ? ` ${className}` : ''}`), ...restProps },
        React.createElement(SwiperContext.Provider, { value: swiperRef.current },
            slots['container-start'],
            React.createElement(WrapperComponent, { className: wrapperClass(swiperParams.wrapperClass) },
                slots['wrapper-start'],
                renderSlides(),
                slots['wrapper-end']),
            needsNavigation(swiperParams) && (React.createElement(React.Fragment, null,
                React.createElement("div", { ref: prevElRef, className: "swiper-button-prev" }),
                React.createElement("div", { ref: nextElRef, className: "swiper-button-next" }))),
            needsScrollbar(swiperParams) && React.createElement("div", { ref: scrollbarElRef, className: "swiper-scrollbar" }),
            needsPagination(swiperParams) && (React.createElement("div", { ref: paginationElRef, className: "swiper-pagination" })),
            slots['container-end'])));
});
Swiper.displayName = 'Swiper';

const SwiperSlide = forwardRef(function SwiperSlide(props, externalRef) {
    const { tag: Tag = 'div', children, className = '', swiper, zoom, lazy, virtualIndex, swiperSlideIndex, ...rest } = props;
    const slideElRef = useRef(null);
    const [slideClasses, setSlideClasses] = useState('swiper-slide');
    const [lazyLoaded, setLazyLoaded] = useState(false);
    function updateClasses(_s, el, classNames) {
        if (el === slideElRef.current) {
            setSlideClasses(classNames);
        }
    }
    useIsomorphicLayoutEffect(() => {
        if (typeof swiperSlideIndex !== 'undefined' && slideElRef.current) {
            slideElRef.current.swiperSlideIndex = swiperSlideIndex;
        }
        if (externalRef) {
            if (typeof externalRef === 'function') {
                externalRef(slideElRef.current);
            }
            else {
                externalRef.current = slideElRef.current;
            }
        }
        if (!slideElRef.current || !swiper) {
            return;
        }
        if (swiper.destroyed) {
            if (slideClasses !== 'swiper-slide') {
                setSlideClasses('swiper-slide');
            }
            return;
        }
        swiper.on('_slideClass', updateClasses);
        return () => {
            if (!swiper)
                return;
            swiper.off('_slideClass', updateClasses);
        };
    });
    useIsomorphicLayoutEffect(() => {
        if (swiper && slideElRef.current && !swiper.destroyed) {
            setSlideClasses(swiper.getSlideClasses(slideElRef.current));
        }
    }, [swiper]);
    const slideData = {
        isActive: slideClasses.indexOf('swiper-slide-active') >= 0,
        isVisible: slideClasses.indexOf('swiper-slide-visible') >= 0,
        isFullyVisible: slideClasses.indexOf('swiper-slide-fully-visible') >= 0,
        isPrev: slideClasses.indexOf('swiper-slide-prev') >= 0,
        isNext: slideClasses.indexOf('swiper-slide-next') >= 0,
    };
    const renderChildren = () => typeof children === 'function' ? children(slideData) : children;
    const onLoad = () => {
        setLazyLoaded(true);
    };
    const lazyPreloaderRef = (node) => {
        if (node) {
            node.lazyPreloaderManaged = true;
        }
    };
    // Dynamic tag: forwardRef can't infer the element type from a string variable.
    const TagComponent = Tag;
    return (React.createElement(TagComponent, { ref: slideElRef, className: uniqueClasses(`${slideClasses}${className ? ` ${className}` : ''}`), "data-swiper-slide-index": virtualIndex, onLoad: onLoad, ...rest },
        zoom && (React.createElement(SwiperSlideContext.Provider, { value: slideData },
            React.createElement("div", { className: "swiper-zoom-container", "data-swiper-zoom": typeof zoom === 'number' ? zoom : undefined },
                renderChildren(),
                lazy && !lazyLoaded && (React.createElement("div", { className: "swiper-lazy-preloader", ref: lazyPreloaderRef }))))),
        !zoom && (React.createElement(SwiperSlideContext.Provider, { value: slideData },
            renderChildren(),
            lazy && !lazyLoaded && (React.createElement("div", { className: "swiper-lazy-preloader", ref: lazyPreloaderRef }))))));
});
SwiperSlide.displayName = 'SwiperSlide';

export { Swiper, SwiperSlide, useSwiper, useSwiperSlide };

import { type PropType, type VNode } from 'vue';
import type { SwiperOptions } from '../core/core.js';
declare const Swiper: import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    wrapperTag: {
        type: StringConstructor;
        default: string;
    };
    modules: {
        type: PropType<SwiperOptions["modules"]>;
        default: undefined;
    };
    init: {
        type: BooleanConstructor;
        default: undefined;
    };
    direction: {
        type: PropType<SwiperOptions["direction"]>;
        default: undefined;
    };
    oneWayMovement: {
        type: BooleanConstructor;
        default: undefined;
    };
    swiperElementNodeName: {
        type: StringConstructor;
        default: string;
    };
    touchEventsTarget: {
        type: PropType<SwiperOptions["touchEventsTarget"]>;
        default: undefined;
    };
    initialSlide: {
        type: NumberConstructor;
        default: undefined;
    };
    speed: {
        type: NumberConstructor;
        default: undefined;
    };
    cssMode: {
        type: BooleanConstructor;
        default: undefined;
    };
    updateOnWindowResize: {
        type: BooleanConstructor;
        default: undefined;
    };
    resizeObserver: {
        type: BooleanConstructor;
        default: undefined;
    };
    nested: {
        type: BooleanConstructor;
        default: undefined;
    };
    focusableElements: {
        type: StringConstructor;
        default: undefined;
    };
    width: {
        type: NumberConstructor;
        default: undefined;
    };
    height: {
        type: NumberConstructor;
        default: undefined;
    };
    preventInteractionOnTransition: {
        type: BooleanConstructor;
        default: undefined;
    };
    userAgent: {
        type: StringConstructor;
        default: undefined;
    };
    url: {
        type: StringConstructor;
        default: undefined;
    };
    edgeSwipeDetection: {
        type: PropType<boolean | string>;
        default: undefined;
    };
    edgeSwipeThreshold: {
        type: NumberConstructor;
        default: undefined;
    };
    autoHeight: {
        type: BooleanConstructor;
        default: undefined;
    };
    setWrapperSize: {
        type: BooleanConstructor;
        default: undefined;
    };
    virtualTranslate: {
        type: BooleanConstructor;
        default: undefined;
    };
    effect: {
        type: PropType<SwiperOptions["effect"]>;
        default: undefined;
    };
    breakpoints: {
        type: PropType<SwiperOptions["breakpoints"]>;
        default: undefined;
    };
    breakpointsBase: {
        type: StringConstructor;
        default: undefined;
    };
    spaceBetween: {
        type: PropType<number | string>;
        default: undefined;
    };
    slidesPerView: {
        type: PropType<SwiperOptions["slidesPerView"]>;
        default: undefined;
    };
    maxBackfaceHiddenSlides: {
        type: NumberConstructor;
        default: undefined;
    };
    slidesPerGroup: {
        type: NumberConstructor;
        default: undefined;
    };
    slidesPerGroupSkip: {
        type: NumberConstructor;
        default: undefined;
    };
    slidesPerGroupAuto: {
        type: BooleanConstructor;
        default: undefined;
    };
    centeredSlides: {
        type: BooleanConstructor;
        default: undefined;
    };
    centeredSlidesBounds: {
        type: BooleanConstructor;
        default: undefined;
    };
    slidesOffsetBefore: {
        type: NumberConstructor;
        default: undefined;
    };
    slidesOffsetAfter: {
        type: NumberConstructor;
        default: undefined;
    };
    normalizeSlideIndex: {
        type: BooleanConstructor;
        default: undefined;
    };
    centerInsufficientSlides: {
        type: BooleanConstructor;
        default: undefined;
    };
    watchOverflow: {
        type: BooleanConstructor;
        default: undefined;
    };
    roundLengths: {
        type: BooleanConstructor;
        default: undefined;
    };
    touchRatio: {
        type: NumberConstructor;
        default: undefined;
    };
    touchAngle: {
        type: NumberConstructor;
        default: undefined;
    };
    simulateTouch: {
        type: BooleanConstructor;
        default: undefined;
    };
    shortSwipes: {
        type: BooleanConstructor;
        default: undefined;
    };
    longSwipes: {
        type: BooleanConstructor;
        default: undefined;
    };
    longSwipesRatio: {
        type: NumberConstructor;
        default: undefined;
    };
    longSwipesMs: {
        type: NumberConstructor;
        default: undefined;
    };
    followFinger: {
        type: BooleanConstructor;
        default: undefined;
    };
    allowTouchMove: {
        type: BooleanConstructor;
        default: undefined;
    };
    threshold: {
        type: NumberConstructor;
        default: undefined;
    };
    touchMoveStopPropagation: {
        type: BooleanConstructor;
        default: undefined;
    };
    touchStartPreventDefault: {
        type: BooleanConstructor;
        default: undefined;
    };
    touchStartForcePreventDefault: {
        type: BooleanConstructor;
        default: undefined;
    };
    touchReleaseOnEdges: {
        type: BooleanConstructor;
        default: undefined;
    };
    uniqueNavElements: {
        type: BooleanConstructor;
        default: undefined;
    };
    resistance: {
        type: BooleanConstructor;
        default: undefined;
    };
    resistanceRatio: {
        type: NumberConstructor;
        default: undefined;
    };
    watchSlidesProgress: {
        type: BooleanConstructor;
        default: undefined;
    };
    grabCursor: {
        type: BooleanConstructor;
        default: undefined;
    };
    preventClicks: {
        type: BooleanConstructor;
        default: undefined;
    };
    preventClicksPropagation: {
        type: BooleanConstructor;
        default: undefined;
    };
    slideToClickedSlide: {
        type: BooleanConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    loopedSlides: {
        type: NumberConstructor;
        default: undefined;
    };
    loopPreventsSliding: {
        type: BooleanConstructor;
        default: undefined;
    };
    loopAdditionalSlides: {
        type: NumberConstructor;
        default: undefined;
    };
    loopAddBlankSlides: {
        type: BooleanConstructor;
        default: undefined;
    };
    rewind: {
        type: BooleanConstructor;
        default: undefined;
    };
    allowSlidePrev: {
        type: BooleanConstructor;
        default: undefined;
    };
    allowSlideNext: {
        type: BooleanConstructor;
        default: undefined;
    };
    swipeHandler: {
        type: BooleanConstructor;
        default: undefined;
    };
    noSwiping: {
        type: BooleanConstructor;
        default: undefined;
    };
    noSwipingClass: {
        type: StringConstructor;
        default: undefined;
    };
    noSwipingSelector: {
        type: StringConstructor;
        default: undefined;
    };
    passiveListeners: {
        type: BooleanConstructor;
        default: undefined;
    };
    containerModifierClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideActiveClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideVisibleClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideFullyVisibleClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideBlankClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideNextClass: {
        type: StringConstructor;
        default: undefined;
    };
    slidePrevClass: {
        type: StringConstructor;
        default: undefined;
    };
    wrapperClass: {
        type: StringConstructor;
        default: undefined;
    };
    lazyPreloaderClass: {
        type: StringConstructor;
        default: undefined;
    };
    lazyPreloadPrevNext: {
        type: NumberConstructor;
        default: undefined;
    };
    runCallbacksOnInit: {
        type: BooleanConstructor;
        default: undefined;
    };
    observer: {
        type: BooleanConstructor;
        default: undefined;
    };
    observeParents: {
        type: BooleanConstructor;
        default: undefined;
    };
    observeSlideChildren: {
        type: BooleanConstructor;
        default: undefined;
    };
    a11y: {
        type: PropType<SwiperOptions["a11y"]>;
        default: undefined;
    };
    autoplay: {
        type: PropType<SwiperOptions["autoplay"]>;
        default: undefined;
    };
    controller: {
        type: PropType<SwiperOptions["controller"]>;
        default: undefined;
    };
    coverflowEffect: {
        type: PropType<SwiperOptions["coverflowEffect"]>;
        default: undefined;
    };
    cubeEffect: {
        type: PropType<SwiperOptions["cubeEffect"]>;
        default: undefined;
    };
    fadeEffect: {
        type: PropType<SwiperOptions["fadeEffect"]>;
        default: undefined;
    };
    flipEffect: {
        type: PropType<SwiperOptions["flipEffect"]>;
        default: undefined;
    };
    creativeEffect: {
        type: PropType<SwiperOptions["creativeEffect"]>;
        default: undefined;
    };
    cardsEffect: {
        type: PropType<SwiperOptions["cardsEffect"]>;
        default: undefined;
    };
    hashNavigation: {
        type: PropType<SwiperOptions["hashNavigation"]>;
        default: undefined;
    };
    history: {
        type: PropType<SwiperOptions["history"]>;
        default: undefined;
    };
    keyboard: {
        type: PropType<SwiperOptions["keyboard"]>;
        default: undefined;
    };
    mousewheel: {
        type: PropType<SwiperOptions["mousewheel"]>;
        default: undefined;
    };
    navigation: {
        type: PropType<SwiperOptions["navigation"]>;
        default: undefined;
    };
    pagination: {
        type: PropType<SwiperOptions["pagination"]>;
        default: undefined;
    };
    parallax: {
        type: PropType<SwiperOptions["parallax"]>;
        default: undefined;
    };
    scrollbar: {
        type: PropType<SwiperOptions["scrollbar"]>;
        default: undefined;
    };
    thumbs: {
        type: PropType<SwiperOptions["thumbs"]>;
        default: undefined;
    };
    virtual: {
        type: PropType<SwiperOptions["virtual"]>;
        default: undefined;
    };
    zoom: {
        type: PropType<SwiperOptions["zoom"]>;
        default: undefined;
    };
    grid: {
        type: PropType<SwiperOptions["grid"]>;
        default: undefined;
    };
    freeMode: {
        type: PropType<SwiperOptions["freeMode"]>;
        default: undefined;
    };
    enabled: {
        type: BooleanConstructor;
        default: undefined;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    wrapperTag: {
        type: StringConstructor;
        default: string;
    };
    modules: {
        type: PropType<SwiperOptions["modules"]>;
        default: undefined;
    };
    init: {
        type: BooleanConstructor;
        default: undefined;
    };
    direction: {
        type: PropType<SwiperOptions["direction"]>;
        default: undefined;
    };
    oneWayMovement: {
        type: BooleanConstructor;
        default: undefined;
    };
    swiperElementNodeName: {
        type: StringConstructor;
        default: string;
    };
    touchEventsTarget: {
        type: PropType<SwiperOptions["touchEventsTarget"]>;
        default: undefined;
    };
    initialSlide: {
        type: NumberConstructor;
        default: undefined;
    };
    speed: {
        type: NumberConstructor;
        default: undefined;
    };
    cssMode: {
        type: BooleanConstructor;
        default: undefined;
    };
    updateOnWindowResize: {
        type: BooleanConstructor;
        default: undefined;
    };
    resizeObserver: {
        type: BooleanConstructor;
        default: undefined;
    };
    nested: {
        type: BooleanConstructor;
        default: undefined;
    };
    focusableElements: {
        type: StringConstructor;
        default: undefined;
    };
    width: {
        type: NumberConstructor;
        default: undefined;
    };
    height: {
        type: NumberConstructor;
        default: undefined;
    };
    preventInteractionOnTransition: {
        type: BooleanConstructor;
        default: undefined;
    };
    userAgent: {
        type: StringConstructor;
        default: undefined;
    };
    url: {
        type: StringConstructor;
        default: undefined;
    };
    edgeSwipeDetection: {
        type: PropType<boolean | string>;
        default: undefined;
    };
    edgeSwipeThreshold: {
        type: NumberConstructor;
        default: undefined;
    };
    autoHeight: {
        type: BooleanConstructor;
        default: undefined;
    };
    setWrapperSize: {
        type: BooleanConstructor;
        default: undefined;
    };
    virtualTranslate: {
        type: BooleanConstructor;
        default: undefined;
    };
    effect: {
        type: PropType<SwiperOptions["effect"]>;
        default: undefined;
    };
    breakpoints: {
        type: PropType<SwiperOptions["breakpoints"]>;
        default: undefined;
    };
    breakpointsBase: {
        type: StringConstructor;
        default: undefined;
    };
    spaceBetween: {
        type: PropType<number | string>;
        default: undefined;
    };
    slidesPerView: {
        type: PropType<SwiperOptions["slidesPerView"]>;
        default: undefined;
    };
    maxBackfaceHiddenSlides: {
        type: NumberConstructor;
        default: undefined;
    };
    slidesPerGroup: {
        type: NumberConstructor;
        default: undefined;
    };
    slidesPerGroupSkip: {
        type: NumberConstructor;
        default: undefined;
    };
    slidesPerGroupAuto: {
        type: BooleanConstructor;
        default: undefined;
    };
    centeredSlides: {
        type: BooleanConstructor;
        default: undefined;
    };
    centeredSlidesBounds: {
        type: BooleanConstructor;
        default: undefined;
    };
    slidesOffsetBefore: {
        type: NumberConstructor;
        default: undefined;
    };
    slidesOffsetAfter: {
        type: NumberConstructor;
        default: undefined;
    };
    normalizeSlideIndex: {
        type: BooleanConstructor;
        default: undefined;
    };
    centerInsufficientSlides: {
        type: BooleanConstructor;
        default: undefined;
    };
    watchOverflow: {
        type: BooleanConstructor;
        default: undefined;
    };
    roundLengths: {
        type: BooleanConstructor;
        default: undefined;
    };
    touchRatio: {
        type: NumberConstructor;
        default: undefined;
    };
    touchAngle: {
        type: NumberConstructor;
        default: undefined;
    };
    simulateTouch: {
        type: BooleanConstructor;
        default: undefined;
    };
    shortSwipes: {
        type: BooleanConstructor;
        default: undefined;
    };
    longSwipes: {
        type: BooleanConstructor;
        default: undefined;
    };
    longSwipesRatio: {
        type: NumberConstructor;
        default: undefined;
    };
    longSwipesMs: {
        type: NumberConstructor;
        default: undefined;
    };
    followFinger: {
        type: BooleanConstructor;
        default: undefined;
    };
    allowTouchMove: {
        type: BooleanConstructor;
        default: undefined;
    };
    threshold: {
        type: NumberConstructor;
        default: undefined;
    };
    touchMoveStopPropagation: {
        type: BooleanConstructor;
        default: undefined;
    };
    touchStartPreventDefault: {
        type: BooleanConstructor;
        default: undefined;
    };
    touchStartForcePreventDefault: {
        type: BooleanConstructor;
        default: undefined;
    };
    touchReleaseOnEdges: {
        type: BooleanConstructor;
        default: undefined;
    };
    uniqueNavElements: {
        type: BooleanConstructor;
        default: undefined;
    };
    resistance: {
        type: BooleanConstructor;
        default: undefined;
    };
    resistanceRatio: {
        type: NumberConstructor;
        default: undefined;
    };
    watchSlidesProgress: {
        type: BooleanConstructor;
        default: undefined;
    };
    grabCursor: {
        type: BooleanConstructor;
        default: undefined;
    };
    preventClicks: {
        type: BooleanConstructor;
        default: undefined;
    };
    preventClicksPropagation: {
        type: BooleanConstructor;
        default: undefined;
    };
    slideToClickedSlide: {
        type: BooleanConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    loopedSlides: {
        type: NumberConstructor;
        default: undefined;
    };
    loopPreventsSliding: {
        type: BooleanConstructor;
        default: undefined;
    };
    loopAdditionalSlides: {
        type: NumberConstructor;
        default: undefined;
    };
    loopAddBlankSlides: {
        type: BooleanConstructor;
        default: undefined;
    };
    rewind: {
        type: BooleanConstructor;
        default: undefined;
    };
    allowSlidePrev: {
        type: BooleanConstructor;
        default: undefined;
    };
    allowSlideNext: {
        type: BooleanConstructor;
        default: undefined;
    };
    swipeHandler: {
        type: BooleanConstructor;
        default: undefined;
    };
    noSwiping: {
        type: BooleanConstructor;
        default: undefined;
    };
    noSwipingClass: {
        type: StringConstructor;
        default: undefined;
    };
    noSwipingSelector: {
        type: StringConstructor;
        default: undefined;
    };
    passiveListeners: {
        type: BooleanConstructor;
        default: undefined;
    };
    containerModifierClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideActiveClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideVisibleClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideFullyVisibleClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideBlankClass: {
        type: StringConstructor;
        default: undefined;
    };
    slideNextClass: {
        type: StringConstructor;
        default: undefined;
    };
    slidePrevClass: {
        type: StringConstructor;
        default: undefined;
    };
    wrapperClass: {
        type: StringConstructor;
        default: undefined;
    };
    lazyPreloaderClass: {
        type: StringConstructor;
        default: undefined;
    };
    lazyPreloadPrevNext: {
        type: NumberConstructor;
        default: undefined;
    };
    runCallbacksOnInit: {
        type: BooleanConstructor;
        default: undefined;
    };
    observer: {
        type: BooleanConstructor;
        default: undefined;
    };
    observeParents: {
        type: BooleanConstructor;
        default: undefined;
    };
    observeSlideChildren: {
        type: BooleanConstructor;
        default: undefined;
    };
    a11y: {
        type: PropType<SwiperOptions["a11y"]>;
        default: undefined;
    };
    autoplay: {
        type: PropType<SwiperOptions["autoplay"]>;
        default: undefined;
    };
    controller: {
        type: PropType<SwiperOptions["controller"]>;
        default: undefined;
    };
    coverflowEffect: {
        type: PropType<SwiperOptions["coverflowEffect"]>;
        default: undefined;
    };
    cubeEffect: {
        type: PropType<SwiperOptions["cubeEffect"]>;
        default: undefined;
    };
    fadeEffect: {
        type: PropType<SwiperOptions["fadeEffect"]>;
        default: undefined;
    };
    flipEffect: {
        type: PropType<SwiperOptions["flipEffect"]>;
        default: undefined;
    };
    creativeEffect: {
        type: PropType<SwiperOptions["creativeEffect"]>;
        default: undefined;
    };
    cardsEffect: {
        type: PropType<SwiperOptions["cardsEffect"]>;
        default: undefined;
    };
    hashNavigation: {
        type: PropType<SwiperOptions["hashNavigation"]>;
        default: undefined;
    };
    history: {
        type: PropType<SwiperOptions["history"]>;
        default: undefined;
    };
    keyboard: {
        type: PropType<SwiperOptions["keyboard"]>;
        default: undefined;
    };
    mousewheel: {
        type: PropType<SwiperOptions["mousewheel"]>;
        default: undefined;
    };
    navigation: {
        type: PropType<SwiperOptions["navigation"]>;
        default: undefined;
    };
    pagination: {
        type: PropType<SwiperOptions["pagination"]>;
        default: undefined;
    };
    parallax: {
        type: PropType<SwiperOptions["parallax"]>;
        default: undefined;
    };
    scrollbar: {
        type: PropType<SwiperOptions["scrollbar"]>;
        default: undefined;
    };
    thumbs: {
        type: PropType<SwiperOptions["thumbs"]>;
        default: undefined;
    };
    virtual: {
        type: PropType<SwiperOptions["virtual"]>;
        default: undefined;
    };
    zoom: {
        type: PropType<SwiperOptions["zoom"]>;
        default: undefined;
    };
    grid: {
        type: PropType<SwiperOptions["grid"]>;
        default: undefined;
    };
    freeMode: {
        type: PropType<SwiperOptions["freeMode"]>;
        default: undefined;
    };
    enabled: {
        type: BooleanConstructor;
        default: undefined;
    };
}>>, {
    userAgent: string;
    width: number;
    height: number;
    breakpoints: {
        [width: number]: import("../types/options.js").SwiperOptions;
        [ratio: string]: import("../types/options.js").SwiperOptions;
    } | undefined;
    init: boolean;
    autoplay: boolean | import("../types/public.js").AutoplayOptions | undefined;
    navigation: boolean | import("../types/public.js").NavigationOptions | undefined;
    pagination: boolean | import("../types/public.js").PaginationOptions | undefined;
    scrollbar: boolean | import("../types/public.js").ScrollbarOptions | undefined;
    slidesOffsetBefore: number;
    grid: import("../types/public.js").GridOptions | undefined;
    allowSlideNext: boolean;
    allowSlidePrev: boolean;
    enabled: boolean;
    direction: "horizontal" | "vertical" | undefined;
    centeredSlides: boolean;
    slidesOffsetAfter: number;
    initialSlide: number;
    observer: boolean;
    observeParents: boolean;
    observeSlideChildren: boolean;
    a11y: boolean | import("../types/public.js").A11yOptions | undefined;
    controller: boolean | import("../types/public.js").ControllerOptions | undefined;
    cardsEffect: import("../types/public.js").CardsEffectOptions | undefined;
    coverflowEffect: import("../types/public.js").CoverflowEffectOptions | undefined;
    creativeEffect: import("../types/public.js").CreativeEffectOptions | undefined;
    cubeEffect: import("../types/public.js").CubeEffectOptions | undefined;
    fadeEffect: import("../types/public.js").FadeEffectOptions | undefined;
    flipEffect: import("../types/public.js").FlipEffectOptions | undefined;
    freeMode: boolean | import("../types/public.js").FreeModeOptions | undefined;
    hashNavigation: boolean | import("../types/public.js").HashNavigationOptions | undefined;
    history: boolean | import("../types/public.js").HistoryOptions | undefined;
    keyboard: boolean | import("../types/public.js").KeyboardOptions | undefined;
    mousewheel: boolean | import("../types/public.js").MousewheelOptions | undefined;
    parallax: boolean | import("../types/public.js").ParallaxOptions | undefined;
    thumbs: import("../types/public.js").ThumbsOptions | undefined;
    virtual: boolean | import("../types/public.js").VirtualOptions<unknown> | undefined;
    zoom: boolean | import("../types/public.js").ZoomOptions | undefined;
    modules: import("../types/shared.js").SwiperModule[] | undefined;
    effect: (string & {}) | "slide" | "fade" | "cube" | "coverflow" | "flip" | "creative" | "cards" | undefined;
    updateOnWindowResize: boolean;
    resizeObserver: boolean;
    oneWayMovement: boolean;
    swiperElementNodeName: string;
    speed: number;
    setWrapperSize: boolean;
    virtualTranslate: boolean;
    autoHeight: boolean;
    roundLengths: boolean;
    nested: boolean;
    focusableElements: string;
    uniqueNavElements: boolean;
    runCallbacksOnInit: boolean;
    watchOverflow: boolean;
    url: string;
    cssMode: boolean;
    spaceBetween: string | number;
    slidesPerView: number | "auto" | undefined;
    maxBackfaceHiddenSlides: number;
    slidesPerGroup: number;
    slidesPerGroupSkip: number;
    slidesPerGroupAuto: boolean;
    centeredSlidesBounds: boolean;
    normalizeSlideIndex: boolean;
    centerInsufficientSlides: boolean;
    grabCursor: boolean;
    touchEventsTarget: "container" | "wrapper" | undefined;
    touchRatio: number;
    touchAngle: number;
    simulateTouch: boolean;
    shortSwipes: boolean;
    longSwipes: boolean;
    longSwipesRatio: number;
    longSwipesMs: number;
    followFinger: boolean;
    allowTouchMove: boolean;
    threshold: number;
    touchStartPreventDefault: boolean;
    touchStartForcePreventDefault: boolean;
    touchMoveStopPropagation: boolean;
    edgeSwipeDetection: string | boolean;
    edgeSwipeThreshold: number;
    touchReleaseOnEdges: boolean;
    passiveListeners: boolean;
    resistance: boolean;
    resistanceRatio: number;
    preventInteractionOnTransition: boolean;
    noSwiping: boolean;
    noSwipingClass: string;
    noSwipingSelector: string;
    swipeHandler: boolean;
    preventClicks: boolean;
    preventClicksPropagation: boolean;
    slideToClickedSlide: boolean;
    watchSlidesProgress: boolean;
    loop: boolean;
    loopAddBlankSlides: boolean;
    loopAdditionalSlides: number;
    loopPreventsSliding: boolean;
    rewind: boolean;
    breakpointsBase: string;
    containerModifierClass: string;
    slideClass: string;
    slideActiveClass: string;
    slideVisibleClass: string;
    slideFullyVisibleClass: string;
    slideBlankClass: string;
    slideNextClass: string;
    slidePrevClass: string;
    wrapperClass: string;
    lazyPreloaderClass: string;
    lazyPreloadPrevNext: number;
    tag: string;
    wrapperTag: string;
    loopedSlides: number;
}, {}>;
export { Swiper };

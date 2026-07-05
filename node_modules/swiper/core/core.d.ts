import { type SwiperBrowser } from '../shared/get-browser.js';
import { type SwiperDevice } from '../shared/get-device.js';
import { type SwiperSupport } from '../shared/get-support.js';
import type { SwiperEvents as PublicSwiperEvents } from '../types/events.js';
import type { SwiperOptions as PublicSwiperOptions } from '../types/options.js';
import type { CSSSelector, SwiperModule } from '../types/shared.js';
export type { CSSSelector, SwiperModule };
export interface SwiperOptions extends PublicSwiperOptions {
    on?: {
        [event in keyof SwiperEvents]?: SwiperEvents[event];
    };
    onAny?(eventName: string, ...args: any[]): void;
}
export interface SwiperEvents extends PublicSwiperEvents {
}
export type SwiperEventHandler = (...args: any[]) => any;
export type SwiperEventName = keyof SwiperEvents;
export interface SwiperSlideElement extends HTMLElement {
    swiperSlideOffset?: number;
    swiperSlideSize?: number;
    progress?: number;
    originalProgress?: number;
}
export interface SwiperParams extends SwiperOptions {
    el?: CSSSelector | HTMLElement;
}
export interface SwiperTouchEventsData {
    isTouched?: boolean;
    isMoved?: boolean;
    allowTouchCallbacks?: boolean;
    touchStartTime?: number;
    isScrolling?: boolean;
    currentTranslate?: number;
    startTranslate?: number;
    allowThresholdMove?: boolean;
    focusableElements: string;
    lastClickTime: number;
    clickTimeout?: ReturnType<typeof setTimeout>;
    velocities: Array<{
        position: number;
        time: number;
    }>;
    allowMomentumBounce?: boolean;
    startMoving?: boolean;
    pointerId: number | null;
    touchId: number | null;
    evCache?: PointerEvent[];
    preventTouchMoveFromPointerMove?: boolean;
    /** Set in onTouchMove when crossing the loop-swap boundary; consumed in onTouchEnd. */
    loopSwapReset?: boolean;
}
export interface SwiperTouches {
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    diff: number;
    previousX?: number;
    previousY?: number;
}
export interface Swiper {
    /**
     * Object with passed initialization parameters
     */
    params: SwiperParams;
    /**
     * Object with original initialization parameters
     */
    originalParams: SwiperParams;
    passedParams: SwiperParams;
    support: SwiperSupport;
    device: SwiperDevice;
    browser: SwiperBrowser;
    __swiper__: true;
    __modules__?: SwiperModule[];
    __preventObserver__?: boolean;
    /**
     * !INTERNAL
     */
    destroyed?: boolean;
    initialized?: boolean;
    mounted?: boolean;
    isElement?: boolean;
    documentTouchHandlerProceeded?: boolean;
    /**
     * `true` if Swiper is enabled, `false` otherwise
     */
    enabled: boolean;
    /**
     * Slider container HTML element
     */
    el: HTMLElement;
    /**
     * Wrapper HTML element
     */
    wrapperEl: HTMLElement;
    /**
     * Slides wrapper HTML element
     */
    slidesEl: HTMLElement;
    hostEl: HTMLElement;
    classNames: string[];
    /**
     * Array of slides HTML elements. To get specific slide HTMLElement use `swiper.slides[1]`
     */
    slides: SwiperSlideElement[];
    /**
     * Slides grid
     */
    slidesGrid: number[];
    /**
     * Slides snap grid
     */
    snapGrid: number[];
    /**
     * Array of widths for slides
     */
    slidesSizesGrid: number[];
    visibleSlides: SwiperSlideElement[];
    visibleSlidesIndexes: number[];
    /**
     * !INTERNAL
     */
    loopedSlides: number | null;
    size: number;
    /**
     * Width of container
     */
    width: number;
    /**
     * Height of container
     */
    height: number;
    virtualSize: number;
    /**
     * Index number of currently active slide
     *
     * @note Note, that in loop mode active index value will be always shifted on a number of looped slides
     */
    activeIndex: number;
    /**
     * Index number of currently active slide considering rearranged slides in loop mode
     */
    realIndex: number;
    /**
     * Index number of previously active slide
     */
    previousIndex: number;
    /**
     * Index number of current snap in `snapGrid`
     */
    snapIndex: number;
    previousSnapIndex?: number;
    previousRealIndex?: number;
    /**
     * Index number of last clicked slide
     */
    clickedIndex: number | undefined;
    /**
     * Link to last clicked slide (HTMLElement)
     */
    clickedSlide: SwiperSlideElement | undefined;
    rtl: boolean;
    /**
     * !INTERNAL
     */
    rtlTranslate: boolean;
    wrongRTL: boolean;
    /**
     * Direction of sliding
     */
    swipeDirection: 'prev' | 'next' | undefined;
    touchesDirection?: 'prev' | 'next' | '';
    /**
     * Current value of wrapper translate
     */
    translate: number;
    previousTranslate: number;
    /**
     * Current progress of wrapper translate (from 0 to 1)
     */
    progress: number;
    progressLoop?: number;
    velocity: number;
    /**
     * `true` if swiper is in transition
     */
    animating: boolean;
    /**
     * `true` if slider on most "left"/"top" position
     */
    isBeginning: boolean;
    /**
     * `true` if slider on most "right"/"bottom" position
     */
    isEnd: boolean;
    /**
     * `true` if slide is "locked" (by `watchOverflow`) and slides can not be, e.g. when amount of slides is less that slides per view
     */
    isLocked: boolean;
    allowClick: boolean;
    /**
     * Disable / enable ability move slider by grabbing it with mouse or by touching it with finger (on touch screens) by assigning `false` / `true` to this property
     */
    allowTouchMove: boolean;
    /**
     * Disable / enable ability to slide to the next slides by assigning `false` / `true` to this property
     */
    allowSlideNext: boolean;
    /**
     * Disable / enable ability to slide to the previous slides by assigning `false` / `true` to this property
     */
    allowSlidePrev: boolean;
    /**
     * Object with the following touch event properties:
     *
     * - `swiper.touches.startX`
     * - `swiper.touches.startY`
     * - `swiper.touches.currentX`
     * - `swiper.touches.currentY`
     * - `swiper.touches.diff`
     */
    touches: SwiperTouches;
    touchEventsData: SwiperTouchEventsData;
    imagesToLoad: HTMLImageElement[];
    imagesLoaded: number;
    /**
     * !INTERNAL
     */
    currentBreakpoint?: string | null;
    /**
     * !INTERNAL
     */
    modules: SwiperModule[];
    eventsListeners: Record<string, SwiperEventHandler[]>;
    eventsAnyListeners: SwiperEventHandler[];
    onSlideToWrapperTransitionEnd?: ((this: HTMLElement, e: TransitionEvent) => void) | null;
    onTranslateToWrapperTransitionEnd?: ((this: HTMLElement, e: TransitionEvent) => void) | null;
    _clientLeft?: number;
    _cssModeVirtualInitialSet?: boolean;
    _immediateVirtual?: boolean;
    /** Add event handler */
    on<E extends keyof SwiperEvents>(event: E, handler: SwiperEvents[E], priority?: boolean): Swiper;
    on(events: string, handler: SwiperEventHandler, priority?: boolean): Swiper;
    /** Add event handler that will be removed after it was fired */
    once<E extends keyof SwiperEvents>(event: E, handler: SwiperEvents[E], priority?: boolean): Swiper;
    once(events: string, handler: SwiperEventHandler, priority?: boolean): Swiper;
    /**
     * Add event listener that will be fired on all events
     */
    onAny(handler: SwiperEventHandler, priority?: boolean): Swiper;
    /**
     * Remove event listener that will be fired on all events
     */
    offAny(handler: SwiperEventHandler): Swiper;
    /** Remove event handler */
    off<E extends keyof SwiperEvents>(event: E, handler?: SwiperEvents[E]): Swiper;
    off(events: string, handler?: SwiperEventHandler): Swiper;
    /** Fire event on instance */
    emit(events: string | string[], ...data: any[]): Swiper;
    emit(opts: {
        events: string | string[];
        data?: any[];
        context?: any;
    }): Swiper;
    /**
     * Get current value of swiper wrapper css3 transform translate
     */
    getTranslate(axis?: 'x' | 'y'): number;
    /**
     * Set custom css3 transform's translate value for swiper wrapper
     */
    setTranslate(translate: number, byController?: boolean | Swiper): void;
    /**
     * Get current minimal translate value
     */
    minTranslate(): number;
    /**
     * Get current maximal translate value
     */
    maxTranslate(): number;
    /**
     * Animate custom css3 transform's translate value for swiper wrapper
     *
     * @param translate Translate value (in px)
     * @param speed Transition duration (in ms)
     * @param runCallbacks Set it to false (by default it is true) and transition will not produce  transition events
     * @param translateBounds Set it to false (by default it is true) and transition value can extend beyond min and max translate
     *
     */
    translateTo(translate?: number, speed?: number, runCallbacks?: boolean, translateBounds?: boolean, internal?: boolean): boolean;
    setTransition(duration: number, byController?: boolean | Swiper): void;
    transitionStart(runCallbacks?: boolean, direction?: 'reset' | 'prev' | 'next'): void;
    transitionEnd(runCallbacks?: boolean, direction?: 'reset' | 'prev' | 'next'): void;
    /**
     * Run transition to the slide with index number equal to 'index' parameter for the
     *  duration equal to 'speed' parameter.
     *
     * @param index Index number of slide.
     * @param speed Transition duration (in ms).
     * @param runCallbacks Set it to false (by default it is true) and transition will
     *  not produce transition events.
     */
    slideTo(index?: number, speed?: number, runCallbacks?: boolean, internal?: boolean, initial?: boolean): boolean;
    /**
     * Does the same as .slideTo but for the case when used with enabled loop. So this
     * method will slide to slides with realIndex matching to passed index
     *
     * @param index Index number of slide.
     * @param speed Transition duration (in ms).
     * @param runCallbacks Set it to false (by default it is true) and transition will
     *  not produce transition events.
     */
    slideToLoop(index?: number, speed?: number, runCallbacks?: boolean, internal?: boolean): boolean | Swiper;
    /**
     * Run transition to next slide.
     *
     * @param speed Transition duration (in ms).
     * @param runCallbacks Set it to false (by default it is true) and transition will
     *  not produce transition events.
     */
    slideNext(speed?: number, runCallbacks?: boolean, internal?: boolean): boolean;
    /**
     * Run transition to previous slide.
     *
     * @param speed Transition duration (in ms).
     * @param runCallbacks Set it to false (by default it is true) and transition will
     *  not produce transition events.
     */
    slidePrev(speed?: number, runCallbacks?: boolean, internal?: boolean): boolean;
    /**
     * Reset swiper position to currently active slide for the duration equal to 'speed'
     * parameter.
     *
     * @param speed Transition duration (in ms).
     * @param runCallbacks Set it to false (by default it is true) and transition will
     *  not produce transition events.
     */
    slideReset(speed?: number, runCallbacks?: boolean, internal?: boolean): boolean;
    /**
     * Reset swiper position to closest slide/snap point for the duration equal to 'speed' parameter.
     *
     * @param speed Transition duration (in ms).
     * @param runCallbacks Set it to false (by default it is true) and transition will
     *  not produce transition events.
     */
    slideToClosest(speed?: number, runCallbacks?: boolean, internal?: boolean, threshold?: number): boolean;
    slideToClickedSlide(): void;
    /**
     * !INTERNAL
     */
    loopCreate(slideRealIndex?: number, initial?: boolean): void;
    loopFix(options?: {
        slideRealIndex?: number;
        slideTo?: boolean;
        direction?: 'next' | 'prev';
        setTranslate?: boolean;
        activeSlideIndex?: number;
        initial?: boolean;
        byController?: boolean;
        byMousewheel?: boolean;
    }): void;
    /**
     * !INTERNAL
     */
    loopDestroy(): void;
    cssOverflowAdjustment(): number;
    getSlideIndex(slideEl: Element): number;
    getSlideIndexByData(index: number): number;
    getSlideIndexWhenGrid(index: number): number;
    getSlideClasses(slideEl: Element): string;
    /**
     * recalculate size of swiper container
     */
    updateSize(): void;
    /**
     * recalculate number of slides and their offsets. Useful after you add/remove slides with JavaScript
     */
    updateSlides(): void;
    /**
     * Force swiper to update its height (when autoHeight enabled) for the duration equal to
     * 'speed' parameter
     *
     * @param speed Transition duration (in ms).
     */
    updateAutoHeight(speed?: number): void;
    updateSlidesOffset(): void;
    updateSlidesProgress(translate?: number): void;
    /**
     * recalculate swiper progress
     */
    updateProgress(translate?: number): void;
    /**
     * update active/prev/next classes on slides and bullets
     */
    updateSlidesClasses(): void;
    updateActiveIndex(newActiveIndex?: number): void;
    updateClickedSlide(el: HTMLElement, path?: EventTarget[]): void;
    /**
     * !INTERNAL
     */
    setBreakpoint(): void;
    /**
     * !INTERNAL
     */
    getBreakpoint(breakpoints: SwiperOptions['breakpoints'], base?: string, containerEl?: HTMLElement): string;
    addClasses(): void;
    removeClasses(): void;
    checkOverflow(): void;
    /**
     * Set grab cursor
     */
    setGrabCursor(moving?: boolean): void;
    /**
     * Unset grab cursor
     */
    unsetGrabCursor(): void;
    /**
     * Attach all events listeners again
     */
    attachEvents(): void;
    /**
     * Detach all events listeners
     */
    detachEvents(): void;
    onTouchStart: (event: TouchEvent | PointerEvent | MouseEvent) => void;
    onTouchMove: (event: TouchEvent | PointerEvent | MouseEvent) => void;
    onTouchEnd: (event: TouchEvent | PointerEvent | MouseEvent) => void;
    onDocumentTouchStart: (event: TouchEvent | PointerEvent) => void;
    onClick: (event: MouseEvent) => void;
    onScroll: () => void;
    onLoad: (event: Event) => void;
}
export declare class Swiper {
    static extendedDefaults: SwiperOptions;
    static defaults: SwiperOptions;
    constructor(container: CSSSelector | HTMLElement | SwiperOptions, options?: SwiperOptions);
    getDirectionLabel(this: Swiper, property: string): string;
    /**
     * !INTERNAL
     */
    isHorizontal(this: Swiper): boolean;
    isVertical(this: Swiper): boolean;
    recalcSlides(this: Swiper): void;
    /**
     * Enable Swiper (if it was disabled)
     */
    enable(this: Swiper): void;
    /**
     * Disable Swiper (if it was enabled). When Swiper is disabled, it will hide all navigation elements and won't respond to any events and interactions
     */
    disable(this: Swiper): void;
    /**
     * Set Swiper translate progress (from 0 to 1). Where 0 - its initial position (offset) on first slide, and 1 - its maximum position (offset) on last slide
     *
     * @param progress Swiper translate progress (from 0 to 1).
     * @param speed Transition duration (in ms).
     */
    setProgress(this: Swiper, progress: number, speed?: number): void;
    emitContainerClasses(this: Swiper): void;
    emitSlidesClasses(this: Swiper): void;
    /**
     * Get dynamically calculated amount of slides per view, useful only when slidesPerView set to `auto`
     */
    slidesPerViewDynamic(this: Swiper, view?: 'current' | 'previous', exact?: boolean): number;
    /**
     * You should call it after you add/remove slides
     * manually, or after you hide/show it, or do any
     * custom DOM modifications with Swiper
     * This method also includes subcall of the following
     * methods which you can use separately:
     */
    update(this: Swiper): void;
    /**
     * Changes slider direction from horizontal to vertical and back.
     *
     * @param direction New direction. If not specified, then will automatically changed to opposite direction
     * @param needUpdate Will call swiper.update(). Default true
     */
    changeDirection(this: Swiper, newDirection?: 'horizontal' | 'vertical', needUpdate?: boolean): Swiper;
    /**
     * Changes slider language
     *
     * @param direction New direction. Should be `rtl` or `ltr`
     */
    changeLanguageDirection(this: Swiper, direction: 'rtl' | 'ltr'): void;
    mount(this: Swiper, element?: HTMLElement | string): boolean;
    /**
     * Initialize slider
     */
    init(this: Swiper, el?: HTMLElement | string): Swiper;
    /**
     * Destroy slider instance and detach all events listeners
     *
     * @param deleteInstance Set it to false (by default it is true) to not to delete Swiper instance
     * @param cleanStyles Set it to true (by default it is true) and all custom styles will be removed from slides, wrapper and container.
     * Useful if you need to destroy Swiper and to init again with new options or in different direction
     */
    destroy(this: Swiper, deleteInstance?: boolean, cleanStyles?: boolean): null;
    static extendDefaults(newDefaults: SwiperOptions): void;
    static installModule(mod: SwiperModule): void;
    static use(module: SwiperModule | SwiperModule[]): typeof Swiper;
}
export default Swiper;

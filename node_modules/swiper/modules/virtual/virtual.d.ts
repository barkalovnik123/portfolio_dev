import type { Swiper, SwiperModule } from '../../core/core.js';
export interface VirtualData<T = unknown> {
    /**
     * slides left/top offset in px
     */
    offset: number;
    /**
     * index of first slide required to be rendered
     */
    from: number;
    /**
     * index of last slide required to be rendered
     */
    to: number;
    /**
     * array with slide items to be rendered
     */
    slides: T[];
}
export interface VirtualOptions<T = unknown> {
    /**
     * Whether the virtual slides are enabled
     *
     * @default false
     */
    enabled?: boolean;
    /**
     * Array with slides
     *
     * @default []
     */
    slides?: T[];
    /**
     * Slide size for slidesPerView: `auto` (in px)
     *
     * @default 320
     */
    slidesPerViewAutoSlideSize?: number;
    /**
     * Enables DOM cache of rendering slides html elements. Once they are rendered they will be saved to cache and reused from it.
     *
     * @default true
     */
    cache?: boolean;
    /**
     * Increases amount of pre-rendered slides before active slide
     *
     * @default 0
     */
    addSlidesBefore?: number;
    /**
     * Increases amount of pre-rendered slides after active slide
     *
     * @default 0
     */
    addSlidesAfter?: number;
    /**
     * Function to render slide. As an argument it accepts current slide item for `slides` array and index number of the current slide. Function must return an outer HTML of the swiper slide or slide HTML element.
     *
     * @default null
     */
    renderSlide?: ((slide: T, index: number) => HTMLElement | string) | null;
    /**
     * Function for external rendering (e.g. using some other library to handle DOM manipulations and state like React.js or Vue.js).
     *
     * @default null
     */
    renderExternal?: ((data: VirtualData<T>) => void) | null;
    /**
     * When enabled (by default) it will update Swiper layout right after renderExternal called. Useful to disable and update swiper manually when used with render libraries that renders asynchronously
     *
     * @default true
     */
    renderExternalUpdate?: boolean;
}
export interface VirtualMethods<T = unknown> {
    /**
     * Object with cached slides HTML elements, keyed by slide index.
     */
    cache: Record<number, HTMLElement>;
    /**
     * Index of first rendered slide
     */
    from: number;
    /**
     * Index of last rendered slide
     */
    to: number;
    /**
     * Array with slide items passed by `virtual.slides` parameter
     */
    slides: T[];
    /**
     * Append slide. `slides` can be a single slide item or array with such slides.
     *
     * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
     */
    appendSlide(slide: T | T[]): void;
    /**
     * Prepend slide. `slides` can be a single slide item or array with such slides.
     *
     * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
     */
    prependSlide(slide: T | T[]): void;
    /**
     * Remove specific slide or slides. `slideIndexes` can be a number with slide index to remove or array with indexes.
     *
     * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
     */
    removeSlide(slideIndexes: number | number[]): void;
    /**
     * Remove all slides
     *
     * @note Only for Core version (in React & Vue it should be done by modifying slides array/data/source)
     */
    removeAllSlides(): void;
    /**
     * Update virtual slides state.
     *
     * @param force - re-render even if the slice didn't move
     * @param beforeInit - internal flag set by the module during `beforeInit`
     * @param forceActiveIndex - override `swiper.activeIndex` when computing the slice
     */
    update(force?: boolean, beforeInit?: boolean, forceActiveIndex?: number): void;
}
export interface VirtualInternals<T = unknown> extends VirtualMethods<T> {
    /**
     * Pixel offset applied to virtual slides — left/top depending on direction.
     */
    offset: number;
    /**
     * Snapshot of `swiper.slidesGrid` taken when the last `update` ran. Used
     * to detect that the grid changed without a from/to change.
     */
    slidesGrid: number[];
    /**
     * Number of virtual slides reserved before the active slice. Set on
     * each `update` and read by core code that translates between virtual
     * indices and DOM positions.
     */
    slidesBefore?: number;
    /**
     * Number of virtual slides reserved after the active slice.
     */
    slidesAfter?: number;
}
export interface VirtualEvents {
    /**
     * Event will be fired after the virtual slides DOM has been re-rendered
     * (either internally by the module or after a `renderExternal` round-trip).
     */
    virtualUpdate: (swiper: Swiper) => void;
}
declare module '../../core/core.js' {
    interface Swiper {
        virtual: VirtualInternals;
    }
    interface SwiperOptions {
        /**
         * Enables virtual slides functionality. Object with virtual slides parameters or boolean `true` to enable with default settings.
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   virtual: {
         *     slides: ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'],
         *   },
         * });
         * ```
         */
        virtual?: VirtualOptions | boolean;
    }
    interface SwiperParams {
        virtual?: VirtualOptions;
    }
    interface SwiperEvents extends VirtualEvents {
    }
}
declare const Virtual: SwiperModule;
export default Virtual;

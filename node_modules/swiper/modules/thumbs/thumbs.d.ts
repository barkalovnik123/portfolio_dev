import type { Swiper, SwiperModule } from '../../core/core.js';
export interface ThumbsOptions {
    /**
     * Swiper instance of swiper used as thumbs or object with Swiper parameters to initialize thumbs swiper
     *
     * @default null
     */
    swiper?: Swiper | string | HTMLElement | null;
    /**
     * Additional class that will be added to activated thumbs swiper slide
     *
     * @default 'swiper-slide-thumb-active'
     */
    slideThumbActiveClass?: string;
    /**
     * Additional class that will be added to thumbs swiper
     *
     * @default 'swiper-thumbs'
     */
    thumbsContainerClass?: string;
    /**
     * When enabled multiple thumbnail slides may get activated
     *
     * @default true
     */
    multipleActiveThumbs?: boolean;
    /**
     * Allows to set on which thumbs active slide from edge it should automatically move scroll thumbs. For example, if set to 1 and last visible thumb will be activated (1 from edge) it will auto scroll thumbs
     *
     * @default 0
     */
    autoScrollOffset?: number;
}
export interface ThumbsMethods {
    /**
     * Swiper instance of thumbs swiper
     */
    swiper: Swiper;
    /**
     * Update thumbs
     */
    update(initial: boolean, p?: {
        autoScroll?: boolean;
    }): void;
    /**
     * Initialize thumbs
     */
    init(): boolean;
}
export interface ThumbsEvents {
}
interface ThumbsInternals {
    swiper: Swiper | null;
    update(initial?: boolean, p?: {
        autoScroll?: boolean;
    }): void;
    init(): boolean;
}
declare module '../../core/core.js' {
    interface Swiper {
        thumbs: ThumbsInternals;
    }
    interface SwiperOptions {
        /**
         * Object with thumbs component parameters
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   ...
         *   thumbs: {
         *     swiper: thumbsSwiper
         *   }
         * });
         * ```
         */
        thumbs?: ThumbsOptions;
    }
    interface SwiperParams {
        thumbs?: ThumbsOptions;
    }
    interface SwiperEvents extends ThumbsEvents {
    }
}
declare const Thumb: SwiperModule;
export default Thumb;

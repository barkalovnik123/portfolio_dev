import type { Swiper, SwiperModule } from '../../core/core.js';
export interface HashNavigationOptions {
    /**
     * Boolean property to use with breakpoints to enable/disable hash navigation on certain breakpoints
     *
     * @default false
     */
    enabled?: boolean;
    /**
     * Set to `true` to enable also navigation through slides (when hashnav
     * is enabled) by browser history or by setting directly hash on document location
     *
     * @default false
     */
    watchState?: boolean;
    /**
     * Works in addition to hashnav to replace current url state with the
     * new one instead of adding it to history
     *
     * @default     false
     */
    replaceState?: boolean;
    /**
     * Designed to be used with Virtual slides when it is impossible to find slide in DOM by hash (e.g. not yet rendered)
     *
     */
    getSlideIndex?: (swiper: Swiper, hash: string) => number;
}
export interface HashNavigationMethods {
}
export interface HashNavigationEvents {
    /**
     * Event will be fired on window hash change
     */
    hashChange: (swiper: Swiper) => void;
    /**
     * Event will be fired when swiper updates the hash
     */
    hashSet: (swiper: Swiper) => void;
}
declare module '../../core/core.js' {
    interface Swiper {
        hashNavigation: HashNavigationMethods;
    }
    interface SwiperOptions {
        /**
         * Enables hash url navigation to for slides.
         * Object with hash navigation parameters or boolean `true` to enable with default settings
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   hashNavigation: {
         *     replaceState: true,
         *   },
         * });
         * ```
         */
        hashNavigation?: HashNavigationOptions | boolean;
    }
    interface SwiperParams {
        hashNavigation?: HashNavigationOptions;
    }
    interface SwiperEvents extends HashNavigationEvents {
    }
}
declare const HashNavigation: SwiperModule;
export default HashNavigation;

import type { Swiper, SwiperModule } from '../../core/core.js';
import type { CSSSelector } from '../../types/shared.js';
export interface NavigationOptions {
    /**
     * Boolean property to use with breakpoints to enable/disable navigation on certain breakpoints
     */
    enabled?: boolean;
    /**
     * String with CSS selector or HTML element of the element that will work
     * like "next" button after click on it
     *
     * @default null
     */
    nextEl?: CSSSelector | HTMLElement | null;
    /**
     * String with CSS selector or HTML element of the element that will work
     * like "prev" button after click on it
     *
     * @default null
     */
    prevEl?: CSSSelector | HTMLElement | null;
    /**
     * Boolean property to add SVG icons to navigation buttons
     *
     * @default true
     */
    addIcons?: boolean;
    /**
     * Toggle navigation buttons visibility after click on Slider's container
     *
     * @default false
     */
    hideOnClick?: boolean;
    /**
     * CSS class name added to navigation button when it becomes disabled
     *
     * @default 'swiper-button-disabled'
     */
    disabledClass?: string;
    /**
     * CSS class name added to navigation button when it becomes hidden
     *
     * @default 'swiper-button-hidden'
     */
    hiddenClass?: string;
    /**
     * CSS class name added to navigation button when it is disabled
     *
     * @default 'swiper-button-lock'
     */
    lockClass?: string;
    /**
     * CSS class name added on swiper container when navigation is disabled by breakpoint
     *
     * @default 'swiper-navigation-disabled'
     */
    navigationDisabledClass?: string;
}
export interface NavigationMethods {
    /**
     * HTMLElement of "next" navigation button
     */
    nextEl: HTMLElement;
    /**
     * HTMLElement of "previous" navigation button
     */
    prevEl: HTMLElement;
    /**
     * Update navigation buttons state (enabled/disabled)
     */
    update(): void;
    /**
     * Initialize navigation
     */
    init(): void;
    /**
     * Destroy navigation
     */
    destroy(): void;
}
export interface NavigationEvents {
    /**
     * Event will be fired on navigation hide
     */
    navigationHide: (swiper: Swiper) => void;
    /**
     * Event will be fired on navigation show
     */
    navigationShow: (swiper: Swiper) => void;
    /**
     * Event will be fired on navigation prev button click
     */
    navigationPrev: (swiper: Swiper) => void;
    /**
     * Event will be fired on navigation next button click
     */
    navigationNext: (swiper: Swiper) => void;
}
interface NavigationInternals extends NavigationMethods {
    enable: () => void;
    disable: () => void;
    arrowSvg: string;
}
declare module '../../core/core.js' {
    interface Swiper {
        navigation: NavigationInternals;
    }
    interface SwiperOptions {
        /**
         * Object with navigation parameters or boolean `true` to enable with default settings.
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   navigation: {
         *     nextEl: '.swiper-button-next',
         *     prevEl: '.swiper-button-prev',
         *   },
         * });
         * ```
         */
        navigation?: NavigationOptions | boolean;
    }
    interface SwiperParams {
        navigation?: NavigationOptions;
    }
    interface SwiperEvents extends NavigationEvents {
    }
}
declare const Navigation: SwiperModule;
export default Navigation;

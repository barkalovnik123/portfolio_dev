import type { Swiper, SwiperModule } from '../../core/core.js';
export interface KeyboardOptions {
    /**
     * Set to `true` to enable keyboard control
     *
     * @default false
     */
    enabled?: boolean;
    /**
     * When enabled it will control sliders that are currently in viewport
     *
     * @default true
     */
    onlyInViewport?: boolean;
    /**
     * When enabled it will enable keyboard navigation by Page Up and Page Down keys
     *
     * @default true
     */
    pageUpDown?: boolean;
    /**
     * Set the speed of keyboard navigation transitions (in ms)
     *
     * @default undefined
     */
    speed?: number;
}
export interface KeyboardMethods {
    /**
     * Whether the keyboard control is enabled
     */
    enabled: boolean;
    /**
     * Enable keyboard control
     */
    enable(): void;
    /**
     * Disable keyboard control
     */
    disable(): void;
}
export interface KeyboardEvents {
    /**
     * Event will be fired on key press
     */
    keyPress: (swiper: Swiper, keyCode: string) => void;
}
declare module '../../core/core.js' {
    interface Swiper {
        keyboard: KeyboardMethods;
    }
    interface SwiperOptions {
        /**
         * Enables navigation through slides using keyboard. Object with keyboard parameters or boolean `true` to enable with default settings
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   keyboard: {
         *     enabled: true,
         *     onlyInViewport: false,
         *   },
         * });
         * ```
         */
        keyboard?: KeyboardOptions | boolean;
    }
    interface SwiperParams {
        keyboard?: KeyboardOptions;
    }
    interface SwiperEvents extends KeyboardEvents {
    }
}
declare const Keyboard: SwiperModule;
export default Keyboard;

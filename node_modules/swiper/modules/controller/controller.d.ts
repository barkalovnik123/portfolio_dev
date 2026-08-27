import type { Swiper, SwiperModule } from '../../core/core.js';
export interface ControllerOptions {
    /**
     * Pass here another Swiper instance or array with Swiper instances that should be controlled
     * by this Swiper. Also accepts string with CSS selector of Swiper element, or HTMLElement of Swiper element
     */
    control?: Swiper | Swiper[] | string | HTMLElement | null;
    /**
     * Set to `true` and controlling will be in inverse direction
     *
     * @default false
     */
    inverse?: boolean;
    /**
     * Defines a way how to control another slider: slide by slide
     * (with respect to other slider's grid) or depending on all slides/container
     * (depending on total slider percentage).
     *
     * @default 'slide'
     */
    by?: 'slide' | 'container';
}
export interface ControllerMethods {
    /**
     * Pass here another Swiper instance or array with Swiper instances that should be controlled
     * by this Swiper
     */
    control?: Swiper | Swiper[];
}
export interface ControllerEvents {
}
declare class LinearSpline {
    x: number[];
    y: number[];
    lastIndex: number;
    private binarySearch;
    constructor(x: number[], y: number[]);
    interpolate(x2: number): number;
}
interface ControllerInternals extends ControllerMethods {
    spline?: LinearSpline;
    setTranslate(translate: number, byController?: boolean | Swiper): void;
    setTransition(duration: number, byController?: boolean | Swiper): void;
}
declare module '../../core/core.js' {
    interface Swiper {
        controller: ControllerInternals;
    }
    interface SwiperOptions {
        /**
         * Object with controller parameters or boolean `true` to enable with default settings
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   controller: {
         *     inverse: true,
         *   },
         * });
         * ```
         */
        controller?: ControllerOptions | boolean;
    }
    interface SwiperParams {
        controller?: ControllerOptions;
    }
    interface SwiperEvents extends ControllerEvents {
    }
}
declare const Controller: SwiperModule;
export default Controller;

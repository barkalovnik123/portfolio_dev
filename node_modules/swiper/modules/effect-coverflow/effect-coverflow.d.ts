import type { SwiperModule } from '../../core/core.js';
export interface CoverflowEffectOptions {
    /**
     * Enables slides shadows
     *
     * @default true
     */
    slideShadows?: boolean;
    /**
     * Slide rotate in degrees
     *
     * @default 50
     */
    rotate?: number;
    /**
     * Stretch space between slides
     *
     * - a number is interpreted as pixels (e.g., `20` for 20px).
     * - a string with a percentage (e.g., `"50%"`).
     *
     * @default 0
     */
    stretch?: number | `${number}%`;
    /**
     * Depth offset in px (slides translate in Z axis)
     *
     * @default 100
     */
    depth?: number;
    /**
     * Slide scale effect
     *
     * @default 1
     */
    scale?: number;
    /**
     * Effect multiplier. A number is multiplied with the slide's normalized
     * offset from center; a function receives that offset and returns the
     * resulting multiplier.
     *
     * @default 1
     */
    modifier?: number | ((centerOffset: number) => number);
}
export interface CoverflowEffectMethods {
}
export interface CoverflowEffectEvents {
}
declare module '../../core/core.js' {
    interface Swiper {
        coverflowEffect: CoverflowEffectMethods;
    }
    interface SwiperOptions {
        /**
         * Object with Coverflow-effect parameters.
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   effect: 'coverflow',
         *   coverflowEffect: {
         *     rotate: 30,
         *     slideShadows: false,
         *   },
         * });
         * ```
         */
        coverflowEffect?: CoverflowEffectOptions;
    }
    interface SwiperParams {
        coverflowEffect?: CoverflowEffectOptions;
    }
    interface SwiperEvents extends CoverflowEffectEvents {
    }
}
declare const EffectCoverflow: SwiperModule;
export default EffectCoverflow;

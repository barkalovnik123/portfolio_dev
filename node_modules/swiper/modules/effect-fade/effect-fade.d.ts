import type { SwiperModule } from '../../core/core.js';
export interface FadeEffectOptions {
    /**
     * Enables slides cross fade
     *
     * @default false
     */
    crossFade?: boolean;
}
export interface FadeEffectMethods {
}
export interface FadeEffectEvents {
}
declare module '../../core/core.js' {
    interface Swiper {
        fadeEffect: FadeEffectMethods;
    }
    interface SwiperOptions {
        /**
         * Object with Fade-effect parameters
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   effect: 'fade',
         *   fadeEffect: {
         *     crossFade: true
         *   },
         * });
         * ```
         */
        fadeEffect?: FadeEffectOptions;
    }
    interface SwiperParams {
        fadeEffect?: FadeEffectOptions;
    }
    interface SwiperEvents extends FadeEffectEvents {
    }
}
declare const EffectFade: SwiperModule;
export default EffectFade;

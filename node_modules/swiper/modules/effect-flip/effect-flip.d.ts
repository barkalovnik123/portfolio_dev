import type { SwiperModule } from '../../core/core.js';
export interface FlipEffectOptions {
    /**
     * Enables slides shadows
     *
     * @default true
     */
    slideShadows?: boolean;
    /**
     * Limit edge slides rotation
     *
     * @default true
     */
    limitRotation?: boolean;
}
export interface FlipEffectMethods {
}
export interface FlipEffectEvents {
}
declare module '../../core/core.js' {
    interface Swiper {
        flipEffect: FlipEffectMethods;
    }
    interface SwiperOptions {
        /**
         * Object with Flip-effect parameters
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   effect: 'flip',
         *   flipEffect: {
         *     slideShadows: false,
         *   },
         * });
         * ```
         */
        flipEffect?: FlipEffectOptions;
    }
    interface SwiperParams {
        flipEffect?: FlipEffectOptions;
    }
    interface SwiperEvents extends FlipEffectEvents {
    }
}
declare const EffectFlip: SwiperModule;
export default EffectFlip;

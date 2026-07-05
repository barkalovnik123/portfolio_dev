import type { SwiperModule } from '../../core/core.js';
export interface CardsEffectOptions {
    /**
     * Enables slides shadows
     *
     * @default true
     */
    slideShadows?: boolean;
    /**
     * Enables cards rotation
     *
     * @default true
     */
    rotate?: boolean;
    /**
     * Rotate angle per slide (in degrees)
     *
     * @default 2
     */
    perSlideRotate?: number;
    /**
     * Offset distance per slide (in px)
     *
     * @default 8
     */
    perSlideOffset?: number;
}
export interface CardsEffectMethods {
}
export interface CardsEffectEvents {
}
declare module '../../core/core.js' {
    interface Swiper {
        cardsEffect: CardsEffectMethods;
    }
    interface SwiperOptions {
        /**
         * Object with Cards-effect parameters
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   effect: 'cards',
         *   cardsEffect: {
         *     // ...
         *   },
         * });
         * ```
         */
        cardsEffect?: CardsEffectOptions;
    }
    interface SwiperParams {
        cardsEffect?: CardsEffectOptions;
    }
    interface SwiperEvents extends CardsEffectEvents {
    }
}
declare const EffectCards: SwiperModule;
export default EffectCards;

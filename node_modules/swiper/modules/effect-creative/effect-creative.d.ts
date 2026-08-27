import type { SwiperModule } from '../../core/core.js';
export interface CreativeEffectTransform {
    /** Array with translate X, Y and Z values (px or `<n>%`). */
    translate?: (string | number)[];
    /** Array with rotate X, Y and Z values (in deg). */
    rotate?: number[];
    /** Slide opacity. */
    opacity?: number;
    /** Slide scale. */
    scale?: number;
    /** Enables slide shadow. */
    shadow?: boolean;
    /** Transform origin, e.g. `left bottom`. */
    origin?: string;
}
export interface CreativeEffectOptions {
    /**
     * Previous slide transformations.
     */
    prev?: CreativeEffectTransform;
    /**
     * Next slide transformations.
     */
    next?: CreativeEffectTransform;
    /**
     * Limit progress/offset to amount of side slides. If `1`, then all slides
     * after prev/next will share the same state.
     *
     * @default 1
     */
    limitProgress?: number;
    /**
     * Splits shadow "opacity" per slide based on `limitProgress` (only if
     * transformation shadows enabled).
     *
     * @default false
     */
    shadowPerProgress?: boolean;
    /**
     * Allows to multiply slides transformations and opacity.
     *
     * @default 1
     */
    progressMultiplier?: number;
    /**
     * Enable this parameter if your custom transforms require 3D
     * transformations (`translateZ`, `rotateX`, `rotateY`).
     *
     * @default true
     */
    perspective?: boolean;
}
export interface CreativeEffectMethods {
}
export interface CreativeEffectEvents {
}
declare module '../../core/core.js' {
    interface Swiper {
        creativeEffect: CreativeEffectMethods;
    }
    interface SwiperOptions {
        /**
         * Object with Creative-effect parameters
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   effect: 'creative',
         *   creativeEffect: {
         *     prev: {
         *       // will set `translateZ(-400px)` on previous slides
         *       translate: [0, 0, -400],
         *     },
         *     next: {
         *       // will set `translateX(100%)` on next slides
         *       translate: ['100%', 0, 0],
         *     },
         *   },
         * });
         * ```
         */
        creativeEffect?: CreativeEffectOptions;
    }
    interface SwiperParams {
        creativeEffect?: CreativeEffectOptions;
    }
    interface SwiperEvents extends CreativeEffectEvents {
    }
}
declare const EffectCreative: SwiperModule;
export default EffectCreative;

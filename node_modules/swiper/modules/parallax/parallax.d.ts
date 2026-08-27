import type { SwiperModule } from '../../core/core.js';
export interface ParallaxOptions {
    /**
     * Enable, if you want to use "parallaxed" elements inside of slider
     *
     * @default false
     */
    enabled?: boolean;
}
export interface ParallaxMethods {
    setTranslate?: () => void;
}
export interface ParallaxEvents {
}
declare module '../../core/core.js' {
    interface Swiper {
        parallax?: ParallaxMethods;
    }
    interface SwiperOptions {
        /**
         * Object with parallax parameters or boolean `true` to enable with default settings.
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   parallax: true,
         * });
         * ```
         */
        parallax?: ParallaxOptions | boolean;
    }
    interface SwiperParams {
        parallax?: ParallaxOptions;
    }
    interface SwiperEvents extends ParallaxEvents {
    }
}
declare const Parallax: SwiperModule;
export default Parallax;

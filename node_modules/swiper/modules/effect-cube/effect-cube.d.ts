import type { SwiperModule } from '../../core/core.js';
export interface CubeEffectOptions {
    /**
     * Enables slides shadows
     *
     * @default true
     */
    slideShadows?: boolean;
    /**
     * Enables main slider shadow
     *
     * @default true
     */
    shadow?: boolean;
    /**
     * Main shadow offset in px
     *
     * @default 20
     */
    shadowOffset?: number;
    /**
     * Main shadow scale ratio
     *
     * @default 0.94
     */
    shadowScale?: number;
}
export interface CubeEffectMethods {
}
export interface CubeEffectEvents {
}
declare module '../../core/core.js' {
    interface Swiper {
        cubeEffect: CubeEffectMethods;
    }
    interface SwiperOptions {
        /**
         * Object with Cube-effect parameters
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   effect: 'cube',
         *   cubeEffect: {
         *     slideShadows: false,
         *   },
         * });
         * ```
         */
        cubeEffect?: CubeEffectOptions;
    }
    interface SwiperParams {
        cubeEffect?: CubeEffectOptions;
    }
    interface SwiperEvents extends CubeEffectEvents {
    }
}
declare const EffectCube: SwiperModule;
export default EffectCube;

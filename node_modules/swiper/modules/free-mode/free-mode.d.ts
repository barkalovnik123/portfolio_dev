import type { SwiperModule } from '../../core/core.js';
export interface FreeModeOptions {
    /**
     * Whether the free mode is enabled
     *
     * @default false
     */
    enabled?: boolean;
    /**
     * If enabled, then slide will keep moving for a while after you release it
     *
     * @default true
     */
    momentum?: boolean;
    /**
     * Higher value produces larger momentum distance after you release slider
     *
     * @default 1
     */
    momentumRatio?: number;
    /**
     * Higher value produces larger momentum velocity after you release slider
     *
     * @default 1
     */
    momentumVelocityRatio?: number;
    /**
     * Set to `false` if you want to disable momentum bounce in free mode
     *
     * @default true
     */
    momentumBounce?: boolean;
    /**
     * Higher value produces larger momentum bounce effect
     *
     * @default 1
     */
    momentumBounceRatio?: number;
    /**
     * Minimum touchmove-velocity required to trigger free mode momentum
     *
     * @default 0.02
     */
    minimumVelocity?: number;
    /**
     * Set to enabled to enable snap to slides positions in free mode
     *
     * @default false
     */
    sticky?: boolean;
}
export interface FreeModeMethods {
    onTouchMove(): void;
    onTouchEnd(): void;
}
export interface FreeModeEvents {
}
interface FreeModeInternals {
    onTouchStart(): void;
    onTouchMove(): void;
    onTouchEnd(args: {
        currentPos: number;
    }): void;
}
declare module '../../core/core.js' {
    interface Swiper {
        freeMode: FreeModeInternals;
    }
    interface SwiperOptions {
        /**
         * Enables free mode functionality. Object with free mode parameters or boolean `true` to enable with default settings.
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   freeMode: true,
         * });
         *
         * const swiper = new Swiper('.swiper', {
         *   freeMode: {
         *     enabled: true,
         *     sticky: true,
         *   },
         * });
         * ```
         */
        freeMode?: FreeModeOptions | boolean;
    }
    interface SwiperParams {
        freeMode?: FreeModeOptions;
    }
    interface SwiperEvents extends FreeModeEvents {
        /**
         * !INTERNAL: Event will be fired on free mode touch end (release) and there will be no momentum and no bounce
         */
        _freeModeStaticRelease?: () => void;
    }
}
declare const FreeMode: SwiperModule;
export default FreeMode;

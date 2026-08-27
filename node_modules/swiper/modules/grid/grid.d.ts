import type { SwiperModule } from '../../core/core.js';
export interface GridOptions {
    /**
     * Number of slides rows, for multirow layout
     *
     * @default 1
     */
    rows?: number;
    /**
     * Can be `'column'` or `'row'`. Defines how slides should fill rows, by column or by row
     *
     * @note if used with loop mode make sure number of slides is even specified in loop mode requirements, or enable `loopAddBlankSlides` parameter
     *
     * @default 'column'
     */
    fill?: 'row' | 'column';
}
export interface GridMethods {
    /**
     * Computes the row/column layout for the given slide list and stores
     * the totals used by `updateSlide`/`updateWrapperSize`.
     */
    initSlides(slides: HTMLElement[]): void;
    /**
     * Reverts inline styles previously applied by `updateSlide` so the
     * slider can switch back to single-row mode without leftover height.
     */
    unsetSlides(): void;
    /**
     * Assigns `row`/`column` indices and the row-spanning inline styles to
     * a slide, based on its position in the source list.
     */
    updateSlide(i: number, slide: HTMLElement, slides: HTMLElement[]): void;
    /**
     * Adjusts `swiper.virtualSize` and `snapGrid` to fit a multi-row layout
     * given the per-slide size.
     */
    updateWrapperSize(slideSize: number, snapGrid: number[]): void;
}
export interface GridEvents {
}
declare module '../../core/core.js' {
    interface Swiper {
        grid: GridMethods;
    }
    interface SwiperOptions {
        /**
         * Object with grid parameters to enable "multirow" slider.
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   grid: {
         *     rows: 2,
         *   },
         * });
         * ```
         */
        grid?: GridOptions;
    }
    interface SwiperParams {
        grid?: GridOptions;
    }
    interface SwiperEvents extends GridEvents {
    }
}
declare const Grid: SwiperModule;
export default Grid;

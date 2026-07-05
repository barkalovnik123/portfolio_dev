import type { SwiperModule } from '../../core/core.js';
export interface HistoryOptions {
    /**
     * Enables History Plugin.
     *
     * @default false
     */
    enabled?: boolean;
    /**
     * Swiper page root, useful to specify when you use Swiper history mode not on root website page.
     * For example can be `https://my-website.com/` or `https://my-website.com/subpage/` or `/subpage/`
     *
     *
     * @default ''
     */
    root?: string;
    /**
     * Works in addition to hashnav or history to replace current url state with the
     * new one instead of adding it to history
     *
     * @default false
     */
    replaceState?: boolean;
    /**
     * Url key for slides
     *
     * @default 'slides'
     */
    key?: string;
    /**
     * Keep query parameters when changing browser url.
     *
     * @default false
     */
    keepQuery?: boolean;
}
export interface HistoryMethods {
}
export interface HistoryEvents {
}
declare module '../../core/core.js' {
    interface Swiper {
        history: HistoryMethods;
    }
    interface SwiperOptions {
        /**
         * Enables history push state where every slide will have its own url. In this parameter you have to specify main slides url like `"slides"` and specify every slide url using `data-history` attribute.
         *
         * Object with history navigation parameters or boolean `true` to enable with default settings
         *
         * @example
         * ```js
         * const swiper = new Swiper('.swiper', {
         *   history: {
         *     replaceState: true,
         *   },
         * });
         * ```
         *
         * @example
         * ```html
         * <!-- will produce "slides/slide1" url in browser history -->
         * <div class="swiper-slide" data-history="slide1"></div>
         * ```
         */
        history?: HistoryOptions | boolean;
    }
    interface SwiperParams {
        history?: HistoryOptions;
    }
    interface SwiperEvents extends HistoryEvents {
    }
}
declare const History: SwiperModule;
export default History;

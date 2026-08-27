import type { Swiper as SwiperClass } from '../core/core.js';
export interface SwiperSlideData {
    isActive: boolean;
    isVisible: boolean;
    isFullyVisible: boolean;
    isPrev: boolean;
    isNext: boolean;
}
export declare const SwiperSlideContext: import("react").Context<SwiperSlideData | null>;
export declare const useSwiperSlide: () => SwiperSlideData | null;
export declare const SwiperContext: import("react").Context<SwiperClass | null>;
export declare const useSwiper: () => SwiperClass | null;

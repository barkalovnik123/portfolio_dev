import { type ComputedRef, type Ref } from 'vue';
import type { Swiper as SwiperClass } from '../core/core.js';
export interface VueSwiperSlideData {
    isActive: boolean;
    isVisible: boolean;
    isPrev: boolean;
    isNext: boolean;
}
export declare const useSwiperSlide: () => ComputedRef<VueSwiperSlideData> | undefined;
export declare const useSwiper: () => Ref<SwiperClass | null> | undefined;

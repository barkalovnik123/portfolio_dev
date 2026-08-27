import type { Swiper, SwiperOptions } from '../core/core.js';
export interface CSSSelector extends String {
}
export type SwiperModule = (ctx: {
    params: SwiperOptions;
    swiper: Swiper;
    extendParams: (obj: Record<string, any>) => void;
    on: Swiper['on'];
    once: Swiper['once'];
    off: Swiper['off'];
    emit: Swiper['emit'];
}) => void;

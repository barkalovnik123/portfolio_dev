import type { Swiper, SwiperOptions } from '../core/core.js';
export interface MountSwiperRefs {
    el: HTMLElement;
    nextEl?: HTMLElement | null;
    prevEl?: HTMLElement | null;
    paginationEl?: HTMLElement | null;
    scrollbarEl?: HTMLElement | null;
    swiper: Swiper;
}
export declare function mountSwiper(refs: MountSwiperRefs, swiperParams: SwiperOptions): void;

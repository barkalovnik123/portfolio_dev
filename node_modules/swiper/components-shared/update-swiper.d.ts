import type { Swiper } from '../core/core.js';
export interface UpdateSwiperArgs {
    swiper: Swiper;
    slides?: unknown[];
    passedParams: Record<string, unknown>;
    changedParams: string[];
    nextEl?: HTMLElement | string | null;
    prevEl?: HTMLElement | string | null;
    scrollbarEl?: HTMLElement | string | null;
    paginationEl?: HTMLElement | string | null;
}
export declare function updateSwiper(args: UpdateSwiperArgs): void;

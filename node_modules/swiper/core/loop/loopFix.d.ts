import type { Swiper } from '../core.js';
interface LoopFixOptions {
    slideRealIndex?: number;
    slideTo?: boolean;
    direction?: 'prev' | 'next';
    setTranslate?: boolean;
    activeSlideIndex?: number;
    initial?: boolean;
    byController?: boolean;
    byMousewheel?: boolean;
}
export default function loopFix(this: Swiper, options?: LoopFixOptions): void;
export {};

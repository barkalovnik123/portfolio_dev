import type { SwiperEvents } from '../types/events.js';
import type { Swiper, SwiperEventHandler } from './core.js';
declare const _default: {
    on(this: Swiper, events: keyof SwiperEvents | string, handler: SwiperEventHandler, priority?: boolean): Swiper;
    once(this: Swiper, events: keyof SwiperEvents | string, handler: SwiperEventHandler, priority?: boolean): Swiper;
    onAny(this: Swiper, handler: SwiperEventHandler, priority?: boolean): Swiper;
    offAny(this: Swiper, handler: SwiperEventHandler): Swiper;
    off(this: Swiper, events: keyof SwiperEvents | string, handler?: SwiperEventHandler): Swiper;
    emit(this: Swiper, ...args: unknown[]): Swiper;
};
export default _default;

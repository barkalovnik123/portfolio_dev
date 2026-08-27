import type { Swiper } from '../core/core.js';
interface EffectVirtualTransitionEndParams {
    swiper: Swiper;
    duration: number;
    transformElements: HTMLElement[];
    allSlides?: boolean;
}
export default function effectVirtualTransitionEnd({ swiper, duration, transformElements, allSlides, }: EffectVirtualTransitionEndParams): void;
export {};

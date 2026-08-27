import type { Swiper } from '../core.js';
export default function transitionEmit({ swiper, runCallbacks, direction, step, }: {
    swiper: Swiper;
    runCallbacks?: boolean;
    direction?: 'reset' | 'prev' | 'next';
    step: 'Start' | 'End';
}): void;

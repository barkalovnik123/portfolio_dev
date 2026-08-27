import type { Swiper } from '../core/core.js';
export default function createElementIfNotDefined<T extends Record<string, any>>(swiper: Swiper, originalParams: T | undefined, params: T | undefined, checkProps: Record<string, string>): T;

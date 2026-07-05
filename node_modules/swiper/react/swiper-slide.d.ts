import React, { type HTMLAttributes, type ReactNode } from 'react';
import type { Swiper as SwiperClass } from '../core/core.js';
import { type SwiperSlideData } from './context.js';
export interface SwiperSlideProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    tag?: string;
    zoom?: boolean | number;
    lazy?: boolean;
    virtualIndex?: number;
    swiperSlideIndex?: number;
    swiper?: SwiperClass | null;
    children?: ReactNode | ((slideData: SwiperSlideData) => ReactNode);
}
declare const SwiperSlide: React.ForwardRefExoticComponent<SwiperSlideProps & React.RefAttributes<HTMLElement>>;
export { SwiperSlide };

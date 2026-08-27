import React, { type HTMLAttributes, type ReactNode } from 'react';
import type { Swiper as SwiperClass, SwiperOptions } from '../core/core.js';
type DropEvents = 'onProgress' | 'onClick' | 'onTouchEnd' | 'onTouchMove' | 'onTouchStart' | 'onTransitionEnd' | 'onKeyPress' | 'onDoubleClick' | 'onScroll' | 'onResize';
export interface SwiperProps extends Omit<HTMLAttributes<HTMLElement>, DropEvents>, SwiperOptions {
    tag?: string;
    wrapperTag?: string;
    onSwiper?: (swiper: SwiperClass) => void;
    children?: ReactNode;
}
declare const Swiper: React.ForwardRefExoticComponent<SwiperProps & React.RefAttributes<HTMLElement>>;
export { Swiper };

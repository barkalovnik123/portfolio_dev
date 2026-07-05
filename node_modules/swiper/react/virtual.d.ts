import { type ReactElement } from 'react';
import type { Swiper as SwiperClass } from '../core/core.js';
import type { ChildWithProps } from './get-children.js';
export interface VirtualData {
    from: number;
    to: number;
    offset: number;
}
export declare function renderVirtual(swiper: SwiperClass | null, slides: ChildWithProps[], virtualData: VirtualData | null): ReactElement[] | null;

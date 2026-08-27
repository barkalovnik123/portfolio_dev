import { type Ref, type VNode } from 'vue';
import type { Swiper as SwiperClass } from '../core/core.js';
export interface VueVirtualData {
    from: number;
    to: number;
    offset: number;
}
interface ComponentOptionsLegacy {
    tag?: string;
    children?: VNode[];
    Ctor?: unknown;
}
interface VNodeWithLegacy extends VNode {
    componentOptions?: ComponentOptionsLegacy;
}
export declare function renderVirtual(swiperRef: Ref<SwiperClass | null>, slides: VNodeWithLegacy[], virtualData: VueVirtualData | null): Array<VNode | undefined> | null;
export {};

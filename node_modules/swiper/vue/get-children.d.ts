import type { Slots, VNode } from 'vue';
type VueSlot = 'container-start' | 'container-end' | 'wrapper-start' | 'wrapper-end';
export interface MutableRef<T> {
    value: T;
}
interface ComponentOptionsLegacy {
    tag?: string;
    children?: VNode[];
    Ctor?: unknown;
}
interface VNodeWithLegacy extends VNode {
    componentOptions?: ComponentOptionsLegacy;
}
export interface GetChildrenResult {
    slides: VNodeWithLegacy[];
    slots: Record<VueSlot, VNodeWithLegacy[]>;
}
export declare function getChildren(originalSlots: Slots | undefined, slidesRef: MutableRef<VNodeWithLegacy[]>, oldSlidesRef: MutableRef<VNodeWithLegacy[]>): GetChildrenResult;
export {};

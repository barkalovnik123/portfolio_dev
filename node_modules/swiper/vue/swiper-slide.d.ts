import { type PropType, type Ref, type VNode } from 'vue';
import type { Swiper as SwiperClass } from '../core/core.js';
declare const SwiperSlide: import("vue").DefineComponent<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    swiperRef: {
        type: PropType<Ref<SwiperClass | null>>;
        required: false;
    };
    swiperSlideIndex: {
        type: NumberConstructor;
        default: undefined;
        required: false;
    };
    zoom: {
        type: PropType<boolean | number>;
        default: undefined;
        required: false;
    };
    lazy: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
    };
    virtualIndex: {
        type: PropType<string | number>;
        default: undefined;
    };
}, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tag: {
        type: StringConstructor;
        default: string;
    };
    swiperRef: {
        type: PropType<Ref<SwiperClass | null>>;
        required: false;
    };
    swiperSlideIndex: {
        type: NumberConstructor;
        default: undefined;
        required: false;
    };
    zoom: {
        type: PropType<boolean | number>;
        default: undefined;
        required: false;
    };
    lazy: {
        type: BooleanConstructor;
        default: boolean;
        required: false;
    };
    virtualIndex: {
        type: PropType<string | number>;
        default: undefined;
    };
}>>, {
    zoom: number | boolean;
    lazy: boolean;
    virtualIndex: string | number;
    tag: string;
    swiperSlideIndex: number;
}, {}>;
export { SwiperSlide };

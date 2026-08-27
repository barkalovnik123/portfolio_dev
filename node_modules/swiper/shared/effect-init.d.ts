import type { Swiper, SwiperOptions } from '../core/core.js';
interface EffectInitParams {
    effect: string;
    swiper: Swiper;
    on: Swiper['on'];
    setTranslate: () => void;
    setTransition: (duration: number) => void;
    overwriteParams?: () => Partial<SwiperOptions>;
    perspective?: () => boolean;
    recreateShadows?: () => void;
    getEffectParams?: () => {
        slideShadows?: boolean;
    } | undefined;
}
export default function effectInit(params: EffectInitParams): void;
export {};

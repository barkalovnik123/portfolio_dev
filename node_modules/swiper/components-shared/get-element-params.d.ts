import type { SwiperOptions } from '../core/core.js';
export interface GetElementParamsResult {
    params: SwiperOptions;
    passedParams: Record<string, unknown>;
}
export declare function getParams(element: Element & Record<string, unknown>, propName?: string, propValue?: unknown): GetElementParamsResult;

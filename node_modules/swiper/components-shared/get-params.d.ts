import type { SwiperOptions, SwiperEvents, SwiperEventHandler } from '../core/core.js';
export type SwiperEventsMap = {
    [E in keyof SwiperEvents]?: SwiperEvents[E];
};
export interface SwiperParamsFromUser extends SwiperOptions {
    on: SwiperEventsMap;
    _emitClasses?: boolean;
    init?: boolean;
}
export interface GetParamsResult {
    params: SwiperParamsFromUser;
    passedParams: Record<string, unknown>;
    rest: Record<string, unknown>;
    events: Record<string, SwiperEventHandler>;
}
export declare function getParams(obj?: Record<string, unknown>, splitEvents?: boolean): GetParamsResult;

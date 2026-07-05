export interface SwiperDevice {
    ios: boolean;
    android: boolean;
    os?: 'ios' | 'android';
}
export interface CalcDeviceOptions {
    userAgent?: string;
}
export declare function getDevice(overrides?: CalcDeviceOptions): SwiperDevice;

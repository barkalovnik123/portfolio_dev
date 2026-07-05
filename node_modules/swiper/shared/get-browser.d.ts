export interface SwiperBrowser {
    isSafari: boolean;
    isWebView: boolean;
    need3dFix: boolean;
}
export declare function getBrowser(): SwiperBrowser;

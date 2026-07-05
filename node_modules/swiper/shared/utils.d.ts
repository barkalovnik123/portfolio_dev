export declare function deleteProps(obj: Record<string, unknown>): void;
export declare function nextTick(callback: () => void, delay?: number): ReturnType<typeof setTimeout>;
export declare function now(): number;
export declare function getComputedStyle(el: Element): CSSStyleDeclaration;
export declare function getTranslate(el: Element, axis?: 'x' | 'y'): number;
export declare function isObject(o: unknown): o is Record<string, unknown>;
export declare function extend<T extends object>(target: T, ...sources: unknown[]): T;
export declare function setCSSProperty(el: HTMLElement, varName: string, varValue: string): void;
export declare function getSlideTransformEl(slideEl: HTMLElement): HTMLElement;
export declare function findElementsInElements(elements?: Element[], selector?: string): Element[];
export declare function elementChildren(element: Element, selector?: string): Element[];
export declare function elementIsChildOf(el: Element, parent: Element): boolean;
export declare function showWarning(text: string): void;
export declare function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, classes?: string | string[]): HTMLElementTagNameMap[K];
export declare function createElement(tag: string, classes?: string | string[]): HTMLElement;
export declare function elementOffset(el: Element): {
    top: number;
    left: number;
};
export declare function elementPrevAll(el: Element, selector?: string): Element[];
export declare function elementNextAll(el: Element, selector?: string): Element[];
export declare function elementStyle(el: Element, prop: string): string;
export declare function elementIndex(el: Element): number | undefined;
export declare function elementParents(el: Element, selector?: string): Element[];
export declare function elementTransitionEnd(el: Element, callback?: (e: TransitionEvent) => void): void;
export declare function elementOuterSize(el: HTMLElement, size: 'width' | 'height', includeMargins?: boolean): number;
export declare function makeElementsArray<T>(el: T | T[]): NonNullable<T>[];
export declare function getRotateFix(swiper: {
    browser?: {
        need3dFix?: boolean;
    };
}): (v: number) => number;
export declare function setInnerHTML(el: Element, html?: string): void;

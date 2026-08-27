import { type ReactElement, type ReactNode } from 'react';
type SwiperSlot = 'container-start' | 'container-end' | 'wrapper-start' | 'wrapper-end';
export type ChildWithProps = ReactElement<{
    slot?: string;
    children?: ReactNode;
} & Record<string, unknown>>;
export interface GetChildrenResult {
    slides: ChildWithProps[];
    slots: Record<SwiperSlot, ChildWithProps[]>;
}
export declare function getChildren(c: ReactNode): GetChildrenResult;
export {};

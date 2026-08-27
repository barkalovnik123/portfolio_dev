import { t as nextTick, m as elementTransitionEnd } from '../shared/utils.mjs';

class LinearSpline {
    x;
    y;
    lastIndex;
    binarySearch;
    constructor(x, y) {
        let maxIndex;
        let minIndex;
        let guess;
        this.binarySearch = (array, val) => {
            minIndex = -1;
            maxIndex = array.length;
            while (maxIndex - minIndex > 1) {
                guess = (maxIndex + minIndex) >> 1;
                if (array[guess] <= val) {
                    minIndex = guess;
                }
                else {
                    maxIndex = guess;
                }
            }
            return maxIndex;
        };
        this.x = x;
        this.y = y;
        this.lastIndex = x.length - 1;
    }
    interpolate(x2) {
        if (!x2)
            return 0;
        const i3 = this.binarySearch(this.x, x2);
        const i1 = i3 - 1;
        // Given an x value (x2), return the expected y2 value:
        // (x1,y1) is the known point before given value,
        // (x3,y3) is the known point after given value.
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
        return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1]);
    }
}
const Controller = ({ swiper, extendParams, on }) => {
    extendParams({
        controller: {
            control: undefined,
            inverse: false,
            by: 'slide', // or 'container'
        },
    });
    swiper.controller = {
        control: undefined,
    };
    function getParams() {
        return swiper.params.controller;
    }
    function getInterpolateFunction(c) {
        swiper.controller.spline = swiper.params.loop
            ? new LinearSpline(swiper.slidesGrid, c.slidesGrid)
            : new LinearSpline(swiper.snapGrid, c.snapGrid);
    }
    function setTranslate(_t, byController) {
        const controlled = swiper.controller.control;
        let multiplier;
        let controlledTranslate;
        const SwiperCtor = swiper.constructor;
        function setControlledTranslate(c) {
            if (c.destroyed)
                return;
            // this will create an Interpolate function based on the snapGrids
            // x is the Grid of the scrolled scroller and y will be the controlled scroller
            // it makes sense to create this only once and recall it for the interpolation
            // the function does a lot of value caching for performance
            const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
            const controllerParams = getParams();
            if (controllerParams.by === 'slide') {
                getInterpolateFunction(c);
                // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                // but it did not work out
                controlledTranslate = -swiper.controller.spline.interpolate(-translate);
            }
            else {
                controlledTranslate = 0;
            }
            if (!controlledTranslate || controllerParams.by === 'container') {
                multiplier =
                    (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
                if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
                    multiplier = 1;
                }
                controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
            }
            if (controllerParams.inverse) {
                controlledTranslate = c.maxTranslate() - controlledTranslate;
            }
            c.updateProgress(controlledTranslate);
            c.setTranslate(controlledTranslate, swiper);
            c.updateActiveIndex();
            c.updateSlidesClasses();
        }
        if (Array.isArray(controlled)) {
            for (let i = 0; i < controlled.length; i += 1) {
                const target = controlled[i];
                if (target && target !== byController && target instanceof SwiperCtor) {
                    setControlledTranslate(target);
                }
            }
        }
        else if (controlled instanceof SwiperCtor && byController !== controlled) {
            setControlledTranslate(controlled);
        }
    }
    function setTransition(duration, byController) {
        const SwiperCtor = swiper.constructor;
        const controlled = swiper.controller.control;
        function setControlledTransition(c) {
            if (c.destroyed)
                return;
            c.setTransition(duration, swiper);
            if (duration !== 0) {
                c.transitionStart();
                if (c.params.autoHeight) {
                    nextTick(() => {
                        c.updateAutoHeight();
                    });
                }
                elementTransitionEnd(c.wrapperEl, () => {
                    if (!controlled)
                        return;
                    c.transitionEnd();
                });
            }
        }
        if (Array.isArray(controlled)) {
            for (let i = 0; i < controlled.length; i += 1) {
                const target = controlled[i];
                if (target && target !== byController && target instanceof SwiperCtor) {
                    setControlledTransition(target);
                }
            }
        }
        else if (controlled instanceof SwiperCtor && byController !== controlled) {
            setControlledTransition(controlled);
        }
    }
    function removeSpline() {
        if (!swiper.controller.control)
            return;
        if (swiper.controller.spline) {
            swiper.controller.spline = undefined;
            delete swiper.controller.spline;
        }
    }
    on('beforeInit', () => {
        const controllerParam = getParams().control;
        if (typeof window !== 'undefined' &&
            (typeof controllerParam === 'string' || controllerParam instanceof HTMLElement)) {
            const controlElements = typeof controllerParam === 'string'
                ? [...document.querySelectorAll(controllerParam)]
                : [controllerParam];
            controlElements.forEach((controlElement) => {
                if (!swiper.controller.control)
                    swiper.controller.control = [];
                const list = swiper.controller.control;
                if (controlElement && controlElement.swiper) {
                    list.push(controlElement.swiper);
                }
                else if (controlElement) {
                    const eventName = `${swiper.params.eventsPrefix}init`;
                    const onControllerSwiper = (e) => {
                        const detail = e.detail;
                        if (detail && detail[0])
                            list.push(detail[0]);
                        swiper.update();
                        controlElement.removeEventListener(eventName, onControllerSwiper);
                    };
                    controlElement.addEventListener(eventName, onControllerSwiper);
                }
            });
            return;
        }
        // After this point control is either Swiper or Swiper[] (or null/undefined),
        // never the string/HTMLElement forms that the public option accepts.
        swiper.controller.control = controllerParam;
    });
    on('update', () => {
        removeSpline();
    });
    on('resize', () => {
        removeSpline();
    });
    on('observerUpdate', () => {
        removeSpline();
    });
    // Event payloads come typed against the legacy public Swiper class
    // (src/types/swiper-class.d.ts) until Phase 5 deletes src/types/; cast the
    // forwarded byController back to the core Swiper so it lines up with the
    // controller-internal signatures.
    on('setTranslate', (_s, translate, byController) => {
        if (!swiper.controller.control)
            return;
        if (!Array.isArray(swiper.controller.control) && swiper.controller.control.destroyed)
            return;
        swiper.controller.setTranslate(translate, byController);
    });
    on('setTransition', (_s, duration, byController) => {
        if (!swiper.controller.control)
            return;
        if (!Array.isArray(swiper.controller.control) && swiper.controller.control.destroyed)
            return;
        swiper.controller.setTransition(duration, byController);
    });
    Object.assign(swiper.controller, {
        setTranslate,
        setTransition,
    });
};

export { Controller as default };

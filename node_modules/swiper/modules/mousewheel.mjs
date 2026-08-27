import { t as nextTick, u as now } from '../shared/utils.mjs';

const Mousewheel = ({ swiper, extendParams, on, emit }) => {
    extendParams({
        mousewheel: {
            enabled: false,
            releaseOnEdges: false,
            invert: false,
            forceToAxis: false,
            sensitivity: 1,
            eventsTarget: 'container',
            thresholdDelta: null,
            thresholdTime: null,
            noMousewheelClass: 'swiper-no-mousewheel',
        },
    });
    let timeout;
    let lastScrollTime = now();
    let lastEventBeforeSnap;
    let mouseEntered = false;
    const recentWheelEvents = [];
    function getParams() {
        return swiper.params.mousewheel;
    }
    function normalize(e) {
        // Reasonable defaults
        const PIXEL_STEP = 10;
        const LINE_HEIGHT = 40;
        const PAGE_HEIGHT = 800;
        const ev = e;
        let sX = 0;
        let sY = 0; // spinX, spinY
        let pX = 0;
        let pY = 0; // pixelX, pixelY
        // Legacy
        if (ev.detail !== undefined) {
            sY = ev.detail;
        }
        if (ev.wheelDelta !== undefined) {
            sY = -ev.wheelDelta / 120;
        }
        if (ev.wheelDeltaY !== undefined) {
            sY = -ev.wheelDeltaY / 120;
        }
        if (ev.wheelDeltaX !== undefined) {
            sX = -ev.wheelDeltaX / 120;
        }
        // side scrolling on FF with DOMMouseScroll
        if (ev.axis !== undefined &&
            ev.HORIZONTAL_AXIS !== undefined &&
            ev.axis === ev.HORIZONTAL_AXIS) {
            sX = sY;
            sY = 0;
        }
        pX = sX * PIXEL_STEP;
        pY = sY * PIXEL_STEP;
        if (ev.deltaY !== undefined) {
            pY = ev.deltaY;
        }
        if (ev.deltaX !== undefined) {
            pX = ev.deltaX;
        }
        if (ev.shiftKey && !pX) {
            // if user scrolls with shift he wants horizontal scroll
            pX = pY;
            pY = 0;
        }
        if ((pX || pY) && ev.deltaMode) {
            if (ev.deltaMode === 1) {
                // delta in LINE units
                pX *= LINE_HEIGHT;
                pY *= LINE_HEIGHT;
            }
            else {
                // delta in PAGE units
                pX *= PAGE_HEIGHT;
                pY *= PAGE_HEIGHT;
            }
        }
        // Fall-back if spin cannot be determined
        if (pX && !sX) {
            sX = pX < 1 ? -1 : 1;
        }
        if (pY && !sY) {
            sY = pY < 1 ? -1 : 1;
        }
        return {
            spinX: sX,
            spinY: sY,
            pixelX: pX,
            pixelY: pY,
        };
    }
    function handleMouseEnter() {
        if (!swiper.enabled)
            return;
        mouseEntered = true;
    }
    function handleMouseLeave() {
        if (!swiper.enabled)
            return;
        mouseEntered = false;
    }
    function animateSlider(newEvent) {
        const params = getParams();
        if (params.thresholdDelta && newEvent.delta < params.thresholdDelta) {
            // Prevent if delta of wheel scroll delta is below configured threshold
            return false;
        }
        if (params.thresholdTime && now() - lastScrollTime < params.thresholdTime) {
            // Prevent if time between scrolls is below configured threshold
            return false;
        }
        // If the movement is NOT big enough and
        // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
        //   Don't go any further (avoid insignificant scroll movement).
        if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
            // Return false as a default
            return true;
        }
        if (newEvent.direction < 0) {
            if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
                swiper.slideNext();
                emit('scroll', newEvent.raw);
            }
        }
        else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
            swiper.slidePrev();
            emit('scroll', newEvent.raw);
        }
        // If you got here is because an animation has been triggered so store the current time
        lastScrollTime = new window.Date().getTime();
        // Return false as a default
        return false;
    }
    function releaseScroll(newEvent) {
        const params = getParams();
        if (newEvent.direction < 0) {
            if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
                // Return true to animate scroll on edges
                return true;
            }
        }
        else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
            // Return true to animate scroll on edges
            return true;
        }
        return false;
    }
    function handle(event) {
        let e = 'originalEvent' in event && event.originalEvent ? event.originalEvent : event;
        let disableParentSwiper = true;
        if (!swiper.enabled)
            return false;
        // Ignore event if the target or its parents have the swiper-no-mousewheel class
        const params = getParams();
        if (event.target.closest(`.${params.noMousewheelClass}`))
            return false;
        if (swiper.params.cssMode) {
            e.preventDefault();
        }
        let targetEl = swiper.el;
        if (params.eventsTarget !== 'container') {
            targetEl = document.querySelector(params.eventsTarget);
        }
        const targetElContainsTarget = targetEl && targetEl.contains(e.target);
        if (!mouseEntered && !targetElContainsTarget && !params.releaseOnEdges)
            return true;
        let delta = 0;
        const rtlFactor = swiper.rtlTranslate ? -1 : 1;
        const data = normalize(e);
        if (params.forceToAxis) {
            if (swiper.isHorizontal()) {
                if (Math.abs(data.pixelX) > Math.abs(data.pixelY))
                    delta = -data.pixelX * rtlFactor;
                else
                    return true;
            }
            else if (Math.abs(data.pixelY) > Math.abs(data.pixelX))
                delta = -data.pixelY;
            else
                return true;
        }
        else {
            delta =
                Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
        }
        if (delta === 0)
            return true;
        if (params.invert)
            delta = -delta;
        // Get the scroll positions
        let positions = swiper.getTranslate() + delta * (params.sensitivity ?? 1);
        if (positions >= swiper.minTranslate())
            positions = swiper.minTranslate();
        if (positions <= swiper.maxTranslate())
            positions = swiper.maxTranslate();
        // When loop is true:
        //     the disableParentSwiper will be true.
        // When loop is false:
        //     if the scroll positions is not on edge,
        //     then the disableParentSwiper will be true.
        //     if the scroll on edge positions,
        //     then the disableParentSwiper will be false.
        disableParentSwiper = swiper.params.loop
            ? true
            : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
        if (disableParentSwiper && swiper.params.nested)
            e.stopPropagation();
        const freeModeParams = swiper.params.freeMode;
        if (!swiper.params.freeMode || !freeModeParams?.enabled) {
            // Register the new event in a variable which stores the relevant data
            const newEvent = {
                time: now(),
                delta: Math.abs(delta),
                direction: Math.sign(delta),
                raw: event,
            };
            // Keep the most recent events
            if (recentWheelEvents.length >= 2) {
                recentWheelEvents.shift(); // only store the last N events
            }
            const prevEvent = recentWheelEvents.length
                ? recentWheelEvents[recentWheelEvents.length - 1]
                : undefined;
            recentWheelEvents.push(newEvent);
            if (prevEvent) {
                if (newEvent.direction !== prevEvent.direction ||
                    newEvent.delta > prevEvent.delta ||
                    newEvent.time > prevEvent.time + 150) {
                    animateSlider(newEvent);
                }
            }
            else {
                animateSlider(newEvent);
            }
            // If it's time to release the scroll:
            //   Return now so you don't hit the preventDefault.
            if (releaseScroll(newEvent)) {
                return true;
            }
        }
        else {
            // Freemode or scrollContainer:
            const newEvent = {
                time: now(),
                delta: Math.abs(delta),
                direction: Math.sign(delta),
            };
            const ignoreWheelEvents = lastEventBeforeSnap &&
                newEvent.time < lastEventBeforeSnap.time + 500 &&
                newEvent.delta <= lastEventBeforeSnap.delta &&
                newEvent.direction === lastEventBeforeSnap.direction;
            if (!ignoreWheelEvents) {
                lastEventBeforeSnap = undefined;
                let position = swiper.getTranslate() + delta * (params.sensitivity ?? 1);
                const wasBeginning = swiper.isBeginning;
                const wasEnd = swiper.isEnd;
                if (position >= swiper.minTranslate())
                    position = swiper.minTranslate();
                if (position <= swiper.maxTranslate())
                    position = swiper.maxTranslate();
                swiper.setTransition(0);
                swiper.setTranslate(position);
                swiper.updateProgress();
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
                if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
                    swiper.updateSlidesClasses();
                }
                if (swiper.params.loop) {
                    swiper.loopFix({
                        direction: newEvent.direction < 0 ? 'next' : 'prev',
                        byMousewheel: true,
                    });
                }
                if (freeModeParams?.sticky) {
                    clearTimeout(timeout);
                    timeout = undefined;
                    if (recentWheelEvents.length >= 15) {
                        recentWheelEvents.shift(); // only store the last N events
                    }
                    const prevEvent = recentWheelEvents.length
                        ? recentWheelEvents[recentWheelEvents.length - 1]
                        : undefined;
                    const firstEvent = recentWheelEvents[0];
                    recentWheelEvents.push(newEvent);
                    if (prevEvent &&
                        (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
                        // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
                        recentWheelEvents.splice(0);
                    }
                    else if (recentWheelEvents.length >= 15 &&
                        firstEvent &&
                        newEvent.time - firstEvent.time < 500 &&
                        firstEvent.delta - newEvent.delta >= 1 &&
                        newEvent.delta <= 6) {
                        const snapToThreshold = delta > 0 ? 0.8 : 0.2;
                        lastEventBeforeSnap = newEvent;
                        recentWheelEvents.splice(0);
                        timeout = nextTick(() => {
                            if (swiper.destroyed || !swiper.params)
                                return;
                            swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                        }, 0); // no delay; move on next tick
                    }
                    if (!timeout) {
                        timeout = nextTick(() => {
                            if (swiper.destroyed || !swiper.params)
                                return;
                            const snapToThreshold = 0.5;
                            lastEventBeforeSnap = newEvent;
                            recentWheelEvents.splice(0);
                            swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
                        }, 500);
                    }
                }
                // Emit event
                if (!ignoreWheelEvents)
                    emit('scroll', e);
                // Stop autoplay
                const autoplayParams = swiper.params.autoplay;
                if (swiper.params.autoplay && autoplayParams?.disableOnInteraction) {
                    swiper.autoplay.stop();
                }
                // Return page scroll on edge positions
                if (params.releaseOnEdges &&
                    (position === swiper.minTranslate() || position === swiper.maxTranslate())) {
                    return true;
                }
            }
        }
        if (e.cancelable)
            e.preventDefault();
        return false;
    }
    function events(method) {
        const params = getParams();
        let targetEl = swiper.el;
        if (params.eventsTarget !== 'container') {
            targetEl = document.querySelector(params.eventsTarget);
        }
        targetEl[method]('mouseenter', handleMouseEnter);
        targetEl[method]('mouseleave', handleMouseLeave);
        targetEl[method]('wheel', handle);
    }
    function enable() {
        if (swiper.params.cssMode) {
            swiper.wrapperEl.removeEventListener('wheel', handle);
            return true;
        }
        if (swiper.mousewheel.enabled)
            return false;
        events('addEventListener');
        swiper.mousewheel.enabled = true;
        return true;
    }
    function disable() {
        if (swiper.params.cssMode) {
            swiper.wrapperEl.addEventListener('wheel', handle);
            return true;
        }
        if (!swiper.mousewheel.enabled)
            return false;
        events('removeEventListener');
        swiper.mousewheel.enabled = false;
        return true;
    }
    on('init', () => {
        const params = getParams();
        if (!params.enabled && swiper.params.cssMode) {
            disable();
        }
        if (params.enabled)
            enable();
    });
    swiper.mousewheel = {
        enabled: false,
        enable,
        disable,
    };
    on('destroy', () => {
        if (swiper.params.cssMode) {
            enable();
        }
        if (swiper.mousewheel.enabled)
            disable();
    });
};

export { Mousewheel as default };

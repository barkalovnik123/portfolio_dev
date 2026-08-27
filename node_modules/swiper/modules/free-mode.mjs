import { u as now, m as elementTransitionEnd } from '../shared/utils.mjs';

const FreeMode = ({ swiper, extendParams, emit, once }) => {
    extendParams({
        freeMode: {
            enabled: false,
            momentum: true,
            momentumRatio: 1,
            momentumBounce: true,
            momentumBounceRatio: 1,
            momentumVelocityRatio: 1,
            sticky: false,
            minimumVelocity: 0.02,
        },
    });
    function getParams() {
        return swiper.params.freeMode;
    }
    function onTouchStart() {
        if (swiper.params.cssMode)
            return;
        const translate = swiper.getTranslate();
        swiper.setTranslate(translate);
        swiper.setTransition(0);
        swiper.touchEventsData.velocities.length = 0;
        swiper.freeMode.onTouchEnd({ currentPos: swiper.rtl ? swiper.translate : -swiper.translate });
    }
    function onTouchMove() {
        if (swiper.params.cssMode)
            return;
        const { touchEventsData: data, touches } = swiper;
        // Velocity
        if (data.velocities.length === 0) {
            data.velocities.push({
                position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
                time: data.touchStartTime ?? now(),
            });
        }
        data.velocities.push({
            position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
            time: now(),
        });
    }
    function onTouchEnd({ currentPos }) {
        if (swiper.params.cssMode)
            return;
        const { wrapperEl, rtlTranslate: rtl, snapGrid, touchEventsData: data } = swiper;
        const params = swiper.params;
        const freeModeParams = getParams();
        // Time diff
        const touchEndTime = now();
        const timeDiff = touchEndTime - (data.touchStartTime ?? touchEndTime);
        if (currentPos < -swiper.minTranslate()) {
            swiper.slideTo(swiper.activeIndex);
            return;
        }
        if (currentPos > -swiper.maxTranslate()) {
            if (swiper.slides.length < snapGrid.length) {
                swiper.slideTo(snapGrid.length - 1);
            }
            else {
                swiper.slideTo(swiper.slides.length - 1);
            }
            return;
        }
        if (freeModeParams.momentum) {
            if (data.velocities.length > 1) {
                const lastMoveEvent = data.velocities.pop();
                const velocityEvent = data.velocities.pop();
                const distance = lastMoveEvent.position - velocityEvent.position;
                const time = lastMoveEvent.time - velocityEvent.time;
                swiper.velocity = distance / time;
                swiper.velocity /= 2;
                if (Math.abs(swiper.velocity) < freeModeParams.minimumVelocity) {
                    swiper.velocity = 0;
                }
                // this implies that the user stopped moving a finger then released.
                // There would be no events with distance zero, so the last event is stale.
                if (time > 150 || now() - lastMoveEvent.time > 300) {
                    swiper.velocity = 0;
                }
            }
            else {
                swiper.velocity = 0;
            }
            swiper.velocity *= freeModeParams.momentumVelocityRatio;
            data.velocities.length = 0;
            let momentumDuration = 1000 * freeModeParams.momentumRatio;
            const momentumDistance = swiper.velocity * momentumDuration;
            let newPosition = swiper.translate + momentumDistance;
            if (rtl)
                newPosition = -newPosition;
            let doBounce = false;
            let afterBouncePosition;
            const bounceAmount = Math.abs(swiper.velocity) * 20 * freeModeParams.momentumBounceRatio;
            let needsLoopFix = false;
            if (newPosition < swiper.maxTranslate()) {
                if (freeModeParams.momentumBounce) {
                    if (newPosition + swiper.maxTranslate() < -bounceAmount) {
                        newPosition = swiper.maxTranslate() - bounceAmount;
                    }
                    afterBouncePosition = swiper.maxTranslate();
                    doBounce = true;
                    data.allowMomentumBounce = true;
                }
                else {
                    newPosition = swiper.maxTranslate();
                }
                if (params.loop && params.centeredSlides)
                    needsLoopFix = true;
            }
            else if (newPosition > swiper.minTranslate()) {
                if (freeModeParams.momentumBounce) {
                    if (newPosition - swiper.minTranslate() > bounceAmount) {
                        newPosition = swiper.minTranslate() + bounceAmount;
                    }
                    afterBouncePosition = swiper.minTranslate();
                    doBounce = true;
                    data.allowMomentumBounce = true;
                }
                else {
                    newPosition = swiper.minTranslate();
                }
                if (params.loop && params.centeredSlides)
                    needsLoopFix = true;
            }
            else if (freeModeParams.sticky) {
                let nextSlide = 0;
                for (let j = 0; j < snapGrid.length; j += 1) {
                    if (snapGrid[j] > -newPosition) {
                        nextSlide = j;
                        break;
                    }
                }
                if (Math.abs(snapGrid[nextSlide] - newPosition) <
                    Math.abs((snapGrid[nextSlide - 1] ?? snapGrid[nextSlide]) - newPosition) ||
                    swiper.swipeDirection === 'next') {
                    newPosition = snapGrid[nextSlide];
                }
                else {
                    newPosition = snapGrid[nextSlide - 1];
                }
                newPosition = -newPosition;
            }
            if (needsLoopFix) {
                once('transitionEnd', () => {
                    swiper.loopFix();
                });
            }
            // Fix duration
            if (swiper.velocity !== 0) {
                if (rtl) {
                    momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
                }
                else {
                    momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
                }
                if (freeModeParams.sticky) {
                    // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
                    // event, then durations can be 20+ seconds to slide one (or zero!) slides.
                    // It's easy to see this when simulating touch with mouse events. To fix this,
                    // limit single-slide swipes to the default slide duration. This also has the
                    // nice side effect of matching slide speed if the user stopped moving before
                    // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
                    // For faster swipes, also apply limits (albeit higher ones).
                    const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
                    const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
                    const speed = params.speed;
                    if (moveDistance < currentSlideSize) {
                        momentumDuration = speed;
                    }
                    else if (moveDistance < 2 * currentSlideSize) {
                        momentumDuration = speed * 1.5;
                    }
                    else {
                        momentumDuration = speed * 2.5;
                    }
                }
            }
            else if (freeModeParams.sticky) {
                swiper.slideToClosest();
                return;
            }
            if (freeModeParams.momentumBounce && doBounce && afterBouncePosition !== undefined) {
                swiper.updateProgress(afterBouncePosition);
                swiper.setTransition(momentumDuration);
                swiper.setTranslate(newPosition);
                swiper.transitionStart(true, swiper.swipeDirection);
                swiper.animating = true;
                elementTransitionEnd(wrapperEl, () => {
                    if (!swiper || swiper.destroyed || !data.allowMomentumBounce)
                        return;
                    emit('momentumBounce');
                    swiper.setTransition(params.speed);
                    setTimeout(() => {
                        swiper.setTranslate(afterBouncePosition);
                        elementTransitionEnd(wrapperEl, () => {
                            if (!swiper || swiper.destroyed)
                                return;
                            swiper.transitionEnd();
                        });
                    }, 0);
                });
            }
            else if (swiper.velocity) {
                emit('_freeModeNoMomentumRelease');
                swiper.updateProgress(newPosition);
                swiper.setTransition(momentumDuration);
                swiper.setTranslate(newPosition);
                swiper.transitionStart(true, swiper.swipeDirection);
                if (!swiper.animating) {
                    swiper.animating = true;
                    elementTransitionEnd(wrapperEl, () => {
                        if (!swiper || swiper.destroyed)
                            return;
                        swiper.transitionEnd();
                    });
                }
            }
            else {
                swiper.updateProgress(newPosition);
            }
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        else if (freeModeParams.sticky) {
            swiper.slideToClosest();
            return;
        }
        else {
            emit('_freeModeNoMomentumRelease');
        }
        if (!freeModeParams.momentum || timeDiff >= params.longSwipesMs) {
            emit('_freeModeStaticRelease');
            swiper.updateProgress();
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
    }
    swiper.freeMode = {
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    };
};

export { FreeMode as default };

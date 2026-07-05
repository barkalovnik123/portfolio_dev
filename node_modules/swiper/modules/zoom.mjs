import { e as elementChildren, j as elementParents, h as elementOffset, q as getTranslate } from '../shared/utils.mjs';

const Zoom = ({ swiper, extendParams, on, emit }) => {
    extendParams({
        zoom: {
            enabled: false,
            limitToOriginalSize: false,
            maxRatio: 3,
            minRatio: 1,
            panOnMouseMove: false,
            toggle: true,
            containerClass: 'swiper-zoom-container',
            zoomedSlideClass: 'swiper-slide-zoomed',
        },
    });
    swiper.zoom = {
        enabled: false,
    };
    function getParams() {
        return swiper.params.zoom;
    }
    let currentScale = 1;
    let isScaling = false;
    let isPanningWithMouse = false;
    let mousePanStart = { x: 0, y: 0 };
    const mousePanSensitivity = -3; // Negative to invert pan direction
    let fakeGestureTouched = false;
    let fakeGestureMoved = false;
    const evCache = [];
    const gesture = {
        originX: 0,
        originY: 0,
        slideEl: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        imageEl: undefined,
        imageWrapEl: undefined,
        maxRatio: 3,
    };
    const image = {
        isTouched: undefined,
        isMoved: undefined,
        currentX: undefined,
        currentY: undefined,
        minX: undefined,
        minY: undefined,
        maxX: undefined,
        maxY: undefined,
        width: undefined,
        height: undefined,
        startX: undefined,
        startY: undefined,
        touchesStart: {},
        touchesCurrent: {},
    };
    const velocity = {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined,
    };
    let scale = 1;
    Object.defineProperty(swiper.zoom, 'scale', {
        get() {
            return scale;
        },
        set(value) {
            if (scale !== value) {
                const imageEl = gesture.imageEl;
                const slideEl = gesture.slideEl;
                emit('zoomChange', value, imageEl, slideEl);
            }
            scale = value;
        },
    });
    function getDistanceBetweenTouches() {
        if (evCache.length < 2)
            return 1;
        const x1 = evCache[0].pageX;
        const y1 = evCache[0].pageY;
        const x2 = evCache[1].pageX;
        const y2 = evCache[1].pageY;
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return distance;
    }
    function getMaxRatio() {
        const params = getParams();
        const attr = gesture.imageWrapEl?.getAttribute('data-swiper-zoom');
        const maxRatio = attr != null ? Number(attr) : params.maxRatio;
        const imageEl = gesture.imageEl;
        if (params.limitToOriginalSize && imageEl && imageEl.naturalWidth) {
            const imageMaxRatio = imageEl.naturalWidth / imageEl.offsetWidth;
            return Math.min(imageMaxRatio, maxRatio);
        }
        return maxRatio;
    }
    function getScaleOrigin() {
        if (evCache.length < 2 || !gesture.imageEl)
            return [null, null];
        const box = gesture.imageEl.getBoundingClientRect();
        return [
            (evCache[0].pageX + (evCache[1].pageX - evCache[0].pageX) / 2 - box.x - window.scrollX) /
                currentScale,
            (evCache[0].pageY + (evCache[1].pageY - evCache[0].pageY) / 2 - box.y - window.scrollY) /
                currentScale,
        ];
    }
    function getSlideSelector() {
        return swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
    }
    function eventWithinSlide(e) {
        const slideSelector = getSlideSelector();
        const target = e.target;
        if (!target)
            return false;
        if (target.matches(slideSelector))
            return true;
        if (swiper.slides.filter((slideEl) => slideEl.contains(target)).length > 0)
            return true;
        return false;
    }
    function eventWithinZoomContainer(e) {
        const selector = `.${getParams().containerClass}`;
        const target = e.target;
        if (!target)
            return false;
        if (target.matches(selector))
            return true;
        if ([...swiper.hostEl.querySelectorAll(selector)].filter((containerEl) => containerEl.contains(target)).length > 0)
            return true;
        return false;
    }
    // Events
    function onGestureStart(e) {
        if (e.pointerType === 'mouse') {
            evCache.splice(0, evCache.length);
        }
        if (!eventWithinSlide(e))
            return;
        const params = getParams();
        fakeGestureTouched = false;
        fakeGestureMoved = false;
        evCache.push(e);
        if (evCache.length < 2) {
            return;
        }
        fakeGestureTouched = true;
        gesture.scaleStart = getDistanceBetweenTouches();
        if (!gesture.slideEl) {
            const target = e.target;
            gesture.slideEl =
                target?.closest(`.${swiper.params.slideClass}, swiper-slide`) ??
                    undefined;
            if (!gesture.slideEl)
                gesture.slideEl = swiper.slides[swiper.activeIndex];
            let imageEl = gesture.slideEl?.querySelector(`.${params.containerClass}`) ?? null;
            if (imageEl) {
                imageEl =
                    imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0] ?? null;
            }
            gesture.imageEl = imageEl ?? undefined;
            if (imageEl) {
                gesture.imageWrapEl =
                    elementParents(imageEl, `.${params.containerClass}`)[0] ??
                        undefined;
            }
            else {
                gesture.imageWrapEl = undefined;
            }
            if (!gesture.imageWrapEl) {
                gesture.imageEl = undefined;
                return;
            }
            gesture.maxRatio = getMaxRatio();
        }
        if (gesture.imageEl) {
            const [originX, originY] = getScaleOrigin();
            gesture.originX = originX ?? 0;
            gesture.originY = originY ?? 0;
            gesture.imageEl.style.transitionDuration = '0ms';
        }
        isScaling = true;
    }
    function onGestureChange(e) {
        if (!eventWithinSlide(e))
            return;
        const params = getParams();
        const zoom = swiper.zoom;
        const pointerIndex = evCache.findIndex((cachedEv) => cachedEv.pointerId === e.pointerId);
        if (pointerIndex >= 0)
            evCache[pointerIndex] = e;
        if (evCache.length < 2) {
            return;
        }
        fakeGestureMoved = true;
        gesture.scaleMove = getDistanceBetweenTouches();
        if (!gesture.imageEl) {
            return;
        }
        zoom.scale = (gesture.scaleMove / (gesture.scaleStart ?? 1)) * currentScale;
        if (zoom.scale > gesture.maxRatio) {
            zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
        }
        if (zoom.scale < params.minRatio) {
            zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
        }
        gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
    }
    function onGestureEnd(e) {
        if (!eventWithinSlide(e))
            return;
        if (e.pointerType === 'mouse' && e.type === 'pointerout')
            return;
        const params = getParams();
        const zoom = swiper.zoom;
        const pointerIndex = evCache.findIndex((cachedEv) => cachedEv.pointerId === e.pointerId);
        if (pointerIndex >= 0)
            evCache.splice(pointerIndex, 1);
        if (!fakeGestureTouched || !fakeGestureMoved) {
            return;
        }
        fakeGestureTouched = false;
        fakeGestureMoved = false;
        if (!gesture.imageEl)
            return;
        zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
        gesture.imageEl.style.transitionDuration = `${swiper.params.speed}ms`;
        gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
        currentScale = zoom.scale;
        isScaling = false;
        if (zoom.scale > 1 && gesture.slideEl) {
            gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
        }
        else if (zoom.scale <= 1 && gesture.slideEl) {
            gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
        }
        if (zoom.scale === 1) {
            gesture.originX = 0;
            gesture.originY = 0;
            gesture.slideEl = undefined;
        }
    }
    let allowTouchMoveTimeout;
    function allowTouchMove() {
        swiper.touchEventsData.preventTouchMoveFromPointerMove = false;
    }
    function preventTouchMove() {
        if (allowTouchMoveTimeout !== undefined)
            clearTimeout(allowTouchMoveTimeout);
        swiper.touchEventsData.preventTouchMoveFromPointerMove = true;
        allowTouchMoveTimeout = setTimeout(() => {
            if (swiper.destroyed)
                return;
            allowTouchMove();
        });
    }
    function onTouchStart(e) {
        const device = swiper.device;
        if (!gesture.imageEl)
            return;
        if (image.isTouched)
            return;
        if (device.android && e.cancelable)
            e.preventDefault();
        image.isTouched = true;
        const event = evCache.length > 0 ? evCache[0] : e;
        image.touchesStart.x = event.pageX;
        image.touchesStart.y = event.pageY;
    }
    function onTouchMove(e) {
        const isMouseEvent = e.pointerType === 'mouse';
        const isMousePan = isMouseEvent && getParams().panOnMouseMove;
        if (!eventWithinSlide(e) || !eventWithinZoomContainer(e)) {
            return;
        }
        const zoom = swiper.zoom;
        if (!gesture.imageEl) {
            return;
        }
        if (!image.isTouched || !gesture.slideEl) {
            if (isMousePan)
                onMouseMove(e);
            return;
        }
        if (isMousePan) {
            onMouseMove(e);
            return;
        }
        if (!image.isMoved) {
            image.width = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
            image.height = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
            image.startX = getTranslate(gesture.imageWrapEl, 'x') || 0;
            image.startY = getTranslate(gesture.imageWrapEl, 'y') || 0;
            gesture.slideWidth = gesture.slideEl.offsetWidth;
            gesture.slideHeight = gesture.slideEl.offsetHeight;
            gesture.imageWrapEl.style.transitionDuration = '0ms';
        }
        // Define if we need image drag
        const scaledWidth = image.width * zoom.scale;
        const scaledHeight = image.height * zoom.scale;
        image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
        image.maxX = -image.minX;
        image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
        image.maxY = -image.minY;
        image.touchesCurrent.x = evCache.length > 0 ? evCache[0].pageX : e.pageX;
        image.touchesCurrent.y = evCache.length > 0 ? evCache[0].pageY : e.pageY;
        const touchesDiff = Math.max(Math.abs(image.touchesCurrent.x - (image.touchesStart.x ?? 0)), Math.abs(image.touchesCurrent.y - (image.touchesStart.y ?? 0)));
        if (touchesDiff > 5) {
            swiper.allowClick = false;
        }
        const startX = image.startX ?? 0;
        const startY = image.startY ?? 0;
        if (!image.isMoved && !isScaling) {
            if (swiper.isHorizontal() &&
                ((Math.floor(image.minX) === Math.floor(startX) &&
                    image.touchesCurrent.x < (image.touchesStart.x ?? 0)) ||
                    (Math.floor(image.maxX) === Math.floor(startX) &&
                        image.touchesCurrent.x > (image.touchesStart.x ?? 0)))) {
                image.isTouched = false;
                allowTouchMove();
                return;
            }
            if (!swiper.isHorizontal() &&
                ((Math.floor(image.minY) === Math.floor(startY) &&
                    image.touchesCurrent.y < (image.touchesStart.y ?? 0)) ||
                    (Math.floor(image.maxY) === Math.floor(startY) &&
                        image.touchesCurrent.y > (image.touchesStart.y ?? 0)))) {
                image.isTouched = false;
                allowTouchMove();
                return;
            }
        }
        if (e.cancelable) {
            e.preventDefault();
        }
        e.stopPropagation();
        preventTouchMove();
        image.isMoved = true;
        const scaleRatio = (zoom.scale - currentScale) / (gesture.maxRatio - getParams().minRatio);
        const { originX, originY } = gesture;
        image.currentX =
            image.touchesCurrent.x -
                (image.touchesStart.x ?? 0) +
                startX +
                scaleRatio * (image.width - originX * 2);
        image.currentY =
            image.touchesCurrent.y -
                (image.touchesStart.y ?? 0) +
                startY +
                scaleRatio * (image.height - originY * 2);
        if (image.currentX < image.minX) {
            image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
        }
        if (image.currentX > image.maxX) {
            image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
        }
        if (image.currentY < image.minY) {
            image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
        }
        if (image.currentY > image.maxY) {
            image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
        }
        // Velocity
        if (!velocity.prevPositionX)
            velocity.prevPositionX = image.touchesCurrent.x;
        if (!velocity.prevPositionY)
            velocity.prevPositionY = image.touchesCurrent.y;
        if (!velocity.prevTime)
            velocity.prevTime = Date.now();
        velocity.x =
            (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
        velocity.y =
            (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
        if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2)
            velocity.x = 0;
        if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2)
            velocity.y = 0;
        velocity.prevPositionX = image.touchesCurrent.x;
        velocity.prevPositionY = image.touchesCurrent.y;
        velocity.prevTime = Date.now();
        gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
    }
    function onTouchEnd() {
        const zoom = swiper.zoom;
        evCache.length = 0;
        if (!gesture.imageEl)
            return;
        if (!image.isTouched || !image.isMoved) {
            image.isTouched = false;
            image.isMoved = false;
            return;
        }
        image.isTouched = false;
        image.isMoved = false;
        let momentumDurationX = 300;
        let momentumDurationY = 300;
        const velocityX = velocity.x ?? 0;
        const velocityY = velocity.y ?? 0;
        const momentumDistanceX = velocityX * momentumDurationX;
        const newPositionX = image.currentX + momentumDistanceX;
        const momentumDistanceY = velocityY * momentumDurationY;
        const newPositionY = image.currentY + momentumDistanceY;
        // Fix duration
        if (velocityX !== 0)
            momentumDurationX = Math.abs((newPositionX - image.currentX) / velocityX);
        if (velocityY !== 0)
            momentumDurationY = Math.abs((newPositionY - image.currentY) / velocityY);
        const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        image.currentX = newPositionX;
        image.currentY = newPositionY;
        // Define if we need image drag
        const scaledWidth = image.width * zoom.scale;
        const scaledHeight = image.height * zoom.scale;
        image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
        image.maxX = -image.minX;
        image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
        image.maxY = -image.minY;
        image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
        image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
        gesture.imageWrapEl.style.transitionDuration = `${momentumDuration}ms`;
        gesture.imageWrapEl.style.transform = `translate3d(${image.currentX}px, ${image.currentY}px,0)`;
    }
    function onTransitionEnd() {
        const zoom = swiper.zoom;
        if (gesture.slideEl && swiper.activeIndex !== swiper.slides.indexOf(gesture.slideEl)) {
            if (gesture.imageEl) {
                gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
            }
            if (gesture.imageWrapEl) {
                gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
            }
            gesture.slideEl.classList.remove(`${getParams().zoomedSlideClass}`);
            zoom.scale = 1;
            currentScale = 1;
            gesture.slideEl = undefined;
            gesture.imageEl = undefined;
            gesture.imageWrapEl = undefined;
            gesture.originX = 0;
            gesture.originY = 0;
        }
    }
    function onMouseMove(e) {
        // Only pan if zoomed in and mouse panning is enabled
        if (currentScale <= 1 || !gesture.imageWrapEl)
            return;
        if (!eventWithinSlide(e) || !eventWithinZoomContainer(e))
            return;
        const currentTransform = window.getComputedStyle(gesture.imageWrapEl).transform;
        const matrix = new window.DOMMatrix(currentTransform);
        if (!isPanningWithMouse) {
            isPanningWithMouse = true;
            mousePanStart.x = e.clientX;
            mousePanStart.y = e.clientY;
            image.startX = matrix.e;
            image.startY = matrix.f;
            image.width = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
            image.height = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
            gesture.slideWidth = gesture.slideEl.offsetWidth;
            gesture.slideHeight = gesture.slideEl.offsetHeight;
            return;
        }
        const deltaX = (e.clientX - mousePanStart.x) * mousePanSensitivity;
        const deltaY = (e.clientY - mousePanStart.y) * mousePanSensitivity;
        const scaledWidth = image.width * currentScale;
        const scaledHeight = image.height * currentScale;
        const slideWidth = gesture.slideWidth;
        const slideHeight = gesture.slideHeight;
        const minX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
        const maxX = -minX;
        const minY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
        const maxY = -minY;
        const newX = Math.max(Math.min(image.startX + deltaX, maxX), minX);
        const newY = Math.max(Math.min(image.startY + deltaY, maxY), minY);
        gesture.imageWrapEl.style.transitionDuration = '0ms';
        gesture.imageWrapEl.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
        mousePanStart.x = e.clientX;
        mousePanStart.y = e.clientY;
        image.startX = newX;
        image.startY = newY;
        image.currentX = newX;
        image.currentY = newY;
    }
    function zoomIn(e) {
        const zoom = swiper.zoom;
        const params = getParams();
        if (!gesture.slideEl) {
            if (e && typeof e !== 'number' && 'target' in e && e.target) {
                gesture.slideEl =
                    e.target.closest(`.${swiper.params.slideClass}, swiper-slide`) ?? undefined;
            }
            if (!gesture.slideEl) {
                const virtual = swiper.params.virtual;
                if (virtual && virtual.enabled && swiper.virtual) {
                    gesture.slideEl =
                        elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0] ?? undefined;
                }
                else {
                    gesture.slideEl = swiper.slides[swiper.activeIndex];
                }
            }
            let imageEl = gesture.slideEl?.querySelector(`.${params.containerClass}`) ?? null;
            if (imageEl) {
                imageEl =
                    imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0] ?? null;
            }
            gesture.imageEl = imageEl ?? undefined;
            if (imageEl) {
                gesture.imageWrapEl =
                    elementParents(imageEl, `.${params.containerClass}`)[0] ??
                        undefined;
            }
            else {
                gesture.imageWrapEl = undefined;
            }
        }
        if (!gesture.imageEl || !gesture.imageWrapEl || !gesture.slideEl)
            return;
        gesture.maxRatio = getMaxRatio();
        if (swiper.params.cssMode) {
            swiper.wrapperEl.style.overflow = 'hidden';
            swiper.wrapperEl.style.touchAction = 'none';
        }
        gesture.slideEl.classList.add(`${params.zoomedSlideClass}`);
        let touchX;
        let touchY;
        let offsetX;
        let offsetY;
        let diffX;
        let diffY;
        let translateX;
        let translateY;
        let imageWidth;
        let imageHeight;
        let scaledWidth;
        let scaledHeight;
        let translateMinX;
        let translateMinY;
        let translateMaxX;
        let translateMaxY;
        let slideWidth;
        let slideHeight;
        const eventIsPointer = e && typeof e !== 'number';
        if (typeof image.touchesStart.x === 'undefined' && eventIsPointer) {
            touchX = e.pageX;
            touchY = e.pageY;
        }
        else {
            touchX = image.touchesStart.x;
            touchY = image.touchesStart.y;
        }
        const prevScale = currentScale;
        const forceZoomRatio = typeof e === 'number' ? e : null;
        if (currentScale === 1 && forceZoomRatio) {
            touchX = undefined;
            touchY = undefined;
            image.touchesStart.x = undefined;
            image.touchesStart.y = undefined;
        }
        const maxRatio = getMaxRatio();
        zoom.scale = forceZoomRatio || maxRatio;
        currentScale = forceZoomRatio || maxRatio;
        if (e && !(currentScale === 1 && forceZoomRatio)) {
            slideWidth = gesture.slideEl.offsetWidth;
            slideHeight = gesture.slideEl.offsetHeight;
            offsetX = elementOffset(gesture.slideEl).left + window.scrollX;
            offsetY = elementOffset(gesture.slideEl).top + window.scrollY;
            diffX = offsetX + slideWidth / 2 - (touchX ?? 0);
            diffY = offsetY + slideHeight / 2 - (touchY ?? 0);
            imageWidth = gesture.imageEl.offsetWidth || gesture.imageEl.clientWidth;
            imageHeight = gesture.imageEl.offsetHeight || gesture.imageEl.clientHeight;
            scaledWidth = imageWidth * zoom.scale;
            scaledHeight = imageHeight * zoom.scale;
            translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
            translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
            translateMaxX = -translateMinX;
            translateMaxY = -translateMinY;
            if (prevScale > 0 &&
                forceZoomRatio &&
                typeof image.currentX === 'number' &&
                typeof image.currentY === 'number') {
                translateX = (image.currentX * zoom.scale) / prevScale;
                translateY = (image.currentY * zoom.scale) / prevScale;
            }
            else {
                translateX = diffX * zoom.scale;
                translateY = diffY * zoom.scale;
            }
            if (translateX < translateMinX) {
                translateX = translateMinX;
            }
            if (translateX > translateMaxX) {
                translateX = translateMaxX;
            }
            if (translateY < translateMinY) {
                translateY = translateMinY;
            }
            if (translateY > translateMaxY) {
                translateY = translateMaxY;
            }
        }
        else {
            translateX = 0;
            translateY = 0;
        }
        if (forceZoomRatio && zoom.scale === 1) {
            gesture.originX = 0;
            gesture.originY = 0;
        }
        image.currentX = translateX;
        image.currentY = translateY;
        gesture.imageWrapEl.style.transitionDuration = '300ms';
        gesture.imageWrapEl.style.transform = `translate3d(${translateX}px, ${translateY}px,0)`;
        gesture.imageEl.style.transitionDuration = '300ms';
        gesture.imageEl.style.transform = `translate3d(0,0,0) scale(${zoom.scale})`;
    }
    function zoomOut() {
        const zoom = swiper.zoom;
        const params = getParams();
        if (!gesture.slideEl) {
            const virtual = swiper.params.virtual;
            if (virtual && virtual.enabled && swiper.virtual) {
                gesture.slideEl =
                    elementChildren(swiper.slidesEl, `.${swiper.params.slideActiveClass}`)[0] ?? undefined;
            }
            else {
                gesture.slideEl = swiper.slides[swiper.activeIndex];
            }
            let imageEl = gesture.slideEl?.querySelector(`.${params.containerClass}`) ?? null;
            if (imageEl) {
                imageEl =
                    imageEl.querySelectorAll('picture, img, svg, canvas, .swiper-zoom-target')[0] ?? null;
            }
            gesture.imageEl = imageEl ?? undefined;
            if (imageEl) {
                gesture.imageWrapEl =
                    elementParents(imageEl, `.${params.containerClass}`)[0] ??
                        undefined;
            }
            else {
                gesture.imageWrapEl = undefined;
            }
        }
        if (!gesture.imageEl || !gesture.imageWrapEl || !gesture.slideEl)
            return;
        gesture.maxRatio = getMaxRatio();
        if (swiper.params.cssMode) {
            swiper.wrapperEl.style.overflow = '';
            swiper.wrapperEl.style.touchAction = '';
        }
        zoom.scale = 1;
        currentScale = 1;
        image.currentX = undefined;
        image.currentY = undefined;
        image.touchesStart.x = undefined;
        image.touchesStart.y = undefined;
        gesture.imageWrapEl.style.transitionDuration = '300ms';
        gesture.imageWrapEl.style.transform = 'translate3d(0,0,0)';
        gesture.imageEl.style.transitionDuration = '300ms';
        gesture.imageEl.style.transform = 'translate3d(0,0,0) scale(1)';
        gesture.slideEl.classList.remove(`${params.zoomedSlideClass}`);
        gesture.slideEl = undefined;
        gesture.originX = 0;
        gesture.originY = 0;
        if (params.panOnMouseMove) {
            mousePanStart = { x: 0, y: 0 };
            if (isPanningWithMouse) {
                isPanningWithMouse = false;
                image.startX = 0;
                image.startY = 0;
            }
        }
    }
    // Toggle Zoom
    function zoomToggle(e) {
        const zoom = swiper.zoom;
        if (zoom.scale && zoom.scale !== 1) {
            // Zoom Out
            zoomOut();
        }
        else {
            // Zoom In
            zoomIn(e);
        }
    }
    function getListeners() {
        const passiveListener = swiper.params.passiveListeners
            ? { passive: true, capture: false }
            : false;
        const activeListenerWithCapture = swiper.params.passiveListeners
            ? { passive: false, capture: true }
            : true;
        return { passiveListener, activeListenerWithCapture };
    }
    // Attach/Detach Events
    function enable() {
        const zoom = swiper.zoom;
        if (zoom.enabled)
            return;
        zoom.enabled = true;
        const { passiveListener, activeListenerWithCapture } = getListeners();
        // Scale image
        swiper.wrapperEl.addEventListener('pointerdown', onGestureStart, passiveListener);
        swiper.wrapperEl.addEventListener('pointermove', onGestureChange, activeListenerWithCapture);
        ['pointerup', 'pointercancel', 'pointerout'].forEach((eventName) => {
            swiper.wrapperEl.addEventListener(eventName, onGestureEnd, passiveListener);
        });
        // Move image
        swiper.wrapperEl.addEventListener('pointermove', onTouchMove, activeListenerWithCapture);
    }
    function disable() {
        const zoom = swiper.zoom;
        if (!zoom.enabled)
            return;
        zoom.enabled = false;
        const { passiveListener, activeListenerWithCapture } = getListeners();
        // Scale image
        swiper.wrapperEl.removeEventListener('pointerdown', onGestureStart, passiveListener);
        swiper.wrapperEl.removeEventListener('pointermove', onGestureChange, activeListenerWithCapture);
        ['pointerup', 'pointercancel', 'pointerout'].forEach((eventName) => {
            swiper.wrapperEl.removeEventListener(eventName, onGestureEnd, passiveListener);
        });
        // Move image
        swiper.wrapperEl.removeEventListener('pointermove', onTouchMove, activeListenerWithCapture);
    }
    on('init', () => {
        if (getParams().enabled) {
            enable();
        }
    });
    on('destroy', () => {
        disable();
    });
    on('touchStart', (_s, e) => {
        if (!swiper.zoom.enabled)
            return;
        onTouchStart(e);
    });
    on('touchEnd', () => {
        if (!swiper.zoom.enabled)
            return;
        onTouchEnd();
    });
    on('doubleTap', (_s, e) => {
        if (!swiper.animating && getParams().enabled && swiper.zoom.enabled && getParams().toggle) {
            zoomToggle(e);
        }
    });
    on('transitionEnd', () => {
        if (swiper.zoom.enabled && getParams().enabled) {
            onTransitionEnd();
        }
    });
    on('slideChange', () => {
        if (swiper.zoom.enabled && getParams().enabled && swiper.params.cssMode) {
            onTransitionEnd();
        }
    });
    Object.assign(swiper.zoom, {
        enable,
        disable,
        in: zoomIn,
        out: zoomOut,
        toggle: zoomToggle,
    });
};

export { Zoom as default };

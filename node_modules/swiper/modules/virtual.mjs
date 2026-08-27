import { v as setCSSProperty, e as elementChildren, w as setInnerHTML, a as createElement } from '../shared/utils.mjs';

const Virtual = ({ swiper, extendParams, on, emit }) => {
    extendParams({
        virtual: {
            enabled: false,
            slides: [],
            cache: true,
            slidesPerViewAutoSlideSize: 320,
            renderSlide: null,
            renderExternal: null,
            renderExternalUpdate: true,
            addSlidesBefore: 0,
            addSlidesAfter: 0,
        },
    });
    let cssModeTimeout;
    // Methods (appendSlide/prependSlide/removeSlide/removeAllSlides/update) are
    // attached via Object.assign below once they're defined. Cast through
    // Partial<> so the initial state-only literal can be assigned without
    // pretending the methods exist yet.
    swiper.virtual = {
        cache: {},
        from: 0,
        to: 0,
        slides: [],
        offset: 0,
        slidesGrid: [],
    };
    function getParams() {
        return swiper.params.virtual;
    }
    // Created lazily so module init does not touch the DOM (SSR / Node safe).
    let tempDOM;
    const getTempDOM = () => (tempDOM ??= document.createElement('div'));
    function renderSlide(slide, index) {
        const params = getParams();
        if (params.cache && swiper.virtual.cache[index]) {
            return swiper.virtual.cache[index];
        }
        let slideEl;
        if (params.renderSlide) {
            const rendered = params.renderSlide.call(swiper, slide, index);
            if (typeof rendered === 'string') {
                const el = getTempDOM();
                setInnerHTML(el, rendered);
                slideEl = el.children[0];
            }
            else {
                slideEl = rendered;
            }
        }
        else if (swiper.isElement) {
            slideEl = createElement('swiper-slide');
        }
        else {
            slideEl = createElement('div', swiper.params.slideClass);
        }
        slideEl.setAttribute('data-swiper-slide-index', String(index));
        if (!params.renderSlide) {
            setInnerHTML(slideEl, slide);
        }
        if (params.cache) {
            swiper.virtual.cache[index] = slideEl;
        }
        return slideEl;
    }
    function update(force, beforeInit, forceActiveIndex) {
        const { slidesPerGroup, centeredSlides, slidesPerView, loop: isLoop, initialSlide, } = swiper.params;
        if (beforeInit && !isLoop && (initialSlide ?? 0) > 0) {
            return;
        }
        const { addSlidesBefore, addSlidesAfter, slidesPerViewAutoSlideSize } = getParams();
        const { from: previousFrom, to: previousTo, slides, slidesGrid: previousSlidesGrid, offset: previousOffset, } = swiper.virtual;
        if (!swiper.params.cssMode) {
            swiper.updateActiveIndex();
        }
        const activeIndex = typeof forceActiveIndex === 'undefined' ? swiper.activeIndex || 0 : forceActiveIndex;
        let offsetProp;
        if (swiper.rtlTranslate)
            offsetProp = 'right';
        else
            offsetProp = swiper.isHorizontal() ? 'left' : 'top';
        let slidesPerViewNumeric;
        if (slidesPerView === 'auto') {
            if (slidesPerViewAutoSlideSize) {
                let swiperSize = swiper.size;
                if (!swiperSize) {
                    swiperSize = swiper.isHorizontal()
                        ? swiper.el.getBoundingClientRect().width
                        : swiper.el.getBoundingClientRect().height;
                }
                slidesPerViewNumeric = Math.max(1, Math.ceil(swiperSize / slidesPerViewAutoSlideSize));
            }
            else {
                slidesPerViewNumeric = 1;
            }
        }
        else {
            slidesPerViewNumeric = slidesPerView ?? 1;
        }
        const groupSize = slidesPerGroup ?? 1;
        let slidesAfter;
        let slidesBefore;
        if (centeredSlides) {
            slidesAfter = Math.floor(slidesPerViewNumeric / 2) + groupSize + addSlidesAfter;
            slidesBefore = Math.floor(slidesPerViewNumeric / 2) + groupSize + addSlidesBefore;
        }
        else {
            slidesAfter = slidesPerViewNumeric + (groupSize - 1) + addSlidesAfter;
            slidesBefore = (isLoop ? slidesPerViewNumeric : groupSize) + addSlidesBefore;
        }
        let from = activeIndex - slidesBefore;
        let to = activeIndex + slidesAfter;
        if (!isLoop) {
            from = Math.max(from, 0);
            to = Math.min(to, slides.length - 1);
        }
        let offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
        if (isLoop && activeIndex >= slidesBefore) {
            from -= slidesBefore;
            if (!centeredSlides)
                offset += swiper.slidesGrid[0];
        }
        else if (isLoop && activeIndex < slidesBefore) {
            from = -slidesBefore;
            if (centeredSlides)
                offset += swiper.slidesGrid[0];
        }
        Object.assign(swiper.virtual, {
            from,
            to,
            offset,
            slidesGrid: swiper.slidesGrid,
            slidesBefore,
            slidesAfter,
        });
        function onRendered() {
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            emit('virtualUpdate');
        }
        if (previousFrom === from && previousTo === to && !force) {
            if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
                swiper.slides.forEach((slideEl) => {
                    slideEl.style.setProperty(offsetProp, `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`);
                });
            }
            swiper.updateProgress();
            emit('virtualUpdate');
            return;
        }
        const virtualParams = getParams();
        if (virtualParams.renderExternal) {
            const slidesToRender = [];
            for (let i = from; i <= to; i += 1) {
                slidesToRender.push(slides[i]);
            }
            virtualParams.renderExternal.call(swiper, {
                offset,
                from,
                to,
                slides: slidesToRender,
            });
            if (virtualParams.renderExternalUpdate) {
                onRendered();
            }
            else {
                emit('virtualUpdate');
            }
            return;
        }
        const prependIndexes = [];
        const appendIndexes = [];
        const getSlideIndex = (index) => {
            let slideIndex = index;
            if (index < 0) {
                slideIndex = slides.length + index;
            }
            else if (slideIndex >= slides.length) {
                slideIndex = slideIndex - slides.length;
            }
            return slideIndex;
        };
        if (force) {
            swiper.slides
                .filter((el) => el.matches(`.${swiper.params.slideClass}, swiper-slide`))
                .forEach((slideEl) => {
                slideEl.remove();
            });
        }
        else {
            for (let i = previousFrom; i <= previousTo; i += 1) {
                if (i < from || i > to) {
                    const slideIndex = getSlideIndex(i);
                    swiper.slides
                        .filter((el) => el.matches(`.${swiper.params.slideClass}[data-swiper-slide-index="${slideIndex}"], swiper-slide[data-swiper-slide-index="${slideIndex}"]`))
                        .forEach((slideEl) => {
                        slideEl.remove();
                    });
                }
            }
        }
        const loopFrom = isLoop ? -slides.length : 0;
        const loopTo = isLoop ? slides.length * 2 : slides.length;
        for (let i = loopFrom; i < loopTo; i += 1) {
            if (i >= from && i <= to) {
                const slideIndex = getSlideIndex(i);
                if (typeof previousTo === 'undefined' || force) {
                    appendIndexes.push(slideIndex);
                }
                else {
                    if (i > previousTo)
                        appendIndexes.push(slideIndex);
                    if (i < previousFrom)
                        prependIndexes.push(slideIndex);
                }
            }
        }
        appendIndexes.forEach((index) => {
            swiper.slidesEl.append(renderSlide(slides[index], index));
        });
        if (isLoop) {
            for (let i = prependIndexes.length - 1; i >= 0; i -= 1) {
                const index = prependIndexes[i];
                swiper.slidesEl.prepend(renderSlide(slides[index], index));
            }
        }
        else {
            prependIndexes.sort((a, b) => b - a);
            prependIndexes.forEach((index) => {
                swiper.slidesEl.prepend(renderSlide(slides[index], index));
            });
        }
        elementChildren(swiper.slidesEl, '.swiper-slide, swiper-slide').forEach((slideEl) => {
            slideEl.style.setProperty(offsetProp, `${offset - Math.abs(swiper.cssOverflowAdjustment())}px`);
        });
        onRendered();
    }
    function appendSlide(slides) {
        if (slides !== null &&
            typeof slides === 'object' &&
            'length' in slides) {
            const arr = slides;
            for (let i = 0; i < arr.length; i += 1) {
                if (arr[i])
                    swiper.virtual.slides.push(arr[i]);
            }
        }
        else {
            swiper.virtual.slides.push(slides);
        }
        update(true);
    }
    function prependSlide(slides) {
        const activeIndex = swiper.activeIndex;
        let newActiveIndex = activeIndex + 1;
        let numberOfNewSlides = 1;
        if (Array.isArray(slides)) {
            for (let i = 0; i < slides.length; i += 1) {
                if (slides[i])
                    swiper.virtual.slides.unshift(slides[i]);
            }
            newActiveIndex = activeIndex + slides.length;
            numberOfNewSlides = slides.length;
        }
        else {
            swiper.virtual.slides.unshift(slides);
        }
        if (getParams().cache) {
            const cache = swiper.virtual.cache;
            const newCache = {};
            Object.keys(cache).forEach((cachedIndex) => {
                const cachedEl = cache[Number(cachedIndex)];
                const cachedElIndex = cachedEl.getAttribute('data-swiper-slide-index');
                if (cachedElIndex) {
                    cachedEl.setAttribute('data-swiper-slide-index', String(parseInt(cachedElIndex, 10) + numberOfNewSlides));
                }
                newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = cachedEl;
            });
            swiper.virtual.cache = newCache;
        }
        update(true);
        swiper.slideTo(newActiveIndex, 0);
    }
    function removeSlide(slidesIndexes) {
        if (typeof slidesIndexes === 'undefined' || slidesIndexes === null)
            return;
        let activeIndex = swiper.activeIndex;
        const shiftCacheDownFrom = (removedIndex) => {
            Object.keys(swiper.virtual.cache).forEach((key) => {
                const numericKey = Number(key);
                if (numericKey > removedIndex) {
                    const shifted = swiper.virtual.cache[numericKey];
                    swiper.virtual.cache[numericKey - 1] = shifted;
                    shifted.setAttribute('data-swiper-slide-index', String(numericKey - 1));
                    delete swiper.virtual.cache[numericKey];
                }
            });
        };
        if (Array.isArray(slidesIndexes)) {
            for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
                if (getParams().cache) {
                    delete swiper.virtual.cache[slidesIndexes[i]];
                    shiftCacheDownFrom(slidesIndexes[i]);
                }
                swiper.virtual.slides.splice(slidesIndexes[i], 1);
                if (slidesIndexes[i] < activeIndex)
                    activeIndex -= 1;
                activeIndex = Math.max(activeIndex, 0);
            }
        }
        else {
            if (getParams().cache) {
                delete swiper.virtual.cache[slidesIndexes];
                shiftCacheDownFrom(slidesIndexes);
            }
            swiper.virtual.slides.splice(slidesIndexes, 1);
            if (slidesIndexes < activeIndex)
                activeIndex -= 1;
            activeIndex = Math.max(activeIndex, 0);
        }
        update(true);
        swiper.slideTo(activeIndex, 0);
    }
    function removeAllSlides() {
        swiper.virtual.slides = [];
        if (getParams().cache) {
            swiper.virtual.cache = {};
        }
        update(true);
        swiper.slideTo(0, 0);
    }
    on('beforeInit', () => {
        if (!getParams().enabled)
            return;
        let domSlidesAssigned = false;
        const passedVirtual = swiper.passedParams.virtual;
        const passedSlidesUndefined = !passedVirtual || typeof passedVirtual !== 'object' || passedVirtual.slides === undefined;
        if (passedSlidesUndefined) {
            const slides = [...swiper.slidesEl.children].filter((el) => el.matches(`.${swiper.params.slideClass}, swiper-slide`));
            if (slides && slides.length) {
                swiper.virtual.slides = [...slides];
                domSlidesAssigned = true;
                slides.forEach((slideEl, slideIndex) => {
                    slideEl.setAttribute('data-swiper-slide-index', String(slideIndex));
                    swiper.virtual.cache[slideIndex] = slideEl;
                    slideEl.remove();
                });
            }
        }
        if (!domSlidesAssigned) {
            swiper.virtual.slides = getParams().slides;
        }
        swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
        update(false, true);
    });
    on('setTranslate', () => {
        if (!getParams().enabled)
            return;
        if (swiper.params.cssMode && !swiper._immediateVirtual) {
            clearTimeout(cssModeTimeout);
            cssModeTimeout = setTimeout(() => {
                update();
            }, 100);
        }
        else {
            update();
        }
    });
    on('init update resize', () => {
        if (!getParams().enabled)
            return;
        if (swiper.params.cssMode) {
            setCSSProperty(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
        }
    });
    Object.assign(swiper.virtual, {
        appendSlide,
        prependSlide,
        removeSlide,
        removeAllSlides,
        update,
    });
};

export { Virtual as default };

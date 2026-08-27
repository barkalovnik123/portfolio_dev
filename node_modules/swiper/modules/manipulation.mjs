import { w as setInnerHTML } from '../shared/utils.mjs';

function addSlide(index, slides) {
    const swiper = this;
    const { params, activeIndex, slidesEl } = swiper;
    let activeIndexBuffer = activeIndex;
    if (params.loop) {
        activeIndexBuffer -= swiper.loopedSlides ?? 0;
        swiper.loopDestroy();
        swiper.recalcSlides();
    }
    const baseLength = swiper.slides.length;
    if (index <= 0) {
        swiper.prependSlide(slides);
        return;
    }
    if (index >= baseLength) {
        swiper.appendSlide(slides);
        return;
    }
    let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
    const slidesBuffer = [];
    for (let i = baseLength - 1; i >= index; i -= 1) {
        const currentSlide = swiper.slides[i];
        if (!currentSlide)
            continue;
        currentSlide.remove();
        slidesBuffer.unshift(currentSlide);
    }
    if (Array.isArray(slides)) {
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            if (slide)
                slidesEl.append(slide);
        }
        newActiveIndex =
            activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    }
    else {
        slidesEl.append(slides);
    }
    for (let i = 0; i < slidesBuffer.length; i += 1) {
        slidesEl.append(slidesBuffer[i]);
    }
    swiper.recalcSlides();
    if (params.loop) {
        swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
        swiper.update();
    }
    if (params.loop) {
        swiper.slideTo(newActiveIndex + (swiper.loopedSlides ?? 0), 0, false);
    }
    else {
        swiper.slideTo(newActiveIndex, 0, false);
    }
}

function appendSlide(slides) {
    const swiper = this;
    const { params, slidesEl } = swiper;
    if (params.loop) {
        swiper.loopDestroy();
    }
    const appendElement = (slideEl) => {
        if (typeof slideEl === 'string') {
            const tempDOM = document.createElement('div');
            setInnerHTML(tempDOM, slideEl);
            const child = tempDOM.children[0];
            if (child)
                slidesEl.append(child);
            setInnerHTML(tempDOM, '');
        }
        else {
            slidesEl.append(slideEl);
        }
    };
    if (Array.isArray(slides)) {
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            if (slide)
                appendElement(slide);
        }
    }
    else {
        appendElement(slides);
    }
    swiper.recalcSlides();
    if (params.loop) {
        swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
        swiper.update();
    }
}

function prependSlide(slides) {
    const swiper = this;
    const { params, activeIndex, slidesEl } = swiper;
    if (params.loop) {
        swiper.loopDestroy();
    }
    let newActiveIndex = activeIndex + 1;
    const prependElement = (slideEl) => {
        if (typeof slideEl === 'string') {
            const tempDOM = document.createElement('div');
            setInnerHTML(tempDOM, slideEl);
            const child = tempDOM.children[0];
            if (child)
                slidesEl.prepend(child);
            setInnerHTML(tempDOM, '');
        }
        else {
            slidesEl.prepend(slideEl);
        }
    };
    if (Array.isArray(slides)) {
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            if (slide)
                prependElement(slide);
        }
        newActiveIndex = activeIndex + slides.length;
    }
    else {
        prependElement(slides);
    }
    swiper.recalcSlides();
    if (params.loop) {
        swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
        swiper.update();
    }
    swiper.slideTo(newActiveIndex, 0, false);
}

function removeAllSlides() {
    const swiper = this;
    const slidesIndexes = [];
    for (let i = 0; i < swiper.slides.length; i += 1) {
        slidesIndexes.push(i);
    }
    swiper.removeSlide(slidesIndexes);
}

function removeSlide(slidesIndexes) {
    const swiper = this;
    const { params, activeIndex } = swiper;
    let activeIndexBuffer = activeIndex;
    if (params.loop) {
        activeIndexBuffer -= swiper.loopedSlides ?? 0;
        swiper.loopDestroy();
    }
    let newActiveIndex = activeIndexBuffer;
    if (Array.isArray(slidesIndexes)) {
        for (let i = 0; i < slidesIndexes.length; i += 1) {
            const indexToRemove = slidesIndexes[i];
            if (swiper.slides[indexToRemove])
                swiper.slides[indexToRemove].remove();
            if (indexToRemove < newActiveIndex)
                newActiveIndex -= 1;
        }
        newActiveIndex = Math.max(newActiveIndex, 0);
    }
    else {
        const indexToRemove = slidesIndexes;
        if (swiper.slides[indexToRemove])
            swiper.slides[indexToRemove].remove();
        if (indexToRemove < newActiveIndex)
            newActiveIndex -= 1;
        newActiveIndex = Math.max(newActiveIndex, 0);
    }
    swiper.recalcSlides();
    if (params.loop) {
        swiper.loopCreate();
    }
    if (!params.observer || swiper.isElement) {
        swiper.update();
    }
    if (params.loop) {
        swiper.slideTo(newActiveIndex + (swiper.loopedSlides ?? 0), 0, false);
    }
    else {
        swiper.slideTo(newActiveIndex, 0, false);
    }
}

const Manipulation = ({ swiper }) => {
    Object.assign(swiper, {
        appendSlide: appendSlide.bind(swiper),
        prependSlide: prependSlide.bind(swiper),
        addSlide: addSlide.bind(swiper),
        removeSlide: removeSlide.bind(swiper),
        removeAllSlides: removeAllSlides.bind(swiper),
    });
};

export { Manipulation as default };

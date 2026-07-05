const Grid = ({ swiper, extendParams, on }) => {
    extendParams({
        grid: {
            rows: 1,
            fill: 'column',
        },
    });
    function getParams() {
        return swiper.params.grid;
    }
    let slidesNumberEvenToRows;
    let slidesPerRow;
    let numFullColumns;
    let wasMultiRow;
    const getSpaceBetween = () => {
        let spaceBetween = swiper.params.spaceBetween ?? 0;
        if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
            spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiper.size;
        }
        else if (typeof spaceBetween === 'string') {
            spaceBetween = parseFloat(spaceBetween);
        }
        return spaceBetween;
    };
    const isVirtualEnabled = () => {
        const virtualParams = swiper.params.virtual;
        return (!!swiper.virtual &&
            typeof virtualParams === 'object' &&
            virtualParams !== null &&
            !!virtualParams.enabled);
    };
    const initSlides = (slides) => {
        const { slidesPerView } = swiper.params;
        const { rows, fill } = getParams();
        const slidesLength = isVirtualEnabled() ? swiper.virtual.slides.length : slides.length;
        numFullColumns = Math.floor(slidesLength / rows);
        if (Math.floor(slidesLength / rows) === slidesLength / rows) {
            slidesNumberEvenToRows = slidesLength;
        }
        else {
            slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
        }
        if (slidesPerView !== 'auto' && fill === 'row') {
            slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, Math.floor(slidesPerView ?? 1) * rows);
        }
        slidesPerRow = slidesNumberEvenToRows / rows;
    };
    const unsetSlides = () => {
        if (swiper.slides) {
            swiper.slides.forEach((slide) => {
                const gridSlide = slide;
                if (gridSlide.swiperSlideGridSet) {
                    slide.style.height = '';
                    slide.style.setProperty(swiper.getDirectionLabel('margin-top'), '');
                }
            });
        }
    };
    const updateSlide = (i, slide, slides) => {
        const { slidesPerGroup } = swiper.params;
        const spaceBetween = getSpaceBetween();
        const { rows, fill } = getParams();
        const slidesLength = isVirtualEnabled() ? swiper.virtual.slides.length : slides.length;
        // Set slides order
        let newSlideOrderIndex;
        let column;
        let row;
        if (fill === 'row' && (slidesPerGroup ?? 1) > 1) {
            const groupsPer = slidesPerGroup ?? 1;
            const groupIndex = Math.floor(i / (groupsPer * rows));
            const slideIndexInGroup = i - rows * groupsPer * groupIndex;
            const columnsInGroup = groupIndex === 0
                ? groupsPer
                : Math.min(Math.ceil((slidesLength - groupIndex * rows * groupsPer) / rows), groupsPer);
            row = Math.floor(slideIndexInGroup / columnsInGroup);
            column = slideIndexInGroup - row * columnsInGroup + groupIndex * groupsPer;
            newSlideOrderIndex = column + (row * slidesNumberEvenToRows) / rows;
            slide.style.order = String(newSlideOrderIndex);
        }
        else if (fill === 'column') {
            column = Math.floor(i / rows);
            row = i - column * rows;
            if (column > numFullColumns || (column === numFullColumns && row === rows - 1)) {
                row += 1;
                if (row >= rows) {
                    row = 0;
                    column += 1;
                }
            }
        }
        else {
            row = Math.floor(i / slidesPerRow);
            column = i - row * slidesPerRow;
        }
        const gridSlide = slide;
        gridSlide.row = row;
        gridSlide.column = column;
        slide.style.height = `calc((100% - ${(rows - 1) * spaceBetween}px) / ${rows})`;
        slide.style.setProperty(swiper.getDirectionLabel('margin-top'), row !== 0 && spaceBetween ? `${spaceBetween}px` : '');
        gridSlide.swiperSlideGridSet = true;
    };
    const updateWrapperSize = (slideSize, snapGrid) => {
        const { centeredSlides, roundLengths } = swiper.params;
        const spaceBetween = getSpaceBetween();
        const { rows } = getParams();
        swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
        swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
        if (!swiper.params.cssMode) {
            swiper.wrapperEl.style.setProperty(swiper.getDirectionLabel('width'), `${swiper.virtualSize + spaceBetween}px`);
        }
        if (centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (roundLengths)
                    slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] < swiper.virtualSize + snapGrid[0])
                    newSlidesGrid.push(slidesGridItem);
            }
            snapGrid.splice(0, snapGrid.length);
            snapGrid.push(...newSlidesGrid);
        }
    };
    const onInit = () => {
        const gridParams = swiper.params.grid;
        wasMultiRow = !!(gridParams && (gridParams.rows ?? 1) > 1);
    };
    const onUpdate = () => {
        const { params, el } = swiper;
        const gridParams = params.grid;
        const isMultiRow = !!(gridParams && (gridParams.rows ?? 1) > 1);
        if (wasMultiRow && !isMultiRow) {
            el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
            numFullColumns = 1;
            swiper.emitContainerClasses();
        }
        else if (!wasMultiRow && isMultiRow) {
            el.classList.add(`${params.containerModifierClass}grid`);
            if (gridParams.fill === 'column') {
                el.classList.add(`${params.containerModifierClass}grid-column`);
            }
            swiper.emitContainerClasses();
        }
        wasMultiRow = isMultiRow;
    };
    on('init', onInit);
    on('update', onUpdate);
    swiper.grid = {
        initSlides,
        unsetSlides,
        updateSlide,
        updateWrapperSize,
    };
};

export { Grid as default };

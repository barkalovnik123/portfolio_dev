import { c as classesToSelector } from '../shared/classes-to-selector.mjs';
import { c as createElementIfNotDefined } from '../shared/create-element-if-not-defined.mjs';
import { s as makeElementsArray, j as elementParents, w as setInnerHTML, i as elementOuterSize, b as elementIndex } from '../shared/utils.mjs';

const isVirtualEnabled = (swiper) => !!swiper.virtual && !!swiper.params.virtual?.enabled;
const isFreeModeEnabled = (swiper) => !!swiper.params.freeMode?.enabled;
const Pagination = ({ swiper, extendParams, on, emit }) => {
    const pfx = 'swiper-pagination';
    extendParams({
        pagination: {
            el: null,
            bulletElement: 'span',
            clickable: false,
            hideOnClick: false,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: false,
            type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
            dynamicBullets: false,
            dynamicMainBullets: 1,
            formatFractionCurrent: (number) => number,
            formatFractionTotal: (number) => number,
            bulletClass: `${pfx}-bullet`,
            bulletActiveClass: `${pfx}-bullet-active`,
            modifierClass: `${pfx}-`,
            currentClass: `${pfx}-current`,
            totalClass: `${pfx}-total`,
            hiddenClass: `${pfx}-hidden`,
            progressbarFillClass: `${pfx}-progressbar-fill`,
            progressbarOppositeClass: `${pfx}-progressbar-opposite`,
            clickableClass: `${pfx}-clickable`,
            lockClass: `${pfx}-lock`,
            horizontalClass: `${pfx}-horizontal`,
            verticalClass: `${pfx}-vertical`,
            paginationDisabledClass: `${pfx}-disabled`,
        },
    });
    // Initialized as a partial; remaining methods (render, update, init,
    // destroy, enable, disable) attach after their definitions below.
    swiper.pagination = {
        el: null,
        bullets: [],
    };
    let bulletSize;
    let dynamicBulletIndex = 0;
    function getParams() {
        return swiper.params.pagination;
    }
    function isPaginationDisabled() {
        const elParam = getParams().el;
        return (!elParam ||
            !swiper.pagination.el ||
            (Array.isArray(swiper.pagination.el) &&
                swiper.pagination.el.length === 0));
    }
    function setSideBullets(bulletEl, position) {
        const { bulletActiveClass } = getParams();
        if (!bulletEl)
            return;
        let current = bulletEl[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
        if (current) {
            current.classList.add(`${bulletActiveClass}-${position}`);
            current = current[`${position === 'prev' ? 'previous' : 'next'}ElementSibling`];
            if (current) {
                current.classList.add(`${bulletActiveClass}-${position}-${position}`);
            }
        }
    }
    function getMoveDirection(prevIndex, nextIndex, length) {
        prevIndex = prevIndex % length;
        nextIndex = nextIndex % length;
        if (nextIndex === prevIndex + 1) {
            return 'next';
        }
        else if (nextIndex === prevIndex - 1) {
            return 'previous';
        }
        return undefined;
    }
    function onBulletClick(e) {
        const targetEl = e.target;
        const bulletEl = targetEl.closest(classesToSelector(getParams().bulletClass));
        if (!bulletEl) {
            return;
        }
        e.preventDefault();
        const index = (elementIndex(bulletEl) ?? 0) * (swiper.params.slidesPerGroup ?? 1);
        if (swiper.params.loop) {
            if (swiper.realIndex === index)
                return;
            const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
            if (moveDirection === 'next') {
                swiper.slideNext();
            }
            else if (moveDirection === 'previous') {
                swiper.slidePrev();
            }
            else {
                swiper.slideToLoop(index);
            }
        }
        else {
            swiper.slideTo(index);
        }
    }
    function update() {
        // Render || Update Pagination bullets/items
        const rtl = swiper.rtl;
        const params = getParams();
        if (isPaginationDisabled())
            return;
        const els = makeElementsArray(swiper.pagination.el);
        // Current/Total
        let current;
        let previousIndex;
        const slidesLength = isVirtualEnabled(swiper)
            ? swiper.virtual.slides.length
            : swiper.slides.length;
        const total = swiper.params.loop
            ? Math.ceil(slidesLength / (swiper.params.slidesPerGroup ?? 1))
            : swiper.snapGrid.length;
        if (swiper.params.loop) {
            previousIndex = swiper.previousRealIndex || 0;
            current =
                (swiper.params.slidesPerGroup ?? 1) > 1
                    ? Math.floor(swiper.realIndex / (swiper.params.slidesPerGroup ?? 1))
                    : swiper.realIndex;
        }
        else if (typeof swiper.snapIndex !== 'undefined') {
            current = swiper.snapIndex;
            previousIndex = swiper.previousSnapIndex;
        }
        else {
            previousIndex = swiper.previousIndex || 0;
            current = swiper.activeIndex || 0;
        }
        // Types
        if (params.type === 'bullets' &&
            swiper.pagination.bullets &&
            swiper.pagination.bullets.length > 0) {
            const bullets = swiper.pagination.bullets;
            let firstIndex = 0;
            let lastIndex = 0;
            let midIndex = 0;
            if (params.dynamicBullets) {
                bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? 'width' : 'height');
                const dim = swiper.isHorizontal() ? 'width' : 'height';
                els.forEach((subEl) => {
                    subEl.style[dim] = `${(bulletSize ?? 0) * (params.dynamicMainBullets + 4)}px`;
                });
                if (params.dynamicMainBullets > 1 && previousIndex !== undefined) {
                    dynamicBulletIndex += current - (previousIndex || 0);
                    if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
                        dynamicBulletIndex = params.dynamicMainBullets - 1;
                    }
                    else if (dynamicBulletIndex < 0) {
                        dynamicBulletIndex = 0;
                    }
                }
                firstIndex = Math.max(current - dynamicBulletIndex, 0);
                lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                midIndex = (lastIndex + firstIndex) / 2;
            }
            bullets.forEach((bulletEl) => {
                const classesToRemove = [
                    '',
                    '-next',
                    '-next-next',
                    '-prev',
                    '-prev-prev',
                    '-main',
                ]
                    .map((suffix) => `${params.bulletActiveClass}${suffix}`)
                    .flatMap((s) => (typeof s === 'string' && s.includes(' ') ? s.split(' ') : [s]));
                bulletEl.classList.remove(...classesToRemove);
            });
            if (els.length > 1) {
                bullets.forEach((bullet) => {
                    const bulletIndex = elementIndex(bullet);
                    if (bulletIndex === current) {
                        bullet.classList.add(...params.bulletActiveClass.split(' '));
                    }
                    else if (swiper.isElement) {
                        bullet.setAttribute('part', 'bullet');
                    }
                    if (params.dynamicBullets && bulletIndex !== undefined) {
                        if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                            bullet.classList.add(...`${params.bulletActiveClass}-main`.split(' '));
                        }
                        if (bulletIndex === firstIndex) {
                            setSideBullets(bullet, 'prev');
                        }
                        if (bulletIndex === lastIndex) {
                            setSideBullets(bullet, 'next');
                        }
                    }
                });
            }
            else {
                const bullet = bullets[current];
                if (bullet) {
                    bullet.classList.add(...params.bulletActiveClass.split(' '));
                }
                if (swiper.isElement) {
                    bullets.forEach((bulletEl, bulletIndex) => {
                        bulletEl.setAttribute('part', bulletIndex === current ? 'bullet-active' : 'bullet');
                    });
                }
                if (params.dynamicBullets) {
                    const firstDisplayedBullet = bullets[firstIndex];
                    const lastDisplayedBullet = bullets[lastIndex];
                    for (let i = firstIndex; i <= lastIndex; i += 1) {
                        if (bullets[i]) {
                            bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(' '));
                        }
                    }
                    setSideBullets(firstDisplayedBullet, 'prev');
                    setSideBullets(lastDisplayedBullet, 'next');
                }
            }
            if (params.dynamicBullets) {
                const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                const bulletsOffset = ((bulletSize ?? 0) * dynamicBulletsLength - (bulletSize ?? 0)) / 2 -
                    midIndex * (bulletSize ?? 0);
                const offsetProp = rtl ? 'right' : 'left';
                const positionDim = swiper.isHorizontal() ? offsetProp : 'top';
                bullets.forEach((bullet) => {
                    bullet.style[positionDim] = `${bulletsOffset}px`;
                });
            }
        }
        els.forEach((subEl, subElIndex) => {
            if (params.type === 'fraction') {
                subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
                    fractionEl.textContent = String(params.formatFractionCurrent(current + 1));
                });
                subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
                    totalEl.textContent = String(params.formatFractionTotal(total));
                });
            }
            if (params.type === 'progressbar') {
                let progressbarDirection;
                if (params.progressbarOpposite) {
                    progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
                }
                else {
                    progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
                }
                const scale = (current + 1) / total;
                let scaleX = 1;
                let scaleY = 1;
                if (progressbarDirection === 'horizontal') {
                    scaleX = scale;
                }
                else {
                    scaleY = scale;
                }
                subEl
                    .querySelectorAll(classesToSelector(params.progressbarFillClass))
                    .forEach((progressEl) => {
                    progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
                    progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
                });
            }
            if (params.type === 'custom' && params.renderCustom) {
                setInnerHTML(subEl, params.renderCustom(swiper, current + 1, total));
                if (subElIndex === 0)
                    emit('paginationRender', subEl);
            }
            else {
                if (subElIndex === 0)
                    emit('paginationRender', subEl);
                emit('paginationUpdate', subEl);
            }
            if (swiper.params.watchOverflow && swiper.enabled) {
                subEl.classList[swiper.isLocked ? 'add' : 'remove'](params.lockClass);
            }
        });
    }
    function render() {
        // Render Container
        const params = getParams();
        if (isPaginationDisabled())
            return;
        const gridParams = swiper.params.grid;
        const slidesLength = isVirtualEnabled(swiper)
            ? swiper.virtual.slides.length
            : swiper.grid && gridParams?.rows && gridParams.rows > 1
                ? swiper.slides.length / Math.ceil(gridParams.rows)
                : swiper.slides.length;
        const els = makeElementsArray(swiper.pagination.el);
        let paginationHTML = '';
        if (params.type === 'bullets') {
            let numberOfBullets = swiper.params.loop
                ? Math.ceil(slidesLength / (swiper.params.slidesPerGroup ?? 1))
                : swiper.snapGrid.length;
            if (swiper.params.freeMode && isFreeModeEnabled(swiper) && numberOfBullets > slidesLength) {
                numberOfBullets = slidesLength;
            }
            for (let i = 0; i < numberOfBullets; i += 1) {
                if (params.renderBullet) {
                    paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
                }
                else {
                    // oxfmt-ignore
                    paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ''} class="${params.bulletClass}"></${params.bulletElement}>`;
                }
            }
        }
        if (params.type === 'fraction') {
            if (params.renderFraction) {
                paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
            }
            else {
                paginationHTML =
                    `<span class="${params.currentClass}"></span>` +
                        ' / ' +
                        `<span class="${params.totalClass}"></span>`;
            }
        }
        if (params.type === 'progressbar') {
            if (params.renderProgressbar) {
                paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
            }
            else {
                paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
            }
        }
        swiper.pagination.bullets = [];
        els.forEach((subEl) => {
            if (params.type !== 'custom') {
                setInnerHTML(subEl, paginationHTML || '');
            }
            if (params.type === 'bullets') {
                swiper.pagination.bullets.push(...Array.from(subEl.querySelectorAll(classesToSelector(params.bulletClass))));
            }
        });
        if (params.type !== 'custom') {
            emit('paginationRender', els[0]);
        }
    }
    function init() {
        swiper.params.pagination = createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, { el: 'swiper-pagination' });
        const params = getParams();
        if (!params.el)
            return;
        let el;
        if (typeof params.el === 'string' && swiper.isElement) {
            el = swiper.el.querySelector(params.el);
        }
        if (!el && typeof params.el === 'string') {
            el = [...document.querySelectorAll(params.el)];
        }
        if (!el) {
            el = params.el;
        }
        if (!el || (Array.isArray(el) && el.length === 0))
            return;
        if (swiper.params.uniqueNavElements &&
            typeof params.el === 'string' &&
            Array.isArray(el) &&
            el.length > 1) {
            el = [...swiper.el.querySelectorAll(params.el)];
            // check if it belongs to another nested Swiper
            if (el.length > 1) {
                const found = el.find((subEl) => {
                    if (elementParents(subEl, '.swiper')[0] !== swiper.el)
                        return false;
                    return true;
                });
                if (found)
                    el = found;
            }
        }
        if (Array.isArray(el) && el.length === 1)
            el = el[0];
        Object.assign(swiper.pagination, {
            el,
        });
        const els = makeElementsArray(el);
        els.forEach((subEl) => {
            if (params.type === 'bullets' && params.clickable) {
                subEl.classList.add(...(params.clickableClass || '').split(' '));
            }
            subEl.classList.add(params.modifierClass + params.type);
            subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            if (params.type === 'bullets' && params.dynamicBullets) {
                subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
                dynamicBulletIndex = 0;
                if (params.dynamicMainBullets < 1) {
                    params.dynamicMainBullets = 1;
                }
            }
            if (params.type === 'progressbar' && params.progressbarOpposite) {
                subEl.classList.add(params.progressbarOppositeClass);
            }
            if (params.clickable) {
                subEl.addEventListener('click', onBulletClick);
            }
            if (!swiper.enabled) {
                subEl.classList.add(params.lockClass);
            }
        });
    }
    function destroy() {
        const params = getParams();
        if (isPaginationDisabled())
            return;
        const el = swiper.pagination.el;
        if (el) {
            const els = makeElementsArray(el);
            els.forEach((subEl) => {
                subEl.classList.remove(params.hiddenClass);
                subEl.classList.remove(params.modifierClass + params.type);
                subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if (params.clickable) {
                    subEl.classList.remove(...(params.clickableClass || '').split(' '));
                    subEl.removeEventListener('click', onBulletClick);
                }
            });
        }
        if (swiper.pagination.bullets)
            swiper.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(' ')));
    }
    on('changeDirection', () => {
        if (!swiper.pagination || !swiper.pagination.el)
            return;
        const params = getParams();
        const els = makeElementsArray(swiper.pagination.el);
        els.forEach((subEl) => {
            subEl.classList.remove(params.horizontalClass, params.verticalClass);
            subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
        });
    });
    on('init', () => {
        if (getParams().enabled === false) {
            disable();
        }
        else {
            init();
            render();
            update();
        }
    });
    on('activeIndexChange', () => {
        if (typeof swiper.snapIndex === 'undefined') {
            update();
        }
    });
    on('snapIndexChange', () => {
        update();
    });
    on('snapGridLengthChange', () => {
        render();
        update();
    });
    on('destroy', () => {
        destroy();
    });
    on('enable disable', () => {
        const { el } = swiper.pagination;
        if (el) {
            const params = getParams();
            const els = makeElementsArray(el);
            els.forEach((subEl) => subEl.classList[swiper.enabled ? 'remove' : 'add'](params.lockClass));
        }
    });
    on('lock unlock', () => {
        update();
    });
    on('click', (_s, e) => {
        const targetEl = e.target;
        const els = makeElementsArray(swiper.pagination.el);
        const params = getParams();
        if (params.el &&
            params.hideOnClick &&
            els &&
            els.length > 0 &&
            !targetEl.classList.contains(params.bulletClass)) {
            if (swiper.navigation &&
                ((swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl) ||
                    (swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)))
                return;
            const isHidden = els[0].classList.contains(params.hiddenClass);
            if (isHidden === true) {
                emit('paginationShow');
            }
            else {
                emit('paginationHide');
            }
            els.forEach((subEl) => subEl.classList.toggle(params.hiddenClass));
        }
    });
    const enable = () => {
        const params = getParams();
        swiper.el.classList.remove(params.paginationDisabledClass);
        const { el } = swiper.pagination;
        if (el) {
            const els = makeElementsArray(el);
            els.forEach((subEl) => subEl.classList.remove(params.paginationDisabledClass));
        }
        init();
        render();
        update();
    };
    const disable = () => {
        const params = getParams();
        swiper.el.classList.add(params.paginationDisabledClass);
        const { el } = swiper.pagination;
        if (el) {
            const els = makeElementsArray(el);
            els.forEach((subEl) => subEl.classList.add(params.paginationDisabledClass));
        }
        destroy();
    };
    Object.assign(swiper.pagination, {
        enable,
        disable,
        render,
        update,
        init,
        destroy,
    });
};

export { Pagination as default };

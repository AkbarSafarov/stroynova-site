export const initApartmentsFilter = () => {

    const projectDrop = document.getElementById('apts-project-dropdown');
    if (projectDrop) {
        const trigger  = projectDrop.querySelector('.apts-filter__trigger');
        const current  = projectDrop.querySelector('#apts-project-current');
        const panel    = projectDrop.querySelector('.apts-filter__panel');
        const options  = projectDrop.querySelectorAll('.apts-filter__option');

        const closeProject = () => { projectDrop.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); };

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const opening = !projectDrop.classList.contains('is-open');
            projectDrop.classList.toggle('is-open');
            trigger.setAttribute('aria-expanded', String(opening));
        });

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                options.forEach(o => o.classList.remove('is-active'));
                opt.classList.add('is-active');
                current.textContent = opt.textContent || 'Название проекта может ...';
                closeProject();
            });
        });

        document.addEventListener('click', (e) => { if (!projectDrop.contains(e.target)) closeProject(); });
    }

    const floorMin  = document.getElementById('floor-min');
    const floorMax  = document.getElementById('floor-max');
    const floorFill = document.getElementById('floor-fill');
    const floorMinV = document.getElementById('floor-min-val');
    const floorMaxV = document.getElementById('floor-max-val');

    const updateFloor = () => {
        if (!floorMin || !floorMax) return;
        let a = parseInt(floorMin.value);
        let b = parseInt(floorMax.value);
        if (a > b) { [a, b] = [b, a]; }
        const total = floorMin.max - floorMin.min;
        const left  = ((a - floorMin.min) / total) * 100;
        const right = ((b - floorMin.min) / total) * 100;
        if (floorFill) { floorFill.style.left = left + '%'; floorFill.style.width = (right - left) + '%'; }
        if (floorMinV) floorMinV.textContent = 'от ' + (a - 1);
        if (floorMaxV) floorMaxV.textContent = 'от ' + b;
    };

    if (floorMin) floorMin.addEventListener('input', updateFloor);
    if (floorMax) floorMax.addEventListener('input', updateFloor);
    updateFloor();

    // ---- Single range (price) ----
    const priceRange = document.getElementById('price-max');
    const priceFill  = document.getElementById('price-fill');
    const priceVal   = document.getElementById('price-max-val');

    const updatePrice = () => {
        if (!priceRange) return;
        const pct = ((priceRange.value - priceRange.min) / (priceRange.max - priceRange.min)) * 100;
        if (priceFill) priceFill.style.width = pct + '%';
        if (priceVal)  priceVal.textContent  = Number(priceRange.value).toLocaleString('ru-RU');
    };

    if (priceRange) priceRange.addEventListener('input', updatePrice);
    updatePrice();

    const roomBtns = document.querySelectorAll('.apts-filter__room-btn');
    roomBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('is-active');
        });
    });

    const clearBtn = document.getElementById('apts-filter-clear');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (floorMin)   { floorMin.value  = floorMin.min; }
            if (floorMax)   { floorMax.value  = floorMax.max; }
            if (priceRange) { priceRange.value = 12000000; }
            updateFloor();
            updatePrice();
            roomBtns.forEach(b => b.classList.remove('is-active'));
            if (projectDrop) {
                const opts = projectDrop.querySelectorAll('.apts-filter__option');
                opts.forEach(o => o.classList.remove('is-active'));
                if (opts[0]) opts[0].classList.add('is-active');
                const cur = projectDrop.querySelector('#apts-project-current');
                if (cur) cur.textContent = 'Название проекта может ...';
            }
        });
    }

    document.querySelectorAll('.apt-card__fav').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('apt-card__fav--saved');
            const label = btn.classList.contains('apt-card__fav--saved') ? 'Убрать из избранного' : 'В избранное';
            btn.setAttribute('aria-label', label);
        });
    });

    const sortDrop = document.getElementById('apts-sort-dropdown');
    if (sortDrop) {
        const strigger = sortDrop.querySelector('.catalog-sort__trigger');
        const scurrent = sortDrop.querySelector('.catalog-sort__current');
        const soptions = sortDrop.querySelectorAll('.catalog-sort__option');

        const closeSort = () => { sortDrop.classList.remove('is-open'); strigger.setAttribute('aria-expanded', 'false'); };

        strigger.addEventListener('click', (e) => {
            e.stopPropagation();
            sortDrop.classList.toggle('is-open');
            strigger.setAttribute('aria-expanded', String(sortDrop.classList.contains('is-open')));
        });

        soptions.forEach(opt => {
            opt.addEventListener('click', () => {
                soptions.forEach(o => { o.classList.remove('is-active'); o.setAttribute('aria-selected', 'false'); });
                opt.classList.add('is-active');
                opt.setAttribute('aria-selected', 'true');
                scurrent.textContent = opt.textContent;
                closeSort();
            });
        });

        document.addEventListener('click', (e) => { if (!sortDrop.contains(e.target)) closeSort(); });
    }
};

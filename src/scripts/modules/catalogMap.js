/**
 * Catalog page — Yandex Maps v3 with custom markers + collapse toggle
 *
 * API key: замените 'YOUR_API_KEY' на ключ из https://developer.tech.yandex.ru/
 * Маркеры берутся из <script id="catalog-map-data"> на странице.
 */

const MAP_CENTER = [40.9281, 57.7676]; // [lon, lat] Кострома

// Цвета маркеров по типу
const MARKER_COLORS = {
    built:    '#e18411', // оранжевый — построены
    building: '#4a7c59', // зелёный — строятся
};

let mapInstance = null;

const loadYmaps = () => new Promise((resolve, reject) => {
    if (window.ymaps3) { resolve(window.ymaps3); return; }

    const script = document.createElement('script');
    // Ключ
    const API_KEY = '';
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${API_KEY}&lang=ru_RU`;
    script.onload = () => window.ymaps3.ready.then(() => resolve(window.ymaps3));
    script.onerror = reject;
    document.head.appendChild(script);
});

const createMarkerElement = (type) => {
    const el = document.createElement('div');
    el.style.cssText = `
        width: 32px; height: 40px; cursor: pointer;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    `;
    const color = MARKER_COLORS[type] || MARKER_COLORS.built;
    el.innerHTML = `
        <svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16C0 24 16 40 16 40C16 40 32 24 32 16C32 7.163 24.837 0 16 0Z"
                  fill="${color}"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>`;
    return el;
};

const initMap = async () => {
    const container = document.getElementById('catalog-map');
    const dataEl    = document.getElementById('catalog-map-data');
    if (!container || !dataEl) return;

    let markers = [];
    try { markers = JSON.parse(dataEl.textContent); } catch { return; }

    try {
        const ymaps3 = await loadYmaps();
        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3;

        mapInstance = new YMap(container, {
            location: { center: MAP_CENTER, zoom: 12 },
        });

        mapInstance.addChild(new YMapDefaultSchemeLayer());
        mapInstance.addChild(new YMapDefaultFeaturesLayer());

        markers.forEach(({ coords, type, title, url }) => {
            const el = createMarkerElement(type);
            el.title = title;
            el.addEventListener('click', () => { if (url) window.location.href = url; });

            mapInstance.addChild(new YMapMarker(
                { coordinates: coords, draggable: false },
                el
            ));
        });
    } catch (err) {
        console.error('Yandex Maps failed to load:', err);
    }
};

const initToggle = () => {
    const btn  = document.getElementById('catalog-map-toggle');
    const wrap = document.getElementById('catalog-map-wrap');
    if (!btn || !wrap) return;

    btn.addEventListener('click', () => {
        const collapsed = wrap.classList.toggle('is-collapsed');
        btn.textContent = collapsed ? 'Развернуть карту' : 'Свернуть карту';
    });
};

export const initCatalogMap = () => {
    if (!document.getElementById('catalog-map')) return;
    initMap();
    initToggle();
};

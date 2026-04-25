import planSvgText from '@public/assets/plan-storage.svg?raw';

/**
 * Storage plan — interactive floor plan for кладовые
 * SVG is bundled as raw string (no fetch — works on file:// protocol too).
 */

const ROOMS = [
    { id: 1,  number: '1',  size: 4.5, status: 'sold',     price: null },
    { id: 2,  number: '2',  size: 4.2, status: 'free',     price: 189000 },
    { id: 3,  number: '3',  size: 4.5, status: 'reserved', price: 195000 },
    { id: 4,  number: '4',  size: 5.4, status: 'sold',     price: null },
    { id: 5,  number: '5',  size: 3.4, status: 'sold',     price: null },
    { id: 6,  number: '6',  size: 4.1, status: 'free',     price: 178000 },
    { id: 7,  number: '7',  size: 4.5, status: 'free',     price: 183000 },
    { id: 8,  number: '8',  size: 4.5, status: 'sold',     price: null },
    { id: 9,  number: '9',  size: 4.2, status: 'reserved', price: 183000 },
    { id: 10, number: '10', size: 4.5, status: 'sold',     price: null },
    { id: 11, number: '11', size: 3.2, status: 'free',     price: 161000 },
    { id: 12, number: '12', size: 3.8, status: 'reserved', price: 172000 },
    { id: 13, number: '13', size: 4.2, status: 'sold',     price: null },
    { id: 14, number: '14', size: 3.9, status: 'free',     price: 175000 },
    { id: 15, number: '15', size: 4.5, status: 'sold',     price: null },
    { id: 16, number: '16', size: 4.5, status: 'free',     price: 189000 },
    { id: 17, number: '17', size: 3.9, status: 'reserved', price: 175000 },
    { id: 18, number: '18', size: 3.9, status: 'free',     price: 171000 },
    { id: 19, number: '19', size: 3.6, status: 'sold',     price: null },
    { id: 20, number: '20', size: 4.5, status: 'free',     price: 187000 },
    { id: 21, number: '21', size: 5.8, status: 'sold',     price: null },
    { id: 22, number: '22', size: 3.4, status: 'free',     price: 163000 },
    { id: 23, number: '23', size: 6.2, status: 'reserved', price: 225000 },
    { id: 24, number: '24', size: 4.5, status: 'sold',     price: null },
    { id: 25, number: '25', size: 5.1, status: 'sold',     price: null },
    { id: 26, number: '26', size: 3.4, status: 'free',     price: 154000 },
    { id: 27, number: '27', size: 4.0, status: 'free',     price: 172000 },
    { id: 28, number: '28', size: 5.2, status: 'sold',     price: null },
    { id: 29, number: '29', size: 3.7, status: 'free',     price: 167000 },
    { id: 30, number: '30', size: 2.8, status: 'reserved', price: 147000 },
    { id: 31, number: '31', size: 3.2, status: 'free',     price: 155000 },
    { id: 32, number: '32', size: 4.3, status: 'sold',     price: null },
    { id: 33, number: '33', size: 4.3, status: 'free',     price: 179000 },
    { id: 34, number: '34', size: 4.3, status: 'free',     price: 179000 },
    { id: 35, number: '35', size: 4.3, status: 'sold',     price: null },
    { id: 36, number: '36', size: 5.2, status: 'free',     price: 198000 },
    { id: 37, number: '37', size: 4.2, status: 'reserved', price: 177000 },
    { id: 38, number: '38', size: 4.2, status: 'free',     price: 177000 },
    { id: 39, number: '39', size: 4.2, status: 'sold',     price: null },
    { id: 40, number: '40', size: 3.9, status: 'free',     price: 169000 },
    { id: 41, number: '41', size: 3.9, status: 'free',     price: 169000 },
    { id: 42, number: '42', size: 3.9, status: 'sold',     price: null },
    { id: 43, number: '43', size: 3.9, status: 'reserved', price: 169000 },
    { id: 44, number: '44', size: 4.4, status: 'free',     price: 183000 },
    { id: 45, number: '45', size: 4.4, status: 'sold',     price: null },
    { id: 46, number: '46', size: 4.4, status: 'sold',     price: null },
    { id: 47, number: '47', size: 3.6, status: 'free',     price: 161000 },
    { id: 48, number: '48', size: 3.8, status: 'sold',     price: null },
    { id: 49, number: '49', size: 7.6, status: 'reserved', price: 267000 },
    { id: 50, number: '50', size: 8.4, status: 'free',     price: 285000 },
    { id: 51, number: '51', size: 4.4, status: 'sold',     price: null },
    { id: 52, number: '52', size: 4.2, status: 'free',     price: 176000 },
    { id: 53, number: '53', size: 3.1, status: 'free',     price: 152000 },
    { id: 54, number: '54', size: 3.1, status: 'free',     price: 152000 },
    { id: 55, number: '55', size: 3.1, status: 'sold',     price: null },
    { id: 56, number: '56', size: 2.6, status: 'free',     price: 143000 },
];

const STATUS_LABEL = { free: 'Свободно', sold: 'Продано', reserved: 'Бронь' };

const fmt = n => n.toLocaleString('ru-RU') + ' ₽';

export const initStoragePlan = () => {
    const root = document.getElementById('storagePlanRoot');
    if (!root) return;

    const mapEl      = document.getElementById('storagePlanMap');
    const tooltip    = document.getElementById('storagePlanTooltip');
    const popup      = document.getElementById('storagePlanPopup');
    const popupClose = document.getElementById('storagePlanPopupClose');

    let activeRoom = null;

    function loadSvg() {
        const parser = new DOMParser();
        const doc    = parser.parseFromString(planSvgText, 'image/svg+xml');
        const svgEl  = doc.querySelector('svg');

        svgEl.removeAttribute('width');
        svgEl.removeAttribute('height');
        svgEl.setAttribute('role', 'img');
        svgEl.setAttribute('aria-label', 'План кладовых');

        const roomPaths = svgEl.querySelectorAll('path[opacity="0.2"]');

        roomPaths.forEach((el, i) => {
            const room = ROOMS[i];
            if (!room) return;
            el.setAttribute('id', `storage-room-${room.id}`);
            el.setAttribute('data-room-id', String(room.id));
            el.setAttribute('tabindex', '0');
            el.setAttribute('role', 'button');
            el.setAttribute('aria-label', `Кладовая №${room.number}, ${room.size} м², ${STATUS_LABEL[room.status]}`);
            el.classList.add('storage-room', `storage-room--${room.status}`);
            el.removeAttribute('opacity');
            el.removeAttribute('fill');
        });

        mapEl.appendChild(svgEl);
    }

    function showTooltip(room, e) {
        tooltip.querySelector('.storage-tooltip__num').textContent   = `Кладовая №${room.number}`;
        tooltip.querySelector('.storage-tooltip__size').textContent  = `${room.size.toFixed(1)} м²`;
        const statusEl = tooltip.querySelector('.storage-tooltip__status');
        statusEl.textContent  = STATUS_LABEL[room.status];
        statusEl.className    = `storage-tooltip__status storage-tooltip__status--${room.status}`;
        tooltip.hidden = false;
        positionTooltip(e);
    }

    function positionTooltip(e) {
        const tw = tooltip.offsetWidth  || 180;
        const th = tooltip.offsetHeight || 70;
        let x = e.clientX + 16;
        let y = e.clientY - th / 2;
        if (x + tw > window.innerWidth  - 12) x = e.clientX - tw - 12;
        if (y < 8)                            y = 8;
        if (y + th > window.innerHeight - 8)  y = window.innerHeight - th - 8;
        tooltip.style.left = x + 'px';
        tooltip.style.top  = y + 'px';
    }

    function openPopup(room) {
        activeRoom = room;
        popup.querySelector('.storage-popup__num').textContent     = `Кладовая №${room.number}`;
        popup.querySelector('.storage-popup__size').textContent    = `${room.size.toFixed(1)} м²`;
        const statusEl = popup.querySelector('.storage-popup__status');
        statusEl.textContent = STATUS_LABEL[room.status];
        statusEl.className   = `storage-popup__status storage-popup__status--${room.status}`;

        const priceEl = popup.querySelector('.storage-popup__price');
        if (room.status === 'free' && room.price) {
            priceEl.textContent = fmt(room.price);
            priceEl.hidden = false;
        } else {
            priceEl.hidden = true;
        }

        const btnEl = popup.querySelector('.storage-popup__btn');
        btnEl.hidden = room.status === 'sold';

        // Highlight room on plan
        document.querySelectorAll('.storage-room--highlighted').forEach(el =>
            el.classList.remove('storage-room--highlighted')
        );
        const el = document.getElementById(`storage-room-${room.id}`);
        if (el) el.classList.add('storage-room--highlighted');

        popup.hidden = false;
        popupClose.focus();
    }

    function closePopup() {
        popup.hidden = true;
        if (activeRoom) {
            const el = document.getElementById(`storage-room-${activeRoom.id}`);
            if (el) el.classList.remove('storage-room--highlighted');
            activeRoom = null;
        }
    }

    function bindEvents() {
        // Hover → tooltip
        mapEl.addEventListener('mousemove', e => {
            const el = e.target.closest('.storage-room');
            if (!el) { tooltip.hidden = true; return; }
            const id   = +el.dataset.roomId;
            const room = ROOMS.find(r => r.id === id);
            if (room) showTooltip(room, e);
        });

        mapEl.addEventListener('mouseleave', () => { tooltip.hidden = true; });

        mapEl.addEventListener('click', e => {
            const el = e.target.closest('.storage-room');
            if (!el) return;
            const id   = +el.dataset.roomId;
            const room = ROOMS.find(r => r.id === id);
            if (room) openPopup(room);
        });

        mapEl.addEventListener('keydown', e => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const el = e.target.closest('.storage-room[tabindex]');
            if (!el) return;
            e.preventDefault();
            const id   = +el.dataset.roomId;
            const room = ROOMS.find(r => r.id === id);
            if (room) openPopup(room);
        });

        popupClose.addEventListener('click', closePopup);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && !popup.hidden) closePopup();
        });
    }

    loadSvg();
    bindEvents();
};

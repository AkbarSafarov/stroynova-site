/**
 * Apt Filter — dual range sliders + room-type toggle
 */
import { resetCustomSelect } from './customSelect.js';

const formatPrice = v => Number(v).toLocaleString('ru-RU', { maximumFractionDigits: 0 });

const initDualRange = ({ wrapEl, minInput, maxInput, minOutput, maxOutput, formatter }) => {
  if (!wrapEl || !minInput || !maxInput) return { reset() {} };

  const update = () => {
    const min = Number(minInput.min);
    const max = Number(minInput.max);
    const minVal = Number(minInput.value);
    const maxVal = Number(maxInput.value);
    const minPct = ((minVal - min) / (max - min)) * 100;
    const maxPct = ((maxVal - min) / (max - min)) * 100;
    wrapEl.style.setProperty('--range-min-pct', `${minPct}%`);
    wrapEl.style.setProperty('--range-max-pct', `${maxPct}%`);
    if (minOutput) minOutput.value = formatter(minVal);
    if (maxOutput) maxOutput.value = formatter(maxVal);
  };

  minInput.addEventListener('input', () => {
    if (Number(minInput.value) > Number(maxInput.value)) minInput.value = maxInput.value;
    update();
  });

  maxInput.addEventListener('input', () => {
    if (Number(maxInput.value) < Number(minInput.value)) maxInput.value = minInput.value;
    update();
  });

  update();

  return {
    reset() {
      minInput.value = minInput.min;
      maxInput.value = maxInput.max;
      update();
    },
  };
};

export const initAptFilter = () => {
  const section = document.querySelector('.apt-filter');
  if (!section) return;

  const floorsRange = initDualRange({
    wrapEl: document.getElementById('floors-dual-range'),
    minInput: document.getElementById('filter-floors-min'),
    maxInput: document.getElementById('filter-floors-max'),
    minOutput: document.getElementById('floors-min-val'),
    maxOutput: document.getElementById('floors-max-val'),
    formatter: v => String(v),
  });

  const priceRange = initDualRange({
    wrapEl: document.getElementById('price-dual-range'),
    minInput: document.getElementById('filter-price-min'),
    maxInput: document.getElementById('filter-price-max'),
    minOutput: document.getElementById('price-min-val'),
    maxOutput: document.getElementById('price-max-val'),
    formatter: formatPrice,
  });

  section.querySelectorAll('.rooms-picker__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      section.querySelectorAll('.rooms-picker__btn').forEach(b => {
        b.classList.remove('rooms-picker__btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('rooms-picker__btn--active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  const doReset = () => {
    const projectSelect = section.querySelector('.c-select[data-name="project"]');
    if (projectSelect) resetCustomSelect(projectSelect);
    floorsRange.reset();
    priceRange.reset();
    section.querySelectorAll('.rooms-picker__btn').forEach(b => {
      b.classList.remove('rooms-picker__btn--active');
      b.setAttribute('aria-pressed', 'false');
    });
  };

  section.querySelectorAll('.apt-filter__reset').forEach(btn => {
    btn.addEventListener('click', doReset);
  });
};

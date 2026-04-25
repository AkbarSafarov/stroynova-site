/**
 * Apt Filter — range sliders + room-type toggle
 */
import { resetCustomSelect } from './customSelect.js';

export const initAptFilter = () => {
  const section = document.querySelector('.apt-filter');
  if (!section) return;

  const updateRange = (input, outputEl, formatter) => {
    const min = Number(input.min);
    const max = Number(input.max);
    const val = Number(input.value);
    const pct = ((val - min) / (max - min)) * 100;
    input.style.setProperty('--range-pct', `${pct}%`);
    if (outputEl) outputEl.value = formatter(val);
  };

  const floorsInput = document.getElementById('filter-floors');
  const floorsOutput = document.getElementById('floors-min-val');
  if (floorsInput) {
    floorsInput.addEventListener('input', () => updateRange(floorsInput, floorsOutput, v => v));
    updateRange(floorsInput, floorsOutput, v => v);
  }

  const priceInput = document.getElementById('filter-price');
  const priceOutput = document.getElementById('price-output');
  if (priceInput) {
    const formatPrice = v => Number(v).toLocaleString('ru-RU', { maximumFractionDigits: 1 });
    priceInput.addEventListener('input', () => updateRange(priceInput, priceOutput, formatPrice));
    updateRange(priceInput, priceOutput, formatPrice);
  }

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

  const resetBtn = section.querySelector('.apt-filter__reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetCustomSelect(section.querySelector('.c-select[data-name="project"]'));

      if (floorsInput) {
        floorsInput.value = floorsInput.min;
        updateRange(floorsInput, floorsOutput, v => v);
      }
      if (priceInput) {
        priceInput.value = priceInput.max;
        updateRange(priceInput, priceOutput, v => Number(v).toLocaleString('ru-RU', { maximumFractionDigits: 1 }));
      }

      section.querySelectorAll('.rooms-picker__btn').forEach(b => {
        b.classList.remove('rooms-picker__btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
    });
  }
};

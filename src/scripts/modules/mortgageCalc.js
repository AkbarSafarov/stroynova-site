

const CIRCUMFERENCE = 2 * Math.PI * 75;

const fmt = v => Math.round(v).toLocaleString('ru-RU');

const setRangePct = (input) => {
  const min = Number(input.min);
  const max = Number(input.max);
  const val = Number(input.value);
  const pct = ((val - min) / (max - min)) * 100;
  input.style.setProperty('--range-pct', `${pct}%`);
};

export const initMortgageCalc = () => {
  const section = document.querySelector('.section--mortgage');
  if (!section) return;

  const el = {
    price:    section.querySelector('#apt-mort-price'),
    term:     section.querySelector('#apt-mort-term'),
    down:     section.querySelector('#apt-mort-down'),
    rate:     section.querySelector('#apt-mort-rate'),
    priceVal: section.querySelector('#apt-mort-price-val'),
    termVal:  section.querySelector('#apt-mort-term-val'),
    downVal:  section.querySelector('#apt-mort-down-val'),
    downPct:  section.querySelector('#apt-mort-down-pct'),
    rateVal:  section.querySelector('#apt-mort-rate-val'),
    monthly:  section.querySelector('#apt-mort-monthly'),
    income:   section.querySelector('#apt-mort-income'),
    credit:   section.querySelector('#apt-legend-credit'),
    interest: section.querySelector('#apt-legend-interest'),
    arc:      section.querySelector('#apt-donut-credit-arc'),
  };

  if (!el.price || !el.arc) return;

  const calculate = () => {
    const price    = Number(el.price.value);
    const term     = Number(el.term.value);
    const downPct  = Number(el.down.value);
    const annualRate = Number(el.rate.value);

    const downAmt  = Math.round(price * downPct / 100);
    const loan     = price - downAmt;
    const r        = annualRate / 100 / 12;
    const n        = term * 12;

    // Аннуитетный платёж
    let monthly = 0;
    if (r === 0) {
      monthly = loan / n;
    } else {
      const factor = Math.pow(1 + r, n);
      monthly = loan * r * factor / (factor - 1);
    }

    const totalPaid    = monthly * n;
    const totalInterest = Math.max(0, totalPaid - loan);
    const requiredIncome = monthly / 0.4;

    // Обновляем значения слайдеров
    el.priceVal.value = fmt(price);
    el.termVal.value  = term;
    el.downVal.value  = fmt(downAmt);
    el.downPct.value  = `${downPct}%`;
    el.rateVal.value  = annualRate;

    // Результаты
    el.monthly.textContent  = `${fmt(monthly)} ₽`;
    el.income.textContent   = `${fmt(requiredIncome)} ₽`;
    el.credit.textContent   = `${fmt(loan)} ₽`;
    el.interest.textContent = `${fmt(totalInterest)} ₽`;

    // Donut-диаграмма: оранжевая дуга = доля кредита
    const creditRatio = loan / (loan + totalInterest) || 0;
    const dash = creditRatio * CIRCUMFERENCE;
    el.arc.style.strokeDasharray = `${dash} ${CIRCUMFERENCE}`;

    // Заливка слайдеров
    [el.price, el.term, el.down, el.rate].forEach(setRangePct);
  };

  // События слайдеров
  [el.price, el.term, el.down, el.rate].forEach(input => {
    input.addEventListener('input', calculate);
  });

  // Вкладки программ — меняют ставку
  section.querySelectorAll('.mort-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      section.querySelectorAll('.mort-tab').forEach(t => t.classList.remove('mort-tab--active'));
      tab.classList.add('mort-tab--active');
      const rate = tab.dataset.rate;
      if (rate && el.rate) {
        el.rate.value = rate;
        calculate();
      }
    });
  });

  // Первичный расчёт
  calculate();
};

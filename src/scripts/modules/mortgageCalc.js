
const CIRCUMFERENCE = 2 * Math.PI * 75;
const DURATION = 500;

const fmt = v => Math.round(v).toLocaleString('ru-RU');

const setRangePct = (input) => {
  const min = Number(input.min);
  const max = Number(input.max);
  const val = Number(input.value);
  const pct = ((val - min) / (max - min)) * 100;
  input.style.setProperty('--range-pct', `${pct}%`);
};

const digitsOnly = str => str.replace(/[^\d.]/g, '');

const easeInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const applyRatio = (ratio, arc, shadow) => {
  arc.style.strokeDasharray = `${ratio * CIRCUMFERENCE} ${CIRCUMFERENCE}`;

  if (!shadow) return;
  if (ratio <= 0) {
    shadow.setAttribute('d', 'M 86 86 Z');
    return;
  }
  const cx = 86, cy = 86, r = 90;
  const start = -Math.PI / 2;
  const end   = start + ratio * 2 * Math.PI;
  const x1 = cx + r * Math.cos(start);
  const y1 = cy + r * Math.sin(start);
  const x2 = cx + r * Math.cos(end);
  const y2 = cy + r * Math.sin(end);
  shadow.setAttribute('d',
    `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${ratio > 0.5 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`
  );
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
    shadow:   section.querySelector('#apt-donut-shadow'),
  };

  if (!el.price || !el.arc) return;

  let animFrame  = null;
  let fromRatio  = 0;
  let curRatio   = 0;

  const animateTo = (target) => {
    if (animFrame) cancelAnimationFrame(animFrame);
    const from = curRatio;
    let startTime = null;

    const step = (ts) => {
      if (!startTime) startTime = ts;
      const t     = Math.min((ts - startTime) / DURATION, 1);
      const ratio = from + (target - from) * easeInOut(t);
      applyRatio(ratio, el.arc, el.shadow);
      if (t < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        curRatio  = target;
        animFrame = null;
      }
    };

    animFrame = requestAnimationFrame(step);
  };

  const calculate = () => {
    const price      = Number(el.price.value);
    const term       = Number(el.term.value);
    const downPct    = Number(el.down.value);
    const annualRate = Number(el.rate.value);

    const downAmt = Math.round(price * downPct / 100);
    const loan    = price - downAmt;
    const r       = annualRate / 100 / 12;
    const n       = term * 12;

    let monthly = 0;
    if (r === 0) {
      monthly = loan / n;
    } else {
      const factor = Math.pow(1 + r, n);
      monthly = loan * r * factor / (factor - 1);
    }

    const totalPaid     = monthly * n;
    const totalInterest = Math.max(0, totalPaid - loan);
    const requiredIncome = monthly / 0.4;

    el.priceVal.value = fmt(price);
    el.termVal.value  = term;
    el.downVal.value  = fmt(downAmt);
    el.downPct.value  = `${downPct}%`;
    el.rateVal.value  = annualRate;

    el.monthly.textContent  = `${fmt(monthly)} ₽`;
    el.income.textContent   = `${fmt(requiredIncome)} ₽`;
    el.credit.textContent   = `${fmt(loan)} ₽`;
    el.interest.textContent = `${fmt(totalInterest)} ₽`;

    const creditRatio = loan / (loan + totalInterest) || 0;
    animateTo(creditRatio);

    [el.price, el.term, el.down, el.rate].forEach(setRangePct);
  };

  const bindTextSlider = (textEl, rangeEl) => {
    if (!textEl) return;
    textEl.addEventListener('input', () => {
      textEl.value = digitsOnly(textEl.value);
    });
    textEl.addEventListener('change', () => {
      let val = parseFloat(digitsOnly(textEl.value)) || 0;
      const min = Number(rangeEl.min);
      const max = Number(rangeEl.max);
      if (val < min) val = min;
      if (val > max) val = max;
      rangeEl.value = val;
      calculate();
    });
  };

  if (el.downVal) {
    el.downVal.addEventListener('input', () => {
      el.downVal.value = digitsOnly(el.downVal.value);
    });
    el.downVal.addEventListener('change', () => {
      const price = Number(el.price.value);
      let amt = parseFloat(digitsOnly(el.downVal.value)) || 0;
      if (price > 0) {
        let pct = Math.round(amt / price * 100);
        pct = Math.max(Number(el.down.min), Math.min(Number(el.down.max), pct));
        el.down.value = pct;
      }
      calculate();
    });
  }

  bindTextSlider(el.priceVal, el.price);
  bindTextSlider(el.termVal,  el.term);
  bindTextSlider(el.rateVal,  el.rate);

  [el.price, el.term, el.down, el.rate].forEach(input => {
    input.addEventListener('input', calculate);
  });

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

  calculate();
};

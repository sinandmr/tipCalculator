// init
'use strict';
const bill = document.querySelector('#bill');
const btnContainer = document.querySelector('.select-tip');
const btn = document.querySelectorAll('.btn');
const customTip = document.querySelector('.custom-tip');
const people = document.querySelector('#num-people');
const amountTip = document.querySelector('#tip-amount');
const total = document.querySelector('#total');
const resetBtn = document.querySelector('#reset');

let percent = 0.05;
let initBill = 0;
let peopleCount = 1;
amountTip.textContent = formatNumber(0);
total.textContent = formatNumber(0);

// ***** Functions ***** //

// Tip select
function tipPercent(arg) {
  if (!arg.innerHTML) return; // NaN is blocking
  percent = parseFloat(arg.innerHTML) / 100;
}

const selectTip = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('btn')) {
    const selectedBtn = e.target;
    selectedBtn.classList.add('active');
    tipPercent(selectedBtn);
    calculate();

    const siblingBtn = selectedBtn
      .closest('.select-tip')
      .querySelectorAll('.btn');

    siblingBtn.forEach(btn => {
      if (btn !== selectedBtn) btn.classList.remove('active');
    });

    customTip.classList.remove('active');
    customTip.value = '';
  } else if (e.target.classList.contains('custom-tip')) {
    const selectedBtn = e.target;
    selectedBtn.classList.add('active');
    tipPercent(selectedBtn);
    calculate();

    btn.forEach(btn => {
      btn.classList.remove('active');
    });
  }
};

// Calculate Tip
function calculate() {
  const tip = (initBill * percent) / peopleCount;
  const totalMoney = (+initBill + tip) / peopleCount;
  amountTip.textContent = formatNumber(tip);
  total.textContent = formatNumber(totalMoney);
}

// Reset
function reset(e) {
  e.preventDefault();
  bill.value = '';
  people.value = 1;
  amountTip.textContent = formatNumber(0);
  total.textContent = formatNumber(0);
  initBill = 0;
  peopleCount = 1;
  customTip.value = '';
  btn.forEach(el => {
    el.textContent !== '5%'
      ? el.classList.remove('active')
      : el.classList.add('active');
  });
}

// Internationalizing Numbers
function formatNumber(number) {
  return new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'USD',
  }).format(number);
}

// ***** Event Listeners ***** //
resetBtn.addEventListener('click', reset);

btnContainer.addEventListener('click', selectTip);

customTip.addEventListener('input', e => {
  // ',' problem fixed
  e.target.value.includes(',')
    ? (percent = +e.target.value.replace(',', '.') / 100)
    : (percent = e.target.value / 100);

  calculate();
});
bill.addEventListener('input', e => {
  // ',' problem fixed
  e.target.value.includes(',')
    ? (initBill = +e.target.value.replace(',', '.'))
    : (initBill = e.target.value);
  calculate();
});

people.addEventListener('input', e => {
  // fractional human values blocked
  peopleCount = parseInt(e.target.value, 10);
  if (e.target.value === '') peopleCount = 1; // If the number of people is not specified, it is taken as 1.
  calculate();
});

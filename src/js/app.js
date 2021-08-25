'use strict';
// init
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

// ***************************************************************** //
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
// ***************************************************************** //
// Calculate Tip
function calculate() {
  const tip = (initBill * percent) / peopleCount;
  const totalMoney = ((+initBill + tip) / peopleCount).toFixed(2);
  amountTip.textContent = '$' + tip.toFixed(2);
  total.textContent = `$${totalMoney}`;
}
// ***************************************************************** //
// Reset
function reset(e) {
  e.preventDefault();
  bill.value = '';
  people.value = 1;
  amountTip.textContent = '$0.00';
  total.textContent = '$0.00';
  initBill = 0;
  peopleCount = 1;
  customTip.value = '';
}
// ***************************************************************** //
// Event Listeners
resetBtn.addEventListener('click', reset);
btnContainer.addEventListener('click', selectTip);

customTip.addEventListener('input', e => {
  percent = e.target.value / 100;
  calculate();
});

bill.addEventListener('input', e => {
  initBill = e.target.value;
  calculate();
});

people.addEventListener('input', e => {
  // fractional human values blocked

  e.target.value.includes(',')
    ? (peopleCount = parseFloat(e.target.value))
    : (peopleCount = e.target.value);

  if (Number.isInteger(peopleCount)) {
    calculate();
  } else {
    peopleCount = Math.floor(peopleCount);
    calculate();
  }
});

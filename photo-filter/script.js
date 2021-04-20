/********* implement css-filters *********/

const inputs = document.querySelectorAll('.filters input');
const root = document.querySelector(':root');

function applyFilter(event) {
  // add filter value
  const input = event.target;
  const output = input.nextElementSibling;
  output.value = input.value;

  // apply css-filter  
  const suffix = input.dataset.sizing;
  root.style.setProperty(`--${input.name}`, input.value + suffix);
}

inputs.forEach(input => input.addEventListener('input', applyFilter));

/********* make button active *********/

const btns = document.querySelectorAll('.btn');

function activateBtn(event) {
  const activeBtn = document.querySelector('.btn-active');
  if (!event.target.classList.contains('btn-load--input')) {
    activeBtn.classList.remove('btn-active');
    event.target.classList.add('btn-active');
  }
}

btns.forEach(btn => btn.addEventListener('click', activateBtn));

/********* implement reset fuction *********/

const resetBtn = document.querySelector('.btn-reset');

function reset() {
  // reset inputs
  inputs.forEach(input => input.value = input.defaultValue);  

  // reset input values
  const outputs = document.querySelectorAll('.filters output');
  outputs.forEach(output => output.value = output.defaultValue);  

  // reset css-filters
  inputs.forEach(input => {
    root.style.setProperty(`--${input.name}`, input.defaultValue + input.dataset.sizing);
  });
}

resetBtn.addEventListener('click', reset);

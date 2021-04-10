/********* implement css-filters *********/

const inputs = document.querySelectorAll('.filters input');

function applyFilter(event) {
  // add filter value
  const input = event.target;
  const output = input.nextElementSibling;
  output.value = input.value;

  // apply css-filter
  const root = document.querySelector(':root');
  const rootStyles = getComputedStyle(root);
  const blurFilter = rootStyles.getPropertyValue('--blur');
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
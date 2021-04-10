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





 

// add slider values

const inputs = document.querySelectorAll('.filters input');

function changeInputValue(event) {
 const input = event.target;
 const output = input.nextElementSibling;
 output.value = input.value;
}



inputs.forEach(input => input.addEventListener('input', changeInputValue));



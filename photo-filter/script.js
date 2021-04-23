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

/********* implement picture downloading from GitHub *********/

const nextPictureBtn = document.querySelector('.btn-next');
const image = document.querySelector('img');
let counter = 0;

function getTimeOfTheDay() {
  const now = new Date();
  const hour = now.getHours();
  let timeOfTheDay;
  if (hour >= 6 && hour < 12) {
    timeOfTheDay = 'morning';
  } else if (hour >= 12 && hour < 18) {
    timeOfTheDay = 'day';
  } else if (hour >= 18 && hour < 24) {
    timeOfTheDay = 'evening';
  } else {
    timeOfTheDay = 'night';
  }
  return timeOfTheDay;
}

function viewImage(src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    image.src = src;
  };
}

function getNextPicture() {
  const linkBase = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
  const timeOfTheDay = getTimeOfTheDay();

  let pictureNumber;
  if (counter < 20) {
    counter++;
  } else {
    counter = 1;
  }
  if (counter < 10) {
    pictureNumber = '0' + counter;
  } else {
    pictureNumber = counter.toString();
  }
  const src = linkBase + timeOfTheDay + '/' + pictureNumber + '.jpg';
  viewImage(src);
  // drawImage(src);  
}

nextPictureBtn.addEventListener('click', getNextPicture);

/********* implement picture uploading from PC *********/

const fileInput = document.querySelector('.btn-load--input');

function uploadFile() {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = event => {
    image.src = event.target.result;
    // drawImage(event.target.result);
  };
  reader.readAsDataURL(file);
  fileInput.value = null;

}

fileInput.addEventListener('change', uploadFile);

/********* implement picture saving on PC *********/

const canvas = document.querySelector('canvas');
const saveBtn = document.querySelector('.btn-save');

function downloadImage() {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = image.src;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const link = document.createElement('a');
    link.download = 'download.png';    
    link.href = canvas.toDataURL("image/png");  
    link.click();
    link.remove();
  };
}

saveBtn.addEventListener('click', downloadImage);

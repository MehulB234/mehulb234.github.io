// Geometry
const geometryCard = document.getElementById('geometryCard');
const triangle = document.getElementById('triangle');

let triangleVisible = false;

const toggleTriangle = () => {
  triangleVisible = !triangleVisible;
  triangle.classList.toggle('hidden', !triangleVisible);
};

geometryCard.addEventListener('click', toggleTriangle);
geometryCard.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    toggleTriangle();
  }
});

// Date
const dateInput = document.getElementById('dateInput');
const dateOutput = document.getElementById('dateOutput');
const dateText = document.getElementById('dateText');

const formatDate = (value) => {
  const parts = value.split('-');
  return `${parts[1]}/${parts[2]}/${parts[0]}`;
};

dateInput.addEventListener('change', () => {
  if (dateInput.value !== '') {
    dateText.textContent = formatDate(dateInput.value);
    dateOutput.classList.remove('hidden');
  }
});

// Image 
const sunImage = document.getElementById('sunImage');
const imageFrame = document.getElementById('imageFrame');

let framed = false;

const toggleFrame = () => {
  framed = !framed;
  imageFrame.classList.toggle('framed', framed);
};

sunImage.addEventListener('click', toggleFrame);
sunImage.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    toggleFrame();
  }
});

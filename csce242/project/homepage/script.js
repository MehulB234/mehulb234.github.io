// slides
const slides = [
  { title: 'Welcome to <span class="green">GamerGauntlet</span>', subtitle: "Find the latest titles and deals.", image: 'images/Home.png' },
  { title: 'Top Releases', subtitle: "New and trending games.", image: 'images/TopReleases.png' },
  { title: 'Hot Deals', subtitle: "Limited-time discounts.", image: 'images/HotDeals.png' }
];

const hero = document.getElementById('hero');
const dotsContainer = document.getElementById('hero-dots');

slides.forEach((s, i) => {
  const slide = document.createElement('div');
  slide.className = 'hero-slide';
  slide.style.backgroundImage = `url('${s.image}')`;
  slide.innerHTML = `<div class="hero-overlay"></div>
    <div class="hero-inner">
      <div class="eyebrow">GamerGauntlet</div>
      <h1>${s.title}</h1>
      <p>${s.subtitle}</p>
      <a class="cta" href="#">Browse Games</a>
    </div>`;
  slide.style.display = i === 0 ? 'grid' : 'none';
  hero.insertBefore(slide, hero.firstChild);

  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Show slide ' + (i + 1));
  dot.addEventListener('click', () => showSlide(i));
  dotsContainer.appendChild(dot);
});

let current = 0;
function showSlide(index){
  const slidesEls = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  slidesEls.forEach((el, idx) => el.style.display = idx === index ? 'grid' : 'none');
  dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
  current = index;
}

document.getElementById('hero-prev').addEventListener('click', () => showSlide((current - 1 + slides.length) % slides.length));
document.getElementById('hero-next').addEventListener('click', () => showSlide((current + 1) % slides.length));

// autoplay
let heroTimer = setInterval(() => showSlide((current + 1) % slides.length), 6000);
hero.addEventListener('mouseenter', () => clearInterval(heroTimer));
hero.addEventListener('mouseleave', () => heroTimer = setInterval(() => showSlide((current + 1) % slides.length), 6000));

// scroller
const row = document.getElementById('featured-row');
const left = document.getElementById('feat-left');
const right = document.getElementById('feat-right');
const scrollAmount = 340;
left.addEventListener('click', () => row.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
right.addEventListener('click', () => row.scrollBy({ left: scrollAmount, behavior: 'smooth' }));
row.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') row.scrollBy({ left: -200, behavior: 'smooth' });
  if (e.key === 'ArrowRight') row.scrollBy({ left: 200, behavior: 'smooth' });
});
function updateArrows(){
  if (row.scrollWidth <= row.clientWidth){
    left.style.display = right.style.display = 'none';
  } else {
    left.style.display = right.style.display = '';
  }
}
window.addEventListener('resize', updateArrows);
updateArrows();

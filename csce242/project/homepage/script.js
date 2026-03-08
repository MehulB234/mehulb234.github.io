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
      <a class="cta" href="../part7/Catalog/index.html">Browse Games</a>
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

const sidePrev = document.getElementById('hero-side-prev');
const sideNext = document.getElementById('hero-side-next');
if (sidePrev && sideNext) {
  sidePrev.addEventListener('click', () => showSlide((current - 1 + slides.length) % slides.length));
  sideNext.addEventListener('click', () => showSlide((current + 1) % slides.length));
}

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

(function () {
  const toggleBtn = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('nav-overlay');

  if (!toggleBtn || !mobileNav || !overlay) return;

  function setOpen(isOpen) {
    toggleBtn.classList.toggle('open', isOpen);
    mobileNav.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);

    if (isOpen) {
      mobileNav.hidden = false;
      overlay.hidden = false;
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close menu');

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      const first = mobileNav.querySelector('[role="menuitem"], a, button, input');
      if (first) first.focus();
    } else {
      mobileNav.hidden = true;
      overlay.hidden = true;
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open menu');

      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';

      toggleBtn.focus();
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  overlay.addEventListener('click', () => setOpen(false));

  mobileNav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 880 && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
    }
  });

})();
document.addEventListener('DOMContentLoaded', function () {
  (function () {
    const toggleBtn = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('nav-overlay');
    const navlinks = document.getElementById('navlinks');

    if (!toggleBtn || !mobileNav || !overlay) {
    } else {
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

      toggleBtn.addEventListener('click', function () {
        const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
        setOpen(!isOpen);
      });

      overlay.addEventListener('click', function () { setOpen(false); });

      mobileNav.addEventListener('click', function (e) {
        const link = e.target.closest('a');
        if (link) setOpen(false);
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
          setOpen(false);
        }
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth >= 880 && toggleBtn.getAttribute('aria-expanded') === 'true') {
          setOpen(false);
        }
      });
    }
  })();

  var slides = [
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.55), rgba(2,6,10,0.8)), url("../../homepage/images/TopReleases.png") center/cover no-repeat',title:'About',lead:'We build community and highlight great games'},
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.55), rgba(2,6,10,0.8)), url("../../homepage/images/HotDeals.png") center/cover no-repeat',title:'Deals',lead:'Limited-time offers and featured sales'},
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.55), rgba(2,6,10,0.8)), url("../../homepage/images/Home.png") center/cover no-repeat',title:'Community',lead:'Projects, mods, and spotlights'}
  ];
  var hero = document.getElementById('hero');
  var heroInner = document.getElementById('hero-inner');
  var dotsCont = document.getElementById('hero-dots');
  var prevBtn = document.getElementById('hero-prev');
  var nextBtn = document.getElementById('hero-next');
  var index = 0;

  function renderHero(i){
    if (!hero) return;
    hero.style.background = slides[i].bg;
    var h = heroInner.querySelector('.hero-title');
    var p = heroInner.querySelector('.hero-lead');
    if(h) h.textContent = slides[i].title;
    if(p) p.textContent = slides[i].lead;
    var dots = dotsCont.querySelectorAll('.dot');
    dots.forEach(function(d,ii){ d.classList.toggle('active', ii === i); });
  }

  if (dotsCont) {
    slides.forEach(function(_, i) {
      var d = document.createElement('button');
      d.className = 'dot';
      d.setAttribute('aria-label', 'Show slide ' + (i+1));
      d.addEventListener('click', function () { index = i; renderHero(index); });
      dotsCont.appendChild(d);
    });
    renderHero(index);
    if (prevBtn) prevBtn.addEventListener('click', function(){ index = (index - 1 + slides.length) % slides.length; renderHero(index); });
    if (nextBtn) nextBtn.addEventListener('click', function(){ index = (index + 1) % slides.length; renderHero(index); });
    var auto = setInterval(function(){ index = (index + 1) % slides.length; renderHero(index); }, 6000);
    hero.addEventListener('mouseenter', function(){ clearInterval(auto); });
    hero.addEventListener('mouseleave', function(){ auto = setInterval(function(){ index = (index + 1) % slides.length; renderHero(index); }, 6000); });
  }

  (function () {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const submitBtn = document.getElementById('submit-btn');
    const resultEl = document.getElementById('contact-result');
    const endpointInput = document.getElementById('form-endpoint');
    const ENDPOINT = endpointInput ? endpointInput.value.trim() : 'https://api.web3forms.com/submit';
    const accessKeyInput = document.getElementById('access_key');
    const ACCESS_KEY = accessKeyInput ? accessKeyInput.value.trim() : '';

    function showResult(message, type) {
      resultEl.className = 'result';
      if (type) resultEl.classList.add(type);
      resultEl.textContent = message;
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      resultEl.textContent = '';
      resultEl.className = 'result';

      if (!form.checkValidity()) {
        form.reportValidity();
        showResult('Please complete the required fields.', 'error');
        return;
      }

      const data = {
        access_key: ACCESS_KEY,
        name: (form.querySelector('[name="name"]').value || '').trim(),
        email: (form.querySelector('[name="email"]').value || '').trim(),
        subject: (form.querySelector('[name="subject"]').value || '').trim(),
        message: (form.querySelector('[name="message"]').value || '').trim()
      };

      if (!data.email || data.email.length < 5) {
        showResult('Please provide a valid email address.', 'error');
        return;
      }
      if (!data.message || data.message.length < 8) {
        showResult('Message is too short (min 8 characters).', 'error');
        return;
      }
      if (!data.access_key) {
        showResult('Form access key is not configured. Please add your Web3Forms access key.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';

      try {
        const resp = await fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const json = await resp.json().catch(() => null);

        if (resp.ok && json && (json.success || json.status === 'success')) {
          showResult('Thanks — your message was sent. We will reply to your email shortly.', 'success');
          form.reset();
        } else {
          const msg = (json && (json.message || json.error)) ? (json.message || json.error) : 'Failed to send — please try again later.';
          showResult(msg, 'error');
        }
      } catch (err) {
        console.error('Contact form error:', err);
        showResult('Network error — check your connection and try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
        submitBtn.textContent = originalLabel;
      }
    });
  })();
});
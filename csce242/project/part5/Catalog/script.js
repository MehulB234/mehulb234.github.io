document.addEventListener('DOMContentLoaded', function(){
  (function(){
    const toggleBtn = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('nav-overlay');
    if (!toggleBtn || !mobileNav || !overlay) return;
    function setOpen(isOpen){
      toggleBtn.classList.toggle('open', isOpen);
      mobileNav.classList.toggle('open', isOpen);
      overlay.classList.toggle('open', isOpen);
      if(isOpen){
        mobileNav.hidden = false;
        overlay.hidden = false;
        toggleBtn.setAttribute('aria-expanded','true');
        toggleBtn.setAttribute('aria-label','Close menu');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        const first = mobileNav.querySelector('[role="menuitem"], a, button, input');
        if(first) first.focus();
      } else {
        mobileNav.hidden = true;
        overlay.hidden = true;
        toggleBtn.setAttribute('aria-expanded','false');
        toggleBtn.setAttribute('aria-label','Open menu');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        toggleBtn.focus();
      }
    }
    toggleBtn.addEventListener('click', function(){
      const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });
    overlay.addEventListener('click', () => setOpen(false));
    mobileNav.addEventListener('click', function(e){
      const link = e.target.closest('a');
      if(link) setOpen(false);
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
    window.addEventListener('resize', function(){
      if(window.innerWidth >= 880 && toggleBtn.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  })();

  var slides=[
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("../../homepage/images/TopReleases.png") center/cover no-repeat',title:'Featured',lead:'Top stories & deals'},
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("../../homepage/images/HotDeals.png") center/cover no-repeat',title:'Hot Deals',lead:'Limited-time store offers'},
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("../../homepage/images/Home.png") center/cover no-repeat',title:'Community',lead:'Projects and community highlights'}
  ];
  var hero=document.getElementById('hero');
  var heroInner=document.getElementById('hero-inner');
  var dotsCont=document.getElementById('hero-dots');
  var prevBtn=document.getElementById('hero-prev');
  var nextBtn=document.getElementById('hero-next');
  var index=0;
  function renderHero(i){
    if(hero) hero.style.background=slides[i].bg;
    if(heroInner){
      var h=heroInner.querySelector('h1');
      var p=heroInner.querySelector('.hero-lead');
      if(h) h.textContent=slides[i].title;
      if(p) p.textContent=slides[i].lead;
    }
    var dots = dotsCont ? dotsCont.querySelectorAll('.dot') : [];
    dots.forEach(function(d,ii){ d.classList.toggle('active',ii===i); });
  }
  if(dotsCont){
    slides.forEach(function(_,i){
      var d=document.createElement('button');
      d.className='dot';
      d.setAttribute('aria-label','Show slide '+(i+1));
      d.addEventListener('click',function(){ index=i; renderHero(index); });
      dotsCont.appendChild(d);
    });
    renderHero(index);
    if(prevBtn) prevBtn.addEventListener('click',function(){ index=(index-1+slides.length)%slides.length; renderHero(index); });
    if(nextBtn) nextBtn.addEventListener('click',function(){ index=(index+1)%slides.length; renderHero(index); });
    var auto=setInterval(function(){ index=(index+1)%slides.length; renderHero(index); },6000);
    if(hero){
      hero.addEventListener('mouseenter',function(){ clearInterval(auto); });
      hero.addEventListener('mouseleave',function(){ auto=setInterval(function(){ index=(index+1)%slides.length; renderHero(index); },6000); });
    }
  }

  var chips=document.querySelectorAll('.chip');
  chips.forEach(function(c){ c.addEventListener('click',function(){ chips.forEach(function(x){ x.classList.remove('active') }); c.classList.add('active'); }); });

  var addBtns=document.querySelectorAll('.add-btn');
  addBtns.forEach(function(b){ b.addEventListener('click',function(e){ e.preventDefault(); b.blur(); var prev=b.textContent; b.textContent='Added ✓'; setTimeout(function(){ b.textContent=prev },900); }); });

});
(function(){
  function initLightbox(){
    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    if (!thumbs.length) return;
    const lb = document.getElementById('lightbox');
    const overlay = document.getElementById('lb-overlay');
    const content = lb.querySelector('.lb-content');
    const btnClose = lb.querySelector('.lb-close');
    const btnPrev = lb.querySelector('.lb-prev');
    const btnNext = lb.querySelector('.lb-next');
    let currentIndex = -1;
    const items = thumbs.map(t => ({
      type: t.dataset.type || 'image',
      src: t.dataset.src,
      video: t.dataset.video,
      button: t
    }));
    function openAt(i){
      currentIndex = i;
      const it = items[i];
      content.innerHTML = '';
      if (it.type === 'image' && it.src){
        const img = document.createElement('img');
        img.src = it.src;
        img.alt = it.button.querySelector('img')?.alt || '';
        content.appendChild(img);
      } else if (it.type === 'video' && it.video){
        const iframe = document.createElement('iframe');
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.setAttribute('allowfullscreen','');
        iframe.src = 'https://www.youtube.com/embed/' + encodeURIComponent(it.video) + '?autoplay=1&rel=0';
        content.appendChild(iframe);
      } else {
        const p = document.createElement('div');
        p.textContent = 'Media not available';
        p.style.color = 'var(--muted)';
        content.appendChild(p);
      }
      lb.setAttribute('aria-hidden','false');
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden','false');
      const focusable = content.querySelector('iframe, img, button, a, [tabindex]');
      if (focusable) focusable.focus();
      document.documentElement.style.overflow='hidden';
      document.body.style.overflow='hidden';
    }
    function closeLB(){
      lb.setAttribute('aria-hidden','true');
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
      content.innerHTML='';
      document.documentElement.style.overflow='';
      document.body.style.overflow='';
      if (currentIndex > -1) items[currentIndex].button.focus();
      currentIndex = -1;
    }
    function next(){ if (currentIndex < items.length - 1) openAt(currentIndex + 1); else openAt(0); }
    function prev(){ if (currentIndex > 0) openAt(currentIndex - 1); else openAt(items.length - 1); }
    thumbs.forEach((t,i)=> t.addEventListener('click', function(e){ e.preventDefault(); openAt(i); }));
    btnClose.addEventListener('click', closeLB);
    overlay.addEventListener('click', closeLB);
    btnNext.addEventListener('click', next);
    btnPrev.addEventListener('click', prev);
    document.addEventListener('keydown', function(e){
      if (lb.getAttribute('aria-hidden') === 'false'){
        if (e.key === 'Escape') closeLB();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initLightbox);
  else initLightbox();
})();
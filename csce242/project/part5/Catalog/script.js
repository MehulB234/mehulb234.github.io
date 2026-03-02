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
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("../../homepage/images/EldenRing.png") center/cover no-repeat',title:'Featured Releases',lead:'Shop the latest and greatest'},
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("../../homepage/images/FC26.png") center/cover no-repeat',title:'Top Sellers',lead:'Fan favorites picked by the community'},
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("../../homepage/images/CallOfDuty.png") center/cover no-repeat',title:'Editor Picks',lead:'Curated titles for every mood'}
  ];
  var hero=document.getElementById('hero');
  var heroInner=document.getElementById('hero-inner');
  var dotsCont=document.getElementById('hero-dots');
  var prevBtn=document.getElementById('hero-prev');
  var nextBtn=document.getElementById('hero-next');
  var index=0;
  function renderHero(i){
    hero.style.background=slides[i].bg;
    var h=heroInner.querySelector('h1');
    var p=heroInner.querySelector('.hero-lead');
    if(h) h.textContent=slides[i].title;
    if(p) p.textContent=slides[i].lead;
    var dots=dotsCont.querySelectorAll('.dot');
    dots.forEach(function(d,ii){ d.classList.toggle('active',ii===i); });
  }
  slides.forEach(function(_,i){
    var d=document.createElement('button');
    d.className='dot';
    d.setAttribute('aria-label','Show slide '+(i+1));
    d.addEventListener('click',function(){ index=i; renderHero(index); });
    dotsCont.appendChild(d);
  });
  renderHero(index);
  prevBtn.addEventListener('click',function(){ index=(index-1+slides.length)%slides.length; renderHero(index); });
  nextBtn.addEventListener('click',function(){ index=(index+1)%slides.length; renderHero(index); });
  var auto=setInterval(function(){ index=(index+1)%slides.length; renderHero(index); },6000);
  hero.addEventListener('mouseenter',function(){ clearInterval(auto); });
  hero.addEventListener('mouseleave',function(){ auto=setInterval(function(){ index=(index+1)%slides.length; renderHero(index); },6000); });

  var featLeft=document.getElementById('feat-left');
  var featRight=document.getElementById('feat-right');
  var featRow=document.getElementById('featured-row');
  if(featLeft&&featRight&&featRow){
    featLeft.addEventListener('click',function(){ featRow.scrollBy({left:-featRow.clientWidth,behavior:'smooth'}); });
    featRight.addEventListener('click',function(){ featRow.scrollBy({left:featRow.clientWidth,behavior:'smooth'}); });
  }
});
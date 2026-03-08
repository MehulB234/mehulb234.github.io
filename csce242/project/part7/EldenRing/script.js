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
      document.documentElement.classList.toggle('nav-open', isOpen);
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

  var toggle=document.getElementById('nav-toggle');
  var navlinks=document.getElementById('navlinks');
  if(toggle&&navlinks){
    toggle.addEventListener('click',function(){
      var expanded=toggle.getAttribute('aria-expanded')==='true';
      var anchors=navlinks.querySelectorAll('a');
      anchors.forEach(function(a){
        if(!expanded) a.removeAttribute('tabindex');
        else a.setAttribute('tabindex','-1');
      });
    });
  }

  var addCart=document.getElementById('add-cart');
  var addWish=document.getElementById('add-wish');
  if(addCart){
    addCart.addEventListener('click',function(e){
      e.preventDefault();
      addCart.blur();
      var prev=addCart.textContent;
      addCart.textContent='Added ✓';
      setTimeout(function(){addCart.textContent=prev},900);
    });
  }
  if(addWish){
    addWish.addEventListener('click',function(e){
      e.preventDefault();
      addWish.blur();
      var prev=addWish.textContent;
      addWish.textContent='Added ✓';
      setTimeout(function(){addWish.textContent=prev},900);
    });
  }
});
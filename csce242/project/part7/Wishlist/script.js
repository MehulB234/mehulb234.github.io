document.addEventListener('DOMContentLoaded', function(){
  (function () {
    const toggleBtn = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('nav-overlay');
    const navlinks = document.getElementById('navlinks');
    if (!toggleBtn || !mobileNav || !overlay) return;
    function setOpen(isOpen) {
      toggleBtn.classList.toggle('open', isOpen);
      mobileNav.classList.toggle('open', isOpen);
      overlay.classList.toggle('open', isOpen);
      document.documentElement.classList.toggle('nav-open', isOpen);
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
    overlay.addEventListener('click', () => setOpen(false));
    mobileNav.addEventListener('click', function (e) {
      const link = e.target.closest('a');
      if (link) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 880 && toggleBtn.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
  })();

  var wishlistKey='gamergg_wishlist_v1';
  function getSaved(){try{var raw=localStorage.getItem(wishlistKey);return raw?JSON.parse(raw):[]}catch(e){return[]}}
  function safeHref(h){try{if(!h) return '../Catalog/index.html';var lower=h.toLowerCase();if(lower.startsWith('file://')||lower.startsWith('/home/')||lower.match(/^[a-z]\:\\/i)) return '../Catalog/index.html';return h}catch(e){return '../Catalog/index.html'}}
  var grid=document.getElementById('wishlist-grid');
  var emptyPanel=document.querySelector('.empty-panel');
  var savedSection=document.querySelector('.saved-list');
  function render(){
    var items=getSaved();
    if(!items.length){
      if(emptyPanel) emptyPanel.style.display='flex';
      if(savedSection) savedSection.style.display='none';
      if(grid) grid.innerHTML='';
      return;
    }
    if(emptyPanel) emptyPanel.style.display='none';
    if(savedSection) savedSection.style.display='block';
    grid.innerHTML='';
    items.forEach(function(it,idx){
      var card=document.createElement('div');card.className='wish-card';
      var thumb=document.createElement('div');thumb.className='wish-thumb';
      var img=document.createElement('img');img.src=it.image||'../../homepage/images/TopReleases.png';img.alt=it.title||'Saved game';
      thumb.appendChild(img);
      var info=document.createElement('div');info.className='wish-info';
      var a=document.createElement('a');a.className='wish-title';a.href=safeHref(it.href);a.textContent=it.title||'Saved game';a.target='_self';
      var meta=document.createElement('div');meta.className='wish-meta';meta.textContent=it.platform?it.platform:'';
      info.appendChild(a);info.appendChild(meta);
      var actions=document.createElement('div');actions.className='wish-actions';
      var remove=document.createElement('button');remove.className='remove-btn';remove.textContent='Remove';remove.disabled=true;remove.setAttribute('aria-disabled','true');
      actions.appendChild(remove);
      card.appendChild(thumb);card.appendChild(info);card.appendChild(actions);
      grid.appendChild(card);
    });
  }
  render();
});
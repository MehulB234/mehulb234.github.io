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
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      } else {
        mobileNav.hidden = true;
        overlay.hidden = true;
        toggleBtn.setAttribute('aria-expanded','false');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    }

    toggleBtn.addEventListener('click', function(){
      const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    overlay.addEventListener('click', () => setOpen(false));
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

    if(prevBtn) prevBtn.addEventListener('click',function(){
      index=(index-1+slides.length)%slides.length;
      renderHero(index);
    });

    if(nextBtn) nextBtn.addEventListener('click',function(){
      index=(index+1)%slides.length;
      renderHero(index);
    });

    var auto=setInterval(function(){
      index=(index+1)%slides.length;
      renderHero(index);
    },6000);

    if(hero){
      hero.addEventListener('mouseenter',function(){ clearInterval(auto); });
      hero.addEventListener('mouseleave',function(){
        auto=setInterval(function(){
          index=(index+1)%slides.length;
          renderHero(index);
        },6000);
      });
    }
  }


  var chips=document.querySelectorAll('.chip');
  chips.forEach(function(c){
    c.addEventListener('click',function(){
      chips.forEach(function(x){ x.classList.remove('active') });
      c.classList.add('active');
    });
  });

  const jsonUrlBase = "https://mehulb234.github.io/csce242/json/catalog.json";
  const jsonUrl = jsonUrlBase + "?v=" + Date.now();

  function resolveImageUrl(imgName){
    if(!imgName) return '';
    let p = String(imgName).trim();

    if(/^https?:\/\//i.test(p)) return p;

    if(!p.startsWith('/')) p = '/' + p;
    p = p.replace(/\/+/g, '/');


    if(/\/homepage\//i.test(p) && !/\/csce242\//i.test(p)){
      p = '/csce242/project' + p;
    }

    if(!/\/csce242\//i.test(p)){
      p = '/csce242/project' + p;
    }

    const final = 'https://mehulb234.github.io' + p;
    console.debug('[resolveImageUrl] original:', imgName, '->', final);
    return final;
  }

  fetch(jsonUrl)
    .then(r => {
      if(!r.ok) throw new Error('fetch failed: ' + r.status);
      return r.json();
    })
    .then(data => renderCatalog(data))
    .catch(err => {
      console.error('Failed to load catalog.json:', err);
      const grid = document.querySelector('.catalog-grid');
      if(grid) grid.innerHTML = '<p style="color:#f55;padding:16px;">Failed to load catalog.json</p>';
    });

  function renderCatalog(data){
    if(!data || !Array.isArray(data.catalog)){
      console.error('Invalid catalog format');
      return;
    }

    const grid = document.querySelector('.catalog-grid');
    if(!grid) {
      console.error('No .catalog-grid element found');
      return;
    }

    grid.innerHTML = '';

    data.catalog.forEach(item => {
      const card = document.createElement('article');
      card.className = 'catalog-card';

      const imageUrl = resolveImageUrl(item.img_name || '');
      let thumbHtml;
      if((item.media_type && item.media_type.toLowerCase() === 'video') || item.trailer_id){
        thumbHtml = `
          <button class="thumb" data-video="${item.trailer_id || ''}" aria-label="Play ${escapeHtml(item.title)} trailer">
            <div class="card-thumb">
              <img src="${imageUrl}" alt="${escapeHtml(item.img_alt || item.title || '')}">
            </div>
          </button>
        `;
      } else {
        thumbHtml = `
          <a href="${escapeHtml(item.detail_link || '#')}" class="thumb-link" aria-label="Open ${escapeHtml(item.title)} detail">
            <div class="card-thumb">
              <img src="${imageUrl}" alt="${escapeHtml(item.img_alt || item.title || '')}">
            </div>
          </a>
        `;
      }

      const priceDisplay = item.price_display || (item.price ? "$" + Number(item.price).toFixed(2) : '');

      card.innerHTML = `
        ${thumbHtml}
        <div class="card-body">
          <div class="card-title"><a class="game-link" href="${escapeHtml(item.detail_link || '#')}">${escapeHtml(item.title || 'Untitled')}</a></div>
          <div class="card-meta">${escapeHtml(item.platform || '')}</div>
          <div class="card-bottom">
            <div class="price">${escapeHtml(priceDisplay)}</div>
            <a class="add-btn" href="#">Add to Cart</a>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    setupAddButtonsAndThumbs();
  }

  function escapeHtml(s){
    return String(s || '').replace(/[&<>"']/g, function(m){
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m];
    });
  }

  function setupAddButtonsAndThumbs(){
    // Add buttons
    const addBtns = Array.from(document.querySelectorAll('.add-btn'));
    addBtns.forEach(function(b){
      b.addEventListener('click', function(e){
        e.preventDefault();
        b.blur();
        const prev = b.textContent;
        b.textContent = 'Added ✓';
        setTimeout(function(){ b.textContent = prev; }, 900);
      });
    });

    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    if(!thumbs.length) return;

    const lb = document.getElementById('lightbox');
    const overlay = document.getElementById('lb-overlay');
    const content = lb.querySelector('.lb-content');
    const closeBtn = lb.querySelector('.lb-close');

    function openVideo(videoId){
      content.innerHTML = '';
      const iframe = document.createElement('iframe');
      iframe.style.width = "min(960px,92vw)";
      iframe.style.height = "min(540px,64vh)";
      iframe.style.border = "0";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
      iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&mute=1&playsinline=1&rel=0";
      content.appendChild(iframe);

      lb.setAttribute('aria-hidden','false');
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden','false');
      document.documentElement.style.overflow='hidden';
      document.body.style.overflow='hidden';
    }

    function closeLightbox(){
      lb.setAttribute('aria-hidden','true');
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden','true');
      content.innerHTML = '';
      document.documentElement.style.overflow='';
      document.body.style.overflow='';
    }

    thumbs.forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault();
        const videoId = btn.dataset.video || btn.getAttribute('data-video');
        if(videoId) openVideo(videoId);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function(e){
      if(lb.getAttribute('aria-hidden') === 'false' && e.key === 'Escape'){
        closeLightbox();
      }
    });
  }

});
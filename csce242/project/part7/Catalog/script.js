document.addEventListener('DOMContentLoaded', function () {

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
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("/csce242/project/homepage/images/TopReleases.png") center/cover no-repeat',title:'Featured',lead:'Top stories & deals'},
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("/csce242/project/homepage/images/HotDeals.png") center/cover no-repeat',title:'Hot Deals',lead:'Limited-time store offers'},
    {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("/csce242/project/homepage/images/Home.png") center/cover no-repeat',title:'Community',lead:'Projects and community highlights'}
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

  const JSON_URL = '/csce242/json/catalog.json';

  function escapeHtml(s){
    return String(s || '').replace(/[&<>"']/g, function(m){
      return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[m];
    });
  }

  function formatPrice(p){
    if(typeof p === 'number') return '$' + p.toFixed(2);
    if(!p) return '';
    return String(p);
  }

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
      p = '/csce242/project/homepage/images/' + p.replace(/^\/+/, '');
    }
    const final = 'https://mehulb234.github.io' + p;
    return final;
  }

  const PLACEHOLDER = '/csce242/project/homepage/images/placeholder.png';

  function showCatalogError(msg){
    const grid = document.querySelector('.catalog-grid');
    if(grid){
      grid.innerHTML = '<div style="color:#f66;padding:18px;"><strong>Error:</strong> '+ escapeHtml(msg) +'</div>';
    }
    console.error('Catalog error:', msg);
  }

  function renderCatalog(data){
    if(!data || !Array.isArray(data.catalog)){
      showCatalogError('catalog.json has unexpected format (expected { "catalog": [...] })');
      return;
    }

    const grid = document.querySelector('.catalog-grid');
    if(!grid){
      console.error('No .catalog-grid found on page');
      return;
    }

    grid.innerHTML = '';

    data.catalog.forEach(item => {
      try {
        const card = document.createElement('article');
        card.className = 'catalog-card';

        const imgUrl = resolveImageUrl(item.img_name || item.img || '');

        let thumbWrap;
        if((item.media_type && item.media_type.toLowerCase() === 'video') || item.trailer_id){
          const btn = document.createElement('button');
          btn.className = 'thumb';
          btn.setAttribute('data-video', item.trailer_id || '');
          btn.setAttribute('aria-label','Play '+ (item.title || 'video') +' trailer');
          thumbWrap = btn;
        } else {
          const a = document.createElement('a');
          a.className = 'thumb-link';
          a.href = item.detail_link || '#';
          a.setAttribute('aria-label','Open '+ (item.title || 'detail'));
          thumbWrap = a;
        }

        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'card-thumb';

        const img = document.createElement('img');
        img.alt = item.img_alt || (item.title ? item.title + ' cover' : 'cover image');
        img.src = imgUrl || PLACEHOLDER;
        img.onerror = function(){
          if(img.src && img.src.indexOf('/csce242/project/homepage/images/') === -1){
            img.src = '/csce242/project/homepage/images/' + (item.img_name || '').split('/').pop();
          } else {
            img.src = PLACEHOLDER;
          }
        };

        thumbDiv.appendChild(img);
        thumbWrap.appendChild(thumbDiv);
        card.appendChild(thumbWrap);

        const body = document.createElement('div');
        body.className = 'card-body';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'card-title';
        const titleLink = document.createElement('a');
        titleLink.className = 'game-link';
        titleLink.href = item.detail_link || '#';
        titleLink.textContent = item.title || 'Untitled';
        titleDiv.appendChild(titleLink);
        body.appendChild(titleDiv);

        const metaDiv = document.createElement('div');
        metaDiv.className = 'card-meta';
        metaDiv.textContent = item.platform || '';
        body.appendChild(metaDiv);

        const bottom = document.createElement('div');
        bottom.className = 'card-bottom';

        const priceDiv = document.createElement('div');
        priceDiv.className = 'price';
        priceDiv.textContent = item.price_display || formatPrice(item.price || 0);
        bottom.appendChild(priceDiv);

        const addBtn = document.createElement('a');
        addBtn.className = 'add-btn';
        addBtn.href = '#';
        addBtn.textContent = 'Add to Cart';
        addBtn.addEventListener('click', function(e){
          e.preventDefault();
          const prev = addBtn.textContent;
          addBtn.textContent = 'Added ✓';
          setTimeout(function(){ addBtn.textContent = prev; }, 900);
        });
        bottom.appendChild(addBtn);

        body.appendChild(bottom);
        card.appendChild(body);

        grid.appendChild(card);
      } catch (err){
        console.warn('Failed to render item', item, err);
      }
    });

    setupAddButtonsAndThumbs();

    console.log('Catalog loaded:', data.catalog.length, 'items');
  }

  (function loadCatalog(){
    const url = JSON_URL + '?_=' + Date.now();
    const grid = document.querySelector('.catalog-grid');
    if(grid) grid.innerHTML = '<div style="padding:24px;color:#999">Loading catalog…</div>';

    fetch(url, { cache: 'no-store' })
      .then(r => {
        if(!r.ok) throw new Error('Failed to fetch ' + url + ' (status ' + r.status + ')');
        return r.json();
      })
      .then(data => renderCatalog(data))
      .catch(err => {
        showCatalogError(err.message || String(err));
      });
  })();

  function setupAddButtonsAndThumbs(){
    const addBtns = Array.from(document.querySelectorAll('.add-btn'));
    addBtns.forEach(function(b){
      if(!b._bound){
        b.addEventListener('click', function(e){
          e.preventDefault();
          b.blur();
          const prev = b.textContent;
          b.textContent = 'Added ✓';
          setTimeout(function(){ b.textContent = prev; }, 900);
        });
        b._bound = true;
      }
    });

    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    if(!thumbs.length) return;

    const lb = document.getElementById('lightbox');
    const overlay = document.getElementById('lb-overlay');
    const content = lb ? lb.querySelector('.lb-content') : null;
    const closeBtn = lb ? lb.querySelector('.lb-close') : null;

    function openVideo(videoId){
      if(!content || !lb) return;
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
      if(overlay) overlay.classList.add('open');
      if(overlay) overlay.setAttribute('aria-hidden','false');
      document.documentElement.style.overflow='hidden';
      document.body.style.overflow='hidden';
    }

    function closeLightbox(){
      const lbEl = document.getElementById('lightbox');
      if(!lbEl || !content) return;
      lbEl.setAttribute('aria-hidden','true');
      if(overlay) overlay.classList.remove('open');
      if(overlay) overlay.setAttribute('aria-hidden','true');
      content.innerHTML = '';
      document.documentElement.style.overflow='';
      document.body.style.overflow='';
    }

    thumbs.forEach(function(btn){
      if(!btn._thumbBound){
        btn.addEventListener('click', function(e){
          e.preventDefault();
          const videoId = btn.dataset.video || btn.getAttribute('data-video');
          if(videoId) openVideo(videoId);
        });
        btn._thumbBound = true;
      }
    });

    if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if(overlay) overlay.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', function(e){
      const lbEl = document.getElementById('lightbox');
      if(lbEl && lbEl.getAttribute('aria-hidden') === 'false' && e.key === 'Escape'){
        closeLightbox();
      }
    });
  }

});
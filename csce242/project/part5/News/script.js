document.addEventListener('DOMContentLoaded',function(){
    var toggle=document.getElementById('nav-toggle')
    var navlinks=document.getElementById('navlinks')
    if(toggle&&navlinks){
      toggle.addEventListener('click',function(){
        var expanded=toggle.getAttribute('aria-expanded')==='true'
        toggle.setAttribute('aria-expanded',String(!expanded))
        navlinks.classList.toggle('open')
        var anchors=navlinks.querySelectorAll('a')
        anchors.forEach(function(a){
          if(!expanded) a.removeAttribute('tabindex')
          else a.setAttribute('tabindex','-1')
        })
      })
    }
  
    var slides=[
      {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("../../homepage/images/TopReleases.png") center/cover no-repeat',title:'Featured',lead:'Top stories & deals'},
      {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("../../homepage/images/HotDeals.png") center/cover no-repeat',title:'Hot Deals',lead:'Limited-time store offers'},
      {bg:'linear-gradient(180deg, rgba(2,6,10,0.6), rgba(2,6,10,0.85)), url("../../homepage/images/Home.png") center/cover no-repeat',title:'Community',lead:'Projects and community highlights'}
    ]
    var hero=document.getElementById('hero')
    var heroInner=document.getElementById('hero-inner')
    var dotsCont=document.getElementById('hero-dots')
    var prevBtn=document.getElementById('hero-prev')
    var nextBtn=document.getElementById('hero-next')
    var index=0
    function renderHero(i){
      hero.style.background=slides[i].bg
      var h=heroInner.querySelector('h1')
      var p=heroInner.querySelector('.hero-lead')
      if(h) h.textContent=slides[i].title
      if(p) p.textContent=slides[i].lead
      var dots=dotsCont.querySelectorAll('.dot')
      dots.forEach(function(d,ii){
        d.classList.toggle('active',ii===i)
      })
    }
    if(dotsCont){
      slides.forEach(function(_,i){
        var d=document.createElement('button')
        d.className='dot'
        d.setAttribute('aria-label','Show slide '+(i+1))
        d.addEventListener('click',function(){ index=i; renderHero(index) })
        dotsCont.appendChild(d)
      })
      renderHero(index)
      if(prevBtn) prevBtn.addEventListener('click',function(){ index=(index-1+slides.length)%slides.length; renderHero(index) })
      if(nextBtn) nextBtn.addEventListener('click',function(){ index=(index+1)%slides.length; renderHero(index) })
      var auto=setInterval(function(){ index=(index+1)%slides.length; renderHero(index) },6000)
      hero.addEventListener('mouseenter',function(){ clearInterval(auto) })
      hero.addEventListener('mouseleave',function(){ auto=setInterval(function(){ index=(index+1)%slides.length; renderHero(index) },6000) })
    }
  
    var featLeft=document.getElementById('feat-left')
    var featRight=document.getElementById('feat-right')
    var featRow=document.getElementById('featured-row')
    if(featLeft&&featRight&&featRow){
      featLeft.addEventListener('click',function(){ featRow.scrollBy({left:-featRow.clientWidth,behavior:'smooth'}) })
      featRight.addEventListener('click',function(){ featRow.scrollBy({left:featRow.clientWidth,behavior:'smooth'}) })
    }
  })
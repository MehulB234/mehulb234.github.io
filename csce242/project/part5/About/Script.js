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
      {bg:'linear-gradient(180deg, rgba(2,6,10,0.55), rgba(2,6,10,0.8)), url("../../homepage/images/TopReleases.png") center/cover no-repeat',title:'About',lead:'We build community and highlight great games'},
      {bg:'linear-gradient(180deg, rgba(2,6,10,0.55), rgba(2,6,10,0.8)), url("../../homepage/images/HotDeals.png") center/cover no-repeat',title:'Deals',lead:'Limited-time offers and featured sales'},
      {bg:'linear-gradient(180deg, rgba(2,6,10,0.55), rgba(2,6,10,0.8)), url("../../homepage/images/Home.png") center/cover no-repeat',title:'Community',lead:'Projects, mods, and spotlights'}
    ]
    var hero=document.getElementById('hero')
    var heroInner=document.getElementById('hero-inner')
    var dotsCont=document.getElementById('hero-dots')
    var prevBtn=document.getElementById('hero-prev')
    var nextBtn=document.getElementById('hero-next')
    var index=0
    function renderHero(i){
      hero.style.background=slides[i].bg
      var h=heroInner.querySelector('.hero-title')
      var p=heroInner.querySelector('.hero-lead')
      if(h) h.textContent=slides[i].title
      if(p) p.textContent=slides[i].lead
      var dots=dotsCont.querySelectorAll('.dot')
      dots.forEach(function(d,ii){ d.classList.toggle('active',ii===i) })
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
  })
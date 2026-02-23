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

  var addCart=document.getElementById('add-cart')
  var addWish=document.getElementById('add-wish')
  if(addCart){
    addCart.addEventListener('click',function(e){
      e.preventDefault()
      addCart.blur()
      var prev=addCart.textContent
      addCart.textContent='Added ✓'
      setTimeout(function(){addCart.textContent=prev},900)
    })
  }
  if(addWish){
    addWish.addEventListener('click',function(e){
      e.preventDefault()
      addWish.blur()
      var prev=addWish.textContent
      addWish.textContent='Added ✓'
      setTimeout(function(){addWish.textContent=prev},900)
    })
  }
})
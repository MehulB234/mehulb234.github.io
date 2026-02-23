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

  var cartKey='gamergg_cart_v1'
  var wishKey='gamergg_wishlist_v1'
  function getList(k){try{var r=localStorage.getItem(k);return r?JSON.parse(r):[]}catch(e){return[]}}
  function saveList(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}

  var addCart=document.getElementById('add-cart')
  var addWish=document.getElementById('add-wish')
  var gameData={
    title:'Elden Ring',
    price:59.99,
    href:'../EldenRing/index.html',
    image:'../Catalog/Images/EldenRing.png',
    platform:'PlayStation',
    qty:1
  }
  if(addCart){
    addCart.addEventListener('click',function(){
      var list=getList(cartKey)
      var found=false
      for(var i=0;i<list.length;i++){
        if(list[i].title===gameData.title){list[i].qty=(list[i].qty||1)+1;found=true;break}
      }
      if(!found){list.push(Object.assign({},gameData))}
      saveList(cartKey,list)
      addCart.textContent='Added ✓'
      setTimeout(function(){addCart.textContent='🛒 Add to Cart'},900)
    })
  }
  if(addWish){
    addWish.addEventListener('click',function(){
      var list=getList(wishKey)
      var exists=list.some(function(it){return it.title===gameData.title})
      if(!exists){list.push(Object.assign({},gameData));saveList(wishKey,list)}
      addWish.textContent='Added ✓'
      setTimeout(function(){addWish.textContent='♡ Add to Wishlist'},900)
    })
  }
})
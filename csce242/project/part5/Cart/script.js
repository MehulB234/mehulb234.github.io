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

  var storageKey='gamergg_cart_v1'
  function getCart(){try{var raw=localStorage.getItem(storageKey);return raw?JSON.parse(raw):[]}catch(e){return[]}}
  function safeHref(h){try{if(!h) return '../Catalog/index.html';var lower=h.toLowerCase();if(lower.startsWith('file://')||lower.startsWith('/home/')||lower.match(/^[a-z]\:\\/i)) return '../Catalog/index.html';return h}catch(e){return '../Catalog/index.html'}}
  var emptyPanel=document.querySelector('.empty-panel')
  var cartSection=document.querySelector('.cart-section')
  var grid=document.getElementById('cart-grid')
  var subtotalEl=document.getElementById('subtotal')
  var taxEl=document.getElementById('tax')
  var totalEl=document.getElementById('total')
  var checkoutBtn=document.getElementById('checkout-btn')
  function format(n){return '$'+(Math.round(n*100)/100).toFixed(2)}
  function render(){
    var items=getCart()
    if(!items.length){
      if(emptyPanel) emptyPanel.style.display='flex'
      if(cartSection) cartSection.style.display='none'
      if(grid) grid.innerHTML=''
      if(subtotalEl) subtotalEl.textContent=format(0)
      if(taxEl) taxEl.textContent=format(0)
      if(totalEl) totalEl.textContent=format(0)
      return
    }
    if(emptyPanel) emptyPanel.style.display='none'
    if(cartSection) cartSection.style.display='grid'
    grid.innerHTML=''
    var subtotal=0
    items.forEach(function(it,idx){
      var card=document.createElement('div');card.className='cart-item'
      var thumb=document.createElement('div');thumb.className='item-thumb'
      var img=document.createElement('img');img.src=it.image||'../../homepage/images/TopReleases.png';img.alt=it.title||'Product'
      thumb.appendChild(img)
      var info=document.createElement('div');info.className='item-info'
      var a=document.createElement('a');a.className='item-title';a.href=safeHref(it.href);a.textContent=it.title||'Product'
      var meta=document.createElement('div');meta.className='item-meta';meta.textContent=it.platform?it.platform:''
      info.appendChild(a);info.appendChild(meta)
      var qty=document.createElement('div');qty.className='qty-controls'
      var btnDec=document.createElement('button');btnDec.className='qty-btn';btnDec.textContent='-';btnDec.disabled=true
      var display=document.createElement('div');display.className='qty-display';display.textContent=it.qty?it.qty:1
      var btnInc=document.createElement('button');btnInc.className='qty-btn';btnInc.textContent='+';btnInc.disabled=true
      qty.appendChild(btnDec);qty.appendChild(display);qty.appendChild(btnInc)
      info.appendChild(qty)
      var actions=document.createElement('div');actions.style.display='flex';actions.style.flexDirection='column';actions.style.alignItems='flex-end';actions.style.gap='10px'
      var price=document.createElement('div');price.className='item-price';price.style.fontWeight='800';price.style.color='var(--accent)';price.textContent=format(it.price||0)
      var remove=document.createElement('button');remove.className='remove-btn';remove.textContent='Remove';remove.disabled=true;remove.setAttribute('aria-disabled','true')
      actions.appendChild(price);actions.appendChild(remove)
      card.appendChild(thumb);card.appendChild(info);card.appendChild(actions)
      grid.appendChild(card)
      var quantity=it.qty?it.qty:1
      subtotal+=((it.price||0)*quantity)
    })
    var tax=subtotal*0.08
    var total=subtotal+tax
    if(subtotalEl) subtotalEl.textContent=format(subtotal)
    if(taxEl) taxEl.textContent=format(tax)
    if(totalEl) totalEl.textContent=format(total)
  }
  render()
  if(checkoutBtn){
    checkoutBtn.disabled=true
    checkoutBtn.setAttribute('aria-disabled','true')
  }
})
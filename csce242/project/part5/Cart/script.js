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
    function getCart(){
      try{
        var raw=localStorage.getItem(storageKey)
        return raw?JSON.parse(raw):[]
      }catch(e){return[]}
    }
    function saveCart(list){
      try{localStorage.setItem(storageKey,JSON.stringify(list))}catch(e){}
    }
  
    var emptyPanel=document.querySelector('.empty-panel')
    var cartSection=document.querySelector('.cart-section')
    var grid=document.getElementById('cart-grid')
    var subtotalEl=document.getElementById('subtotal')
    var taxEl=document.getElementById('tax')
    var totalEl=document.getElementById('total')
    var checkoutBtn=document.getElementById('checkout-btn')
  
    function format(n){return '$'+(Math.round(n*100)/100).toFixed(2)}
  
    function recalcAndRender(){
      var items=getCart()
      if(!items.length){
        emptyPanel.style.display='flex'
        if(cartSection) cartSection.style.display='none'
        return
      }
      emptyPanel.style.display='none'
      if(cartSection) cartSection.style.display='grid'
      grid.innerHTML=''
      var subtotal=0
      items.forEach(function(it,idx){
        var card=document.createElement('div')
        card.className='cart-item'
        var thumb=document.createElement('div')
        thumb.className='item-thumb'
        var img=document.createElement('img')
        img.src=it.image||'../../homepage/images/TopReleases.png'
        img.alt=it.title||'Product'
        thumb.appendChild(img)
        var info=document.createElement('div')
        info.className='item-info'
        var a=document.createElement('a')
        a.className='item-title'
        a.href=it.href||'../Catalog/index.html'
        a.textContent=it.title||'Product'
        var meta=document.createElement('div')
        meta.className='item-meta'
        meta.textContent=it.platform?it.platform:''
        info.appendChild(a)
        info.appendChild(meta)
        var qty=document.createElement('div')
        qty.className='qty-controls'
        var btnDec=document.createElement('button')
        btnDec.className='qty-btn';btnDec.textContent='-'
        var display=document.createElement('div')
        display.className='qty-display';display.textContent=it.qty?it.qty:1
        var btnInc=document.createElement('button')
        btnInc.className='qty-btn';btnInc.textContent='+'
        qty.appendChild(btnDec);qty.appendChild(display);qty.appendChild(btnInc)
        info.appendChild(qty)
        var actions=document.createElement('div')
        actions.style.display='flex';actions.style.flexDirection='column';actions.style.alignItems='flex-end';actions.style.gap='10px'
        var price=document.createElement('div')
        price.className='item-price';price.style.fontWeight='800';price.style.color='var(--accent)';price.textContent=format(it.price||0)
        var remove=document.createElement('button')
        remove.className='remove-btn';remove.textContent='Remove'
        actions.appendChild(price);actions.appendChild(remove)
        card.appendChild(thumb);card.appendChild(info);card.appendChild(actions)
        grid.appendChild(card)
        var quantity=it.qty?it.qty:1
        subtotal+=((it.price||0)*quantity)
        btnInc.addEventListener('click',function(){
          var list=getCart()
          list[idx].qty=(list[idx].qty?list[idx].qty:1)+1
          saveCart(list);recalcAndRender()
        })
        btnDec.addEventListener('click',function(){
          var list=getCart()
          var q=list[idx].qty?list[idx].qty:1
          if(q>1){list[idx].qty=q-1;saveCart(list)}
          else{list.splice(idx,1);saveCart(list)}
          recalcAndRender()
        })
        remove.addEventListener('click',function(){
          var list=getCart()
          list.splice(idx,1);saveCart(list);recalcAndRender()
        })
      })
      var tax=subtotal*0.08
      var total=subtotal+tax
      subtotalEl.textContent=format(subtotal)
      taxEl.textContent=format(tax)
      totalEl.textContent=format(total)
    }
  
    recalcAndRender()
  
    if(checkoutBtn){
      checkoutBtn.addEventListener('click',function(){
        var items=getCart()
        if(!items.length){return}
        localStorage.removeItem(storageKey)
        recalcAndRender()
        alert('Checkout simulated — cart cleared for demo.')
      })
    }
  })
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
  
    var wishlistKey='gamergg_wishlist_v1'
    function getSaved(){
      try{
        var raw=localStorage.getItem(wishlistKey)
        return raw?JSON.parse(raw):[]
      }catch(e){return[]}
    }
    function saveList(list){
      try{localStorage.setItem(wishlistKey,JSON.stringify(list))}catch(e){}
    }
    var grid=document.getElementById('wishlist-grid')
    var emptyPanel=document.querySelector('.empty-panel')
    var savedSection=document.querySelector('.saved-list')
    function render(){
      var items=getSaved()
      if(!items.length){
        emptyPanel.style.display='flex'
        if(savedSection) savedSection.style.display='none'
        return
      }
      emptyPanel.style.display='none'
      if(savedSection) savedSection.style.display='block'
      grid.innerHTML=''
      items.forEach(function(it,idx){
        var card=document.createElement('div')
        card.className='wish-card'
        var thumb=document.createElement('div')
        thumb.className='wish-thumb'
        var img=document.createElement('img')
        img.src=it.image||'../../homepage/images/TopReleases.png'
        img.alt=it.title||'Saved game'
        thumb.appendChild(img)
        var info=document.createElement('div')
        info.className='wish-info'
        var a=document.createElement('a')
        a.className='wish-title'
        a.href=it.href||'../Catalog/index.html'
        a.textContent=it.title||'Saved game'
        var meta=document.createElement('div')
        meta.className='wish-meta'
        meta.textContent=it.platform?it.platform:''
        info.appendChild(a)
        info.appendChild(meta)
        var actions=document.createElement('div')
        actions.className='wish-actions'
        var remove=document.createElement('button')
        remove.className='remove-btn'
        remove.textContent='Remove'
        remove.addEventListener('click',function(){
          var list=getSaved()
          list.splice(idx,1)
          saveList(list)
          render()
        })
        actions.appendChild(remove)
        card.appendChild(thumb)
        card.appendChild(info)
        card.appendChild(actions)
        grid.appendChild(card)
      })
    }
    render()
  })
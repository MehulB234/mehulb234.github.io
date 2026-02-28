class Song {
    constructor({title,artist,album,year,genre,coverFile,youtubeCode}){
      this.title = title;
      this.artist = artist;
      this.album = album;
      this.year = year;
      this.genre = genre;
      this.coverFile = coverFile;       
      this.youtubeCode = youtubeCode;   
    }
  
    getCard(){
      const card = document.createElement('article');
      card.className = 'song-card';
  
      const top = document.createElement('div');
      top.className = 'card-top';
      const h3 = document.createElement('h3'); h3.textContent = this.title;
      const art = document.createElement('div'); art.className = 'artist';
      art.textContent = `By ${this.artist}`;
      top.appendChild(h3); top.appendChild(art);
  
      const img = document.createElement('img');
      img.className = 'cover';
      img.src = this.coverFile;
      img.alt = this.title + " cover";
  
      card.appendChild(top);
      card.appendChild(img);
  
      card.addEventListener('click', () => openSongModal(this));
      return card;
    }
  }
  
  const songs = [
    new Song({
      title: "Two-Headed Boy",
      artist: "Neutral Milk Hotel",
      album: "Aeroplane Over the Sea",
      year: 1998,
      genre: "Folk Music",
      coverFile: "images/TwoHeadedBoy.jpg",
      youtubeCode: "TudLjZ_4VhU"
    }),
    new Song({
      title: "Jailhouse Rock",
      artist: "Elvis Presley",
      album: "Jailhouse Rock",
      year: 1957,
      genre: "Rock",
      coverFile: "images/JailhouseRock.jpg",
      youtubeCode: "gj0Rz-uP4Mk"
    }),
    new Song({
      title: "So What",
      artist: "Miles Davis",
      album: "So What?",
      year: 1959,
      genre: "Jazz",
      coverFile: "images/SoWhat.jpg",
      youtubeCode: "zqNTltOGh5c"
    }),
    new Song({
      title: "Jolene",
      artist: "Dolly Parton",
      album: "Jolene",
      year: 1973,
      genre: "Country",
      coverFile: "images/Jolene.jpg",
      youtubeCode: "Ixrje2rXLMA"
    })
  ];
  
  const galleryEl = document.getElementById('gallery');
  function renderGallery(){
    galleryEl.innerHTML = '';
    songs.forEach(s => {
      galleryEl.appendChild(s.getCard());
    });
  }
  renderGallery();
  
  const modal = document.getElementById('songModal');
  const videoContainer = document.getElementById('videoContainer');
  const infoTitle = document.getElementById('infoTitle');
  const infoArtist = document.getElementById('infoArtist');
  const infoAlbum = document.getElementById('infoAlbum');
  const infoGenre = document.getElementById('infoGenre');
  const modalClose = document.getElementById('modalClose');
  
  function openSongModal(song){
    videoContainer.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${song.youtubeCode}?rel=0`;
    iframe.title = `${song.title} - YouTube`;
    iframe.setAttribute('frameborder','0');
    iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen','');
    videoContainer.appendChild(iframe);
  
    infoTitle.textContent = song.title;
    infoArtist.textContent = song.artist;
    infoAlbum.textContent = `${song.album}, ${song.year}`;
    infoGenre.textContent = song.genre;
  
    modal.style.display = 'block';
  }
  
  function closeModal(){
    modal.style.display = 'none';
    videoContainer.innerHTML = '';
  }
  
  modalClose.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (ev)=>{
    if(ev.target === modal) closeModal();
  });
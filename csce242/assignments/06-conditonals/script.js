document.addEventListener('DOMContentLoaded', () => {
    const ex1 = document.getElementById('exercise1');
    const ex2 = document.getElementById('exercise2');
    const ex1Link = document.getElementById('exercise1Link');
    const ex2Link = document.getElementById('exercise2Link');
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
  
    const range = document.getElementById('minutesRange');
    const minutesDisplay = document.getElementById('minutesDisplay');
    const sliderMessage = document.getElementById('sliderMessage');
    const countdownMessage = document.getElementById('countdownMessage');
  
    // show or hide exercises
    function showExercise(n){
      ex1.classList.toggle('visible', n === 1);
      ex2.classList.toggle('visible', n === 2);
    }
    showExercise(1);
  
    ex1Link.addEventListener('click', e => { e.preventDefault(); showExercise(1); setActiveLink(1); closeNavIfSmall(); });
    ex2Link.addEventListener('click', e => { e.preventDefault(); showExercise(2); setActiveLink(2); closeNavIfSmall(); updateCountdown(); });
  
    function setActiveLink(n){
      ex1Link.style.color = n === 1 ? 'var(--accent)' : 'var(--muted)';
      ex2Link.style.color = n === 2 ? 'var(--accent)' : 'var(--muted)';
    }
  
    // responsive menu
    function isSmallScreen(){ return window.matchMedia('(max-width:640px)').matches; }
    function closeNavIfSmall(){
      if(isSmallScreen()){
        navList.setAttribute('aria-hidden','true');
        menuToggle.setAttribute('aria-expanded','false');
        const a = menuToggle.querySelector('.arrow'); if(a) a.textContent='▾';
      }
    }
    if(isSmallScreen()) navList.setAttribute('aria-hidden','true');
  
    menuToggle.addEventListener('click', ()=>{
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navList.setAttribute('aria-hidden', String(expanded));
      const a = menuToggle.querySelector('.arrow'); if(a) a.textContent = expanded ? '▾' : '▴';
    });
  
    // Exercise 1
    function sliderMessageFor(mins){
      if(mins > 45) return "Let's have bacon and eggs because you've got time!";
      if(mins > 30) return "Grab a coffee and review some notes!";
      if(mins > 15) return "Let's glance over last class notes.";
      return "Hustle! You're close, don't be late!";
    }
  
    function updateSliderUI(){
      const mins = Number(range.value);
      minutesDisplay.textContent = `${mins} minute${mins === 1 ? '' : 's'}`;
      sliderMessage.textContent = sliderMessageFor(mins);
      const pct = (mins / 60) * 100;
      range.style.background = `linear-gradient(90deg, #3f7170 ${pct}%, #e9e9e9 ${pct}%)`;
    }
    range.addEventListener('input', updateSliderUI);
    updateSliderUI();
  
    // Exercise 2
    function minutesUntilTarget(hour=8, min=30){
      const now = new Date();
      const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, min, 0, 0);
      return Math.round((target - now) / 60000);
    }
  
    function updateCountdown(){
      const mins = minutesUntilTarget(8,30);
  
      // Future ranges
      if(mins > 15){
        countdownMessage.textContent = `You have ${mins} minutes left, more than 15 minutes.`;
        return;
      }
      if(mins > 10){
        countdownMessage.textContent = `You have ${mins} minutes left, between 10 and 15 minutes.`;
        return;
      }
      if(mins > 5){
        countdownMessage.textContent = `You have ${mins} minutes left, between 5 and 10 minutes.`;
        return;
      }
      if(mins >= 0){
        countdownMessage.textContent = `You only have ${mins} minute${mins===1?'':'s'} left, between 0 and 5 minutes.`;
        return;
      }
  
      // Past ranges
      const past = Math.abs(mins);
      if(past <= 5){
        countdownMessage.textContent = `Class started ${past} minute${past===1?'':'s'} ago, up to 5 minutes ago.`;
        return;
      }
      if(past <= 15){
        countdownMessage.textContent = `Class started ${past} minutes ago, up to 15 minutes ago.`;
        return;
      }
      
      countdownMessage.textContent = `Class started ${past} minutes ago, more than 15 minutes ago.`;
    }
  
    updateCountdown();
    setInterval(() => { if(ex2.classList.contains('visible')) updateCountdown(); }, 10000);
  
  });
  
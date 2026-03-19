  const container = document.getElementById('stars'); //  html element catching
  for (let i = 0; i < 55; i++) {  // using a loop for 55 times to simulate stars 
    const p = document.createElement('div'); // dynamic element creation
    p.className = 'star'; // assign the CSS class star  
    const s = Math.random() * 2.5 + 0.5; // randimzing the sizes of stars
    const op = (Math.random() * 0.45 + 0.15).toFixed(2); // randomizing the opacity of the stars
    p.style.cssText = `width:${s}px;height:${s}px;top:${Math.random()*55}%;left:${Math.random()*100}%;--op:${op};--duration:${(Math.random()*4+2).toFixed(1)}s;--delay:-${(Math.random()*6).toFixed(1)}s;`;
    container.appendChild(p); // appending dynamic variable back to the star div
  }

  for (let i = 0; i < 35; i++) { // 35 glowing teal dots on water surface
  const b = document.createElement('div'); // create each bio-dot
  b.className = 'bio-dot'; // assign CSS bio-dot class
  const s = Math.random() * 3 + 1.5; // randomise size 1.5–4.5px
  const op = (Math.random() * 0.55 + 0.15).toFixed(2); // randomise opacity
  const gsize = (s * 2.5).toFixed(1) + 'px'; // glow radius scales with dot size
  // position only in lower 48% of screen (water area)
  b.style.cssText = `width:${s}px;height:${s}px;top:${52 + Math.random()*46}%;left:${Math.random()*100}%;--op:${op};--gsize:${gsize};--duration:${(Math.random()*5+2.5).toFixed(1)}s;--delay:-${(Math.random()*7).toFixed(1)}s;`;
  container.appendChild(b); // add bio-dot to same container
}

/* ── Ripple rings (water surface) ── */
const ripplesContainer = document.getElementById('ripples'); // catch ripples div

for (let i = 0; i < 6; i++) { // 6 expanding ripple rings
  const r = document.createElement('div'); // create each ripple
  r.className = 'ripple'; // assign CSS ripple class
  const w = Math.random() * 40 + 20; // ring start size 20–60px
  const top = 52 + Math.random() * 30; // position on water (52–82%)
  const left = 10 + Math.random() * 80; // spread across width (10–90%)
  const dur = (Math.random() * 4 + 4).toFixed(1) + 's'; // duration 4–8s
  const delay = '-' + (Math.random() * 6).toFixed(1) + 's'; // stagger start times
  r.style.cssText = `width:${w}px;height:${w * 0.45}px;top:${top}%;left:${left}%;--rdur:${dur};--rdelay:${delay};`;
  ripplesContainer.appendChild(r); // add ripple to container
}

  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('moon').classList.add('loaded');
      document.getElementById('moonHalo').classList.add('loaded');
      document.getElementById('moonReflection').classList.add('loaded');
      document.getElementById('heroContent').classList.add('loaded');
      document.getElementById('loaderWrap').classList.add('loaded');
      document.getElementById('skipBtn').classList.add('loaded');
      document.getElementById('infoPanel').classList.add('loaded');
      setTimeout(startCountdown,1900);
    }, 300);
  });
  // letting the elemets to load or 0.3 sec and then adding the "loaded" class to them (styling)

  let count = 4;
  let redirectTimer;
  let countdownStarted = false;

  function startCountdown() { // autoredirect after 4 second function
    if (countdownStarted) return;
    countdownStarted = true;
    const numEl = document.getElementById('countNum'); 
    numEl.textContent = count;
    redirectTimer = setInterval(() => { //creating a timer that runs every second 
      count--; //reducing the count by a second 
      if (count >= 1) {
        numEl.textContent = count; //updating the no on the screen
      } else {
        clearInterval(redirectTimer); // stopping the count down when its done
        numEl.textContent = '…'; // updating the screen 
        window.location.href = 'home.html'; //  redirection to the home page 
      }
    }, 1000); // 1 sec interval
  }
  // window.addEventListener('load', () => {
  // setTimeout(startCountdown, 300);
  // }); // after the page is fully loaded running the startcountdown function
  function skipIntro() { // function when the user clicks on the skipp button 
    if (redirectTimer) clearInterval(redirectTimer); // if pressed stopping the countdown 
    window.location.href = 'home.html'; // redirect instatntly to the home page 
  }
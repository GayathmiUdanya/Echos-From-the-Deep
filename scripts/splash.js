  const container = document.getElementById('stars'); //  html element catching
  for (let i = 0; i < 55; i++) {  // using a loop for 55 times to simulate stars 
    const p = document.createElement('div'); // dynamic element creation
    p.className = 'star'; // assign the CSS class star  
    const s = Math.random() * 2.5 + 0.5; // randimzing the sizes of stars
    const op = (Math.random() * 0.45 + 0.15).toFixed(2); // randomizing the opacity of the stars
    p.style.cssText = `width:${s}px;height:${s}px;top:${Math.random()*55}%;left:${Math.random()*100}%;--op:${op};--duration:${(Math.random()*4+2).toFixed(1)}s;--delay:-${(Math.random()*6).toFixed(1)}s;`;
    container.appendChild(p); // appending dynamic variable back to the star div
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
    }, 300);
  });
  // letting the elemets to load or 0.3 sec and then adding the "loaded" class to them (styling)

  let count = 4;
  let redirectTimer;

  function startCountdown() { // autoredirect after 4 second function
    const numEl = document.getElementById('countNum'); 
    redirectTimer = setInterval(() => { //creating a timer that runs every second 
      count--; //reducing the count by a second 
      if (count > 0) {
        numEl.textContent = count; //updating the no on the screen
      } else {
        clearInterval(redirectTimer); // stopping the count down when its done
        numEl.textContent = '…'; // updating the screen 
        window.location.href = 'home.html'; //  redirection to the home page 
      }
    }, 1000); // 1 sec interval
  }
  window.addEventListener('load', startCountdown); // after the page is fully loaded running the startcountdown function
  function skipIntro() { // function when the user clicks on the skipp button 
    if (redirectTimer) clearInterval(redirectTimer); // if pressed stopping the countdown 
    window.location.href = 'home.html'; // redirect instatntly to the home page 
  }
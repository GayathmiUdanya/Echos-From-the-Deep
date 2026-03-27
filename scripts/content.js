var scrollBar = document.getElementById('scroller');
var sections  = Array.from(document.querySelectorAll('[data-bg]'));
var bgs = ['bg1','bg2','bg3','bg4','bg5','bg6'].reduce(function(o,k) {
  o[k] = document.getElementById(k); return o;
}, {});
var activeBg = 'bg1', bgLocked = false;

function switchBg(key) {
  if (key === activeBg || !bgs[key] || bgLocked) return;
  bgLocked = true;
  bgs[key].classList.add('active');
  bgs[key].style.zIndex = '2';
  bgs[activeBg].classList.remove('active');
  bgs[activeBg].style.zIndex = '0';
  activeBg = key;
  setTimeout(function() { bgs[key].style.zIndex = '1'; bgLocked = false; }, 1450);
}

function onScroll() {
  var st   = window.pageYOffset;
  var docH = document.documentElement.scrollHeight - window.innerHeight;
  var prog = docH > 0 ? Math.min(1, st / docH) : 0;
  var mid  = window.innerHeight * 0.5;

  if (scrollBar) scrollBar.style.width = (prog * 100) + '%';

  var best = sections.reduce(function(b, sec) {
    var d = Math.abs(mid - (sec.getBoundingClientRect().top + sec.offsetHeight * 0.5));
    return d < b.dist ? { el: sec, dist: d } : b;
  }, { el: null, dist: Infinity });
  if (best.el) switchBg(best.el.dataset.bg);
}

var sonarRings = [document.getElementById('s1'), document.getElementById('s2'), document.getElementById('s3')];
var sonarCooldown = false;

function triggerSonarPing() {
  if (sonarCooldown || !sonarRings[0]) return;
  sonarCooldown = true;
  sonarRings.forEach(function(el) { el.className = 'sonar'; });
  void sonarRings[0].offsetWidth;
  sonarRings[0].classList.add('fire');
  sonarRings[1].classList.add('fire2');
  sonarRings[2].classList.add('fire3');
  setTimeout(function() { sonarCooldown = false; }, 2200);
}

new IntersectionObserver(function(entries) {
  entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 }).observe
&& document.querySelectorAll('.contentcon').forEach(function(c) {
new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 }).observe(c);
});

window.addEventListener('load', function() { onScroll(); setTimeout(triggerSonarPing, 800); });
var sonarScrollTimer = null;
window.addEventListener('scroll', function() {
  onScroll();
  clearTimeout(sonarScrollTimer);
  sonarScrollTimer = setTimeout(triggerSonarPing, 1200);
}, { passive: true });
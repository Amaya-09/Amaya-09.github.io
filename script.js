/* =========================================================
   PUERTA DE PREGUNTAS — se debe pasar antes de ver el corazón.
   EDITA este arreglo con las preguntas y respuestas reales de
   ustedes. Cada pregunta puede tener varias respuestas válidas
   (por si la escribe distinto). No distingue mayúsculas ni tildes.
   ========================================================= */
const GATE_QUESTIONS = [
  { q: '¿Qué día empezamos a salir?', answers: ['4 de marzo', '4 marzo', '04/03', '4/3', 'marzo 4'] },
  { q: '¿Cómo te digo de cariño?', answers: ['Amor', 'Mi bb','Mi reina','Mi chocolatico','Mi chikibaby','Mi princesa','Mi vida',] },
  { q: '¿A donde fue nuestra primer salida juntoso? ', answers: ['Al cine', 'A ver Minecraft', 'Al Centro Comercial Aventura', 'Al cine a ver Minecraft', 'Al cine del Centro Comercial Aventura', 'A ver la película de Minecraft', 'A ver Minecraft al Centro Comercial Aventura', 'Al cine de Aventura', 'A ver Minecraft al cine', 'Al Centro Comercial Aventura a ver una película', 'A ver la película de Minecraft en Aventura', 'Al cine de Aventura a ver la película de Minecraft', 'Cine', 'Minecraft', 'Aventura', 'Al cine de aventura', 'A ver minecraft en el cine', 'Al cc aventura', 'A ver la peli de minecraft', 'Ver minecraft', 'A la peli de minecraft', 'Cine aventura', 'A ver la peli de minecraft al cine', 'Al cine a ver la peli', 'En el cine de aventura', 'A ver minecraft al cc aventura', 'A la pelicula de minecraft', 'Ir al cine', 'Ir a ver minecraft', 'A ver la peli', 'Al cine del cc aventura', 'Ver la peli de minecraft', 'En aventura', 'Al cine con minecraft', 'A la peli de minecraft en aventura', 'Ver minecraft en el cine', 'Al cc aventura a ver minecraft', 'A ver la peli en aventura', 'Cine a ver minecraft', 'A ver la peli al cine de aventura', 'Al cine a ver la peli de minecraft', 'En el centro comercial aventura', 'A ver la peli de minecraft al cc aventura', 'A ver minecraft al cine de aventura', 'Al cine en aventura', 'A ver la peli de minecraft en el cine', 'Ir al cine de aventura', 'Ir a ver la peli de minecraft', 'A ver la pelicula', 'Al centro comercial aventura a ver minecraft', 'Cine de aventura', 'Peli de minecraft', 'Pelicula de minecraft', 'A ver la pelicula al cine', 'Al cine a ver la pelicula', 'A ver minecraft en aventura', 'En el cine de centro comercial aventura', 'A ver la peli de minecraft en el centro comercial aventura', 'Cine en aventura', 'A ver la pelicula de minecraft al cine'] },
];

/* =========================================================
   ACCESO DE ADMINISTRADOR — edita el usuario y la contraseña.
   Con esto se puede entrar sin responder las preguntas y usar
   los accesos rápidos del panel de admin (ver más abajo).
   OJO: esto es solo una traba simple en el navegador, cualquiera
   que abra el archivo script.js puede llegar a verla — no la uses
   para nada que necesite seguridad real, es solo para vos.
   ========================================================= */
const ADMIN_USER = 'Amaya';
const ADMIN_PASS = 'samuel_1050';

function normalize(str){
  return str.toString().trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

let gateIndex = 0;
const gateEl = document.getElementById('gate');
const gateWelcomeEl = document.getElementById('gateWelcome');
const gateQuizEl = document.getElementById('gateQuiz');
const gateQEl = document.getElementById('gateQ');
const gateInput = document.getElementById('gateInput');
const gateMsg = document.getElementById('gateMsg');
const gateProgress = document.getElementById('gateProgress');

function startGateQuiz(){
  gateWelcomeEl.style.display = 'none';
  gateQuizEl.style.display = 'flex';
  gateQuizEl.style.flexDirection = 'column';
  gateIndex = 0;
  showGateQuestion();
}
document.getElementById('gateWelcomeBtn').addEventListener('click', startGateQuiz);

function showGateQuestion(){
  gateQEl.textContent = GATE_QUESTIONS[gateIndex].q;
  gateProgress.textContent = `Pregunta ${gateIndex + 1} de ${GATE_QUESTIONS.length}`;
  gateInput.value = '';
  gateMsg.textContent = '';
  gateInput.focus();
}

function checkGate(){
  const val = normalize(gateInput.value);
  const ok = GATE_QUESTIONS[gateIndex].answers.some(a => normalize(a) === val);
  if(ok){
    gateIndex++;
    if(gateIndex >= GATE_QUESTIONS.length){
      passGate();
    }else{
      showGateQuestion();
    }
  }else{
    gateInput.classList.add('shake');
    gateMsg.textContent = 'No es correcto... volvamos a empezar.';
    setTimeout(()=>{
      gateInput.classList.remove('shake');
      gateIndex = 0;
      showGateQuestion();
    }, 900);
  }
}

function passGate(){
  document.body.style.overflow = '';
  gateEl.classList.add('gate-hidden');
  setTimeout(()=>{ gateEl.style.display = 'none'; }, 700);
}

document.getElementById('gateBtn').addEventListener('click', checkGate);
gateInput.addEventListener('keydown', e => { if(e.key === 'Enter') checkGate(); });

/* La página siempre arranca desde cero: ya no se recuerda si la puerta
   fue superada antes, así que cada vez que se entra, se recarga, o se
   sale y se vuelve a entrar, aparece la pantalla de bienvenida de nuevo. */
document.body.style.overflow = 'hidden';
gateEl.style.display = 'flex';
gateEl.classList.remove('gate-hidden');
gateIndex = 0;
gateWelcomeEl.style.display = 'flex';
gateQuizEl.style.display = 'none';

/* ---------- Estrellas de fondo ---------- */
const starsContainer = document.getElementById('stars');
const STAR_COUNT = 140;
for(let i=0;i<STAR_COUNT;i++){
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random()*100+'%';
  s.style.top = Math.random()*100+'%';
  s.style.animationDelay = (Math.random()*4)+'s';
  s.style.animationDuration = (3+Math.random()*3)+'s';
  starsContainer.appendChild(s);
}
for(let i=0;i<4;i++){
  const sh = document.createElement('div');
  sh.className = 'shoot';
  sh.style.left = (20+Math.random()*60)+'%';
  sh.style.top = (5+Math.random()*30)+'%';
  sh.style.animationDelay = (i*4.5)+'s';
  starsContainer.appendChild(sh);
}

/* =========================================================
   CORAZÓN DE PUNTOS — versión ligera.
   En vez de mover atributos SVG (costoso), cada punto es un
   div posicionado con transform, que el navegador puede animar
   usando la GPU sin recalcular el layout en cada cuadro.
   ========================================================= */
const dotGroup = document.getElementById('dotGroup');
const heartWrap = document.querySelector('.heart-wrap');
const N_DOTS = 90;
const dots = [];

function heartPoint(t){
  const x = 16*Math.pow(Math.sin(t),3);
  const y = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));
  return {x,y};
}
let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
for(let i=0;i<360;i++){
  const p = heartPoint(i/360*Math.PI*2);
  minX=Math.min(minX,p.x); maxX=Math.max(maxX,p.x);
  minY=Math.min(minY,p.y); maxY=Math.max(maxY,p.y);
}
const boxW = maxX-minX, boxH = maxY-minY;

let scaleH = 1;
function computeScale(){
  const size = heartWrap.clientWidth || 300;
  const targetPx = size*0.8;
  scaleH = targetPx / Math.max(boxW,boxH);
}
computeScale();
window.addEventListener('resize', computeScale);

for(let i=0;i<N_DOTS;i++){
  const el = document.createElement('div');
  el.className = 'heart-dot';
  const size = (3.2+Math.random()*2.6);
  el.style.width = size+'px';
  el.style.height = size+'px';
  el.style.marginLeft = (-size/2)+'px';
  el.style.marginTop = (-size/2)+'px';
  el.style.animationDelay = (i*0.012)+'s';
  dotGroup.appendChild(el);
  dots.push({ el, t0:(i/N_DOTS)*Math.PI*2 });
}

let heartStartTime = null;
const HEART_SPEED = 0.35; // radianes por segundo
function animateHeart(ts){
  if(!heartStartTime) heartStartTime = ts;
  const elapsed = (ts-heartStartTime)/1000;
  for(let i=0;i<dots.length;i++){
    const d = dots[i];
    const t = d.t0 + elapsed*HEART_SPEED;
    const p = heartPoint(t);
    d.el.style.transform = `translate3d(${(p.x*scaleH).toFixed(2)}px, ${(p.y*scaleH).toFixed(2)}px, 0)`;
  }
  requestAnimationFrame(animateHeart);
}
requestAnimationFrame(animateHeart);

/* ---------- Contador en vivo ---------- */
const START = new Date(2026,2,4,21,0,0); // 4 marzo 2026, 9:00pm (mes 2 = marzo, indexado en 0)
function pad(n){ return String(n).padStart(2,'0'); }

/* Calcula meses de CALENDARIO reales (no un promedio de días), para que
   el día del "cumplemes" siempre marque 0 días, no 1 de más. */
function calendarBreakdown(start, now){
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  let anchor = new Date(start);
  anchor.setMonth(anchor.getMonth() + months);
  if(anchor > now){
    months--;
    anchor = new Date(start);
    anchor.setMonth(anchor.getMonth() + months);
  }
  if(months < 0) months = 0;
  const remainingMs = Math.max(0, now - anchor);
  const remDays = Math.floor(remainingMs / 86400000);
  const hours = Math.floor((remainingMs % 86400000) / 3600000);
  const mins = Math.floor((remainingMs % 3600000) / 60000);
  const secs = Math.floor((remainingMs % 60000) / 1000);
  return { months, remDays, hours, mins, secs };
}

function tick(){
  const now = new Date();
  const { months, remDays, hours, mins, secs } = calendarBreakdown(START, now);
  document.getElementById('c-months').textContent = pad(months);
  document.getElementById('c-days').textContent = pad(remDays);
  document.getElementById('c-hours').textContent = pad(hours);
  document.getElementById('c-mins').textContent = pad(mins);
  document.getElementById('c-secs').textContent = pad(secs);
  checkSixMonths(now);
}

/* =========================================================
   ANIMACION "FELICES 6 MESES" — se dispara automáticamente
   apenas se cumplan 6 meses calendario exactos desde START.
   Solo se muestra una vez por navegador (usa localStorage).
   ========================================================= */
const SIX_MONTHS_DATE = new Date(START);
SIX_MONTHS_DATE.setMonth(SIX_MONTHS_DATE.getMonth() + 6);

const sixMonthsEl = document.getElementById('sixMonths');
let sixMonthsShown = false;
try{ sixMonthsShown = localStorage.getItem('seis-meses-mostrado') === '1'; }catch(e){}

/* ---------- Fuegos artificiales (canvas) ---------- */
const fwCanvas = document.getElementById('fireworksCanvas');
const fwCtx = fwCanvas.getContext('2d');
const FW_COLORS = ['#ff4d73','#ff8aa3','#f4c9a0','#fff2f4','#c9a8ff'];
let fwParticles = [];
let fwSpawnTimer = null;
let fwRafId = null;

function fwResize(){
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
}
window.addEventListener('resize', fwResize);

function fwLaunchBurst(){
  const x = fwCanvas.width * (0.18 + Math.random()*0.64);
  const y = fwCanvas.height * (0.16 + Math.random()*0.4);
  const color = FW_COLORS[Math.floor(Math.random()*FW_COLORS.length)];
  const count = 34 + Math.floor(Math.random()*14);
  for(let i=0;i<count;i++){
    const angle = (Math.PI*2) * (i/count) + Math.random()*0.3;
    const speed = 1.6 + Math.random()*2.6;
    fwParticles.push({
      x, y,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed,
      alpha: 1,
      color,
      size: 1.6 + Math.random()*1.6
    });
  }
}

function fwLoop(){
  fwCtx.clearRect(0,0,fwCanvas.width,fwCanvas.height);
  for(let i=fwParticles.length-1;i>=0;i--){
    const p = fwParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.045; // gravedad suave
    p.vx *= 0.985;
    p.alpha -= 0.014;
    if(p.alpha <= 0){ fwParticles.splice(i,1); continue; }
    fwCtx.globalAlpha = Math.max(p.alpha,0);
    fwCtx.fillStyle = p.color;
    fwCtx.shadowColor = p.color;
    fwCtx.shadowBlur = 8;
    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, p.size, 0, Math.PI*2);
    fwCtx.fill();
  }
  fwCtx.globalAlpha = 1;
  fwCtx.shadowBlur = 0;
  fwRafId = requestAnimationFrame(fwLoop);
}

function startFireworks(){
  fwResize();
  fwParticles = [];
  fwLaunchBurst();
  fwSpawnTimer = setInterval(fwLaunchBurst, 550);
  if(!fwRafId) fwLoop();
}
function stopFireworks(){
  clearInterval(fwSpawnTimer);
  fwSpawnTimer = null;
  cancelAnimationFrame(fwRafId);
  fwRafId = null;
  fwParticles = [];
  fwCtx.clearRect(0,0,fwCanvas.width,fwCanvas.height);
}

/* ---------- Corazoncitos que salen cuando la parejita se encuentra ---------- */
const coupleHeartsEl = document.getElementById('coupleHearts');
let coupleHeartsTimer = null;
function spawnCoupleHearts(){
  if(!coupleHeartsEl) return;
  coupleHeartsEl.innerHTML = '';
  coupleHeartsTimer = setTimeout(()=>{
    for(let i=0;i<10;i++){
      const h = document.createElement('span');
      h.className = 'mini-heart';
      h.textContent = '♥';
      h.style.setProperty('--dx', (Math.random()*70-35).toFixed(0)+'px');
      h.style.animationDelay = (Math.random()*0.5)+'s';
      h.style.fontSize = (0.75+Math.random()*0.8)+'rem';
      coupleHeartsEl.appendChild(h);
    }
  }, 2650); // justo despues del besito
}

const SIX_ANIMATION_DURATION = 7600; // ms que dura toda la secuencia en pantalla
let sixHideTimer = null;

function playSixMonthsAnimation(){
  clearTimeout(sixHideTimer);
  clearTimeout(coupleHeartsTimer);
  // "reflow" para que las animaciones CSS (caminata, texto) se reinicien
  // desde cero cada vez que se llama esta función, no solo la primera vez
  sixMonthsEl.classList.remove('show');
  void sixMonthsEl.offsetWidth;
  sixMonthsEl.classList.add('show');

  startFireworks();
  spawnCoupleHearts();

  sixHideTimer = setTimeout(()=>{
    sixMonthsEl.classList.remove('show');
    stopFireworks();
  }, SIX_ANIMATION_DURATION);
}

function checkSixMonths(now){
  if(sixMonthsShown) return;
  if(now >= SIX_MONTHS_DATE){
    sixMonthsShown = true;
    try{ localStorage.setItem('seis-meses-mostrado', '1'); }catch(e){}
    playSixMonthsAnimation();
  }
}
sixMonthsEl.addEventListener('click', ()=> sixMonthsEl.classList.remove('show'));

/* Botón discreto para previsualizar la animación cuando quieras, sin que
   afecte el disparo automático del día real (no toca localStorage). */
const previewBtn = document.getElementById('previewSixBtn');
if(previewBtn){
  previewBtn.addEventListener('click', playSixMonthsAnimation);
}

tick();
setInterval(tick,1000);

/* =========================================================
   GALERIA — una tarjeta por mes, con descripción y fecha.
   EDITA el arreglo PHOTOS: cambia "caption" por el recuerdo real
   de cada mes. El archivo de imagen se busca en la carpeta /fotos
   con el nombre indicado en "file".
   ========================================================= */
const PHOTOS = [
  { file:'foto1.jpeg', month:'Marzo 2026',    caption:'El día que todo comenzó.',
    note:'Todavía me acuerdo de los nervios de los primeros días y de esa sensación inolvidable de que algo muy especial estaba empezando. Gracias por abrirle la puerta a esta historia y por hacer que desde el primer momento todo se sintiera tan hermoso y bonito.' },
  { file:'foto2.jpeg', month:'Abril 2026',    caption:'La primera vez que dormiste en mí',
    note:'Abril nos regaló algo que no se olvida: la primera vez que te quedaste dormida entre mis brazos. Sentir tu respiración tranquila mientras te abrazaba me hizo entender que tu paz también es la mía. Ese mes aprendí lo que se siente ser tu lugar seguro.' },
  { file:'foto3.jpeg', month:'Mayo 2026',     caption:'Nuestra salida a comer',
    note:'A los tres meses ya no hacían falta muchas palabras para entendernos. Un abrazo tuyo se convirtió en mi refugio perfecto y una mirada bastaba para saber lo que el otro pensaba. Gracias por ser esa tranquilidad y alegría que llena mis días.' },
  { file:'foto4.jpeg', month:'Junio 2026',    caption:'El día que fuimos al cine ese mes',
    note:'Llegar al cuarto mes me demostró que somos un gran equipo. Entre la rutina, los días ocupados y las pequeñas cosas del día a día, entender que nos apoyamos mutuamente hizo que lo nuestro se volviera aún más fuerte.' },
  { file:'foto5.jpeg', month:'Julio 2026',    caption:'En el tesoro',
    note:'Llegar a este quinto mes me ha demostrado que lo bonito de nuestra relación no solo se da por suerte, sino por el esfuerzo y las ganas que ambos le ponemos día a día. Gracias por cuidar lo nuestro, por estar presente y por demostrarme que con ganas y trabajo en equipo podemos lograrlo todo.' },
  { file:'foto6.jpeg', month:'Agosto 2026',   caption:'Seis meses, un solo corazón.',
    note:'Y llegamos a agosto: seis meses de nosotros. Seis meses de aprender a querernos mejor cada día, de reír, de crecer juntos y de construir algo que se siente cada vez más de los dos. Feliz seis meses, mi amor — esto apenas empieza.' },
];

const galleryGrid = document.getElementById('gallery-grid');
const heartIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7.5-4.9-10-9.3C.4 8.4 2 4.5 6 4.5c2.2 0 3.7 1.3 6 4 2.3-2.7 3.8-4 6-4 4 0 5.6 3.9 4 7.2C19.5 16.1 12 21 12 21z"/></svg>';

/* ---------- LIGHTBOX: recuadro con la foto completa ---------- */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbMonth = document.getElementById('lbMonth');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');
const lbNoteBtn = document.getElementById('lbNoteBtn');
const lbNote = document.getElementById('lbNote');

function openLightbox(item){
  lbImg.src = `fotos/${item.file}`;
  lbImg.alt = 'Samuel y Hannah — ' + item.month;
  lbMonth.textContent = item.month;
  lbCaption.textContent = item.caption;
  lbNote.textContent = item.note || '';
  lbNote.classList.remove('open');
  lbNoteBtn.textContent = '💌 Una cartica';
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}
lbNoteBtn.addEventListener('click', ()=>{
  const open = lbNote.classList.toggle('open');
  lbNoteBtn.textContent = open ? 'Cerrar cartica' : '💌 Una cartica';
});
function closeLightbox(){
  lightbox.classList.remove('show');
  document.body.style.overflow = '';
}
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox) closeLightbox(); // click fuera del recuadro también cierra
});
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeLightbox();
});

PHOTOS.forEach(item=>{
  const card = document.createElement('div');
  card.className = 'frame';

  const photoBox = document.createElement('div');
  photoBox.className = 'photo';
  photoBox.innerHTML = `<div class="ph">${heartIcon}<span>Sube tu foto</span></div>`;

  const img = new Image();
  img.alt = 'Samuel y Hannah — ' + item.month;
  img.onload = () => { photoBox.innerHTML = ''; photoBox.appendChild(img); };
  img.onerror = () => {}; // se queda el placeholder si la foto aún no existe
  img.src = `fotos/${item.file}`;

  const month = document.createElement('div');
  month.className = 'month';
  month.textContent = item.month;

  const caption = document.createElement('div');
  caption.className = 'caption';
  caption.textContent = item.caption;

  card.appendChild(photoBox);
  card.appendChild(month);
  card.appendChild(caption);
  card.addEventListener('click', ()=> openLightbox(item));
  galleryGrid.appendChild(card);
});


/* =========================================================
   GUARDAR RESPUESTAS — usa localStorage del navegador, así que
   queda guardado en este dispositivo/navegador para la próxima
   vez que se abra la página.
   ========================================================= */
const ids = ['q1','q2','q3','q4'];

function loadAnswers(){
  try{
    const raw = localStorage.getItem('hannah-respuestas');
    if(raw){
      const data = JSON.parse(raw);
      ids.forEach(id=>{ if(data[id]) document.getElementById(id).value = data[id]; });
      if(data.q1 || data.q2 || data.q3 || data.q4) renderStory(data);
    }
  }catch(e){ /* no hay respuestas guardadas todavía */ }
}
function renderStory(data){
  const box = document.getElementById('storyBox');
  box.innerHTML =
    'Hannah recuerda que <b>' + escapeHtml(data.q1 || '—') + '</b> es su momento favorito hasta ahora. ' +
    'Dice que lo que más ama de estar con Samuel es <b>' + escapeHtml(data.q2 || '—') + '</b>. ' +
    'Si tuviera que resumir estos 6 meses en una sola palabra, sería <b>“' + escapeHtml(data.q3 || '—') + '”</b>. ' +
    'Y de lo que viene, espera <b>' + escapeHtml(data.q4 || '—') + '</b>.';
  document.getElementById('historia').classList.add('show');
}
function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
/* ---------- VOLVER A INICIO (solo reabre la puerta) ---------- */
document.getElementById('restartGateBtn').addEventListener('click', ()=>{
  try{ localStorage.removeItem('puerta-superada'); }catch(e){}
  gateEl.style.display = 'flex';
  gateEl.classList.remove('gate-hidden');
  document.body.style.overflow = 'hidden';
  gateIndex = 0;
  gateWelcomeEl.style.display = 'flex';
  gateQuizEl.style.display = 'none';
  window.scrollTo({top:0, behavior:'auto'});
});

/* ---------- REINICIAR TODO ---------- */
document.getElementById('resetBtn').addEventListener('click', ()=>{
  const seguro = confirm('¿Reiniciar todo? Esto borrará la puerta superada, las respuestas guardadas y la animación de 6 meses en este navegador.');
  if(!seguro) return;
  try{
    localStorage.removeItem('puerta-superada');
    localStorage.removeItem('hannah-respuestas');
    localStorage.removeItem('seis-meses-mostrado');
  }catch(e){}
  location.reload();
});

document.getElementById ('saveBtn').addEventListener('click', ()=>{
  const data = {};
  ids.forEach(id=>{ data[id] = document.getElementById(id).value.trim(); });
  try{
    localStorage.setItem('hannah-respuestas', JSON.stringify(data));
    const note = document.getElementById('savedNote');
    note.classList.add('show');
    setTimeout(()=>note.classList.remove('show'), 2200);
    renderStory(data);
    document.getElementById('historia').scrollIntoView({behavior:'smooth'});
  }catch(e){
    alert('No se pudo guardar en este navegador. Prueba abriendo el archivo directamente en Chrome o Safari en vez de dentro de otra app.');
  }
});
loadAnswers();

/* =========================================================
   PANEL DE ADMINISTRADOR
   - Botón escondido (arriba a la izquierda, casi invisible).
   - Al hacer click pide usuario/contraseña (ver ADMIN_USER y
     ADMIN_PASS arriba del todo del archivo).
   - Si entra bien: salta la puerta de preguntas (sin marcarla
     como "superada" para siempre — es solo para esta sesión,
     así que a Hannah le sigue apareciendo la puerta normal) y
     abre un panelcito con accesos rápidos.
   ========================================================= */
const adminTrigger  = document.getElementById('adminTrigger');
const adminLoginEl  = document.getElementById('adminLogin');
const adminUserIn   = document.getElementById('adminUser');
const adminPassIn   = document.getElementById('adminPass');
const adminMsg      = document.getElementById('adminMsg');
const adminPanel    = document.getElementById('adminPanel');

function openAdminLogin(){
  adminLoginEl.classList.add('show');
  adminUserIn.value = '';
  adminPassIn.value = '';
  adminMsg.textContent = '';
  adminUserIn.focus();
}
function closeAdminLogin(){ adminLoginEl.classList.remove('show'); }

function tryAdminLogin(){
  if(adminUserIn.value === ADMIN_USER && adminPassIn.value === ADMIN_PASS){
    closeAdminLogin();
    adminPanel.classList.add('show');
    if(previewBtn) previewBtn.style.display = 'inline-block'; // solo visible en modo admin
    // Salta la puerta visualmente nada más (solo para esta sesión de admin);
    // al recargar o cerrar sesión de admin, todo vuelve a empezar desde cero.
    document.body.style.overflow = '';
    gateEl.classList.add('gate-hidden');
    setTimeout(()=>{ gateEl.style.display = 'none'; }, 700);
  }else{
    adminMsg.textContent = 'Usuario o contraseña incorrectos.';
    adminPassIn.value = '';
  }
}

adminTrigger.addEventListener('click', openAdminLogin);
document.getElementById('adminCancelBtn').addEventListener('click', closeAdminLogin);
document.getElementById('adminLoginBtn').addEventListener('click', tryAdminLogin);
adminPassIn.addEventListener('keydown', e=>{ if(e.key === 'Enter') tryAdminLogin(); });
adminUserIn.addEventListener('keydown', e=>{ if(e.key === 'Enter') adminPassIn.focus(); });

/* Accesos rápidos del panel — reutilizan las mismas funciones/botones
   que ya existen en la página, para no duplicar lógica. */
document.getElementById('adminSkipGate').addEventListener('click', ()=>{
  document.body.style.overflow = '';
  gateEl.classList.add('gate-hidden');
  setTimeout(()=>{ gateEl.style.display = 'none'; }, 700);
});
document.getElementById('adminPreviewSix').addEventListener('click', playSixMonthsAnimation);
document.getElementById('adminRestartGate').addEventListener('click', ()=>{
  document.getElementById('restartGateBtn').click();
});
document.getElementById('adminResetAll').addEventListener('click', ()=>{
  document.getElementById('resetBtn').click();
});
document.getElementById('adminLogout').addEventListener('click', ()=>{
  adminPanel.classList.remove('show');
  if(previewBtn) previewBtn.style.display = 'none'; // se esconde de nuevo al cerrar sesión
  document.getElementById('restartGateBtn').click(); // al dejar de ser admin, vuelve todo al inicio
});
/* ============================================================
   CONFIGURAÇÃO — Altere aqui a data de início do namoro
   ============================================================ */
const DATA_INICIO = new Date('2024-10-29T00:00:00');

/* ============================================================
   PARTÍCULAS DE CORAÇÕES (Canvas)
   ============================================================ */
class HeartParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    const c = this.canvas;
    this.x     = Math.random() * c.width;
    this.y     = c.height + 20;
    this.size  = Math.random() * 14 + 6;
    this.speed = Math.random() * 0.6 + 0.3;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.drift = (Math.random() - 0.5) * 0.4;
    this.wobble      = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.03 + 0.01;
  }

  update() {
    this.y      -= this.speed;
    this.x      += this.drift + Math.sin(this.wobble) * 0.4;
    this.wobble += this.wobbleSpeed;
    this.alpha  -= 0.0006;
    if (this.y < -20 || this.alpha <= 0) this.reset();
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle   = '#e8857a';
    ctx.font        = `${this.size}px serif`;
    ctx.fillText('♥', this.x, this.y);
    ctx.restore();
  }
}

/* Inicializa um canvas de partículas */
function initParticleCanvas(canvas, count = 28) {
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth  || window.innerWidth;
    canvas.height = canvas.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: count }, () => {
    const p = new HeartParticle(canvas);
    p.y = Math.random() * canvas.height; // distribui pelo canvas ao iniciar
    return p;
  });

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(ctx); });
    requestAnimationFrame(loop);
  }
  loop();
}

/* Inicia o canvas da splash screen */
initParticleCanvas(document.getElementById('splash-canvas'), 40);

/* Inicia cada canvas nas seções */
document.querySelectorAll('.section-canvas[data-hearts]').forEach(c => {
  initParticleCanvas(c, 20);
});

/* ============================================================
   SPLASH → CONTEÚDO PRINCIPAL
   ============================================================ */
document.getElementById('btn-ver').addEventListener('click', () => {
  const splash  = document.getElementById('splash');
  const main    = document.getElementById('main-content');

  splash.classList.add('fade-out');

  setTimeout(() => {
    splash.style.display = 'none';
    main.classList.remove('hidden');
    main.removeAttribute('aria-hidden');
    // Força o IntersectionObserver a checar os elementos já visíveis
    revealObserver.takeRecords();
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    window.scrollTo({ top: 0 });
  }, 820);
});

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

/* ============================================================
   CONTADOR DE TEMPO
   ============================================================ */
function calcularTempo(inicio) {
  const agora   = new Date();
  let anos   = agora.getFullYear()  - inicio.getFullYear();
  let meses  = agora.getMonth()     - inicio.getMonth();
  let dias   = agora.getDate()      - inicio.getDate();
  let horas  = agora.getHours()     - inicio.getHours();
  let mins   = agora.getMinutes()   - inicio.getMinutes();
  let segs   = agora.getSeconds()   - inicio.getSeconds();

  // Ajustes de "carry"
  if (segs < 0)  { segs  += 60; mins  -= 1; }
  if (mins < 0)  { mins  += 60; horas -= 1; }
  if (horas < 0) { horas += 24; dias  -= 1; }

  if (dias < 0) {
    const mesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0);
    dias  += mesAnterior.getDate();
    meses -= 1;
  }

  if (meses < 0) { meses += 12; anos -= 1; }

  return { anos, meses, dias, horas, mins, segs };
}

function pad(n) { return String(n).padStart(2, '0'); }

function atualizarContador() {
  const t = calcularTempo(DATA_INICIO);
  document.getElementById('c-anos').textContent    = t.anos;
  document.getElementById('c-meses').textContent   = t.meses;
  document.getElementById('c-dias').textContent    = t.dias;
  document.getElementById('c-horas').textContent   = pad(t.horas);
  document.getElementById('c-minutos').textContent = pad(t.mins);
  document.getElementById('c-segundos').textContent = pad(t.segs);
}

atualizarContador();
setInterval(atualizarContador, 1000);

/* ============================================================
   PLAYER SIMULADO
   ============================================================ */
const DURACAO_TOTAL = 234; // 3:54 em segundos
let tocando  = false;
let progresso = 0;
let playerInterval = null;

const playBtn      = document.getElementById('play-btn');
const iconPlay     = document.getElementById('icon-play');
const iconPause    = document.getElementById('icon-pause');
const progressFill = document.getElementById('progress-fill');
const progressThumb = document.querySelector('.progress-thumb');
const currentTimeEl = document.getElementById('current-time');

function formatarTempo(seg) {
  const m = Math.floor(seg / 60);
  const s = Math.floor(seg % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function atualizarProgresso() {
  const pct = (progresso / DURACAO_TOTAL) * 100;
  progressFill.style.width  = `${pct}%`;
  progressThumb.style.left  = `${pct}%`;
  currentTimeEl.textContent = formatarTempo(progresso);
}

/* Controla a reprodução de áudio local */
const audioPlayer = document.getElementById('audio-player');
const musicLink = document.getElementById('music-link');

playBtn.addEventListener('click', () => {
  if (!tocando) {
    // Toca a música local
    audioPlayer.play();
    tocando = true;
    iconPlay.classList.add('hidden');
    iconPause.classList.remove('hidden');

    playerInterval = setInterval(() => {
      progresso = Math.floor(audioPlayer.currentTime);
      atualizarProgresso();
      if (progresso >= DURACAO_TOTAL) {
        progresso = 0;
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        clearInterval(playerInterval);
        tocando = false;
        iconPlay.classList.remove('hidden');
        iconPause.classList.add('hidden');
      }
    }, 1000);
  } else {
    // Pausa
    audioPlayer.pause();
    tocando = false;
    clearInterval(playerInterval);
    iconPlay.classList.remove('hidden');
    iconPause.classList.add('hidden');
  }
});

// Previne navegação do link
musicLink.addEventListener('click', (e) => {
  e.preventDefault();
});

/* ============================================================
   EFEITO DE BRILHO NO CORAÇÃO FINAL
   ============================================================ */
const finalHeart = document.getElementById('final-heart');
if (finalHeart) {
  setInterval(() => {
    finalHeart.style.filter = `drop-shadow(0 0 ${8 + Math.sin(Date.now() / 600) * 6}px #e8857a)`;
  }, 50);
}

/* ============================================================
   GALERIA DE FOTOS E VÍDEOS
   ============================================================ */
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('gallery-modal');
const modalMedia = document.getElementById('modal-media');
const galleryClose = document.querySelector('.gallery-close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');

let currentMediaIndex = 0;
const allMedias = Array.from(galleryItems);

function openGallery(index) {
  currentMediaIndex = index;
  displayMedia(index);
  galleryModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  galleryModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function displayMedia(index) {
  const item = allMedias[index];
  const type = item.getAttribute('data-type');
  
  modalMedia.innerHTML = '';
  
  if (type === 'photo') {
    const img = item.querySelector('img').cloneNode();
    modalMedia.appendChild(img);
  } else if (type === 'video') {
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    const source = item.querySelector('video source').cloneNode();
    video.appendChild(source);
    modalMedia.appendChild(video);
  }
}

function showPrevious() {
  currentMediaIndex = (currentMediaIndex - 1 + allMedias.length) % allMedias.length;
  displayMedia(currentMediaIndex);
}

function showNext() {
  currentMediaIndex = (currentMediaIndex + 1) % allMedias.length;
  displayMedia(currentMediaIndex);
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openGallery(index));
});

galleryClose.addEventListener('click', closeGallery);
modalPrev.addEventListener('click', showPrevious);
modalNext.addEventListener('click', showNext);

// Fechar modal ao clicar fora da imagem
galleryModal.addEventListener('click', (e) => {
  if (e.target === galleryModal) closeGallery();
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
  if (!galleryModal.classList.contains('hidden')) {
    if (e.key === 'ArrowLeft') showPrevious();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'Escape') closeGallery();
  }
});

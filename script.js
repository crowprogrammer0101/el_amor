// =====================
// Estado
// =====================
let noButtonState = 0;
let noEscapeEnabled = false; // cuando sea true, el "No" huye

// =====================
// MÚSICA (segura: no rompe si no existe)
// =====================
const music = document.getElementById("bgMusic");

// Si venimos desde otra página y había música, retomar tiempo
if (music) {
  const saved = localStorage.getItem("musicTime");
  if (saved) {
    const t = parseFloat(saved);
    if (!Number.isNaN(t)) music.currentTime = t;
  }

  // Guardar progreso cada 1s (solo si está sonando)
  setInterval(() => {
    if (!music.paused) {
      localStorage.setItem("musicTime", String(music.currentTime));
    }
  }, 1000);
}

// Mostrar gif inicial
document.getElementById('gifContainer').style.display = 'block';

// =====================
// Helpers (encapsulación)
// =====================

function setYesButtonLevel(level) {
  const baseFont = 16;
  const basePadY = 10;
  const basePadX = 20;

  const fontSize = baseFont + level * 10;
  const padY = basePadY + level * 6;
  const padX = basePadX + level * 12;

  const siBtn = document.getElementById('siBtn');
  siBtn.style.fontSize = `${fontSize}px`;
  siBtn.style.padding = `${padY}px ${padX}px`;
}

function setNoButtonText(text) {
  const noBtn = document.getElementById('noBtn');
  noBtn.innerHTML = text;
  noBtn.style.backgroundColor = '#F1330A';
}

function showSadGif(which) {
  document.getElementById('sadGifContainer').style.display = 'none';
  document.getElementById('sadGifContainer1').style.display = 'none';
  document.getElementById('sadGifContainer2').style.display = 'none';

  document.getElementById('gifContainer').style.display = 'none';
  document.getElementById('happyGifContainer').style.display = 'none';

  document.getElementById(which).style.display = 'block';
}

// =====================
// Frases (ordenadas: rogón bajo → rogón alto)
// =====================
function buildNoQueue() {
  return [
    "¿No? 😳 Ssss-olo quería invitarte… ssss-úper tranqui.",
    "¿Segura? Ssss-iento que ese “No” fue muy fuerte para mi corazoncito 😔",
    "Piénsalo… yo soy de abrazos… de esos que te dejan sonriendo un ratito más 🫶",
    "Ssss-í, ya entendí… pero mi corazón se quedó pegadito a ti 🙈",
    "Ok… respiro… ssss-in dramatizar… (un poquito sí) 😅",
    "¿Y si lo intentamos? Prometo plan romántico, risas y cero vergüenza ✨",
    "No me hagas ponerme intenso… que luego me da por abrazar ideas… y no soltarlas 😌",
    "Ssss-olo di que sí… y te juro que ese día te trato como reina 👑",
    "Mira… si dices que sí… me porto bien. Si dices que no… me pongo triste en 4K 😭",
    "¿Estás segura de verdad? Porque mi corazón ya estaba celebrando antes de tiempo 🥺",
    "A este paso voy a terminar abrazando la pantalla… ssss-ería muy lamentable 😵‍💫",
    "Ok… última oferta: tú dices “sí” y yo pongo el plan más bonito del universo 🌙",
    "Ay no… me estás apachurrando el alma… ssss-in piedad 😔",
    "Ya pues… di que sí… antes de que el botón “Sí” crezca y se vuelva el jefe final 😤",
    "Está bien… no insistiré… ssss-olo… (mentira) 😅 ¿sí? 🫶"
  ];
}

let noQueue = buildNoQueue();

// =====================
// NO que huye (solo al final)
// =====================
const FINAL_LOCK_LEVEL = 14; // 15 frases => último nivel = 14

function enableNoEscape() {
  if (noEscapeEnabled) return;
  noEscapeEnabled = true;

  const noBtn = document.getElementById('noBtn');

  // Para que pueda moverse por la pantalla
  noBtn.style.position = 'fixed';
  noBtn.style.left = '50%';
  noBtn.style.top = '70%';
  noBtn.style.transform = 'translate(-50%, -50%)';
  noBtn.style.zIndex = '9999';

  setNoButtonText("Ssss-orry… ya no acepto ‘No’ 😈");
}

function moveNoButtonRandom() {
  const noBtn = document.getElementById('noBtn');
  const rect = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - rect.width - 10;
  const maxY = window.innerHeight - rect.height - 10;

  const randomX = Math.floor(Math.random() * Math.max(1, maxX));
  const randomY = Math.floor(Math.random() * Math.max(1, maxY));

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
  noBtn.style.transform = 'none';
}

// Huye con hover (PC)
document.getElementById('noBtn').addEventListener('mouseenter', function () {
  if (noEscapeEnabled) moveNoButtonRandom();
});

// Huye con touch (móvil)
document.getElementById('noBtn').addEventListener(
  'touchstart',
  function (e) {
    if (!noEscapeEnabled) return;
    e.preventDefault();
    moveNoButtonRandom();
  },
  { passive: false }
);

// =====================
// BOTÓN SÍ
// =====================
document.getElementById('siBtn').addEventListener('click', function () {

  // ✅ Arrancar música SOLO después del click (autoplay permitido)
  if (music) {
    music.loop = true;
    music.volume = 0.6;
    music.play().catch(() => {});
  }

  // Ocultar triste + inicial
  document.getElementById('sadGifContainer').style.display = 'none';
  document.getElementById('sadGifContainer1').style.display = 'none';
  document.getElementById('sadGifContainer2').style.display = 'none';
  document.getElementById('gifContainer').style.display = 'none';

  // Mostrar feliz 1
  document.getElementById('happyGifContainer').style.display = 'block';

  // Ocultar pregunta y botones
  document.getElementById('question').style.display = 'none';
  document.getElementById('siBtn').style.display = 'none';
  document.getElementById('noBtn').style.display = 'none';

  document.body.classList.add('bg-green');

  // Mensaje
  const msg = document.getElementById('messageContainer');
  msg.style.display = 'block';
  msg.innerHTML = '¡Oh Siii! jajaja 💘';

  // Secuencia gifs felices
  setTimeout(() => {
    document.getElementById('happyGifContainer').style.display = 'none';
    document.getElementById('happyGifContainer2').style.display = 'block';
  }, 1000);

  setTimeout(() => {
    document.getElementById('happyGifContainer2').style.display = 'none';
    document.getElementById('happyGifContainer3').style.display = 'block';
  }, 2000);

  setTimeout(() => {
    document.getElementById('happyGifContainer3').style.display = 'none';
    document.getElementById('happyGifContainer4').style.display = 'block';
  }, 3000);

  // ✅ Transición suave (fade-out) 1s antes de redirigir
  setTimeout(() => {
    document.body.classList.add('page-exit');
  }, 3000);

  // ✅ Redirección automática a los 4 segundos
  setTimeout(() => {
    window.location.href = 'index_2.html';
  }, 4000);
});

// =====================
// BOTÓN NO
// =====================
document.getElementById('noBtn').addEventListener('click', function () {
  // Si ya huye, no dejamos seguir clickeando
  if (noEscapeEnabled) return;

  const level = noButtonState;

  // Alterna gifs tristes
  if (level % 3 === 0) showSadGif('sadGifContainer');
  if (level % 3 === 1) showSadGif('sadGifContainer2');
  if (level % 3 === 2) showSadGif('sadGifContainer1');

  // Si ya no hay mensajes, activa el escape y listo
  if (noQueue.length === 0) {
    enableNoEscape();
    return;
  }

  // Siguiente frase en orden
  const nextText = noQueue.shift();
  setNoButtonText(nextText);

  // Crece el Sí
  setYesButtonLevel(level + 2);

  noButtonState++;

  // Cuando llega al último nivel: "No" se vuelve imposible
  if (noButtonState >= FINAL_LOCK_LEVEL) {
    noQueue.length = 0; // evita reinicios
    enableNoEscape();
  }
});

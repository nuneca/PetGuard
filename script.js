// ---------- Header: sombra ao rolar ----------
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
});

// ---------- Menu mobile ----------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Simulação do card de status (mostra o produto em ação) ----------
const statusScenarios = [
  { label: 'Monitorando', text: 'Rex está descansando no sofá', alert: false },
  { label: 'Tudo normal', text: 'Nível de atividade dentro do padrão', alert: false },
  { label: 'Alerta', text: 'Agitação incomum nos últimos 10 min', alert: true },
  { label: 'Monitorando', text: 'Rex voltou a ficar tranquilo', alert: false },
];

const statusCard = document.getElementById('statusCard');
const statusDot = document.getElementById('statusDot');
const statusLabel = document.getElementById('statusLabel');
const statusText = document.getElementById('statusText');

let scenarioIndex = 0;

function applyScenario(scenario) {
  statusCard.style.opacity = '0';
  setTimeout(() => {
    statusLabel.textContent = scenario.label;
    statusText.textContent = scenario.text;
    statusDot.classList.toggle('alert', scenario.alert);
    statusCard.style.opacity = '1';
  }, 250);
}

if (statusCard) {
  statusCard.style.transition = 'opacity 0.25s ease';
  setInterval(() => {
    scenarioIndex = (scenarioIndex + 1) % statusScenarios.length;
    applyScenario(statusScenarios[scenarioIndex]);
  }, 3800);
}

// ---------- Formulário da lista de espera ----------
const waitlistForm = document.getElementById('waitlistForm');
const formMsg = document.getElementById('formMsg');

waitlistForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!nome || !emailValido) {
    formMsg.textContent = 'Confira seu nome e um e-mail válido antes de enviar.';
    formMsg.classList.add('error');
    return;
  }

  formMsg.classList.remove('error');
  formMsg.textContent = `Pronto, ${nome.split(' ')[0]}! Você entrou na lista de espera do PetGuard AI.`;
  waitlistForm.reset();
});
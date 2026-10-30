// ---------- Header: Sombra e Navegação Mobile ----------
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
});

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Card de Status Simulado na Hero ----------
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
  if (!statusCard) return;
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

// ---------- Formulário de Lista de Espera ----------
const waitlistForm = document.getElementById('waitlistForm');
const formMsg = document.getElementById('formMsg');

if (waitlistForm) {
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
    formMsg.textContent = `Pronto, ${nome.split(' ')[0]}! Você entrou na lista de espera. Baixe o app em linkapp.com.`;
    waitlistForm.reset();
  });
}

// ---------- Gestão de Autenticação e Usuário ----------
let currentUser = JSON.parse(localStorage.getItem('petguard_user')) || null;

const authModal = document.getElementById('authModal');
const dashboardModal = document.getElementById('dashboardModal');

const btnOpenAuth = document.getElementById('btnOpenAuth');
const btnOpenDashboard = document.getElementById('btnOpenDashboard');
const btnCloseAuth = document.getElementById('btnCloseAuth');
const btnCloseDashboard = document.getElementById('btnCloseDashboard');
const btnLogout = document.getElementById('btnLogout');

// Controle dos Modais
function updateUI() {
  if (currentUser) {
    btnOpenAuth.style.display = 'none';
    btnOpenDashboard.style.display = 'inline-flex';
    
    // Atualiza dados na modal Minha Conta
    document.getElementById('dashUserName').textContent = currentUser.name;
    document.getElementById('dashUserEmail').textContent = currentUser.email;
    document.getElementById('dashPetName').textContent = currentUser.petName || 'Rex';
  } else {
    btnOpenAuth.style.display = 'inline-flex';
    btnOpenDashboard.style.display = 'none';
  }
}

btnOpenAuth?.addEventListener('click', () => authModal.classList.add('open'));
btnCloseAuth?.addEventListener('click', () => authModal.classList.remove('open'));

btnOpenDashboard?.addEventListener('click', () => dashboardModal.classList.add('open'));
btnCloseDashboard?.addEventListener('click', () => dashboardModal.classList.remove('open'));

btnLogout?.addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem('petguard_user');
  dashboardModal.classList.remove('open');
  updateUI();
});

// Abas de Auth
function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');

  if (tab === 'login') {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    tabLoginBtn.classList.add('active');
    tabRegisterBtn.classList.remove('active');
  } else {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    tabRegisterBtn.classList.add('active');
    tabLoginBtn.classList.remove('active');
  }
}

// Submit Cadastro
document.getElementById('registerForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const petName = document.getElementById('regPetName').value.trim();
  const regMsg = document.getElementById('regMsg');

  if (!name || !email || !petName) {
    regMsg.textContent = 'Preencha todos os campos corretamente.';
    regMsg.classList.add('error');
    return;
  }

  currentUser = { name, email, petName };
  localStorage.setItem('petguard_user', JSON.stringify(currentUser));
  
  regMsg.classList.remove('error');
  regMsg.textContent = 'Conta criada com sucesso!';

  setTimeout(() => {
    authModal.classList.remove('open');
    updateUI();
    dashboardModal.classList.add('open');
  }, 600);
});

// Submit Login
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const loginMsg = document.getElementById('loginMsg');

  if (!email) {
    loginMsg.textContent = 'Informe seu e-mail.';
    loginMsg.classList.add('error');
    return;
  }

  // Simulação de login
  currentUser = {
    name: email.split('@')[0],
    email: email,
    petName: 'Rex'
  };
  localStorage.setItem('petguard_user', JSON.stringify(currentUser));

  authModal.classList.remove('open');
  updateUI();
  dashboardModal.classList.add('open');
});

// Inicializa a interface
updateUI();

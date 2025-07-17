// Elementos do DOM
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('header nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

// Criação do menu mobile
function setupMobileMenu() {
  // Verificar se o botão de menu mobile existe
  if (!mobileMenuBtn) return;

  // Criar o menu mobile
  const mobileNav = document.createElement('div');
  mobileNav.classList.add('mobile-nav');

  // Clonar links de navegação
  const mobileNavLinks = document.createElement('div');
  mobileNavLinks.classList.add('mobile-nav-links');

  // Obter os links originais
  const originalNav = document.querySelector('.nav-links');
  if (originalNav) {
    const navLinksList = originalNav.cloneNode(true);
    mobileNavLinks.appendChild(navLinksList);

    // Adicionar ao menu mobile
    mobileNav.appendChild(mobileNavLinks);

    // Adicionar ao body
    document.body.appendChild(mobileNav);

    // Toggle do menu mobile
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      mobileMenuBtn.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';

      // Adicionar/remover classe no body para prevenir scroll
      if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Fechar menu ao clicar em um link
    const allMobileLinks = mobileNav.querySelectorAll('a');
    allMobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
        document.body.style.overflow = '';
      });
    });
  }
}

// Scroll suave para links de âncora
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// Animações de entrada ao scroll
function setupScrollAnimations() {
  // Adicionar classe para animação
  const animatedElements = document.querySelectorAll('.benefit-card, .economy-card, .testimonial-card, .self-service-content, .self-service-image, .form-group');

  animatedElements.forEach((el, index) => {
    el.classList.add('animate-on-scroll');
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    // Adicionar delay escalonado para elementos sequenciais
    el.style.transitionDelay = `${index * 0.05}s`;
  });

  // Função para verificar elementos visíveis
  function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.9;

    animatedElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }

  // Verificar na carga inicial e no scroll
  window.addEventListener('load', checkVisibility);
  window.addEventListener('scroll', checkVisibility);
}

// Contador de economia simulado
function setupEconomyCounters() {
  const economySection = document.querySelector('#economy');
  let hasAnimated = false;

  function animateCounters() {
    if (hasAnimated) return;

    const economyTop = economySection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (economyTop < windowHeight * 0.8) {
      hasAnimated = true;

      // Criar animação de economia
      const economyCards = document.querySelectorAll('.economy-card');

      economyCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animated');

          // Animar ícones
          const icon = card.querySelector('.economy-icon');
          if (icon) {
            icon.style.transform = 'scale(1.1)';
            setTimeout(() => {
              icon.style.transform = 'scale(1)';
            }, 300);
          }
        }, index * 200);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
}

// Formulário de contato
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simulação de envio do formulário
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';

      // Simular requisição
      setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 1500);
    });
  }
}

// Formulário de franquia
function setupFranchiseForm() {
  const franchiseForm = document.getElementById('franchiseForm');

  if (franchiseForm) {
    franchiseForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simulação de envio do formulário de franquia
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';

      // Simular requisição
      setTimeout(() => {
        alert('Sua solicitação de franquia foi enviada com sucesso! Nossa equipe entrará em contato em breve para dar continuidade ao processo.');
        franchiseForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 1500);
    });
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Primeiramente configura o menu mobile
  setupMobileMenu();

  // Em seguida, configura as outras funcionalidades
  setupSmoothScroll();
  setupScrollAnimations();
  setupEconomyCounters();
  setupContactForm();
  setupFranchiseForm();

  // Detectar scroll para mudar o header
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Verificação adicional para links de navegação móvel
  document.addEventListener('click', (e) => {
    if (e.target.closest('.mobile-nav a')) {
      const mobileNav = document.querySelector('.mobile-nav');
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
          mobileMenuBtn.textContent = '☰';
        }
        document.body.style.overflow = '';
      }
    }
  });
});

// Preloader - esconde o preloader após o carregamento completo
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }

    // Destacar seção atual baseado na URL hash
    const hash = window.location.hash;
    if (hash) {
      const targetSection = document.querySelector(hash);
      if (targetSection) {
        targetSection.classList.add('highlight-section');
        setTimeout(() => {
          targetSection.classList.remove('highlight-section');
        }, 1500);
      }
    }
  }, 500);
});

// Função que cria "bolhas" animadas na tela
function createBolhas() {
  const section = document.querySelector('section');
  const createElement = document.createElement('span');
  var size = Math.random() * 60;

  createElement.style.width = 20 + size + 'px';
  createElement.style.height = 20 + size + 'px';
  createElement.style.left = Math.random() * innerWidth + 'px';
  section.appendChild(createElement);

  setTimeout(() => {
    createElement.remove();
  }, 4000)
}
setInterval(createBolhas, 50);

// Efeito Pop-up
const countdownEl = document.getElementById("countdown");
const endDate = new Date();
endDate.setDate(endDate.getDate() + 1); // 2 dias restantes

function updateCountdown() {
  const now = new Date();
  const diff = endDate - now;
  if (diff <= 0) {
    countdownEl.textContent = "00:00:00";
    return;
  }
  const hrs = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
  const mins = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
  const secs = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
  countdownEl.textContent = `${hrs}:${mins}:${secs}`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

//Scroll de rolagem até o topo
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
}
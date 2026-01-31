// ============================================
// GLISTER LANDING PAGE - SCRIPT.JS
// Interações e funcionalidades
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 1. SMOOTH SCROLL PARA ANCHOR LINKS
  // ==========================================
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ==========================================
  // 2. FAQ ACCORDION
  // ==========================================
  
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Fechar todos os outros itens
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle do item clicado
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // ==========================================
  // 3. FADE IN AO SCROLL (INTERSECTION OBSERVER)
  // ==========================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Adicionar classe fade-in aos elementos que devem animar
  const fadeElements = document.querySelectorAll('.section-title, .section-subtitle, .pain-card, .testimonial-card, .pricing-card');
  
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // ==========================================
  // 4. CONTADOR DE BÔNUS (SIMULAÇÃO)
  // ==========================================
  
  const bonusCounter = document.getElementById('bonus-counter');
  
  if (bonusCounter) {
    // Gerar número aleatório entre 35-48 para simular vagas restantes
    const randomCount = Math.floor(Math.random() * (48 - 35 + 1)) + 35;
    bonusCounter.textContent = randomCount;
    
    // Decrementar contador a cada 5 minutos (simulação)
    setInterval(() => {
      let currentCount = parseInt(bonusCounter.textContent);
      if (currentCount > 10) {
        currentCount--;
        bonusCounter.textContent = currentCount;
      }
    }, 300000); // 5 minutos
  }
  
  // ==========================================
  // 5. SCROLL TO TOP AO CLICAR NO LOGO (OPCIONAL)
  // ==========================================
  
  const logo = document.querySelector('.footer-logo h3');
  
  if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ==========================================
  // 6. HIGHLIGHT DO CTA AO SCROLL
  // ==========================================
  
  const ctaButtons = document.querySelectorAll('.btn-primary');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Se usuário chegou perto do final da página, destacar CTAs
    if (scrollPosition + windowHeight > documentHeight - 500) {
      ctaButtons.forEach(btn => {
        btn.style.animation = 'pulse 1.5s infinite';
      });
    } else {
      ctaButtons.forEach(btn => {
        btn.style.animation = 'none';
      });
    }
  });
  
  // ==========================================
  // 7. FORM VALIDATION (SE HOUVER FORMULÁRIO)
  // ==========================================
  
  // Placeholder para futuras implementações de formulário
  // Exemplo: validação de email, telefone, etc.
  
  // ==========================================
  // 8. CONSOLE LOG DE BOAS-VINDAS (OPCIONAL)
  // ==========================================
  
  console.log('%c✨ Glister by Amway - Landing Page ✨', 'color: #0D9488; font-size: 20px; font-weight: bold;');
  console.log('%cDesenvolvido com base nos princípios de Alex Hormozi', 'color: #F97316; font-size: 14px;');
  
});

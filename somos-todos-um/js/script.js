// ===================================
// FAQ ACCORDION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle item atual
            item.classList.toggle('active');
        });
    });
});

// ===================================
// SMOOTH SCROLL
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos para animar
const animateElements = document.querySelectorAll('.chapter-card, .question-card, .target-card, .bonus-card, .testimonial-card');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ===================================
// CONTADOR DE VENDAS ANIMADO
// ===================================

function animateCounter() {
    const counter = document.getElementById('salesCounter');
    if (!counter) return;
    
    const target = parseInt(counter.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}

// Executar quando a seção aparecer na tela
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
});

const socialProofSection = document.getElementById('social-proof');
if (socialProofSection) {
    counterObserver.observe(socialProofSection);
}

// ===================================
// COPIAR CHAVE PIX (VERSÃO DEFINITIVA)
// ===================================

function copyPixKey() {
    // 1. Cria um elemento de texto temporário
    const textArea = document.createElement("textarea");
    textArea.value = "62992475080";
    
    // 2. Adiciona ao site mas deixa invisível
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    
    // 3. Seleciona e copia (Funciona em Android/iPhone antigos e novos)
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        const btn = document.querySelector('.btn-copy');
        
        if(successful && btn) {
            // Feedback Visual
            const originalText = btn.innerText;
            btn.innerText = '✅ CHAVE COPIADA!';
            btn.style.background = '#28A745';
            btn.style.color = '#FFFFFF';
            
            // Alerta vibratório (se suportado)
            if (navigator.vibrate) navigator.vibrate(50);

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 3000);
        } else {
            throw new Error("Falha ao copiar");
        }
    } catch (err) {
        // Se tudo falhar, mostra na tela para a pessoa copiar manual
        prompt("Copie a chave abaixo:", "62992475080");
    }
    
    // 4. Limpa a bagunça
    document.body.removeChild(textArea);
}

// ===================================
// TRACKING DE CLIQUES (OPCIONAL)
// ===================================

document.querySelectorAll('.btn-primary, .btn-buy, .btn-final, .btn-blindado').forEach(button => {
    button.addEventListener('click', function() {
        // Aqui você pode adicionar tracking do Google Analytics
        // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': 'Comprar Livro' });
        console.log('Botão de compra clicado:', this.textContent.trim());
    });
});

// ===================================
// PROTEÇÃO CONTRA CÓPIA (OPCIONAL)
// ===================================

// Desabilitar seleção de texto em áreas específicas
document.querySelectorAll('.hero-title, .price-current, .price-main').forEach(element => {
    element.style.userSelect = 'none';
    element.style.webkitUserSelect = 'none';
    element.style.mozUserSelect = 'none';
});

// ===================================
// LAZY LOADING DE IMAGENS (FALLBACK)
// ===================================

if ('loading' in HTMLImageElement.prototype) {
    // Navegador suporta lazy loading nativo
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback para navegadores antigos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// DETECÇÃO DE SCROLL PARA NAVBAR
// ===================================

let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scroll para baixo
        if (navbar) {
            navbar.style.transform = 'translateY(-100%)';
        }
    } else {
        // Scroll para cima
        if (navbar) {
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// ===================================
// CONSOLE LOG DE BOAS-VINDAS
// ===================================

console.log('%c🎉 Bem-vindo à Landing Page "Somos Todos Um"!', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ por Henrique - BizMix', 'color: #2C5F7C; font-size: 14px;');
console.log('%c📧 Contato: contato@bizmix.com.br', 'color: #666; font-size: 12px;');

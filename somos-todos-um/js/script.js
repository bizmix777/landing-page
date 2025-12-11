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

const observer = new IntersectionObserver(function(entries) {
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
    observer.observe(el);
});

// ===================================
// CONTADOR DE URGÊNCIA (OPCIONAL)
// ===================================

function startCountdown(duration, display) {
    let timer = duration, hours, minutes, seconds;
    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// Ativar contador se houver elemento na página
window.onload = function () {
    const countdownElement = document.querySelector('#countdown');
    if (countdownElement) {
        const twentyFourHours = 60 * 60 * 24;
        startCountdown(twentyFourHours, countdownElement);
    }
};

// ===================================
// TRACKING DE CLIQUES (OPCIONAL)
// ===================================

document.querySelectorAll('.btn-primary, .btn-buy, .btn-final').forEach(button => {
    button.addEventListener('click', function() {
        // Aqui você pode adicionar tracking do Google Analytics
        // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': 'Comprar Livro' });
        console.log('Botão de compra clicado');
    });
});

// ===================================
// PROTEÇÃO CONTRA CÓPIA (OPCIONAL)
// ===================================

// Desabilitar clique direito
document.addEventListener('contextmenu', function(e) {
    // e.preventDefault();
    // Comentado para não atrapalhar desenvolvimento
});

// Desabilitar seleção de texto em áreas específicas
document.querySelectorAll('.hero-title, .price-current').forEach(element => {
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
// DETECÇÃO DE SCROLL PARA ANIMAÇÕES
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
// VALIDAÇÃO DE FORMULÁRIO (SE HOUVER)
// ===================================

const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Enviar formulário
            form.submit();
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
});

// ===================================
// MODAL DE VÍDEO (SE HOUVER)
// ===================================

const videoButtons = document.querySelectorAll('[data-video]');

videoButtons.forEach(button => {
    button.addEventListener('click', function() {
        const videoId = this.getAttribute('data-video');
        
        // Criar modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        
        modal.innerHTML = `
            <div style="position: relative; width: 90%; max-width: 800px;">
                <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: -40px; right: 0; background: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px;">Fechar</button>
                <iframe width="100%" height="450" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Fechar ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// ===================================
// CONSOLE LOG DE BOAS-VINDAS
// ===================================

console.log('%c🎉 Bem-vindo à Landing Page "Somos Todos Um"!', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ por Henrique - BizMix', 'color: #2C5F7C; font-size: 14px;');
console.log('%c📧 Contato: contato@bizmix.com.br', 'color: #666; font-size: 12px;');

// ===================================
// COPIAR CHAVE PIX
// ===================================

function copyPixKey() {
    const pixKeyInput = document.getElementById('pixKey');
    pixKeyInput.select();
    pixKeyInput.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(pixKeyInput.value).then(() => {
        const btn = document.querySelector('.btn-copy');
        const originalText = btn.textContent;
        btn.textContent = '✅ Copiado!';
        btn.style.background = '#28A745';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        alert('Chave PIX: ' + pixKeyInput.value);
    });
}

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
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
});

const socialProofSection = document.getElementById('social-proof');
if (socialProofSection) {
    observer.observe(socialProofSection);
}

// ===================================
// SCROLL SUAVE PARA INSTRUÇÕES
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

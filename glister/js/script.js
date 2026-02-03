/ ============================================
// GLISTER LANDING PAGE - SCRIPT.JS COMPLETO
// Com validações e integração Supabase
// ============================================

// CONFIGURAÇÃO DO SUPABASE
const SUPABASE_URL = 'SUA_URL_SUPABASE_AQUI'; // Ex: https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'SUA_CHAVE_PUBLICA_AQUI';

// Importar Supabase (via CDN - adicione no HTML <head>)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 1. MODAL DE CADASTRO
  // ==========================================
  
  const modal = document.getElementById('cadastroModal');
  const openModalBtn = document.getElementById('openCadastroModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const cancelarBtn = document.getElementById('cancelarCadastro');
  
  // Abrir modal
  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Fechar modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
  
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }
  
  if (cancelarBtn) {
    cancelarBtn.addEventListener('click', closeModal);
  }
  
  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // ==========================================
  // 2. MÁSCARAS DE CAMPOS
  // ==========================================
  
  const cpfInput = document.getElementById('cpf');
  const celularInput = document.getElementById('celular');
  const cepInput = document.getElementById('cep');
  
  // Máscara CPF (000.000.000-00)
  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      
      e.target.value = value;
    });
  }
  
  // Máscara Celular (55 99 99999-9999)
  if (celularInput) {
    celularInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 13) value = value.slice(0, 13);
      
      value = value.replace(/(\d{2})(\d)/, '$1 $2');
      value = value.replace(/(\d{2})(\d)/, '$1 $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      
      e.target.value = value;
    });
  }
  
  // Máscara CEP (00000-000)
  if (cepInput) {
    cepInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 8) value = value.slice(0, 8);
      
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      
      e.target.value = value;
    });
  }
  
  // ==========================================
  // 3. VALIDAÇÃO DE CPF
  // ==========================================
  
  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
  }
  
  // Validar CPF ao sair do campo
  if (cpfInput) {
    cpfInput.addEventListener('blur', () => {
      const cpf = cpfInput.value;
      const errorSpan = document.getElementById('cpfError');
      
      if (cpf && !validarCPF(cpf)) {
        cpfInput.classList.add('error');
        cpfInput.classList.remove('success');
        errorSpan.textContent = 'CPF inválido';
        errorSpan.classList.add('active');
      } else if (cpf) {
        cpfInput.classList.remove('error');
        cpfInput.classList.add('success');
        errorSpan.classList.remove('active');
      }
    });
  }
  
  // ==========================================
  // 4. BUSCA DE CEP (API ViaCEP)
  // ==========================================
  
  if (cepInput) {
    cepInput.addEventListener('blur', async () => {
      const cep = cepInput.value.replace(/\D/g, '');
      const cepError = document.getElementById('cepError');
      const cepLoading = document.getElementById('cepLoading');
      
      if (cep.length !== 8) {
        cepError.textContent = 'CEP deve ter 8 dígitos';
        cepError.classList.add('active');
        return;
      }
      
      // Mostrar loading
      cepLoading.classList.add('active');
      cepError.classList.remove('active');
      
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        cepLoading.classList.remove('active');
        
        if (data.erro) {
          cepError.textContent = 'CEP não encontrado';
          cepError.classList.add('active');
          cepInput.classList.add('error');
          return;
        }
        
        // Preencher campos
        document.getElementById('rua').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
        
        cepInput.classList.remove('error');
        cepInput.classList.add('success');
        
        // Focar no campo número
        document.getElementById('numero').focus();
        
      } catch (error) {
        cepLoading.classList.remove('active');
        cepError.textContent = 'Erro ao buscar CEP. Tente novamente.';
        cepError.classList.add('active');
      }
    });
  }
  
  // ==========================================
  // 5. VALIDAÇÃO DE EMAIL
  // ==========================================
  
  const emailInput = document.getElementById('email');
  const emailConfirmInput = document.getElementById('emailConfirm');
  
  if (emailConfirmInput) {
    emailConfirmInput.addEventListener('blur', () => {
      const email = emailInput.value;
      const emailConfirm = emailConfirmInput.value;
      const errorSpan = document.getElementById('emailConfirmError');
      
      if (emailConfirm && email !== emailConfirm) {
        emailConfirmInput.classList.add('error');
        errorSpan.textContent = 'Os emails não conferem';
        errorSpan.classList.add('active');
      } else if (emailConfirm) {
        emailConfirmInput.classList.remove('error');
        emailConfirmInput.classList.add('success');
        errorSpan.classList.remove('active');
      }
    });
  }
  
  // ==========================================
  // 6. VALIDAÇÃO DE SENHA
  // ==========================================
  
  const senhaInput = document.getElementById('senha');
  const senhaConfirmInput = document.getElementById('senhaConfirm');
  
  function validarSenha(senha) {
    const requisitos = {
      tamanho: senha.length >= 8,
      maiuscula: /[A-Z]/.test(senha),
      minuscula: /[a-z]/.test(senha),
      numero: /[0-9]/.test(senha),
      especial: /[!@#$%^&*(),.?":{}|<>]/.test(senha)
    };
    
    return Object.values(requisitos).every(r => r === true);
  }
  
  if (senhaInput) {
    senhaInput.addEventListener('blur', () => {
      const senha = senhaInput.value;
      const errorSpan = document.getElementById('senhaError');
      
      if (senha && !validarSenha(senha)) {
        senhaInput.classList.add('error');
        errorSpan.textContent = 'Senha não atende aos requisitos mínimos';
        errorSpan.classList.add('active');
      } else if (senha) {
        senhaInput.classList.remove('error');
        senhaInput.classList.add('success');
        errorSpan.classList.remove('active');
      }
    });
  }
  
  if (senhaConfirmInput) {
    senhaConfirmInput.addEventListener('blur', () => {
      const senha = senhaInput.value;
      const senhaConfirm = senhaConfirmInput.value;
      const errorSpan = document.getElementById('senhaConfirmError');
      
      if (senhaConfirm && senha !== senhaConfirm) {
        senhaConfirmInput.classList.add('error');
        errorSpan.textContent = 'As senhas não conferem';
        errorSpan.classList.add('active');
      } else if (senhaConfirm) {
        senhaConfirmInput.classList.remove('error');
        senhaConfirmInput.classList.add('success');
        errorSpan.classList.remove('active');
      }
    });
  }
  
  // ==========================================
  // 7. SUBMIT DO FORMULÁRIO (SUPABASE)
  // ==========================================
  
  const cadastroForm = document.getElementById('cadastroForm');
  
  if (cadastroForm) {
    cadastroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validar todos os campos
      const nome = document.getElementById('nome').value.trim();
      const cpf = document.getElementById('cpf').value;
      const dataNascimento = document.getElementById('dataNascimento').value;
      const celular = document.getElementById('celular').value;
      const email = document.getElementById('email').value.trim();
      const emailConfirm = document.getElementById('emailConfirm').value.trim();
      const senha = document.getElementById('senha').value;
      const senhaConfirm = document.getElementById('senhaConfirm').value;
      const cep = document.getElementById('cep').value;
      const rua = document.getElementById('rua').value.trim();
      const numero = document.getElementById('numero').value.trim();
      const complemento = document.getElementById('complemento').value.trim();
      const bairro = document.getElementById('bairro').value.trim();
      const cidade = document.getElementById('cidade').value.trim();
      const estado = document.getElementById('estado').value.trim();
      
      const formMessage = document.getElementById('formMessage');
      const submitBtn = document.getElementById('submitCadastro');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      
      // Validações
      let hasError = false;
      
      if (!validarCPF(cpf)) {
        document.getElementById('cpfError').textContent = 'CPF inválido';
        document.getElementById('cpfError').classList.add('active');
        hasError = true;
      }
      
      if (email !== emailConfirm) {
        document.getElementById('emailConfirmError').textContent = 'Os emails não conferem';
        document.getElementById('emailConfirmError').classList.add('active');
        hasError = true;
      }
      
      if (!validarSenha(senha)) {
        document.getElementById('senhaError').textContent = 'Senha não atende aos requisitos';
        document.getElementById('senhaError').classList.add('active');
        hasError = true;
      }
      
      if (senha !== senhaConfirm) {
        document.getElementById('senhaConfirmError').textContent = 'As senhas não conferem';
        document.getElementById('senhaConfirmError').classList.add('active');
        hasError = true;
      }
      
      if (hasError) {
        formMessage.textContent = '⚠️ Por favor, corrija os erros acima antes de continuar.';
        formMessage.className = 'form-message error';
        return;
      }
      
      // Mostrar loading
      btnText.classList.add('hidden');
      btnLoading.classList.add('active');
      submitBtn.disabled = true;
      
      try {
        // Hash da senha (simples - em produção use bcrypt no backend)
        const senhaHash = btoa(senha);
        
        // Dados para inserir
        const clienteData = {
          nome_completo: nome,
          cpf: cpf,
          data_nascimento: dataNascimento,
          celular: celular,
          email: email,
          senha_hash: senhaHash,
          cep: cep,
          endereco_rua: rua,
          endereco_numero: numero,
          endereco_complemento: complemento || null,
          endereco_bairro: bairro,
          endereco_cidade: cidade,
          endereco_estado: estado
        };
        
        // Inserir no Supabase usando fetch direto
        const result = await supabaseFetch('clientes', {
          method: 'POST',
          body: JSON.stringify(clienteData)
        });
        
        console.log('✅ Cliente cadastrado:', result);
        
        // Sucesso!
        formMessage.textContent = '✅ Cadastro realizado com sucesso! Redirecionando para finalizar a compra...';
        formMessage.className = 'form-message success';
        
        // Resetar formulário
        cadastroForm.reset();
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
          window.open('https://www.amway.com.br/pt/register/newcustomer?registerCode=3109505702', '_blank');
          closeModal();
          
          // Resetar botão
          btnText.classList.remove('hidden');
          btnLoading.classList.remove('active');
          submitBtn.disabled = false;
          formMessage.classList.add('hidden');
        }, 2000);
        
      } catch (error) {
        console.error('❌ Erro ao cadastrar:', error);
        
        // Mensagem de erro amigável
        let errorMessage = '❌ Erro ao realizar cadastro. ';
        
        if (error.message.includes('duplicate') || error.message.includes('unique')) {
          errorMessage += 'CPF ou Email já cadastrado.';
        } else {
          errorMessage += 'Tente novamente em alguns instantes.';
        }
        
        formMessage.textContent = errorMessage;
        formMessage.className = 'form-message error';
        
        // Remover loading
        btnText.classList.remove('hidden');
        btnLoading.classList.remove('active');
        submitBtn.disabled = false;
      }
    });
  }
  
  // ==========================================
  // 8. SMOOTH SCROLL
  // ==========================================
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // ==========================================
  // 9. FAQ ACCORDION
  // ==========================================
  
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
  
  // ==========================================
  // 10. FADE IN AO SCROLL
  // ==========================================
  
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);
  
  const fadeElements = document.querySelectorAll('.section-title, .section-subtitle, .pain-card, .testimonial-card, .pricing-card');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
  
  // ==========================================
  // 11. CONTADOR DE BÔNUS
  // ==========================================
  
  const bonusCounter = document.getElementById('bonus-counter');
  if (bonusCounter) {
    const randomCount = Math.floor(Math.random() * (48 - 35 + 1)) + 35;
    bonusCounter.textContent = randomCount;
  }
  
});

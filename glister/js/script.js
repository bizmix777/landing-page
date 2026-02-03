// ============================================
// LANDING PAGE GLISTER - SCRIPT PRINCIPAL
// ============================================
// IMPORTANTE: Este script depende de supabase-config.js
// Certifique-se de que está carregado antes deste arquivo

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // ELEMENTOS DO DOM
  // ============================================
  
  const modal = document.getElementById('cadastroModal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const btnOpcao2 = document.getElementById('btn-opcao2');
  const btnFecharModal = document.querySelector('.modal-close');
  const btnCancelar = document.getElementById('btnCancelar');
  const form = document.getElementById('cadastroForm');
  const formMessage = document.getElementById('formMessage');
  const btnCep = document.getElementById('btnBuscarCep');
  const btnSubmit = document.getElementById('btnSubmit');

  // ============================================
  // ABRIR E FECHAR MODAL
  // ============================================

  // Abrir modal ao clicar na Opção 2
  if (btnOpcao2) {
    btnOpcao2.addEventListener('click', function(e) {
      e.preventDefault();
      abrirModal();
    });
  }

  // Fechar modal - botão X
  if (btnFecharModal) {
    btnFecharModal.addEventListener('click', function() {
      fecharModal();
    });
  }

  // Fechar modal - botão Cancelar
  if (btnCancelar) {
    btnCancelar.addEventListener('click', function() {
      fecharModal();
    });
  }

  // Fechar modal - clique no overlay
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function() {
      fecharModal();
    });
  }

  // Fechar modal - tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      fecharModal();
    }
  });

  function abrirModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Impede scroll da página
  }

  function fecharModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restaura scroll
    limparFormulario();
  }

  function limparFormulario() {
    form.reset();
    formMessage.textContent = '';
    formMessage.className = 'form-message hidden';
  }

  // ============================================
  // MÁSCARAS DE ENTRADA
  // ============================================

  // Máscara CPF: 000.000.000-00
  const cpfInput = document.getElementById('cpf');
  if (cpfInput) {
    cpfInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
      }
    });
  }

  // Máscara Celular: (00) 00000-0000
  const celularInput = document.getElementById('celular');
  if (celularInput) {
    celularInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
      }
    });
  }

  // Máscara CEP: 00000-000
  const cepInput = document.getElementById('cep');
  if (cepInput) {
    cepInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 8) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
      }
    });
  }

  // Estado em maiúsculas
  const estadoInput = document.getElementById('estado');
  if (estadoInput) {
    estadoInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.toUpperCase();
    });
  }

  // ============================================
  // BUSCAR CEP VIA API VIACEP
  // ============================================

  if (btnCep) {
    btnCep.addEventListener('click', async function() {
      const cep = cepInput.value.replace(/\D/g, '');
      
      if (cep.length !== 8) {
        mostrarMensagem('⚠️ CEP inválido! Digite 8 dígitos.', 'error');
        return;
      }

      // Mostrar loading
      btnCep.disabled = true;
      btnCep.querySelector('.btn-text').style.display = 'none';
      btnCep.querySelector('.btn-loading').classList.add('active');

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          mostrarMensagem('⚠️ CEP não encontrado!', 'error');
          return;
        }

        // Preencher campos automaticamente
        document.getElementById('rua').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
        
        // Focar no campo número
        document.getElementById('numero').focus();
        
        mostrarMensagem('✅ Endereço encontrado!', 'success');

      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        mostrarMensagem('❌ Erro ao buscar CEP. Tente novamente.', 'error');
      } finally {
        // Restaurar botão
        btnCep.disabled = false;
        btnCep.querySelector('.btn-text').style.display = 'inline';
        btnCep.querySelector('.btn-loading').classList.remove('active');
      }
    });
  }

  // ============================================
  // SUBMIT DO FORMULÁRIO
  // ============================================

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Limpar mensagens anteriores
      formMessage.textContent = '';
      formMessage.className = 'form-message hidden';

      // Coletar dados do formulário
      const nome = document.getElementById('nome').value.trim();
      const cpf = document.getElementById('cpf').value.trim();
      const dataNascimento = document.getElementById('dataNascimento').value;
      const celular = document.getElementById('celular').value.trim();
      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('senha').value;
      const cep = document.getElementById('cep').value.trim();
      const rua = document.getElementById('rua').value.trim();
      const numero = document.getElementById('numero').value.trim();
      const complemento = document.getElementById('complemento').value.trim();
      const bairro = document.getElementById('bairro').value.trim();
      const cidade = document.getElementById('cidade').value.trim();
      const estado = document.getElementById('estado').value.trim();

      // ============================================
      // VALIDAÇÕES
      // ============================================

      // Validar campos obrigatórios
      if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
        mostrarMensagem('⚠️ Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
      }

      if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
        mostrarMensagem('⚠️ Por favor, complete o endereço!', 'error');
        return;
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarMensagem('⚠️ Email inválido!', 'error');
        return;
      }

      // Validar senha
      if (senha.length < 6) {
        mostrarMensagem('⚠️ A senha deve ter no mínimo 6 caracteres!', 'error');
        return;
      }

      // ============================================
      // ENVIAR DADOS
      // ============================================

      // Mostrar loading
      mostrarMensagem('⏳ Processando seu cadastro...', '');
      btnSubmit.disabled = true;
      btnSubmit.querySelector('.btn-text').classList.add('hidden');
      btnSubmit.querySelector('.btn-loading').classList.add('active');

      try {
        // 1. Inserir cliente no banco de dados
        const { data: result, error } = await supabase
          .from('clientes')
          .insert([{
            nome: nome,
            cpf: cpf,
            data_nascimento: dataNascimento,
            celular: celular,
            email: email,
            senha: senha,
            cep: cep,
            rua: rua,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            estado: estado
          }])
          .select();

        if (error) {
          throw error;
        }

        console.log('✅ Cliente cadastrado:', result);
        
        // 2. Enviar email via Edge Function
        try {
          const emailResponse = await supabaseFunction('email-cadastro-cliente-amway', {
            nome: nome,
            cpf: cpf,
            data_nascimento: dataNascimento,
            celular: celular,
            email: email,
            senha: senha,
            cep: cep,
            rua: rua,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
            cidade: cidade,
            estado: estado
          });
          
          console.log('✅ Email enviado:', emailResponse);
        } catch (emailError) {
          console.error('⚠️ Erro ao enviar email (não crítico):', emailError);
          // Não bloqueia o cadastro se o email falhar
        }
        
        // ============================================
        // SUCESSO!
        // ============================================
        
        mostrarMensagem('✅ Cadastro realizado com sucesso! Redirecionando...', 'success');

        // Limpar formulário
        form.reset();

        // Redirecionar após 3 segundos
        setTimeout(() => {
          window.location.href = 'https://www.amway.com.br/';
        }, 3000);

      } catch (error) {
        console.error('❌ Erro no cadastro:', error);
        
        // Restaurar botão
        btnSubmit.disabled = false;
        btnSubmit.querySelector('.btn-text').classList.remove('hidden');
        btnSubmit.querySelector('.btn-loading').classList.remove('active');
        
        // Mensagens de erro específicas
        if (error.message.includes('duplicate') || error.message.includes('unique')) {
          mostrarMensagem('⚠️ Este CPF ou email já está cadastrado!', 'error');
        } else if (error.message.includes('network')) {
          mostrarMensagem('⚠️ Erro de conexão. Verifique sua internet.', 'error');
        } else {
          mostrarMensagem('❌ Erro ao realizar cadastro. Tente novamente.', 'error');
        }
      }
    });
  }

  // ============================================
  // FUNÇÃO AUXILIAR: MOSTRAR MENSAGEM
  // ============================================

  function mostrarMensagem(texto, tipo) {
    formMessage.textContent = texto;
    formMessage.className = 'form-message';
    
    if (tipo === 'success') {
      formMessage.classList.add('success');
    } else if (tipo === 'error') {
      formMessage.classList.add('error');
    }
    
    formMessage.classList.remove('hidden');
  }

  // ============================================
  // OPÇÃO 1: REDIRECIONAMENTO DIRETO
  // ============================================

  const btnOpcao1 = document.getElementById('btn-opcao1');
  if (btnOpcao1) {
    btnOpcao1.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'https://www.amway.com.br/';
    });
  }

});

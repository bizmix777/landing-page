// ============================================
// LANDING PAGE GLISTER - SCRIPT PRINCIPAL
// ============================================

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

  if (btnOpcao2) {
    btnOpcao2.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('✅ Botão clicado - Abrindo modal');
      abrirModal();
    });
  } else {
    console.error('❌ Botão #btn-opcao2 não encontrado!');
  }

  if (btnFecharModal) {
    btnFecharModal.addEventListener('click', function() {
      fecharModal();
    });
  }

  if (btnCancelar) {
    btnCancelar.addEventListener('click', function() {
      fecharModal();
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function() {
      fecharModal();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      fecharModal();
    }
  });

  function abrirModal() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      console.log('✅ Modal aberto');
    }
  }

  function fecharModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      limparFormulario();
      console.log('✅ Modal fechado');
    }
  }

  function limparFormulario() {
    if (form) {
      form.reset();
    }
    if (formMessage) {
      formMessage.textContent = '';
      formMessage.className = 'form-message hidden';
    }
  }

  // ============================================
  // MÁSCARAS DE ENTRADA
  // ============================================

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

  const estadoInput = document.getElementById('estado');
  if (estadoInput) {
    estadoInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.toUpperCase();
    });
  }

  // ============================================
  // BUSCAR CEP VIA API VIACEP
  // ============================================

  if (btnCep && cepInput) {
    btnCep.addEventListener('click', async function() {
      const cep = cepInput.value.replace(/\D/g, '');
      
      if (cep.length !== 8) {
        mostrarMensagem('⚠️ CEP inválido! Digite 8 dígitos.', 'error');
        return;
      }

      btnCep.disabled = true;
      const btnText = btnCep.querySelector('.btn-text');
      const btnLoading = btnCep.querySelector('.btn-loading');
      
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.classList.add('active');

      try {
        console.log('🔍 Buscando CEP:', cep);
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          mostrarMensagem('⚠️ CEP não encontrado!', 'error');
          return;
        }

        const ruaInput = document.getElementById('rua');
        const bairroInput = document.getElementById('bairro');
        const cidadeInput = document.getElementById('cidade');
        const estadoInputFill = document.getElementById('estado');
        
        if (ruaInput) ruaInput.value = data.logradouro || '';
        if (bairroInput) bairroInput.value = data.bairro || '';
        if (cidadeInput) cidadeInput.value = data.localidade || '';
        if (estadoInputFill) estadoInputFill.value = data.uf || '';
        
        const numeroInput = document.getElementById('numero');
        if (numeroInput) numeroInput.focus();
        
        mostrarMensagem('✅ Endereço encontrado!', 'success');
        console.log('✅ CEP encontrado:', data);

      } catch (error) {
        console.error('❌ Erro ao buscar CEP:', error);
        mostrarMensagem('❌ Erro ao buscar CEP. Tente novamente.', 'error');
      } finally {
        btnCep.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnLoading) btnLoading.classList.remove('active');
      }
    });
  }

  // ============================================
  // SUBMIT DO FORMULÁRIO
  // ============================================

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      console.log('📝 Formulário submetido');

      if (formMessage) {
        formMessage.textContent = '';
        formMessage.className = 'form-message hidden';
      }

      const nome = document.getElementById('nome')?.value.trim();
      const cpf = document.getElementById('cpf')?.value.trim();
      const dataNascimento = document.getElementById('dataNascimento')?.value;
      const celular = document.getElementById('celular')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const senha = document.getElementById('senha')?.value;
      const cep = document.getElementById('cep')?.value.trim();
      const rua = document.getElementById('rua')?.value.trim();
      const numero = document.getElementById('numero')?.value.trim();
      const complemento = document.getElementById('complemento')?.value.trim();
      const bairro = document.getElementById('bairro')?.value.trim();
      const cidade = document.getElementById('cidade')?.value.trim();
      const estado = document.getElementById('estado')?.value.trim();

      // Validações
      if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
        mostrarMensagem('⚠️ Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
      }

      if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
        mostrarMensagem('⚠️ Por favor, complete o endereço!', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarMensagem('⚠️ Email inválido!', 'error');
        return;
      }

      if (senha.length < 6) {
        mostrarMensagem('⚠️ A senha deve ter no mínimo 6 caracteres!', 'error');
        return;
      }

      if (typeof supabase === 'undefined') {
        console.error('❌ Supabase não está definido!');
        mostrarMensagem('❌ Erro de configuração. Entre em contato com o suporte.', 'error');
        return;
      }

      // Loading
      mostrarMensagem('⏳ Processando seu cadastro...', '');
      btnSubmit.disabled = true;
      const submitText = btnSubmit.querySelector('.btn-text');
      const submitLoading = btnSubmit.querySelector('.btn-loading');
      
      if (submitText) submitText.classList.add('hidden');
      if (submitLoading) submitLoading.classList.add('active');

      try {
        console.log('💾 Salvando no banco de dados...');
        
        // ============================================
        // ✅ NOMES DE COLUNAS CORRIGIDOS
        // ============================================
        const { data: result, error } = await supabase
          .from('clientes')
          .insert([{
            nome_completo: nome,
            cpf: cpf,
            data_nascimento: dataNascimento,
            celular: celular,
            email: email,
            senha_hash: senha,
            cep: cep,
            endereco_rua: rua,
            endereco_numero: numero,
            endereco_complemento: complemento,
            endereco_bairro: bairro,
            endereco_cidade: cidade,
            endereco_estado: estado
          }])
          .select();

        if (error) {
          throw error;
        }

        console.log('✅ Cliente cadastrado:', result);
        
        // Enviar email
        try {
          console.log('📧 Enviando emails...');
          
          const emailResponse = await supabase.functions.invoke('email-cadastro-cliente-amway', {
            body: {
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
            }
          });
          
          console.log('✅ Email enviado:', emailResponse);
        } catch (emailError) {
          console.error('⚠️ Erro ao enviar email (não crítico):', emailError);
        }
        
        mostrarMensagem('✅ Cadastro realizado com sucesso! Redirecionando...', 'success');

        form.reset();

        setTimeout(() => {
          window.location.href = 'https://www.amway.com.br/';
        }, 3000);

      } catch (error) {
        console.error('❌ Erro no cadastro:', error);
        
        btnSubmit.disabled = false;
        if (submitText) submitText.classList.remove('hidden');
        if (submitLoading) submitLoading.classList.remove('active');
        
        if (error.message && (error.message.includes('duplicate') || error.message.includes('unique'))) {
          mostrarMensagem('⚠️ Este CPF ou email já está cadastrado!', 'error');
        } else if (error.message && error.message.includes('network')) {
          mostrarMensagem('⚠️ Erro de conexão. Verifique sua internet.', 'error');
        } else {
          mostrarMensagem('❌ Erro ao realizar cadastro. Tente novamente.', 'error');
        }
      }
    });
  }

  function mostrarMensagem(texto, tipo) {
    if (!formMessage) return;
    
    formMessage.textContent = texto;
    formMessage.className = 'form-message';
    
    if (tipo === 'success') {
      formMessage.classList.add('success');
    } else if (tipo === 'error') {
      formMessage.classList.add('error');
    }
    
    formMessage.classList.remove('hidden');
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  console.log('🚀 Script carregado com sucesso!');
  console.log('✅ Modal encontrado:', modal ? 'SIM' : 'NÃO');
  console.log('✅ Botão Opção 2 encontrado:', btnOpcao2 ? 'SIM' : 'NÃO');
  console.log('✅ Formulário encontrado:', form ? 'SIM' : 'NÃO');
  console.log('✅ Supabase configurado:', typeof supabase !== 'undefined' ? 'SIM' : 'NÃO');

});

// ============================================
// LANDING PAGE GLISTER - SCRIPT PRINCIPAL
// Inclui: Modal Clientes + Modal Empreendedores
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // ELEMENTOS DO DOM - MODAL CLIENTES
  // ============================================
  
  const modalCliente = document.getElementById('cadastroModal');
  const modalOverlayCliente = modalCliente?.querySelector('.modal-overlay');
  const btnOpcao2 = document.getElementById('btn-opcao2');
  const btnFecharModalCliente = modalCliente?.querySelector('.modal-close');
  const btnCancelarCliente = document.getElementById('btnCancelar');
  const formCliente = document.getElementById('cadastroForm');
  const formMessageCliente = document.getElementById('formMessage');
  const btnCepCliente = document.getElementById('btnBuscarCep');
  const btnSubmitCliente = document.getElementById('btnSubmit');

  // ============================================
  // ELEMENTOS DO DOM - MODAL EMPREENDEDOR
  // ============================================
  
  const modalEmpreendedor = document.getElementById('cadastroEmpreendedorModal');
  const modalOverlayEmpreendedor = modalEmpreendedor?.querySelector('.modal-overlay');
  const btnOpcao1 = document.getElementById('btn-opcao1');
  const btnFecharModalEmpreendedor = modalEmpreendedor?.querySelector('.modal-close-empreendedor');
  const btnCancelarEmpreendedor = document.getElementById('btnCancelarEmp');
  const formEmpreendedor = document.getElementById('cadastroEmpreendedorForm');
  const formMessageEmpreendedor = document.getElementById('formMessageEmp');
  const btnCepEmpreendedor = document.getElementById('btnBuscarCepEmp');
  const btnSubmitEmpreendedor = document.getElementById('btnSubmitEmp');

  // ============================================
  // FUNÇÕES: ABRIR E FECHAR MODAIS
  // ============================================

  // MODAL CLIENTES
  if (btnOpcao2) {
    btnOpcao2.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('✅ Botão CLIENTE clicado - Abrindo modal');
      abrirModalCliente();
    });
  }

  if (btnFecharModalCliente) {
    btnFecharModalCliente.addEventListener('click', fecharModalCliente);
  }

  if (btnCancelarCliente) {
    btnCancelarCliente.addEventListener('click', fecharModalCliente);
  }

  if (modalOverlayCliente) {
    modalOverlayCliente.addEventListener('click', fecharModalCliente);
  }

  function abrirModalCliente() {
    if (modalCliente) {
      modalCliente.classList.add('active');
      document.body.style.overflow = 'hidden';
      console.log('✅ Modal CLIENTE aberto');
    }
  }

  function fecharModalCliente() {
    if (modalCliente) {
      modalCliente.classList.remove('active');
      document.body.style.overflow = '';
      limparFormularioCliente();
      console.log('✅ Modal CLIENTE fechado');
    }
  }

  function limparFormularioCliente() {
    if (formCliente) formCliente.reset();
    if (formMessageCliente) {
      formMessageCliente.textContent = '';
      formMessageCliente.className = 'form-message hidden';
    }
  }

  // MODAL EMPREENDEDOR
  if (btnOpcao1) {
    btnOpcao1.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('✅ Botão EMPREENDEDOR clicado - Abrindo modal');
      abrirModalEmpreendedor();
    });
  }

  if (btnFecharModalEmpreendedor) {
    btnFecharModalEmpreendedor.addEventListener('click', fecharModalEmpreendedor);
  }

  if (btnCancelarEmpreendedor) {
    btnCancelarEmpreendedor.addEventListener('click', fecharModalEmpreendedor);
  }

  if (modalOverlayEmpreendedor) {
    modalOverlayEmpreendedor.addEventListener('click', fecharModalEmpreendedor);
  }

  function abrirModalEmpreendedor() {
    if (modalEmpreendedor) {
      modalEmpreendedor.classList.add('active');
      document.body.style.overflow = 'hidden';
      console.log('✅ Modal EMPREENDEDOR aberto');
    }
  }

  function fecharModalEmpreendedor() {
    if (modalEmpreendedor) {
      modalEmpreendedor.classList.remove('active');
      document.body.style.overflow = '';
      limparFormularioEmpreendedor();
      console.log('✅ Modal EMPREENDEDOR fechado');
    }
  }

  function limparFormularioEmpreendedor() {
    if (formEmpreendedor) formEmpreendedor.reset();
    if (formMessageEmpreendedor) {
      formMessageEmpreendedor.textContent = '';
      formMessageEmpreendedor.className = 'form-message hidden';
    }
  }

  // Fechar com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (modalCliente?.classList.contains('active')) {
        fecharModalCliente();
      }
      if (modalEmpreendedor?.classList.contains('active')) {
        fecharModalEmpreendedor();
      }
    }
  });

  // ============================================
  // MÁSCARAS DE ENTRADA - CLIENTES
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
  // MÁSCARAS DE ENTRADA - EMPREENDEDOR
  // ============================================

  const cpfInputEmp = document.getElementById('cpfEmp');
  if (cpfInputEmp) {
    cpfInputEmp.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
      }
    });
    
    // Validar CPF ao sair do campo
    cpfInputEmp.addEventListener('blur', function(e) {
      const cpf = e.target.value.replace(/\D/g, '');
      if (cpf.length === 11) {
        if (!validarCPF(cpf)) {
          mostrarMensagemEmpreendedor('⚠️ CPF inválido! Verifique os números digitados.', 'error');
          e.target.focus();
        }
      }
    });
  }

  const celularInputEmp = document.getElementById('celularEmp');
  if (celularInputEmp) {
    celularInputEmp.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      // Adiciona +55 automaticamente
      if (value.length > 0 && !value.startsWith('55')) {
        value = '55' + value;
      }
      
      if (value.length <= 13) {
        // Formato: +55 (11) 99999-9999
        value = value.replace(/^(\d{2})(\d{2})(\d)/, '+$1 ($2) $3');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
      }
    });
  }

  const cepInputEmp = document.getElementById('cepEmp');
  if (cepInputEmp) {
    cepInputEmp.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 8) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
      }
    });
  }

  // ============================================
  // VALIDAÇÃO DE CPF
  // ============================================

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11) return false;
    
    // Verifica sequências iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Valida dígitos verificadores
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

  // ============================================
  // BUSCAR CEP - CLIENTES
  // ============================================

  if (btnCepCliente && cepInput) {
    btnCepCliente.addEventListener('click', async function() {
      const cep = cepInput.value.replace(/\D/g, '');
      
      if (cep.length !== 8) {
        mostrarMensagemCliente('⚠️ CEP inválido! Digite 8 dígitos.', 'error');
        return;
      }

      btnCepCliente.disabled = true;
      const btnText = btnCepCliente.querySelector('.btn-text');
      const btnLoading = btnCepCliente.querySelector('.btn-loading');
      
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.classList.add('active');

      try {
        console.log('🔍 Buscando CEP:', cep);
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          mostrarMensagemCliente('⚠️ CEP não encontrado!', 'error');
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
        
        mostrarMensagemCliente('✅ Endereço encontrado!', 'success');
        console.log('✅ CEP encontrado:', data);

      } catch (error) {
        console.error('❌ Erro ao buscar CEP:', error);
        mostrarMensagemCliente('❌ Erro ao buscar CEP. Tente novamente.', 'error');
      } finally {
        btnCepCliente.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnLoading) btnLoading.classList.remove('active');
      }
    });
  }

  // ============================================
  // BUSCAR CEP - EMPREENDEDOR
  // ============================================

  if (btnCepEmpreendedor && cepInputEmp) {
    btnCepEmpreendedor.addEventListener('click', async function() {
      const cep = cepInputEmp.value.replace(/\D/g, '');
      
      if (cep.length !== 8) {
        mostrarMensagemEmpreendedor('⚠️ CEP inválido! Digite 8 dígitos.', 'error');
        return;
      }

      btnCepEmpreendedor.disabled = true;
      const btnText = btnCepEmpreendedor.querySelector('.btn-text');
      const btnLoading = btnCepEmpreendedor.querySelector('.btn-loading');
      
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.classList.add('active');

      try {
        console.log('🔍 Buscando CEP:', cep);
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          mostrarMensagemEmpreendedor('⚠️ CEP não encontrado!', 'error');
          return;
        }

        const estadoSelect = document.getElementById('estadoEmp');
        const cidadeInput = document.getElementById('cidadeEmp');
        const bairroInput = document.getElementById('bairroEmp');
        const ruaInput = document.getElementById('ruaEmp');
        
        if (estadoSelect) estadoSelect.value = data.uf || '';
        if (cidadeInput) cidadeInput.value = data.localidade || '';
        if (bairroInput) bairroInput.value = data.bairro || '';
        if (ruaInput) ruaInput.value = data.logradouro || '';
        
        const numeroInput = document.getElementById('numeroEmp');
        if (numeroInput) numeroInput.focus();
        
        mostrarMensagemEmpreendedor('✅ Endereço encontrado!', 'success');
        console.log('✅ CEP encontrado:', data);

      } catch (error) {
        console.error('❌ Erro ao buscar CEP:', error);
        mostrarMensagemEmpreendedor('❌ Erro ao buscar CEP. Tente novamente.', 'error');
      } finally {
        btnCepEmpreendedor.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnLoading) btnLoading.classList.remove('active');
      }
    });
  }

  // ============================================
  // SUBMIT FORMULÁRIO - CLIENTES
  // ============================================

  if (formCliente) {
    formCliente.addEventListener('submit', async function(e) {
      e.preventDefault();

      console.log('📝 Formulário CLIENTE submetido');

      if (formMessageCliente) {
        formMessageCliente.textContent = '';
        formMessageCliente.className = 'form-message hidden';
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
        mostrarMensagemCliente('⚠️ Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
      }

      if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
        mostrarMensagemCliente('⚠️ Por favor, complete o endereço!', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarMensagemCliente('⚠️ Email inválido!', 'error');
        return;
      }

      if (senha.length < 6) {
        mostrarMensagemCliente('⚠️ A senha deve ter no mínimo 6 caracteres!', 'error');
        return;
      }

      if (typeof supabase === 'undefined') {
        console.error('❌ Supabase não está definido!');
        mostrarMensagemCliente('❌ Erro de configuração. Entre em contato com o suporte.', 'error');
        return;
      }

      // Loading
      mostrarMensagemCliente('⏳ Processando seu cadastro...', '');
      btnSubmitCliente.disabled = true;
      const submitText = btnSubmitCliente.querySelector('.btn-text');
      const submitLoading = btnSubmitCliente.querySelector('.btn-loading');
      
      if (submitText) submitText.classList.add('hidden');
      if (submitLoading) submitLoading.classList.add('active');

      try {
        console.log('💾 Salvando CLIENTE no banco de dados...');
        
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
        
        mostrarMensagemCliente('✅ Cadastro realizado com sucesso! Redirecionando...', 'success');

        formCliente.reset();

        setTimeout(() => {
          window.location.href = 'https://www.amway.com.br/';
        }, 3000);

      } catch (error) {
        console.error('❌ Erro no cadastro CLIENTE:', error);
        
        btnSubmitCliente.disabled = false;
        if (submitText) submitText.classList.remove('hidden');
        if (submitLoading) submitLoading.classList.remove('active');
        
        if (error.message && (error.message.includes('duplicate') || error.message.includes('unique'))) {
          mostrarMensagemCliente('⚠️ Este CPF ou email já está cadastrado!', 'error');
        } else if (error.message && error.message.includes('network')) {
          mostrarMensagemCliente('⚠️ Erro de conexão. Verifique sua internet.', 'error');
        } else {
          mostrarMensagemCliente('❌ Erro ao realizar cadastro. Tente novamente.', 'error');
        }
      }
    });
  }

  // ============================================
  // SUBMIT FORMULÁRIO - EMPREENDEDOR
  // ============================================

  if (formEmpreendedor) {
    formEmpreendedor.addEventListener('submit', async function(e) {
      e.preventDefault();

      console.log('📝 Formulário EMPREENDEDOR submetido');

      if (formMessageEmpreendedor) {
        formMessageEmpreendedor.textContent = '';
        formMessageEmpreendedor.className = 'form-message hidden';
      }

      const nome = document.getElementById('nomeEmp')?.value.trim();
      const cpf = document.getElementById('cpfEmp')?.value.trim();
      const dataNascimento = document.getElementById('dataNascimentoEmp')?.value;
      const celular = document.getElementById('celularEmp')?.value.trim();
      const email = document.getElementById('emailEmp')?.value.trim();
      const senha = document.getElementById('senhaEmp')?.value;
      
      // Kit selecionado
      const kitSelecionado = document.querySelector('input[name="tipoKit"]:checked');
      const tipoKit = kitSelecionado?.value;
      const valorKit = kitSelecionado?.dataset.valor;
      
      const cep = document.getElementById('cepEmp')?.value.trim();
      const estado = document.getElementById('estadoEmp')?.value;
      const cidade = document.getElementById('cidadeEmp')?.value.trim();
      const bairro = document.getElementById('bairroEmp')?.value.trim();
      const rua = document.getElementById('ruaEmp')?.value.trim();
      const numero = document.getElementById('numeroEmp')?.value.trim();
      const complemento = document.getElementById('complementoEmp')?.value.trim();

      // Validações
      if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
        mostrarMensagemEmpreendedor('⚠️ Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
      }

      // Validar CPF
      const cpfLimpo = cpf.replace(/\D/g, '');
      if (!validarCPF(cpfLimpo)) {
        mostrarMensagemEmpreendedor('⚠️ CPF inválido! Verifique os números digitados.', 'error');
        return;
      }

      if (!tipoKit || !valorKit) {
        mostrarMensagemEmpreendedor('⚠️ Por favor, selecione um kit!', 'error');
        return;
      }

      if (!cep || !estado || !cidade || !bairro || !rua || !numero) {
        mostrarMensagemEmpreendedor('⚠️ Por favor, complete o endereço!', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarMensagemEmpreendedor('⚠️ Email inválido!', 'error');
        return;
      }

      if (senha.length < 6) {
        mostrarMensagemEmpreendedor('⚠️ A senha deve ter no mínimo 6 caracteres!', 'error');
        return;
      }

      if (typeof supabase === 'undefined') {
        console.error('❌ Supabase não está definido!');
        mostrarMensagemEmpreendedor('❌ Erro de configuração. Entre em contato com o suporte.', 'error');
        return;
      }

      // Loading
      mostrarMensagemEmpreendedor('⏳ Processando seu cadastro...', '');
      btnSubmitEmpreendedor.disabled = true;
      const submitText = btnSubmitEmpreendedor.querySelector('.btn-text');
      const submitLoading = btnSubmitEmpreendedor.querySelector('.btn-loading');
      
      if (submitText) submitText.classList.add('hidden');
      if (submitLoading) submitLoading.classList.add('active');

      try {
        console.log('💾 Salvando EMPREENDEDOR no banco de dados...');
        console.log('📦 Kit selecionado:', tipoKit, '- Valor:', valorKit);
        
        const { data: result, error } = await supabase
          .from('empreendedores_amway')
          .insert([{
            nome_completo: nome,
            cpf: cpf,
            data_nascimento: dataNascimento,
            celular: celular,
            email: email,
            senha_hash: senha,
            tipo_kit: tipoKit,
            valor_kit: parseFloat(valorKit),
            cep: cep,
            endereco_estado: estado,
            endereco_cidade: cidade,
            endereco_bairro: bairro,
            endereco_rua: rua,
            endereco_numero: numero,
            endereco_complemento: complemento,
            patrocinador_nome: 'Henrique Gomes da Silva',
            patrocinador_codigo: '3109505702'
          }])
          .select();

        if (error) {
          throw error;
        }

        console.log('✅ Empreendedor cadastrado:', result);
        
        mostrarMensagemEmpreendedor('✅ Cadastro realizado com sucesso! Bem-vindo ao time Amway! 🎉', 'success');

        formEmpreendedor.reset();

        setTimeout(() => {
          window.location.href = 'https://www.amway.com.br/';
        }, 3000);

      } catch (error) {
        console.error('❌ Erro no cadastro EMPREENDEDOR:', error);
        
        btnSubmitEmpreendedor.disabled = false;
        if (submitText) submitText.classList.remove('hidden');
        if (submitLoading) submitLoading.classList.remove('active');
        
        if (error.message && (error.message.includes('duplicate') || error.message.includes('unique'))) {
          mostrarMensagemEmpreendedor('⚠️ Este CPF ou email já está cadastrado!', 'error');
        } else if (error.message && error.message.includes('network')) {
          mostrarMensagemEmpreendedor('⚠️ Erro de conexão. Verifique sua internet.', 'error');
        } else {
          mostrarMensagemEmpreendedor('❌ Erro ao realizar cadastro. Tente novamente.', 'error');
        }
      }
    });
  }

  // ============================================
  // FUNÇÕES DE MENSAGENS
  // ============================================

  function mostrarMensagemCliente(texto, tipo) {
    if (!formMessageCliente) return;
    
    formMessageCliente.textContent = texto;
    formMessageCliente.className = 'form-message';
    
    if (tipo === 'success') {
      formMessageCliente.classList.add('success');
    } else if (tipo === 'error') {
      formMessageCliente.classList.add('error');
    }
    
    formMessageCliente.classList.remove('hidden');
    formMessageCliente.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function mostrarMensagemEmpreendedor(texto, tipo) {
    if (!formMessageEmpreendedor) return;
    
    formMessageEmpreendedor.textContent = texto;
    formMessageEmpreendedor.className = 'form-message';
    
    if (tipo === 'success') {
      formMessageEmpreendedor.classList.add('success');
    } else if (tipo === 'error') {
      formMessageEmpreendedor.classList.add('error');
    }
    
    formMessageEmpreendedor.classList.remove('hidden');
    formMessageEmpreendedor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ============================================
  // LOG INICIAL
  // ============================================

  console.log('🚀 Script carregado com sucesso!');
  console.log('✅ Modal CLIENTE encontrado:', modalCliente ? 'SIM' : 'NÃO');
  console.log('✅ Modal EMPREENDEDOR encontrado:', modalEmpreendedor ? 'SIM' : 'NÃO');
  console.log('✅ Botão Opção 1 encontrado:', btnOpcao1 ? 'SIM' : 'NÃO');
  console.log('✅ Botão Opção 2 encontrado:', btnOpcao2 ? 'SIM' : 'NÃO');
  console.log('✅ Supabase configurado:', typeof supabase !== 'undefined' ? 'SIM' : 'NÃO');

});

// ============================================
// LANDING PAGE GLISTER - SCRIPT PRINCIPAL
// 3 OPÇÕES: Compra Simples + Cliente VIP + Empreendedor
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  console.log('🚀 Script iniciado! v4');
  
  // ============================================
  // ELEMENTOS DO DOM - MODAL CLIENTE VIP
  // ============================================
  
  const modalCliente = document.getElementById('cadastroModalCliente');
  const modalOverlayCliente = modalCliente?.querySelector('.modal-overlay');
  const btnOpcaoCliente = document.getElementById('btn-opcao-cliente');
  const btnFecharModalCliente = modalCliente?.querySelector('.modal-close-cliente');
  const btnCancelarCliente = document.getElementById('btnCancelarCliente');
  const formCliente = document.getElementById('cadastroFormCliente');
  const formMessageCliente = document.getElementById('formMessageCliente');
  const btnCepCliente = document.getElementById('btnBuscarCepCliente');
  const btnSubmitCliente = document.getElementById('btnSubmitCliente');

  // ============================================
  // ELEMENTOS DO DOM - MODAL EMPREENDEDOR
  // ============================================
  
  const modalEmpreendedor = document.getElementById('cadastroModalEmpreendedor');
  const modalOverlayEmpreendedor = modalEmpreendedor?.querySelector('.modal-overlay');
  const btnOpcaoEmpreendedor = document.getElementById('btn-opcao-empreendedor');
  const btnFecharModalEmpreendedor = modalEmpreendedor?.querySelector('.modal-close-empreendedor');
  const btnCancelarEmpreendedor = document.getElementById('btnCancelarEmp');
  const formEmpreendedor = document.getElementById('cadastroFormEmpreendedor');
  const formMessageEmpreendedor = document.getElementById('formMessageEmp');
  const btnCepEmpreendedor = document.getElementById('btnBuscarCepEmp');
  const btnSubmitEmpreendedor = document.getElementById('btnSubmitEmp');

  console.log('✅ Modal Cliente encontrado:', modalCliente ? 'SIM' : 'NÃO');
  console.log('✅ Modal Empreendedor encontrado:', modalEmpreendedor ? 'SIM' : 'NÃO');
  console.log('✅ Botão Cliente encontrado:', btnOpcaoCliente ? 'SIM' : 'NÃO');
  console.log('✅ Botão Empreendedor encontrado:', btnOpcaoEmpreendedor ? 'SIM' : 'NÃO');

  // ============================================
  // FUNÇÕES: ABRIR E FECHAR MODAIS - CLIENTE
  // ============================================

  if (btnOpcaoCliente) {
    btnOpcaoCliente.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('✅ Botão CLIENTE VIP clicado');
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

  // ============================================
  // FUNÇÕES: ABRIR E FECHAR MODAIS - EMPREENDEDOR
  // ============================================

  if (btnOpcaoEmpreendedor) {
    btnOpcaoEmpreendedor.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('✅ Botão EMPREENDEDOR clicado');
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
  // MÁSCARAS DE ENTRADA - CLIENTE
  // ============================================

  const cpfInputCliente = document.getElementById('cpfCliente');
  if (cpfInputCliente) {
    cpfInputCliente.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
      }
    });
  }

  const celularInputCliente = document.getElementById('celularCliente');
  if (celularInputCliente) {
    celularInputCliente.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
      }
    });
  }

  const cepInputCliente = document.getElementById('cepCliente');
  if (cepInputCliente) {
    cepInputCliente.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 8) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
      }
    });
  }

  const estadoInputCliente = document.getElementById('estadoCliente');
  if (estadoInputCliente) {
    estadoInputCliente.addEventListener('input', function(e) {
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
    
    // Validar CPF ao sair do campo (SEM TRAVAR)
    cpfInputEmp.addEventListener('blur', function(e) {
      const cpf = e.target.value.replace(/\D/g, '');
      if (cpf.length === 11) {
        if (!validarCPF(cpf)) {
          mostrarMensagemEmpreendedor('⚠️ CPF inválido! Verifique os números.', 'error');
        } else {
          if (formMessageEmpreendedor && formMessageEmpreendedor.classList.contains('error')) {
            formMessageEmpreendedor.textContent = '';
            formMessageEmpreendedor.className = 'form-message hidden';
          }
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
  // MÁSCARAS E NAVEGAÇÃO - DATA DE NASCIMENTO (EMPREENDEDOR)
  // ============================================

  const diaInputEmp = document.getElementById('diaEmp');
  const mesInputEmp = document.getElementById('mesEmp');
  const anoInputEmp = document.getElementById('anoEmp');

  // Auto-avançar para o próximo campo
  if (diaInputEmp && mesInputEmp) {
    diaInputEmp.addEventListener('input', function(e) {
      if (e.target.value.length === 2) {
        mesInputEmp.focus();
      }
    });
  }

  if (mesInputEmp && anoInputEmp) {
    mesInputEmp.addEventListener('input', function(e) {
      if (e.target.value.length === 2) {
        anoInputEmp.focus();
      }
    });
  }

  // Limitar dígitos
  if (diaInputEmp) {
    diaInputEmp.addEventListener('input', function(e) {
      if (e.target.value.length > 2) {
        e.target.value = e.target.value.slice(0, 2);
      }
    });
  }

  if (mesInputEmp) {
    mesInputEmp.addEventListener('input', function(e) {
      if (e.target.value.length > 2) {
        e.target.value = e.target.value.slice(0, 2);
      }
    });
  }

  if (anoInputEmp) {
    anoInputEmp.addEventListener('input', function(e) {
      if (e.target.value.length > 4) {
        e.target.value = e.target.value.slice(0, 4);
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
  // BUSCAR CEP - CLIENTE
  // ============================================

  if (btnCepCliente && cepInputCliente) {
    btnCepCliente.addEventListener('click', async function() {
      const cep = cepInputCliente.value.replace(/\D/g, '');
      
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
        console.log('🔍 Buscando CEP Cliente:', cep);
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          mostrarMensagemCliente('⚠️ CEP não encontrado!', 'error');
          return;
        }

        const ruaInput = document.getElementById('ruaCliente');
        const bairroInput = document.getElementById('bairroCliente');
        const cidadeInput = document.getElementById('cidadeCliente');
        const estadoInput = document.getElementById('estadoCliente');
        
        if (ruaInput) ruaInput.value = data.logradouro || '';
        if (bairroInput) bairroInput.value = data.bairro || '';
        if (cidadeInput) cidadeInput.value = data.localidade || '';
        if (estadoInput) estadoInput.value = data.uf || '';
        
        const numeroInput = document.getElementById('numeroCliente');
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
        console.log('🔍 Buscando CEP Empreendedor:', cep);
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          mostrarMensagemEmpreendedor('⚠️ CEP não encontrado!', 'error');
          return;
        }

        const estadoSelect = document.getElementById('estadoEmpEnd');
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
  // SUBMIT FORMULÁRIO - CLIENTE VIP
  // ============================================

  if (formCliente) {
    formCliente.addEventListener('submit', async function(e) {
      e.preventDefault();

      console.log('📝 Formulário CLIENTE VIP submetido');

      if (formMessageCliente) {
        formMessageCliente.textContent = '';
        formMessageCliente.className = 'form-message hidden';
      }

      const nome = document.getElementById('nomeCliente')?.value.trim();
      const cpf = document.getElementById('cpfCliente')?.value.trim();
      const dataNascimento = document.getElementById('dataNascimentoCliente')?.value;
      const celular = document.getElementById('celularCliente')?.value.trim();
      const email = document.getElementById('emailCliente')?.value.trim();
      const senha = document.getElementById('senhaCliente')?.value;
      const cep = document.getElementById('cepCliente')?.value.trim();
      const rua = document.getElementById('ruaCliente')?.value.trim();
      const numero = document.getElementById('numeroCliente')?.value.trim();
      const complemento = document.getElementById('complementoCliente')?.value.trim();
      const bairro = document.getElementById('bairroCliente')?.value.trim();
      const cidade = document.getElementById('cidadeCliente')?.value.trim();
      const estado = document.getElementById('estadoCliente')?.value.trim();

      // Validações
      if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
        mostrarMensagemCliente('⚠️ Preencha todos os campos obrigatórios!', 'error');
        return;
      }

      if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
        mostrarMensagemCliente('⚠️ Complete o endereço!', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarMensagemCliente('⚠️ Email inválido!', 'error');
        return;
      }

      if (senha.length < 6) {
        mostrarMensagemCliente('⚠️ Senha deve ter no mínimo 6 caracteres!', 'error');
        return;
      }

      if (typeof supabase === 'undefined') {
        console.error('❌ Supabase não definido!');
        mostrarMensagemCliente('❌ Erro de configuração.', 'error');
        return;
      }

      // Loading
      mostrarMensagemCliente('⏳ Processando cadastro...', '');
      btnSubmitCliente.disabled = true;
      const submitText = btnSubmitCliente.querySelector('.btn-text');
      const submitLoading = btnSubmitCliente.querySelector('.btn-loading');
      
      if (submitText) submitText.classList.add('hidden');
      if (submitLoading) submitLoading.classList.add('active');

      try {
        console.log('💾 Salvando CLIENTE no banco...');
        
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

        if (error) throw error;

        console.log('✅ Cliente cadastrado:', result);
        
        // Enviar emails
        console.log('📧 Enviando emails...');
        try {
          const emailResponse = await fetch('https://zofxhfbjgvpbqjtlkbbk.supabase.co/functions/v1/email-cadastro-cliente-amway', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM'
            },
            body: JSON.stringify({
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
            })
          });
          
          if (emailResponse.ok) {
            console.log('✅ Emails enviados!');
          } else {
            console.warn('⚠️ Erro ao enviar emails');
          }
        } catch (emailError) {
          console.warn('⚠️ Erro emails:', emailError);
        }
        
        mostrarMensagemCliente('✅ Cadastro realizado com sucesso! 🎉', 'success');
        formCliente.reset();

        setTimeout(() => {
          fecharModalCliente();
        }, 3000);

      } catch (error) {
        console.error('❌ Erro cadastro CLIENTE:', error);
        
        btnSubmitCliente.disabled = false;
        if (submitText) submitText.classList.remove('hidden');
        if (submitLoading) submitLoading.classList.remove('active');
        
        if (error.message && (error.message.includes('duplicate') || error.message.includes('unique'))) {
          mostrarMensagemCliente('⚠️ CPF ou email já cadastrado!', 'error');
        } else {
          mostrarMensagemCliente('❌ Erro ao cadastrar. Tente novamente.', 'error');
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
      
      // Data em 3 campos
      const dia = document.getElementById('diaEmp')?.value;
      const mes = document.getElementById('mesEmp')?.value;
      const ano = document.getElementById('anoEmp')?.value;
      
      const celular = document.getElementById('celularEmp')?.value.trim();
      const email = document.getElementById('emailEmp')?.value.trim();
      const senha = document.getElementById('senhaEmp')?.value;
      
      // Kit selecionado
      const kitSelecionado = document.querySelector('input[name="tipoKit"]:checked');
      const tipoKit = kitSelecionado?.value;
      const valorKit = kitSelecionado?.dataset.valor;
      
      const cep = document.getElementById('cepEmp')?.value.trim();
      const estado = document.getElementById('estadoEmpEnd')?.value;
      const cidade = document.getElementById('cidadeEmp')?.value.trim();
      const bairro = document.getElementById('bairroEmp')?.value.trim();
      const rua = document.getElementById('ruaEmp')?.value.trim();
      const numero = document.getElementById('numeroEmp')?.value.trim();
      const complemento = document.getElementById('complementoEmp')?.value.trim();

      // Validações
      if (!nome || !cpf || !dia || !mes || !ano || !celular || !email || !senha) {
        mostrarMensagemEmpreendedor('⚠️ Preencha todos os campos obrigatórios!', 'error');
        return;
      }

      // Validar CPF
      const cpfLimpo = cpf.replace(/\D/g, '');
      if (!validarCPF(cpfLimpo)) {
        mostrarMensagemEmpreendedor('⚠️ CPF inválido!', 'error');
        return;
      }

      // Validar data
      const diaNum = parseInt(dia);
      const mesNum = parseInt(mes);
      const anoNum = parseInt(ano);

      if (diaNum < 1 || diaNum > 31) {
        mostrarMensagemEmpreendedor('⚠️ Dia inválido (1-31)!', 'error');
        return;
      }

      if (mesNum < 1 || mesNum > 12) {
        mostrarMensagemEmpreendedor('⚠️ Mês inválido (1-12)!', 'error');
        return;
      }

      if (anoNum < 1900 || anoNum > 2010) {
        mostrarMensagemEmpreendedor('⚠️ Ano inválido (1900-2010)!', 'error');
        return;
      }

      // Montar data YYYY-MM-DD
      const mesFormatado = mesNum.toString().padStart(2, '0');
      const diaFormatado = diaNum.toString().padStart(2, '0');
      const dataNascimento = `${anoNum}-${mesFormatado}-${diaFormatado}`;

      if (!tipoKit || !valorKit) {
        mostrarMensagemEmpreendedor('⚠️ Selecione um kit!', 'error');
        return;
      }

      if (!cep || !estado || !cidade || !bairro || !rua || !numero) {
        mostrarMensagemEmpreendedor('⚠️ Complete o endereço!', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        mostrarMensagemEmpreendedor('⚠️ Email inválido!', 'error');
        return;
      }

      if (senha.length < 6) {
        mostrarMensagemEmpreendedor('⚠️ Senha mínimo 6 caracteres!', 'error');
        return;
      }

      if (typeof supabase === 'undefined') {
        console.error('❌ Supabase não definido!');
        mostrarMensagemEmpreendedor('❌ Erro de configuração.', 'error');
        return;
      }

      // Loading
      mostrarMensagemEmpreendedor('⏳ Processando cadastro...', '');
      btnSubmitEmpreendedor.disabled = true;
      const submitText = btnSubmitEmpreendedor.querySelector('.btn-text');
      const submitLoading = btnSubmitEmpreendedor.querySelector('.btn-loading');
      
      if (submitText) submitText.classList.add('hidden');
      if (submitLoading) submitLoading.classList.add('active');

      try {
        console.log('💾 Salvando EMPREENDEDOR no banco...');
        console.log('📦 Kit:', tipoKit, '- Valor:', valorKit);
        console.log('📅 Data:', dataNascimento);
        
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

        if (error) throw error;

        console.log('✅ Empreendedor cadastrado:', result);
        
        // Enviar emails
        console.log('📧 Enviando emails...');
        try {
          const emailResponse = await fetch('https://zofxhfbjgvpbqjtlkbbk.supabase.co/functions/v1/email-cadastro-empreendedor-amway', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM'
            },
            body: JSON.stringify({
              nome: nome,
              cpf: cpf,
              data_nascimento: dataNascimento,
              celular: celular,
              email: email,
              senha: senha,
              tipo_kit: tipoKit,
              valor_kit: valorKit,
              cep: cep,
              estado: estado,
              cidade: cidade,
              bairro: bairro,
              rua: rua,
              numero: numero,
              complemento: complemento,
              patrocinador_nome: 'Henrique Gomes da Silva',
              patrocinador_codigo: '3109505702'
            })
          });
          
          if (emailResponse.ok) {
            console.log('✅ Emails enviados!');
          } else {
            console.warn('⚠️ Erro ao enviar emails');
          }
        } catch (emailError) {
          console.warn('⚠️ Erro emails:', emailError);
        }
        
        mostrarMensagemEmpreendedor('✅ Cadastro realizado! Bem-vindo ao time Amway! 🎉', 'success');
        formEmpreendedor.reset();

        setTimeout(() => {
          fecharModalEmpreendedor();
        }, 3000);

      } catch (error) {
        console.error('❌ Erro cadastro EMPREENDEDOR:', error);
        
        btnSubmitEmpreendedor.disabled = false;
        if (submitText) submitText.classList.remove('hidden');
        if (submitLoading) submitLoading.classList.remove('active');
        
        if (error.message && (error.message.includes('duplicate') || error.message.includes('unique'))) {
          mostrarMensagemEmpreendedor('⚠️ CPF ou email já cadastrado!', 'error');
        } else {
          mostrarMensagemEmpreendedor('❌ Erro ao cadastrar. Tente novamente.', 'error');
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
  // LOG FINAL
  // ============================================

  console.log('✅ Script carregado! v4');
  console.log('✅ Supabase:', typeof supabase !== 'undefined' ? 'OK' : 'ERRO');

});

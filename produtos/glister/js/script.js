// ============================================
// SCRIPT GLISTER v7 - À PROVA DE ERROS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Script v7 Iniciado!');

  // 1. MAPEAMENTO DE ELEMENTOS (IDs ORIGINAIS DO SEU HTML)
  const modalVip = document.getElementById('cadastroModalCliente');
  const modalEmp = document.getElementById('cadastroModalEmpreendedor');
  
  // Botões de Abrir
  const btnAbrirVip = document.getElementById('btn-opcao-cliente');
  const btnAbrirEmp = document.getElementById('btn-opcao-empreendedor');

  // Botões de Fechar e Cancelar
  const botoesFechar = document.querySelectorAll('.modal-close-cliente, .modal-close-empreendedor, .modal-overlay, #btnCancelarCliente, #btnCancelarEmp');

  // ============================================
  // CONTROLE DOS MODAIS (OS CLIQUES)
  // ============================================
  
  // Abrir Cliente VIP
  btnAbrirVip?.addEventListener('click', function(e) {
    e.preventDefault();
    modalVip?.classList.add('active');
  });

  // Abrir Empreendedor
  btnAbrirEmp?.addEventListener('click', function(e) {
    e.preventDefault();
    modalEmp?.classList.add('active');
  });

  // Fechar qualquer modal
  botoesFechar.forEach(botao => {
    botao.addEventListener('click', () => {
      modalVip?.classList.remove('active');
      modalEmp?.classList.remove('active');
    });
  });

  // ============================================
  // LOGICA DE ENVIO (EMPREENDEDOR)
  // ============================================
const formEmpreendedor = document.getElementById('cadastroFormEmpreendedor');

  formEmpreendedor?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Mostra que está processando (opcional, se tiver o span no seu botão)
    const btnText = this.querySelector('.btn-text');
    const btnLoading = this.querySelector('.btn-loading');
    if(btnText) btnText.classList.add('hidden');
    if(btnLoading) btnLoading.classList.remove('hidden');

    try {
      // 1. CAPTURA DOS DADOS (Conforme seu novo HTML e Tabelas)
      const formData = {
        nome_completo: document.getElementById('nomeEmp').value,
        cpf: document.getElementById('cpfEmp').value,
        rg_numero: document.getElementById('rgEmp').value,
        rg_orgao: document.getElementById('orgaoEmp').value,
        pis_nit: document.getElementById('pisEmp').value,
        // Formata a data AAAA-MM-DD
        data_nascimento: `${document.getElementById('anoEmp').value}-${document.getElementById('mesEmp').value}-${document.getElementById('diaEmp').value}`,
        email: document.getElementById('emailEmp').value,
        celular: document.getElementById('celularEmp').value,
        tipo_kit: document.querySelector('input[name="tipoKit"]:checked')?.value || 'virtual',
        banco_nome: document.getElementById('bancoEmp').value,
        banco_agencia: document.getElementById('agenciaEmp').value,
        banco_conta: document.getElementById('contaEmp').value,
        cep: document.getElementById('cepEmp').value,
        endereco_rua: document.getElementById('ruaEmp').value,
        endereco_numero: document.getElementById('numeroEmp').value,
        endereco_bairro: document.getElementById('bairroEmp').value,
        endereco_cidade: document.getElementById('cidadeEmp').value,
        endereco_estado: document.getElementById('estadoEmp').value,
        patrocinador_codigo: '3109505702'
      };

      // 2. ENVIO PARA O SUPABASE
      const { data, error } = await _supabase
        .from('empreendedores_amway')
        .insert([formData]);

      if (error) throw error;

      // 3. SUCESSO
      mostrarMensagemEmpreendedor('✅ Cadastro realizado com sucesso!', 'success');
      this.reset();
      setTimeout(() => modalEmpreendedor.classList.remove('active'), 3000);

    } catch (error) {
      console.error('Erro:', error);
      mostrarMensagemEmpreendedor('❌ Erro ao salvar: ' + (error.message || 'Verifique sua conexão'), 'error');
    } finally {
      if(btnText) btnText.classList.remove('hidden');
      if(btnLoading) btnLoading.classList.add('hidden');
    }
  });

  // ============================================
  // LOGICA DE ENVIO (CLIENTE VIP) - SUPABASE
  // ============================================
  const formCliente = document.getElementById('cadastroFormCliente');
  const modalVip = document.getElementById('cadastroModalCliente');

  formCliente?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Feedback visual de carregamento
    const btnText = this.querySelector('.btn-text');
    const btnLoading = this.querySelector('.btn-loading');
    if(btnText) btnText.classList.add('hidden');
    if(btnLoading) btnLoading.classList.remove('hidden');

    try {
      // 1. CAPTURA DOS DADOS DO CLIENTE VIP
      const formData = {
        nome_completo: document.getElementById('nomeCliente').value,
        cpf: document.getElementById('cpfCliente').value,
        data_nascimento: document.getElementById('dataNascimentoCliente').value, // Formato date do HTML já é AAAA-MM-DD
        genero: document.getElementById('generoCliente')?.value || 'Não informado',
        email: document.getElementById('emailCliente').value,
        celular: document.getElementById('celularCliente').value,
        senha_acesso: document.getElementById('senhaCliente').value, // Amway ID
        cep: document.getElementById('cepCliente').value,
        endereco_rua: document.getElementById('ruaCliente').value,
        endereco_numero: document.getElementById('numeroCliente').value,
        endereco_complemento: document.getElementById('complementoCliente')?.value || '',
        endereco_bairro: document.getElementById('bairroCliente').value,
        endereco_cidade: document.getElementById('cidadeCliente').value,
        endereco_estado: document.getElementById('estadoCliente').value,
        patrocinador_info: 'Henrique Gomes da Silva (3109505702)'
      };

      // 2. ENVIO PARA O SUPABASE (Tabela: clientes_amway)
      const { data, error } = await _supabase
        .from('clientes_amway')
        .insert([formData]);

      if (error) throw error;

      // 3. SUCESSO
      mostrarMensagemCliente('✅ Cadastro VIP realizado com sucesso!', 'success');
      this.reset();
      
      // Fecha o modal após 3 segundos
      setTimeout(() => {
        modalVip?.classList.remove('active');
      }, 3000);

    } catch (error) {
      console.error('Erro no cadastro VIP:', error);
      mostrarMensagemCliente('❌ Erro ao salvar: ' + (error.message || 'Verifique os dados'), 'error');
    } finally {
      if(btnText) btnText.classList.remove('hidden');
      if(btnLoading) btnLoading.classList.add('hidden');
    }
  });
  
// ============================================
// FUNÇÕES DE MENSAGENS (AUXILIARES)
// ============================================

function mostrarMensagemCliente(texto, tipo) {
    const el = document.getElementById('formMessageCliente');
    if (!el) return;
    el.textContent = texto;
    el.className = `form-message ${tipo}`; // usa 'success' ou 'error'
    el.classList.remove('hidden');
}

function mostrarMensagemEmpreendedor(texto, tipo) {
    const el = document.getElementById('formMessageEmp');
    if (!el) return;
    el.textContent = texto;
    el.className = `form-message ${tipo}`;
    el.classList.remove('hidden');
}

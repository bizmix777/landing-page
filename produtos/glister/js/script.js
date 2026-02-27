// ============================================
// LANDING PAGE GLISTER - SCRIPT PRINCIPAL v6
// Versão: Envio via E-mail (mailto)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  console.log('🚀 Script iniciado! v6');
  
  // ELEMENTOS - MODAL CLIENTE VIP
  const modalCliente = document.getElementById('cadastroModalCliente');
  const btnOpcaoCliente = document.getElementById('btn-opcao-cliente');
  const btnFecharModalCliente = modalCliente?.querySelector('.modal-close-cliente');
  const formCliente = document.getElementById('cadastroFormCliente');
  const formMessageCliente = document.getElementById('formMessageCliente');

  // ELEMENTOS - MODAL EMPREENDEDOR
  const modalEmpreendedor = document.getElementById('cadastroModalEmpreendedor');
  const btnOpcaoEmpreendedor = document.getElementById('btn-opcao-empreendedor');
  const btnFecharModalEmpreendedor = modalEmpreendedor?.querySelector('.modal-close-empreendedor');
  const formEmpreendedor = document.getElementById('cadastroFormEmpreendedor');
  const formMessageEmpreendedor = document.getElementById('formMessageEmpreendedor');
  const btnCepEmpreendedor = document.getElementById('btnBuscarCepEmp');

  // ============================================
  // CONTROLE DOS MODAIS (ABRIR/FECHAR)
  // ============================================
  if (btnOpcaoCliente) btnOpcaoCliente.addEventListener('click', () => modalCliente.classList.add('active'));
  if (btnFecharModalCliente) btnFecharModalCliente.addEventListener('click', () => modalCliente.classList.remove('active'));

  if (btnOpcaoEmpreendedor) btnOpcaoEmpreendedor.addEventListener('click', () => modalEmpreendedor.classList.add('active'));
  if (btnFecharModalEmpreendedor) btnFecharModalEmpreendedor.addEventListener('click', () => modalEmpreendedor.classList.remove('active'));

  // ============================================
  // BUSCA DE CEP (VIA CEP API)
  // ============================================
  async function buscarCEP(cep, campos) {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        if (campos.rua) campos.rua.value = data.logradouro;
        if (campos.bairro) campos.bairro.value = data.bairro;
        if (campos.cidade) campos.cidade.value = data.localidade;
        if (campos.estado) campos.estado.value = data.uf;
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  }

  if (btnCepEmpreendedor) {
    btnCepEmpreendedor.addEventListener('click', () => {
      const campos = {
        rua: document.getElementById('ruaEmp'),
        bairro: document.getElementById('bairroEmp'),
        cidade: document.getElementById('cidadeEmp'),
        estado: document.getElementById('estadoEmp')
      };
      buscarCEP(document.getElementById('cepEmp').value, campos);
    });
  }

  // ============================================
  // ENVIO DO FORMULÁRIO EMPREENDEDOR (E-MAIL)
  // ============================================
  if (formEmpreendedor) {
    formEmpreendedor.addEventListener('submit', function(e) {
      e.preventDefault();
      const btnSubmit = document.getElementById('btnSubmitEmpreendedor');
      btnSubmit.disabled = true;
      btnSubmit.textContent = 'PREPARANDO E-MAIL...';

      try {
        const nome = document.getElementById('nomeEmp')?.value || "Não informado";
        const cpf = document.getElementById('cpfEmp')?.value || "Não informado";
        const email = document.getElementById('emailEmp')?.value || "Não informado";
        const zap = document.getElementById('celularEmp')?.value || "Não informado";
        const kit = document.getElementById('tipoKitEmp')?.value || "Não informado";
        const cep = document.getElementById('cepEmp')?.value || "Não informado";
        const endereco = `${document.getElementById('ruaEmp')?.value || ''}, ${document.getElementById('numeroEmp')?.value || ''} - ${document.getElementById('bairroEmp')?.value || ''}`;

        const assunto = encodeURIComponent(`Novo Empreendedor Amway: ${nome}`);
        const corpo = encodeURIComponent(
          `SOLICITAÇÃO DE CADASTRO DE EMPREENDEDOR:\n\n` +
          `Nome Completo: ${nome}\n` +
          `CPF: ${cpf}\n` +
          `WhatsApp: ${zap}\n` +
          `E-mail: ${email}\n` +
          `Kit Escolhido: ${kit}\n` +
          `Endereço: ${endereco}\n` +
          `CEP: ${cep}\n\n` +
          `-----------------------------------\n` +
          `Patrocinador: Henrique Gomes da Silva (3109505702)`
        );

        window.location.href = `mailto:contato+glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
        mostrarMensagemEmpreendedor('✅ E-mail pronto! Clique em ENVIAR na janela que abriu.', 'success');
        
        setTimeout(() => {
          modalEmpreendedor.classList.remove('active');
          btnSubmit.disabled = false;
          btnSubmit.textContent = 'FINALIZAR CADASTRO';
        }, 4000);

      } catch (error) {
        mostrarMensagemEmpreendedor('❌ Erro ao processar dados.', 'error');
        btnSubmit.disabled = false;
      }
    });
  }

  // ============================================
  // ENVIO DO FORMULÁRIO CLIENTE VIP (E-MAIL)
  // ============================================
  if (formCliente) {
    formCliente.addEventListener('submit', function(e) {
      e.preventDefault();
      const btnSubmit = document.getElementById('btnSubmitCliente');
      btnSubmit.disabled = true;
      btnSubmit.textContent = 'PREPARANDO E-MAIL...';

      try {
        const nome = document.getElementById('nomeCliente')?.value || "Não informado";
        const zap = document.getElementById('celularCliente')?.value || "Não informado";

        const assunto = encodeURIComponent(`Novo Cliente VIP: ${nome}`);
        const corpo = encodeURIComponent(
          `SOLICITAÇÃO DE CLIENTE VIP:\n\n` +
          `Nome: ${nome}\n` +
          `WhatsApp: ${zap}\n\n` +
          `-----------------------------------\n` +
          `Deseja comprar Glister com desconto.`
        );

        window.location.href = `mailto:contato+glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
        mostrarMensagemCliente('✅ E-mail pronto! Clique em ENVIAR.', 'success');
        
        setTimeout(() => {
          modalCliente.classList.remove('active');
          btnSubmit.disabled = false;
          btnSubmit.textContent = 'FINALIZAR CADASTRO';
        }, 4000);

      } catch (error) {
        btnSubmit.disabled = false;
      }
    });
  }

  // ============================================
  // FUNÇÕES AUXILIARES DE MENSAGEM
  // ============================================
  function mostrarMensagemEmpreendedor(texto, tipo) {
    if (!formMessageEmpreendedor) return;
    formMessageEmpreendedor.textContent = texto;
    formMessageEmpreendedor.className = `form-message ${tipo}`;
    formMessageEmpreendedor.classList.remove('hidden');
  }

  function mostrarMensagemCliente(texto, tipo) {
    if (!formMessageCliente) return;
    formMessageCliente.textContent = texto;
    formMessageCliente.className = `form-message ${tipo}`;
    formMessageCliente.classList.remove('hidden');
  }

});

// ============================================
// LANDING PAGE GLISTER - SCRIPT PRINCIPAL v5
// Conectado com: public.empreendedores_amway
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  console.log('🚀 Script iniciado! v5');
  
  // ELEMENTOS - MODAL CLIENTE VIP
  const modalCliente = document.getElementById('cadastroModalCliente');
  const btnOpcaoCliente = document.getElementById('btn-opcao-cliente');
  const btnFecharModalCliente = modalCliente?.querySelector('.modal-close-cliente');
  const formCliente = document.getElementById('cadastroFormCliente');
  const formMessageCliente = document.getElementById('formMessageCliente');
  const btnCepCliente = document.getElementById('btnBuscarCepCliente');

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
  
  if (btnOpcaoCliente) {
    btnOpcaoCliente.addEventListener('click', () => modalCliente.classList.add('active'));
  }
  if (btnFecharModalCliente) {
    btnFecharModalCliente.addEventListener('click', () => modalCliente.classList.remove('active'));
  }

  if (btnOpcaoEmpreendedor) {
    btnOpcaoEmpreendedor.addEventListener('click', () => modalEmpreendedor.classList.add('active'));
  }
  if (btnFecharModalEmpreendedor) {
    btnFecharModalEmpreendedor.addEventListener('click', () => modalEmpreendedor.classList.remove('active'));
  }

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
        const email = document.getElementById('emailCliente')?.value || "Não informado";
        const whatsapp = document.getElementById('celularCliente')?.value || "Não informado";
        const cep = document.getElementById('cepCliente')?.value || "Não informado";

        const assunto = encodeURIComponent(`Novo Cliente VIP: ${nome}`);
        const corpo = encodeURIComponent(
          `SOLICITAÇÃO DE CADASTRO CLIENTE VIP:\n\n` +
          `Nome: ${nome}\n` +
          `E-mail: ${email}\n` +
          `WhatsApp: ${whatsapp}\n` +
          `CEP: ${cep}\n\n` +
          `-----------------------------------\n` +
          `Interesse: Compra com desconto Glister`
        );

        // Abre o e-mail pronto
        window.location.href = `mailto:contato+glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;

        mostrarMensagemCliente('✅ E-mail pronto! Clique em ENVIAR na sua caixa de e-mail.', 'success');
        
        setTimeout(() => {
          modalCliente.classList.remove('active');
          btnSubmit.disabled = false;
          btnSubmit.textContent = 'FINALIZAR CADASTRO';
        }, 5000);

      } catch (error) {
        mostrarMensagemCliente('❌ Erro ao preparar e-mail.', 'error');
        btnSubmit.disabled = false;
      }
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
        // Coleta os dados (usando IDs que existem no seu HTML)
        const nome = document.getElementById('nomeEmp')?.value || "Não informado";
        const cpf = document.getElementById('cpfEmp')?.value || "Não informado";
        const email = document.getElementById('emailEmp')?.value || "Não informado";
        const whatsapp = document.getElementById('celularEmp')?.value || "Não informado";
        const kit = document.getElementById('tipoKitEmp')?.value || "Não informado";
        const cep = document.getElementById('cepEmp')?.value || "Não informado";
        const rua = document.getElementById('ruaEmp')?.value || "";
        const num = document.getElementById('numeroEmp')?.value || "";

        // Monta o corpo do e-mail
        const assunto = encodeURIComponent(`Novo Cadastro Empreendedor: ${nome}`);
        const corpo = encodeURIComponent(
          `DADOS DO NOVO EMPREENDEDOR:\n\n` +
          `Nome: ${nome}\n` +
          `CPF: ${cpf}\n` +
          `E-mail: ${email}\n` +
          `WhatsApp: ${whatsapp}\n` +
          `Kit Escolhido: ${kit}\n` +
          `Endereço: ${rua}, ${num} - CEP: ${cep}\n\n` +
          `-----------------------------------\n` +
          `Enviado via Landing Page BizMix`
        );

        // Dispara o e-mail para o seu contato
        const mailtoLink = `mailto:contato+glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
        
        window.location.href = mailtoLink;

        mostrarMensagemEmpreendedor('✅ E-mail preparado! Por favor, clique em ENVIAR na sua caixa de e-mail.', 'success');
        
        setTimeout(() => {
          modalEmpreendedor.classList.remove('active');
          btnSubmit.disabled = false;
          btnSubmit.textContent = 'FINALIZAR CADASTRO';
        }, 5000);

      } catch (error) {
        console.error('Erro ao preparar e-mail:', error);
        mostrarMensagemEmpreendedor('❌ Erro ao processar. Verifique os campos.', 'error');
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'TENTAR NOVAMENTE';
      }
    });
  }

  // ============================================
  // FUNÇÕES AUXILIARES DE MENSAGEM
  // ============================================

  function mostrarMensagemEmpreendedor(texto, tipo) {
    formMessageEmpreendedor.textContent = texto;
    formMessageEmpreendedor.className = `form-message ${tipo}`;
    formMessageEmpreendedor.classList.remove('hidden');
  }

});

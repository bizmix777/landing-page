// ============================================
// LANDING PAGE GLISTER - SCRIPT PRINCIPAL v6
// ENVIO DIRETO VIA E-MAIL (SEM SUPABASE)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  console.log('🚀 Script Glister v6 Iniciado!');

  // DADOS DO PATROCINADOR (FIXO)
  const PATROCINADOR_INFO = "Henrique Gomes da Silva (Código: 3109505702)";

  // ELEMENTOS DO DOM
  const modalVip = document.getElementById('cadastroModalCliente');
  const modalEmp = document.getElementById('cadastroModalEmpreendedor');
  
  const formVip = document.getElementById('cadastroFormCliente');
  const formEmp = document.getElementById('cadastroFormEmpreendedor');

  // ============================================
  // CONTROLE DOS MODAIS (ABRIR/FECHAR)
  // ============================================
  
  document.getElementById('btn-opcao-cliente')?.addEventListener('click', () => modalVip.classList.add('active'));
  document.getElementById('btn-opcao-empreendedor')?.addEventListener('click', () => modalEmp.classList.add('active'));

  // Fechar Modais (X, Overlay ou Cancelar)
  document.querySelectorAll('.modal-close-cliente, .modal-close-empreendedor, .modal-overlay, #btnCancelarCliente, #btnCancelarEmp').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close-cliente') || el.classList.contains('modal-close-empreendedor') || el.id.includes('btnCancelar')) {
        modalVip.classList.remove('active');
        modalEmp.classList.remove('active');
      }
    });
  });

  // ============================================
  // ENVIO DO FORMULÁRIO CLIENTE VIP
  // ============================================
  
  if (formVip) {
    formVip.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const btn = document.getElementById('btnSubmitCliente');
      btn.disabled = true;

      try {
        const dados = {
          nome: document.getElementById('nomeCliente')?.value,
          cpf: document.getElementById('cpfCliente')?.value,
          nasc: document.getElementById('dataNascimentoCliente')?.value,
          genero: document.getElementById('generoCliente')?.value || "Não informado",
          whatsapp: document.getElementById('celularCliente')?.value,
          email: document.getElementById('emailCliente')?.value,
          cep: document.getElementById('cepCliente')?.value,
          rua: document.getElementById('ruaCliente')?.value,
          num: document.getElementById('numeroCliente')?.value,
          comp: document.getElementById('complementoCliente')?.value || "",
          bairro: document.getElementById('bairroCliente')?.value,
          cidade: document.getElementById('cidadeCliente')?.value,
          estado: document.getElementById('estadoCliente')?.value
        };

        const assunto = encodeURIComponent(`Novo Cliente VIP: ${dados.nome}`);
        const corpo = encodeURIComponent(
          `DADOS PARA CADASTRO CLIENTE VIP:\n\n` +
          `1. DADOS PESSOAIS:\n` +
          `Nome: ${dados.nome}\n` +
          `CPF: ${dados.cpf}\n` +
          `Data Nasc: ${dados.nasc}\n` +
          `Gênero: ${dados.genero}\n\n` +
          `2. CONTATO:\n` +
          `WhatsApp: ${dados.whatsapp}\n` +
          `E-mail: ${dados.email}\n\n` +
          `3. ENDEREÇO:\n` +
          `Rua: ${dados.rua}, Nº ${dados.num} (${dados.comp})\n` +
          `Bairro: ${dados.bairro} - CEP: ${dados.cep}\n` +
          `Cidade: ${dados.cidade}/${dados.estado}\n\n` +
          `4. PATROCINADOR:\n` +
          `${PATROCINADOR_INFO}\n`
        );

        window.location.href = `mailto:contato_glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
        
        mostrarMensagem('VIP', '✅ E-mail preparado! Por favor, clique em ENVIAR.', 'success');
        setTimeout(() => { modalVip.classList.remove('active'); btn.disabled = false; }, 4000);

      } catch (err) {
        btn.disabled = false;
        console.error(err);
      }
    });
  }

  // ============================================
  // ENVIO DO FORMULÁRIO EMPREENDEDOR
  // ============================================
  
  if (formEmp) {
    formEmp.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const btn = document.getElementById('btnSubmitEmp');
      if(btn) btn.disabled = true;

      try {
        const kit = document.querySelector('input[name="tipoKit"]:checked')?.value || "Não selecionado";
        const dataNasc = `${document.getElementById('diaEmp')?.value}/${document.getElementById('mesEmp')?.value}/${document.getElementById('anoEmp')?.value}`;

        const dados = {
          nome: document.getElementById('nomeEmp')?.value,
          cpf: document.getElementById('cpfEmp')?.value,
          rg: document.getElementById('rgEmp')?.value || "Não informado",
          orgao: document.getElementById('orgaoEmp')?.value || "Não informado",
          pis: document.getElementById('pisEmp')?.value || "Não informado",
          whatsapp: document.getElementById('celularEmp')?.value,
          email: document.getElementById('emailEmp')?.value,
          banco: document.getElementById('bancoEmp')?.value || "Não informado",
          agencia: document.getElementById('agenciaEmp')?.value || "Não informado",
          conta: document.getElementById('contaEmp')?.value || "Não informado",
          cep: document.getElementById('cepEmp')?.value,
          rua: document.getElementById('ruaEmp')?.value,
          num: document.getElementById('numeroEmp')?.value,
          bairro: document.getElementById('bairroEmp')?.value,
          cidade: document.getElementById('cidadeEmp')?.value,
          estado: document.getElementById('estadoEmp')?.value
        };

        const assunto = encodeURIComponent(`Novo Empreendedor: ${dados.nome}`);
        const corpo = encodeURIComponent(
          `DADOS PARA CADASTRO EMPREENDEDOR:\n\n` +
          `1. DADOS PESSOAIS:\n` +
          `Nome: ${dados.nome}\n` +
          `CPF: ${dados.cpf}\n` +
          `RG: ${dados.rg} (${dados.orgao})\n` +
          `Data Nasc: ${dataNasc}\n` +
          `PIS: ${dados.pis}\n\n` +
          `2. CONTATO:\n` +
          `WhatsApp: ${dados.whatsapp}\n` +
          `E-mail: ${dados.email}\n\n` +
          `3. DADOS BANCÁRIOS:\n` +
          `Banco/Ag/Conta: ${dados.banco} / ${dados.agencia} / ${dados.conta}\n\n` +
          `4. KIT E ENDEREÇO:\n` +
          `Kit: ${kit.toUpperCase()}\n` +
          `Rua: ${dados.rua}, Nº ${dados.num}\n` +
          `Bairro: ${dados.bairro} - CEP: ${dados.cep}\n` +
          `Cidade: ${dados.cidade}/${dados.estado}\n\n` +
          `5. PATROCINADOR:\n` +
          `${PATROCINADOR_INFO}\n`
        );

        window.location.href = `mailto:contato_glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
        
        mostrarMensagem('Emp', '✅ E-mail preparado! Por favor, clique em ENVIAR.', 'success');
        setTimeout(() => { modalEmp.classList.remove('active'); if(btn) btn.disabled = false; }, 4000);

      } catch (err) {
        if(btn) btn.disabled = false;
        console.error(err);
      }
    });
  }

  // ============================================
  // FUNÇÕES AUXILIARES
  // ============================================
  
  function mostrarMensagem(tipo, texto, status) {
    const el = document.getElementById(tipo === 'VIP' ? 'formMessageCliente' : 'formMessageEmp');
    if (!el) return;
    el.textContent = texto;
    el.className = `form-message ${status}`;
    el.classList.remove('hidden');
  }

});

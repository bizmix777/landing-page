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
  const formEmp = document.getElementById('cadastroFormEmpreendedor');
  formEmp?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Pegamos os valores com "|| ''" para não dar erro se o campo não existir
    const nome = document.getElementById('nomeEmp')?.value || "Não informado";
    const cpf = document.getElementById('cpfEmp')?.value || "Não informado";
    const zap = document.getElementById('celularEmp')?.value || "Não informado";
    const email = document.getElementById('emailEmp')?.value || "Não informado";
    
    // Monta o link de e-mail
    const assunto = encodeURIComponent(`Novo Empreendedor: ${nome}`);
    const corpo = encodeURIComponent(
      `DADOS DO NOVO EMPREENDEDOR:\n\n` +
      `Nome: ${nome}\n` +
      `CPF: ${cpf}\n` +
      `WhatsApp: ${zap}\n` +
      `E-mail: ${email}\n\n` +
      `Patrocinador: Henrique Gomes da Silva (3109505702)`
    );

    window.location.href = `mailto:contato_glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
  });

  // ============================================
  // LOGICA DE ENVIO (CLIENTE VIP)
  // ============================================
  const formVip = document.getElementById('cadastroFormCliente');
  formVip?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nomeCliente')?.value || "Cliente";
    const zap = document.getElementById('celularCliente')?.value || "Não informado";

    const assunto = encodeURIComponent(`Novo Cliente VIP: ${nome}`);
    const corpo = encodeURIComponent(`Solicitação Cliente VIP:\n\nNome: ${nome}\nWhatsApp: ${zap}`);

    window.location.href = `mailto:contato_glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
  });
});

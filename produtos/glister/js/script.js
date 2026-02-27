document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Script v6 (E-mail Segura) ativo');

  // Selecionar os formulários
  const formVip = document.getElementById('cadastroFormCliente');
  const formEmp = document.getElementById('cadastroFormEmpreendedor');

  // --- ENVIO DO EMPREENDEDOR ---
  if (formEmp) {
    formEmp.addEventListener('submit', function(e) {
      e.preventDefault();
      
      try {
        // O "?" garante que se o campo não existir, o erro de F12 NÃO acontece
        const nome = document.getElementById('nomeEmp')?.value || "Não informado";
        const cpf = document.getElementById('cpfEmp')?.value || "Não informado";
        const rg = document.getElementById('rgEmp')?.value || "Pendente";
        const pis = document.getElementById('pisEmp')?.value || "Pendente";
        const kit = document.querySelector('input[name="tipoKit"]:checked')?.value || "Não selecionado";
        
        // Endereço (tenta ler vários IDs possíveis para não falhar)
        const rua = document.getElementById('ruaEmp')?.value || document.getElementById('ruaCliente')?.value || "Ver no formulário";
        const num = document.getElementById('numeroEmp')?.value || document.getElementById('numeroCliente')?.value || "S/N";

        const assunto = encodeURIComponent(`Novo Empreendedor: ${nome}`);
        const corpo = encodeURIComponent(
          `DADOS PARA CADASTRO AMWAY:\n\n` +
          `NOME: ${nome}\n` +
          `CPF: ${cpf}\n` +
          `RG: ${rg}\n` +
          `PIS: ${pis}\n` +
          `KIT: ${kit.toUpperCase()}\n\n` +
          `ENDEREÇO: ${rua}, Nº ${num}\n\n` +
          `PATROCINADOR: Henrique Gomes da Silva (3109505702)`
        );

        window.location.href = `mailto:contato_glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
        
      } catch (err) {
        console.error("Erro ao montar e-mail:", err);
      }
    });
  }

  // --- ENVIO DO CLIENTE VIP ---
  if (formVip) {
    formVip.addEventListener('submit', function(e) {
      e.preventDefault();
      const nome = document.getElementById('nomeCliente')?.value || "Cliente";
      const zap = document.getElementById('celularCliente')?.value || "Não informado";
      
      const assunto = encodeURIComponent(`Novo Cliente VIP: ${nome}`);
      const corpo = encodeURIComponent(`Solicitação de Cliente VIP:\n\nNome: ${nome}\nWhatsApp: ${zap}`);
      
      window.location.href = `mailto:contato_glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
    });
  }
});

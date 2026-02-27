document.addEventListener('DOMContentLoaded', function() {
  const PATROCINADOR_INFO = "Henrique Gomes da Silva (3109505702)";

  // Elementos
  const modalVip = document.getElementById('cadastroModalCliente');
  const modalEmp = document.getElementById('cadastroModalEmpreendedor');
  const formVip = document.getElementById('cadastroFormCliente');
  const formEmp = document.getElementById('cadastroFormEmpreendedor');

  // Abrir Modais
  document.getElementById('btn-opcao-cliente')?.addEventListener('click', () => modalVip.classList.add('active'));
  document.getElementById('btn-opcao-empreendedor')?.addEventListener('click', () => modalEmp.classList.add('active'));

  // Fechar Modais
  document.querySelectorAll('.modal-close-cliente, .modal-close-empreendedor, #btnCancelarCliente, #btnCancelarEmp').forEach(btn => {
    btn.addEventListener('click', () => {
      modalVip.classList.remove('active');
      modalEmp.classList.remove('active');
    });
  });

  // ENVIO CLIENTE VIP (clientes_amway)
  if (formVip) {
    formVip.addEventListener('submit', function(e) {
      e.preventDefault();
      const dados = {
        nome: document.getElementById('nomeCliente').value,
        cpf: document.getElementById('cpfCliente').value,
        nasc: document.getElementById('dataNascimentoCliente').value,
        email: document.getElementById('emailCliente').value,
        whatsapp: document.getElementById('celularCliente').value,
        endereco: `${document.getElementById('ruaCliente').value}, ${document.getElementById('numeroCliente').value} - ${document.getElementById('bairroCliente').value}`,
        cidade: `${document.getElementById('cidadeCliente').value}/${document.getElementById('estadoCliente').value}`
      };

      const assunto = encodeURIComponent(`Novo Cliente VIP: ${dados.nome}`);
      const corpo = encodeURIComponent(
        `CADASTRO CLIENTE AMWAY:\n\n` +
        `Nome: ${dados.nome}\nCPF: ${dados.cpf}\nNasc: ${dados.nasc}\n` +
        `Email: ${dados.email}\nZap: ${dados.whatsapp}\n` +
        `Endereço: ${dados.endereco}\nCidade: ${dados.cidade}\n\n` +
        `Patrocinador: ${PATROCINADOR_INFO}`
      );

      window.location.href = `mailto:contato_glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
    });
  }

  // ENVIO EMPREENDEDOR
  if (formEmp) {
    formEmp.addEventListener('submit', function(e) {
      e.preventDefault();
      const kit = document.querySelector('input[name="tipoKit"]:checked')?.value || "Virtual";
      const dataNasc = `${document.getElementById('diaEmp').value}/${document.getElementById('mesEmp').value}/${document.getElementById('anoEmp').value}`;

      const dados = {
        nome: document.getElementById('nomeEmp').value,
        cpf: document.getElementById('cpfEmp').value,
        whatsapp: document.getElementById('celularEmp').value,
        email: document.getElementById('emailEmp').value,
        kit: kit.toUpperCase(),
        endereco: `${document.getElementById('ruaEmp').value}, ${document.getElementById('numeroEmp').value} - ${document.getElementById('bairroEmp').value}`,
        cidade: `${document.getElementById('cidadeEmp').value}/${document.getElementById('estadoEmp').value}`
      };

      const assunto = encodeURIComponent(`Novo Empreendedor: ${dados.nome}`);
      const corpo = encodeURIComponent(
        `CADASTRO EMPREENDEDOR AMWAY:\n\n` +
        `Nome: ${dados.nome}\nCPF: ${dados.cpf}\nNasc: ${dataNasc}\n` +
        `Zap: ${dados.whatsapp}\nEmail: ${dados.email}\nKit: ${dados.kit}\n` +
        `Endereço: ${dados.endereco}\nCidade: ${dados.cidade}\n\n` +
        `Patrocinador: ${PATROCINADOR_INFO}`
      );

      window.location.href = `mailto:contato_glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
    });
  }
});

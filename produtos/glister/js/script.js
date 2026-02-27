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
  // ENVIO DO FORMULÁRIO EMPREENDEDOR (SUPABASE)
  // ============================================

  if (formEmpreendedor) {
    formEmpreendedor.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const btnSubmit = document.getElementById('btnSubmitEmpreendedor');
      btnSubmit.disabled = true;
      btnSubmit.textContent = 'PROCESSANDO...';

      // Formata a data de nascimento: AAAA-MM-DD
      const dia = document.getElementById('diaEmp').value.padStart(2, '0');
      const mes = document.getElementById('mesEmp').value.padStart(2, '0');
      const ano = document.getElementById('anoEmp').value;
      const dataNasc = `${ano}-${mes}-${dia}`;

      const formData = {
        nome_completo: document.getElementById('nomeEmp').value,
        cpf: document.getElementById('cpfEmp').value,
        data_nascimento: dataNasc,
        celular: document.getElementById('celularEmp').value,
        email: document.getElementById('emailEmp').value,
        senha_hash: document.getElementById('senhaEmp').value, // Em produção, use hash
        tipo_kit: document.getElementById('tipoKitEmp').value,
        valor_kit: document.getElementById('tipoKitEmp').value === 'virtual' ? 197.00 : 499.00,
        cep: document.getElementById('cepEmp').value,
        endereco_rua: document.getElementById('ruaEmp').value,
        endereco_numero: document.getElementById('numeroEmp').value,
        endereco_bairro: document.getElementById('bairroEmp').value,
        endereco_cidade: document.getElementById('cidadeEmp').value,
        endereco_estado: document.getElementById('estadoEmp').value,
        endereco_complemento: document.getElementById('complementoEmp')?.value || '',
        patrocinador_nome: 'Henrique Gomes da Silva',
        patrocinador_codigo: '3109505702'
      };

      try {
        const { error } = await supabase
          .from('empreendedores_amway')
          .insert([formData]);

        if (error) throw error;

        mostrarMensagemEmpreendedor('✅ Cadastro realizado com sucesso! Verifique seu e-mail.', 'success');
        formEmpreendedor.reset();
        setTimeout(() => modalEmpreendedor.classList.remove('active'), 3000);

      } catch (error) {
        console.error('Erro:', error);
        mostrarMensagemEmpreendedor('❌ Erro: ' + (error.message || 'Tente novamente.'), 'error');
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'FINALIZAR CADASTRO';
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

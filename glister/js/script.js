// ============================================
// LANDING PAGE GLISTER - SCRIPT PRINCIPAL
// ============================================
// IMPORTANTE: Este script depende de supabase-config.js
// Certifique-se de que ambos estão carregados no HTML

document.addEventListener('DOMContentLoaded', function() {
  
  // Elementos do DOM
  const modal = document.getElementById('cadastroModal');
  const btnOpcao2 = document.getElementById('btn-opcao2');
  const closeModal = document.querySelector('.close-modal');
  const form = document.getElementById('cadastroForm');
  const formMessage = document.getElementById('formMessage');
  const btnCep = document.getElementById('btnBuscarCep');

  // Abrir modal ao clicar na Opção 2
  if (btnOpcao2) {
    btnOpcao2.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'flex';
    });
  }

  // Fechar modal
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  // Fechar modal ao clicar fora
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // ============================================
  // MÁSCARAS DE ENTRADA
  // ============================================

  // Máscara CPF
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

  // Máscara Celular
  const celularInput = document.getElementById('celular');
  if (celularInput) {
    celularInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '$1 $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
      }
    });
  }

  // Máscara CEP
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

  // ============================================
  // BUSCAR CEP
  // ============================================

  if (btnCep) {
    btnCep.addEventListener('click', async function() {
      const cep = cepInput.value.replace(/\D/g, '');
      
      if (cep.length !== 8) {
        alert('CEP inválido! Digite 8 dígitos.');
        return;
      }

      btnCep.textContent = 'Buscando...';
      btnCep.disabled = true;

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          alert('CEP não encontrado!');
          return;
        }

        // Preencher campos
        document.getElementById('rua').value = data.logradouro || '';
        document.getElementById('bairro').value = data.bairro || '';
        document.getElementById('cidade').value = data.localidade || '';
        document.getElementById('estado').value = data.uf || '';
        
        // Focar no número
        document.getElementById('numero').focus();

      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar CEP. Tente novamente.');
      } finally {
        btnCep.textContent = 'Buscar';
        btnCep.disabled = false;
      }
    });
  }

  // ============================================
  // SUBMIT DO FORMULÁRIO
  // ============================================

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Limpar mensagens anteriores
      formMessage.textContent = '';
      formMessage.className = 'form-message';

      // Pegar valores do formulário
      const nome = document.getElementById('nome').value.trim();
      const cpf = document.getElementById('cpf').value.trim();
      const dataNascimento = document.getElementById('dataNascimento').value;
      const celular = document.getElementById('celular').value.trim();
      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('senha').value;
      const cep = document.getElementById('cep').value.trim();
      const rua = document.getElementById('rua').value.trim();
      const numero = document.getElementById('numero').value.trim();
      const complemento = document.getElementById('complemento').value.trim();
      const bairro = document.getElementById('bairro').value.trim();
      const cidade = document.getElementById('cidade').value.trim();
      const estado = document.getElementById('estado').value.trim();

      // Validações básicas
      if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
        formMessage.textContent = '⚠️ Por favor, preencha todos os campos obrigatórios!';
        formMessage.className = 'form-message error';
        return;
      }

      if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
        formMessage.textContent = '⚠️ Por favor, complete o endereço!';
        formMessage.className = 'form-message error';
        return;
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMessage.textContent = '⚠️ Email inválido!';
        formMessage.className = 'form-message error';
        return;
      }

      // Validar senha (mínimo 6 caracteres)
      if (senha.length < 6) {
        formMessage.textContent = '⚠️ A senha deve ter no mínimo 6 caracteres!';
        formMessage.className = 'form-message error';
        return;
      }

      // Mostrar loading
      formMessage.textContent = '⏳ Processando cadastro...';
      formMessage.className = 'form-message';

      try {
        // Inserir cliente no banco de dados
        const { data: result, error } = await supabase
          .from('clientes')
          .insert([{
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
          }])
          .select();

        if (error) {
          throw error;
        }

        console.log('✅ Cliente cadastrado:', result);
        
        // Enviar email via Edge Function
        try {
          const emailResponse = await supabaseFunction('email-cadastro-cliente-amway', {
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
          });
          
          console.log('✅ Email enviado:', emailResponse);
        } catch (emailError) {
          console.error('⚠️ Erro ao enviar email:', emailError);
          // Não bloqueia o cadastro se o email falhar
        }
        
        // Sucesso!
        formMessage.textContent = '✅ Cadastro realizado com sucesso! Redirecionando para finalizar a compra...';
        formMessage.className = 'form-message success';

        // Limpar formulário
        form.reset();

        // Redirecionar após 3 segundos
        setTimeout(() => {
          window.location.href = 'https://www.amway.com.br/';
        }, 3000);

      } catch (error) {
        console.error('❌ Erro no cadastro:', error);
        
        // Mensagens de erro específicas
        if (error.message.includes('duplicate')) {
          formMessage.textContent = '⚠️ Este CPF ou email já está cadastrado!';
        } else if (error.message.includes('network')) {
          formMessage.textContent = '⚠️ Erro de conexão. Verifique sua internet.';
        } else {
          formMessage.textContent = '❌ Erro ao realizar cadastro. Tente novamente.';
        }
        
        formMessage.className = 'form-message error';
      }
    });
  }

  // ============================================
  // OPÇÃO 1: REDIRECIONAMENTO DIRETO
  // ============================================

  const btnOpcao1 = document.getElementById('btn-opcao1');
  if (btnOpcao1) {
    btnOpcao1.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'https://www.amway.com.br/';
    });
  }

});

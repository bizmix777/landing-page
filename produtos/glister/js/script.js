document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema Glister Iniciado 🚀");

    // ======================================================
    // 1. CONFIGURAÇÃO DO SUPABASE
    // ======================================================
    // Tenta pegar o cliente global ou cria um novo se necessário
    const sb = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    
    if (!sb) {
        console.error("ERRO CRÍTICO: Supabase não carregado! Verifique o supabase-config.js");
    } else {
        console.log("Supabase conectado e pronto.");
    }

    // ======================================================
    // 2. FUNÇÕES VISUAIS (ABRIR E FECHAR MODAIS)
    // ======================================================
    
    // Função genérica para abrir
    function abrirModal(idModal) {
        const modal = document.getElementById(idModal);
        if (modal) {
            modal.style.display = 'flex'; // Torna visível
            // Adiciona classe para animação (se houver CSS)
            setTimeout(() => modal.classList.add('active'), 10);
        } else {
            console.error("Modal não encontrado: " + idModal);
        }
    }

    // Função genérica para fechar
    function fecharModal(idModal) {
        const modal = document.getElementById(idModal);
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300); // Espera animação
        }
    }

    // --- CONECTANDO OS BOTÕES (AQUI ESTAVA O ERRO ANTES!) ---
    
    // Botão: Quero 30% de Desconto (Cliente VIP)
    const btnCliente = document.getElementById('btn-opcao-cliente');
    if (btnCliente) {
        btnCliente.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModal('cadastroModalCliente');
        });
    }

    // Botão: Quero Ganhar Dinheiro (Empreendedor)
    const btnEmpreendedor = document.getElementById('btn-opcao-empreendedor');
    if (btnEmpreendedor) {
        btnEmpreendedor.addEventListener('click', function(e) {
            e.preventDefault();
            abrirModal('cadastroModalEmpreendedor');
        });
    }

    // --- BOTÕES DE FECHAR (X) ---
    document.querySelectorAll('.modal-close-cliente').forEach(btn => {
        btn.addEventListener('click', () => fecharModal('cadastroModalCliente'));
    });
    
    document.querySelectorAll('.modal-close-empreendedor').forEach(btn => {
        btn.addEventListener('click', () => fecharModal('cadastroModalEmpreendedor'));
    });

    // Fechar clicando fora (no fundo escuro)
    window.onclick = function(event) {
        if (event.target.classList.contains('modal-overlay') || event.target.classList.contains('modal')) {
            event.target.style.display = "none";
            event.target.classList.remove('active');
        }
    }

    // ======================================================
    // 3. MÁSCARAS (CPF e TELEFONE)
    // ======================================================
    function aplicarMascara(input, tipo) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, "");
            
            if (tipo === 'cpf') {
                value = value.replace(/(\d{3})(\d)/, "$1.$2");
                value = value.replace(/(\d{3})(\d)/, "$1.$2");
                value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            } else if (tipo === 'tel') {
                value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
                value = value.replace(/(\d)(\d{4})$/, "$1-$2");
            }
            e.target.value = value;
        });
    }

    // Aplica máscaras se os campos existirem
    const inputCpfEmp = document.getElementById('cpfEmp');
    if (inputCpfEmp) aplicarMascara(inputCpfEmp, 'cpf');

    // Pega todos os campos de telefone/whatsapp
    const inputsTel = document.querySelectorAll('input[name="whatsapp"], input[name="celular"], input[name="telefone"]');
    inputsTel.forEach(input => aplicarMascara(input, 'tel'));


    // ======================================================
    // 4. ENVIO DE DADOS (SUPABASE)
    // ======================================================

    // --- FORMULÁRIO CLIENTE VIP ---
    const formVip = document.getElementById('form-vip');
    if (formVip) {
        formVip.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!sb) return alert("Erro de conexão. Recarregue a página.");

            const btnSubmit = formVip.querySelector('button[type="submit"]');
            if(btnSubmit) btnSubmit.textContent = "Enviando...";

            const formData = new FormData(formVip);
            const dados = {
                nome_completo: formData.get('nome'),
                email: formData.get('email'),
                celular: formData.get('whatsapp') || formData.get('telefone'),
                created_at: new Date().toISOString()
            };

            const { error } = await sb.from('clientes_amway').insert([dados]);

            if (error) {
                alert('Erro: ' + error.message);
                if(btnSubmit) btnSubmit.textContent = "Tentar Novamente";
            } else {
                alert('Parabéns! Cadastro VIP realizado com sucesso! 🎉');
                formVip.reset();
                fecharModal('cadastroModalCliente');
                if(btnSubmit) btnSubmit.textContent = "Cadastrar";
            }
        });
    }

    // --- FORMULÁRIO EMPREENDEDOR ---
    const formEmp = document.getElementById('form-empreendedor');
    if (formEmp) {
        formEmp.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!sb) return alert("Erro de conexão. Recarregue a página.");

            const btnSubmit = formEmp.querySelector('button[type="submit"]');
            if(btnSubmit) btnSubmit.textContent = "Enviando...";

            const formData = new FormData(formEmp);
            const dados = {
                nome_completo: formData.get('nome'),
                email: formData.get('email'),
                cpf: formData.get('cpf'), // Agora pega o CPF
                celular: formData.get('whatsapp') || formData.get('telefone'),
                // Campos opcionais de endereço
                endereco_cidade: formData.get('cidade'), 
                endereco_estado: formData.get('estado'),
                created_at: new Date().toISOString()
            };

            const { error } = await sb.from('empreendedores_amway').insert([dados]);

            if (error) {
                alert('Erro: ' + error.message);
                if(btnSubmit) btnSubmit.textContent = "Tentar Novamente";
            } else {
                alert('Solicitação enviada! Vamos construir esse negócio juntos. 🚀');
                formEmp.reset();
                fecharModal('cadastroModalEmpreendedor');
                if(btnSubmit) btnSubmit.textContent = "Enviar Solicitação";
            }
        });
    }
});

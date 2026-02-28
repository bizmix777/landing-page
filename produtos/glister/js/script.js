document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema Glister VIP Iniciado 🚀");

    // ======================================================
    // 1. CONFIGURAÇÃO DO SUPABASE
    // ======================================================
    const sb = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    if (!sb) console.error("ERRO CRÍTICO: Supabase não carregado!");

    // ======================================================
    // 2. MÁSCARAS (CPF, Telefone, CEP)
    // ======================================================
    function aplicarMascara(event, tipo) {
        let input = event.target;
        let value = input.value.replace(/\D/g, ""); // Remove tudo que não é número

        if (tipo === 'cpf') {
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } 
        else if (tipo === 'celular') {
            value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
            value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        }
        else if (tipo === 'cep') {
            value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        }
        
        input.value = value;
    }

    // Aplica as máscaras nos campos VIP específicos
    const cpfVipInput = document.getElementById('cpfVip');
    if(cpfVipInput) cpfVipInput.addEventListener('input', (e) => aplicarMascara(e, 'cpf'));

    const celVipInput = document.getElementById('celularCliente');
    if(celVipInput) celVipInput.addEventListener('input', (e) => aplicarMascara(e, 'celular'));

    const cepVipInput = document.getElementById('cepCliente');
    if(cepVipInput) cepVipInput.addEventListener('input', (e) => aplicarMascara(e, 'cep'));


    // ======================================================
    // 3. BUSCA DE CEP (INTEGRAÇÃO VIACEP)
    // ======================================================
    async function buscarCepVIP() {
        const cepInput = document.getElementById('cepCliente');
        const btnBusca = document.getElementById('btnBuscarCepCliente');
        
        // Efeito de carregamento
        if(btnBusca) {
            btnBusca.classList.add('loading'); // Se tiver CSS pra isso
            btnBusca.innerHTML = '⏳ Buscando...';
        }

        let cep = cepInput.value.replace(/\D/g, '');

        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (!data.erro) {
                    // Preenche os campos usando os IDs exatos do seu HTML
                    if(document.getElementById('ruaCliente')) document.getElementById('ruaCliente').value = data.logradouro;
                    if(document.getElementById('bairroCliente')) document.getElementById('bairroCliente').value = data.bairro;
                    if(document.getElementById('cidadeCliente')) document.getElementById('cidadeCliente').value = data.localidade;
                    if(document.getElementById('estadoCliente')) document.getElementById('estadoCliente').value = data.uf;
                    
                    // Foca no campo número para facilitar
                    if(document.getElementById('numeroCliente')) document.getElementById('numeroCliente').focus();
                } else {
                    alert("CEP não encontrado. Preencha o endereço manualmente.");
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                alert("Erro na busca do CEP.");
            }
        }

        // Volta o botão ao normal
        if(btnBusca) {
            btnBusca.classList.remove('loading');
            btnBusca.innerHTML = '🔍 Buscar CEP';
        }
    }

    // Dispara a busca quando sair do campo CEP ou clicar no botão
    if(cepVipInput) cepVipInput.addEventListener('blur', buscarCepVIP);
    
    const btnBuscaCep = document.getElementById('btnBuscarCepCliente');
    if(btnBuscaCep) btnBuscaCep.addEventListener('click', buscarCepVIP);


    // ======================================================
    // 4. ENVIO DO FORMULÁRIO (SUPABASE)
    // ======================================================
    const formVip = document.getElementById('form-vip');
    
    if (formVip) {
        formVip.addEventListener('submit', async function(e) {
            e.preventDefault(); // Impede recarregar a página

            // Validação básica do CPF antes de enviar
            const cpfLimpo = document.getElementById('cpfVip').value.replace(/\D/g, '');
            if (cpfLimpo.length !== 11) {
                alert("Por favor, digite um CPF válido com 11 números.");
                return;
            }

            // Botão carregando...
            const btnSubmit = document.getElementById('btnSubmitCliente');
            const textoOriginal = btnSubmit ? btnSubmit.innerHTML : 'Cadastrar';
            if(btnSubmit) btnSubmit.innerHTML = '⏳ Processando...';

            const formData = new FormData(formVip);

            // Mapeamento EXATO do HTML para a Tabela 'clientes_amway'
            // Baseado nas colunas que vimos no seu banco de dados
            const dadosParaEnviar = {
                nome_completo: formData.get('nome'),
                cpf: formData.get('cpf'), // Envia formatado ou limpo, dependendo da sua preferência
                data_nascimento: formData.get('dataNascimento'), // Novo campo!
                celular: formData.get('celular'),
                email: formData.get('email'),
                senha_hash: formData.get('senha'), // Novo campo!
                
                // Endereço
                cep: formData.get('cep'),
                endereco_rua: formData.get('rua'),
                endereco_numero: formData.get('numero'),
                endereco_complemento: formData.get('complemento'),
                endereco_bairro: formData.get('bairro'),
                endereco_cidade: formData.get('cidade'),
                endereco_estado: formData.get('estado'),
                
                created_at: new Date().toISOString()
            };

            // Envio para o Supabase
            const { error } = await sb
                .from('clientes_amway')
                .insert([dadosParaEnviar]);

            if (error) {
                console.error("Erro Supabase:", error);
                alert('Erro ao cadastrar: ' + error.message);
                if(btnSubmit) btnSubmit.innerHTML = textoOriginal;
            } else {
                alert('🎉 Parabéns! Cadastro VIP realizado com sucesso!');
                formVip.reset();
                fecharModal('cadastroModalCliente');
                if(btnSubmit) btnSubmit.innerHTML = textoOriginal;
            }
        });
    }


    // ======================================================
    // 5. FUNÇÕES DE JANELA (MODAIS)
    // ======================================================
    function abrirModal(id) {
        const m = document.getElementById(id);
        if(m) { m.style.display = 'flex'; setTimeout(()=>m.classList.add('active'), 10); }
    }
    function fecharModal(id) {
        const m = document.getElementById(id);
        if(m) { m.classList.remove('active'); setTimeout(()=>m.style.display='none', 300); }
    }

    // Botão "Quero 30% de Desconto"
    const btnAbreVip = document.getElementById('btn-opcao-cliente');
    if(btnAbreVip) btnAbreVip.onclick = (e) => { e.preventDefault(); abrirModal('cadastroModalCliente'); };
    
    // Botão Fechar (X)
    document.querySelectorAll('.modal-close-cliente').forEach(b => b.onclick = () => fecharModal('cadastroModalCliente'));
    
    // Botão Cancelar dentro do form
    const btnCancelar = document.getElementById('btnCancelarCliente');
    if(btnCancelar) btnCancelar.onclick = () => fecharModal('cadastroModalCliente');

    // Botão Empreendedor (Mantido para não quebrar, mas foco é VIP)
    const btnAbreEmp = document.getElementById('btn-opcao-empreendedor');
    if(btnAbreEmp) btnAbreEmp.onclick = (e) => { e.preventDefault(); abrirModal('cadastroModalEmpreendedor'); };
    document.querySelectorAll('.modal-close-empreendedor').forEach(b => b.onclick = () => fecharModal('cadastroModalEmpreendedor'));

});

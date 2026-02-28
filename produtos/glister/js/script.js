document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema Glister (VIP + Empreendedor) Iniciado 🚀");

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
        let value = input.value.replace(/\D/g, "");

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

    // --- Listeners VIP ---
    const cpfVip = document.getElementById('cpfVip');
    if(cpfVip) cpfVip.addEventListener('input', (e) => aplicarMascara(e, 'cpf'));
    
    const celVip = document.getElementById('celularCliente');
    if(celVip) celVip.addEventListener('input', (e) => aplicarMascara(e, 'celular'));
    
    const cepVip = document.getElementById('cepCliente');
    if(cepVip) cepVip.addEventListener('input', (e) => aplicarMascara(e, 'cep'));

    // --- Listeners EMPREENDEDOR ---
    const cpfEmp = document.getElementById('cpfEmp');
    if(cpfEmp) cpfEmp.addEventListener('input', (e) => aplicarMascara(e, 'cpf'));

    const celEmp = document.getElementById('celularEmp');
    if(celEmp) celEmp.addEventListener('input', (e) => aplicarMascara(e, 'celular'));

    const cepEmp = document.getElementById('cepEmp');
    if(cepEmp) cepEmp.addEventListener('input', (e) => aplicarMascara(e, 'cep'));


    // ======================================================
    // 3. BUSCA DE CEP (VIP)
    // ======================================================
    async function buscarCepVIP() {
        const cepInput = document.getElementById('cepCliente');
        const btnBusca = document.getElementById('btnBuscarCepCliente');
        
        if(btnBusca) btnBusca.innerHTML = '⏳...';

        let cep = cepInput.value.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    if(document.getElementById('ruaCliente')) document.getElementById('ruaCliente').value = data.logradouro;
                    if(document.getElementById('bairroCliente')) document.getElementById('bairroCliente').value = data.bairro;
                    if(document.getElementById('cidadeCliente')) document.getElementById('cidadeCliente').value = data.localidade;
                    if(document.getElementById('estadoCliente')) document.getElementById('estadoCliente').value = data.uf;
                    if(document.getElementById('numeroCliente')) document.getElementById('numeroCliente').focus();
                } else alert("CEP não encontrado.");
            } catch (e) { console.error(e); }
        }
        if(btnBusca) btnBusca.innerHTML = '🔍 Buscar CEP';
    }
    // Gatilhos VIP
    if(cepVip) cepVip.addEventListener('blur', buscarCepVIP);
    const btnBuscaVip = document.getElementById('btnBuscarCepCliente');
    if(btnBuscaVip) btnBuscaVip.addEventListener('click', buscarCepVIP);


    // ======================================================
    // 4. BUSCA DE CEP (EMPREENDEDOR)
    // ======================================================
    async function buscarCepEmp() {
        const cepInput = document.getElementById('cepEmp');
        const btnBusca = document.getElementById('btnBuscarCepEmp');
        
        if(btnBusca) btnBusca.innerHTML = '⏳...';

        let cep = cepInput.value.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    // Preenche campos usando os IDs do Empreendedor
                    if(document.getElementById('ruaEmp')) document.getElementById('ruaEmp').value = data.logradouro;
                    if(document.getElementById('bairroEmp')) document.getElementById('bairroEmp').value = data.bairro;
                    if(document.getElementById('cidadeEmp')) document.getElementById('cidadeEmp').value = data.localidade;
                    
                    // Seleciona o Estado na Lista (Select)
                    const selectEstado = document.getElementById('estadoEmpEnd');
                    if(selectEstado) selectEstado.value = data.uf;

                    if(document.getElementById('numeroEmp')) document.getElementById('numeroEmp').focus();
                } else alert("CEP não encontrado.");
            } catch (e) { console.error(e); }
        }
        if(btnBusca) btnBusca.innerHTML = '🔍 Buscar CEP';
    }
    // Gatilhos Empreendedor
    if(cepEmp) cepEmp.addEventListener('blur', buscarCepEmp);
    const btnBuscaEmpBtn = document.getElementById('btnBuscarCepEmp');
    if(btnBuscaEmpBtn) btnBuscaEmpBtn.addEventListener('click', buscarCepEmp);


    // ======================================================
    // 5. ENVIO VIP (Já Testado e Aprovado ✅)
    // ======================================================
    const formVip = document.getElementById('form-vip');
    if (formVip) {
        formVip.addEventListener('submit', async function(e) {
            e.preventDefault();
            const btnSubmit = document.getElementById('btnSubmitCliente');
            const txtOriginal = btnSubmit ? btnSubmit.innerHTML : 'Cadastrar';
            if(btnSubmit) btnSubmit.innerHTML = '⏳ Processando...';

            const formData = new FormData(formVip);
            const dados = {
                nome_completo: formData.get('nome'),
                cpf: formData.get('cpf'),
                data_nascimento: formData.get('dataNascimento'),
                celular: formData.get('celular'),
                email: formData.get('email'),
                senha_hash: formData.get('senha'),
                cep: formData.get('cep'),
                endereco_rua: formData.get('rua'),
                endereco_numero: formData.get('numero'),
                endereco_complemento: formData.get('complemento'),
                endereco_bairro: formData.get('bairro'),
                endereco_cidade: formData.get('cidade'),
                endereco_estado: formData.get('estado'),
                created_at: new Date().toISOString()
            };

            const { error } = await sb.from('clientes_amway').insert([dados]);

            if (error) {
                alert('Erro: ' + error.message);
                if(btnSubmit) btnSubmit.innerHTML = txtOriginal;
            } else {
                alert('🎉 Parabéns! Cadastro VIP realizado!');
                formVip.reset();
                fecharModal('cadastroModalCliente');
                if(btnSubmit) btnSubmit.innerHTML = txtOriginal;
            }
        });
    }

    // ======================================================
    // 6. ENVIO EMPREENDEDOR (NOVO! 💼)
    // ======================================================
    const formEmp = document.getElementById('form-empreendedor');
    if (formEmp) {
        formEmp.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validação CPF Básico
            const cpfVal = document.getElementById('cpfEmp').value.replace(/\D/g, '');
            if(cpfVal.length !== 11) { alert("CPF inválido"); return; }

            const btnSubmit = document.getElementById('btnSubmitEmp');
            const txtOriginal = btnSubmit ? btnSubmit.innerHTML : 'Finalizar';
            if(btnSubmit) btnSubmit.innerHTML = '⏳ Processando...';

            const formData = new FormData(formEmp);

            // 1. Montar a Data de Nascimento (Dia/Mes/Ano -> YYYY-MM-DD)
            const dia = formData.get('dia');
            const mes = formData.get('mes');
            const ano = formData.get('ano');
            // Garante que dia e mês tenham 2 dígitos (ex: 05)
            const dataFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

            // 2. Pegar Kit Escolhido (Radio)
            const kitSelecionado = document.querySelector('input[name="tipoKit"]:checked');
            const valorKit = kitSelecionado ? kitSelecionado.getAttribute('data-valor') : 0;

            // 3. Montar Objeto
            const dados = {
                nome_completo: formData.get('nome'),
                cpf: formData.get('cpf'),
                data_nascimento: dataFormatada, // Data montada
                celular: formData.get('celular'),
                email: formData.get('email'),
                senha_hash: formData.get('senha'),
                
                // Kit
                tipo_kit: formData.get('tipoKit'),
                valor_kit: valorKit,

                // Endereço
                cep: formData.get('cep'),
                endereco_estado: formData.get('estado'), // Pega do Select
                endereco_cidade: formData.get('cidade'),
                endereco_bairro: formData.get('bairro'),
                endereco_rua: formData.get('rua'),
                endereco_numero: formData.get('numero'),
                endereco_complemento: formData.get('complemento'),

                // Patrocinador (Fixo no HTML, mas enviamos para garantir)
                patrocinador_nome: "Henrique Gomes da Silva",
                patrocinador_codigo: "3109505702",

                created_at: new Date().toISOString()
            };

            // OBS: RG, PIS e Banco não estão sendo enviados pois não existem na tabela ainda.
            // Se você criar as colunas depois, basta adicionar aqui: rg: formData.get('rg')

            const { error } = await sb.from('empreendedores_amway').insert([dados]);

            if (error) {
                console.error(error);
                alert('Erro ao cadastrar: ' + error.message);
                if(btnSubmit) btnSubmit.innerHTML = txtOriginal;
            } else {
                alert('🚀 Sucesso! Solicitação de Empreendedor enviada!');
                formEmp.reset();
                fecharModal('cadastroModalEmpreendedor');
                if(btnSubmit) btnSubmit.innerHTML = txtOriginal;
            }
        });
    }


    // ======================================================
    // 7. FUNÇÕES DE JANELA (MODAIS)
    // ======================================================
    function abrirModal(id) {
        const m = document.getElementById(id);
        if(m) { m.style.display = 'flex'; setTimeout(()=>m.classList.add('active'), 10); }
    }
    function fecharModal(id) {
        const m = document.getElementById(id);
        if(m) { m.classList.remove('active'); setTimeout(()=>m.style.display='none', 300); }
    }

    // Botões ABRIR
    const btnAbreVip = document.getElementById('btn-opcao-cliente');
    if(btnAbreVip) btnAbreVip.onclick = (e) => { e.preventDefault(); abrirModal('cadastroModalCliente'); };
    
    const btnAbreEmp = document.getElementById('btn-opcao-empreendedor');
    if(btnAbreEmp) btnAbreEmp.onclick = (e) => { e.preventDefault(); abrirModal('cadastroModalEmpreendedor'); };

    // Botões FECHAR (X)
    document.querySelectorAll('.modal-close-cliente').forEach(b => b.onclick = () => fecharModal('cadastroModalCliente'));
    document.querySelectorAll('.modal-close-empreendedor').forEach(b => b.onclick = () => fecharModal('cadastroModalEmpreendedor'));
    
    // Botões CANCELAR
    const btnCancelCli = document.getElementById('btnCancelarCliente');
    if(btnCancelCli) btnCancelCli.onclick = () => fecharModal('cadastroModalCliente');

    const btnCancelEmp = document.getElementById('btnCancelarEmp');
    if(btnCancelEmp) btnCancelEmp.onclick = () => fecharModal('cadastroModalEmpreendedor');

    // Fechar no Overlay
    window.onclick = function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.closest('.modal').style.display = 'none';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema Glister (VIP + Empreendedor) v2.0 Iniciado 🚀");

    // ======================================================
    // 1. CONFIGURAÇÃO DO SUPABASE
    // ======================================================
    const sb = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    if (!sb) console.error("ERRO CRÍTICO: Supabase não carregado!");

    // ======================================================
    // 2. MÁSCARAS
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

    // Listeners
    const inputsMask = [
        {id: 'cpfVip', type: 'cpf'}, {id: 'cpfEmp', type: 'cpf'},
        {id: 'celularCliente', type: 'celular'}, {id: 'celularEmp', type: 'celular'},
        {id: 'cepCliente', type: 'cep'}, {id: 'cepEmp', type: 'cep'}
    ];
    inputsMask.forEach(item => {
        const el = document.getElementById(item.id);
        if(el) el.addEventListener('input', (e) => aplicarMascara(e, item.type));
    });

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
    const cepVipEl = document.getElementById('cepCliente');
    if(cepVipEl) cepVipEl.addEventListener('blur', buscarCepVIP);
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
                    if(document.getElementById('ruaEmp')) document.getElementById('ruaEmp').value = data.logradouro;
                    if(document.getElementById('bairroEmp')) document.getElementById('bairroEmp').value = data.bairro;
                    if(document.getElementById('cidadeEmp')) document.getElementById('cidadeEmp').value = data.localidade;
                    
                    const selEstado = document.getElementById('estadoEmpEnd');
                    if(selEstado) selEstado.value = data.uf;

                    if(document.getElementById('numeroEmp')) document.getElementById('numeroEmp').focus();
                } else alert("CEP não encontrado.");
            } catch (e) { console.error(e); }
        }
        if(btnBusca) btnBusca.innerHTML = '🔍 Buscar CEP';
    }
    const cepEmpEl = document.getElementById('cepEmp');
    if(cepEmpEl) cepEmpEl.addEventListener('blur', buscarCepEmp);
    const btnBuscaEmp = document.getElementById('btnBuscarCepEmp');
    if(btnBuscaEmp) btnBuscaEmp.addEventListener('click', buscarCepEmp);


    // ======================================================
    // 5. ENVIO VIP
    // ======================================================
    const formVip = document.getElementById('form-vip');
    if (formVip) {
        formVip.addEventListener('submit', async function(e) {
            e.preventDefault();
            const btn = document.getElementById('btnSubmitCliente');
            const txt = btn ? btn.innerHTML : 'Cadastrar';
            if(btn) btn.innerHTML = '⏳ Processando...';

            const fd = new FormData(formVip);
            const dados = {
                nome_completo: fd.get('nome'),
                cpf: fd.get('cpf'),
                data_nascimento: fd.get('dataNascimento'),
                celular: fd.get('celular'),
                email: fd.get('email'),
                senha_hash: fd.get('senha'),
                cep: fd.get('cep'),
                endereco_rua: fd.get('rua'),
                endereco_numero: fd.get('numero'),
                endereco_complemento: fd.get('complemento'),
                endereco_bairro: fd.get('bairro'),
                endereco_cidade: fd.get('cidade'),
                endereco_estado: fd.get('estado'),
                created_at: new Date().toISOString()
            };

            const { error } = await sb.from('clientes_amway').insert([dados]);

            if (error) {
                alert('Erro: ' + error.message);
                if(btn) btn.innerHTML = txt;
            } else {
                alert('🎉 Cadastro VIP realizado!');
                formVip.reset();
                fecharModal('cadastroModalCliente');
                if(btn) btn.innerHTML = txt;
            }
        });
    }

    // ======================================================
    // 6. ENVIO EMPREENDEDOR (COM TODOS OS DADOS)
    // ======================================================
    const formEmp = document.getElementById('form-empreendedor');
    if (formEmp) {
        formEmp.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validação CPF
            const cpfVal = document.getElementById('cpfEmp').value.replace(/\D/g, '');
            if(cpfVal.length !== 11) { alert("CPF inválido"); return; }

            const btn = document.getElementById('btnSubmitEmp');
            const txt = btn ? btn.innerHTML : 'Finalizar';
            if(btn) btn.innerHTML = '⏳ Enviando...';

            const fd = new FormData(formEmp);

            // Data Nascimento
            const dia = fd.get('dia');
            const mes = fd.get('mes');
            const ano = fd.get('ano');
            const dtNasc = `${ano}-${mes.padStart(2,'0')}-${dia.padStart(2,'0')}`;

            // Kit
            const kitSel = document.querySelector('input[name="tipoKit"]:checked');
            const valorKit = kitSel ? kitSel.getAttribute('data-valor') : '0';

            // Objeto Completo
            const dados = {
                nome_completo: fd.get('nome'),
                cpf: fd.get('cpf'),
                rg: fd.get('rg'),
                orgao_emissor: fd.get('orgao'),
                pis: fd.get('pis'),
                data_nascimento: dtNasc,
                celular: fd.get('celular'),
                email: fd.get('email'),
                senha_hash: fd.get('senha'),
                
                banco: fd.get('banco'),
                agencia: fd.get('agencia'),
                conta_bancaria: fd.get('conta'),
                tipo_conta: fd.get('tipoConta'),
                
                tipo_kit: fd.get('tipoKit'),
                valor_kit: valorKit,

                cep: fd.get('cep'),
                endereco_estado: fd.get('estado'),
                endereco_cidade: fd.get('cidade'),
                endereco_bairro: fd.get('bairro'),
                endereco_rua: fd.get('rua'),
                endereco_numero: fd.get('numero'),
                endereco_complemento: fd.get('complemento'),

                patrocinador_nome: "Henrique Gomes da Silva",
                patrocinador_codigo: "3109505702",
                created_at: new Date().toISOString()
            };

            // DEBUG: Mostra no console o que está sendo enviado
            console.log("DADOS QUE ESTÃO INDO PRO SUPABASE:", dados);

            const { error } = await sb.from('empreendedores_amway').insert([dados]);

            if (error) {
                console.error(error);
                alert('Erro ao cadastrar: ' + error.message);
                if(btn) btn.innerHTML = txt;
            } else {
                alert('🚀 Sucesso! Empreendedor Cadastrado!');
                formEmp.reset();
                fecharModal('cadastroModalEmpreendedor');
                if(btn) btn.innerHTML = txt;
            }
        });
    }


    // ======================================================
    // 7. JANELAS MODAIS
    // ======================================================
    function abrirModal(id) {
        const m = document.getElementById(id);
        if(m) { m.style.display = 'flex'; setTimeout(()=>m.classList.add('active'), 10); }
    }
    function fecharModal(id) {
        const m = document.getElementById(id);
        if(m) { m.classList.remove('active'); setTimeout(()=>m.style.display='none', 300); }
    }

    const btnAbreVip = document.getElementById('btn-opcao-cliente');
    if(btnAbreVip) btnAbreVip.onclick = (e) => { e.preventDefault(); abrirModal('cadastroModalCliente'); };
    
    const btnAbreEmp = document.getElementById('btn-opcao-empreendedor');
    if(btnAbreEmp) btnAbreEmp.onclick = (e) => { e.preventDefault(); abrirModal('cadastroModalEmpreendedor'); };

    document.querySelectorAll('.modal-close-cliente').forEach(b => b.onclick = () => fecharModal('cadastroModalCliente'));
    document.querySelectorAll('.modal-close-empreendedor').forEach(b => b.onclick = () => fecharModal('cadastroModalEmpreendedor'));
    
    const btnCancelCli = document.getElementById('btnCancelarCliente');
    if(btnCancelCli) btnCancelCli.onclick = () => fecharModal('cadastroModalCliente');

    const btnCancelEmp = document.getElementById('btnCancelarEmp');
    if(btnCancelEmp) btnCancelEmp.onclick = () => fecharModal('cadastroModalEmpreendedor');

    window.onclick = function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.closest('.modal').style.display = 'none';
        }
    }
});

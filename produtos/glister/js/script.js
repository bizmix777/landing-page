document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema Glister + PIX MP v3.0 Iniciado 🚀");

    // URL do seu Robô Gerador de Pix (Do PDF que você mandou)
    const RENDER_URL = "https://gerador-pdf-bizmix.onrender.com/gerar_pix";

    // 1. CONFIGURAÇÃO DO SUPABASE
    const sb = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    if (!sb) console.error("ERRO CRÍTICO: Supabase não carregado!");

    // 2. MÁSCARAS
    function aplicarMascara(event, tipo) {
        let input = event.target;
        let value = input.value.replace(/\D/g, "");
        if (tipo === 'cpf') {
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (tipo === 'celular') {
            value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
            value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        } else if (tipo === 'cep') {
            value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        }
        input.value = value;
    }
    const inputsMask = [
        {id: 'cpfVip', type: 'cpf'}, {id: 'cpfEmp', type: 'cpf'},
        {id: 'celularCliente', type: 'celular'}, {id: 'celularEmp', type: 'celular'},
        {id: 'cepCliente', type: 'cep'}, {id: 'cepEmp', type: 'cep'}
    ];
    inputsMask.forEach(item => {
        const el = document.getElementById(item.id);
        if(el) el.addEventListener('input', (e) => aplicarMascara(e, item.type));
    });

    // 3. BUSCA DE CEP (Função Genérica Otimizada)
    async function buscarCEP(cepEl, prefixo) {
        let cep = cepEl.value.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const req = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await req.json();
                if (!data.erro) {
                    if(document.getElementById(`rua${prefixo}`)) document.getElementById(`rua${prefixo}`).value = data.logradouro;
                    if(document.getElementById(`bairro${prefixo}`)) document.getElementById(`bairro${prefixo}`).value = data.bairro;
                    if(document.getElementById(`cidade${prefixo}`)) document.getElementById(`cidade${prefixo}`).value = data.localidade;
                    
                    const elEstado = document.getElementById(prefixo === 'Emp' ? 'estadoEmpEnd' : 'estadoCliente');
                    if(elEstado) elEstado.value = data.uf;
                    
                    if(document.getElementById(`numero${prefixo}`)) document.getElementById(`numero${prefixo}`).focus();
                }
            } catch (e) { console.error(e); }
        }
    }
    // Listeners CEP
    const cepVip = document.getElementById('cepCliente');
    if(cepVip) cepVip.addEventListener('blur', () => buscarCEP(cepVip, 'Cliente'));
    const btnCepVip = document.getElementById('btnBuscarCepCliente');
    if(btnCepVip) btnCepVip.addEventListener('click', () => buscarCEP(cepVip, 'Cliente'));

    const cepEmp = document.getElementById('cepEmp');
    if(cepEmp) cepEmp.addEventListener('blur', () => buscarCEP(cepEmp, 'Emp'));
    const btnCepEmp = document.getElementById('btnBuscarCepEmp');
    if(btnCepEmp) btnCepEmp.addEventListener('click', () => buscarCEP(cepEmp, 'Emp'));


    // 4. ENVIO VIP (Simples)
    const formVip = document.getElementById('form-vip');
    if (formVip) {
        formVip.addEventListener('submit', async function(e) {
            e.preventDefault();
            const btn = document.getElementById('btnSubmitCliente');
            const txt = btn ? btn.innerText : 'Cadastrar';
            if(btn) btn.innerText = '⏳ Processando...';

            const fd = new FormData(formVip);
            const dados = {
                nome_completo: fd.get('nome'),
                cpf: fd.get('cpf'),
                data_nascimento: fd.get('dataNascimento'),
                celular: fd.get('celular'),
                email: fd.get('email'),
                // ⚠️ ATENÇÃO SEGURANÇA: senha em texto puro - implemente hash no backend
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
            if (error) { alert('Erro: ' + error.message); } 
            else { alert('🎉 Cadastro VIP Sucesso!'); formVip.reset(); fecharModal('cadastroModalCliente'); }
            if(btn) btn.innerText = txt;
        });
    }


    // ======================================================
    // 5. ENVIO EMPREENDEDOR + GERAÇÃO DE PIX 💳
    // ======================================================
    const formEmp = document.getElementById('form-empreendedor');
    if (formEmp) {
        formEmp.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validações
            const cpfVal = document.getElementById('cpfEmp').value.replace(/\D/g, '');
            if(cpfVal.length !== 11) { alert("CPF inválido"); return; }

            // UI Loading
            const btnSubmit = document.getElementById('btnSubmitEmp');
            btnSubmit.innerHTML = '⏳ Gerando Pix...';
            btnSubmit.disabled = true;

            const fd = new FormData(formEmp);

            // Preparar Data Nasc
            const dia = fd.get('dia'), mes = fd.get('mes'), ano = fd.get('ano');
            const dtNasc = `${ano}-${mes.padStart(2,'0')}-${dia.padStart(2,'0')}`;

            // Preparar Dados Supabase
            const dadosSupabase = {
                nome_completo: fd.get('nome'),
                cpf: fd.get('cpf'),
                rg: fd.get('rg'),
                orgao_emissor: fd.get('orgao'),
                pis: fd.get('pis'),
                data_nascimento: dtNasc,
                celular: fd.get('celular'),
                email: fd.get('email'),
                // ⚠️ ATENÇÃO SEGURANÇA: senha está sendo salva como texto puro!
                // Para produção, implemente hash no backend (ex: bcrypt no servidor Node/Python)
                // NUNCA faça hash no frontend pois é inseguro (o hash ficaria exposto)
                senha_hash: fd.get('senha'),
                
                banco: fd.get('banco'),
                agencia: fd.get('agencia'),
                conta_bancaria: fd.get('conta'),
                tipo_conta: fd.get('tipoConta'),
                
                tipo_kit: "Virtual", // Fixo
                valor_kit: "29.90",

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

            try {
                // A) Salva no Supabase Primeiro (Garante o Lead)
                const { error } = await sb.from('empreendedores_amway').insert([dadosSupabase]);
                if (error) throw new Error(error.message);

                // B) Chama o Render para Gerar o Pix
                console.log("Chamando Render para gerar Pix...");
                const response = await fetch(RENDER_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: fd.get('email'),
                        nome: fd.get('nome')
                    })
                });

                const pixData = await response.json();
                
                if (!response.ok) {
                    throw new Error(pixData.erro || 'Erro ao gerar Pix no Render');
                }

                // C) Exibe o Pix na Tela
                document.getElementById('intro-pagamento').style.display = 'none'; // Esconde texto intro
                btnSubmit.style.display = 'none'; // Esconde botão finalizar
                document.getElementById('btnCancelarEmp').style.display = 'none'; // Esconde cancelar

                const containerPix = document.getElementById('pixDynamicContainer');
                const imgPix = document.getElementById('imgQrCode');
                const inputCopia = document.getElementById('pixCopiaColaInput');

                imgPix.src = `data:image/jpeg;base64,${pixData.qr_base64}`;
                inputCopia.value = pixData.qr_code;
                containerPix.style.display = 'block';

                // Rola a tela até o Pix
                containerPix.scrollIntoView({ behavior: 'smooth' });

            } catch (err) {
                console.error(err);
                alert("Erro: " + err.message);
                btnSubmit.innerHTML = '🚀 FINALIZAR E ENVIAR';
                btnSubmit.disabled = false;
            }
        });
    }

    // Função para Copiar o Pix
    const btnCopiar = document.getElementById('btnCopiarPix');
    if(btnCopiar) {
        btnCopiar.addEventListener('click', function() {
            const input = document.getElementById('pixCopiaColaInput');
            input.select();
            input.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(input.value).then(() => {
                const txt = document.getElementById('btnTextPix');
                const original = txt.innerText;
                btnCopiar.style.background = '#28a745';
                txt.innerText = '✅ COPIADO!';
                setTimeout(() => {
                    btnCopiar.style.background = '#009ee3';
                    txt.innerText = original;
                }, 3000);
            });
        });
    }


    // 6. MODAIS
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
        if (e.target.classList.contains('modal-overlay')) { e.target.closest('.modal').style.display = 'none'; }
    }
});

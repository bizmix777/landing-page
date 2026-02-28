document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema Glister Iniciado 🚀");

    // ======================================================
    // 1. CONFIGURAÇÃO DO SUPABASE
    // ======================================================
    const sb = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    if (!sb) console.error("ERRO CRÍTICO: Supabase não carregado!");

    // ======================================================
    // 2. FUNÇÕES AUXILIARES (CPF e CEP)
    // ======================================================

    // Validador Matemático de CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '') return false;
        // Elimina CPFs invalidos conhecidos
        if (cpf.length != 11 || 
            cpf == "00000000000" || 
            cpf == "11111111111" || 
            cpf == "22222222222" || 
            cpf == "33333333333" || 
            cpf == "44444444444" || 
            cpf == "55555555555" || 
            cpf == "66666666666" || 
            cpf == "77777777777" || 
            cpf == "88888888888" || 
            cpf == "99999999999")
                return false;
        // Valida 1o digito
        add = 0;
        for (i=0; i < 9; i ++) add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(9))) return false;
        // Valida 2o digito
        add = 0;
        for (i = 0; i < 10; i ++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11) rev = 0;
        if (rev != parseInt(cpf.charAt(10))) return false;
        return true;
    }

    // Busca de CEP (ViaCEP)
    async function buscarCEP(inputCep, campoRua, campoBairro, campoCidade, campoEstado) {
        let cep = inputCep.value.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    if(campoRua) campoRua.value = data.logradouro;
                    if(campoBairro) campoBairro.value = data.bairro;
                    if(campoCidade) campoCidade.value = data.localidade;
                    if(campoEstado) campoEstado.value = data.uf; // Seleciona o Estado no Select
                } else {
                    alert("CEP não encontrado.");
                }
            } catch (e) {
                console.error("Erro ao buscar CEP", e);
            }
        }
    }

    // ======================================================
    // 3. MÁSCARAS E EVENTOS
    // ======================================================
    
    // Máscaras de Input
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, "");
            const name = e.target.name;
            const id = e.target.id;

            // Máscara CPF
            if (name === 'cpf' || id.includes('cpf')) {
                value = value.replace(/(\d{3})(\d)/, "$1.$2");
                value = value.replace(/(\d{3})(\d)/, "$1.$2");
                value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            } 
            // Máscara Telefone/Celular
            else if (name === 'whatsapp' || name === 'celular' || name === 'telefone') {
                value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
                value = value.replace(/(\d)(\d{4})$/, "$1-$2");
            }
            // Máscara CEP
            else if (name === 'cep' || id.includes('cep')) {
                value = value.replace(/^(\d{5})(\d)/, "$1-$2");
            }
            
            e.target.value = value;
        });

        // Evento para buscar CEP quando sair do campo (blur)
        if (input.name === 'cep' || input.id.includes('cep')) {
            input.addEventListener('blur', function() {
                // Tenta achar os campos de endereço no mesmo formulário
                const form = input.closest('form');
                const rua = form.querySelector('input[name="rua"], input[name="endereco_rua"]');
                const bairro = form.querySelector('input[name="bairro"], input[name="endereco_bairro"]');
                const cidade = form.querySelector('input[name="cidade"], input[name="endereco_cidade"]');
                const estado = form.querySelector('select[name="estado"], select[name="endereco_estado"], input[name="estado"]');
                
                buscarCEP(input, rua, bairro, cidade, estado);
            });
        }
    });


    // ======================================================
    // 4. FUNÇÕES DE MODAL (ABRIR/FECHAR)
    // ======================================================
    function abrirModal(id) {
        const m = document.getElementById(id);
        if(m) { m.style.display = 'flex'; setTimeout(()=>m.classList.add('active'),10); }
    }
    function fecharModal(id) {
        const m = document.getElementById(id);
        if(m) { m.classList.remove('active'); setTimeout(()=>m.style.display='none',300); }
    }

    // Botões de Abrir
    const btnCli = document.getElementById('btn-opcao-cliente');
    if(btnCli) btnCli.onclick = (e) => { e.preventDefault(); abrirModal('cadastroModalCliente'); };

    const btnEmp = document.getElementById('btn-opcao-empreendedor');
    if(btnEmp) btnEmp.onclick = (e) => { e.preventDefault(); abrirModal('cadastroModalEmpreendedor'); };

    // Botões de Fechar
    document.querySelectorAll('.modal-close-cliente').forEach(b => b.onclick = () => fecharModal('cadastroModalCliente'));
    document.querySelectorAll('.modal-close-empreendedor').forEach(b => b.onclick = () => fecharModal('cadastroModalEmpreendedor'));
    
    // Fechar no Overlay
    window.onclick = function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.closest('.modal').style.display = 'none';
        }
    }


    // ======================================================
    // 5. ENVIO PARA O SUPABASE
    // ======================================================
    
    // --- FUNÇÃO DE ENVIO COMUM ---
    async function enviarFormulario(evento, tabela) {
        evento.preventDefault();
        const form = evento.target;
        const btn = form.querySelector('button[type="submit"]');
        const txtOriginal = btn ? btn.innerText : 'Enviar';

        // 1. Validar CPF
        const cpfInput = form.querySelector('input[name="cpf"]');
        if (cpfInput) {
            if (!validarCPF(cpfInput.value)) {
                alert("CPF Inválido! Por favor verifique os números.");
                cpfInput.focus();
                return;
            }
        } else {
            // Se não tem campo CPF no form, mas o banco exige, vai dar erro.
            alert("Erro: Campo CPF não encontrado no formulário.");
            return;
        }

        if(btn) btn.innerText = "Enviando...";

        const formData = new FormData(form);
        const dados = {};
        
        // Converte FormData para Objeto JSON e limpa formatação
        formData.forEach((value, key) => {
            if (key === 'cpf') dados[key] = value.replace(/\D/g, ''); // Envia CPF limpo (só numeros) ou com ponto dependendo do seu banco. 
            // Se seu banco espera com ponto, tire o replace. Geralmente banco guarda LIMPO.
            // Para manter com ponto/traço: dados[key] = value;
            else dados[key] = value;
        });

        // Ajuste manual de nomes de campos se necessário
        const payload = {
            nome_completo: dados.nome || dados.name,
            email: dados.email,
            celular: dados.whatsapp || dados.telefone || dados.celular,
            cpf: dados.cpf, // OBRIGATÓRIO
            endereco_cidade: dados.cidade,
            endereco_estado: dados.estado,
            endereco_rua: dados.rua || dados.logradouro,
            endereco_bairro: dados.bairro,
            created_at: new Date().toISOString()
        };

        // Envia
        const { error } = await sb.from(tabela).insert([payload]);

        if (error) {
            console.error(error);
            alert("Erro ao salvar: " + error.message);
            if(btn) btn.innerText = txtOriginal;
        } else {
            alert("Cadastro realizado com sucesso! 🎉");
            form.reset();
            fecharModal(form.closest('.modal').id);
            if(btn) btn.innerText = txtOriginal;
        }
    }

    // --- LISTENERS DOS FORMS ---
    const formVip = document.getElementById('form-vip');
    if (formVip) formVip.addEventListener('submit', (e) => enviarFormulario(e, 'clientes_amway'));

    const formEmp = document.getElementById('form-empreendedor');
    if (formEmp) formEmp.addEventListener('submit', (e) => enviarFormulario(e, 'empreendedores_amway'));

});

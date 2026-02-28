document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema Glister Iniciado 🚀");

    // ======================================================
    // 1. CONFIGURAÇÃO DO SUPABASE
    // ======================================================
    const sb = typeof supabase !== 'undefined' ? supabase : null;
    if (!sb) console.error("ERRO: Supabase não encontrado!");

    // ======================================================
    // 2. FUNÇÕES VISUAIS (MODAIS)
    // ======================================================
    
    // Função para abrir modal
    function abrirModal(idModal) {
        const modal = document.getElementById(idModal);
        if (modal) {
            modal.classList.add('active'); // Ou a classe que seu CSS usa para mostrar
            modal.style.display = 'flex'; // Garante que aparece
        }
    }

    // Função para fechar modal
    function fecharModal(idModal) {
        const modal = document.getElementById(idModal);
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    }

    // Configura os botões de fechar (X)
    document.querySelectorAll('.modal-close-cliente').forEach(btn => {
        btn.addEventListener('click', () => fecharModal('cadastroModalCliente'));
    });
    document.querySelectorAll('.modal-close-empreendedor').forEach(btn => {
        btn.addEventListener('click', () => fecharModal('cadastroModalEmpreendedor'));
    });

    // Fechar ao clicar fora (Overlay)
    window.onclick = function(event) {
        if (event.target.classList.contains('modal-overlay') || event.target.classList.contains('modal')) {
            event.target.style.display = "none";
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

    // Procura os campos para aplicar máscara
    const inputCpfEmp = document.getElementById('cpfEmp');
    if (inputCpfEmp) aplicarMascara(inputCpfEmp, 'cpf');

    const inputsTel = document.querySelectorAll('input[type="tel"], input[name="whatsapp"], input[name="celular"]');
    inputsTel.forEach(input => aplicarMascara(input, 'tel'));


    // ======================================================
    // 4. ENVIO DE FORMULÁRIOS (SUPABASE)
    // ======================================================

    // --- CLIENTE VIP ---
    const formVip = document.getElementById('form-vip');
    if (formVip) {
        formVip.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!sb) return alert("Erro de conexão com o banco de dados.");

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
            } else {
                alert('Cadastro VIP realizado com sucesso! 🎉');
                formVip.reset();
                fecharModal('cadastroModalCliente');
            }
        });
    }

    // --- EMPREENDEDOR ---
    const formEmp = document.getElementById('form-empreendedor');
    if (formEmp) {
        formEmp.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!sb) return alert("Erro de conexão com o banco de dados.");

            const formData = new FormData(formEmp);
            
            // Mapeando os campos do HTML para o Banco
            const dados = {
                nome_completo: formData.get('nome'), // name="nome" no HTML
                cpf: formData.get('cpf'),           // name="cpf" no HTML
                email: formData.get('email'),
                celular: formData.get('whatsapp') || formData.get('telefone') || formData.get('celular'),
                endereco_cidade: formData.get('cidade'),
                endereco_estado: formData.get('estado'),
                created_at: new Date().toISOString()
            };

            // OBS: RG e ORGAO não estão sendo enviados pois não existem na tabela do banco.

            const { error } = await sb.from('empreendedores_amway').insert([dados]);

            if (error) {
                alert('Erro ao enviar: ' + error.message);
            } else {
                alert('Solicitação enviada! Entraremos em contato. 🚀');
                formEmp.reset();
                fecharModal('cadastroModalEmpreendedor');
            }
        });
    }
});

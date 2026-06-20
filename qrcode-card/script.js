// A configuração do Supabase (URL e KEY) já está vindo do seu supabase-config.js!

// 1. Lógica do Preview em Tempo Real
function updatePreview() {
    const nomeDigitado = document.getElementById('vcard_nome').value;
    const cargoDigitado = document.getElementById('vcard_cargo').value;

    document.getElementById('preview_nome').innerText = nomeDigitado || "Seu Nome";
    document.getElementById('preview_cargo').innerText = cargoDigitado || "Profissão";
}

// 2. Lógica de Envio para o Banco de Dados (usando sua função REST)
document.getElementById('btn_enviar').addEventListener('click', async function() {
    
    const btn = document.getElementById('btn_enviar');
    btn.innerText = "Enviando pedido...";
    btn.disabled = true;

    // Coleta os dados do formulário
    const materialSelecionado = document.querySelector('input[name="material"]:checked').value;
    const querNFC = document.getElementById('add_nfc').checked;
    const querGemeoDigital = document.getElementById('gemeo_digital').checked;
    
    const vcardNome = document.getElementById('vcard_nome').value;
    const vcardCargo = document.getElementById('vcard_cargo').value;
    const vcardTelefone = document.getElementById('vcard_telefone').value;
    const vcardEmail = document.getElementById('vcard_email').value;
    const vcardSite = document.getElementById('vcard_site').value;

    // Validação básica
    if(!vcardNome || !vcardTelefone) {
        alert("Por favor, preencha pelo menos o Nome e o Telefone/WhatsApp!");
        btn.innerText = "Finalizar Pedido";
        btn.disabled = false;
        return;
    }

    // Monta o objeto (payload) para o banco
    const payload = {
        nome_comprador: vcardNome, 
        whatsapp_contato: vcardTelefone,
        vcard_nome: vcardNome,
        vcard_telefone: vcardTelefone,
        vcard_email: vcardEmail,
        vcard_cargo: vcardCargo,
        vcard_site_redes: vcardSite,
        tipo_material: materialSelecionado,
        add_nfc: querNFC,
        criar_gemeo_digital: querGemeoDigital
    };

    try {
        // Envia para a tabela usando a sua função pronta!
        const resposta = await supabaseFetch('pedidos_qrcode', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        alert("Pedido realizado com sucesso! Em breve entraremos em contato.");
        
        // Limpa o formulário após o sucesso
        document.querySelectorAll('input[type="text"], input[type="email"]').forEach(input => input.value = '');
        updatePreview();

    } catch (error) {
        console.error("Erro ao salvar o pedido:", error);
        alert("Ocorreu um erro ao enviar. Verifique o console para mais detalhes.");
    } finally {
        // Restaura o botão, independente de dar erro ou sucesso
        btn.innerText = "Finalizar Pedido";
        btn.disabled = false;
    }
});

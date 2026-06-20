// 1. Lógica do Preview em Tempo Real
function updatePreview() {
    const nomeDigitado = document.getElementById('vcard_nome').value;
    const cargoDigitado = document.getElementById('vcard_cargo').value;

    document.getElementById('preview_nome').innerText = nomeDigitado || "Seu Nome";
    document.getElementById('preview_cargo').innerText = cargoDigitado || "Profissão";
}

// 2. Lógica de Envio para o Banco de Dados com Upload de Logo
document.getElementById('btn_enviar').addEventListener('click', async function() {
    
    const btn = document.getElementById('btn_enviar');
    btn.innerText = "Enviando arquivo e pedido...";
    btn.disabled = true;

    // Coleta os dados básicos
    const materialSelecionado = document.querySelector('input[name="material"]:checked').value;
    const querNFC = document.getElementById('add_nfc').checked;
    const querGemeoDigital = document.getElementById('gemeo_digital').checked;
    
    const vcardNome = document.getElementById('vcard_nome').value;
    const vcardCargo = document.getElementById('vcard_cargo').value;
    const vcardTelefone = document.getElementById('vcard_telefone').value;
    const vcardEmail = document.getElementById('vcard_email').value;
    const vcardSite = document.getElementById('vcard_site').value;
    
    // Captura o campo de arquivo
    const logoInput = document.getElementById('logo_upload');

    if(!vcardNome || !vcardTelefone) {
        alert("Por favor, preencha pelo menos o Nome e o Telefone/WhatsApp!");
        btn.innerText = "Finalizar Pedido";
        btn.disabled = false;
        return;
    }

    try {
        let logoUrlParaBanco = null;

        // --- INÍCIO DO UPLOAD DA IMAGEM ---
        if (logoInput && logoInput.files.length > 0) {
            const file = logoInput.files[0];
            
            // Cria um nome único usando a data/hora para arquivos com mesmo nome não se apagarem
            const extensao = file.name.split('.').pop();
            const nomeArquivoUnico = `${Date.now()}_${vcardNome.replace(/\s+/g, '_')}.${extensao}`;

            // Envia o arquivo direto para o Bucket usando REST API
            const uploadReq = await fetch(`${SUPABASE_URL}/storage/v1/object/logos_clientes/${nomeArquivoUnico}`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': file.type
                },
                body: file
            });

            if (!uploadReq.ok) {
                const erroStorage = await uploadReq.text();
                console.error("Erro no Storage:", erroStorage);
                throw new Error("Erro ao fazer upload da logomarca.");
            }

            // Monta o link público para visualizar a imagem e salvar na tabela
            logoUrlParaBanco = `${SUPABASE_URL}/storage/v1/object/public/logos_clientes/${nomeArquivoUnico}`;
        }
        // --- FIM DO UPLOAD ---

        // Monta o objeto para a tabela 'pedidos_qrcode'
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
            criar_gemeo_digital: querGemeoDigital,
            logo_url: logoUrlParaBanco // Inserindo o link que acabamos de gerar!
        };

        // Salva os dados na tabela
        await supabaseFetch('pedidos_qrcode', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        alert("Pedido realizado com sucesso! O seu Perfil Digital provisório já está no ar.");
        
        // Limpa o formulário
        document.querySelectorAll('input[type="text"], input[type="email"], input[type="file"]').forEach(input => input.value = '');
        updatePreview();

    } catch (error) {
        console.error("Erro completo:", error);
        alert("Ocorreu um erro ao enviar. Verifique o console para detalhes.");
    } finally {
        btn.innerText = "Finalizar Pedido";
        btn.disabled = false;
    }
});

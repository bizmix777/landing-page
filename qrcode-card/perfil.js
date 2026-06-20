document.addEventListener('DOMContentLoaded', async () => {
    // 1. Pega o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const pedidoId = urlParams.get('id');

    if (!pedidoId) {
        document.getElementById('loading').innerHTML = "Perfil não encontrado. ID inválido.";
        return;
    }

    try {
        // 2. Busca no Supabase (usando sua função pronta)
        // Usa "eq.ID" para filtrar a linha exata
        const data = await supabaseFetch(`pedidos_qrcode?id=eq.${pedidoId}&select=*`);

        if (!data || data.length === 0) {
            document.getElementById('loading').innerHTML = "Perfil não encontrado.";
            return;
        }

        const perfil = data[0]; // Pega o primeiro (e único) resultado

        // 3. Preenche a tela com os dados do banco
        document.getElementById('v_nome').innerText = perfil.vcard_nome;
        document.getElementById('v_cargo').innerText = perfil.vcard_cargo || 'Profissional';
        
        // Exibe a logo se existir
        if (perfil.logo_url) {
            const imgElement = document.getElementById('p_logo');
            imgElement.src = perfil.logo_url;
            imgElement.style.display = 'block'; // Mostra a imagem
        }

        // Gera o QR Code na tela apontando para a própria URL atual!
        const urlAtual = window.location.href;
        document.getElementById('qr_tela').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(urlAtual)}`;

        // Configura os links dos botões
        const numeroLimpo = perfil.vcard_telefone.replace(/\D/g, ''); // Tira traços e espaços
        document.getElementById('btn_whatsapp').href = `https://wa.me/${numeroLimpo}`;
        
        if(perfil.vcard_email) {
            document.getElementById('btn_email').href = `mailto:${perfil.vcard_email}`;
        } else {
            document.getElementById('btn_email').style.display = 'none';
        }

        if(perfil.vcard_site_redes) {
            let siteUrl = perfil.vcard_site_redes;
            if (!siteUrl.startsWith('http')) siteUrl = 'https://' + siteUrl;
            document.getElementById('btn_site').href = siteUrl;
        } else {
            document.getElementById('btn_site').style.display = 'none';
        }

// Lógica do botão "Salvar na Agenda"
        document.getElementById('btn_save_contact').addEventListener('click', () => {
            
            // 1. Limpa tudo que não for número do que veio do banco
            let numeroLimpo = perfil.vcard_telefone.replace(/\D/g, '');
            
            // 2. Aplica a formatação do Brasil: +55 XX XXXXX-XXXX
            let telefoneFormatado = perfil.vcard_telefone; // Padrão de segurança
            if (numeroLimpo.length === 11) {
                telefoneFormatado = `+55 ${numeroLimpo.substring(0,2)} ${numeroLimpo.substring(2,7)}-${numeroLimpo.substring(7,11)}`;
            }

            // 3. Monta o vCard com o telefone formatado
            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${perfil.vcard_nome}
TEL:${telefoneFormatado}
EMAIL:${perfil.vcard_email || ''}
TITLE:${perfil.vcard_cargo || ''}
URL:${perfil.vcard_site_redes || ''}
END:VCARD`;

            const blob = new Blob([vcard], { type: "text/vcard" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${perfil.vcard_nome.replace(/ /g, '_')}.vcf`;
            a.click();
            URL.revokeObjectURL(url);
        });

        // 4. Esconde o "Carregando" e mostra o perfil
        document.getElementById('loading').style.display = 'none';
        document.getElementById('profile-content').style.display = 'block';

    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        document.getElementById('loading').innerHTML = "Erro ao carregar os dados.";
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Pega o ID da URL[cite: 2]
    const urlParams = new URLSearchParams(window.location.search);
    const pedidoId = urlParams.get('id');

    if (!pedidoId) {
        document.getElementById('loading').innerHTML = "Perfil não encontrado. ID inválido.";
        return;
    }

    try {
        // 2. Busca no Supabase (usando sua função pronta)[cite: 2]
        // Usa "eq.ID" para filtrar a linha exata[cite: 2]
        const data = await supabaseFetch(`pedidos_qrcode?id=eq.${pedidoId}&select=*`);

        if (!data || data.length === 0) {
            document.getElementById('loading').innerHTML = "Perfil não encontrado.";
            return;
        }

        const perfil = data[0]; // Pega o primeiro (e único) resultado[cite: 2]

        // 3. Preenche a tela com os dados do banco[cite: 2]
        document.getElementById('v_nome').innerText = perfil.vcard_nome;
        document.getElementById('v_cargo').innerText = perfil.vcard_cargo || 'Profissional';
        
        // Exibe a logo se existir[cite: 2]
        if (perfil.logo_url) {
            const imgElement = document.getElementById('p_logo');
            imgElement.src = perfil.logo_url;
            imgElement.style.display = 'block'; // Mostra a imagem[cite: 2]
        }

        // Gera o QR Code na tela apontando para a própria URL atual![cite: 2]
        const urlAtual = window.location.href;
        document.getElementById('qr_tela').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(urlAtual)}`;

        // =========================================================
        // 4. CONFIGURAÇÃO DOS LINKS E REDES SOCIAIS (ATUALIZADO)
        // =========================================================
        
        // Função auxiliar para exibir o botão apenas se o cliente tiver preenchido o campo
        const configurarBotao = (idBotao, valor, formataUrl) => {
            const btn = document.getElementById(idBotao);
            if (btn) {
                if (valor && valor.trim() !== '') {
                    btn.href = formataUrl(valor);
                    btn.style.display = 'block';
                } else {
                    btn.style.display = 'none';
                }
            }
        };

        const numeroLimpo = perfil.vcard_telefone ? perfil.vcard_telefone.replace(/\D/g, '') : ''; 
        
        // Configura links básicos
        configurarBotao('btn_whatsapp', numeroLimpo, (val) => `https://wa.me/55${val}`);
        configurarBotao('btn_email', perfil.vcard_email, (val) => `mailto:${val}`);
        configurarBotao('btn_site', perfil.vcard_site_redes, (val) => val.startsWith('http') ? val : `https://${val}`);
        
        // Formatação inteligente (se a pessoa digitar com @ ou só o link, o sistema entende e arruma)
        configurarBotao('btn_instagram', perfil.vcard_instagram, (val) => val.includes('http') ? val : `https://instagram.com/${val.replace('@', '')}`);
        configurarBotao('btn_facebook', perfil.vcard_facebook, (val) => val.includes('http') ? val : `https://facebook.com/${val}`);
        configurarBotao('btn_telegram', perfil.vcard_telegram, (val) => val.includes('http') ? val : `https://t.me/${val.replace('@', '')}`);

        // =========================================================
        // 5. LÓGICA DO BOTÃO "SALVAR NA AGENDA" (ATUALIZADO COM REDES)
        // =========================================================
        document.getElementById('btn_save_contact').addEventListener('click', () => {
            
            // Aplica a formatação do Brasil: +55 XX XXXXX-XXXX
            let telefoneFormatado = perfil.vcard_telefone || ''; 
            if (numeroLimpo.length === 11) {
                telefoneFormatado = `+55 ${numeroLimpo.substring(0,2)} ${numeroLimpo.substring(2,7)}-${numeroLimpo.substring(7,11)}`;
            }

            // Monta o vCard injetando os dados dinamicamente (só adiciona as linhas se existirem)
            let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${perfil.vcard_nome}\n`;
            
            if (telefoneFormatado) vcard += `TEL:${telefoneFormatado}\n`;
            if (perfil.vcard_cargo) vcard += `TITLE:${perfil.vcard_cargo}\n`;
            if (perfil.vcard_email) vcard += `EMAIL:${perfil.vcard_email}\n`;
            if (perfil.vcard_site_redes) vcard += `URL;type=SITE:${perfil.vcard_site_redes}\n`;
            
            // Adiciona redes sociais na agenda
            if (perfil.vcard_instagram) vcard += `URL;type=Instagram:https://instagram.com/${perfil.vcard_instagram.replace('@', '')}\n`;
            if (perfil.vcard_facebook) vcard += `URL;type=Facebook:${perfil.vcard_facebook}\n`;
            if (perfil.vcard_telegram) vcard += `URL;type=Telegram:https://t.me/${perfil.vcard_telegram.replace('@', '')}\n`;
            
            vcard += `END:VCARD`;

            // Baixa e executa o vCard[cite: 2]
            const blob = new Blob([vcard], { type: "text/vcard" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${perfil.vcard_nome.replace(/ /g, '_')}.vcf`;
            a.click();
            URL.revokeObjectURL(url);
        });

        // 6. Esconde o "Carregando" e mostra o perfil[cite: 2]
        document.getElementById('loading').style.display = 'none';
        document.getElementById('profile-content').style.display = 'block';

    } catch (error) {
        console.error("Erro ao carregar perfil:", error);[cite: 2]
        document.getElementById('loading').innerHTML = "Erro ao carregar os dados.";[cite: 2]
    }
});

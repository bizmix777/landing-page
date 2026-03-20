import { SUPABASE_CONFIG } from '../js/supabase-config.js';

let currentGeneratedLink = '';

// Carregar links ao abrir a página
document.addEventListener('DOMContentLoaded', loadLinks);

// Formulário de criação
document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const longUrl = document.getElementById('longUrl').value;
    let shortCode = document.getElementById('shortCode').value;

    // Gerar código automático se não fornecido
    if (!shortCode) {
        shortCode = generateRandomCode();
    }

    // Validar
    if (!longUrl.startsWith('http')) {
        showError('A URL deve começar com http:// ou https://');
        return;
    }

    try {
        // Inserir no Supabase
        const response = await fetch(
            `${SUPABASE_CONFIG.URL}/rest/v1/short_urls`,
            {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_CONFIG.ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_CONFIG.ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    short_code: shortCode,
                    long_url: longUrl
                })
            }
        );

        if (response.status === 201) {
            // Sucesso
            const domainName = window.location.hostname;
            currentGeneratedLink = `https://${domainName}/${shortCode}`;

            document.getElementById('generatedLink').textContent = currentGeneratedLink;
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';

            // Limpar formulário
            document.getElementById('createForm').reset();

            // Recarregar lista
            await loadLinks();
        } else {
            const error = await response.json();
            showError(error.message || 'Erro ao criar link. Verifique se o código já existe.');
        }
    } catch (error) {
        showError('Erro: ' + error.message);
    }
});

// Carregar lista de links
async function loadLinks() {
    try {
        const response = await fetch(
            `${SUPABASE_CONFIG.URL}/rest/v1/short_urls?order=created_at.desc`,
            {
                headers: {
                    'apikey': SUPABASE_CONFIG.ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_CONFIG.ANON_KEY}`
                }
            }
        );

        const links = await response.json();

        if (links.length === 0) {
            document.getElementById('linksList').innerHTML = '<p class="loading">Nenhum link criado ainda.</p>';
            return;
        }

        const domainName = window.location.hostname;
        let html = '';

        links.forEach(link => {
            const shortUrl = `https://${domainName}/${link.short_code}`;
            html += `
                <div class="link-item">
                    <div class="link

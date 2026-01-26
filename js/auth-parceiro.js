// ============================================
// AUTENTICAÇÃO DE PARCEIROS - BIZMIX
// Usa Edge Function + SHA-256
// Tabela: parceiros
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('formLogin');
    const btnLogin = document.getElementById('btnLogin');
    const alertDiv = document.getElementById('alert');

    if (!loginForm) {
        console.log('⚠️ Formulário de login não encontrado nesta página');
        return;
    }

    console.log('✅ Sistema de login de parceiros iniciado');

    // ========================================
    // FUNÇÃO: Mostrar alerta
    // ========================================
    function mostrarAlerta(mensagem, tipo = 'error') {
        if (!alertDiv) {
            alert(mensagem);
            return;
        }
        
        alertDiv.textContent = mensagem;
        alertDiv.className = `alert alert-${tipo} show`;
        
        setTimeout(() => {
            alertDiv.classList.remove('show');
        }, 5000);
    }

    // ========================================
    // FUNÇÃO: Fazer login de parceiro
    // ========================================
    async function fazerLogin(email, senha) {
        try {
            console.log('🔐 Iniciando login de parceiro para:', email);

            // Chamar Edge Function autenticar-parceiro
            const response = await fetch(`${SUPABASE_URL}/functions/v1/autenticar-parceiro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                },
                body: JSON.stringify({ email, senha })
            });

            console.log('📡 Status:', response.status);

            const result = await response.json();
            console.log('📦 Resultado:', result);

            if (!result.success) {
                throw new Error(result.error || 'Erro ao fazer login');
            }

            console.log('✅ Login bem-sucedido:', result.parceiro.nome_completo);
            console.log('🎫 Código do parceiro:', result.parceiro.codigo_parceiro);

            // Salvar dados do parceiro no localStorage
            localStorage.setItem('bizmix_parceiro', JSON.stringify(result.parceiro));
            localStorage.setItem('bizmix_parceiro_auth', 'true');
            localStorage.setItem('bizmix_parceiro_codigo', result.parceiro.codigo_parceiro);

            // Mensagem de sucesso
            mostrarAlerta(`Bem-vindo(a), ${result.parceiro.nome_completo}! Redirecionando...`, 'success');

            // Redirecionar para dashboard de parceiro
            setTimeout(() => {
                window.location.href = '/dashboard-parceiro.html';
            }, 1500);

        } catch (error) {
            console.error('❌ Erro no login:', error);
            
            // Mensagens de erro mais amigáveis
            let mensagemErro = error.message;
            
            if (mensagemErro.includes('Email ou senha incorretos')) {
                mensagemErro = '❌ E-mail ou senha incorretos. Verifique seus dados e tente novamente.';
            } else if (mensagemErro.includes('inativa')) {
                mensagemErro = '⚠️ Sua conta está aguardando aprovação. Entre em contato com o suporte.';
            }
            
            mostrarAlerta(mensagemErro, 'error');
        }
    }

    // ========================================
    // EVENTO: Submit do formulário
    // ========================================
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('✅ Submit do formulário capturado');

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('password').value;

        // Validações
        if (!email || !senha) {
            mostrarAlerta('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (!email.includes('@')) {
            mostrarAlerta('Por favor, digite um e-mail válido.', 'error');
            return;
        }

        if (senha.length < 6) {
            mostrarAlerta('A senha deve ter pelo menos 6 caracteres.', 'error');
            return;
        }

        // Loading no botão
        if (btnLogin) {
            btnLogin.classList.add('loading');
            btnLogin.disabled = true;
            btnLogin.textContent = '⏳ Entrando...';
        }

        // Fazer login
        await fazerLogin(email, senha);

        // Remover loading
        if (btnLogin) {
            btnLogin.classList.remove('loading');
            btnLogin.disabled = false;
            btnLogin.textContent = 'Entrar';
        }
    });

    // ========================================
    // VERIFICAR SE JÁ ESTÁ LOGADO
    // ========================================
    const parceiroAuth = localStorage.getItem('bizmix_parceiro_auth');
    
    if (parceiroAuth === 'true') {
        const parceiro = localStorage.getItem('bizmix_parceiro');
        
        if (parceiro) {
            try {
                const dadosParceiro = JSON.parse(parceiro);
                console.log('✅ Parceiro já logado:', dadosParceiro.nome_completo);
                console.log('🔄 Redirecionando para dashboard...');
                window.location.href = '/dashboard-parceiro.html';
            } catch (e) {
                console.error('❌ Erro ao ler dados do parceiro:', e);
                localStorage.removeItem('bizmix_parceiro');
                localStorage.removeItem('bizmix_parceiro_auth');
            }
        }
    }
});

// ============================================
// FUNÇÕES GLOBAIS PARA PARCEIROS
// Podem ser usadas em qualquer página
// ============================================

/**
 * Verifica se o parceiro está autenticado
 * Se não estiver, redireciona para login
 * @returns {Object|null} Dados do parceiro ou null
 */
function verificarAutenticacaoParceiro() {
    const auth = localStorage.getItem('bizmix_parceiro_auth');
    const parceiro = localStorage.getItem('bizmix_parceiro');

    if (auth !== 'true' || !parceiro) {
        console.log('⚠️ Parceiro não autenticado, redirecionando...');
        window.location.href = '/login/index.html';
        return null;
    }

    try {
        return JSON.parse(parceiro);
    } catch (e) {
        console.error('❌ Erro ao ler dados do parceiro:', e);
        window.location.href = '/login/index.html';
        return null;
    }
}

/**
 * Faz logout do parceiro
 */
async function fazerLogoutParceiro() {
    console.log('🚪 Fazendo logout do parceiro...');
    
    localStorage.removeItem('bizmix_parceiro_auth');
    localStorage.removeItem('bizmix_parceiro');
    localStorage.removeItem('bizmix_parceiro_codigo');
    
    console.log('✅ Logout realizado');
    window.location.href = '/login/index.html';
}

/**
 * Retorna o código do parceiro logado
 * @returns {string|null} Código do parceiro
 */
function obterCodigoParceiro() {
    const parceiro = verificarAutenticacaoParceiro();
    return parceiro ? parceiro.codigo_parceiro : null;
}

/**
 * Atualiza os dados do parceiro no localStorage
 * @param {Object} novosDados Novos dados do parceiro
 */
function atualizarDadosParceiro(novosDados) {
    const parceiroAtual = verificarAutenticacaoParceiro();
    
    if (parceiroAtual) {
        const parceiroAtualizado = { ...parceiroAtual, ...novosDados };
        localStorage.setItem('bizmix_parceiro', JSON.stringify(parceiroAtualizado));
        console.log('✅ Dados do parceiro atualizados');
    }
}

console.log('✅ Funções globais de parceiros carregadas');

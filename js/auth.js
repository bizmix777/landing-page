// ============================================
// SISTEMA DE AUTENTICAÇÃO BIZMIX
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const btnLogin = document.getElementById('btnLogin');
    const alertDiv = document.getElementById('alert');

    // ========================================
    // FUNÇÃO: Mostrar alerta
    // ========================================
    function mostrarAlerta(mensagem, tipo = 'error') {
        alertDiv.textContent = mensagem;
        alertDiv.className = `alert alert-${tipo} show`;
        
        // Ocultar após 5 segundos
        setTimeout(() => {
            alertDiv.classList.remove('show');
        }, 5000);
    }

    // ========================================
    // FUNÇÃO: Fazer login
    // ========================================
    async function fazerLogin(email, senha) {
        try {
            // 1. Autenticar no Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email: email,
                password: senha
            });

            if (authError) {
                throw new Error(authError.message);
            }

            console.log('✅ Autenticação bem-sucedida:', authData.user.email);

            // 2. Buscar dados do usuário na tabela 'usuarios'
            const { data: usuario, error: userError } = await supabase
                .from('usuarios')
                .select('*')
                .eq('email', email)
                .single();

            if (userError || !usuario) {
                throw new Error('Usuário não encontrado na base de dados.');
            }

            console.log('✅ Dados do usuário carregados:', usuario);

            // 3. Verificar se usuário está ativo
            if (usuario.status !== 'ativo') {
                await supabase.auth.signOut();
                throw new Error('Sua conta está inativa. Entre em contato com o suporte.');
            }

            // 4. Salvar dados do usuário no localStorage
            localStorage.setItem('bizmix_user', JSON.stringify(usuario));
            localStorage.setItem('bizmix_auth', 'true');

            // 5. Redirecionar baseado no tipo de usuário
            mostrarAlerta('Login realizado com sucesso! Redirecionando...', 'success');

            setTimeout(() => {
                if (usuario.tipo === 'super_admin' || usuario.tipo === 'admin') {
                    window.location.href = 'dashboard-admin.html';
                } else if (usuario.tipo === 'parceiro') {
                    window.location.href = 'dashboard-parceiro.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            }, 1500);

        } catch (error) {
            console.error('❌ Erro no login:', error);
            mostrarAlerta(error.message || 'Erro ao fazer login. Verifique suas credenciais.', 'error');
        }
    }

    // ========================================
    // EVENTO: Submit do formulário
    // ========================================
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('password').value;

        // Validações básicas
        if (!email || !senha) {
            mostrarAlerta('Por favor, preencha todos os campos.', 'error');
            return;
        }

        // Adicionar loading no botão
        btnLogin.classList.add('loading');
        btnLogin.disabled = true;

        // Fazer login
        await fazerLogin(email, senha);

        // Remover loading
        btnLogin.classList.remove('loading');
        btnLogin.disabled = false;
    });

    // ========================================
    // VERIFICAR SE JÁ ESTÁ LOGADO
    // ========================================
    const usuarioLogado = localStorage.getItem('bizmix_auth');
    if (usuarioLogado === 'true') {
        const usuario = JSON.parse(localStorage.getItem('bizmix_user'));
        
        if (usuario) {
            // Redirecionar para o dashboard correto
            if (usuario.tipo === 'super_admin' || usuario.tipo === 'admin') {
                window.location.href = 'dashboard-admin.html';
            } else {
                window.location.href = 'dashboard-parceiro.html';
            }
        }
    }
});

// ============================================
// FUNÇÃO GLOBAL: Verificar autenticação
// ============================================
function verificarAutenticacao() {
    const auth = localStorage.getItem('bizmix_auth');
    const usuario = localStorage.getItem('bizmix_user');

    if (auth !== 'true' || !usuario) {
        window.location.href = 'login.html';
        return null;
    }

    return JSON.parse(usuario);
}

// ============================================
// FUNÇÃO GLOBAL: Fazer logout
// ============================================
async function fazerLogout() {
    await supabase.auth.signOut();
    localStorage.removeItem('bizmix_auth');
    localStorage.removeItem('bizmix_user');
    window.location.href = 'login.html';
}

// ============================================
// FUNÇÃO GLOBAL: Verificar permissão
// ============================================
function verificarPermissao(tipoRequerido) {
    const usuario = verificarAutenticacao();
    
    if (!usuario) return false;
    
    // Super-admin tem acesso a tudo
    if (usuario.tipo === 'super_admin') return true;
    
    // Verificar tipo específico
    if (usuario.tipo === tipoRequerido) return true;
    
    // Sem permissão
    alert('Você não tem permissão para acessar esta página.');
    window.location.href = 'dashboard-parceiro.html';
    return false;
}

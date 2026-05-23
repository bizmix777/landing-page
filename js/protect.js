// ============================================
// PROTEÇÃO DE PÁGINAS - INCLUDE EM TODOS HTMLs
// ============================================

(function() {
    // Verificar se está na página de login
    const isLoginPage = window.location.pathname.includes('login.html');
    
    if (!isLoginPage) {
        // Verificar autenticação
        const auth = localStorage.getItem('bizmix_auth');
        const usuario = localStorage.getItem('bizmix_user');

        if (auth !== 'true' || !usuario) {
            // Redirecionar para login
            window.location.href = 'login.html';
        } else {
            // Usuário autenticado
            const user = JSON.parse(usuario);
            console.log('✅ Usuário autenticado:', user.email, '- Tipo:', user.tipo);
        }
    }
})();

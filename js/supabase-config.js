/**
 * ========================================
 * CONFIGURAÇÃO CENTRALIZADA DO SUPABASE
 * ========================================
 * 
 * Este arquivo é importado por TODOS os HTML do sistema
 * Mantém as credenciais em um único lugar
 * 
 * Última atualização: 2026-01-20
 */

// Configurações do Supabase
const SUPABASE_URL = 'https://zofxhfbjgvpbqjtlkbbk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3OTQ4NzEsImV4cCI6MjA1MjM3MDg3MX0.zLgPLnMnHbxJjrUZJbIvZNjOBMhRfVqhQYZR9fJdLzM';

// Variável global do cliente Supabase
let supabase;

// Inicializar Supabase
(function initSupabase() {
    if (typeof window !== 'undefined' && window.supabase) {
        try {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('✅ Supabase inicializado com sucesso');
            console.log('📡 URL:', SUPABASE_URL);
        } catch (error) {
            console.error('❌ Erro ao inicializar Supabase:', error);
        }
    } else {
        console.error('❌ Supabase SDK não foi carregado. Certifique-se de incluir o script antes deste arquivo.');
    }
})();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.SUPABASE_URL = SUPABASE_URL;
    window.SUPABASE_KEY = SUPABASE_KEY;
    window.supabase = supabase;
}

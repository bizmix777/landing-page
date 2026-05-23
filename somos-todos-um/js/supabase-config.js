// ============================================
// CONFIGURAÇÃO CENTRALIZADA DO SUPABASE
// Híbrido: REST API + SDK Oficial ✅
// ============================================

const SUPABASE_URL = 'https://hjlpmorykllywjodusqx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM';

console.log('✅ Configuração carregada:', SUPABASE_URL);

// --- 1. Inicializa o SDK Oficial (Se a biblioteca estiver carregada) ---
// Isso serve para o ADMIN e LOGIN
if (typeof supabase !== 'undefined' && typeof supabase.createClient === 'function') {
    console.log('🚀 Inicializando SDK do Supabase...');
    // Sobrescreve a variável global com o cliente inicializado
    window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
}

// --- 2. Funções REST API (Para formulários leves) ---
async function supabaseFetch(endpoint, options = {}) {
    // ... (Mantenha sua função igualzinha como estava antes) ...
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    
    const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    };
    
    try {
        const response = await fetch(url, {
            method: options.method || 'GET',
            headers: headers,
            body: options.body || null
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Erro HTTP: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('❌ Erro no supabaseFetch:', error);
        throw error;
    }
}

// ... (Mantenha a função supabaseFunction igual) ...

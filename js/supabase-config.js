// ============================================
// CONFIGURAÇÃO CENTRALIZADA DO SUPABASE
// Híbrido: REST API + SDK Oficial ✅
// ============================================

const SUPABASE_URL = 'https://fbmxioslmmnxldjnnulg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZibXhpb3NsbW1ueGxkam5udWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MDIxOTEsImV4cCI6MjEwNDk3ODE5MX0.wPY_UjlCVkJb0Ci5j0CYxxpaeYSjyN9GKc49tE31MU0';
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

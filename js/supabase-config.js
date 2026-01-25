// ============================================
// CONFIGURAÇÃO CENTRALIZADA DO SUPABASE
// SEM BIBLIOTECA (modo fetch direto) ✅
// ============================================

const SUPABASE_URL = 'https://zofxhfbjgvpbqjtlkbbk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM';

console.log('✅ Supabase config carregado (modo fetch direto):', SUPABASE_URL);

// ============================================
// FUNÇÕES AUXILIARES PARA FETCH DIRETO
// ============================================

// Função para fazer queries no Supabase via REST API
async function supabaseFetch(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    
    const defaultHeaders = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    };
    
    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers
        }
    };
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro na requisição');
    }
    
    return await response.json();
}

// Função para chamar Edge Functions
async function supabaseFunction(functionName, body = {}) {
    const url = `${SUPABASE_URL}/functions/v1/${functionName}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify(body)
    });
    
    const result = await response.json();
    return result;
}

console.log('✅ Funções auxiliares carregadas');

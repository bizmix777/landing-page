// ============================================
// CONFIGURAÇÃO CENTRALIZADA DO SUPABASE
// Modo REST API direto com fetch ✅
// ============================================

const SUPABASE_URL = 'https://zofxhfbjgvpbqjtlkbbk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM';

console.log('✅ Supabase config carregado:', SUPABASE_URL);

// ============================================
// FUNÇÃO PARA INSERIR DADOS (POST)
// ============================================
async function supabaseFetch(table, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${table}`;
    
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
            console.error('❌ Erro na resposta:', errorText);
            throw new Error(errorText || `Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('❌ Erro no supabaseFetch:', error);
        throw error;
    }
}

// ============================================
// FUNÇÃO PARA CHAMAR EDGE FUNCTIONS
// ============================================
async function supabaseFunction(functionName, body = {}) {
    const url = `${SUPABASE_URL}/functions/v1/${functionName}`;
    
    try {
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
        
    } catch (error) {
        console.error('❌ Erro ao chamar Edge Function:', error);
        throw error;
    }
}

console.log('✅ Funções Supabase carregadas');

// ============================================
// SUPABASE CONFIGURATION
// Usando biblioteca oficial @supabase/supabase-js
// ============================================

const SUPABASE_URL = 'https://zofxhfbjgvpbqjtlkbbk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM';

// ============================================
// VERIFICAR SE O CDN FOI CARREGADO
// ============================================

if (typeof window.supabase === 'undefined') {
  console.error('❌ ERRO CRÍTICO: Supabase CDN não foi carregado!');
  console.error('Verifique se esta linha está no <head> do HTML:');
  console.error('<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>');
  throw new Error('Supabase CDN não carregado');
}

console.log('✅ Supabase CDN detectado');

// ============================================
// CRIAR CLIENTE SUPABASE
// ============================================

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// VALIDAR CRIAÇÃO DO CLIENTE
// ============================================

if (!supabase || typeof supabase.from !== 'function') {
  console.error('❌ ERRO: Cliente Supabase não foi criado corretamente!');
  console.error('Objeto supabase:', supabase);
  throw new Error('Falha ao criar cliente Supabase');
}

console.log('✅ Cliente Supabase criado com sucesso!');
console.log('✅ URL:', SUPABASE_URL);
console.log('✅ Métodos disponíveis:', Object.keys(supabase).slice(0, 10).join(', ') + '...');

// ============================================
// EXPORTAR PARA O ESCOPO GLOBAL
// ============================================

window.supabase = supabase;

console.log('✅ Supabase disponível globalmente como window.supabase');

// ============================================
// TESTE RÁPIDO (OPCIONAL - pode comentar depois)
// ============================================

// Testar se consegue acessar a tabela
supabase
  .from('clientes')
  .select('count')
  .then(({ data, error }) => {
    if (error) {
      console.warn('⚠️ Erro ao testar conexão com tabela clientes:', error.message);
    } else {
      console.log('✅ Conexão com tabela clientes OK!');
    }
  });

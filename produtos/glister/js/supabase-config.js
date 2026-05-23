// ============================================
// SUPABASE CONFIGURATION
// Versão sem conflito de variáveis
// ============================================

(function() {
  'use strict';
  
  const SUPABASE_URL = 'https://hjlpmorykllywjodusqx.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM';

  // Verificar se o CDN foi carregado
  if (typeof window.supabase === 'undefined' || typeof window.supabase.createClient !== 'function') {
    console.error('❌ ERRO CRÍTICO: Supabase CDN não foi carregado corretamente!');
    console.error('Verifique se esta linha está no <head> do HTML ANTES do supabase-config.js:');
    console.error('<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0"></script>');
    return;
  }

  console.log('✅ Supabase CDN detectado');

  // Criar cliente Supabase e substituir o objeto global
  try {
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Validar criação
    if (!supabaseClient || typeof supabaseClient.from !== 'function') {
      console.error('❌ ERRO: Cliente Supabase não foi criado corretamente!');
      console.error('Objeto supabase:', supabaseClient);
      return;
    }

    // Substituir o objeto global (sobrescrever sem conflito)
    window.supabase = supabaseClient;
    
    console.log('✅ Cliente Supabase criado com sucesso!');
    console.log('✅ URL:', SUPABASE_URL);
    console.log('✅ Método .from() disponível:', typeof window.supabase.from === 'function');
    
    // Teste de conexão
    window.supabase
      .from('clientes')
      .select('count', { count: 'exact', head: true })
      .then(function(response) {
        if (response.error) {
          console.warn('⚠️ Aviso ao testar conexão:', response.error.message);
        } else {
          console.log('✅ Conexão com tabela clientes OK!');
        }
      })
      .catch(function(error) {
        console.warn('⚠️ Erro ao testar conexão:', error.message);
      });
      
  } catch (error) {
    console.error('❌ Erro ao criar cliente Supabase:', error);
  }

})();

console.log('✅ Supabase config carregado');

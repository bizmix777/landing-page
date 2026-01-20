/**
 * Configuração centralizada do Supabase
 * Usado por todas as páginas do sistema
 * Atualizado: 2026-01-20
 */

const SUPABASE_URL = 'https://zofxhfbjgvpbqjtlkbbk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM';

// Verificar se já existe e inicializar
if (typeof window.supabase === 'undefined' || !window.supabase.from) {
    window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ Supabase inicializado com sucesso');
    console.log('📡 Conectado em:', SUPABASE_URL);
} else {
    console.log('⚠️ Supabase já estava inicializado');
}

// Criar alias global
var supabase = window.supabase;

console.log('📦 supabase-config.js carregado');

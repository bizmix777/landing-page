/**
 * Configuração centralizada do Supabase
 * Usado por todas as páginas do sistema
 */

const SUPABASE_URL = 'https://zofxhfbjgvpbqjtlkbbk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3OTQ4NzEsImV4cCI6MjA1MjM3MDg3MX0.zLgPLnMnHbxJjrUZJbIvZNjOBMhRfVqhQYZR9fJdLzM';

// Usar VAR ou verificar se já existe
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

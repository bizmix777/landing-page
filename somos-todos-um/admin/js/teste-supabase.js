console.log('🚀 Script teste-supabase.js carregado');

const SUPABASE_URL = 'https://zofxhfbjgvpbqjtlkbbk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM';

let supabase;

// Aguardar o Supabase carregar
window.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM carregado');
    
    if (window.supabase) {
        const { createClient } = window.supabase;
        supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log('✅ Supabase client criado');
    } else {
        console.error('❌ Biblioteca Supabase não carregou');
    }
});

async function testarConexao() {
    console.log('🔍 Função testarConexao() chamada');
    
    const resultado = document.getElementById('resultado');
    
    if (!supabase) {
        resultado.innerHTML = '<p class="error">❌ Erro: Supabase não foi inicializado. Recarregue a página.</p>';
        return;
    }
    
    resultado.innerHTML = '<p>⏳ Testando conexão... Aguarde...</p>';

    try {
        // Teste 1: Buscar igrejas
        console.log('📥 Tentando buscar igrejas...');
        
        const { data: igrejas, error: igrejasError } = await supabase
            .from('igrejas')
            .select('*')
            .limit(10);

        console.log('📊 Igrejas recebidas:', igrejas);
        console.log('📊 Erro (se houver):', igrejasError);

        if (igrejasError) {
            console.error('❌ Erro ao buscar igrejas:', igrejasError);
            throw igrejasError;
        }

        // Teste 2: Buscar vendas
        console.log('📥 Tentando buscar vendas...');
        
        const { data: vendas, error: vendasError } = await supabase
            .from('vendas')
            .select('*')
            .limit(10);

        console.log('📊 Vendas recebidas:', vendas);
        console.log('📊 Erro vendas (se houver):', vendasError);

        if (vendasError) {
            console.error('⚠️ Erro ao buscar vendas (pode não ter dados ainda):', vendasError);
        }

        // Sucesso!
        console.log('✅ TESTE CONCLUÍDO COM SUCESSO!');
        
        resultado.innerHTML = `
            <h2 class="success">✅ CONEXÃO OK!</h2>
            <p><strong>✅ Igrejas encontradas:</strong> ${igrejas ? igrejas.length : 0}</p>
            <p><strong>✅ Vendas encontradas:</strong> ${vendas ? vendas.length : 0}</p>
            
            <h3>📋 Igrejas Cadastradas:</h3>
            ${igrejas && igrejas.length > 0 ? 
                `<table border="1" cellpadding="10" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Pastor</th>
                            <th>Comissão</th>
                            <th>Ativa</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${igrejas.map(i => `
                            <tr>
                                <td>${i.nome}</td>
                                <td>${i.cidade || 'N/A'}</td>
                                <td>${i.estado || 'N/A'}</td>
                                <td>${i.pastor || 'N/A'}</td>
                                <td>${i.percentual_comissao}%</td>
                                <td>${i.ativa ? '✅' : '❌'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>` : 
                '<p class="error">⚠️ Nenhuma igreja encontrada.</p>'
            }
            
            <h3>📋 Vendas Recentes:</h3>
            ${vendas && vendas.length > 0 ? 
                `<p>Total de vendas: ${vendas.length}</p>
                <pre>${JSON.stringify(vendas, null, 2)}</pre>` : 
                '<p class="error">⚠️ Nenhuma venda encontrada ainda.</p>'
            }
        `;

    } catch (error) {
        console.error('❌ ERRO CAPTURADO:', error);
        
        resultado.innerHTML = `
            <h2 class="error">❌ ERRO NA CONEXÃO</h2>
            <p><strong>Mensagem:</strong> ${error.message || 'Erro desconhecido'}</p>
            <p><strong>Código:</strong> ${error.code || 'N/A'}</p>
            <p><strong>Detalhes:</strong> ${error.details || 'N/A'}</p>
            <p><strong>Hint:</strong> ${error.hint || 'N/A'}</p>
            
            <h3>🔍 Possíveis Causas:</h3>
            <ul>
                <li>❌ RLS (Row Level Security) está bloqueando acesso</li>
                <li>❌ Política de segurança não está configurada corretamente</li>
                <li>❌ Credenciais Supabase inválidas</li>
                <li>❌ CORS bloqueando requisições</li>
            </ul>
            
            <h3>📋 Erro Completo:</h3>
            <pre>${JSON.stringify(error, null, 2)}</pre>
        `;
    }
}

// Tornar a função global
window.testarConexao = testarConexao;
console.log('✅ Função testarConexao() registrada globalmente');

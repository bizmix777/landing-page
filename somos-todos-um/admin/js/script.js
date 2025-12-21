const SUPABASE_URL = 'https://zofxhfbjgvpbqjtlkbbk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM';

const clienteSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// VERIFICAR AUTENTICAÇÃO
async function verificarAuth() {
    const { data: { session } } = await clienteSupabase.auth.getSession();
    
    if (!session) {
        window.location.href = '/admin/login.html';
        return false;
    }
    return true;
}

async function logout() {
    await clienteSupabase.auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/admin/login.html';
}

async function carregarDados() {
    try {
        const { data: organizacoes } = await clienteSupabase
            .from('somos')
            .select('*')
            .order('created_at', { ascending: false });

        const { data: vendas } = await clienteSupabase
            .from('vendas')
            .select(`
                *,
                somos (nome)
            `)
            .order('created_at', { ascending: false })
            .limit(50);

        document.getElementById('totalOrganizacoes').textContent = organizacoes ? organizacoes.length : 0;
        document.getElementById('totalVendas').textContent = vendas ? vendas.length : 0;
        
        const valorTotal = vendas ? vendas.reduce((acc, v) => acc + parseFloat(v.valor_venda || 0), 0) : 0;
        document.getElementById('valorTotal').textContent = `R$ ${valorTotal.toFixed(2)}`;
        
        const comissoesPendentes = vendas ? vendas.reduce((acc, v) => acc + parseFloat(v.comissao_valor || 0), 0) : 0;
        document.getElementById('comissoesPendentes').textContent = `R$ ${comissoesPendentes.toFixed(2)}`;

        renderizarOrganizacoes(organizacoes || []);
        renderizarVendas(vendas || []);

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

function renderizarOrganizacoes(organizacoes) {
    const tbody = document.getElementById('tbodyOrganizacoes');
    tbody.innerHTML = '';

    organizacoes.forEach(org => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${org.nome}</td>
            <td>${org.tipo}</td>
            <td><strong>${org.codigo_indicacao}</strong></td>
            <td>${org.percentual_comissao}%</td>
            <td>${org.responsavel}</td>
            <td>
                <button class="btn btn-primary" onclick="editarOrganizacao('${org.id}')">
                    Editar
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('loadingOrganizacoes').style.display = 'none';
    document.getElementById('tabelaOrganizacoes').style.display = 'table';
}

function renderizarVendas(vendas) {
    const tbody = document.getElementById('tbodyVendas');
    tbody.innerHTML = '';

    vendas.forEach(venda => {
        const data = new Date(venda.created_at).toLocaleDateString('pt-BR');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${data}</td>
            <td>${venda.nome_comprador}</td>
            <td>${venda.somos ? venda.somos.nome : 'N/A'}</td>
            <td>R$ ${parseFloat(venda.valor_venda || 0).toFixed(2)}</td>
            <td>R$ ${parseFloat(venda.comissao_valor || 0).toFixed(2)}</td>
            <td>
                <span class="badge badge-${venda.status}">
                    ${venda.status}
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('loadingVendas').style.display = 'none';
    document.getElementById('tabelaVendas').style.display = 'table';
}

function editarOrganizacao(id) {
    alert('Função de edição em desenvolvimento. ID: ' + id);
}

// INICIALIZAÇÃO
(async function init() {
    const autenticado = await verificarAuth();
    if (autenticado) {
        await carregarDados();
    }
})();

// ============================================
// DASHBOARD ADMIN - BIZMIX
// ============================================

let todosOsParceiros = [];
let filtroAtual = 'todos';

document.addEventListener('DOMContentLoaded', async function() {
    // Verificar se é admin
    const usuario = verificarAutenticacao();
    if (usuario.tipo !== 'super_admin' && usuario.tipo !== 'admin') {
        alert('Acesso negado! Apenas administradores podem acessar esta página.');
        window.location.href = 'dashboard-parceiro.html';
        return;
    }

    // Mostrar nome do usuário
    document.getElementById('userName').textContent = usuario.nome;
    document.getElementById('userRole').textContent = usuario.tipo === 'super_admin' ? 'Super Admin' : 'Admin';

    // Carregar dados
    await carregarEstatisticas();
    await carregarParceiros();
    configurarFiltros();
    configurarBusca();
});

// ========================================
// CARREGAR ESTATÍSTICAS
// ========================================
async function carregarEstatisticas() {
    try {
        const { data, error } = await supabase
            .from('vw_estatisticas_usuarios')
            .select('*')
            .single();

        if (error) throw error;

        const stats = data;

        // Criar cards
        const statsGrid = document.getElementById('statsGrid');
        statsGrid.innerHTML = `
            <div class="stat-card">
                <div class="stat-header">
                    <div>
                        <div class="stat-label">Total de Usuários</div>
                        <div class="stat-value">${stats.total_geral}</div>
                    </div>
                    <div class="stat-icon">👥</div>
                </div>
                <div class="stat-footer">
                    <span class="stat-badge badge-success">${stats.total_ativos} ativos</span>
                    <span class="stat-badge badge-warning">${stats.total_inativos} inativos</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <div>
                        <div class="stat-label">Parceiros CPF</div>
                        <div class="stat-value">${stats.total_parceiros_cpf}</div>
                    </div>
                    <div class="stat-icon">🧑</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <div>
                        <div class="stat-label">Igrejas</div>
                        <div class="stat-value">${stats.total_igrejas}</div>
                    </div>
                    <div class="stat-icon">⛪</div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <div>
                        <div class="stat-label">Empresas</div>
                        <div class="stat-value">${stats.total_empresas}</div>
                    </div>
                    <div class="stat-icon">🏢</div>
                </div>
            </div>
        `;

        // Criar gráficos
        criarGraficos(stats);

    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

// ========================================
// CRIAR GRÁFICOS
// ========================================
function criarGraficos(stats) {
    // Gráfico de Tipos
    const ctxTipos = document.getElementById('chartTipos').getContext('2d');
    new Chart(ctxTipos, {
        type: 'doughnut',
        data: {
            labels: ['Parceiros CPF', 'Igrejas', 'Empresas'],
            datasets: [{
                data: [
                    stats.total_parceiros_cpf,
                    stats.total_igrejas,
                    stats.total_empresas
                ],
                backgroundColor: [
                    '#3b82f6',
                    '#ec4899',
                    '#8b5cf6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Gráfico de Status
    const ctxStatus = document.getElementById('chartStatus').getContext('2d');
    new Chart(ctxStatus, {
        type: 'bar',
        data: {
            labels: ['Ativos', 'Inativos'],
            datasets: [{
                label: 'Quantidade',
                data: [stats.total_ativos, stats.total_inativos],
                backgroundColor: [
                    '#10b981',
                    '#ef4444'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// ========================================
// CARREGAR PARCEIROS
// ========================================
async function carregarParceiros() {
    try {
        const { data, error } = await supabase
            .from('vw_parceiros_ativos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        todosOsParceiros = data;
        renderizarTabela(todosOsParceiros);

    } catch (error) {
        console.error('Erro ao carregar parceiros:', error);
        document.getElementById('tableBody').innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #ef4444;">
                    ❌ Erro ao carregar dados
                </td>
            </tr>
        `;
    }
}

// ========================================
// RENDERIZAR TABELA
// ========================================
function renderizarTabela(parceiros) {
    const tableBody = document.getElementById('tableBody');

    if (parceiros.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; color: #6b7280;">
                    Nenhum parceiro encontrado
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = parceiros.map(p => {
        // Definir badge de tipo
        let tipoBadge = '';
        if (p.tipo_entidade === 'parceiro_cpf') {
            tipoBadge = '<span class="badge badge-cpf">CPF</span>';
        } else if (p.tipo_entidade === 'igreja') {
            tipoBadge = '<span class="badge badge-igreja">Igreja</span>';
        } else if (p.tipo_entidade === 'empresa_cnpj') {
            tipoBadge = '<span class="badge badge-empresa">Empresa</span>';
        }

        // Definir badge de status
        const statusBadge = p.status === 'ativo' 
            ? '<span class="badge badge-ativo">Ativo</span>'
            : '<span class="badge badge-inativo">Inativo</span>';

        // Formatar data
        const data = new Date(p.created_at).toLocaleDateString('pt-BR');

        return `
            <tr>
                <td><strong>${p.nome}</strong></td>
                <td>${p.email}</td>
                <td>${tipoBadge}</td>
                <td>${p.percentual_comissao || 0}%</td>
                <td>${statusBadge}</td>
                <td>${data}</td>
            </tr>
        `;
    }).join('');
}

// ========================================
// CONFIGURAR FILTROS
// ========================================
function configurarFiltros() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover active de todos
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Adicionar active no clicado
            this.classList.add('active');

            // Aplicar filtro
            const filtro = this.dataset.filter;
            filtroAtual = filtro;
            aplicarFiltros();
        });
    });
}

// ========================================
// APLICAR FILTROS
// ========================================
function aplicarFiltros() {
    let parceiros = [...todosOsParceiros];

    // Filtrar por tipo/status
    if (filtroAtual !== 'todos') {
        if (filtroAtual === 'ativo' || filtroAtual === 'inativo') {
            parceiros = parceiros.filter(p => p.status === filtroAtual);
        } else {
            parceiros = parceiros.filter(p => p.tipo_entidade === filtroAtual);
        }
    }

    // Aplicar busca
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    if (searchTerm) {
        parceiros = parceiros.filter(p => 
            p.nome.toLowerCase().includes(searchTerm) ||
            p.email.toLowerCase().includes(searchTerm)
        );
    }

    renderizarTabela(parceiros);
}

// ========================================
// CONFIGURAR BUSCA
// ========================================
function configurarBusca() {
    const searchBox = document.getElementById('searchBox');
    
    searchBox.addEventListener('input', function() {
        aplicarFiltros();
    });
}

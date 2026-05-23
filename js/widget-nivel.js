/**
 * Widget de Nível BizMix
 * Componente reutilizável para exibir nível do parceiro
 * 
 * USO:
 * 1. Incluir o script: <script src="/jc/widget-nivel.js"></script>
 * 2. Adicionar div: <div id="widget-nivel" data-parceiro-id="UUID"></div>
 * 3. Chamar: WidgetNivel.init();
 */

const WidgetNivel = {
    
    // Configurações
    config: {
        containerId: 'widget-nivel',
        autoLoad: true,
        showProgress: true,
        showBadges: true,
        compact: false
    },

    // Estilos CSS
    styles: `
        .widget-nivel-container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 20px;
            color: white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .widget-nivel-compact {
            padding: 15px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .widget-nivel-header {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
        }

        .widget-nivel-icon {
            font-size: 3rem;
            line-height: 1;
        }

        .widget-nivel-compact .widget-nivel-icon {
            font-size: 2rem;
        }

        .widget-nivel-info {
            flex: 1;
        }

        .widget-nivel-nome {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .widget-nivel-compact .widget-nivel-nome {
            font-size: 1.2rem;
            margin-bottom: 0;
        }

        .widget-nivel-stats {
            font-size: 0.9rem;
            opacity: 0.95;
        }

        .widget-nivel-stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-top: 15px;
        }

        .widget-nivel-stat {
            text-align: center;
            background: rgba(255,255,255,0.15);
            padding: 10px;
            border-radius: 8px;
        }

        .widget-nivel-stat-label {
            font-size: 0.75rem;
            opacity: 0.9;
            margin-bottom: 3px;
        }

        .widget-nivel-stat-value {
            font-size: 1.3rem;
            font-weight: 700;
        }

        .widget-nivel-progress {
            margin-top: 15px;
        }

        .widget-nivel-progress-label {
            font-size: 0.85rem;
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            opacity: 0.95;
        }

        .widget-nivel-progress-bar {
            background: rgba(255,255,255,0.2);
            height: 12px;
            border-radius: 6px;
            overflow: hidden;
        }

        .widget-nivel-progress-fill {
            background: linear-gradient(90deg, #28a745, #20c997);
            height: 100%;
            transition: width 0.3s ease;
            border-radius: 6px;
        }

        .widget-nivel-badges {
            display: flex;
            gap: 8px;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid rgba(255,255,255,0.2);
        }

        .widget-nivel-badge {
            font-size: 1.5rem;
            opacity: 0.9;
            transition: transform 0.2s ease;
        }

        .widget-nivel-badge:hover {
            transform: scale(1.2);
            opacity: 1;
        }

        .widget-nivel-loading {
            text-align: center;
            padding: 20px;
        }

        .widget-nivel-spinner {
            width: 30px;
            height: 30px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: widget-spin 1s linear infinite;
            margin: 0 auto 10px;
        }

        @keyframes widget-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .widget-nivel-error {
            background: #dc3545;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }

        .widget-nivel-btn {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            padding: 8px 15px;
            border-radius: 6px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 15px;
            display: inline-block;
            text-decoration: none;
        }

        .widget-nivel-btn:hover {
            background: rgba(255,255,255,0.3);
            border-color: rgba(255,255,255,0.5);
        }
    `,

    // Inicializar widget
    async init(options = {}) {
        console.log('🎮 Widget de Nível - Inicializando...');

        // Mesclar configurações
        this.config = { ...this.config, ...options };

        // Injetar estilos
        this.injectStyles();

        // Buscar containers
        const containers = document.querySelectorAll(`#${this.config.containerId}`);
        
        if (containers.length === 0) {
            console.warn('⚠️ Nenhum container encontrado para o widget');
            return;
        }

        // Renderizar cada widget
        for (const container of containers) {
            const parceiroId = container.getAttribute('data-parceiro-id');
            const compact = container.hasAttribute('data-compact');
            const showProgress = !container.hasAttribute('data-no-progress');
            const showBadges = !container.hasAttribute('data-no-badges');

            if (!parceiroId) {
                this.renderError(container, 'ID do parceiro não fornecido');
                continue;
            }

            // Mostrar loading
            this.renderLoading(container);

            // Carregar dados
            try {
                const dados = await this.carregarDados(parceiroId);
                this.renderWidget(container, dados, { compact, showProgress, showBadges });
            } catch (error) {
                console.error('❌ Erro ao carregar widget:', error);
                this.renderError(container, error.message);
            }
        }
    },

    // Injetar estilos no documento
    injectStyles() {
        if (!document.getElementById('widget-nivel-styles')) {
            const style = document.createElement('style');
            style.id = 'widget-nivel-styles';
            style.textContent = this.styles;
            document.head.appendChild(style);
        }
    },

    // Carregar dados do parceiro
    async carregarDados(parceiroId) {
        const SUPABASE_URL = window.SUPABASE_URL || 'https://hjlpmorykllywjodusqx.supabase.co';
        const SUPABASE_KEY = window.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM';

        const response = await fetch(`${SUPABASE_URL}/functions/v1/atualizar-gamificacao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_KEY}`
            },
            body: JSON.stringify({ parceiro_id: parceiroId })
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Erro ao carregar dados');
        }

        return result;
    },

    // Renderizar loading
    renderLoading(container) {
        container.innerHTML = `
            <div class="widget-nivel-container">
                <div class="widget-nivel-loading">
                    <div class="widget-nivel-spinner"></div>
                    <div>Carregando nível...</div>
                </div>
            </div>
        `;
    },

    // Renderizar erro
    renderError(container, message) {
        container.innerHTML = `
            <div class="widget-nivel-error">
                ❌ ${message}
            </div>
        `;
    },

    // Renderizar widget
    renderWidget(container, dados, options) {
        const parceiro = dados.parceiro;
        const nivel = parceiro.nivel;
        const badges = dados.badges_conquistados || [];

        const comissaoTotal = 10 + (nivel.comissao_bonus || 0);

        // Calcular progresso para próximo nível
        let progressHtml = '';
        if (options.showProgress && dados.nivel_info) {
            // Aqui você pode adicionar lógica para calcular progresso
            // Exemplo simples: assumir que precisa de X vendas para próximo nível
            progressHtml = `
                <div class="widget-nivel-progress">
                    <div class="widget-nivel-progress-label">
                        <span>Continue vendendo!</span>
                        <span>${parceiro.total_vendas} vendas</span>
                    </div>
                    <div class="widget-nivel-progress-bar">
                        <div class="widget-nivel-progress-fill" style="width: ${Math.min((parceiro.total_vendas / 5) * 100, 100)}%"></div>
                    </div>
                </div>
            `;
        }

        // Badges HTML
        let badgesHtml = '';
        if (options.showBadges && badges.length > 0) {
            const badgesLimited = badges.slice(0, 5); // Mostrar só 5
            badgesHtml = `
                <div class="widget-nivel-badges">
                    ${badgesLimited.map(b => `<span class="widget-nivel-badge" title="${b.nome}">${b.icone}</span>`).join('')}
                    ${badges.length > 5 ? `<span style="opacity: 0.7;">+${badges.length - 5}</span>` : ''}
                </div>
            `;
        }

        // Modo compacto
        if (options.compact) {
            container.innerHTML = `
                <div class="widget-nivel-container widget-nivel-compact">
                    <div class="widget-nivel-icon">${nivel.icone}</div>
                    <div class="widget-nivel-info">
                        <div class="widget-nivel-nome">${nivel.nome}</div>
                        <div class="widget-nivel-stats">
                            ${parceiro.total_vendas} vendas • ${parceiro.taxa_conversao.toFixed(1)}% conversão • ${comissaoTotal}% comissão
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Modo completo
            container.innerHTML = `
                <div class="widget-nivel-container">
                    <div class="widget-nivel-header">
                        <div class="widget-nivel-icon">${nivel.icone}</div>
                        <div class="widget-nivel-info">
                            <div class="widget-nivel-nome">${nivel.nome}</div>
                            <div class="widget-nivel-stats">Nível ${nivel.ordem} de 6</div>
                        </div>
                    </div>

                    <div class="widget-nivel-stats-grid">
                        <div class="widget-nivel-stat">
                            <div class="widget-nivel-stat-label">Vendas</div>
                            <div class="widget-nivel-stat-value">${parceiro.total_vendas}</div>
                        </div>
                        <div class="widget-nivel-stat">
                            <div class="widget-nivel-stat-label">Conversão</div>
                            <div class="widget-nivel-stat-value">${parceiro.taxa_conversao.toFixed(1)}%</div>
                        </div>
                        <div class="widget-nivel-stat">
                            <div class="widget-nivel-stat-label">Comissão</div>
                            <div class="widget-nivel-stat-value">${comissaoTotal}%</div>
                        </div>
                    </div>

                    ${progressHtml}
                    ${badgesHtml}

                    <a href="/gamificacao.html?parceiro=${parceiro.id}" class="widget-nivel-btn">
                        Ver Detalhes Completos →
                    </a>
                </div>
            `;
        }

        console.log('✅ Widget renderizado com sucesso');
    }
};

// Auto-inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WidgetNivel.init());
} else {
    WidgetNivel.init();
}

// Exportar para uso global
window.WidgetNivel = WidgetNivel;

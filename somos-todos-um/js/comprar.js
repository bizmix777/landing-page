const SUPABASE_URL = 'https://zofxhfbjgvpbqjtlkbbk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZnhoZmJqZ3ZwYnFqdGxrYmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNzY2MDAsImV4cCI6MjA4MTc1MjYwMH0.cOkzl5m_FzkACi6yc7398VKNhefK3I_JcRN8df1ILzM';

const clienteSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PRECO_UNITARIO = 29.90;
const PERCENTUAL_COMISSAO = 0.40; // 40%

let organizacaoSelecionada = null;

// ATUALIZAR RESUMO QUANDO MUDAR QUANTIDADE
document.getElementById('quantidade').addEventListener('change', atualizarResumo);

// VERIFICAR CÓDIGO DE INDICAÇÃO
document.getElementById('codigo').addEventListener('blur', verificarCodigo);

// SUBMIT DO FORMULÁRIO
document.getElementById('formCompra').addEventListener('submit', finalizarCompra);

function atualizarResumo() {
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valorTotal = (PRECO_UNITARIO * quantidade).toFixed(2);
    
    document.getElementById('resumoQuantidade').textContent = `${quantidade} ${quantidade === 1 ? 'livro' : 'livros'}`;
    document.getElementById('resumoTotal').textContent = `R$ ${valorTotal}`;
    
    if (organizacaoSelecionada) {
        const comissao = (parseFloat(valorTotal) * PERCENTUAL_COMISSAO).toFixed(2);
        document.getElementById('resumoComissaoValor').textContent = `R$ ${comissao}`;
        document.getElementById('resumoComissao').style.display = 'flex';
    }
}

async function verificarCodigo() {
    const codigo = document.getElementById('codigo').value.trim().toUpperCase();
    const statusElement = document.getElementById('codigoStatus');
    
    if (!codigo) {
        statusElement.textContent = '';
        statusElement.className = 'codigo-status';
        organizacaoSelecionada = null;
        document.getElementById('resumoComissao').style.display = 'none';
        return;
    }
    
    try {
        const { data, error } = await clienteSupabase
            .from('somos')
            .select('*')
            .eq('codigo_indicacao', codigo)
            .single();
        
        if (error || !data) {
            statusElement.textContent = '❌ Código inválido';
            statusElement.className = 'codigo-status invalido';
            organizacaoSelecionada = null;
            document.getElementById('resumoComissao').style.display = 'none';
        } else {
            statusElement.textContent = `✅ Código válido! Organização: ${data.nome}`;
            statusElement.className = 'codigo-status valido';
            organizacaoSelecionada = data;
            atualizarResumo();
        }
    } catch (err) {
        console.error('Erro ao verificar código:', err);
        statusElement.textContent = '⚠️ Erro ao verificar código';
        statusElement.className = 'codigo-status invalido';
    }
}

async function finalizarCompra(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const valorTotal = (PRECO_UNITARIO * quantidade).toFixed(2);
    
    // CALCULAR COMISSÃO
    let comissaoValor = 0;
    let somos_id = null;
    
    if (organizacaoSelecionada) {
        comissaoValor = (parseFloat(valorTotal) * PERCENTUAL_COMISSAO).toFixed(2);
        somos_id = organizacaoSelecionada.id;
    }
    
    // REGISTRAR VENDA NO BANCO
    try {
        const { data, error } = await clienteSupabase
            .from('vendas')
            .insert([
                {
                    nome_comprador: nome,
                    email_comprador: email,
                    whatsapp_comprador: whatsapp,
                    endereco_entrega: endereco,
                    quantidade: quantidade,
                    valor_venda: parseFloat(valorTotal),
                    comissao_valor: parseFloat(comissaoValor),
                    organizacao_ic: somos_id,
                    status: 'pendente',
                    forma_pagamento: 'pix'
                }
            ])
            .select();
        
        if (error) {
            alert('Erro ao registrar venda: ' + error.message);
            return;
        }
        
        // MOSTRAR MODAL COM INSTRUÇÕES DE PIX
        const numeroPedido = data[0].id.substring(0, 8).toUpperCase();
        document.getElementById('numeroPedido').textContent = numeroPedido;
        document.getElementById('valorPix').textContent = `R$ ${valorTotal}`;
        
        document.getElementById('modalPix').classList.add('active');
        
        // LIMPAR FORMULÁRIO
        document.getElementById('formCompra').reset();
        organizacaoSelecionada = null;
        atualizarResumo();
        
    } catch (err) {
        console.error('Erro ao finalizar compra:', err);
        alert('Erro ao processar pedido. Tente novamente.');
    }
}

function fecharModal() {
    document.getElementById('modalPix').classList.remove('active');
}

// INICIALIZAR
atualizarResumo();

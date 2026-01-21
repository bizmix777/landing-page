/**
 * Lógica do checkout PIX
 * Atualizado: 2026-01-21
 */

const CHECKOUT_PIX = {
  
  // Processar pagamento via PIX
  processar: async function(dados) {
    console.log('💳 Processando pagamento PIX...')
    console.log('📊 Dados:', dados)

    try {
      // Validar dados
      if (!this.validarDados(dados)) {
        throw new Error('Dados inválidos')
      }

      // Calcular comissão
      const valorTotal = CHECKOUT_CONFIG.produto.preco
      const valorComissao = CHECKOUT_CONFIG.calcularComissao(valorTotal)

      console.log('💰 Valor total:', valorTotal)
      console.log('💵 Comissão (30%):', valorComissao)

      // Criar registro da venda no Supabase
      const { data: venda, error } = await supabase
        .from('vendas')
        .insert([{
          nome_comprador: dados.nome,
          email_comprador: dados.email,
          telefone_comprador: dados.telefone,
          cpf_comprador: dados.cpf,
          valor_total: valorTotal,
          valor_comissao: valorComissao,
          comissao_percentual: CHECKOUT_CONFIG.produto.comissao_percentual,
          status_pagamento: 'pending',
          forma_pagamento: 'pix',
          referencia: dados.referencia || null,
          downloads: 0
        }])
        .select()

      if (error) {
        console.error('❌ Erro ao criar venda:', error)
        throw error
      }

      console.log('✅ Venda criada:', venda[0])

      // Redirecionar para página de pagamento PIX
      const vendaId = venda[0].id
      const urlPix = `${CHECKOUT_CONFIG.urls.pix}?venda_id=${vendaId}`
      
      console.log('🔀 Redirecionando para:', urlPix)
      window.location.href = urlPix

      return { success: true, vendaId: vendaId }

    } catch (error) {
      console.error('❌ Erro no processamento:', error)
      return { success: false, error: error.message }
    }
  },

  // Validar dados do formulário
  validarDados: function(dados) {
    if (!dados.nome || dados.nome.trim().length < 3) {
      alert('❌ Nome deve ter pelo menos 3 caracteres')
      return false
    }

    if (!CHECKOUT_CONFIG.validarEmail(dados.email)) {
      alert('❌ Email inválido')
      return false
    }

    if (!CHECKOUT_CONFIG.validarTelefone(dados.telefone)) {
      alert('❌ Telefone inválido')
      return false
    }

    if (!CHECKOUT_CONFIG.validarCPF(dados.cpf)) {
      alert('❌ CPF inválido')
      return false
    }

    return true
  }
}

// Exportar globalmente
window.CHECKOUT_PIX = CHECKOUT_PIX

console.log('💳 checkout-pix.js carregado')

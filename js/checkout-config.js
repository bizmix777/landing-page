/**
 * Configuração centralizada do Checkout
 * Usado por todas as páginas de pagamento
 * Atualizado: 2026-01-21
 */

const CHECKOUT_CONFIG = {
  // Informações do Produto
  produto: {
    nome: 'Livro Digital - Somos Todos Um',
    preco: 29.90,
    comissao_percentual: 30
  },

  // URLs de redirecionamento
  urls: {
    pix: '/somos-todos-um/parceiros/pagamento-pix.html',
    cartao: '/somos-todos-um/parceiros/pagamento-cartao.html', // Futuro
    sucesso: '/somos-todos-um/parceiros/confirmacao.html',
    erro: '/somos-todos-um/parceiros/erro.html'
  },

  // Funções auxiliares
  calcularComissao: function(valor) {
    return Number((valor * (this.produto.comissao_percentual / 100)).toFixed(2))
  },

  // Máscaras de input
  aplicarMascaraTelefone: function(valor) {
    valor = valor.replace(/\D/g, '')
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2')
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2')
    return valor
  },

  aplicarMascaraCPF: function(valor) {
    valor = valor.replace(/\D/g, '')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2')
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    return valor
  },

  // Validações
  validarEmail: function(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  },

  validarTelefone: function(telefone) {
    const numero = telefone.replace(/\D/g, '')
    return numero.length >= 10 && numero.length <= 11
  },

  validarCPF: function(cpf) {
    const numero = cpf.replace(/\D/g, '')
    return numero.length === 11
  },

  // Obter parâmetro da URL
  obterParametroURL: function(nome) {
    const params = new URLSearchParams(window.location.search)
    return params.get(nome)
  },

  // Formatar moeda
  formatarMoeda: function(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }
}

// Exportar globalmente
window.CHECKOUT_CONFIG = CHECKOUT_CONFIG

console.log('📦 checkout-config.js carregado')
console.log('💰 Produto:', CHECKOUT_CONFIG.produto.nome)
console.log('💵 Preço:', CHECKOUT_CONFIG.formatarMoeda(CHECKOUT_CONFIG.produto.preco))

// pix-generator.js
// Gerador de QR Code PIX para pagamentos

class PixGenerator {
  constructor(config) {
    this.pixKey = config.pixKey // Chave PIX
    this.merchantName = config.merchantName // Nome do recebedor
    this.merchantCity = config.merchantCity // Cidade
    this.txid = config.txid // ID da transação
    this.amount = config.amount // Valor
  }

  // Gera o código PIX no formato EMV
  generatePayload() {
    const payload = [
      this.getValue('00', '01'), // Payload Format Indicator
      this.getValue('26', this.getMerchantAccount()), // Merchant Account
      this.getValue('52', '0000'), // Merchant Category Code
      this.getValue('53', '986'), // Currency (BRL)
      this.getValue('54', this.amount.toFixed(2)), // Amount
      this.getValue('58', this.merchantCity.toUpperCase()), // Merchant City
      this.getValue('59', this.merchantName.toUpperCase()), // Merchant Name
      this.getValue('60', 'BR'), // Country Code
    ]

    if (this.txid) {
      payload.push(this.getValue('62', this.getAdditionalData()))
    }

    const payloadString = payload.join('')
    const crc = this.getCRC16(payloadString + '6304')
    
    return payloadString + '6304' + crc
  }

  getMerchantAccount() {
    const gui = this.getValue('00', 'br.gov.bcb.pix')
    const key = this.getValue('01', this.pixKey)
    return gui + key
  }

  getAdditionalData() {
    return this.getValue('05', this.txid)
  }

  getValue(id, value) {
    const size = String(value.length).padStart(2, '0')
    return id + size + value
  }

  getCRC16(payload) {
    let crc = 0xFFFF
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ 0x1021
        } else {
          crc = crc << 1
        }
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0')
  }

  // Gera o código Copia e Cola
  getPixCode() {
    return this.generatePayload()
  }

  // Gera o link para abrir no app do banco
  getPixLink() {
    // Para PIX Copia e Cola, o link direto é o próprio payload
    // Alguns apps podem ter um esquema de URL específico, mas o payload é o mais universal
    return `https://nubank.com.br/pagar/pix/${encodeURIComponent(this.getPixCode())}` // Exemplo para Nubank, pode variar
  }
}

// Função para gerar PIX para uma venda
function gerarPixParaVenda(vendaId, valor = 47.00) {
  const pix = new PixGenerator({
    pixKey: '6ea0fa32-993a-4769-b515-61dbca2db8f6', // Sua chave PIX
    merchantName: 'HENRIQUE GOMES DA SILVA', // Seu nome
    merchantCity: 'SAO PAULO', // Sua cidade
    txid: vendaId.substring(0, 25), // ID da transação (máximo 25 caracteres)
    amount: valor
  })

  return {
    pixCode: pix.getPixCode(),
    pixLink: pix.getPixLink(),
    qrCodeData: pix.getPixCode() // Para gerar QR Code visual
  }
}

// Exportar para uso
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PixGenerator, gerarPixParaVenda }
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: corsHeaders,
      status: 200
    })
  }

  try {
    // RECEBE O TELEFONE AQUI
    const { nome, email, cpf, telefone, igrejaId, valor } = await req.json()

    // LOG COM TELEFONE
    console.log('📥 Recebido:', { nome, email, cpf, telefone, igrejaId, valor })

    const MP_ACCESS_TOKEN = 'TEST-7700486364781543-010415-d4d2d5a1f00f4690a6a86caf06d93313-14950330'

    const idempotencyKey = crypto.randomUUID()
    console.log('🔑 Idempotency Key:', idempotencyKey)

    const pagamento = {
      transaction_amount: valor,
      description: 'Livro Digital - Somos Todos Um',
      payment_method_id: 'pix',
      payer: {
        email: email,
        first_name: nome.split(' ')[0],
        last_name: nome.split(' ').slice(1).join(' ') || nome.split(' ')[0],
        identification: {
          type: 'CPF',
          number: cpf.replace(/\D/g, '')
        }
      }
    }

    console.log('📤 Enviando para Mercado Pago:', pagamento)

    const mpResponse = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
        'X-Idempotency-Key': idempotencyKey
      },
      body: JSON.stringify(pagamento)
    })

    const mpData = await mpResponse.json()

    console.log('📥 Resposta Mercado Pago:', mpData)

    if (!mpResponse.ok) {
      throw new Error(`Erro Mercado Pago: ${JSON.stringify(mpData)}`)
    }

    const pixData = {
      id: mpData.id,
      status: mpData.status,
      qr_code: mpData.point_of_interaction?.transaction_data?.qr_code || '',
      qr_code_base64: mpData.point_of_interaction?.transaction_data?.qr_code_base64 || '',
      ticket_url: mpData.point_of_interaction?.transaction_data?.ticket_url || ''
    }

    console.log('✅ PIX gerado:', pixData)

    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let senha = ''
    for (let i = 0; i < 8; i++) {
      senha += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseKey)

    const valorComissao = igrejaId ? valor * 0.10 : 0

    // SALVA O TELEFONE AQUI
    const { data: venda, error: vendaError } = await supabase
      .from('vendas')
      .insert([{
        nome_comprador: nome,
        email_comprador: email,
        cpf_comprador: cpf.replace(/\D/g, ''),
        telefone_comprador: telefone.replace(/\D/g, ''), // ADICIONA O TELEFONE
        igreja_id: igrejaId || null,
        valor_total: valor,
        valor_comissao: valorComissao,
        status_pagamento: 'pendente',
        id_transacao_mp: mpData.id.toString(),
        qr_code_pix: pixData.qr_code,
        qr_code_base64: pixData.qr_code_base64,
        senha_pdf: senha
      }])
      .select()
      .single()

    if (vendaError) {
      console.error('❌ Erro ao salvar venda:', vendaError)
      throw vendaError
    }

    console.log('✅ Venda salva:', venda.id)

    const { error: acessoError } = await supabase
      .from('acessos_livro')
      .insert([{
        venda_id: venda.id,
        email: email,
        senha: senha,
        ativo: false
      }])

    if (acessoError) {
      console.error('❌ Erro ao criar acesso:', acessoError)
    }

    return new Response(
      JSON.stringify({
        success: true,
        venda_id: venda.id,
        pagamento_id: mpData.id,
        qr_code: pixData.qr_code,
        qr_code_base64: pixData.qr_code_base64,
        ticket_url: pixData.ticket_url
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('❌ Erro:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})

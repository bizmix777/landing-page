// 
// MÓDULO DE COMPROVANTE DE VENDA (CLIENTE)
// 

const SUPABASE_URL = 'https://fbmxioslmmnxldjnnulg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZibXhpb3NsbW1ueGxkam5udWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MDIxOTEsImV4cCI6MjEwNDk3ODE5MX0.wPY_UjlCVkJb0Ci5j0CYxxpaeYSjyN9GKc49tE31MU0';

const clienteSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let vendaAtual = null;
let arquivoSelecionado = null;

const uploadArea = document.getElementById('uploadArea');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => {
        uploadArea.classList.add('dragover');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => {
        uploadArea.classList.remove('dragover');
    }, false);
});

uploadArea.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('arquivoComprovante').files = files;
        previewArquivo({ target: { files: files } });
    }
}, false);

async function buscarVenda() {
    const codigo = document.getElementById('codigoVenda').value.trim();
    
    if (!codigo) {
        alert('Por favor, digite o código da venda.');
        return;
    }
    
    document.getElementById('mensagemErro').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'none';
    
    try {
        const { data, error } = await clienteSupabase
            .from('vendas')
            .select('*, igrejas(nome)')
            .eq('id', codigo)
            .single();
        
        if (error) throw error;
        
        if (!data) {
            throw new Error('Venda não encontrada. Verifique o código e tente novamente.');
        }
        
        vendaAtual = data;
        
        if (data.status === 'pago') {
            document.getElementById('mensagemErro').innerHTML = 
                '<h3><i class="fas fa-exclamation-triangle"></i> Venda Já Paga</h3>' +
                '<p>Esta venda já foi marcada como paga. Se houver algum problema, entre em contato conosco.</p>';
            document.getElementById('mensagemErro').style.display = 'block';
            return;
        }
        
        const igrejaNome = data.igrejas ? data.igrejas.nome : 'Não informada';
        
        document.getElementById('vendaInfo').innerHTML = 
            '<h3><i class="fas fa-receipt"></i> Dados da Venda</h3>' +
            '<div class="info-item"><strong>👤 Comprador:</strong> ' + data.nome_comprador + '</div>' +
            '<div class="info-item"><strong>📧 Email:</strong> ' + data.email_comprador + '</div>' +
            '<div class="info-item"><strong>🏛️ Igreja:</strong> ' + igrejaNome + '</div>' +
            '<div class="info-item"><strong>💵 Valor Total:</strong> R$ ' + parseFloat(data.valor_venda).toFixed(2).replace('.', ',') + '</div>' +
            '<div class="info-item"><strong>💳 Forma de Pagamento:</strong> ' + data.forma_pagamento + '</div>' +
            '<div class="info-item"><strong>📅 Data da Venda:</strong> ' + new Date(data.data_venda).toLocaleDateString('pt-BR') + '</div>' +
            '<div class="info-item"><strong>📊 Status:</strong> <span style="color: #f59e0b; font-weight: bold;">Pendente</span></div>';
        
        document.getElementById('vendaInfo').style.display = 'block';
        document.getElementById('formComprovante').style.display = 'block';
        
    } catch (erro) {
        console.error('Erro ao buscar venda:', erro);
        document.getElementById('mensagemErro').innerHTML = 
            '<h3><i class="fas fa-times-circle"></i> Erro ao Buscar Venda</h3>' +
            '<p>' + erro.message + '</p>';
        document.getElementById('mensagemErro').style.display = 'block';
    }
}

function previewArquivo(event) {
    const arquivo = event.target.files[0];
    
    if (!arquivo) return;
    
    if (arquivo.size > 5 * 1024 * 1024) {
        alert('❌ Arquivo muito grande! Tamanho máximo: 5MB');
        document.getElementById('arquivoComprovante').value = '';
        return;
    }
    
    const tiposPermitidos = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!tiposPermitidos.includes(arquivo.type)) {
        alert('❌ Formato não permitido! Use JPG, PNG ou PDF');
        document.getElementById('arquivoComprovante').value = '';
        return;
    }
    
    arquivoSelecionado = arquivo;
    
    const previewArea = document.getElementById('previewArea');
    previewArea.innerHTML = '';
    
    if (arquivo.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewArea.innerHTML = 
                '<img src="' + e.target.result + '" class="preview-image">' +
                '<div class="file-info">' +
                '<strong>📎 Arquivo:</strong> ' + arquivo.name + '<br>' +
                '<strong>📏 Tamanho:</strong> ' + (arquivo.size / 1024).toFixed(2) + ' KB' +
                '</div>';
        };
        reader.readAsDataURL(arquivo);
    } else {
        previewArea.innerHTML = 
            '<div class="file-info">' +
            '<strong>📄 PDF Selecionado</strong><br>' +
            '<strong>📎 Arquivo:</strong> ' + arquivo.name + '<br>' +
            '<strong>📏 Tamanho:</strong> ' + (arquivo.size / 1024).toFixed(2) + ' KB' +
            '</div>';
    }
    
    previewArea.style.display = 'block';
    document.getElementById('btnEnviar').disabled = false;
}

async function enviarComprovante(event) {
    event.preventDefault();
    
    if (!arquivoSelecionado) {
        alert('Por favor, selecione um arquivo.');
        return;
    }
    
    if (!vendaAtual) {
        alert('Erro: Venda não encontrada.');
        return;
    }
    
    const btnEnviar = document.getElementById('btnEnviar');
    btnEnviar.disabled = true;
    btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    document.getElementById('mensagemErro').style.display = 'none';
    document.getElementById('mensagemSucesso').style.display = 'none';
    
    try {
        const timestamp = Date.now();
        const extensao = arquivoSelecionado.name.split('.').pop();
        const nomeArquivo = `venda_${vendaAtual.id}_${timestamp}.${extensao}`;
        
        const { data: uploadData, error: uploadError } = await clienteSupabase.storage
            .from('comprovantes')
            .upload(nomeArquivo, arquivoSelecionado, {
                cacheControl: '3600',
                upsert: false
            });
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = clienteSupabase.storage
            .from('comprovantes')
            .getPublicUrl(nomeArquivo);
        
        const comprovanteUrl = urlData.publicUrl;
        
        const { error: updateError } = await clienteSupabase
            .from('vendas')
            .update({
                comprovante_url: comprovanteUrl,
                status: 'pago',
                data_pagamento: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .eq('id', vendaAtual.id);
        
        if (updateError) throw updateError;
        
        document.getElementById('mensagemSucesso').innerHTML = 
            '<h2><i class="fas fa-check-circle"></i> Comprovante Enviado com Sucesso!</h2>' +
            '<p><strong>Status da Venda:</strong> Pagamento Confirmado</p>' +
            '<p><strong>Data do Pagamento:</strong> ' + new Date().toLocaleDateString('pt-BR') + '</p>' +
            '<p>Você receberá um email de confirmação em breve.</p>' +
            '<p style="margin-top: 15px; font-weight: bold;">Obrigado por sua compra! 🎉</p>';
        
        document.getElementById('mensagemSucesso').style.display = 'block';
        
        document.getElementById('formBusca').style.display = 'none';
        document.getElementById('vendaInfo').style.display = 'none';
        document.getElementById('formComprovante').style.display = 'none';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (erro) {
        console.error('Erro ao enviar comprovante:', erro);
        document.getElementById('mensagemErro').innerHTML = 
            '<h3><i class="fas fa-times-circle"></i> Erro ao Enviar Comprovante</h3>' +
            '<p>' + erro.message + '</p>';
        document.getElementById('mensagemErro').style.display = 'block';
        
        btnEnviar.disabled = false;
        btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Comprovante';
    }
}

// ========================================
// MÓDULO DE GERENCIAMENTO DE COMPROVANTES
// ========================================

console.log('📄 Módulo de comprovantes carregando...');

// Inicializa o módulo de comprovantes
async function initComprovantes() {
    console.log('🔄 Iniciando módulo de comprovantes...');
    await loadPartnersForComprovantes();
    await loadComprovantesLista();
    setupComprovanteUploadButton();
}

// Carrega a lista de parceiros ativos do Supabase
async function loadPartnersForComprovantes() {
    try {
        console.log('📥 Carregando lista de parceiros para comprovantes...');
        
        const { data, error } = await supabaseClient
            .from('parceiros')
            .select('id, nome_completo, email, codigo_parceiro, status')
            .eq('status', 'ativo')
            .order('nome_completo');
        
        if (error) throw error;
        
        const select = document.getElementById('partner-select-comprovante');
        if (!select) {
            console.warn('⚠️ Elemento partner-select-comprovante não encontrado');
            return;
        }
        
        select.innerHTML = '<option value="">Escolha um parceiro...</option>';
        
        data.forEach(partner => {
            const option = document.createElement('option');
            option.value = partner.codigo_parceiro;
            option.textContent = `${partner.nome_completo} - ${partner.email}`;
            option.dataset.partnerId = partner.id;
            select.appendChild(option);
        });
        
        console.log(`✅ ${data.length} parceiros carregados para comprovantes`);
    } catch (err) {
        console.error('❌ Erro ao carregar parceiros:', err);
        mostrarAlertaComprovante('Erro ao carregar lista de parceiros.', 'error');
    }
}

// Configura o botão de upload de comprovante
function setupComprovanteUploadButton() {
    const uploadBtn = document.getElementById('upload-comprovante-btn');
    if (!uploadBtn) {
        console.warn('⚠️ Botão upload-comprovante-btn não encontrado');
        return;
    }
    
    uploadBtn.addEventListener('click', async () => {
        const partnerSelect = document.getElementById('partner-select-comprovante');
        const selectedPartnerCode = partnerSelect.value;
        const month = parseInt(document.getElementById('month-input-comprovante').value);
        const year = parseInt(document.getElementById('year-input-comprovante').value);
        const fileInput = document.getElementById('comprovante-file-input');
        const file = fileInput.files[0];
        
        // Validações
        if (!selectedPartnerCode) {
            mostrarAlertaComprovante('❌ Selecione um parceiro.', 'error');
            return;
        }
        if (isNaN(month) || month < 1 || month > 12) {
            mostrarAlertaComprovante('❌ Mês deve ser um número entre 1 e 12.', 'error');
            return;
        }
        if (isNaN(year) || year < 2024 || year > 2030) {
            mostrarAlertaComprovante('❌ Ano deve ser um número entre 2024 e 2030.', 'error');
            return;
        }
        if (!file) {
            mostrarAlertaComprovante('❌ Selecione um arquivo PDF.', 'error');
            return;
        }
        if (file.type !== 'application/pdf') {
            mostrarAlertaComprovante('❌ Apenas arquivos PDF são permitidos.', 'error');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            mostrarAlertaComprovante('❌ Arquivo deve ter no máximo 5MB.', 'error');
            return;
        }
        
        // Gerar nome do arquivo
        const monthStr = month.toString().padStart(2, '0');
        const fileName = `comprovante-${selectedPartnerCode}-${monthStr}-${year}.pdf`;
        
        console.log(`📤 Enviando comprovante: ${fileName}`);
        
        // Desabilitar botão durante upload
        uploadBtn.disabled = true;
        uploadBtn.textContent = '⏳ Enviando...';
        
        try {
            // Upload para o bucket 'comprovantes'
            const { data, error } = await supabaseClient.storage
                .from('comprovantes')
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: true
                });
            
            if (error) throw error;
            
            console.log('✅ Comprovante enviado:', data);
            mostrarAlertaComprovante(`✅ Comprovante enviado com sucesso: ${fileName}`, 'success');
            
            // Limpar formulário
            fileInput.value = '';
            document.getElementById('month-input-comprovante').value = '';
            document.getElementById('year-input-comprovante').value = '';
            partnerSelect.value = '';
            
            // Recarregar lista
            await loadComprovantesLista();
            
        } catch (err) {
            console.error('❌ Erro no upload:', err);
            mostrarAlertaComprovante(`❌ Erro ao enviar comprovante: ${err.message}`, 'error');
        } finally {
            uploadBtn.disabled = false;
            uploadBtn.textContent = '📤 Enviar Comprovante';
        }
    });
}

// Carrega e exibe a lista de comprovantes existentes
async function loadComprovantesLista() {
    try {
        console.log('📥 Carregando lista de comprovantes...');
        
        const { data, error } = await supabaseClient.storage
            .from('comprovantes')
            .list('', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' }
            });
        
        if (error) throw error;
        
        const ul = document.getElementById('comprovantes-list-ul');
        if (!ul) {
            console.warn('⚠️ Elemento comprovantes-list-ul não encontrado');
            return;
        }
        
        ul.innerHTML = '';
        
        if (data.length === 0) {
            ul.innerHTML = '<p style="text-align: center; color: #94a3b8; padding: 20px;">Nenhum comprovante enviado ainda.</p>';
            return;
        }
        
        data.forEach(file => {
            const parts = file.name.match(/comprovante-(.+)-(\d{2})-(\d{4})\.pdf/);
            const codigoParceiro = parts ? parts[1] : 'N/A';
            const mes = parts ? parts[2] : 'N/A';
            const ano = parts ? parts[3] : 'N/A';
            
            const div = document.createElement('div');
            div.className = 'file-item';
            div.style.cssText = 'background: #334155; border-radius: 12px; padding: 16px; text-align: center; transition: all 0.3s;';
            div.innerHTML = `
                <div class="file-icon" style="font-size: 48px; margin-bottom: 12px;">📄</div>
                <div class="file-name" style="font-size: 13px; font-weight: 600; margin-bottom: 8px; word-break: break-all;">${file.name}</div>
                <div class="file-size" style="font-size: 11px; color: #94a3b8; margin-bottom: 12px;">
                    Parceiro: ${codigoParceiro}<br>
                    Período: ${mes}/${ano}<br>
                    Tamanho: ${(file.metadata?.size / 1024).toFixed(2)} KB
                </div>
                <div class="file-actions" style="display: flex; gap: 8px; justify-content: center;">
                    <button class="btn btn-sm btn-primary" onclick="downloadArquivo('comprovantes', '${file.name}')" style="background: #3b82f6; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">
                        ⬇️ Baixar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteComprovanteFile('${file.name}')" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">
                        🗑️ Deletar
                    </button>
                </div>
            `;
            ul.appendChild(div);
        });
        
        console.log(`✅ ${data.length} comprovantes listados`);
    } catch (err) {
        console.error('❌ Erro ao carregar comprovantes:', err);
        mostrarAlertaComprovante('Erro ao carregar lista de comprovantes.', 'error');
    }
}

// Deleta um comprovante do bucket
async function deleteComprovanteFile(fileName) {
    if (!confirm(`⚠️ Tem certeza que deseja deletar:\n\n${fileName}\n\nEsta ação não pode ser desfeita!`)) {
        return;
    }
    
    try {
        console.log(`🗑️ Deletando comprovante: ${fileName}`);
        
        const { error } = await supabaseClient.storage
            .from('comprovantes')
            .remove([fileName]);
        
        if (error) throw error;
        
        console.log('✅ Comprovante deletado');
        mostrarAlertaComprovante(`✅ Comprovante deletado: ${fileName}`, 'success');
        
        await loadComprovantesLista();
        
    } catch (err) {
        console.error('❌ Erro ao deletar:', err);
        mostrarAlertaComprovante(`❌ Erro ao deletar comprovante: ${err.message}`, 'error');
    }
}

// Mostra alerta específico para comprovantes
function mostrarAlertaComprovante(mensagem, tipo) {
    const container = document.getElementById('alertComprovantesUpload');
    if (!container) return;
    
    container.innerHTML = `<div class="alert alert-${tipo} show" style="padding: 14px; border-radius: 10px; margin-bottom: 20px; font-size: 14px;">${mensagem}</div>`;
    
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

console.log('✅ Módulo de comprovantes carregado');

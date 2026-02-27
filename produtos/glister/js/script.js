document.addEventListener('DOMContentLoaded', function() {
    const modalCliente = document.getElementById('cadastroModalCliente');
    const modalEmpreendedor = document.getElementById('cadastroModalEmpreendedor');

    // Botões de Abrir
    document.getElementById('btn-opcao-cliente')?.addEventListener('click', () => modalCliente.style.display = 'flex');
    document.getElementById('btn-opcao-empreendedor')?.addEventListener('click', () => modalEmpreendedor.style.display = 'flex');

    // Botões de Fechar
    document.querySelector('.modal-close-cliente')?.addEventListener('click', () => modalCliente.style.display = 'none');
    document.querySelector('.modal-close-empreendedor')?.addEventListener('click', () => modalEmpreendedor.style.display = 'none');

    // FORMULÁRIO CLIENTE VIP
    const formCliente = document.getElementById('cadastroFormCliente');
    if (formCliente) {
        formCliente.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nomeCliente').value;
            const cpf = document.getElementById('cpfCliente').value;
            const zap = document.getElementById('celularCliente').value;
            const email = document.getElementById('emailCliente').value;
            const endereco = document.getElementById('ruaCliente').value;

            const assunto = encodeURIComponent(`Novo Cliente VIP: ${nome}`);
            const corpo = encodeURIComponent(
                `DADOS DO CLIENTE VIP:\n\nNome: ${nome}\nCPF: ${cpf}\nWhatsApp: ${zap}\nE-mail: ${email}\nEndereço: ${endereco}`
            );

            window.location.href = `mailto:contato+glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
        });
    }

    // FORMULÁRIO EMPREENDEDOR
    const formEmpreendedor = document.getElementById('cadastroFormEmpreendedor');
    if (formEmpreendedor) {
        formEmpreendedor.addEventListener('submit', function(e) {
            e.preventDefault();
            const nome = document.getElementById('nomeEmp').value;
            const cpf = document.getElementById('cpfEmp').value;
            const dataNasc = `${document.getElementById('diaEmp').value}/${document.getElementById('mesEmp').value}/${document.getElementById('anoEmp').value}`;
            const email = document.getElementById('emailEmp').value;
            const zap = document.getElementById('celularEmp').value;
            const kit = document.getElementById('tipoKitEmp').value;
            const endereco = document.getElementById('ruaEmp').value;
            const cep = document.getElementById('cepEmp').value;

            const assunto = encodeURIComponent(`Novo Empreendedor: ${nome}`);
            const corpo = encodeURIComponent(
                `DADOS DO EMPREENDEDOR:\n\nNome: ${nome}\nCPF: ${cpf}\nData Nasc: ${dataNasc}\nWhatsApp: ${zap}\nE-mail: ${email}\nKit: ${kit}\nEndereço: ${endereco}\nCEP: ${cep}\n\nPatrocinador: Henrique Gomes da Silva`
            );

            window.location.href = `mailto:contato+glister@bizmix.com.br?subject=${assunto}&body=${corpo}`;
        });
    }
});

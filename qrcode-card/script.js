// Atualiza o cartão em tempo real
function updatePreview() {
    const nomeDigitado = document.getElementById('vcard_nome').value;
    const cargoDigitado = document.getElementById('vcard_cargo').value;

    document.getElementById('preview_nome').innerText = nomeDigitado || "Seu Nome";
    document.getElementById('preview_cargo').innerText = cargoDigitado || "Profissão";
}

// O código do Supabase vai entrar aqui depois!
document.getElementById('btn_enviar').addEventListener('click', function() {
    alert("Pronto para conectar com o Supabase!");
    // Aqui faremos a lógica do insert no próximo passo.
});

const amigosInseridos = [];
const lista = document.getElementById('listaAmigos');
const resultado = document.getElementById('resultado');
const mensagemErro = document.getElementById('mensagemErro');

function adicionarAmigo() {
    const nomeInput = document.querySelector('input');
    const nome = nomeInput.value.trim();

    if (nome === '') {
        exibirMensagemErro('Você não pode deixar o espaço vazio!');
        return;
    }

    if (amigosInseridos.includes(nome)) {
        exibirMensagemErro('Este amigo já foi adicionado!');
        return;
    }

    amigosInseridos.push(nome);
    limparCampo();
    atualizarLista();
    ocultarMensagemErro();
}

function limparCampo() {
    document.querySelector('input').value = '';
}

function atualizarLista() {
    lista.innerHTML = '';
    amigosInseridos.forEach(amigo => {
        const item = document.createElement('li');
        item.textContent = amigo;
        lista.appendChild(item);
    });
}

function sortearAmigo() {
    if (amigosInseridos.length < 2) {
        exibirMensagemErro('Adicione pelo menos dois amigos para realizar o sorteio!');
        return;
    }

    const sorteio = sortearAmigos(amigosInseridos);
    exibirResultado(sorteio);
    ocultarMensagemErro();
}

function sortearAmigos(amigos) {
    const amigosEmbaralhados = [...amigos].sort(() => Math.random() - 0.5);
    const sorteio = {};

    for (let i = 0; i < amigos.length; i++) {
        sorteio[amigos[i]] = amigosEmbaralhados[i];
    }

    return sorteio;
}

function exibirResultado(sorteio) {
    resultado.innerHTML = '';
    for (const amigo in sorteio) {
        const item = document.createElement('li');
        item.textContent = `${amigo} sorteou: ${sorteio[amigo]}`;
        resultado.appendChild(item);
    }
}

function limparLista() {
    amigosInseridos.length = 0;
    atualizarLista();
    resultado.innerHTML = '';
    ocultarMensagemErro();
}

function exibirMensagemErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.style.display = 'block';
}

function ocultarMensagemErro() {
    mensagemErro.style.display = 'none';
}
let sessao = { nome: '', whatsapp: '', tipo: '', historico: [], passo: 'inicio' };

// BANCO DE DADOS (Consultoria Técnica)
const bancoDados = {
    "apple": {
        keywords: ["iphone", "macbook", "ipad", "apple", "ios", "original", "vitrine", "bateria", "tela", "troca", "seminovo", "garantia", "airpods"],
        resposta: "Dúvida sobre Apple? 🍎 Nossos aparelhos são criteriosamente revisados. Se você quer conferir a saúde da bateria ou ver fotos reais de um modelo de vitrine, me avisa! No nosso site você também encontra o estoque atualizado em tempo real."
    },
    "pc_gamer": {
        keywords: ["pc gamer", "computador gamer", "fps", "setup gamer", "pc montado", "rgb", "water cooler", "fortnite", "valorant", "cs2", "warzone", "streaming"],
        resposta: "Montar um setup gera muitas dúvidas mesmo! 🔥 Se você quer saber se um PC roda seu jogo favorito em quantos FPS, eu te ajudo. No site temos as specs detalhadas, mas posso te orientar por aqui sobre compatibilidade."
    },
    "hardware": {
        keywords: ["placa de vídeo", "rtx", "processador", "intel", "amd", "ryzen", "ssd", "nvme", "memória ram", "fonte", "placa mãe", "upgrade"],
        resposta: "Upgrade é a nossa especialidade! 🚀 Se não tiver certeza se uma peça é compatível com sua placa-mãe ou precisa de indicação de fonte, é só perguntar. O objetivo é você escolher a peça certa lá no site!"
    },
    "assistencia": {
        keywords: ["formatação", "limpeza", "manutenção", "upgrade", "pc lento", "notebook travando", "troca pasta térmica", "vírus", "backup"],
        resposta: "Seu equipamento não está legal? 😅 Eu posso te dar um diagnóstico prévio por aqui e explicar como funciona nossa manutenção técnica. No site temos a tabela de serviços, mas me conte o que está acontecendo."
    },
    "envio": {
        keywords: ["pix", "cartão", "parcelamento", "boleto", "frete", "envio", "entrega", "correios", "transportadora", "pagamento", "prazo"],
        resposta: "Dúvida sobre logística ou pagamento? 💳 No e-commerce você calcula o frete direto, mas posso te adiantar os prazos médios e como funciona nossa embalagem de segurança para envios nacionais."
    }
};

function scrollToBottom() {
    const anchor = document.getElementById('scroll-anchor');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function botFala(texto, delay = 1200) {
    const typing = document.getElementById('typing-indicator');
    const win = document.getElementById('chat-window');
    const anchor = document.getElementById('scroll-anchor');
    typing.classList.remove('hidden');
    win.insertBefore(typing, anchor);
    scrollToBottom();

    setTimeout(() => {
        typing.classList.add('hidden');
        const div = document.createElement('div');
        div.className = 'msg bot';
        div.innerText = texto;
        win.insertBefore(div, typing);
        sessao.historico.push(`Bot: ${texto}`);
        scrollToBottom();
    }, delay);
}

function userMsg(texto) {
    const win = document.getElementById('chat-window');
    const typing = document.getElementById('typing-indicator');
    const div = document.createElement('div');
    div.className = 'msg user';
    div.innerText = texto;
    win.insertBefore(div, typing);
    sessao.historico.push(`Você: ${texto}`);
    scrollToBottom();
}

function iniciarFluxo(tipo) {
    sessao.tipo = tipo === 'cliente' ? 'Cliente MKS' : 'Novo Visitante';
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('chat-interface').classList.remove('hidden');
    botFala("Opa! Tudo certo? Sou o assistente da MKS. Prazerzão te atender! 🤖");
    setTimeout(() => {
        botFala("Antes de tudo, como posso te chamar?");
        sessao.passo = 'nome';
    }, 1800);
}

function handleInput() {
    const input = document.getElementById('user-input');
    const msg = input.value.trim();
    if(!msg) return;
    userMsg(msg);
    input.value = '';

    if(sessao.passo === 'nome') {
        sessao.nome = msg;
        sessao.passo = 'chat_aberto';
        botFala(`Fala, ${msg.split(' ')[0]}! O que a MKS pode fazer por você hoje?`);
        setTimeout(() => mostrarBotoes(["Apple", "PC Gamer", "Hardware", "Assistência"]), 1500);
    } else if(sessao.passo === 'zap') {
        sessao.whatsapp = msg;
        botFala("Fechado! Já anotei. Estou te levando para o site agora...");
        setTimeout(enviarParaPlanilha, 2000);
    } else {
        processarTextoUsuario(msg);
    }
}

function processarTextoUsuario(msg) {
    const texto = msg.toLowerCase();
    let encontrou = false;
    for (let cat in bancoDados) {
        if (bancoDados[cat].keywords.some(k => texto.includes(k))) {
            botFala(bancoDados[cat].resposta);
            encontrou = true;
            break;
        }
    }
    if (!encontrou) botFala("Humm, não captei essa. Mas relaxa! Como posso te ajudar?");
    
    setTimeout(() => {
        mostrarBotoes(["Ver Categorias", "Finalizar"]);
    }, 2000);
}

function mostrarBotoes(lista) {
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    lista.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'btn-opt';
        btn.innerText = item;
        btn.onclick = () => {
            userMsg(item);
            if(item === "Ver Categorias") {
                botFala("Aqui está tudo o que eu domino:");
                mostrarBotoes(["Apple", "PC Gamer", "Hardware", "Assistência", "Envio"]);
            } else if(item === "Finalizar") {
                botFala("Entendido! Antes de ir para o site, você ainda ficou com alguma dúvida?");
                setTimeout(() => mostrarBotoes(["Sim", "Não"]), 1000);
            } else if(item === "Sim") {
                botFala("Sem problemas! Me passa seu WhatsApp com DDD que um consultor te chama agora:");
                sessao.passo = 'zap';
                container.innerHTML = '';
            } else if(item === "Não") {
                botFala("Maravilha! Salvando nosso papo e te levando para o site... 🚀");
                setTimeout(enviarParaPlanilha, 1500);
            } else {
                processarTextoUsuario(item);
            }
        };
        container.appendChild(btn);
    });
}

function enviarParaPlanilha() {
    const url = "https://script.google.com/macros/s/AKfycbxwXVttNMeOFlrK2u2auhevP5qhV1RerHHJAkK0uvnF74_R2Ez_bPaRdPHdjV3MljobJQ/exec";
    fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
            nome: sessao.nome,
            tipo: sessao.tipo,
            whatsapp: sessao.whatsapp || "Direto para o Site",
            historico: sessao.historico.join(' | ')
        })
    }).then(() => {
        setTimeout(() => {
            window.location.href = "https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fbig-monke-flips-you-off-what-u-do-v0-861gk9gqka0c1.png%3Fwidth%3D320%26crop%3Dsmart%26auto%3Dwebp%26s%3Db3da7ce53e59215b9e012615aa93c8fc859479e2"; 
        }, 1500);
    });
}

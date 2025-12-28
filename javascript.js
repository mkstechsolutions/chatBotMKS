// --- ESTADO DA SESSÃO ---
let sessao = { 
    nome: '', 
    whatsapp: '', 
    passo: 'inicio', 
    categoriaAtual: 'inicio' 
};

// --- BANCO DE DADOS COMPLETO ---
const bancoDados = {
    "apple": {
        resposta: "Dúvida sobre Apple? 🍎 Nossos aparelhos são criteriosamente revisados. Você já tem algum modelo em mente ou quer ajuda para escolher?",
        botoes: ["Ajuda na Escolha", "Comparar Modelos", "Voltar", "Finalizar"]
    },
    "ajuda_apple": {
        resposta: "Você procura por algo mais acessível ou máxima qualidade em vídeos?\n\n- **iPhone 11**: Custo-benefício e 4K.\n- **iPhone 12**: 5G e Tela OLED.\n- **iPhone 13**: Modo Cinema e Bateria TOP.\n- **iPhone 14**: Desempenho e Fotos Noturnas.",
        botoes: ["iPhone 11", "iPhone 12", "iPhone 13", "Voltar para Apple", "Finalizar"]
    },
    "comparar_apple": {
        resposta: "Escolha uma comparação ou **digite os modelos** (ex: 11 x 14):",
        botoes: ["12 x 13", "13 x 14", "14 x 15", "15 x 16", "Voltar para Apple", "Finalizar"]
    },
    "computador": {
        resposta: "Escolher o PC Gamer ideal depende dos jogos e do seu orçamento. O que você busca?",
        botoes: ["Escolha do PC Ideal", "Sugestões PC", "Voltar", "Finalizar"]
    },
    "notebook": {
        resposta: "Existem vários modelos excelentes (DELL, ACER, LENOVO, VAIO). Para que você quer o notebook?",
        botoes: ["Modelos Notebook", "Sugestões Notebook", "Voltar", "Finalizar"]
    },
    "video_game": {
        resposta: "Temos do PS2 ao PS5. Você procura algum modelo específico?",
        botoes: ["Modelos Console", "Sugestões Console", "Voltar", "Finalizar"]
    },
    "acessorios": {
        resposta: "O que você procura para completar seu setup?",
        botoes: ["Acessórios Apple", "Acessórios Computador", "Voltar", "Finalizar"]
    },
    "garantia": {
        resposta: "Sobre qual linha você deseja saber as condições de garantia?",
        botoes: ["Garantia Apple", "Garantia Notebook e Desk", "Voltar", "Finalizar"]
    },
    "envios": {
        resposta: "Como posso te ajudar com a logística de entrega?",
        botoes: ["Como funciona", "Outra cidade", "Voltar", "Finalizar"]
    }
};

const respostasExtras = {
    "modelos notebook": "Temos modelos para todas as necessidades. Você busca para Jogos ou Trabalho?",
    "escolha do pc ideal": "Para jogos leves, um PC com placa GTX 1650 já é suficiente. Para jogos pesados, recomendo uma RTX 3060 ou superior.",
    "sugestões pc": "Temos opções: Básico, Intermediário, Avançado e Top de Linha. Qual seu orçamento?",
    "sugestões apple": "Se quer custo-benefício, vá de iPhone 11. Para o melhor em vídeo, o iPhone 14 é imbatível!",
    "sugestões notebook": "Temos opções: Gamer, Avançado, Intermediário e Básico. Você tem algo em mente?",    
    "modelos console": "Trabalhamos com PS2, PS3, PS4 e PS5. Algum desses te interessa?",
    "modelos computador": "Temos desktops montados e também peças avulsas para montar o seu próprio PC Gamer.",
    "xbox": "No momento, trabalhamos apenas com consoles PlayStation.",
    "modelos pc": "Temos desktops montados e também peças avulsas para montar o seu próprio PC Gamer.",
    "sugestões console": "Se você quer jogos novos mas está com orçamento curto, o PS4 Pro é uma ótima pedida!",
    "acessórios apple": "Temos carregadores, Fones, Capinhas e Apple Watch. O que procura?",
    "acessórios computador": "Temos teclados, mouses, fones gamer e monitores!",
    "garantia apple": "Apple lacrados 1 ano. Seminovos 3 meses. Não cobre danos acidentais.",
    "garantia notebook e desk": "Garantia de 3 meses. Não cobre danos acidentais.",
    "como funciona": "Entramos em contato para alinhar a melhor logística de entrega.",
    "outra cidade": "Nosso gerente verifica a logística via Correios ou Sedex junto com você."
};

const comparacoes = {
    "11 x 14": "Salto gigante: 5G, tela OLED e Modo Cinema. Vale muito a pena!",
    "12 x 13": "O 13 tem mais bateria e o dobro de memória base (128GB).",
    "13 x 14": "Diferença pequena. O 13 é o melhor custo-benefício hoje.",
    "14 x 15": "O 15 traz a Dynamic Island e entrada USB-C.",
    "15 x 16": "O 16 já vem pronto para Inteligência Artificial e novo botão de câmera.",
    "11 x 13": "Grande evolução: o 13 traz tela OLED muito superior, dobro de armazenamento (128GB) e Modo Cinema.",
    "11 x 15": "Salto de gerações: você ganha a Dynamic Island, câmera de 48MP e a praticidade da entrada USB-C.",
    "11 x 16": "Mudança radical: sai o LCD e entra uma tela top, chip preparado para IA e o novo botão de câmera.",
    "12 x 14": "O 14 oferece mais bateria, 2GB extras de RAM para não travar e o Modo Ação para vídeos estáveis.",
    "12 x 15": "Upgrade muito recomendado: o 15 já vem com USB-C e a Dynamic Island, modernizando totalmente o uso.",
    "12 x 16": "Salto tecnológico: performance muito superior para jogos e suporte total aos novos recursos de IA.",
    "13 x 15": "Vale a pena: você troca o notch antigo pela Dynamic Island e ganha uma câmera principal muito mais nítida.",
    "13 x 16": "Evolução em tudo: além do USB-C, você ganha o botão de Controle de Câmera e um processador bem mais frio.",
    "14 x 16": "Diferença nítida: o 16 é um projeto novo com botão de câmera e chip A18, enquanto o 14 ainda é similar ao 13.",
    "15 x 16": "O 16 já vem pronto para Inteligência Artificial e possui o novo botão físico para fotos e vídeos.",
    "11 x 12": "O 12 traz a conectividade 5G e a tela OLED, que é muito superior ao LCD do 11.",
    "13 x 14": "O 14 Pro entrega a Dynamic Island e muito mais brilho na tela que o 13 convencional.",
    "14 x 15": "Vale o upgrade pelo chip A17 Pro (jogos de console) e pela versatilidade do USB-C.",
    "15 x 16": "O 16 Pro já vem com o novo chip A18, ideal para quem quer o máximo em performance e IA.",
    "11 x 12": "O 12 traz a conectividade 5G e a tela OLED, que é muito superior ao LCD do 11.",
    
    // --- COMPARAÇÕES PRO E PRO MAX ---
    "11 Pro x 13 Pro": "Salto de 60Hz para 120Hz (ProMotion) e câmeras com Modo Cinema e Macro.",
    "12 Pro x 14 Pro": "O 14 Pro introduz a Dynamic Island e a câmera principal de 48MP, além da tela Always-On.",
    "13 Pro x 15 Pro": "Mudança para acabamento em Titânio (mais leve), entrada USB-C e o novo Botão de Ação.",
    "14 Pro x 16 Pro": "O 16 Pro traz telas maiores (6.3'), o novo botão de Controle de Câmera e chip pronto para IA.",
    "15 Pro x 16 Pro Max": "O 16 Pro Max tem a maior tela da história (6.9') e bateria recorde, ideal para quem quer o topo.",
    
    // --- COMPARAÇÕES CRUZADAS (BASE vs PRO) ---
    "13 x 13 Pro": "A versão Pro oferece tela de 120Hz muito mais fluida e a terceira lente (teleobjetiva) para zoom.",
    "15 x 15 Pro": "O Pro ganha o chip A17 Pro para jogos pesados, acabamento em Titânio e taxa de atualização de 120Hz.",
    "16 x 16 Pro": "Ambos têm o botão de câmera, mas o Pro tem tela de 120Hz, zoom de 5x e bordas muito mais finas.",

    // --- COMPARAÇÕES DE TAMANHO (PRO vs PRO MAX) ---
    "15 Pro x 15 Pro Max": "As câmeras são quase iguais, mas o Max tem o zoom de 5x exclusivo e uma bateria que dura muito mais.",
    "16 Pro x 16 Pro Max": "Nesta geração as câmeras são idênticas. A escolha é apenas pelo tamanho da tela e duração da bateria.",

    "11 x 13 Pro": "Salto gigante: Você sai do LCD para o OLED de 120Hz e ganha o Modo Macro e Cinema.",
    "12 x 14 Pro": "O 14 Pro traz a Dynamic Island e tela Always-On, tecnologias que o 12 normal não possui.",
    "13 x 15 Pro": "A diferença é brutal no peso (Titânio) e na velocidade, além da entrada USB-C no Pro.",
    "14 x 16 Pro": "O 16 Pro oferece tela de 6.3', botão de câmera e é muito mais potente para IA que o 14.",
    "15 x 14 Pro": "Dúvida comum: O 14 Pro vence na tela de 120Hz, mas o 15 ganha na leveza e no USB-C.",
    "16 x 15 Pro": "O 15 Pro ainda é superior pela tela ProMotion e Zoom, mesmo o 16 sendo o lançamento base.",
    "11 x 12 Pro": "O 12 Pro introduz o design premium de aço e o sensor LiDAR para fotos noturnas melhores.",
    "12 x 15 Pro": "Mudança total: Titânio, USB-C, Botão de Ação e uma performance 50% superior no Pro.",
    "13 x 14 Pro": "O 14 Pro entrega a Dynamic Island e muito mais brilho na tela que o 13 convencional.",
    "14 x 15 Pro": "Vale o upgrade pelo chip A17 Pro (jogos de console) e pela versatilidade do USB-C.",
    "15 x 16 Pro": "O 16 Pro já vem com o novo chip A18, ideal para quem quer o máximo em performance e IA.",
    "11 x 14 Pro": "Salto gigante: Você sai do LCD para o OLED de 120Hz e ganha o Modo Macro, Cinema e o poder do A18.",
    "12 x 13 Pro": "O 13 Pro é um 'tanque' de bateria, sendo muito superior ao 12 Pro nesse quesito.",
    "13 x 15 Pro": "Salto para quem quer tela gigante, carregamento USB-C e acabamento premium em Titânio.",
    "14 x 16 Pro": "O 16 Pro é mais fino, leve e traz o chip A18 pronto para IA, além de filmar em 4K 120fps.",
    "15 x 16 Pro": "O 16 Pro já vem com o novo chip A18, ideal para quem quer o máximo em performance e IA.",

    // --- MISTURANDO MODELOS BASE E PRO MAX ---
    "11 x 14 Pro Max": "Você sai de um celular básico para o topo: Tela gigante, bateria de 2 dias e Zoom de 3x.",
    "12 x 15 Pro Max": "O 15 Pro Max é muito mais leve por ser de Titânio e tem o poderoso Zoom de 5x.",
    "13 x 16 Pro Max": "Diferença extrema em tela (6.1' vs 6.9') e em recursos de Inteligência Artificial.",
    "14 x 16 Pro Max": "O Max domina em bateria e tamanho de tela, além de filmar em 4K 120fps profissional.",
    "15 x 13 Pro Max": "O 13 Pro Max ainda vence na bateria e na tela de 120Hz, mas o 15 é mais moderno e USB-C.",
    "16 x 15 Pro Max": "O 15 Pro Max oferece a lente periscópica (Zoom 5x) que falta no iPhone 16 normal.",
    "12 x 13 Pro Max": "O 13 Pro Max é um 'tanque' de bateria, sendo muito superior ao 12 normal nesse quesito.",
    "13 x 15 Pro Max": "Salto para quem quer tela gigante, carregamento USB-C e acabamento premium em Titânio.",
    "14 x 14 Pro Max": "O Max entrega a Dynamic Island e uma das melhores autonomias de bateria da história.",
    "15 x 16 Pro Max": "O 16 Pro Max é para quem quer produtividade máxima e a maior tela já feita pela Apple.",
    "11 x 15 Pro Max": "Upgrade definitivo: Sai do tamanho pequeno para o máximo de performance, tela e câmeras.",
    "12 x 16 Pro Max": "O 16 Pro Max é muito mais ergonômico (bordas finas) e infinitamente mais rápido.",
    "13 x 14 Pro Max": "O 14 Pro Max oferece a Dynamic Island e uma das melhores autonomias de bateria da história.",
    "14 x 15 Pro Max": "O 15 Pro Max é muito mais leve (Titânio) e traz o novo Botão de Ação personalizável.",
    "15 x 16 Pro Max": "O 16 Pro Max é mais fino, leve e traz o chip A18 pronto para IA, além de filmar em 4K 120fps.",
    "11 x 13 Pro Max": "Salto gigante: Você sai do LCD para o OLED de 120Hz e ganha o Modo Macro, Cinema e o poder do A18.",
    "12 x 14 Pro Max": "O 14 Pro Max oferece a Dynamic Island e uma das melhores autonomias de bateria da história.",
    "13 x 15 Pro Max": "Salto para quem quer tela gigante, carregamento USB-C e acabamento premium em Titânio.",
    "14 x 16 Pro Max": "O 16 Pro Max é mais fino, leve e traz o chip A18 pronto para IA, além de filmar em 4K 120fps.",
    "15 x 16 Pro Max": "O 16 Pro Max é mais fino, leve e traz o chip A18 pronto para IA, além de filmar em 4K 120fps.",

    // --- COMPARATIVOS DE GERAÇÕES PRO ---
    "11 Pro x 15 Pro Max": "Upgrade definitivo: Sai do tamanho pequeno para o máximo de performance, tela e câmeras.",
    "12 Pro Max x 16 Pro Max": "O 16 Pro Max é muito mais ergonômico (bordas finas) e infinitamente mais rápido.",
    "13 Pro Max x 15 Pro Max": "O 15 Pro Max é muito mais leve (Titânio) e traz o novo Botão de Ação personalizável.",
    "14 Pro Max x 16 Pro Max": "O 16 Pro Max é mais fino, leve e traz o chip A18 pronto para IA, além de filmar em 4K 120fps.",
    "11 Pro x 12 Pro Max": "O 12 Pro Max traz melhorias na câmera e o design em aço inoxidável, além de uma tela maior.",
    "12 Pro x 13 Pro Max": "O 13 Pro Max é um 'tanque' de bateria, sendo muito superior ao 12 Pro nesse quesito.",
    "13 Pro x 14 Pro Max": "O 14 Pro Max oferece a Dynamic Island e uma das melhores autonomias de bateria da história.",
    "14 Pro x 15 Pro Max": "O 15 Pro Max é muito mais leve (Titânio) e traz o novo Botão de Ação personalizável.",
    "15 Pro x 16 Pro Max": "O 16 Pro Max é mais fino, leve e traz o chip A18 pronto para IA, além de filmar em 4K 120fps.",
    "12 Pro x 14 Pro Max": "O 14 Pro Max oferece a Dynamic Island e uma das melhores autonomias de bateria da história.",
    "13 Pro x 15 Pro Max": "Salto para quem quer tela gigante, carregamento USB-C e acabamento premium em Titânio.",
    "14 Pro x 16 Pro": "O 16 Pro traz telas maiores (6.3'), o novo botão de Controle de Câmera e chip pronto para IA.",
    "15 Pro x 16 Pro": "O 16 Pro já vem com o novo chip A18, ideal para quem quer o máximo em performance e IA.",
    "11 Pro x 16 Pro Max": "Upgrade definitivo: Sai do tamanho pequeno para o máximo de performance, tela e câmeras.",
    "12 Pro Max x 16 Pro": "O 16 Pro é muito mais ergonômico (bordas finas) e infinitamente mais rápido.",
    "13 Pro Max x 16 Pro": "O 16 Pro é mais fino, leve e traz o chip A18 pronto para IA, além de filmar em 4K 120fps.",
    "14 Pro Max x 16 Pro": "O 16 Pro é mais fino, leve e traz o chip A18 pronto para IA, além de filmar em 4K 120fps.",
    "15 Pro Max x 16 Pro": "O 16 Pro já vem com o novo chip A18, ideal para quem quer o máximo em performance e IA.",
    "11 Pro x 16 Pro": "Salto gigante: Você sai do LCD para o OLED de 120Hz e ganha o Modo Macro, Cinema e o poder do A18.",
    "12 Pro x 15 Pro": "Mudança total: Titânio, USB-C, Botão de Ação e uma performance 50% superior no Pro.",
    "13 Pro x 14 Pro": "O 14 Pro entrega a Dynamic Island e muito mais brilho na tela que o 13 convencional.",
    "14 Pro x 15 Pro": "Vale o upgrade pelo chip A17 Pro (jogos de console) e pela versatilidade do USB-C.",
    
};

// --- INICIAR O CHAT ---
function iniciarFluxo(tipo) {
    sessao.tipo = tipo === 'cliente' ? 'Cliente MKS' : 'Novo Visitante';
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('chat-interface').classList.remove('hidden');
    botFala("Opa! tudo bem ? sou o assistente da MKS. Prazer em lhe atender! 🤖");
    setTimeout(() => { botFala("Como posso te chamar ?"); sessao.passo = 'nome'; }, 1000);
}

// --- LOGICA DE NAVEGAÇÃO ---
function executarAcao(opcao) {
    const txt = opcao.toLowerCase().trim();

    // FLUXO DE FINALIZAÇÃO (SEM ATENDENTE DIRETO)
    if (txt === "finalizar") {
        botFala("Certo! Mas antes de encerrar, você ainda está com alguma dúvida?");
        setTimeout(() => mostrarBotoes(["Sim, tenho dúvidas", "Não, tudo certo"]), 1000);
        return;
    }

    if (txt === "sim, tenho dúvidas") {
        botFala("Sem problemas! Deixe seu WhatsApp com DDD e um consultor entrará em contato com você o mais rápido possível:");
        sessao.passo = 'aguardando_whats';
        return;
    }

    if (txt === "não, tudo certo") {
        botFala("Perfeito! Foi um prazer te ajudar. Visite nosso site sempre que precisar!");
        setTimeout(() => { window.location.href = "https://github.com/MKS-TechSolutions/chatBotMKS/"; }, 3500);
        return;
    }

    // BOTÕES DE RETORNO
    if (txt === "voltar" || txt === "ver categorias") { menuPrincipal(); return; }
    if (txt === "voltar para apple") { irPara("apple"); return; }

    // CATEGORIAS E SUB-ITENS
    if (bancoDados[txt]) { irPara(txt); return; }
    if (txt === "vídeo game") { irPara("video_game"); return; }
    if (txt === "acessorios") { irPara("acessorios"); return; }
    if (txt === "ajuda na escolha") { irPara("ajuda_apple"); return; }
    if (txt === "comparar modelos") { irPara("comparar_apple"); return; }

    if (respostasExtras[txt]) {
        botFala(respostasExtras[txt]);
        setTimeout(() => mostrarBotoes(["Voltar", "Finalizar"]), 1500);
        return;
    }

    const buscaComparacao = txt.replace(' vs ', ' x ');
    if (comparacoes[buscaComparacao]) {
        botFala(comparacoes[buscaComparacao]);
        setTimeout(() => mostrarBotoes(["Comparar outro", "Voltar para Apple", "Finalizar"]), 1500);
        return;
    }

    botFala("Não captei essa informação. Vamos tentar pelo menu?");
    setTimeout(menuPrincipal, 1000);
}

function irPara(id) {
    sessao.categoriaAtual = id;
    const info = bancoDados[id];
    botFala(info.resposta);
    setTimeout(() => mostrarBotoes(info.botoes), 800);
}

function menuPrincipal() {
    sessao.categoriaAtual = 'inicio';
    botFala("Escolha uma categoria para explorarmos:");
    mostrarBotoes(["Apple", "Computador", "Notebook", "Vídeo Game", "Acessorios", "Garantia", "Envios", "Finalizar"]);
}

// --- INTERFACE ---
function botFala(texto) {
    const win = document.getElementById('chat-window');
    const typing = document.getElementById('typing-indicator');
    typing.classList.remove('hidden');
    setTimeout(() => {
        typing.classList.add('hidden');
        const div = document.createElement('div');
        div.className = 'msg bot';
        div.innerHTML = texto.replace(/\n/g, '<br>');
        win.insertBefore(div, typing);
        win.scrollTop = win.scrollHeight;
    }, 800);
}

function userMsg(texto) {
    const win = document.getElementById('chat-window');
    const div = document.createElement('div');
    div.className = 'msg user';
    div.innerText = texto;
    win.insertBefore(div, document.getElementById('typing-indicator'));
    win.scrollTop = win.scrollHeight;
}

function mostrarBotoes(lista) {
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    lista.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'btn-opt';
        btn.innerText = item;
        btn.onclick = () => { userMsg(item); executarAcao(item); };
        container.appendChild(btn);
    });
}

function handleInput() {
    const input = document.getElementById('user-input');
    const msg = input.value.trim();
    if (!msg) return;

    if (sessao.passo === 'nome') {
        userMsg(msg);
        sessao.nome = msg;
        sessao.passo = 'chat';
        botFala(`Prazer, ${msg}!`);
        setTimeout(menuPrincipal, 800);
    } 
    else if (sessao.passo === 'aguardando_whats') {
        userMsg(msg);
        sessao.whatsapp = msg;
        botFala(`Obrigado, ${sessao.nome}! Registrei seu contato (${msg}). Um consultor te chamará em breve para tirar suas dúvidas. Redirecionando...`);
        setTimeout(() => { window.location.href = "https://github.com/MKS-TechSolutions/chatBotMKS/"; }, 3500);
    }
    else {
        userMsg(msg);
        executarAcao(msg);
    }
    input.value = '';
}


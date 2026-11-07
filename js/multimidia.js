/*
  FINANCE — multimidia.js
  Página Multimídia (JavaScript puro): legendas sincronizadas com o
  vídeo, roteiro clicável, lista de episódios de áudio, controle de
  velocidade e ampliação das imagens da galeria.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

const LEGENDAS = [
  { inicio: 0, fim: 4.3, texto: "Saber quanto entra e quanto sai é o primeiro passo." },
  { inicio: 4.3, fim: 8.6, texto: "Anote cada gasto, até os pequenos." },
  { inicio: 8.6, fim: 12.9, texto: "Separe uma parte da renda antes de gastar." },
  { inicio: 12.9, fim: 17.2, texto: "Defina metas com valor e prazo." },
  { inicio: 17.2, fim: 22, texto: "FINANCE: sua vida financeira em boas mãos." }
];

const EPISODIOS = [
  {
    titulo: "Finanças: aprenda a manter o equilíbrio das contas com técnica simples",
    arquivo: "audio/radioagencia-equilibrio-das-contas.mp3",
    duracao: "5:56",
    data: "21/05/2026",
    autor: "Oussama El Ghaouri — Rádio Nacional",
    resumo: "Reportagem produzida durante a 13ª Semana Nacional de Educação Financeira. Traz o relato de um brasiliense que estudou finanças por conta própria e conta como entender os juros compostos mudou sua relação com o dinheiro, além de reflexões sobre como ensinar crianças a lidar com ele."
  },
  {
    titulo: "Educação financeira é fundamental para reduzir o endividamento",
    arquivo: "audio/radioagencia-educacao-e-endividamento.mp3",
    duracao: "3:36",
    data: "20/05/2026",
    autor: "Oussama El Ghaouri — Rádio Nacional",
    resumo: "Com base no Relatório de Cidadania Financeira 2025 do Banco Central, a reportagem mostra que metade das famílias aponta o dinheiro como motivo de estresse e traz a visão de um consultor financeiro sobre começar a educação financeira desde a infância."
  }
];

function formatarTempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = Math.floor(segundos % 60);
  return minutos + ":" + String(resto).padStart(2, "0");
}

function montarRoteiro(video) {
  const roteiro = document.getElementById("roteiroVideo");
  for (let i = 0; i < LEGENDAS.length; i++) {
    const item = document.createElement("li");
    const botao = document.createElement("button");
    botao.type = "button";
    botao.innerHTML = "<time>" + formatarTempo(LEGENDAS[i].inicio) + "</time><span>" + LEGENDAS[i].texto + "</span>";
    botao.addEventListener("click", function () {
      video.currentTime = LEGENDAS[i].inicio;
      video.play();
    });
    item.appendChild(botao);
    roteiro.appendChild(item);
  }
}

function atualizarLegenda(video) {
  const legenda = document.getElementById("legendaVideo");
  const mostrar = document.getElementById("mostrarLegendas").checked;
  const botoes = document.querySelectorAll("#roteiroVideo button");
  let texto = "";

  for (let i = 0; i < LEGENDAS.length; i++) {
    const atual = video.currentTime >= LEGENDAS[i].inicio && video.currentTime < LEGENDAS[i].fim;
    botoes[i].classList.toggle("atual", atual);
    if (atual) {
      texto = LEGENDAS[i].texto;
    }
  }

  if (mostrar && !video.paused) {
    legenda.textContent = texto;
  } else {
    legenda.textContent = "";
  }
}

function montarEpisodios() {
  const lista = document.getElementById("listaEpisodios");
  EPISODIOS.forEach(function (episodio, indice) {
    const item = document.createElement("li");
    item.innerHTML = `
      <button type="button" data-indice="${indice}">
        <span class="episodio-numero">${String(indice + 1).padStart(2, "0")}</span>
        <span><strong>${episodio.titulo}</strong><small>${episodio.data} · ${episodio.duracao}</small></span>
      </button>`;
    lista.appendChild(item);
  });

  lista.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button");
    if (botao) {
      escolherEpisodio(Number(botao.dataset.indice), true);
    }
  });
}

function escolherEpisodio(indice, tocar) {
  const episodio = EPISODIOS[indice];
  const audio = document.getElementById("audioFinance");

  document.getElementById("tituloEpisodio").textContent = episodio.titulo;
  document.getElementById("infoEpisodio").textContent = episodio.autor + " · " + episodio.data + " · " + episodio.duracao;
  document.getElementById("resumoEpisodio").textContent = episodio.resumo;
  document.getElementById("fonteAudio").src = episodio.arquivo;
  audio.load();
  audio.playbackRate = Number(document.querySelector("#velocidades .ativo").dataset.velocidade);

  document.querySelectorAll("#listaEpisodios button").forEach(function (botao) {
    botao.classList.toggle("ativo", Number(botao.dataset.indice) === indice);
  });

  if (tocar) {
    audio.play();
  }
}

function prepararVelocidades() {
  const grupo = document.getElementById("velocidades");
  const audio = document.getElementById("audioFinance");
  grupo.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button");
    if (!botao) {
      return;
    }
    grupo.querySelectorAll("button").forEach(function (outro) {
      outro.classList.remove("ativo");
    });
    botao.classList.add("ativo");
    audio.playbackRate = Number(botao.dataset.velocidade);
  });
}

function prepararGaleria() {
  const janela = document.getElementById("janelaGaleria");
  const imagem = document.getElementById("imagemJanela");

  document.getElementById("galeria").addEventListener("click", function (evento) {
    const item = evento.target.closest(".galeria-item");
    if (!item) {
      return;
    }
    const foto = item.querySelector("img");
    imagem.src = foto.src;
    imagem.alt = foto.alt;
    document.getElementById("tituloJanelaGaleria").textContent = item.dataset.titulo;
    document.getElementById("textoJanela").textContent = item.dataset.texto;
    janela.showModal();
  });

  document.getElementById("btnFecharGaleria").addEventListener("click", function () {
    janela.close();
  });

  janela.addEventListener("click", function (evento) {
    if (evento.target === janela) {
      janela.close();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("videoFinance");
  const audio = document.getElementById("audioFinance");
  const ondas = document.getElementById("ondasAudio");

  montarRoteiro(video);
  video.addEventListener("timeupdate", function () {
    atualizarLegenda(video);
  });
  video.addEventListener("pause", function () {
    atualizarLegenda(video);
  });
  document.getElementById("mostrarLegendas").addEventListener("change", function () {
    atualizarLegenda(video);
  });

  montarEpisodios();
  prepararVelocidades();
  escolherEpisodio(0, false);
  audio.addEventListener("play", function () {
    ondas.classList.add("tocando");
  });
  audio.addEventListener("pause", function () {
    ondas.classList.remove("tocando");
  });

  prepararGaleria();
});

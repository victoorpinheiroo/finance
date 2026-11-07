/*
  FINANCE — comum.js
  Funções usadas por várias páginas: leitura e gravação no localStorage,
  formatação de valores e datas, avisos na tela, favoritos e animações.
  Não depende do Bootstrap.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

const CHAVES = {
  favoritos: "finance_favoritos",
  movimentacoes: "finance_movimentacoes",
  metas: "finance_metas",
  progresso: "finance_progresso",
  mensagens: "finance_mensagens",
  tema: "finance_tema"
};

const NOMES_MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

function lerDados(chave, valorPadrao) {
  const texto = localStorage.getItem(chave);
  if (texto === null) {
    return valorPadrao;
  }
  try {
    return JSON.parse(texto);
  } catch (erro) {
    return valorPadrao;
  }
}

function salvarDados(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarData(dataISO) {
  const partes = dataISO.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function dataDeHoje() {
  const hoje = new Date();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return hoje.getFullYear() + "-" + mes + "-" + dia;
}

function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function mostrarAviso(texto, tipo, textoBotao, acaoBotao) {
  const area = document.getElementById("areaAvisos");
  if (!area) {
    return;
  }
  const aviso = document.createElement("div");
  aviso.className = "aviso";
  if (tipo === "erro") {
    aviso.classList.add("aviso-erro");
  } else if (tipo === "info") {
    aviso.classList.add("aviso-info");
  }
  aviso.setAttribute("role", "status");

  const mensagem = document.createElement("span");
  mensagem.textContent = texto;
  aviso.appendChild(mensagem);

  if (textoBotao && acaoBotao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = textoBotao;
    botao.addEventListener("click", function () {
      acaoBotao();
      aviso.remove();
    });
    aviso.appendChild(botao);
  }

  area.appendChild(aviso);
  setTimeout(function () {
    aviso.classList.add("aviso-saindo");
    setTimeout(function () {
      aviso.remove();
    }, 300);
  }, 4500);
}

function lerFavoritos() {
  return lerDados(CHAVES.favoritos, []);
}

function ehFavorito(codigo) {
  return lerFavoritos().includes(codigo);
}

function alternarFavorito(codigo) {
  const favoritos = lerFavoritos();
  const posicao = favoritos.indexOf(codigo);
  let adicionou;
  if (posicao === -1) {
    favoritos.push(codigo);
    adicionou = true;
  } else {
    favoritos.splice(posicao, 1);
    adicionou = false;
  }
  salvarDados(CHAVES.favoritos, favoritos);
  atualizarContadorFavoritos();
  return adicionou;
}

function atualizarContadorFavoritos() {
  const contador = document.getElementById("contadorFavoritos");
  if (contador) {
    const total = lerFavoritos().length;
    contador.textContent = total > 0 ? total : "";
  }
}

function prepararFavoritos(container, aoAlterar) {
  container.addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-favorito]");
    if (!botao) {
      return;
    }
    const adicionou = alternarFavorito(botao.dataset.favorito);
    botao.classList.toggle("ativo", adicionou);
    botao.setAttribute("aria-pressed", adicionou);
    if (adicionou) {
      mostrarAviso("Adicionado aos favoritos.");
    } else {
      mostrarAviso("Removido dos favoritos.", "info");
    }
    if (aoAlterar) {
      aoAlterar();
    }
  });
}

function ativarAnimacoes() {
  const elementos = document.querySelectorAll(".revelar");
  if (!("IntersectionObserver" in window)) {
    elementos.forEach(function (elemento) {
      elemento.classList.add("visivel");
    });
    return;
  }
  const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });
  elementos.forEach(function (elemento) {
    observador.observe(elemento);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const ano = document.getElementById("anoAtual");
  if (ano) {
    ano.textContent = new Date().getFullYear();
  }
  atualizarContadorFavoritos();
  ativarAnimacoes();
});

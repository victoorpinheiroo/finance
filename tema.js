/*
  FINANCE — tema.js
  Aplica o modo claro ou escuro antes da página aparecer e controla
  o botão de alternância. A escolha fica salva no localStorage.
  Usado em todas as páginas (não depende do Bootstrap).
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

const CHAVE_TEMA = "finance_tema";

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  document.documentElement.setAttribute("data-bs-theme", tema);
}

function temaInicial() {
  const temaSalvo = localStorage.getItem(CHAVE_TEMA);
  if (temaSalvo === "dark" || temaSalvo === "light") {
    return temaSalvo;
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function alternarTema() {
  const temaAtual = document.documentElement.getAttribute("data-theme");
  const novoTema = temaAtual === "dark" ? "light" : "dark";
  aplicarTema(novoTema);
  localStorage.setItem(CHAVE_TEMA, novoTema);
}

aplicarTema(temaInicial());

document.addEventListener("DOMContentLoaded", function () {
  const botaoTema = document.getElementById("btnTema");
  if (botaoTema) {
    botaoTema.addEventListener("click", alternarTema);
  }
});

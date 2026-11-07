/*
  FINANCE — sobre.js
  Página Sobre (JavaScript puro): mostra quantos registros estão
  salvos no navegador e permite apagar todos os dados do FINANCE
  após confirmação em uma janela de diálogo.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

function contarDadosSalvos() {
  document.getElementById("totalMovimentacoes").textContent = lerDados(CHAVES.movimentacoes, []).length;
  document.getElementById("totalMetas").textContent = lerDados(CHAVES.metas, []).length;
  document.getElementById("totalFavoritos").textContent = lerDados(CHAVES.favoritos, []).length;
  document.getElementById("totalMensagens").textContent = lerDados(CHAVES.mensagens, []).length;
}

function apagarTodosOsDados() {
  const chaves = Object.values(CHAVES);
  for (let i = 0; i < chaves.length; i++) {
    localStorage.removeItem(chaves[i]);
  }
  aplicarTema(temaInicial());
  contarDadosSalvos();
  atualizarContadorFavoritos();
  mostrarAviso("Todos os dados do FINANCE foram apagados deste navegador.");
}

document.addEventListener("DOMContentLoaded", function () {
  const janela = document.getElementById("janelaConfirmar");

  contarDadosSalvos();

  document.getElementById("btnApagarDados").addEventListener("click", function () {
    janela.showModal();
  });

  document.getElementById("btnCancelar").addEventListener("click", function () {
    janela.close();
  });

  document.getElementById("btnConfirmar").addEventListener("click", function () {
    apagarTodosOsDados();
    janela.close();
  });
});

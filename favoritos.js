/*
  FINANCE — favoritos.js
  Página de favoritos: separa artigos e termos salvos no localStorage,
  monta as listas, permite remover itens e limpar tudo.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

function mostrarFavoritos() {
  const favoritos = lerFavoritos();
  const listaArtigos = document.getElementById("listaArtigosFavoritos");
  const listaTermos = document.getElementById("listaTermosFavoritos");
  let htmlArtigos = "";
  let htmlTermos = "";
  let totalArtigos = 0;
  let totalTermos = 0;

  for (let i = 0; i < favoritos.length; i++) {
    const codigo = favoritos[i];
    if (codigo.startsWith("artigo-")) {
      const artigo = buscarArtigo(Number(codigo.replace("artigo-", "")));
      if (artigo) {
        htmlArtigos += criarCardArtigo(artigo);
        totalArtigos++;
      }
    } else if (codigo.startsWith("termo-")) {
      const termo = GLOSSARIO.find(function (item) {
        return "termo-" + item.id === codigo;
      });
      if (termo) {
        htmlTermos += `
          <div class="termo">
            <dt>${termo.termo}
              <button type="button" class="btn btn-favorito ativo" data-favorito="${codigo}" aria-pressed="true" aria-label="Remover ${termo.termo} dos favoritos">
                <svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>
              </button>
            </dt>
            <dd>${termo.definicao}</dd>
          </div>`;
        totalTermos++;
      }
    }
  }

  if (totalArtigos === 0) {
    htmlArtigos = `
      <div class="vazio" style="grid-column: 1 / -1;">
        <svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>
        <h3>Nenhum artigo favorito</h3>
        <p>Toque na estrela de um artigo para guardá-lo aqui.</p>
        <a class="btn btn-primary" href="artigos.html">Explorar artigos</a>
      </div>`;
  }

  if (totalTermos === 0) {
    htmlTermos = `
      <div class="vazio w-100">
        <h3>Nenhum termo favorito</h3>
        <p>No glossário da página Aprenda, use a estrela para salvar termos.</p>
        <a class="btn btn-outline-primary" href="aprenda.html#tituloGlossario">Abrir glossário</a>
      </div>`;
  }

  listaArtigos.innerHTML = htmlArtigos;
  listaTermos.innerHTML = htmlTermos;
  document.getElementById("totalArtigosFavoritos").textContent = totalArtigos;
  document.getElementById("totalTermosFavoritos").textContent = totalTermos;
  document.getElementById("btnLimparFavoritos").disabled = favoritos.length === 0;
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarFavoritos();
  prepararFavoritos(document.getElementById("listaArtigosFavoritos"), mostrarFavoritos);
  prepararFavoritos(document.getElementById("listaTermosFavoritos"), mostrarFavoritos);

  document.getElementById("btnLimparFavoritos").addEventListener("click", function () {
    const confirmou = confirm("Remover todos os favoritos? Essa ação não pode ser desfeita.");
    if (confirmou) {
      salvarDados(CHAVES.favoritos, []);
      atualizarContadorFavoritos();
      mostrarFavoritos();
      mostrarAviso("Todos os favoritos foram removidos.", "info");
    }
  });
});

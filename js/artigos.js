/*
  FINANCE — artigos.js
  Biblioteca de artigos: pesquisa por texto, filtro por categoria,
  ordenação, contagem de resultados e favoritos. Lê os parâmetros
  "busca" e "categoria" da URL para chegar já filtrado.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

const filtros = {
  texto: "",
  categoria: "todas",
  ordem: "recentes"
};

function montarChips() {
  const area = document.getElementById("filtrosCategoria");
  let html = `<button type="button" class="chip" data-categoria="todas">Todas<small>${ARTIGOS.length}</small></button>`;
  CATEGORIAS.forEach(function (categoria) {
    const total = ARTIGOS.filter(function (artigo) {
      return artigo.categoria === categoria.id;
    }).length;
    html += `<button type="button" class="chip" data-categoria="${categoria.id}"><span class="ponto-cor" style="background:${categoria.cor}"></span>${categoria.nome}<small>${total}</small></button>`;
    document.querySelector(`[data-total="${categoria.id}"]`).textContent = total + (total === 1 ? " artigo" : " artigos");
  });
  area.innerHTML = html;
}

function filtrarArtigos() {
  const texto = filtros.texto.trim().toLowerCase();
  let resultado = ARTIGOS.filter(function (artigo) {
    const combinaCategoria = filtros.categoria === "todas" || artigo.categoria === filtros.categoria;
    const conteudo = (artigo.titulo + " " + artigo.resumo + " " + artigo.conteudo.join(" ")).toLowerCase();
    const combinaTexto = texto === "" || conteudo.includes(texto);
    return combinaCategoria && combinaTexto;
  });

  if (filtros.ordem === "alfabetica") {
    resultado.sort(function (a, b) {
      return a.titulo.localeCompare(b.titulo);
    });
  } else if (filtros.ordem === "curtos") {
    resultado.sort(function (a, b) {
      return tempoLeitura(a) - tempoLeitura(b);
    });
  } else {
    resultado.sort(function (a, b) {
      return b.data.localeCompare(a.data);
    });
  }
  return resultado;
}

function mostrarArtigos() {
  const lista = document.getElementById("listaArtigos");
  const resultado = filtrarArtigos();
  const contador = document.getElementById("contadorArtigos");

  document.querySelectorAll("[data-categoria]").forEach(function (botao) {
    botao.classList.toggle("ativo", botao.dataset.categoria === filtros.categoria);
  });

  if (resultado.length === 0) {
    lista.innerHTML = `
      <div class="vazio" style="grid-column: 1 / -1;">
        <svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
        <h3>Nenhum artigo encontrado</h3>
        <p class="mb-0">Tente outra palavra ou limpe os filtros.</p>
      </div>`;
  } else {
    let html = "";
    for (let i = 0; i < resultado.length; i++) {
      html += criarCardArtigo(resultado[i]);
    }
    lista.innerHTML = html;
  }

  let descricao = resultado.length + (resultado.length === 1 ? " artigo" : " artigos");
  if (filtros.categoria !== "todas") {
    descricao += " em " + buscarCategoria(filtros.categoria).nome;
  }
  if (filtros.texto.trim() !== "") {
    descricao += " para \"" + filtros.texto.trim() + "\"";
  }
  contador.textContent = descricao;
}

function escolherCategoria(evento) {
  const botao = evento.target.closest("[data-categoria]");
  if (!botao) {
    return;
  }
  filtros.categoria = botao.dataset.categoria;
  mostrarArtigos();
  if (botao.classList.contains("categoria-cartao")) {
    document.getElementById("listaArtigos").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function lerParametrosDaUrl() {
  const parametros = new URLSearchParams(window.location.search);
  const busca = parametros.get("busca");
  const categoria = parametros.get("categoria");
  if (busca) {
    filtros.texto = busca;
    document.getElementById("buscaArtigos").value = busca;
  }
  if (categoria && buscarCategoria(categoria)) {
    filtros.categoria = categoria;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const busca = document.getElementById("buscaArtigos");
  const ordem = document.getElementById("ordemArtigos");

  montarChips();
  lerParametrosDaUrl();
  mostrarArtigos();

  busca.addEventListener("input", function () {
    filtros.texto = busca.value;
    mostrarArtigos();
  });

  ordem.addEventListener("change", function () {
    filtros.ordem = ordem.value;
    mostrarArtigos();
  });

  document.getElementById("filtrosCategoria").addEventListener("click", escolherCategoria);
  document.getElementById("gradeCategorias").addEventListener("click", escolherCategoria);

  document.getElementById("btnLimparFiltros").addEventListener("click", function () {
    filtros.texto = "";
    filtros.categoria = "todas";
    filtros.ordem = "recentes";
    busca.value = "";
    ordem.value = "recentes";
    mostrarArtigos();
    mostrarAviso("Filtros limpos.", "info");
  });

  prepararFavoritos(document.getElementById("listaArtigos"));
});

/*
  FINANCE — artigo.js
  Página de leitura: lê o "id" da URL, monta o artigo no DOM, calcula o
  tempo de leitura, controla o favorito, mostra a barra de progresso de
  leitura, links de anterior/próximo e artigos relacionados.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

function atualizarBotaoFavorito(botao, codigo) {
  const ativo = ehFavorito(codigo);
  botao.classList.toggle("ativo", ativo);
  botao.setAttribute("aria-pressed", ativo);
  botao.querySelector("span").textContent = ativo ? "Favoritado" : "Favoritar";
}

function montarArtigo(artigo) {
  const categoria = buscarCategoria(artigo.categoria);
  const linkCategoria = document.getElementById("artigoCategoria");

  document.title = artigo.titulo + " — FINANCE";
  linkCategoria.innerHTML = `<span class="ponto-cor" style="background:${categoria.cor}"></span>${categoria.nome}`;
  linkCategoria.href = "artigos.html?categoria=" + categoria.id;
  document.getElementById("trilhaCategoria").textContent = categoria.nome;
  document.getElementById("artigoTitulo").textContent = artigo.titulo;
  document.getElementById("artigoResumo").textContent = artigo.resumo;
  document.getElementById("artigoMeta").lastChild.textContent = " " + tempoLeitura(artigo) + " min de leitura · Publicado em " + formatarData(artigo.data);
  document.getElementById("artigoImagem").src = artigo.imagem;
  document.getElementById("artigoImagem").alt = "Imagem ilustrativa do artigo " + artigo.titulo;
  document.getElementById("artigoCorpo").innerHTML = artigo.conteudo.join("");

  const fontes = document.getElementById("artigoFontes");
  artigo.fontes.forEach(function (fonte) {
    const item = document.createElement("li");
    item.innerHTML = `<a href="${fonte.url}" target="_blank" rel="noopener noreferrer">${fonte.nome}</a>`;
    fontes.appendChild(item);
  });
}

function montarNavegacao(artigo) {
  const posicao = ARTIGOS.indexOf(artigo);
  const anterior = ARTIGOS[posicao - 1];
  const proximo = ARTIGOS[posicao + 1];
  let html = "";
  if (anterior) {
    html += `<a href="artigo.html?id=${anterior.id}" class="nav-artigo"><small>Anterior</small><strong>${anterior.titulo}</strong></a>`;
  } else {
    html += "<span></span>";
  }
  if (proximo) {
    html += `<a href="artigo.html?id=${proximo.id}" class="nav-artigo nav-artigo-proximo"><small>Próximo</small><strong>${proximo.titulo}</strong></a>`;
  }
  document.getElementById("navArtigos").innerHTML = html;
}

function montarRelacionados(artigo) {
  const lista = document.getElementById("listaRelacionados");
  const mesmaCategoria = ARTIGOS.filter(function (outro) {
    return outro.categoria === artigo.categoria && outro.id !== artigo.id;
  });
  const outros = ARTIGOS.filter(function (outro) {
    return outro.categoria !== artigo.categoria;
  });
  const relacionados = mesmaCategoria.concat(outros).slice(0, 3);
  let html = "";
  relacionados.forEach(function (item) {
    html += criarCardArtigo(item);
  });
  lista.innerHTML = html;
  prepararFavoritos(lista);
}

function atualizarBarraLeitura() {
  const barra = document.getElementById("barraLeitura");
  const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
  let percentual = 0;
  if (alturaTotal > 0) {
    percentual = (window.scrollY / alturaTotal) * 100;
  }
  barra.style.width = percentual + "%";
}

document.addEventListener("DOMContentLoaded", function () {
  const parametros = new URLSearchParams(window.location.search);
  const id = Number(parametros.get("id")) || 1;
  const artigo = buscarArtigo(id);

  if (!artigo) {
    document.getElementById("leitura").classList.add("d-none");
    document.getElementById("secaoRelacionados").classList.add("d-none");
    document.getElementById("artigoNaoEncontrado").classList.remove("d-none");
    return;
  }

  montarArtigo(artigo);
  montarNavegacao(artigo);
  montarRelacionados(artigo);

  const codigo = "artigo-" + artigo.id;
  const botaoFavorito = document.getElementById("btnFavoritoArtigo");
  atualizarBotaoFavorito(botaoFavorito, codigo);
  botaoFavorito.addEventListener("click", function () {
    const adicionou = alternarFavorito(codigo);
    atualizarBotaoFavorito(botaoFavorito, codigo);
    mostrarAviso(adicionou ? "Artigo salvo nos favoritos." : "Artigo removido dos favoritos.", adicionou ? "" : "info");
  });

  window.addEventListener("scroll", atualizarBarraLeitura);
  atualizarBarraLeitura();
});

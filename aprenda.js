/*
  FINANCE — aprenda.js
  Página Aprenda: monta as trilhas a partir dos dados, salva os módulos
  concluídos no localStorage, calcula o progresso e filtra o glossário
  com favoritos.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

function lerProgresso() {
  return lerDados(CHAVES.progresso, []);
}

function montarTrilhas() {
  const lista = document.getElementById("listaTrilhas");
  const concluidos = lerProgresso();
  let html = "";

  TRILHAS.forEach(function (trilha) {
    let itens = "";
    trilha.modulos.forEach(function (modulo) {
      const marcado = concluidos.includes(modulo.id) ? "checked" : "";
      itens += `
        <li class="modulo">
          <input class="form-check-input" type="checkbox" id="mod-${modulo.id}" data-modulo="${modulo.id}" ${marcado}>
          <div>
            <label class="form-check-label" for="mod-${modulo.id}">${modulo.titulo}</label>
            <a href="artigo.html?id=${modulo.artigo}">Ler artigo · ${tempoLeitura(buscarArtigo(modulo.artigo))} min</a>
          </div>
        </li>`;
    });

    html += `
      <div class="col">
        <article class="card h-100 card-trilha" data-trilha="${trilha.id}">
          <div class="card-body d-flex flex-column">
            <span class="etiqueta align-self-start mb-3">${trilha.nivel}</span>
            <h3 class="card-title">${trilha.titulo}</h3>
            <p class="card-text">${trilha.descricao}</p>
            <div class="d-flex justify-content-between small text-body-secondary mb-2">
              <span>Progresso</span><span class="trilha-percentual">0%</span>
            </div>
            <div class="progress mb-3"><div class="progress-bar" style="width: 0%"></div></div>
            <ul class="lista-modulos">${itens}</ul>
          </div>
        </article>
      </div>`;
  });

  lista.innerHTML = html;
}

function atualizarProgresso() {
  const concluidos = lerProgresso();
  let totalModulos = 0;
  let totalConcluidos = 0;

  TRILHAS.forEach(function (trilha) {
    let feitos = 0;
    for (let i = 0; i < trilha.modulos.length; i++) {
      if (concluidos.includes(trilha.modulos[i].id)) {
        feitos++;
      }
    }
    totalModulos += trilha.modulos.length;
    totalConcluidos += feitos;

    const percentual = Math.round((feitos / trilha.modulos.length) * 100);
    const cartao = document.querySelector(`[data-trilha="${trilha.id}"]`);
    cartao.querySelector(".trilha-percentual").textContent = percentual + "%";
    cartao.querySelector(".progress-bar").style.width = percentual + "%";
    cartao.classList.toggle("trilha-completa", percentual === 100);
  });

  const geral = Math.round((totalConcluidos / totalModulos) * 100);
  document.getElementById("progressoGeral").textContent = geral + "%";
  document.getElementById("modulosConcluidos").textContent = totalConcluidos + " de " + totalModulos + " módulos";
  document.querySelector("#barraGeral .progress-bar").style.width = geral + "%";
  document.getElementById("barraGeral").setAttribute("aria-valuenow", geral);
}

function marcarModulo(evento) {
  const caixa = evento.target;
  if (!caixa.dataset.modulo) {
    return;
  }
  const concluidos = lerProgresso();
  const posicao = concluidos.indexOf(caixa.dataset.modulo);

  if (caixa.checked && posicao === -1) {
    concluidos.push(caixa.dataset.modulo);
    mostrarAviso("Módulo concluído. Continue assim!");
  } else if (!caixa.checked && posicao !== -1) {
    concluidos.splice(posicao, 1);
    mostrarAviso("Módulo desmarcado.", "info");
  }

  salvarDados(CHAVES.progresso, concluidos);
  atualizarProgresso();
}

function mostrarGlossario(filtro) {
  const lista = document.getElementById("listaGlossario");
  const texto = filtro.trim().toLowerCase();
  let html = "";
  let encontrados = 0;

  for (let i = 0; i < GLOSSARIO.length; i++) {
    const item = GLOSSARIO[i];
    const combina = item.termo.toLowerCase().includes(texto) || item.definicao.toLowerCase().includes(texto);
    if (combina) {
      encontrados++;
      const codigo = "termo-" + item.id;
      const ativo = ehFavorito(codigo);
      html += `
        <div class="termo">
          <dt>${item.termo}
            <button type="button" class="btn btn-favorito${ativo ? " ativo" : ""}" data-favorito="${codigo}" aria-pressed="${ativo}" aria-label="Favoritar termo ${item.termo}">
              <svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>
            </button>
          </dt>
          <dd>${item.definicao}</dd>
        </div>`;
    }
  }

  if (encontrados === 0) {
    html = `<div class="vazio w-100"><h3>Nenhum termo encontrado</h3><p class="mb-0">Tente outra palavra.</p></div>`;
  }

  lista.innerHTML = html;
  document.getElementById("contadorGlossario").textContent = encontrados + (encontrados === 1 ? " termo encontrado" : " termos encontrados");
}

document.addEventListener("DOMContentLoaded", function () {
  montarTrilhas();
  atualizarProgresso();
  document.getElementById("listaTrilhas").addEventListener("change", marcarModulo);

  const busca = document.getElementById("buscaGlossario");
  mostrarGlossario("");
  busca.addEventListener("input", function () {
    mostrarGlossario(busca.value);
  });
  prepararFavoritos(document.getElementById("listaGlossario"));
});

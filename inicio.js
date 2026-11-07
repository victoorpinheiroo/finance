/*
  FINANCE — inicio.js
  Página inicial: saudação conforme o horário, resumo do mês a partir
  das movimentações salvas, meta em destaque, dica do dia, artigos
  recentes e atalhos para as categorias.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

function mostrarSaudacao() {
  const hora = new Date().getHours();
  let saudacao;
  if (hora < 12) {
    saudacao = "Bom dia!";
  } else if (hora < 18) {
    saudacao = "Boa tarde!";
  } else {
    saudacao = "Boa noite!";
  }
  document.getElementById("saudacao").textContent = saudacao;
  document.getElementById("nomeMes").textContent = NOMES_MESES[new Date().getMonth()];
}

function mostrarResumoDoMes() {
  const movimentacoes = lerDados(CHAVES.movimentacoes, []);
  const mesAtual = dataDeHoje().slice(0, 7);
  let receitas = 0;
  let despesas = 0;
  let quantidade = 0;

  for (let i = 0; i < movimentacoes.length; i++) {
    const item = movimentacoes[i];
    if (item.data.slice(0, 7) === mesAtual) {
      quantidade++;
      if (item.tipo === "receita") {
        receitas += item.valor;
      } else {
        despesas += item.valor;
      }
    }
  }

  const saldo = receitas - despesas;
  let percentual = 0;
  if (receitas > 0) {
    percentual = Math.min(100, Math.round((despesas / receitas) * 100));
  } else if (despesas > 0) {
    percentual = 100;
  }

  document.getElementById("resumoReceitas").textContent = formatarMoeda(receitas);
  document.getElementById("resumoDespesas").textContent = formatarMoeda(despesas);
  document.getElementById("resumoSaldo").textContent = formatarMoeda(saldo);
  document.getElementById("resumoPercentual").textContent = percentual + "%";
  document.getElementById("resumoBarra").style.width = percentual + "%";

  const status = document.getElementById("resumoStatus");
  const nota = document.getElementById("resumoNota");
  if (quantidade > 0) {
    status.textContent = quantidade + (quantidade === 1 ? " lançamento" : " lançamentos");
    status.classList.add("etiqueta-marca");
    if (saldo >= 0) {
      nota.innerHTML = "Bom trabalho: suas receitas cobrem as despesas deste mês. <a href=\"movimentacoes.html\">Ver detalhes</a>";
    } else {
      nota.innerHTML = "Atenção: as despesas superaram as receitas neste mês. <a href=\"movimentacoes.html\">Revisar gastos</a>";
    }
  }
}

function mostrarMetaEmDestaque() {
  const metas = lerDados(CHAVES.metas, []);
  const caixa = document.getElementById("metaDestaque");
  let escolhida = null;
  let maiorProgresso = -1;

  metas.forEach(function (meta) {
    const progresso = meta.valorAtual / meta.valorAlvo;
    if (progresso < 1 && progresso > maiorProgresso) {
      maiorProgresso = progresso;
      escolhida = meta;
    }
  });

  if (escolhida === null) {
    return;
  }

  const percentual = Math.round(maiorProgresso * 100);
  caixa.innerHTML = `
    <span class="indicador-rotulo">Meta em destaque</span>
    <strong>${escaparHtml(escolhida.nome)}</strong>
    <div class="barra-progresso"><div class="barra-progresso-preenchida" style="width:${percentual}%"></div></div>
    <span class="cartao-meta-info">${percentual}% de ${formatarMoeda(escolhida.valorAlvo)}</span>`;
}

function mostrarDicaDoDia() {
  const indice = new Date().getDate() % DICAS.length;
  document.getElementById("dicaDia").textContent = DICAS[indice];
}

function mostrarArtigosRecentes() {
  const lista = document.getElementById("listaDestaques");
  const ordenados = ARTIGOS.slice().sort(function (a, b) {
    return b.data.localeCompare(a.data);
  });
  let html = "";
  for (let i = 0; i < 3; i++) {
    html += criarCardArtigo(ordenados[i]);
  }
  lista.innerHTML = html;
  prepararFavoritos(lista);
}

function mostrarCategorias() {
  const lista = document.getElementById("listaCategorias");
  CATEGORIAS.forEach(function (categoria) {
    const total = ARTIGOS.filter(function (artigo) {
      return artigo.categoria === categoria.id;
    }).length;
    const link = document.createElement("a");
    link.className = "chip";
    link.href = "artigos.html?categoria=" + categoria.id;
    link.innerHTML = `<span class="ponto-cor" style="background:${categoria.cor}"></span>${categoria.nome}<small>${total}</small>`;
    lista.appendChild(link);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  mostrarSaudacao();
  mostrarResumoDoMes();
  mostrarMetaEmDestaque();
  mostrarDicaDoDia();
  mostrarArtigosRecentes();
  mostrarCategorias();
});

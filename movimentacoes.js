/*
  FINANCE — movimentacoes.js
  Cadastro de receitas e despesas: validação do formulário, gravação e
  exclusão no localStorage (com opção de desfazer), filtros por mês,
  tipo e texto, totais, gráfico de rosca por categoria, gráfico de
  barras dos últimos meses, tabela, dados de exemplo e exportação CSV.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

const CATEGORIAS_MOVIMENTO = {
  receita: ["Salário", "Renda extra", "Rendimentos", "Outros"],
  despesa: ["Moradia", "Alimentação", "Transporte", "Saúde", "Educação", "Lazer", "Contas", "Compras", "Outros"]
};

const CORES_CATEGORIA = {
  "Moradia": "var(--cor-texto)",
  "Alimentação": "#1fd1a5",
  "Transporte": "#2e90fa",
  "Saúde": "#f04438",
  "Educação": "#7a5af8",
  "Lazer": "#f79009",
  "Contas": "#5b6170",
  "Compras": "#ee46bc",
  "Outros": "#a3a8b3"
};

let movimentacoes = lerDados(CHAVES.movimentacoes, []);

function salvarMovimentacoes() {
  salvarDados(CHAVES.movimentacoes, movimentacoes);
}

function preencherCategorias(tipo) {
  const select = document.getElementById("categoria");
  select.innerHTML = "";
  CATEGORIAS_MOVIMENTO[tipo].forEach(function (nome) {
    const opcao = document.createElement("option");
    opcao.value = nome;
    opcao.textContent = nome;
    select.appendChild(opcao);
  });
}

function tipoSelecionado() {
  return document.querySelector("input[name='tipo']:checked").value;
}

function adicionarLancamento(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  formulario.classList.add("was-validated");
  if (!formulario.checkValidity()) {
    mostrarAviso("Confira os campos destacados.", "erro");
    return;
  }

  const lancamento = {
    id: gerarId(),
    tipo: tipoSelecionado(),
    descricao: document.getElementById("descricao").value.trim(),
    valor: Math.round(Number(document.getElementById("valor").value) * 100) / 100,
    categoria: document.getElementById("categoria").value,
    data: document.getElementById("dataLancamento").value
  };

  movimentacoes.push(lancamento);
  salvarMovimentacoes();

  document.getElementById("filtroMes").value = lancamento.data.slice(0, 7);
  formulario.reset();
  formulario.classList.remove("was-validated");
  preencherCategorias(tipoSelecionado());
  document.getElementById("dataLancamento").value = dataDeHoje();
  atualizarTela();
  mostrarAviso((lancamento.tipo === "receita" ? "Receita" : "Despesa") + " adicionada: " + formatarMoeda(lancamento.valor));
}

function excluirLancamento(id) {
  const posicao = movimentacoes.findIndex(function (item) {
    return item.id === id;
  });
  if (posicao === -1) {
    return;
  }
  const removido = movimentacoes.splice(posicao, 1)[0];
  salvarMovimentacoes();
  atualizarTela();
  mostrarAviso("Lançamento excluído.", "info", "Desfazer", function () {
    movimentacoes.push(removido);
    salvarMovimentacoes();
    atualizarTela();
  });
}

function lancamentosFiltrados() {
  const mes = document.getElementById("filtroMes").value;
  const tipo = document.getElementById("filtroTipo").value;
  const busca = document.getElementById("filtroBusca").value.trim().toLowerCase();

  return movimentacoes.filter(function (item) {
    const combinaMes = mes === "" || item.data.slice(0, 7) === mes;
    const combinaTipo = tipo === "todos" || item.tipo === tipo;
    const texto = (item.descricao + " " + item.categoria).toLowerCase();
    const combinaBusca = busca === "" || texto.includes(busca);
    return combinaMes && combinaTipo && combinaBusca;
  }).sort(function (a, b) {
    return b.data.localeCompare(a.data);
  });
}

function atualizarTotais(lista) {
  let receitas = 0;
  let despesas = 0;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].tipo === "receita") {
      receitas += lista[i].valor;
    } else {
      despesas += lista[i].valor;
    }
  }
  const saldo = receitas - despesas;
  let economia = 0;
  if (receitas > 0) {
    economia = Math.round((saldo / receitas) * 100);
  }

  document.getElementById("totalReceitas").textContent = formatarMoeda(receitas);
  document.getElementById("totalDespesas").textContent = formatarMoeda(despesas);
  const campoSaldo = document.getElementById("totalSaldo");
  campoSaldo.textContent = formatarMoeda(saldo);
  campoSaldo.classList.toggle("valor-negativo", saldo < 0);
  document.getElementById("taxaEconomia").textContent = economia + "%";
}

function atualizarRosca(lista) {
  const totais = {};
  let totalGeral = 0;
  lista.forEach(function (item) {
    if (item.tipo === "despesa") {
      totais[item.categoria] = (totais[item.categoria] || 0) + item.valor;
      totalGeral += item.valor;
    }
  });

  const rosca = document.getElementById("graficoRosca");
  const legenda = document.getElementById("legendaRosca");
  document.getElementById("roscaTotal").textContent = formatarMoeda(totalGeral);

  if (totalGeral === 0) {
    rosca.style.background = "";
    legenda.innerHTML = "<li class=\"text-body-secondary\">Sem despesas no período.</li>";
    return;
  }

  const categorias = Object.keys(totais).sort(function (a, b) {
    return totais[b] - totais[a];
  });
  let inicio = 0;
  const fatias = [];
  let html = "";
  categorias.forEach(function (nome) {
    const percentual = (totais[nome] / totalGeral) * 100;
    const cor = CORES_CATEGORIA[nome] || "#a3a8b3";
    fatias.push(cor + " " + inicio + "% " + (inicio + percentual) + "%");
    inicio += percentual;
    html += `<li><span class="ponto-cor" style="background:${cor}"></span><span>${nome}</span><strong>${Math.round(percentual)}%</strong></li>`;
  });
  rosca.style.background = "conic-gradient(" + fatias.join(", ") + ")";
  legenda.innerHTML = html;
}

function atualizarGraficoMeses() {
  const area = document.getElementById("graficoMeses");
  const referencia = document.getElementById("filtroMes").value || dataDeHoje().slice(0, 7);
  const partes = referencia.split("-");
  const meses = [];

  for (let i = 5; i >= 0; i--) {
    const data = new Date(Number(partes[0]), Number(partes[1]) - 1 - i, 1);
    const chave = data.getFullYear() + "-" + String(data.getMonth() + 1).padStart(2, "0");
    meses.push({ chave: chave, nome: NOMES_MESES[data.getMonth()].slice(0, 3), receitas: 0, despesas: 0 });
  }

  movimentacoes.forEach(function (item) {
    const mes = meses.find(function (m) {
      return m.chave === item.data.slice(0, 7);
    });
    if (mes) {
      mes[item.tipo === "receita" ? "receitas" : "despesas"] += item.valor;
    }
  });

  let maior = 0;
  meses.forEach(function (mes) {
    maior = Math.max(maior, mes.receitas, mes.despesas);
  });

  let html = "";
  meses.forEach(function (mes) {
    const alturaReceita = maior > 0 ? (mes.receitas / maior) * 100 : 0;
    const alturaDespesa = maior > 0 ? (mes.despesas / maior) * 100 : 0;
    html += `
      <div class="grafico-coluna" title="${mes.nome}: receitas ${formatarMoeda(mes.receitas)}, despesas ${formatarMoeda(mes.despesas)}">
        <div class="grafico-par">
          <span class="grafico-barra" style="height:${alturaReceita}%; background: var(--cor-receita)"></span>
          <span class="grafico-barra" style="height:${alturaDespesa}%; background: var(--cor-despesa)"></span>
        </div>
        <span class="grafico-legenda">${mes.nome}</span>
      </div>`;
  });
  area.innerHTML = html;
}

function atualizarTabela(lista) {
  const corpo = document.getElementById("corpoTabela");
  document.getElementById("contadorLancamentos").textContent = lista.length + (lista.length === 1 ? " lançamento" : " lançamentos");

  if (lista.length === 0) {
    corpo.innerHTML = `<tr><td colspan="6" class="text-center text-body-secondary py-5">Nenhum lançamento encontrado. Use o formulário para adicionar o primeiro ou carregue o exemplo.</td></tr>`;
    return;
  }

  let html = "";
  lista.forEach(function (item) {
    const ehReceita = item.tipo === "receita";
    html += `
      <tr>
        <td>${formatarData(item.data)}</td>
        <td>${escaparHtml(item.descricao)}${item.exemplo ? ' <span class="etiqueta">exemplo</span>' : ""}</td>
        <td><span class="ponto-cor" style="background:${CORES_CATEGORIA[item.categoria] || "var(--cor-receita)"}"></span> ${item.categoria}</td>
        <td><span class="badge ${ehReceita ? "text-bg-success" : "text-bg-danger"}">${ehReceita ? "Receita" : "Despesa"}</span></td>
        <td class="text-end ${ehReceita ? "valor-positivo" : "valor-negativo"}"><strong>${ehReceita ? "+" : "−"} ${formatarMoeda(item.valor)}</strong></td>
        <td class="text-end"><button type="button" class="btn btn-outline-danger btn-sm" data-excluir="${item.id}" aria-label="Excluir ${escaparHtml(item.descricao)}"><svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg></button></td>
      </tr>`;
  });
  corpo.innerHTML = html;
}

function atualizarBotaoExemplo() {
  const temExemplo = movimentacoes.some(function (item) {
    return item.exemplo;
  });
  document.querySelector("#btnExemplo span").textContent = temExemplo ? "Remover exemplo" : "Carregar exemplo";
}

function atualizarTela() {
  const lista = lancamentosFiltrados();
  atualizarTotais(lista);
  atualizarRosca(lista);
  atualizarGraficoMeses();
  atualizarTabela(lista);
  atualizarBotaoExemplo();
}

function alternarExemplo() {
  const temExemplo = movimentacoes.some(function (item) {
    return item.exemplo;
  });

  if (temExemplo) {
    movimentacoes = movimentacoes.filter(function (item) {
      return !item.exemplo;
    });
    salvarMovimentacoes();
    atualizarTela();
    mostrarAviso("Dados de exemplo removidos.", "info");
    return;
  }

  const modelo = [
    ["receita", "Salário", "Salário", 3800, 5],
    ["despesa", "Aluguel", "Moradia", 1200, 6],
    ["despesa", "Mercado", "Alimentação", 650, 8],
    ["despesa", "Transporte público", "Transporte", 220, 3],
    ["despesa", "Conta de energia", "Contas", 180, 12],
    ["despesa", "Cinema e lanche", "Lazer", 90, 15],
    ["despesa", "Farmácia", "Saúde", 75, 18]
  ];
  const hoje = new Date();

  for (let m = 0; m < 4; m++) {
    const ano = new Date(hoje.getFullYear(), hoje.getMonth() - m, 1).getFullYear();
    const mes = new Date(hoje.getFullYear(), hoje.getMonth() - m, 1).getMonth() + 1;
    modelo.forEach(function (linha) {
      let dia = linha[4];
      if (m === 0 && dia > hoje.getDate()) {
        dia = Math.max(1, hoje.getDate());
      }
      const variacao = linha[0] === "receita" ? 1 : 0.85 + Math.random() * 0.3;
      movimentacoes.push({
        id: gerarId(),
        tipo: linha[0],
        descricao: linha[1],
        categoria: linha[2],
        valor: Math.round(linha[3] * variacao * 100) / 100,
        data: ano + "-" + String(mes).padStart(2, "0") + "-" + String(dia).padStart(2, "0"),
        exemplo: true
      });
    });
  }

  salvarMovimentacoes();
  atualizarTela();
  mostrarAviso("Exemplo carregado com 4 meses de lançamentos fictícios.");
}

function exportarCsv() {
  if (movimentacoes.length === 0) {
    mostrarAviso("Não há lançamentos para exportar.", "erro");
    return;
  }
  const linhas = ["data;tipo;descricao;categoria;valor"];
  movimentacoes.forEach(function (item) {
    linhas.push([item.data, item.tipo, item.descricao.replace(/;/g, ","), item.categoria, String(item.valor).replace(".", ",")].join(";"));
  });
  const arquivo = new Blob(["﻿" + linhas.join("\n")], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(arquivo);
  link.download = "finance-movimentacoes.csv";
  link.click();
  URL.revokeObjectURL(link.href);
  mostrarAviso("Arquivo CSV gerado.");
}

document.addEventListener("DOMContentLoaded", function () {
  preencherCategorias("despesa");
  document.getElementById("dataLancamento").value = dataDeHoje();
  document.getElementById("filtroMes").value = dataDeHoje().slice(0, 7);

  document.querySelectorAll("input[name='tipo']").forEach(function (opcao) {
    opcao.addEventListener("change", function () {
      preencherCategorias(opcao.value);
    });
  });

  document.getElementById("formLancamento").addEventListener("submit", adicionarLancamento);
  document.getElementById("filtroMes").addEventListener("change", atualizarTela);
  document.getElementById("filtroTipo").addEventListener("change", atualizarTela);
  document.getElementById("filtroBusca").addEventListener("input", atualizarTela);
  document.getElementById("btnExemplo").addEventListener("click", alternarExemplo);
  document.getElementById("btnExportar").addEventListener("click", exportarCsv);

  document.getElementById("corpoTabela").addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-excluir]");
    if (botao) {
      excluirLancamento(botao.dataset.excluir);
    }
  });

  atualizarTela();
});

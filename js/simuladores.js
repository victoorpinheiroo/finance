/*
  FINANCE — simuladores.js
  Simuladores de planejamento: orçamento 50/30/20, juros compostos com
  aportes mensais e reserva de emergência. Valida os formulários,
  monta resultados, tabela e gráfico no DOM e transforma resultados
  em metas salvas no localStorage.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

function formularioValido(formulario) {
  formulario.classList.add("was-validated");
  return formulario.checkValidity();
}

function somarMeses(meses) {
  const data = new Date();
  data.setMonth(data.getMonth() + meses);
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return data.getFullYear() + "-" + mes + "-" + dia;
}

function criarMeta(nome, categoria, valorAlvo, valorAtual, prazo) {
  const metas = lerDados(CHAVES.metas, []);
  metas.push({
    id: gerarId(),
    nome: nome,
    categoria: categoria,
    valorAlvo: Math.round(valorAlvo * 100) / 100,
    valorAtual: Math.round(valorAtual * 100) / 100,
    prazo: prazo,
    criadaEm: dataDeHoje()
  });
  salvarDados(CHAVES.metas, metas);
  mostrarAviso("Meta criada! Acompanhe na página Metas.", "", "Abrir", function () {
    window.location.href = "metas.html";
  });
}

function calcularOrcamento(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  if (!formularioValido(formulario)) {
    return;
  }

  const renda = Number(document.getElementById("rendaOrcamento").value);
  const blocos = [
    { nome: "Necessidades", percentual: 50, cor: "var(--cor-texto)", exemplos: "Moradia, mercado, transporte, saúde e contas básicas." },
    { nome: "Desejos", percentual: 30, cor: "var(--cor-info)", exemplos: "Lazer, restaurantes, assinaturas e compras não essenciais." },
    { nome: "Futuro", percentual: 20, cor: "var(--cor-marca)", exemplos: "Reserva de emergência, investimentos e quitação de dívidas." }
  ];

  let barra = "";
  let cartoes = "";
  blocos.forEach(function (bloco) {
    const valor = renda * bloco.percentual / 100;
    barra += `<span style="width:${bloco.percentual}%; background:${bloco.cor}" title="${bloco.nome}"></span>`;
    cartoes += `
      <div class="col-md-4">
        <div class="bloco-orcamento">
          <span class="indicador-rotulo"><span class="ponto-cor" style="background:${bloco.cor}"></span>${bloco.nome} · ${bloco.percentual}%</span>
          <span class="indicador-valor">${formatarMoeda(valor)}</span>
          <p>${bloco.exemplos}</p>
        </div>
      </div>`;
  });

  document.getElementById("resultadoOrcamento").innerHTML = `
    <div class="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
      <div class="indicador">
        <span class="indicador-rotulo">Renda considerada</span>
        <span class="indicador-valor">${formatarMoeda(renda)}</span>
      </div>
      <span class="etiqueta">Por mês</span>
    </div>
    <div class="barra-segmentada mb-4">${barra}</div>
    <div class="row g-3">${cartoes}</div>
    <div class="alert alert-success mt-4 mb-0">
      <svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/></svg>
      <div>Separe os ${formatarMoeda(renda * 0.2)} do futuro assim que receber. Compare com seus gastos reais em <a href="movimentacoes.html">Minhas movimentações</a>.</div>
    </div>`;
}

function calcularJuros(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  if (!formularioValido(formulario)) {
    return;
  }

  const capital = Number(document.getElementById("capitalJuros").value);
  const aporte = Number(document.getElementById("aporteJuros").value);
  const taxaAnual = Number(document.getElementById("taxaJuros").value) / 100;
  const anos = Number(document.getElementById("prazoJuros").value);
  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

  const linhas = [];
  let saldo = capital;
  let investido = capital;

  for (let mes = 1; mes <= anos * 12; mes++) {
    saldo = saldo * (1 + taxaMensal) + aporte;
    investido += aporte;
    if (mes % 12 === 0) {
      linhas.push({ ano: mes / 12, investido: investido, juros: saldo - investido, saldo: saldo });
    }
  }

  const juros = saldo - investido;
  let tabela = "";
  let grafico = "";

  linhas.forEach(function (linha) {
    const alturaInvestido = (linha.investido / saldo) * 100;
    const alturaJuros = (linha.juros / saldo) * 100;
    grafico += `
      <div class="coluna-empilhada" title="Ano ${linha.ano}: ${formatarMoeda(linha.saldo)}">
        <span class="parte-juros" style="height:${alturaJuros}%"></span>
        <span class="parte-investido" style="height:${alturaInvestido}%"></span>
      </div>`;
    tabela += `
      <tr>
        <td>${linha.ano}º ano</td>
        <td>${formatarMoeda(linha.investido)}</td>
        <td class="valor-positivo">${formatarMoeda(linha.juros)}</td>
        <td><strong>${formatarMoeda(linha.saldo)}</strong></td>
      </tr>`;
  });

  let mensagem;
  if (juros > investido) {
    mensagem = "Os juros superaram o valor que você investiu: é o efeito do tempo nos juros compostos.";
  } else {
    mensagem = "Quanto maior o prazo, maior a parte do saldo formada por juros. Experimente aumentar os anos.";
  }

  document.getElementById("resultadoJuros").innerHTML = `
    <div class="row g-3 mb-4">
      <div class="col-sm-4"><div class="indicador"><span class="indicador-rotulo">Total investido</span><span class="indicador-valor">${formatarMoeda(investido)}</span></div></div>
      <div class="col-sm-4"><div class="indicador"><span class="indicador-rotulo">Juros ganhos</span><span class="indicador-valor valor-positivo">${formatarMoeda(juros)}</span></div></div>
      <div class="col-sm-4"><div class="indicador"><span class="indicador-rotulo">Saldo final</span><span class="indicador-valor">${formatarMoeda(saldo)}</span></div></div>
    </div>
    <div class="grafico-empilhado" aria-hidden="true">${grafico}</div>
    <div class="d-flex flex-wrap gap-3 small text-body-secondary mt-2 mb-4">
      <span><span class="ponto-cor" style="background: var(--cor-texto)"></span> Valor investido</span>
      <span><span class="ponto-cor" style="background: var(--cor-marca)"></span> Juros acumulados</span>
    </div>
    <div class="alert alert-success">${mensagem}</div>
    <div class="tabela-moldura mb-3">
      <div class="table-responsive tabela-rolagem">
        <table class="table table-hover">
          <thead><tr><th scope="col">Período</th><th scope="col">Total investido</th><th scope="col">Juros acumulados</th><th scope="col">Saldo</th></tr></thead>
          <tbody>${tabela}</tbody>
        </table>
      </div>
    </div>
    <button type="button" class="btn btn-success" id="btnMetaJuros">Transformar em meta</button>`;

  document.getElementById("btnMetaJuros").addEventListener("click", function () {
    criarMeta("Investimento em " + anos + (anos === 1 ? " ano" : " anos"), "investimento", saldo, capital, somarMeses(anos * 12));
  });
}

function calcularReserva(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  if (!formularioValido(formulario)) {
    return;
  }

  const custo = Number(document.getElementById("custoReserva").value);
  const meses = Number(document.getElementById("tipoRenda").value);
  const guardado = Number(document.getElementById("guardadoReserva").value);
  const mensal = Number(document.getElementById("mensalReserva").value);

  const ideal = custo * meses;
  const falta = Math.max(0, ideal - guardado);
  const percentual = Math.min(100, Math.round((guardado / ideal) * 100));
  const mesesParaCompletar = Math.ceil(falta / mensal);

  let situacao;
  let classeAlerta;
  if (falta === 0) {
    situacao = "Parabéns! Sua reserva já cobre " + meses + " meses de custo essencial.";
    classeAlerta = "alert-success";
  } else if (mesesParaCompletar <= 12) {
    situacao = "Guardando " + formatarMoeda(mensal) + " por mês, você completa a reserva em " + mesesParaCompletar + (mesesParaCompletar === 1 ? " mês." : " meses.");
    classeAlerta = "alert-success";
  } else {
    situacao = "No ritmo atual, serão " + mesesParaCompletar + " meses. Se possível, aumente o valor mensal ou revise gastos para acelerar.";
    classeAlerta = "alert-warning";
  }

  document.getElementById("resultadoReserva").innerHTML = `
    <div class="row g-3 mb-4">
      <div class="col-sm-4"><div class="indicador"><span class="indicador-rotulo">Reserva ideal</span><span class="indicador-valor">${formatarMoeda(ideal)}</span></div></div>
      <div class="col-sm-4"><div class="indicador"><span class="indicador-rotulo">Ainda falta</span><span class="indicador-valor">${formatarMoeda(falta)}</span></div></div>
      <div class="col-sm-4"><div class="indicador"><span class="indicador-rotulo">Tempo estimado</span><span class="indicador-valor">${falta === 0 ? "Completa" : mesesParaCompletar + (mesesParaCompletar === 1 ? " mês" : " meses")}</span></div></div>
    </div>
    <div class="d-flex justify-content-between small mb-2"><span>Progresso da reserva</span><strong>${percentual}%</strong></div>
    <div class="progress mb-4" role="progressbar" aria-label="Progresso da reserva" aria-valuenow="${percentual}" aria-valuemin="0" aria-valuemax="100"><div class="progress-bar" style="width:${percentual}%"></div></div>
    <div class="alert ${classeAlerta}">${situacao}</div>
    <p class="small text-body-secondary">Cálculo: ${formatarMoeda(custo)} × ${meses} meses. Deixe a reserva em aplicações seguras e de resgate rápido.</p>
    ${falta > 0 ? '<button type="button" class="btn btn-success" id="btnMetaReserva">Transformar em meta</button>' : ""}`;

  const botao = document.getElementById("btnMetaReserva");
  if (botao) {
    botao.addEventListener("click", function () {
      criarMeta("Reserva de emergência", "reserva", ideal, guardado, somarMeses(Math.max(1, mesesParaCompletar)));
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formOrcamento").addEventListener("submit", calcularOrcamento);
  document.getElementById("formJuros").addEventListener("submit", calcularJuros);
  document.getElementById("formReserva").addEventListener("submit", calcularReserva);
});

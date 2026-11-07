/*
  FINANCE — metas.js
  Metas financeiras: cadastro com validação, cálculo de progresso,
  situação (em andamento, concluída ou atrasada), valor mensal até o
  prazo, depósitos, exclusão com desfazer, filtros e ordenação.
  Dados salvos no localStorage.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

const NOMES_CATEGORIA_META = {
  reserva: "Reserva de emergência",
  viagem: "Viagem",
  casa: "Casa",
  estudos: "Estudos",
  veiculo: "Veículo",
  investimento: "Investimento",
  outro: "Outro"
};

let metas = lerDados(CHAVES.metas, []);
let statusEscolhido = "todas";

function salvarMetas() {
  salvarDados(CHAVES.metas, metas);
}

function mesesAte(prazo) {
  const hoje = new Date();
  const partes = prazo.split("-");
  const final = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
  let meses = (final.getFullYear() - hoje.getFullYear()) * 12 + (final.getMonth() - hoje.getMonth());
  if (final.getDate() < hoje.getDate()) {
    meses--;
  }
  return meses;
}

function situacaoDaMeta(meta) {
  if (meta.valorAtual >= meta.valorAlvo) {
    return "concluida";
  }
  if (meta.prazo < dataDeHoje()) {
    return "atrasada";
  }
  return "andamento";
}

function criarMetaDoFormulario(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  formulario.classList.add("was-validated");
  if (!formulario.checkValidity()) {
    mostrarAviso("Confira os campos destacados.", "erro");
    return;
  }

  metas.push({
    id: gerarId(),
    nome: document.getElementById("nomeMeta").value.trim(),
    categoria: document.getElementById("categoriaMeta").value,
    valorAlvo: Number(document.getElementById("valorAlvo").value),
    valorAtual: Number(document.getElementById("valorInicial").value),
    prazo: document.getElementById("prazoMeta").value,
    criadaEm: dataDeHoje()
  });
  salvarMetas();

  formulario.reset();
  formulario.classList.remove("was-validated");
  document.getElementById("valorInicial").value = 0;
  mostrarMetas();
  mostrarAviso("Meta criada com sucesso!");
}

function depositar(id, campo) {
  const valor = Number(campo.value);
  if (!campo.checkValidity() || valor <= 0) {
    campo.classList.add("is-invalid");
    mostrarAviso("Informe um valor maior que zero.", "erro");
    return;
  }
  const meta = metas.find(function (item) {
    return item.id === id;
  });
  const estavaConcluida = meta.valorAtual >= meta.valorAlvo;
  meta.valorAtual = Math.round((meta.valorAtual + valor) * 100) / 100;
  salvarMetas();
  mostrarMetas();

  if (!estavaConcluida && meta.valorAtual >= meta.valorAlvo) {
    mostrarAviso("Parabéns! Você concluiu a meta \"" + meta.nome + "\".");
  } else {
    mostrarAviso(formatarMoeda(valor) + " adicionados à meta.");
  }
}

function excluirMeta(id) {
  const posicao = metas.findIndex(function (item) {
    return item.id === id;
  });
  const removida = metas.splice(posicao, 1)[0];
  salvarMetas();
  mostrarMetas();
  mostrarAviso("Meta excluída.", "info", "Desfazer", function () {
    metas.push(removida);
    salvarMetas();
    mostrarMetas();
  });
}

function criarCartaoMeta(meta) {
  const situacao = situacaoDaMeta(meta);
  const nome = escaparHtml(meta.nome);
  const percentual = Math.min(100, Math.round((meta.valorAtual / meta.valorAlvo) * 100));
  const falta = Math.max(0, meta.valorAlvo - meta.valorAtual);
  const meses = mesesAte(meta.prazo);
  let selo;
  let orientacao;

  if (situacao === "concluida") {
    selo = '<span class="badge text-bg-success">Concluída</span>';
    orientacao = "Meta alcançada. Que tal definir a próxima?";
  } else if (situacao === "atrasada") {
    selo = '<span class="badge text-bg-danger">Atrasada</span>';
    orientacao = "O prazo passou. Faltam " + formatarMoeda(falta) + ": ajuste a data criando uma nova meta.";
  } else {
    selo = '<span class="badge text-bg-light border">Em andamento</span>';
    if (meses <= 0) {
      orientacao = "Prazo neste mês: faltam " + formatarMoeda(falta) + ".";
    } else {
      orientacao = "Guarde <strong>" + formatarMoeda(falta / meses) + "</strong> por mês durante " + meses + (meses === 1 ? " mês." : " meses.");
    }
  }

  return `
    <div class="col">
      <article class="card h-100 cartao-meta-item meta-${situacao}">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center gap-2 mb-3">
            <span class="etiqueta">${NOMES_CATEGORIA_META[meta.categoria] || "Outro"}</span>
            ${selo}
          </div>
          <h3 class="card-title h5">${nome}</h3>
          <div class="d-flex justify-content-between align-items-end mb-2">
            <span class="indicador-valor">${formatarMoeda(meta.valorAtual)}</span>
            <span class="small text-body-secondary">de ${formatarMoeda(meta.valorAlvo)}</span>
          </div>
          <div class="progress mb-2" role="progressbar" aria-label="Progresso da meta ${nome}" aria-valuenow="${percentual}" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width:${percentual}%"></div>
          </div>
          <div class="d-flex justify-content-between small text-body-secondary mb-3">
            <span>${percentual}% concluído</span>
            <span>Prazo: ${formatarData(meta.prazo)}</span>
          </div>
          <p class="small mb-3">${orientacao}</p>
          <div class="mt-auto">
            <div class="input-group input-group-sm mb-2">
              <span class="input-group-text">R$</span>
              <input type="number" class="form-control" min="0.01" step="0.01" placeholder="Valor" aria-label="Valor a depositar em ${nome}" data-campo="${meta.id}">
              <button type="button" class="btn btn-success btn-sm" data-depositar="${meta.id}">Depositar</button>
            </div>
            <button type="button" class="btn btn-link btn-sm text-danger p-0" data-excluir="${meta.id}">Excluir meta</button>
          </div>
        </div>
      </article>
    </div>`;
}

function mostrarMetas() {
  const lista = document.getElementById("listaMetas");
  const ordem = document.getElementById("ordemMetas").value;
  let guardado = 0;
  let andamento = 0;
  let concluidas = 0;

  metas.forEach(function (meta) {
    guardado += meta.valorAtual;
    const situacao = situacaoDaMeta(meta);
    if (situacao === "concluida") {
      concluidas++;
    } else {
      andamento++;
    }
  });

  document.getElementById("resumoGuardado").textContent = formatarMoeda(guardado);
  document.getElementById("resumoAndamento").textContent = andamento;
  document.getElementById("resumoConcluidas").textContent = concluidas;

  const visiveis = metas.filter(function (meta) {
    return statusEscolhido === "todas" || situacaoDaMeta(meta) === statusEscolhido;
  });

  visiveis.sort(function (a, b) {
    if (ordem === "progresso") {
      return b.valorAtual / b.valorAlvo - a.valorAtual / a.valorAlvo;
    }
    if (ordem === "nome") {
      return a.nome.localeCompare(b.nome);
    }
    return a.prazo.localeCompare(b.prazo);
  });

  if (visiveis.length === 0) {
    const mensagem = metas.length === 0 ? "Você ainda não tem metas. Crie a primeira no formulário ao lado." : "Nenhuma meta nesta situação.";
    lista.innerHTML = `
      <div class="col-12">
        <div class="vazio">
          <svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>
          <h3>Nada por aqui</h3>
          <p class="mb-0">${mensagem}</p>
        </div>
      </div>`;
    return;
  }

  let html = "";
  for (let i = 0; i < visiveis.length; i++) {
    html += criarCartaoMeta(visiveis[i]);
  }
  lista.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
  const campoPrazo = document.getElementById("prazoMeta");
  campoPrazo.min = dataDeHoje();

  document.getElementById("formMeta").addEventListener("submit", criarMetaDoFormulario);
  document.getElementById("ordemMetas").addEventListener("change", mostrarMetas);

  document.getElementById("filtroStatus").addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-status]");
    if (!botao) {
      return;
    }
    statusEscolhido = botao.dataset.status;
    document.querySelectorAll("#filtroStatus .chip").forEach(function (chip) {
      chip.classList.toggle("ativo", chip === botao);
    });
    mostrarMetas();
  });

  document.getElementById("listaMetas").addEventListener("click", function (evento) {
    const botaoDeposito = evento.target.closest("[data-depositar]");
    const botaoExcluir = evento.target.closest("[data-excluir]");
    if (botaoDeposito) {
      const id = botaoDeposito.dataset.depositar;
      depositar(id, document.querySelector(`[data-campo="${id}"]`));
    } else if (botaoExcluir) {
      excluirMeta(botaoExcluir.dataset.excluir);
    }
  });

  mostrarMetas();
});

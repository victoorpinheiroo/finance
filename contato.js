/*
  FINANCE — contato.js
  Formulário de contato: validação nativa com estilos do Bootstrap,
  contador de caracteres, alertas, registro das mensagens no
  localStorage e exclusão de mensagens registradas.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

let mensagens = lerDados(CHAVES.mensagens, []);

function mostrarAlerta(tipo, texto) {
  const area = document.getElementById("alertaContato");
  area.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      <div>${texto}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    </div>`;
}

function atualizarContador() {
  const campo = document.getElementById("mensagem");
  document.getElementById("contadorCaracteres").textContent = campo.value.length + "/500";
}

function mostrarMensagens() {
  const lista = document.getElementById("listaMensagens");
  document.getElementById("totalMensagensContato").textContent = mensagens.length;

  if (mensagens.length === 0) {
    lista.innerHTML = `<div class="col-12"><div class="vazio"><h3>Nenhuma mensagem registrada</h3><p class="mb-0">As mensagens enviadas pelo formulário aparecem aqui.</p></div></div>`;
    return;
  }

  let html = "";
  for (let i = mensagens.length - 1; i >= 0; i--) {
    const item = mensagens[i];
    html += `
      <div class="col">
        <article class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
              <span class="etiqueta">${escaparHtml(item.assunto)}</span>
              <small class="text-body-secondary">${formatarData(item.data)}</small>
            </div>
            <h3 class="h6 mb-1">${escaparHtml(item.nome)}</h3>
            <p class="small text-body-secondary mb-2">${escaparHtml(item.email)}</p>
            <p class="card-text small">${escaparHtml(item.mensagem)}</p>
            <button type="button" class="btn btn-outline-danger btn-sm align-self-start mt-auto" data-excluir="${item.id}">Excluir</button>
          </div>
        </article>
      </div>`;
  }
  lista.innerHTML = html;
}

function enviarMensagem(evento) {
  evento.preventDefault();
  const formulario = evento.target;
  formulario.classList.add("was-validated");

  if (!formulario.checkValidity()) {
    mostrarAlerta("danger", "<strong>Quase lá!</strong> Corrija os campos destacados em vermelho.");
    formulario.querySelector(":invalid").focus();
    return;
  }

  const nova = {
    id: gerarId(),
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    assunto: document.getElementById("assunto").value,
    mensagem: document.getElementById("mensagem").value.trim(),
    data: dataDeHoje()
  };

  mensagens.push(nova);
  salvarDados(CHAVES.mensagens, mensagens);

  formulario.reset();
  formulario.classList.remove("was-validated");
  atualizarContador();
  mostrarMensagens();
  mostrarAlerta("success", "<strong>Mensagem registrada, " + escaparHtml(nova.nome.split(" ")[0]) + "!</strong> Ela foi salva neste navegador e aparece na lista abaixo.");
  mostrarAviso("Mensagem registrada com sucesso.");
}

document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formContato");
  formulario.addEventListener("submit", enviarMensagem);
  formulario.addEventListener("reset", function () {
    formulario.classList.remove("was-validated");
    setTimeout(atualizarContador, 0);
  });
  document.getElementById("mensagem").addEventListener("input", atualizarContador);

  document.getElementById("listaMensagens").addEventListener("click", function (evento) {
    const botao = evento.target.closest("[data-excluir]");
    if (!botao) {
      return;
    }
    mensagens = mensagens.filter(function (item) {
      return item.id !== botao.dataset.excluir;
    });
    salvarDados(CHAVES.mensagens, mensagens);
    mostrarMensagens();
    mostrarAviso("Mensagem excluída.", "info");
  });

  mostrarMensagens();
});

/*
  FINANCE — menu.js
  Menu das páginas puras (sem Bootstrap): abre e fecha o menu no
  celular e fecha os submenus ao clicar fora deles.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

document.addEventListener("DOMContentLoaded", function () {
  const botaoMenu = document.getElementById("btnMenu");
  const listaMenu = document.getElementById("menuPuro");
  const submenus = document.querySelectorAll(".menu-suspenso");

  botaoMenu.addEventListener("click", function () {
    const aberto = listaMenu.classList.toggle("aberto");
    botaoMenu.setAttribute("aria-expanded", aberto);
  });

  submenus.forEach(function (submenu) {
    submenu.addEventListener("toggle", function () {
      if (submenu.open) {
        submenus.forEach(function (outro) {
          if (outro !== submenu) {
            outro.open = false;
          }
        });
      }
    });
  });

  document.addEventListener("click", function (evento) {
    submenus.forEach(function (submenu) {
      if (!submenu.contains(evento.target)) {
        submenu.open = false;
      }
    });
  });
});

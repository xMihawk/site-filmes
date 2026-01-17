import { roleta, getComboSemana, setComboSemana } from "./core.js";
import { createState } from "./state.js";
import { itens as filmes } from "./filmes.js";
import { itens as comidas } from "./comidas.js";
import { itens as lugares } from "./lugares.js";

/* =========================
   ESTADOS
========================= */
const estadoFilmes = createState("/pages/filmes.html");
const estadoComidas = createState("/pages/comidas.html");
const estadoLugares = createState("/pages/lugares.html");

/* =========================
   ELEMENTOS
========================= */
const comboBox = document.getElementById("combo");
const btnCombo = document.getElementById("btn-combo");
const btnResortear = document.getElementById("btn-resortear");

/* =========================
   UI HELPERS
========================= */
function mostrarCombo() {
  comboBox.classList.remove("hidden");
  comboBox.classList.add("show");
}

function renderCombo(id, item) {
  const el = document.getElementById(id);
  el.innerHTML = item
    ? `<img src="${item.capa}"><strong>${item.nome}</strong>`
    : "";
}

/* =========================
   SORTEIO COMPLETO
========================= */
function sortearTudo() {
  mostrarCombo();

  roleta(filmes, estadoFilmes, (item, final) => {
    renderCombo("combo-filme", item);
    if (final) setComboSemana("filme", item);
  });

  roleta(comidas, estadoComidas, (item, final) => {
    renderCombo("combo-comida", item);
    if (final) setComboSemana("comida", item);
  });

  roleta(lugares, estadoLugares, (item, final) => {
    renderCombo("combo-lugar", item);
    if (final) setComboSemana("lugar", item);
  });
}

/* =========================
   EVENTOS
========================= */
btnCombo?.addEventListener("click", sortearTudo);
btnResortear?.addEventListener("click", sortearTudo);

/* =========================
   CARREGAR COMBO SALVO
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const combo = getComboSemana();

  if (combo.filme || combo.comida || combo.lugar) {
    mostrarCombo();

    if (combo.filme) renderCombo("combo-filme", combo.filme);
    if (combo.comida) renderCombo("combo-comida", combo.comida);
    if (combo.lugar) renderCombo("combo-lugar", combo.lugar);
  }
});

import { initCatalog, roleta, setComboSemana } from "./core.js";
import { createState } from "./state.js";

const itens = [
  {
    nome: "Hambúrguer Artesanal",
    capa: "../images/hamburguer.jpg"
  },
  {
    nome: "Pizza",
    capa: "../images/pizza.jpg"
  }
];

initCatalog(itens, { tipo: "comidas" });

const estado = createState(location.pathname);
const btnComida = document.getElementById("btn-sorteio-comida");
const resultado = document.getElementById("resultado-comida");

if (btnComida) {
  btnComida.addEventListener("click", () => {
    roleta(itens, estado, (item, final) => {
      if (!item) {
        resultado.textContent = "Nenhuma comida disponível 😅";
        return;
      }

      // durante a roleta
      resultado.textContent = `🍔 Sorteando: ${item.nome}`;

      // quando finaliza
      if (final) {
        resultado.textContent = `🍔 Comida sorteada: ${item.nome}`;
        setComboSemana("comida", item);
      }
    });
  });
}
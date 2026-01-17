import { initCatalog, roleta, setComboSemana }  from "./core.js";
import { createState } from "./state.js";

const itens = [
  {
    nome: "Japão",
    capa: "../images/lugares/paises/japao.jpg",
    tipo: "pais",
  },
  {
    nome: "Itália",
    capa: "../images/lugares/paises/italia.jpg",
    tipo: "pais",
  },
  {
    nome: "teste",
    capa: "../images/lugares/paises/italia.jpg",
    tipo: "restaurante",
    instagram: "https://www.instagram.com/restaurantex/"
  }
];


initCatalog(itens, { tipo: "lugares" });

const estado = createState(location.pathname);
const btnLugar = document.getElementById("btn-sorteio-lugar");
const resultado = document.getElementById("resultado-lugar");

if (btnLugar) {
  btnLugar.addEventListener("click", () => {
    roleta(itens, estado, (item, final) => {
      if (!item) {
        resultado.textContent = "Nenhum lugar disponível 😅";
        return;
      }

      // durante a roleta
      resultado.textContent = `🌍 Sorteando: ${item.nome}`;

      // quando finaliza
      if (final) {
        resultado.textContent = `🌍 Lugar sorteado: ${item.nome}`;
        setComboSemana("lugar", item);
      }
    });
  });
}
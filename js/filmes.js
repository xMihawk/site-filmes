import { initCatalog, roleta, setComboSemana  } from "./core.js";
import { createState } from "./state.js";

const itens = [
  {
    nome: "Um Maluco no Golfe 1",
    trailer: "https://www.youtube.com/watch?v=JrxXk2sRkKw",
    capa: "../images/filmes/um-maluco-no-golfe-1.jpg"
  },
  {
    nome: "Um Maluco no Golfe 2",
    trailer: "https://www.youtube.com/watch?v=qCks9ymO0Ro",
    capa: "../images/filmes/um-maluco-no-golfe-2.jpg"
  },
  {
    nome: "Mamonas Assassinas: O Filme",
    trailer: "https://www.youtube.com/watch?v=--l0YXLEZqY",
    capa: "../images/filmes/mamonas-assassinas-o-filme.jpg"
  },
  {
    nome: "Pets 1",
    trailer: "https://www.youtube.com/watch?v=9Ia6FKg_IUU",
    capa: "../images/filmes/pets-1.jpg"
  },
  {
    nome: "Pets 2",
    trailer: "https://www.youtube.com/watch?v=o3Bjx2yZxqw",
    capa: "../images/filmes/pets-2.jpg"
  },
  {
    nome: "Sonic 1",
    trailer: "https://www.youtube.com/watch?v=OsyVeiW3CZ8",
    capa: "../images/filmes/sonic-1.jpg"
  },
  {
    nome: "Sonic 2",
    trailer: "https://www.youtube.com/watch?v=A2SjVRziC7M",
    capa: "../images/filmes/sonic-2.jpg"
  },
  {
    nome: "Sonic 3",
    trailer: "https://www.youtube.com/watch?v=-bcjtApoUyU",
    capa: "../images/filmes/sonic-3.jpg"
  },
  {
    nome: "Anjos da Lei 1",
    trailer: "https://www.youtube.com/watch?v=kTiEuh_jDZo",
    capa: "../images/filmes/anjos-da-lei-1.jpg"
  },
  {
    nome: "Anjos da Lei 2",
    trailer: "https://www.youtube.com/watch?v=DXmMxs1gt50",
    capa: "../images/filmes/anjos-da-lei-2.jpg"
  },
  {
    nome: "O Candidato Honesto 1",
    trailer: "https://www.youtube.com/watch?v=eydEDLQ6ySg",
    capa: "../images/filmes/o-candidato-honesto-1.jpg"
  },
  {
    nome: "O Candidato Honesto 2",
    trailer: "https://www.youtube.com/watch?v=W0R9lgh64Xw",
    capa: "../images/filmes/o-candidato-honesto-2.jpg"
  },
  {
    nome: "Pai do Ano",
    trailer: "https://www.youtube.com/watch?v=xSBdorJ3fds",
    capa: "../images/filmes/pai-do-ano.jpg"
  },
  {
    nome: "Vivo ou Morto: Um Mistério Knives Out",
    trailer: "https://www.youtube.com/watch?v=NcDlXx2k0i8",
    capa: "../images/filmes/vivo-ou-morto-knives-out.jpg"
  },
  {
    nome: "O Halloween do Hubie",
    trailer: "https://www.youtube.com/watch?v=FwUzQ9lP4-w",
    capa: "../images/filmes/o-halloween-do-hubie.jpg"
  },
  {
    nome: "Dupla Jornada",
    trailer: "https://www.youtube.com/watch?v=qBenH4DYJes",
    capa: "../images/filmes/dupla-jornada.jpg"
  },
  {
    nome: "O Date Perfeito",
    trailer: "https://www.youtube.com/watch?v=JqwMMcCoedI",
    capa: "../images/filmes/o-date-perfeito.jpg"
  },
  {
    nome: "Nos Seus Sonhos",
    trailer: "https://www.youtube.com/watch?v=O-whlxWGs3w",
    capa: "../images/filmes/nos-seus-sonhos.jpg"
  },
  {
    nome: "O Gato de Botas",
    trailer: "https://www.youtube.com/watch?v=07nmEzl-rrk",
    capa: "../images/filmes/gato-de-botas.jpg"
  },
  {
    nome: "O Gato de Botas 2",
    trailer: "https://www.youtube.com/watch?v=cubK6qULkfM",
    capa: "../images/filmes/gato-de-botas-2.jpg"
  },
  {
    nome: "A Caminho da Lua",
    trailer: "https://www.youtube.com/watch?v=u2vZvfUEifo",
    capa: "../images/filmes/a-caminho-da-lua.jpg"
  },
  {
    nome: "Lift: Roubo nas Alturas",
    trailer: "https://www.youtube.com/watch?v=xj5eEaRs0rM",
    capa: "../images/filmes/lift-roubo-nas-alturas.jpg"
  },
  {
    nome: "O Fabricante de Lágrimas",
    trailer: "https://www.youtube.com/watch?v=MgPkbj8DMMw",
    capa: "../images/filmes/o-fabricante-de-lagrimas.jpg"
  },
  {
    nome: "Depois do Universo",
    trailer: "https://www.youtube.com/watch?v=8OkqLOe_mZI",
    capa: "../images/filmes/depois-do-universo.jpg"
  },
  {
    nome: "Combinação Perfeita",
    trailer: "https://www.youtube.com/watch?v=6dNMAo3SRec",
    capa: "../images/filmes/combinacao-perfeita.jpg"
  },
  {
    nome: "365 Dias: Hoje",
    trailer: "https://www.youtube.com/watch?v=FCsRrCHsJmE",
    capa: "../images/filmes/365-dias-hoje.jpg"
  },
  {
    nome: "A Princesa e o Sapo",
    trailer: "https://www.youtube.com/watch?v=gqgPzVsJhB8",
    capa: "../images/filmes/a-princesa-e-o-sapo.jpg"
  },
  {
    nome: "Shrek",
    trailer: "https://www.youtube.com/watch?v=Cvf19P42sNo",
    capa: "../images/filmes/shrek.jpg"
  },
  {
    nome: "Shrek 2",
    trailer: "https://www.youtube.com/watch?v=zLlQe2tCHWs",
    capa: "../images/filmes/shrek2.jpg"
  },
  {
    nome: "Shrek 3",
    trailer: "https://www.youtube.com/watch?v=5KhMx85eaOM",
    capa: "../images/filmes/shrek3.jpg"
  },
  {
    nome: "Shrek Para Sempre",
    trailer: "https://www.youtube.com/watch?v=j08ZmRxtcXM",
    capa: "../images/filmes/shrekparasempre.jpg"
  },

  {
    nome: "La La Land",
    trailer: "https://www.youtube.com/watch?v=UD-Cb2yeAPA",
    capa: "../images/filmes/la-la-land.jpg"
  },
  {
    nome: "Comer, Rezar, Amar",
    trailer: "https://www.youtube.com/watch?v=wqZZFDFYnaI",
    capa: "../images/filmes/comer-rezar-amar.jpg"
  },
  {
    nome: "Avatar",
    trailer: "https://www.youtube.com/watch?v=xRCIxsy-QAw",
    capa: "../images/filmes/avatar.jpg"
  },
  {
    nome: "Avatar 2",
    trailer: "https://www.youtube.com/watch?v=x5pZI-DmtrE",
    capa: "../images/filmes/avatar2.jpg"
  },
  {
    nome: "Encantada",
    trailer: "https://www.youtube.com/watch?v=X6wKOqCLbxs",
    capa: "../images/filmes/encantada.jpg"
  },
  {
    nome: "Desencantada",
    trailer: "https://www.youtube.com/watch?v=aWVS9OZ3Q8o",
    capa: "../images/filmes/desencantada.jpg"
  },
  {
    nome: "Parasita",
    trailer: "https://www.youtube.com/watch?v=xFCrQy5IXI0",
    capa: "../images/filmes/parasita.jpg"
  },
  {
    nome: "Brilho Eterno de Uma Mente Sem Lembranças",
    trailer: "https://www.youtube.com/watch?v=Cenhap5aaDw",
    capa: "../images/filmes/brilho-eterno.jpg"
  },
  {
    nome: "Click",
    trailer: "https://www.youtube.com/watch?v=zZNC5emNyEQ",
    capa: "../images/filmes/click.jpg"
  },
  {
    nome: "The Take Down",
    trailer: "https://www.youtube.com/watch?v=1pbj-y7XQtg",
    capa: "../images/filmes/the-take-down.jpg"
  },
  {
    nome: "A Era do Gelo",
    trailer: "https://www.youtube.com/watch?v=LY1xh_9zNfg",
    capa: "../images/filmes/a-era-do-gelo.jpg"
  },
  {
    nome: "A Era do Gelo 2",
    trailer: "https://www.youtube.com/watch?v=GpgVRvVa4H8",
    capa: "../images/filmes/a-era-do-gelo-2.jpg"
  },
  {
    nome: "A Era do Gelo 3",
    trailer: "https://www.youtube.com/watch?v=nqPy67O-rIA",
    capa: "../images/filmes/a-era-do-gelo-3.jpg"
  },
  {
    nome: "A Era do Gelo 4",
    trailer: "https://www.youtube.com/watch?v=qjAq7tBK4I8",
    capa: "../images/filmes/a-era-do-gelo-4.jpg"
  },
  {
    nome: "A Era do Gelo: O Big Bang",
    trailer: "https://www.youtube.com/watch?v=GNyujrPGvVc",
    capa: "../images/filmes/a-era-do-gelo-bigbang.jpg"
  },
  {
    nome: "A Era do Gelo: As Aventuras de Buck",
    trailer: "https://www.youtube.com/watch?v=t8bBDAemrWI",
    capa: "../images/filmes/a-era-do-gelo-aventurasbuck.jpg"
  },
  {
    nome: "Raya e o Último Dragão",
    trailer: "https://www.youtube.com/watch?v=uF8w-6x61fc",
    capa: "../images/filmes/raya.jpg"
  },
  {
    nome: "Luca",
    trailer: "https://www.youtube.com/watch?v=E7_4ZUpyoWM",
    capa: "../images/filmes/luca.jpg"
  },
  {
    nome: "Hotel Bom Pra Cachorro",
    trailer: "https://www.youtube.com/watch?v=mn1ZgALaCko",
    capa: "../images/filmes/um-hotel-bom-pra-cachorro.jpg"
  },
  {
    nome: "Super 8",
    trailer: "https://www.youtube.com/watch?v=c3dIILker3s",
    capa: "../images/filmes/super-8.jpg"
  },
  {
    nome: "As Aventuras de Spider Wick",
    trailer: "https://www.youtube.com/watch?v=43GMyyXE3uo",
    capa: "../images/filmes/as-aventuras-de-spider-wick.jpg"
  },
  {
    nome: "Dr DoLittle",
    trailer: "https://www.youtube.com/watch?v=LWbtxG-jXMY",
    capa: "../images/filmes/dr-dolittle.jpg"
  },
  {
    nome: "O Jardim Secreto",
    trailer: "https://www.youtube.com/watch?v=iuAIe7u42jA",
    capa: "../images/filmes/o-jardim-secreto.jpg"
  },
  {
    nome: "Uma Noite no Museu",
    trailer: "https://www.youtube.com/watch?v=Ltba1_-tRT4",
    capa: "../images/filmes/uma-noite-no-museu.jpg"
  },
  {
    nome: "Uma Noite no Museu: A Batalha do Smithsonian",
    trailer: "https://www.youtube.com/watch?v=yEzfj09mmlw",
    capa: "../images/filmes/uma-noite-no-museu2.jpg"
  },
  {
    nome: "Uma Noite no Museu: O Segredo da Tumba",
    trailer: "https://www.youtube.com/watch?v=jQ0qgS8NtOQr",
    capa: "../images/filmes/uma-noite-no-museu3.jpg"
  },
  {
    nome: "Uma Noite no Museu: O Retorno de Kahmunrah",
    trailer: "https://www.youtube.com/watch?v=HeqT4iRMHXE",
    capa: "../images/filmes/uma-noite-no-museu4.jpg"
  },
  {
    nome: "Goosebumps",
    trailer: "https://www.youtube.com/watch?v=_c2iQrIjozE",
    capa: "../images/filmes/goosebumps.jpg"
  }
];
initCatalog(itens, { tipo: "filmes" });

const estado = createState(location.pathname);
const btnFilme = document.getElementById("btn-sorteio-filme");
const resultado = document.getElementById("resultado-filme");

if (btnFilme) {
  btnFilme.addEventListener("click", () => {
    roleta(itens, estado, (item, final) => {
      if (!item) {
        resultado.textContent = "Nenhum filme disponível 😅";
        return;
      }

      // durante a roleta
      resultado.textContent = `🎬 Sorteando: ${item.nome}`;

      // quando finaliza
      if (final) {
        resultado.textContent = `🎬 Filme sorteado: ${item.nome}`;
        setComboSemana("filme", item);
      }
    });
  });
}


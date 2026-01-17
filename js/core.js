// core.js
import { createState } from "./state.js";

export function initCatalog(itens, config = {}) {
  const TAGS_LUGARES = [
    "💸 Barato",
    "💰 Médio",
    "💎 Caro",
    "🍽️ Restaurante",
    "☕ Cafeteria",
    "🌳 Parque",
    "🌆 Cidade",
    "🌍 País",
    "🏖️ Praia",
    "🏞️ Ponto turístico",
    "🏨 Hotel",
    "🎡 Passeio",
    "🛍️ Shopping"
  ];

  const tipo = config.tipo || "filmes";
  let ordemAtual = null;
  let tagsSelecionadas = [];
  const estado = createState(location.pathname);

  const grid = document.getElementById("grid");
  const filtro = document.getElementById("filtro");
  const busca = document.getElementById("busca");
  const ordem = document.getElementById("ordem");
  const barra = document.getElementById("barra");
  const progressoTxt = document.getElementById("progressoTxt");

  const modal = document.getElementById("modal");
  const mTitulo = document.getElementById("mTitulo");
  const mStatus = document.getElementById("mStatus");
  const mSinopse = document.getElementById("mSinopse");
  const mTrailer = document.getElementById("mTrailer");

  document.getElementById("btnResetar").addEventListener("click", resetar);

  /* =========================
     RENDER INICIAL
  ========================= */

  renderInicial(itens, estado);
  atualizarProgresso();

  /* =========================
     ORDENAÇÃO (DOM)
  ========================= */

  function ordenarCards(tipo) {
    const cards = Array.from(grid.children);
    const notas = estado.getNotas();
    const concluidos = estado.getConcluidos();

    cards.sort((a, b) => {
      const nomeA = a.dataset.nome;
      const nomeB = b.dataset.nome;

      if (tipo === "nome") {
        return nomeA.localeCompare(nomeB);
      }

      if (tipo === "nota") {
        return (notas[nomeB] || 0) - (notas[nomeA] || 0);
      }

      if (tipo === "status") {
        return concluidos.includes(nomeB) - concluidos.includes(nomeA);
      }

      return 0;
    });

    cards.forEach((card) => grid.appendChild(card));
    aplicarFiltros();
  }

  ordem.addEventListener("change", () => {
    ordemAtual = ordem.value;
    ordenarCards(ordemAtual);
  });

  /* =========================
     CRIAÇÃO DE CARD
  ========================= */

  function criarCard(item, state) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.nome = item.nome;

    const userData = state.getItem(item.nome);

    /* =========================
     TOPO DO CARD (lugares/comidas)
  ========================= */
    let top = "";

    if (tipo === "lugares" || tipo === "comidas") {
      top = `
      <div class="card-top">
        <div class="tags"></div>
        <span class="fav" title="Favorito">❤️</span>
      </div>
    `;
    }

    /* =========================
     BADGE "Não gostamos"
  ========================= */
    let badgeNao = "";
    if (tipo === "lugares" && userData.naoGostamos) {
      badgeNao = `<div class="badge status-negativo">🚫 Não gostamos</div>`;
    }

    /* =========================
     HTML BASE
  ========================= */
    card.innerHTML = `
    ${top}
    ${badgeNao}

    <div class="card-cover">
      <img src="${item.capa}" alt="${item.nome}">
    </div>

    <div class="card-content">
      <h3>${item.nome}</h3>
      <div class="stars"></div>

      ${
        tipo === "lugares" && item.instagram
          ? `<a class="instagram" href="${item.instagram}" target="_blank">📸</a>`
          : ""
      }

      ${tipo === "lugares" ? `<button class="nao-gostamos-btn">🚫 Não gostamos</button>` : ""}
    </div>
  `;

    /* =========================
     FAVORITO ❤️
  ========================= */
    if (tipo === "lugares" || tipo === "comidas") {
      const fav = card.querySelector(".fav");

      if (userData.favorito) {
        fav.classList.add("active");
        card.classList.add("favorito");
      }

      fav.addEventListener("click", (e) => {
        e.stopPropagation();
        userData.favorito = !userData.favorito;
        card.classList.toggle("favorito");
        fav.classList.toggle("active");
      });
    }

    /* =========================
     NÃO GOSTAMOS 🚫
  ========================= */
    if (tipo === "lugares") {
      const btnNao = card.querySelector(".nao-gostamos-btn");

      btnNao.addEventListener("click", (e) => {
        e.stopPropagation();

        userData.naoGostamos = !userData.naoGostamos;
        card.classList.toggle("nao-gostamos");

        // força redesenho do badge
        card.querySelector(".status-negativo")?.remove();
        if (userData.naoGostamos) {
          const badge = document.createElement("div");
          badge.className = "badge status-negativo";
          badge.textContent = "🚫 Não gostamos";
          card.appendChild(badge);
        }

        aplicarFiltros();
      });
    }

    /* =========================
     TAGS (somente escolhidas)
  ========================= */
    if (tipo === "lugares" || tipo === "comidas") {
      const tagsDiv = card.querySelector(".tags");

      userData.tags.forEach((tag) => {
        const el = document.createElement("span");
        el.className = "tag active";
        el.textContent = tag;

        el.addEventListener("click", (e) => {
          e.stopPropagation();

          if (tagsSelecionadas.includes(tag)) {
            tagsSelecionadas = tagsSelecionadas.filter((t) => t !== tag);
            el.classList.remove("active");
          } else {
            tagsSelecionadas.push(tag);
            el.classList.add("active");
          }

          aplicarFiltros();
        });

        tagsDiv.appendChild(el);
      });
    }

    return card;
  }

  /* =========================
     RENDER INICIAL (UMA VEZ)
  ========================= */

  function renderInicial(lista, state) {
    grid.innerHTML = "";

    lista.forEach((item) => {
      // 👇 GARANTE O ITEM NO STATE
      if (state.getItem) {
        state.getItem(item.nome);
      }

      const card = criarCard(item, state);

      // Clique no card → toggle concluído
      card.addEventListener("click", () => {
        toggleConcluido(item.nome);
        aplicarFiltros();
      });

      // Estrelas
      const starsDiv = card.querySelector(".stars");
      const notas = state.getNotas();

      [1, 2, 3, 4, 5].forEach((n) => {
        const star = document.createElement("span");
        star.textContent = "★";

        if ((notas[item.nome] || 0) >= n) {
          star.classList.add("active");
        }

        star.addEventListener("click", (e) => {
          e.stopPropagation();
          state.avaliar(item.nome, n);
          atualizarEstrelas(card, item.nome);
          if (ordemAtual) ordenarCards(ordemAtual);
        });

        starsDiv.appendChild(star);
      });

      // Botão detalhes
      const btn = card.querySelector(".detalhes");
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          detalhes(item.nome);
        });
      }

      grid.appendChild(card);
    });
  }

  /* =========================
     TOGGLE CONCLUÍDO (PARCIAL)
  ========================= */

  function toggleConcluido(nome) {
    estado.toggle(nome);

    const card = document.querySelector(`.card[data-nome="${nome}"]`);
    if (!card) return;

    const concluido = estado.getConcluidos().includes(nome);

    card.classList.toggle("concluido", concluido);

    if (concluido) {
      adicionarBadge(card);
    } else {
      removerBadge(card);
    }

    animarAtualizacao(card);
    atualizarProgresso();
    if (ordemAtual) ordenarCards(ordemAtual);
  }

  /* =========================
     BADGE
  ========================= */

  function adicionarBadge(card) {
    if (card.querySelector(".badge")) return;

    const badge = document.createElement("div");
    badge.className = "badge";
    badge.textContent = "CONCLUÍDO";

    card.appendChild(badge);
  }

  function removerBadge(card) {
    const badge = card.querySelector(".badge");
    if (badge) badge.remove();
  }

  /* =========================
     ESTRELAS PARCIAIS
  ========================= */

  function atualizarEstrelas(card, nome) {
    const nota = estado.getNotas()[nome] || 0;
    const stars = card.querySelectorAll(".stars span");

    stars.forEach((star, i) => {
      star.classList.toggle("active", i < nota);

      // 👇 LIMPA estado especial da 5ª estrela
      if (i === 4) {
        star.classList.toggle("favorita", nota === 5);
      }
    });

    card.classList.toggle("favorito", nota === 5);

    animarAtualizacao(card);
  }

  /* =========================
     ANIMAÇÃO LOCAL
  ========================= */

  function animarAtualizacao(card) {
    card.classList.add("card-update");
    setTimeout(() => card.classList.remove("card-update"), 400);
  }

  /* =========================
     MODAL
  ========================= */

  function detalhes(nome) {
    const item = itens.find((f) => f.nome === nome);
    if (!item) return;

    modal.style.display = "flex";
    mTitulo.innerText = item.nome;
    mStatus.innerText = estado.getConcluidos().includes(nome) ? "Status: Concluído" : "Status: Pendente";
    mSinopse.innerText = item.sinopse || "";

    if (item.trailer) {
      mTrailer.src = `https://www.youtube.com/embed/${item.trailer}?rel=0&autoplay=1`;
    }
  }

  function fecharModal() {
    modal.style.display = "none";
    mTrailer.src = "";
  }

  window.fecharModal = fecharModal;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
  });

  /* =========================
     PROGRESSO
  ========================= */

  function atualizarProgresso() {
    const total = itens.length;
    const feitos = estado.getConcluidos().length;
    const perc = total ? Math.round((feitos / total) * 100) : 0;

    barra.style.width = perc + "%";
    progressoTxt.innerText = `${feitos} de ${total} concluídos (${perc}%)`;
  }

  /* =========================
     RESET
  ========================= */

  function resetar() {
    if (confirm("Resetar tudo?")) {
      estado.reset();
      renderInicial(itens, estado);
      atualizarProgresso();
      if (ordemAtual) ordenarCards(ordemAtual);
      aplicarFiltros();
    }
  }

  function aplicarFiltros() {
    const textoBusca = busca.value.toLowerCase();
    const filtroStatus = filtro.value;

    const cards = Array.from(grid.children);

    cards.forEach((card) => {
      let visivel = true;
      const nome = card.dataset.nome.toLowerCase();

      // 🔎 busca
      if (textoBusca && !nome.includes(textoBusca)) {
        visivel = false;
      }

      // ✅ concluído / pendente (DOM, não state)
      const ehConcluido = card.classList.contains("concluido");

      if (filtroStatus === "concluidos" && !ehConcluido) {
        visivel = false;
      }

      if (filtroStatus === "pendentes" && ehConcluido) {
        visivel = false;
      }

      // 🏷️ tags (somente lugares/comidas)
      if ((tipo === "lugares" || tipo === "comidas") && tagsSelecionadas.length) {
        const userTags = estado.getItem(card.dataset.nome).tags;

        if (!tagsSelecionadas.every((t) => userTags.includes(t))) {
          visivel = false;
        }
      }

      card.style.display = visivel ? "" : "none";
    });

    atualizarProgresso();
  }

  busca.addEventListener("input", aplicarFiltros);
  filtro.addEventListener("change", aplicarFiltros);
}

/* =========================
   SORTEADOR
========================= */
export function sortearItem(itens, estado) {
  const disponiveis = itens.filter(item => {
    const dados = estado.getItem(item.nome);
    return !dados.concluido;
  });

  if (disponiveis.length === 0) return null;

  return disponiveis[Math.floor(Math.random() * disponiveis.length)];
}
/* =========================
   ROLETA
========================= */
const audioRoleta = new Audio("./sounds/roleta.mp3");
audioRoleta.volume = 0.25;

export function playRoleta() {
  audioRoleta.currentTime = 0;
  audioRoleta.play();
}

export function roleta(itens, estado, callback, duracao = 1600) {
  const disponiveis = itens.filter(i => !estado.getItem(i.nome).concluido);

  if (!disponiveis.length) {
    callback(null);
    return;
  }

  playRoleta();

  let index = 0;
  let intervalo = 80;
  let tempo = 0;

  const timer = setInterval(() => {
    callback(disponiveis[index % disponiveis.length]);
    index++;
    tempo += intervalo;

    if (tempo >= duracao) {
      clearInterval(timer);
      const final = disponiveis[Math.floor(Math.random() * disponiveis.length)];
      callback(final, true);
    }
  }, intervalo);
}

const COMBO_KEY = "combo_semana";

export function getComboSemana() {
  return JSON.parse(localStorage.getItem(COMBO_KEY)) || {
    filme: null,
    comida: null,
    lugar: null
  };
}

export function setComboSemana(tipo, item) {
  const combo = getComboSemana();
  combo[tipo] = item ? { nome: item.nome, capa: item.capa } : null;
  localStorage.setItem(COMBO_KEY, JSON.stringify(combo));
}





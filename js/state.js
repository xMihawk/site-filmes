export function createState(pagina) {
  const key = `state_${pagina}`;
  let data = JSON.parse(localStorage.getItem(key)) || {};

  function salvar() {
    localStorage.setItem(key, JSON.stringify(data));
  }

    function garantirItem(nome) {
      if (!data[nome]) {
        data[nome] = {
          concluido: false,
          notas: {},
          observacao: "",

          // 👇 campos extras (lugares/comidas)
          favorito: false,
          tags: [],
          naoGostamos: false
        };
        salvar();
      }
      return data[nome];
    }

  return {
    /* ========= LEITURA ========= */

    getItem(nome) {
      return garantirItem(nome);
    },

    getAll() {
      return data;
    },

    getConcluidos() {
      return Object.keys(data).filter(n => data[n].concluido);
    },

    getNotas() {
      const notas = {};
      Object.keys(data).forEach(n => {
        notas[n] = data[n].notas.experiencia || 0;
      });
      return notas;
    },

    /* ========= ESCRITA ========= */

    toggle(nome) {
      const item = garantirItem(nome);
      item.concluido = !item.concluido;
      salvar();
    },

    avaliar(nome, valor, tipo = "experiencia") {
      const item = garantirItem(nome);

      // 👇 clicar na mesma estrela zera
      if (item.notas[tipo] === valor) {
        delete item.notas[tipo];
      } else {
        item.notas[tipo] = valor;
      }

      salvar();
    },

    toggleFavorito(nome) {
      const item = garantirItem(nome);
      item.favorito = !item.favorito;
      salvar();
    },

    toggleTag(nome, tag) {
      const item = garantirItem(nome);
      item.tags.includes(tag)
        ? item.tags = item.tags.filter(t => t !== tag)
        : item.tags.push(tag);
      salvar();
    },

    setObservacao(nome, texto) {
      const item = garantirItem(nome);
      item.observacao = texto;
      salvar();
    },

    reset() {
      data = {};
      salvar();
    }
  };
}



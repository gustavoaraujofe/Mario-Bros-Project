function main() {
  canvas.height = 500;
  canvas.width = 900;
  largura = canvas.width;
  altura = canvas.height;

  context = canvas.getContext("2d");
  rodar();
}

function teclaCima(event) {
  if (event.key === "ArrowUp") {
    bonecoMario.pula();
  }
}

function teclaBaixoPress(event) {
  if (event.key === "ArrowDown") {
    bonecoMario.abaixar(true);
  }
}

function teclaBaixoSolta(event) {
  if (event.key === "ArrowDown") {
    bonecoMario.abaixar(false);
    trocaMarioParado();
  }
}

function teclaDireita(event) {
  if (event.key === "ArrowRight") {
    bonecoMario.andarDireita();
  }
}

function teclaDireitaSolta(event) {
  if (event.key === "ArrowRight") {
    trocaMarioParado();
  }
}

function teclaEsquerda(event) {
  if (event.key === "ArrowLeft") {
    bonecoMario.andarEsquerda();
  }
}

function teclaEsquerdaSolta(event) {
  if (event.key === "ArrowLeft") {
    trocaMarioParadoInvertido();
  }
}

function enter(event) {
  if (event.key === "Enter") {
    if (estadoAtual === 0) {
      iniciarJogo();
      containerInstrucoes.classList.add("ocultar");
      musicaFundo();
    }
  }
}

function rodar() {
  atualizar();
  desenhar();

  window.requestAnimationFrame(rodar);
}

function atualizar() {
  taxa++;
  if (estadoAtual === 1 || estadoAtual === 2) {
    bonecoMario.atualiza();
  }
  if (estadoAtual === 1) {
    movimentoInimigo();
  }
  if (estadoAtual === 3) {
  }
}

function desenhar() {
  background.atualiza();
  if (estadoAtual === 1 || estadoAtual === 2) {
    bonecoMario.desenha();
  }
  if (estadoAtual === 1) {
    desenharInimigo("desenha");
  }
  if (estadoAtual === 3) {
  }
}

function concluir() {
  estadoAtual = 3;
  if (qtdMoedinha >= 2) {
    blocoVencedor.classList.remove("ocultar");
    audioVencedor();
  } else {
    blocoSemMoedas.classList.remove("ocultar");
    audioPerdedor();
  }
}

function morte() {
  movimentoMorteMario();
  blocoFim.classList.remove("ocultar");
  audioPerdedor();
}

function reset() {
  location.reload();
}

function desenharInimigo() {
  inimigo1.dados.desenha();
  inimigo2.dados.desenha();
  inimigo3.dados.desenha();
  inimigo4.dados.desenha();
  inimigo5.dados.desenha();
  inimigo6.dados.desenha();
  inimigo7.dados.desenha();
  inimigo8.dados.desenha();
  inimigo9.dados.desenha();
  inimigo10.dados.desenha();
  inimigo11.dados.desenha();
  inimigo12.dados.desenha();
  inimigo13.dados.desenha();
  inimigo14.dados.desenha();
  inimigo15.dados.desenha();
  moedinhaOuro1.dados.desenha();
  moedinhaOuro2.dados.desenha();
  moedinhaOuro3.dados.desenha();
  bandeiraFim.desenha();
  contadorMoedinhas.desenha();
}

function movimentoInimigo() {
  inimigo1.dados.movimento();
  inimigo2.dados.movimento();
  inimigo3.dados.movimento();
  inimigo4.dados.movimento();
  inimigo5.dados.movimento();
  inimigo6.dados.movimento();
  inimigo7.dados.movimento();
  inimigo8.dados.movimento();
  inimigo9.dados.movimento();
  inimigo10.dados.movimento();
  inimigo11.dados.movimento();
  inimigo12.dados.movimento();
  inimigo13.dados.movimento();
  inimigo14.dados.movimento();
  inimigo15.dados.movimento();
  moedinhaOuro1.dados.movimento();
  moedinhaOuro2.dados.movimento();
  moedinhaOuro3.dados.movimento();
  bandeiraFim.movimento();
}

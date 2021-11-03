function main() {
  canvas.height = 500;
  canvas.width = 700;
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

function vencedor() {
  estadoAtual = 3;
  blocoVencedor.classList.remove("ocultar");
  audioVencedor();
}

function morte() {
  bonecoMario.pula();
  movimentoMorteMario();
  blocoFim.classList.remove("ocultar");
  audioPerdedor();
}

function reset() {
  location.reload();
}

function desenharInimigo() {
  inimigo1.desenha();
  inimigo2.desenha();
  inimigo3.desenha();
  inimigo4.desenha();
  inimigo5.desenha();
  inimigo6.desenha();
  inimigo7.desenha();
  inimigo8.desenha();
  inimigo9.desenha();
  inimigo10.desenha();
  inimigo11.desenha();
  inimigo12.desenha();
  inimigo13.desenha();
  inimigo14.desenha();
  inimigo15.desenha();
  bandeiraFim.desenha();
}

function movimentoInimigo() {
  inimigo1.movimento();
  inimigo2.movimento();
  inimigo3.movimento();
  inimigo4.movimento();
  inimigo5.movimento();
  inimigo6.movimento();
  inimigo7.movimento();
  inimigo8.movimento();
  inimigo9.movimento();
  inimigo10.movimento();
  inimigo11.movimento();
  inimigo12.movimento();
  inimigo13.movimento();
  inimigo14.movimento();
  inimigo15.movimento();
  bandeiraFim.movimento();
}

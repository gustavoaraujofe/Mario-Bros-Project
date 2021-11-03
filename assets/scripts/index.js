const imgBackground = document.getElementById("background");
const blocoFim = document.getElementById("bloco-fim");
const containerInstrucoes = document.getElementById("container-intrucoes");
const blocoVencedor = document.getElementById("bloco-vencedor");
const botaoResetVencedor = document.getElementById("botaoReset-winner");
const botaoReset2 = document.getElementById("botaoReset2");
const blocoSemMoedas = document.getElementById("bloco-sem-moedas");
const audio = document.getElementById("audio");
const somVenceu = document.getElementById("som-venceu");
const somPerdeu = document.getElementById("som-perdeu");
const somMoedinha = document.getElementById("som-moedinha");
const puloMario = document.getElementById("pulo-mario");

//IMAGENS DO MARIO
const marioParado = new Image();
marioParado.src = "./assets/img/mario/marioParado2.png";

const marioCorrendo = new Image();
marioCorrendo.src = "./assets/img/mario/marioRun2.png";

const marioAbaixado = new Image();
marioAbaixado.src = "./assets/img/mario/marioAbaixado2.png";

const marioParadoInvertido = new Image();
marioParadoInvertido.src = "./assets/img/mario/mario-parado-invertido.png";

const marioCorrendoInvertido = new Image();
marioCorrendoInvertido.src = "./assets/img/mario/marioRunInvertido.png";

const marioAbaixadoInvertido = new Image();
marioAbaixadoInvertido.src = "./assets/img/mario/marioAbaixadoInvertido.png";

//OUTRAS IMAGENS
const bandeiraChegada = new Image();
bandeiraChegada.src = "./assets/img/bandeira-chegada2.png";

const moedinha = new Image();
moedinha.src = "./assets/img/moedinha.png";

//IMAGENS INIMIGOS

const balaCanhao = new Image();
balaCanhao.src = "./assets/img/inimigos/bala-canhao.png";

const bichinhoMarrom = new Image();
bichinhoMarrom.src = "./assets/img/inimigos/bichinho-marrom.png";

const blocoMarrom = new Image();
blocoMarrom.src = "./assets/img/inimigos/bloco-marrom.png";

const bombinha = new Image();
bombinha.src = "./assets/img/inimigos/bombinha.png";

const cascoVermelho = new Image();
cascoVermelho.src = "./assets/img/inimigos/casco-vermelho.png";

const chefao = new Image();
chefao.src = "./assets/img/inimigos/chefao.png";

const fantasma = new Image();
fantasma.src = "./assets/img/inimigos/fantasminha.png";

const planta = new Image();
planta.src = "./assets/img/inimigos/planta.png";

const tartaruga = new Image();
tartaruga.src = "./assets/img/inimigos/tartaruga.png";

const tartarugaVoadora = new Image();
tartarugaVoadora.src = "./assets/img/inimigos/tartaruga-voadora.png";

let posicaoMario = 0;

let bandeiraFim = {
  y: 163,
  altura: 50,
  largura: 50,
  gravidade: 1,
  velocidade: 0,
  forcaDoPulo: 16,

  atualiza: function () {
    this.velocidade += this.gravidade;
    this.y += this.velocidade;

    if (this.y > chao.y - this.altura) {
      this.y = chao.y - this.altura;
    }
  },

  desenha: function () {
    context.drawImage(
      bandeiraChegada,
      this.x,
      this.y,
      bandeiraChegada.width,
      bandeiraChegada.height
    );
  },

  movimento: function () {
    if (this.x > -50) {
      this.x -= velocidadeElementos;
    }

    if (
      bonecoMario.x < this.x + 50 &&
      bonecoMario.x + 50 >= this.x &&
      bonecoMario.y + 50 >= this.y
    ) {
      concluir();
    }
  },
};

//Inimigos e Moedinhas
const inimigos = [
  //Tartaruga
  {
    y: 360,

    desenha: function () {
      context.drawImage(tartaruga, this.x, this.y);
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  //Casco
  {
    y: 405,

    desenha: function () {
      context.drawImage(
        cascoVermelho,
        this.x,
        this.y,
        cascoVermelho.width - 40,
        cascoVermelho.height - 40
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  //Bala de Canhão
  {
    y: 350,

    desenha: function () {
      context.drawImage(balaCanhao, this.x, this.y);
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x >= this.x - 50 &&
        bonecoMario.x <= this.x &&
        bonecoMario.y <= this.y + 48
      ) {
        morte();
      }
    },
  },
  //Tartaruga
  {
    y: 360,

    desenha: function () {
      context.drawImage(tartaruga, this.x, this.y);
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  //Tartaruga
  {
    y: 360,

    desenha: function () {
      context.drawImage(tartaruga, this.x, this.y);
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  //Fantasma
  {
    y: 350,

    desenha: function () {
      context.drawImage(
        fantasma,
        this.x,
        this.y,
        fantasma.width - 20,
        fantasma.height - 20
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x >= this.x - 50 &&
        bonecoMario.x <= this.x &&
        bonecoMario.y <= this.y + 48
      ) {
        morte();
      }
    },
  },
  //Casco
  {
    y: 405,

    desenha: function () {
      context.drawImage(
        cascoVermelho,
        this.x,
        this.y,
        cascoVermelho.width - 40,
        cascoVermelho.height - 40
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  //Bala de Canhão
  {
    y: 350,

    desenha: function () {
      context.drawImage(balaCanhao, this.x, this.y);
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x >= this.x - 50 &&
        bonecoMario.x <= this.x &&
        bonecoMario.y <= this.y + 48
      ) {
        morte();
      }
    },
  },
  //Bloco
  {
    y: 391,

    desenha: function () {
      context.drawImage(
        blocoMarrom,
        this.x,
        this.y,
        blocoMarrom.width - 30,
        blocoMarrom.height - 30
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  //Planta
  {
    y: 353,

    desenha: function () {
      context.drawImage(planta, this.x, this.y, planta.width, planta.height);
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  //Bichinho Marron
  {
    y: 370,

    desenha: function () {
      context.drawImage(
        bichinhoMarrom,
        this.x,
        this.y,
        bichinhoMarrom.width - 10,
        bichinhoMarrom.height - 10
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  //Fantasma
  {
    y: 350,

    desenha: function () {
      context.drawImage(
        fantasma,
        this.x,
        this.y,
        fantasma.width - 20,
        fantasma.height - 20
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x >= this.x - 50 &&
        bonecoMario.x <= this.x &&
        bonecoMario.y <= this.y + 48
      ) {
        morte();
      }
    },
  },
  //Bombinha
  {
    y: 370,

    desenha: function () {
      context.drawImage(
        bombinha,
        this.x,
        this.y,
        bombinha.width,
        bombinha.height
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  //Tartaruga Voadora
  {
    y: 357,

    desenha: function () {
      context.drawImage(
        tartarugaVoadora,
        this.x,
        this.y,
        tartarugaVoadora.width,
        tartarugaVoadora.height
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  //Moedinha
  {
    y: 260,

    desenha: function () {
      context.drawImage(
        moedinha,
        this.x,
        this.y,
        moedinha.width - 40,
        moedinha.height - 40
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x >= this.x - 50 &&
        bonecoMario.x <= this.x &&
        bonecoMario.y <= this.y + 48
      ) {
        pegarMoedinha();
        this.x = -90;
      }
    },
  },
  //Moedinha
  {
    y: 260,

    desenha: function () {
      context.drawImage(
        moedinha,
        this.x,
        this.y,
        moedinha.width - 40,
        moedinha.height - 40
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x >= this.x - 50 &&
        bonecoMario.x <= this.x &&
        bonecoMario.y <= this.y + 48
      ) {
        pegarMoedinha();
        this.x = -90;
      }
    },
  },
  //Moedinha
  {
    y: 260,

    desenha: function () {
      context.drawImage(
        moedinha,
        this.x,
        this.y,
        moedinha.width - 40,
        moedinha.height - 40
      );
    },

    movimento: function () {
      if (this.x > -90) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x >= this.x - 50 &&
        bonecoMario.x <= this.x &&
        bonecoMario.y <= this.y + 48
      ) {
        pegarMoedinha();
        this.x = -90;
      }
    },
  },
  //Chefao
  {
    y: 360,

    desenha: function () {
      context.drawImage(
        chefao,
        this.x,
        this.y,
        chefao.width + 5,
        chefao.height + 5
      );
    },

    movimento: function () {
      if (this.x > -110) {
        this.x -= velocidadeElementos;
      }

      if (
        bonecoMario.x < this.x + 50 &&
        bonecoMario.x + 50 >= this.x &&
        bonecoMario.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
];

let inimigo = [];
//Escolha aletória de inimigos

let count = 17;
let arrGlobal = [];
let position = 900;
for (let i = 0; i < count; i++) {
  let num = Math.floor(Math.random() * 17);

  if (arrGlobal.indexOf(num) === -1) {
    arrGlobal.push(num);
    inimigo.push(inimigos[num]);
    inimigo[inimigo.indexOf(inimigos[num])].x = position;
    position += 400;
  } else {
    count++;
  }
  if (i === count - 1) {
    inimigo.push(inimigos[17]);
    inimigo[17].x = position;
    bandeiraFim.x = position + 400;
  }
}

let canvas,
  context,
  altura,
  largura,
  velocidadeElementos = 1.5,
  taxa = 0,
  xBackground = 0,
  estadoAtual = 0,
  musicClick = 0,
  qtdMoedinha = 0,
  chao = {
    y: 448,
    altura: 50,
  },
  background = {
    atualiza: function () {
      const pattern = context.createPattern(imgBackground, "repeat");
      context.fillStyle = pattern;
      context.fillRect(xBackground, 0, largura, altura);
    },
  },
  bonecoMario = {
    x: 50,
    y: 398,
    img: marioParado,
    altura: 80,
    largura: 50,
    gravidade: 0.4,
    velocidade: 0,
    forcaDoPulo: 12,

    atualiza: function (event) {
      this.velocidade += this.gravidade;
      this.y += this.velocidade;

      if (this.y > chao.y - this.altura) {
        this.y = chao.y - this.altura;
      }
    },

    desenha: function () {
      context.drawImage(this.img, this.x, this.y);
    },

    pula: function () {
      if (posicaoMario == 0) {
        if (this.y > 358) {
          this.velocidade = -this.forcaDoPulo;
          let count = 0;
          let id = setInterval(() => {
            this.x++;
            count++;
            if (count == 120) {
              clearInterval(id);
            }
            return id;
          }, 6);

          this.img = marioCorrendo;
          let id2 = setInterval(() => {
            this.img = marioParado;
            clearInterval(id2);
          }, 900);

          puloMario.currentTime = 0.35;
          puloMario.volume = 0.4;
          puloMario.play();
        }
      } else {
        if (this.y > 358) {
          this.velocidade = -this.forcaDoPulo;
          let count = 0;
          let id = setInterval(() => {
            this.x--;
            count++;
            if (count == 120) {
              clearInterval(id);
            }
            return id;
          }, 6);

          this.img = marioCorrendoInvertido;
          let id2 = setInterval(() => {
            this.img = marioParadoInvertido;
            clearInterval(id2);
          }, 900);
        }

        puloMario.currentTime = 0.35;
        puloMario.volume = 0.4;
        puloMario.play();
      }
    },

    andarDireita: function () {
      if (this.x < 600) {
        this.x += 10;
        this.img = marioCorrendo;
        posicaoMario = 0;
      }
    },

    andarEsquerda: function () {
      if (this.x > 50) {
        this.x -= 10;
        this.img = marioCorrendoInvertido;
        posicaoMario = 1;
      }
    },

    abaixar: function (event) {
      if (event == true) {
        this.altura = 43;
        if (posicaoMario === 0) {
          this.img = marioAbaixado;
        } else {
          this.img = marioAbaixadoInvertido;
        }
      } else {
        this.altura = 80;
      }
    },
  },
  inimigo1 = {
    dados: inimigo[0],
  },
  inimigo2 = {
    dados: inimigo[1],
  },
  inimigo3 = {
    dados: inimigo[2],
  },
  inimigo4 = {
    dados: inimigo[3],
  },
  inimigo5 = {
    dados: inimigo[4],
  },
  inimigo6 = {
    dados: inimigo[5],
  },
  inimigo7 = {
    dados: inimigo[6],
  },
  inimigo8 = {
    dados: inimigo[7],
  },
  inimigo9 = {
    dados: inimigo[8],
  },
  inimigo10 = {
    dados: inimigo[9],
  },
  inimigo11 = {
    dados: inimigo[10],
  },
  inimigo12 = {
    dados: inimigo[11],
  },
  inimigo13 = {
    dados: inimigo[12],
  },
  inimigo14 = {
    dados: inimigo[13],
  },
  moedinhaOuro1 = {
    dados: inimigo[14],
  },
  moedinhaOuro2 = {
    dados: inimigo[15],
  },
  moedinhaOuro3 = {
    dados: inimigo[16],
  },
  inimigo15 = {
    dados: inimigo[17],
  };

canvas = document.getElementById("canvas");

let contadorMoedinhas = {
  x: 730,
  y: 50,

  desenha: function () {
    context.font = "30px serif";
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillText(`Moedas: ${qtdMoedinha}`, this.x, this.y);
  },
};

function movimentoMorteMario() {
  let interval = setInterval(() => {
    if (chao.y < 650) {
      chao.y += 2;
    } else {
      clearInterval(interval);
    }
  }, 1);
  estadoAtual = 2;
}

function pegarMoedinha() {
  qtdMoedinha++;
  somMoedinha.play();
}

function iniciarJogo() {
  estadoAtual = 1;
}

function musicaFundo() {
  if (musicClick === 0) {
    audio.play();
    musicClick++;
  }
  audio.volume = 0.6;
}

function audioVencedor() {
  somVenceu.play();
  somVenceu.volume = 0.6;
  audio.pause();
}

function audioPerdedor() {
  somPerdeu.play();
  somPerdeu.volume = 0.6;
  audio.pause();
}

function trocaMarioParado() {
  if (posicaoMario === 0) {
    bonecoMario.img = marioParado;
  } else {
    bonecoMario.img = marioParadoInvertido;
  }
}

function trocaMarioParadoInvertido() {
  bonecoMario.img = marioParadoInvertido;
}

main();

botaoReset2.addEventListener("click", reset);
botaoResetVencedor.addEventListener("click", reset);
botaoReset.addEventListener("click", reset);
document.addEventListener("keydown", teclaDireita);
document.addEventListener("keydown", teclaEsquerda);
document.addEventListener("keydown", teclaCima);
document.addEventListener("keydown", teclaBaixoPress);
document.addEventListener("keyup", teclaDireitaSolta);
document.addEventListener("keyup", teclaEsquerdaSolta);
document.addEventListener("keyup", teclaBaixoSolta);
document.addEventListener("keydown", enter);
document.addEventListener("click", musicaFundo);

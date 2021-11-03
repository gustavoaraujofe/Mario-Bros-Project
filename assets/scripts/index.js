const imgBackground = document.getElementById("background");
const blocoFim = document.getElementById("bloco-fim");
const containerInstrucoes = document.getElementById("container-intrucoes");
const blocoVencedor = document.getElementById("bloco-vencedor");
const botaoResetVencedor = document.getElementById("botaoReset-winner");
const audio = document.getElementById("audio");
const audioWinner = document.getElementById("audioSource");

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

const bandeiraChegada = new Image();
bandeiraChegada.src = "./assets/img/bandeira-chegada2.png";

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

let canvas,
  context,
  altura,
  largura,
  velocidadeElementos = 1.5,
  taxa = 0,
  xBackground = 0,
  estadoAtual = 0,
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
    forcaDoPulo: 14,

    atualiza: function (event) {
      this.velocidade += this.gravidade;
      this.y += this.velocidade;

      if (this.y > chao.y - this.altura) {
        this.y = chao.y - this.altura;
      }
    },

    desenha: function () {
      /*context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);*/

      context.drawImage(this.img, this.x, this.y);
    },

    pula: function () {
      if (this.y > 358) {
        this.velocidade = -this.forcaDoPulo;
        let id = setInterval(() => {
          if (this.x < 600 && chao.y < 500) {
            this.x += 65;
          }
          clearInterval(id);
        }, 250);

        this.img = marioCorrendo;
        let id2 = setInterval(() => {
          this.img = marioParado;
          clearInterval(id2);
        }, 900);
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
  //Tartaruga
  inimigo1 = {
    x: 700,
    y: 360,
    altura: 50,
    largura: 40,
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
  inimigo2 = {
    x: 1000,
    y: 405,
    altura: 50,
    largura: 40,
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
  inimigo3 = {
    x: 1300,
    y: 350,
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
  inimigo4 = {
    x: 1600,
    y: 360,
    altura: 50,
    largura: 40,
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
  inimigo5 = {
    x: 1900,
    y: 360,
    altura: 50,
    largura: 40,
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
  inimigo6 = {
    x: 2200,
    y: 350,
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
  inimigo7 = {
    x: 2500,
    y: 405,
    altura: 50,
    largura: 40,
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
  inimigo8 = {
    x: 2800,
    y: 350,
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
  inimigo9 = {
    x: 3100,
    y: 391,
    altura: 50,
    largura: 40,
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
  inimigo10 = {
    x: 3400,
    y: 353,
    altura: 50,
    largura: 40,
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
  //Bicinho Marrom
  inimigo11 = {
    x: 3700,
    y: 370,
    altura: 50,
    largura: 40,
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
  inimigo12 = {
    x: 4000,
    y: 350,
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
  inimigo13 = {
    x: 4300,
    y: 370,
    altura: 50,
    largura: 40,
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
  inimigo14 = {
    x: 4600,
    y: 357,
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
  //Chefão
  inimigo15 = {
    x: 4900,
    y: 360,
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
  bandeiraFim = {
    x: 5200,
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
        vencedor();
      }
    },
  };

canvas = document.getElementById("canvas");

function movimentoMorteMario() {
  let interval = setInterval(() => {
    if (chao.y < 550) {
      chao.y += 2;
    } else {
      clearInterval(interval);
    }
  }, 1);
  estadoAtual = 2;
}

function iniciarJogo() {
  estadoAtual = 1;
}

function musicaFundo() {
  audio.play();
  audio.volume = 0.6;
}

function audioVencedor() {
  audio.setAttribute("src", "./assets/sound/victory.wav");
}

function audioPerdedor() {
  audio.setAttribute("src", "./assets/sound/gameOver.wav");
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

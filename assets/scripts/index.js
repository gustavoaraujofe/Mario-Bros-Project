const imgBackground = document.getElementById("background");
const marioParado = document.getElementById("marioParado");
const blocoFim = document.getElementById("bloco-fim");
const containerInstrucoes = document.getElementById("container-intrucoes");
const blocoVencedor = document.getElementById("bloco-vencedor");
const botaoResetVencedor = document.getElementById("botaoReset-winner");
const audio = document.getElementById("audio");
const audioWinner = document.getElementById("audioSource");

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
  bloco = {
    x: 50,
    y: 398,
    altura: 50,
    largura: 50,
    cor: "rgb(204, 201, 0)",
    gravidade: 0.5,
    velocidade: 0,
    forcaDoPulo: 15,

    atualiza: function (event) {
      this.velocidade += this.gravidade;
      this.y += this.velocidade;

      if (this.y > chao.y - this.altura) {
        this.y = chao.y - this.altura;
      }
    },

    pula: function () {
      if (this.y === 398) {
        this.velocidade = -this.forcaDoPulo;
        let id = setInterval(() => {
          if (this.x < 600 && chao.y < 500) {
            this.x += 65;
          }
          clearInterval(id);
        }, 250);
      }
    },

    andarDireita: function () {
      if (this.x < 600) {
        this.x += 10;
      }
    },

    andarEsquerda: function () {
      if (this.x > 50) {
        this.x -= 10;
      }
    },

    abaixar: function (event) {
      if (event == true) {
        this.altura = 30;
      } else {
        this.altura = 50;
      }
    },

    desenha: function () {
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },
  },
  inimigo1 = {
    x: 700,
    y: 398,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x < this.x + 50 &&
        bloco.x + 50 >= this.x &&
        bloco.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  inimigo2 = {
    x: 950,
    y: 398,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x < this.x + 50 &&
        bloco.x + 50 >= this.x &&
        bloco.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  inimigo3 = {
    x: 1200,
    y: 365,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x >= this.x - 50 &&
        bloco.x <= this.x &&
        bloco.y === this.y + 33
      ) {
        morte();
      }
    },
  },
  inimigo4 = {
    x: 1450,
    y: 398,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x < this.x + 50 &&
        bloco.x + 50 >= this.x &&
        bloco.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  inimigo5 = {
    x: 1700,
    y: 398,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x < this.x + 50 &&
        bloco.x + 50 >= this.x &&
        bloco.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  inimigo6 = {
    x: 1950,
    y: 365,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x >= this.x - 50 &&
        bloco.x <= this.x &&
        bloco.y === this.y + 33
      ) {
        morte();
      }
    },
  },
  inimigo7 = {
    x: 2200,
    y: 398,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x < this.x + 50 &&
        bloco.x + 50 >= this.x &&
        bloco.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  inimigo8 = {
    x: 2450,
    y: 365,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x >= this.x - 50 &&
        bloco.x <= this.x &&
        bloco.y === this.y + 33
      ) {
        morte();
      }
    },
  },
  inimigo9 = {
    x: 2700,
    y: 365,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x >= this.x - 50 &&
        bloco.x <= this.x &&
        bloco.y === this.y + 33
      ) {
        morte();
      }
    },
  },
  inimigo10 = {
    x: 2950,
    y: 398,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x < this.x + 50 &&
        bloco.x + 50 >= this.x &&
        bloco.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  inimigo11 = {
    x: 3200,
    y: 398,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x < this.x + 50 &&
        bloco.x + 50 >= this.x &&
        bloco.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  inimigo12 = {
    x: 3450,
    y: 365,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x >= this.x - 50 &&
        bloco.x <= this.x &&
        bloco.y === this.y + 33
      ) {
        morte();
      }
    },
  },
  inimigo13 = {
    x: 3700,
    y: 398,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x < this.x + 50 &&
        bloco.x + 50 >= this.x &&
        bloco.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  inimigo14 = {
    x: 3950,
    y: 365,
    altura: 50,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x >= this.x - 50 &&
        bloco.x <= this.x &&
        bloco.y === this.y + 33
      ) {
        morte();
      }
    },
  },
  inimigo15 = {
    x: 4200,
    y: 378,
    altura: 70,
    largura: 50,
    cor: "rgb(195, 4, 4)",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x < this.x + 50 &&
        bloco.x + 50 >= this.x &&
        bloco.y + 50 >= this.y
      ) {
        morte();
      }
    },
  },
  bandeiraFim = {
    x: 500,
    y: 248,
    altura: 200,
    largura: 10,
    cor: "rgb(49, 195, 4",
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
      context.fillStyle = this.cor;
      context.fillRect(this.x, this.y, this.largura, this.altura);
    },

    movimento: function () {
      if (this.x > -50) {
        this.x -= velocidadeElementos;
      }

      if (
        bloco.x < this.x + 50 &&
        bloco.x + 50 >= this.x &&
        bloco.y + 50 >= this.y
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
      console.log("entrou");
      clearInterval(interval);
    }
  }, 1);
  estadoAtual = 2;
}

function iniciarJogo() {
  estadoAtual = 1;
}

function audioFundo() {
  audio.volume = 0.6; 
}

function audioVencedor() {
  audio.setAttribute("src", "./assets/sound/victory.wav");
}

function audioPerdedor() {
  audio.setAttribute("src", "./assets/sound/gameOver.wav");
}


main();
audioFundo()
botaoResetVencedor.addEventListener("click", reset);
botaoReset.addEventListener("click", reset);
document.addEventListener("keydown", teclaDireita);
document.addEventListener("keydown", teclaEsquerda);
document.addEventListener("keydown", teclaCima);
document.addEventListener("keydown", teclaBaixoPress);
document.addEventListener("keyup", teclaBaixoSolta);
document.addEventListener("keypress", barraEspaço);
document.addEventListener("keydown", enter);

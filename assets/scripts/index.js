const background = document.getElementById('background')
const marioParado = document.getElementById('marioParado')


let canvas, context, altura, largura, taxa = 0, 

chao = {
  y: 448,
  altura: 50,
}, 

bloco = {
  x: 50,
  y: 400,
  altura: 50,
  largura: 50,
  cor: "#ff4e4e",
  gravidade: 1,
  velocidade: 0,
  forcaDoPulo: 16,
  
  atualiza: function(){
    this.velocidade += this.gravidade;
    this.y += this.velocidade;
    
    if(this.y > chao.y - this.altura){
      this.y = chao.y - this.altura;
      
    }
  },

  pula: function(){
    this.velocidade = -this.forcaDoPulo;
  },

  andarDireita: function(){
    if(this.x < 450){
      this.x += 10;
    }
    
  },
  
  andarEsquerda: function(){
    if(this.x > 50){
      this.x -= 10;
    }
    
  },

  abaixar: function(event){
    
    if(event == true){
      this.altura = 30;
    } else {
      this.altura = 50;
    }
  },


  desenha: function(){
    context.fillStyle = this.cor;
    context.fillRect(this.x, this.y, this.largura, this.altura)
  }
}
;
canvas = document.getElementById('canvas');
let img = new Image();
img.onload = function(){
  context.drawImage(img, 0, 0);
}
img.scr = './assets/img/marioParado.png'




function main() {
  canvas.height = 500;
  canvas.width = 700;
  largura = canvas.width
  altura = canvas.height
 
  context = canvas.getContext("2d");
  rodar();
  

}

function teclaCima(event) {
    
  if(event.key === 'ArrowUp'){
    console.log('pra cima')
    bloco.pula()
  }
  
} 

function teclaBaixoPress(event) {
 
  if(event.key === 'ArrowDown'){
    console.log('pra baixo')
    bloco.abaixar(true)
  } 
}

function teclaBaixoSolta(event){
  
  if(event.key === 'ArrowDown'){
    console.log("Tecla Solta")
    bloco.abaixar(false)
  }  
}

function teclaDireita(event) {
  
  if(event.key === 'ArrowRight'){
    console.log('pra direita')
    bloco.andarDireita()
  }   
}

function teclaEsquerda(event) {
  if(event.key === 'ArrowLeft'){
    console.log('pra esquerda')
    bloco.andarEsquerda();
  }   
}

function barraEspaço(event) {
  if(event.key === " "){
    console.log('Barra de espaço')
  }
}

function rodar() {
  atualizar();
  desenhar();

  window.requestAnimationFrame(rodar);
}

function atualizar() {
  taxa++;
  bloco.atualiza();
  
}

function desenhar() {
    
  const pattern = context.createPattern(background, 'repeat');
  context.fillStyle = pattern;
  context.fillRect(0, 0, largura, altura);
  bloco.desenha();

}

function personagem() {
  
}


main();

document.addEventListener("keydown", teclaDireita)
document.addEventListener("keydown", teclaEsquerda)
document.addEventListener("keydown", teclaCima);
document.addEventListener("keydown", teclaBaixoPress);
document.addEventListener("keyup", teclaBaixoSolta);
document.addEventListener("keypress", barraEspaço)
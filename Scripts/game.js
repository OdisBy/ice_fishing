var tela = document.querySelector('canvas')
var pincel = tela.getContext('2d')

//INSTANCIA DE OBJS
var linha = new LinhaVaraPesca(
  tela.width / 2 - 50,
  5,
  300,
  300,
  3,
  'Assets/linha.png'
)
var iscaObj = new Isca(658, 5, 60, 60, 3, 'Assets/minhoca.png')
var chao = new Img(0, 150, 1400, 300, 'Assets/chao.png')
var bauPeixe = new Img(400, 140, 132, 116, 'Assets/baupeixe.png')
var player = new Player(670, 10, 240, 220, 0, 'Assets/idle.png')
var linhaFix = new Img(
  tela.width / 2 - 50,
  5,
  300,
  150,
  'Assets/linha.png'
)

var iscandoPeixe = new Audio('sound/iscandopeixe.wav')
var peixeColetado = new Audio('sound/peixeguardado.wav')


//MENU
var telaMenu = new Obj(0, 0, 1200, 720, 0, 'Assets/menu.png')

//ICON
var minhocaIcon = new Img(0, 0, 120, 120, 'Assets/iconminhoca.png')

//VARIAVEIS DO JOGO
var rodandoJogo = false
var gameOver = false
const peixesVivos = []
const caranguejoArray = []

var gerarPeixe = new invocarPeixe()


//Buttons
//Menu inicial
var jogarButton = new Button(940, 615, 205, 57, 'Assets/empty.png')


//PEGAR O MOV DO MOUSE E MOVER A LARGURA DA LINHA COM ISSO E MOVER ISCA
document.addEventListener('mousemove', (event) => {
  var x = event.offsetX;
  var y = event.offsetY;

  if(linha.height >= 150 && linha.height <= 700){
    linha.height = y
  }else if(linha.height < 150){
    linha.height = 150
  }else if(linha.height > 700){
    linha.height = 700
  }
  iscaObj.y = linha.y + linha.height - 20
});

document.addEventListener('click', (event) => {
  var x = event.offsetX;
  var y = event.offsetY;

  if(!rodandoJogo && !gameOver){
      //MENU
      if(jogarButton.clickButton(x, y)){
          player.timer = 300
          player.tempoTubarao = 5
          gerarPeixe.gerarPeixe()
          rodandoJogo = true;
      }
  }
});



//Desenhar mapa e player
function mapaDesenho() {
  pincel.fillStyle = '#E5FFFF'
  pincel.fillRect(0, 0, 1200, 250)
  pincel.fillStyle = '#274568'
  pincel.fillRect(0, 250, 1200, 700)
  chao.desenha()
  bauPeixe.desenha()
  player.desenha()
  linha.desenha()
  iscaObj.desenha()
  linhaFix.desenha()

  hud()
}

function hud(){
  minhocaIcon.desenha()

  pincel.font = "60px Arial";
  pincel.fillText(player.iscas, 100, 80);

  pincel.fillText(player.getTimer(), 500, 80);
}


//timer
function timerContando() {
    player.timer -= 1
    player.tempoTubarao -= 1
}

function getNovoPeixe() {
  var peixeGerado = gerarPeixe.gerarPeixe()
  peixesVivos.push(peixeGerado)
}

function main() {
  if(rodandoJogo){
    pincel.clearRect(0, 0, 1200, 720)
    mapaDesenho()
    gerarPeixe.peixeFuncao()
    console.log(linha.x)
  } else if(gameOver){
    
  }else{
    telaMenu.desenha();
  }
  
  
  
}
// criarCaranguejo()S
setInterval(getNovoPeixe, 2500)
setInterval(timerContando, 1000)
setInterval(main, 10)

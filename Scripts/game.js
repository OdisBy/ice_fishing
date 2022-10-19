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
var chao = new Obj(0, 150, 1400, 300, 0, 'Assets/chao.png')
var bauPeixe = new Obj(400, 140, 132, 116, 0, 'Assets/baupeixe.png')
var player = new Player(670, 10, 240, 220, 0, 'Assets/idle.png')
var linhaFix = new Obj(
  tela.width / 2 - 50,
  5,
  300,
  150,
  3,
  'Assets/linha.png'
)

//ICON
var minhocaIcon = new Obj(0, 0, 120, 120, 0, 'Assets/iconminhoca.png')

//VARIAVEIS DO JOGO
var gameOver = false
const peixesVivos = []
const caranguejoArray = []


//PEGAR O MOV DO MOUSE E MOVER A LARGURA DA LINHA COM ISSO E MOVER ISCA
document.addEventListener('mousemove', (event) => {
  var rect = canvas.getBoundingClientRect();
  var y = event.clientY - rect.top;

  if(linha.height >= 150 && linha.height <= 700){
    linha.height = y
  }else if(linha.height < 150){
    linha.height = 150
  }else if(linha.height > 700){
    linha.height = 700
  }
  iscaObj.y = linha.y + linha.height - 20
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

  pincel.fillText(fancyTimeFormat(player.timer), 500, 80);
}




//timer
function timerContando() {
    player.timer -= 1
}


//FUNCAO SETAR FORMATO DO TIMER BUNITINHO 
function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60; 

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

//FUNCAO GERAR NUMERO INTEIRO RANDOMICO
function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


//Criar peixe randomico, ela passará seus atributos para qa função invocarPeixe
function criarPeixe() {

  //Definir qual peixe vai ser
  var qualPeixe = Math.floor(Math.random() * 4)

  //Posição inicial do peixe
  var larguraInicial = -600
  var alturaInicial = generateRandomIntegerInRange(300, 670)

  //Variavel
  var tubarao = false


  // Vai ter inimigo? Se for igual a 0 não vai ter, 1 vai ter
  //Caso tenha um inimigo
  if (generateRandomIntegerInRange(0, 1) == 0) {
    var larguraInimigo = larguraInicial
    tubarao = false
    
    // Vai ser atrás ou na frente do peixe? Se for 0 vai ser atrás, else vai ser na frente do peixe
    if (generateRandomIntegerInRange(0, 1) == 0)
      larguraInimigo -= 230
    else 
      larguraInimigo += 230


    // Se for 0 gera um tubarão, caso entre no else gera uma bota
    if (generateRandomIntegerInRange(0, 1) == 0)
        invocarPeixe(6, larguraInimigo, alturaInicial)
    else
        invocarPeixe(5, larguraInimigo, alturaInicial - 20)
  }

  // Com as varíaveis do peixe criado elas serão passadas para essa função que vai gerar o peixe
  invocarPeixe(qualPeixe, larguraInicial, alturaInicial)
}

function criarCaranguejo(){
    invocarPeixe(4, -200, 200)
}


//Essa função vai invocar o peixe com as varíaveis da função criarPeixe
function invocarPeixe(index, larguraInicial, alturaInicial) {
  //Aqui a varíavel dizendo qual peixe que foi o escolhido
  var peixeMomento


  // Um switch para qual peixe vai ser gerado. Quando é o peixe selecionado ele vai instanciar o peixe com as varíaveis da função criarPeixe
  switch (index) {
    case 0:
      var salmao = new Salmao(
        larguraInicial,
        alturaInicial,
        142,
        50,
        3,
        'Assets/salmao.png',
      )
      peixeMomento = salmao
      break
    case 1:
      var pacu = new Pacu(
        larguraInicial,
        alturaInicial,
        142,
        50,
        3,
        'Assets/pacu.png',
      )
      peixeMomento = pacu
      break
    case 2:
      var tilapia = new Tilapia(
        larguraInicial,
        alturaInicial,
        142,
        50,
        3,
        'Assets/tilapia.png',
      )
      peixeMomento = tilapia
      break
    case 3:
      var lataDeMinhoca = new lataMinhoca(
        larguraInicial,
        alturaInicial,
        50,
        99,
        3,
        'Assets/lataMinhoca.png',
      )
      peixeMomento = lataDeMinhoca
      break
    case 4:
      var caranguejo = new Caranguejo(
        larguraInicial,
        260,
        129,
        50,
        1,
        'Assets/caranguejo.png',
      )
      peixeMomento = caranguejo
      break
    case 5:
      var bota = new Bota(
        larguraInicial,
        alturaInicial,
        75,
        81,
        3,
        'Assets/bota.png',
      )
      peixeMomento = bota
      break
    case 6:
      var tubarao = new Tubarao(
        larguraInicial,
        alturaInicial,
        201,
        90,
        3,
        'Assets/tubarao.png',
      )
      peixeMomento = tubarao
      break
  }

  //Aqui vai colocar a instancia que acabou de ser criada num array que será utilizado para manipular todos os peixes ao mesmo tempo
  peixesVivos.push(peixeMomento)
}


// Essa função irá manipular se o peixe foi fisgado, chegou no objetivo, se era um peixe ou uma bota
function peixeFuncao() {

  // Para manipular cada peixe no array que foi preenchido pela função invocarPeixe.
  peixesVivos.forEach((peixin) => {

    // Verfica se o peixe já foi coletado ou não. Caso não ele desenhará e chamará a função movimentação dos peixes que ainda não foram coletados, escolhi assim pois não achei como destroir um objeto depois de ser pego, então os que forem pegos irão passar por esse if e não serão desenhados e nem se movimentaram
    if (!peixin.coletado) {

      // Caso o peixe ainda não tenha sido fisgado ele entrará nesse if, que o desenhará, movimentará, e terá o collider caso encoste na isca.
      if (peixin.pescado == false) {
        peixin.desenha()
        peixin.movement()


        // Caso a isca colida com o peixe ele verificará se a isca já não está segurando um peixe, caso não ele entrará num switch para definir qual peixe foi pescado
        if (iscaObj.collide(peixin)) {
          if (!iscaObj.pescado)
          {
            switch (peixin.objetoNome) {
              case 'Pacu':
                iscaObj.pescado = true
                peixin.pescado = true
                console.log('Coletou Pacu')
                break
              case 'Salmao':
                iscaObj.pescado = true
                peixin.pescado = true
                console.log('Coletou Salmao')
                break
              case 'Tilapia':
                iscaObj.pescado = true
                peixin.pescado = true
                console.log('Coletou Tilapia')
                break
              case 'Bota':
                iscaObj.pescado = true
                peixin.pescado = true
                console.log('Pegou bota')
                break
              case 'Tubarao':
                player.iscas -= 1
                linha.height = 150
                linha.y = 10
                console.log("Tubarao comeu isca")
                break
              case 'Lata':
                iscaObj.pescado = true
                peixin.pescado = true
                console.log("Pegou lata de minhocas")
            }
          } 
          
          // Caso ele tenha fisgado um peixe já, porém encostar num tubarão ele perderá o peixe e a isca
          else {
            if(peixin.objetoNome == "Tubarao"){
              player.iscas -= 1
              linha.height = 150
              linha.y = 10
              iscaObj.pescado = false
              console.log("Tubarao comeu isca")
            }
          }
        
        }
      } 

      //Caso o peixe esteja fisgado. Ele irá arrumar o x dependendo do objeto.
      else {
        if(peixin.objetoNome == "Lata")
          peixin.height = 50
        if(peixin.objetoNome == "Bota")
          peixin.peixePescado(iscaObj.x-25, iscaObj.y, peixin.imgPescado)
        else 
          peixin.peixePescado(iscaObj.x, iscaObj.y, peixin.imgPescado)
        
        
        // Caso a linha chegue na altura 150 quando tem um peixe fisgado ela entrará nesse if, que verificará qual objeto que foi coletado e tratará.
        if (linha.height <= 150) {
          if(peixin.objetoNome == "Bota")
          {
            player.iscas -= 1
            iscaObj.pescado = false
          }
          if(peixin.objetoNome == "Lata")
          {
            player.iscas += 1
            iscaObj.pescado = false
            peixin.coletado = true
          }
          else{
            player.peixesPescados += 1
            peixin.coletado = true
            iscaObj.pescado = false
          }
        }
      }
    }
    // if(linha.collide(peixin)){
    //   console.log("Colidiu peixe")
    //   if(peixin.objetoNome == "Caranguejo"){
    //     player.iscas -= 1
    //     linha.height = 150
    //     iscaObj.pescado = false
    //     console.log("Caranguejo cortou linha")
    //   }
    // }
  })

}

function main() {
  pincel.clearRect(0, 0, 1200, 720)
  mapaDesenho()
  peixeFuncao()
}
criarCaranguejo()
setInterval(timerContando, 1000)
setInterval(criarPeixe, 2500)
setInterval(main, 10)

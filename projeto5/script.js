//Initial Data
let currentColor = 'black' //Define a cor inicial padrão
let screen = document.querySelector('#tela') //Seleciona a área de desenho
let ctx = screen.getContext('2d') //Seta a área de desenho como 2d
let canDraw = false //Instancia a variavel de poder desenha como falso
let mouseX = 0 //Instancio a variavel de posição X do mouse com 0
let mouseY = 0 //Instancio a variavel de posição X do mouse com 0


//Events
document.querySelectorAll('.colorArea .color').forEach(item => { //Seleciona todos os elementos color dentro de colorArea
  item.addEventListener('click', colorClickEvent) //Adiciona um eventListener(click chamando a função colorClick) em cada um deles
})

screen.addEventListener('mousedown', mouseDownEvent) //Captura o click do ouse e chama a função
screen.addEventListener('mouseup', mouseUpEvent) //Captura o soltar o click do mouse e chama a função
screen.addEventListener('mousemove', mouseMoveEvent) //Captura o movimento do mouse dentro do canvas e chama a função

document.querySelector('.clear').addEventListener('click', clearScreen)

//Functions
function colorClickEvent(e){
  let actualColor = e.target.getAttribute('data-color') //Pega a cor clicada pelo usuario
  currentColor = actualColor //Seta a cor padrão com a cor selecionada pelo usuario

  document.querySelector('.color.active').classList.remove('active') //Remove o atributo active da cor padrão atual
  e.target.classList.add('active') //Seta a cor padrão com a cor escolhida pelo usuário
}

function mouseDownEvent(e){
  //console.log('Clickou no mouse')
  canDraw = true
  mouseX = e.pageX - screen.offsetLeft
  mouseY = e.pageY - screen.offsetTop
}

function mouseUpEvent(e){
  //console.log('Soltou o mouse')
  canDraw = false
}

function mouseMoveEvent(e){
  //console.log('Moveu o mouse')
  if(canDraw){
    draw(e.pageX, e.pageY)
  }
}

function draw(x, y) {
  let pointX = x - screen.offsetLeft //Pega a posição atual do mouse durante o movimento (eixo X)
  let pointY = y - screen.offsetTop //Pega a posição atual do mouse durante o movimento (eixo Y)

  ctx.beginPath() //Inicio o processo de configuração do desenho
  ctx.lineWidth = 5 //Espessura da linha que sera desenhada
  ctx.lineJoin = 'round' //Tipo de linha (bordas arredondadas, no caso)
  ctx.moveTo(mouseX, mouseY) //Onde começará o desenho
  ctx.lineTo(pointX, pointY) //Onde terminará o desenho
  ctx.closePath() //Finaliza o processo de configuração do desenho
  ctx.strokeStyle = currentColor //Seta a cor do desenho
  ctx.stroke() //Desenha no canvas

  mouseX = pointX //Seta o valor anterior do mouse com o valor atual (eixo X)
  mouseY = pointY //Seta o valor anterior do mouse com o valor atual (eixo Y)
}

function clearScreen(){
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}
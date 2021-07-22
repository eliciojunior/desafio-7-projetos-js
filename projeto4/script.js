//Dados do jogo
let table = {
  a1: '', a2: '', a3: '',
  b1: '', b2: '', b3: '',
  c1: '', c2: '', c3: ''
}

let turn = ''
let info = ''
let playing = false

reset()

//Eventos do jogo
document.querySelector('.reset').addEventListener('click', reset) //Reset do jogo
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick)
})


//Funções do jogo
function reset(){
  info = ''
  
  let random = Math.floor(Math.random() * 2) // Math.floor (arredonda para baixo); Math.random (gera algo randomico)
  player = (random === 0) ? 'X' : 'O' //Ternário (if/else)
  
  for(let position in table){
    table[position] = ''
  }
  
  playing = true

  renderTable()
  renderInfo()

}

function renderTable(){
  for(let position in table){
    let itemInTable = document.querySelector(`div[data-item=${position}]`)
    itemInTable.innerHTML = table[position]
  }
  console.table(table)
  checkGame()
}

function renderInfo(){
  document.querySelector('.vez').innerHTML = player
  document.querySelector('.resultado').innerHTML = info
}

function togglePlayer(){
  player = player === 'X' ? 'O' : 'X' //Caso o jogador seja o X, vira O (e vice-versa)
  renderInfo()
}

function checkGame(){
  if(checkWinner('X')){
    console.log('O "X" venceu!"')
    info = 'O "X" venceu!"'
    playing = false
  } else if(checkWinner('O')){
    console.log('O "O" venceu!""')
    info = 'O "O" venceu!"'
    playing = false
  } else if(isFull()){
    console.log('Deu empate!')
    info = 'Deu empate!"'
    playing = false
  }
}

function checkWinner(player){
  const victory = [ //Array de possibilidades de ganhar o jogo
    'a1,a2,a3',
    'b1,b2,b3',
    'c1,c2,c3',

    'a1,b1,c1',
    'a2,b2,c2',
    'a3,b3,c3',

    'a1,b2,c3',
    'c1,b2,a3'
  ]

  for(let possibility in victory){
    let fieldPossibility = victory[possibility].split(',') //Array com cada uma das opções de cada linha
    /*fieldPossibility.every((option) => {
      if(table[option] === player){ //Se cada uma das opções está preenchida com o mesmo jogador
        return true //Ele ganhou
      } else {
        return false //Ele ainda não ganhou
      }
    })*/
    let hasWon = fieldPossibility.every(option => table[option] === player) //Função simplificada
    if(hasWon){
      return true //Se tiver alguma opção preenchida com o mesmo jogador, ele venceu
    }
  }
  return false //Nenhum jogador preencheu as possibilidades de ganhar o jogo
}

function isFull(){
  for(let item in table){
    if(table[item] === ''){ //Se tiver algum campo vazio na tabela
      return false //O jogo ainda não acabou
    }
  }
  return true
}

function itemClick(event){
  const item = event.target.getAttribute('data-item') //Captura o atributo data-item que veio pelo evento de click
  if(playing && table[item] === ''){ //Valida se o campo clicado está vazio
    table[item] = player //Insere o valor do jogador dentro do objeto, caso esse esteja vazio
    renderTable() //Printa a tabela no HTML
    togglePlayer() //Inverte o jogador
  }
}
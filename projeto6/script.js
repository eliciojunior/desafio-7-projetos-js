//Variables
let currentQuestion = 0 //Inicialização da variavel da questão atual
let correctAnswers = 0 //Inicialização da varialve de respostas corretas

showQuestion()

//Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

//Functions
function showQuestion(){
  if(questions[currentQuestion]){
    let q = questions[currentQuestion]
    
    let pct = Math.floor((currentQuestion / questions.length) * 100) //Calcula o progresso do teste
    document.querySelector('.progress--bar').style.width = `${pct}%` //Aumenta a barra de progresso

    document.querySelector('.scoreArea').style.display = 'none' //Esconde a div de pontuação
    document.querySelector('.questionArea').style.display = 'block' //Exibe a div com as perguntas
    document.querySelector('.question').innerHTML = q.question //Insere a pergunta na div de perguntas

    let optionsHTML = '' //Inicializa a variavel com as possiveis respostas
    for(let x in q.options){
      optionsHTML += `<div data-op=${x} class='option'><span>${parseInt(x)+1}</span>${q.options[x]}</div>`
    } //Para cada opção de resposta, itera a varivavel (parseInt para poder fazer cálculo)
    document.querySelector('.options').innerHTML = optionsHTML //Exibe a variavel de respostas na div

    document.querySelectorAll('.options .option').forEach(item => { //Seleciona todas as opções de resposta na div
      item.addEventListener('click', optionClickEvent) //Add um evento de click em cada uma delas para executar a função
    })
  } else {
    finishQuiz() //Finaliza o quiz
  }
}

function optionClickEvent(event){
  let clickedOption = parseInt(event.target.getAttribute('data-op')) //Armazena na variavel a resposta do usuario (convertendo para int)
  
  if(questions[currentQuestion].answer === clickedOption){ //Verifica se a resposta do usuario é a correta
    correctAnswers++ //Se sim, itera a variavel de respostas corretas
  }
  console.log(clickedOption)
  currentQuestion++ //Pula para a próxima questão
  showQuestion() //Carrega a próxima questão
}

function finishQuiz(){
  document.querySelector('.progress--bar').style.width = `100%` //Barra de progresso cheia
  document.querySelector('.questionArea').style.display = 'none' //Esconde a div com as perguntas
  document.querySelector('.scoreArea').style.display = 'block' //Esconde a div de pontuação

  let points = Math.floor((correctAnswers / questions.length) * 100) //Calculo do acerto (%)

  if(points >= 70){
  document.querySelector('.scorePct').innerHTML = `Exelente! Acertou ${points}%`
  document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`
  } else if(points < 70 && points >= 30){
    document.querySelector('.scorePct').style.color = `gold`
    document.querySelector('.scorePct').innerHTML = `Muito bom! Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`
  } else {
    document.querySelector('.scorePct').style.color = `red`
    document.querySelector('.scorePct').innerHTML = `Tá ruin hein! Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`
  }
}

function resetEvent(){ //Zera todas as variaveis para recomeçar novamente
  correctAnswers = 0
  currentQuestion = 0
  showQuestion()
}
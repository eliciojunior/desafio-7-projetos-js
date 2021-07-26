//Variables


//Events
document.querySelectorAll('.item').forEach(item => { //Seleciona todos os itens arrastáveis e para cada um
  item.addEventListener('dragstart', dragStart) //Add um evento de inicio do arrastar
  item.addEventListener('dragend', dragEnd) //Add um evento de fim do arrastar
})

document.querySelectorAll('.area').forEach(area => { //Seleciona todas as áreas que podem receber um item e para cada um
  area.addEventListener('dragover', dragOver) //Add um evento colocando o item sobre a caixa
  area.addEventListener('dragleave', dragLeave) //Add um evento tirando o item da caixa
  area.addEventListener('drop', drop) //Add um evento soltando o item na caixa
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral)
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)

//Functions
function dragStart(e){
  e.currentTarget.classList.add('dragging')
}

function dragEnd(e){
  e.currentTarget.classList.remove('dragging')
}

function dragOver(e){
  if(e.currentTarget.querySelector('.item') === null){
    e.preventDefault()
    e.currentTarget.classList.add('hover')
  }
}

function dragLeave(e){
  e.currentTarget.classList.remove('hover')
}

function drop(e){
  e.currentTarget.classList.remove('hover')  
  
  if(e.currentTarget.querySelector('.item') === null){
    const dragItem = document.querySelector('.item.dragging')
    e.currentTarget.appendChild(dragItem)
  }
}

function dragOverNeutral(e){
  e.preventDefault()
  e.currentTarget.classList.add('hover')
}

function dragLeaveNeutral(e){
  e.currentTarget.classList.remove('hover')
}

function dropNeutral(e){
  e.currentTarget.classList.remove('hover')
  const dragItem = document.querySelector('.item.dragging')
  e.currentTarget.appendChild(dragItem)
}